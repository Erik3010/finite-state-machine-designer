class Node {
  constructor({ ctx, x, y }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.radius = 35;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export default Node;
