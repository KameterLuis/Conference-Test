const map = (val, min1, max1, min2, max2) => {
  return ((val - min1) * (max2 - min2)) / (max1 - min1) + min2;
};

const lerp = (x, y, a) => x * (1 - a) + y * a;

var iteration = 0;
var mouseX = window.innerWidth / 2,
  mouseY = window.innerHeight / 2;

function draw() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let boxSize = 40;
  let border = 5;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();

  for (let y = 0; y < height; y += boxSize) {
    for (let x = 0; x < width; x += boxSize) {
      let dist = Math.sqrt(
        (x - mouseX) * (x - mouseX) + (y - mouseY) * (y - mouseY)
      );
      let dist2 = Math.sqrt(
        (x - width / 2) * (x - width / 2) + (y - height / 2) * (y - height / 2)
      );
      dist = (dist + dist2 * 3) / 4;

      let size = map(dist, 0, width, -boxSize, boxSize * 2);
      if (size > boxSize - border) size = boxSize - border;
      if (size < 0) size = 0;
      if (size > 5 && size < boxSize - 5) {
        size += Math.sin(iteration + Math.sqrt(x * y)) * 5;
      }

      //249,169,122
      //104,131,219
      let color = 40;
      color = `rgb(${color},${color},${color})`;

      if (size < 15) {
        let a = map(x, 0, width, 0, 1.5);

        let r = lerp(238, 104, a);
        let g = lerp(108, 131, a);
        let b = lerp(144, 219, a);

        let color_r = map(size, 5, 15, r, 40);
        let color_g = map(size, 5, 15, g, 40);
        let color_b = map(size, 5, 15, b, 40);

        if (color_r > r) color_r = r;
        if (color_g > g) color_g = g;
        if (color_b > b) color_b = b;

        color = `rgb(${color_r},${color_g},${color_b})`;
      }

      ctx.fillStyle = color;

      ctx.fillRect(
        x + (boxSize - size) / 2,
        y + (boxSize - size) / 2,
        size,
        size
      );
    }
  }
  ctx.stroke();
  iteration += 0.1;
}

var timer = setInterval(function () {
  draw();
}, 1000 / 15);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

window.addEventListener("resize", resizeCanvas, false);

function resizeCanvas() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

resizeCanvas();

(function () {
  document.onmousemove = (e) => {
    mouseX = e.pageX;
    mouseY = e.pageY;
  };
})();
