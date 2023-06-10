class Line {
  constructor({ ctx, hitCtx, hitColor, sourceNode, targetNode }) {
    this.ctx = ctx;

    this.sourceNode = sourceNode;
    this.targetNode = targetNode;

    this.hitCtx = hitCtx;
    this.hitColor = hitColor;

    // normal line or loop line
    this.type = "line";
  }
  drawArrowHead() {}
  drawLine(isDrawHit = false) {
    this.ctx.beginPath();
    this.ctx.moveTo(this.sourceNode.x, this.sourceNode.y);
    this.ctx.lineTo(this.targetNode.x, this.targetNode.y);
    this.ctx.stroke();
    this.ctx.closePath();

    this.drawArrowHead();
  }
  draw() {
    this.drawLine();
  }
}

export default Line;
