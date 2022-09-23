const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSong(image, totalPlayingSeconds, samplesPerSecond) {
  console.log("Playing for " + totalPlayingSeconds + " seconds, using " + samplesPerSecond + " samples per second");

  const totalSamples = totalPlayingSeconds * samplesPerSecond;
  const sampleTime = 1 / samplesPerSecond;

  const currentSampleGen = getRGBAMedianSampleValueGenerator(
    image,
    totalSamples
  );

  return [
    playSingleChannel(
      currentSampleGen,
      sampleTime * 1000,
      totalPlayingSeconds * 1000
    ),
  ];
}

function playSingleChannel(
  sampleGenerator,
  sampleTimeMs,
  totalPlayingSecondsMs
) {
  const channel = _createChannel();

  // Loop channel to play every sample time
  const playChannelInterval = setInterval(
    (sampleGenerator, channel) => {
      const sampleValue = sampleGenerator.next().value;
      if (sampleValue) {
        _changeChannelFrequency(channel, sampleValue);
      }
    },
    sampleTimeMs,
    sampleGenerator,
    channel
  );

  // Stop loop of playing
  setTimeout(
    (interval, channel) => {
      console.log("Cleaning interval...");
      clearInterval(interval);

      console.log("Cleaning channels...");
      clearChannels(channel);
    },
    totalPlayingSecondsMs,
    playChannelInterval,
    channel
  );

  channel.start();
  return channel;
}

function _createChannel() {
  const oscillator = audioCtx.createOscillator();
  oscillator.connect(audioCtx.destination);
  oscillator.type = "sine";
  return oscillator;
}

function _changeChannelFrequency(channel, newFrequency) {
  channel.frequency.value = newFrequency * 3;
}

function clearChannels(...channels) {
  for (const channel of channels) {
    channel.stop();
    channel.disconnect();
  }
}
