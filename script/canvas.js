// Canvas variables
var canvas;
var ctx;
var canvasWidth
var canvasHeight

// Current drawn image
var pixels = [];
for (var i = 0; i < 784; i++) {
  pixels[i] = 0.0;
}

// Cursor
var mouseX = -1;
var mouseY = -1;

var isMouseDown = false;
var selectedPixel = -1;
var previousPixel = -1;
var DrawingAllowed = true;

window.onload = function () {
  // Initialize canvas
  canvas = document.getElementById("myCanvas");
  canvasWidth = canvas.getBoundingClientRect().width;
  canvasHeight = canvas.getBoundingClientRect().height;

  ctx = canvas.getContext("2d");
  canvas.addEventListener(
    "contextmenu",
    function (e) {
      e.preventDefault();
      return false;
    },
    false
  );
  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp, false);
  canvas.addEventListener("mouseout", onMouseOut, false);
  canvas.addEventListener("mousemove", onMouseMove, false);
  setInterval(drawCanvas, 10);
  window.addEventListener("touchstart", function onFirstTouch() {
    isMobile = true;
    window.removeEventListener("touchstart", onFirstTouch, false);
  });
};

function drawPixel(x, y, color) {
  if (color === 0) ctx.fillStyle = "#000000";
  else ctx.fillStyle = "#FFFFFF";
  var pixelWidth = canvasWidth / 28;
  var pixelHeight = canvasHeight / 28;
  ctx.fillRect(x * pixelWidth, y * pixelHeight, pixelWidth, pixelHeight);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.fillStyle = "#161616";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.font = "30px Arial";
  ctx.fillStyle = "#BBBBBB";
  ctx.fillText("Draw a digit from 0 - 9", 50, 100);
  ctx.fillText("here, then click Predict.", 50, 150);
}

function drawCanvas() {
  if (!DrawingAllowed) return;
  clearCanvas();
  var isImageDrawn = pixels.some((pixel) => pixel !== 0);
  for (var i = 0; i < 28; i++) {
    for (var j = 0; j < 28; j++) {
      if (isImageDrawn) drawPixel(i, j, pixels[j * 28 + i]);
    }
  }
  if (mouseX !== -1 && mouseY !== -1)
    ctx.strokeRect(mouseX - 15, mouseY - 15, 30, 30);
  DrawingAllowed = false;
}

function onMouseDown(e) {
  isMouseDown = true;
  var mouseXNormalized = (e.pageX - canvas.getBoundingClientRect().x - window.scrollX) / canvasWidth;
  var mouseYNormalized = (e.pageY - canvas.getBoundingClientRect().y - window.scrollY) / canvasHeight;
  var i, j, x, y;
  for (i = -1; i < 2; i += 2) {
    for (j = -1; j < 2; j += 2) {
      x = Math.round(mouseXNormalized * 28 + i * 0.5 - 0.5);
      y = Math.round(mouseYNormalized * 28 + j * 0.5 - 0.5);
      if (x >= 0 && x < 28 && y >= 0 && y < 28) {
        pixels[y * 28 + x] = 1;
      }
    }
  }
  previousPixel = -1;
  selectedPixel = -1;
  DrawingAllowed = true;
  e.preventDefault();
  return false;
}

function onMouseMove(e) {
  var mouseXNormalized = (e.pageX - canvas.getBoundingClientRect().x - window.scrollX) / canvasWidth;
  var mouseYNormalized = (e.pageY - canvas.getBoundingClientRect().y - window.scrollY) / canvasHeight;
  if (isMouseDown) {
    var i, j, x, y;
    for (i = -1; i < 2; i += 2) {
      for (j = -1; j < 2; j += 2) {
        x = Math.round(mouseXNormalized * 28 + i * 0.5 - 0.5);
        y = Math.round(mouseYNormalized * 28 + j * 0.5 - 0.5);
        if (x >= 0 && x < 28 && y >= 0 && y < 28) {
          pixels[y * 28 + x] = 1;
        }
      }
    }
  }
  DrawingAllowed = true;
  e.preventDefault();
  return false;
}

function onMouseUp(e) {
  isMouseDown = false;
  DrawingAllowed = true;
  e.preventDefault();
  return false;
}

function onMouseOut(e) {
  isMouseDown = false;
  mouseX = -1;
  mouseY = -1;
  DrawingAllowed = true;
  e.preventDefault();
  return false;
}

async function saveCanvas() {
  document.getElementById("predictionResult").innerHTML = "...";
  var downscaledCanvas = document.createElement("canvas");
  downscaledCanvas.width = 28;
  downscaledCanvas.height = 28;
  var downscaledCtx = downscaledCanvas.getContext("2d");

  // Draw original canvas onto downscaled canvas
  downscaledCtx.drawImage(canvas, 0, 0, 28, 28);

  var img = document.getElementById("selectedImage");
  var image = downscaledCanvas.toDataURL("image/png");

  img.src = image;

  return new Promise((resolve, reject) => {
    downscaledCanvas.toBlob((blob) => {
      resolve(blob);
    }, "image/png");
  });
}

function resetCanvas(){
  clearCanvas();
  for (var i = 0; i < 784; i++) {
    pixels[i] = 0.0;
  }
}