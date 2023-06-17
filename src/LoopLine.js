class LoopLine {
  constructor({ ctx, hitCtx, hitColor, node, angle }) {
    this.ctx = ctx;

    this.hitCtx = hitCtx;
    this.hitColor = hitColor;

    this.angle = angle;

    this.node = node;

    this.radius = 20;
  }
  drawLoopLine() {
    const x = this.radius + Math.cos(this.angle) * this.node.radius;
    const y = this.radius + Math.sin(this.angle) * this.node.radius;

    this.ctx.beginPath();
    this.ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  draw() {
    this.drawLoopLine();
  }
}

export default LoopLine;
