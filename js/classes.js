let width;
let height;

const partSpeed = 1;
const maxSpeed = 5;

class Particule {
  constructor(x, y, cvs) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(0, 0);
    this.acc = new Vector(0, 0);
    this.cvs = cvs;
  }

  show() {
    this.cvs.ctx.fillStyle = "rgba(0, 0, 0)";
    this.cvs.ctx.fillRect(this.pos.x, this.pos.y, 3, 3);
  }

  update() {
  if (Math.random() > 0.003) {
    const angle = Math.random() * 2 * Math.PI;
    const force = new Vector(Math.cos(angle), Math.sin(angle));
    force.mult(partSpeed); 
    this.vel.add(force); 
  }

  if (this.vel.mag() > maxSpeed) {
    this.vel.normalize();
    this.vel.mult(maxSpeed);
  }

  this.pos.add(this.vel);
  }

  border() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y < 0) this.pos.y = height;
  }
}

//Canvas superposed
class Canvas {
  constructor() {
    this.canvas = document.getElementById("overlayCanvas");
    this.ctx = this.canvas.getContext("2d");
    this.setup();
  }

  setup() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    width = this.canvas.width;
    height = this.canvas.height;
    window.addEventListener("resize", () => {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    });
  }
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  mult(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }

  mag() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const m = this.mag();
    if (m !== 0) {
      this.x /= m;
      this.y /= m;
    }
    return this;
  }
}

export { Canvas, Particule };
