const getRGBAMedianSampleValueGenerator = function* (imageField, numberOfSamples) {
  const imageData = getImageData(imageField);
  const rgbaMedian = getRGBAMedianForEveryPixel(imageData);

  const increaseStep = rgbaMedian.length / numberOfSamples;

  for (let i = 0; i < rgbaMedian.length; i += increaseStep) {
    yield rgbaMedian[Math.round(i)];
  }
};

const getRGBASampleValueGenerator = function* (imageField, numberOfSamples, valueType) {
  /* Return a sample generator for a valueType e.g. one of the RGBA options */
  const valueTypes = {
    "R": 0,
    "G": 1,
    "B": 2,
    "A": 3
  }

  const imageData = getImageData(imageField);
  const increaseStep = imageData.length / numberOfSamples;

  for (let i = 0; i < imageData.length; i += increaseStep) {
    yield imageData[Math.round(i) + valueTypes[valueType]];
  }
};

function getImageData(img) {
  const canvas = document.createElement("canvas");

  canvas.width = img.width;
  canvas.height = img.height;

  const context = canvas.getContext("2d");
  context.drawImage(img, 0, 0, img.width, img.height);

  const imgData = context.getImageData(0, 0, img.width, img.height);
  return imgData.data;
}

function getRGBAMedianForEveryPixel(flatImageData) {
  /*
  Receive a flatImageData [r, g, b, a, r, g, b, a ...] and
  return the median number from the rgba group for every pixel.

  A pixel is compound of the rgba combination. i.e. a group of 4 elements of the array.
  */
  let outputArray = [];

  for (let i = 0; i <= flatImageData.length - 4; i += 4) {
    let rgba = flatImageData.slice(i, i + 4);
    outputArray.push(getMedianFromArray(rgba));
  }

  return outputArray;
}

function getMedianFromArray(arr) {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
}
