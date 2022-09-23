const SAMPLE_RATES_BY_SECOND = 5; // 5 samples per second
const TOTAL_PLAYING_SECONDS = 30; // Total seconds of playing
const TOTAL_NUMBER_OF_SAMPLES = TOTAL_PLAYING_SECONDS * SAMPLE_RATES_BY_SECOND;
const SAMPLE_TIME = 1 / SAMPLE_RATES_BY_SECOND;

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSong(image) {
  const currentSampleGen = getSampleValueGenerator(
    image,
    TOTAL_NUMBER_OF_SAMPLES
  );
  const oscillator = createOscillator();

  // Loop oscillator to play every sample time
  const playOscillatorsInterval = setInterval(
    (currentSampleGen, oscillator) => {
      changeOscillatorFrequency(oscillator, currentSampleGen.next().value);
    },
    SAMPLE_TIME * 1000,
    currentSampleGen,
    oscillator
  );

  // Stop loop of playing
  setTimeout(
    (interval, oscillator) => {
      console.log("Cleaning interval...");
      clearInterval(interval);

      console.log("Cleaning oscillator...");
      clearOscillator(oscillator);
    },
    TOTAL_PLAYING_SECONDS * 1000,
    playOscillatorsInterval,
    oscillator
  );

  return oscillator;
}

function createOscillator() {
  const oscillator = audioCtx.createOscillator();
  oscillator.connect(audioCtx.destination);
  oscillator.type = "sine";
  oscillator.start();

  return oscillator;
}

function changeOscillatorFrequency(oscillator, newFrequency) {
  oscillator.frequency.value = newFrequency * 3;
}

function clearOscillator(oscillator) {
  oscillator.stop();
  oscillator.disconnect();
}
