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
    this.cvs.ctx.fillStyle = "rgba(0,0,0)"; // Semi-transparent blue
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
    this.border();
  }

  border() {
    if (this.pos.x < 0 || this.pos.x > this.cvs.canvas.width) {
      this.vel.x *= -1;
      this.pos.x = Math.max(0, Math.min(this.pos.x, this.cvs.canvas.width));
    }
    if (this.pos.y < 0 || this.pos.y > this.cvs.canvas.height) {
      this.vel.y *= -1;
      this.pos.y = Math.max(0, Math.min(this.pos.y, this.cvs.canvas.height));
    }
  }
}

class Canvas {
  constructor() {
    this.canvas = document.getElementById("overlayCanvas");
    this.ctx = this.canvas.getContext("2d");

    // Set initial size
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Wait for DOM to be fully loaded before resizing to grid
    setTimeout(() => this.resizeCanvas(), 1000);

    // Add resize listener with debouncing
    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.resizeCanvas(), 250);
    });
  }

  resizeCanvas() {
    const grid =
      document.querySelector(".grid-6x4") ||
      document.querySelector(".grid-5x4") ||
      document.querySelector(".grid-4x4") ||
      document.querySelector(".grid-4x3");

    if (grid) {
      const gridRect = grid.getBoundingClientRect();
      const computedStyle = window.getComputedStyle(grid);

      // Get the actual margins from computed styles
      const marginLeft = parseFloat(computedStyle.marginLeft);
      const marginRight = parseFloat(computedStyle.marginRight);

      // Use the full grid width including the margin area
      const contentWidth = gridRect.width;

      // Set canvas dimensions to match the grid's content area
      this.canvas.width = contentWidth;
      this.canvas.height = gridRect.height;

      // Position the canvas at the grid's left edge (including margin)
      this.canvas.style.position = "absolute";
      this.canvas.style.left = `${gridRect.left}px`;
      this.canvas.style.top = `${gridRect.top}px`;

      // Set explicit dimensions
      this.canvas.style.width = `${contentWidth}px`;
      this.canvas.style.height = `${gridRect.height}px`;

      this.canvas.style.display = "block";
      this.canvas.style.pointerEvents = "none";
      this.canvas.style.zIndex = "9999";

      // Clear canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    }
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

export { Canvas, Particule, Vector };
