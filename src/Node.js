class Node {
  constructor({ ctx, hitCtx, hitColor, x, y }) {
    this.ctx = ctx;
    this.hitCtx = hitCtx;

    this.hitColor = hitColor;

    this.x = x;
    this.y = y;

    this.radius = 40;
  }
  drawNode(isDrawHit = false) {
    const ctx = isDrawHit ? this.hitCtx : this.ctx;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    if (isDrawHit) {
      ctx.fillStyle = this.hitColor;
      ctx.fill();
    } else {
      ctx.stroke();
    }
    ctx.closePath();
  }
  movePosition(newPosition) {
    const { x, y } = {
      x: newPosition.x - this.x,
      y: newPosition.y - this.y,
    };
    this.x += x;
    this.y += y;
  }
  draw() {
    this.drawNode();
    this.drawNode(true);
  }
}

export default Node;
