let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = function () {
  canvas = document.getElementById("canvas1");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate();
};

window.addEventListener("resize", function () {
  cancelAnimationFrame(flowFieldAnimation);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(0);
});

const mouse = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", function (e) {
  const canvasRect = canvas.getBoundingClientRect();
  mouse.x = e.clientX - canvasRect.left;
  mouse.y = e.clientY - canvasRect.top;
  console.log(mouse.x, mouse.y);
});

class FlowFieldEffect {
  #ctx;
  #width;
  #height;

  constructor(ctx, width, height) {
    this.#ctx = ctx;
    this.#width = width;
    this.#ctx.strokeStyle = "white";
    this.#ctx.lineWidth = 5;
    this.#height = height;
    this.angle = 0;
    this.lastTime = 0;
    this.interval = 1000 / 60;
    this.timer = 0;
  }

  #draw(x, y) {
    const length = 100;
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(mouse.x, mouse.y);
    this.#ctx.stroke();
  }

  animate(timeStamp) {
    let deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    this.angle += 0.05;
    this.#ctx.clearRect(0, 0, this.#width, this.#height);
    this.#draw(this.#width / 2, this.#height / 2);
    this.timer = 0;

    this.timer += deltaTime;

    // console.log(deltaTime)
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
  }
}
