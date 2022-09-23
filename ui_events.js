(() => {
  let playingOscillator;

  const fileSelect = document.getElementById("file-upload");
  const fileDrag = document.getElementById("file-drag");
  const imagePreview = document.getElementById("file-image-preview");

  const playButton = document.getElementById("play-button");

  fileSelect.addEventListener("change", fileSelectHandler, false);
  fileDrag.addEventListener("dragover", fileDragHover, false);
  fileDrag.addEventListener("dragleave", fileDragHover, false);
  fileDrag.addEventListener("drop", fileSelectHandler, false);

  playButton.addEventListener(
    "click",
    () => {
      if (playingOscillator) {
        clearOscillator(playingOscillator);
      }

      playingOscillator = playSong(imagePreview);
    },
    false
  );
})();

function fileDragHover(e) {
  const fileDrag = document.getElementById("file-drag");

  e.stopPropagation();
  e.preventDefault();

  fileDrag.className =
    e.type === "dragover" ? "hover" : "modal-body file-upload";
}

function fileSelectHandler(e) {
  // Fetch FileList object
  var files = e.target.files || e.dataTransfer.files;

  // Cancel event and hover styling
  fileDragHover(e);

  // Process all File objects
  for (var i = 0, f; (f = files[i]); i++) {
    parseFile(f);
  }
}

function addMessage(msg) {
  let messages = document.getElementById("messages");
  messages.innerHTML = msg;
}

function parseFile(file) {
  addMessage("<strong>" + encodeURI(file.name) + "</strong>");

  // var fileType = file.type;
  // console.log(fileType);
  var imageName = file.name;

  var isGood = /\.(?=gif|jpg|png|jpeg)/gi.test(imageName);
  if (isGood) {
    document.getElementById("start").classList.add("hidden");
    document.getElementById("response").classList.remove("hidden");
    document.getElementById("notimage").classList.add("hidden");

    // Thumbnail Preview
    document.getElementById("file-image-preview").classList.remove("hidden");
    document.getElementById("file-image-preview").src =
      URL.createObjectURL(file);

    document.getElementById("play-button").disabled = false;
  } else {
    document.getElementById("file-image-preview").classList.add("hidden");
    document.getElementById("notimage").classList.remove("hidden");
    document.getElementById("start").classList.remove("hidden");
    document.getElementById("response").classList.add("hidden");

    document.getElementById("play-button").disabled = true;
    document.getElementById("file-upload-form").reset();
  }
}
