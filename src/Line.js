class Line {
  constructor({
    ctx,
    hitCtx,
    hitColor,
    sourceNode,
    targetNode,
    isPlaceholderLine = false,
    lineOffset = null,
  }) {
    this.ctx = ctx;

    this.sourceNode = sourceNode;
    this.targetNode = targetNode;

    this.hitCtx = hitCtx;
    this.hitColor = hitColor;

    // normal line or loop line
    this.type = "line";
    this.isPlaceholderLine = isPlaceholderLine;

    this.arrowHeadLength = 15;
    this.lineOffset = lineOffset;
    this.isSelected = false;
  }
  get delta() {
    return {
      x: this.targetNode.x - this.sourceNode.x,
      y: this.targetNode.y - this.sourceNode.y,
    };
  }
  get angle() {
    return Math.atan2(this.delta.y, this.delta.x);
  }
  drawArrowHead(start) {
    const end = {
      x: this.targetNode.x - Math.cos(this.angle) * this.lineOffset,
      y: this.targetNode.y - Math.sin(this.angle) * this.lineOffset,
    };

    const delta = {
      x: end.x - start.x,
      y: end.y - start.y,
    };

    this.ctx.beginPath();
    this.ctx.moveTo(start.x + 0.5 * delta.y, start.y - 0.5 * delta.x);
    this.ctx.lineTo(start.x - 0.5 * delta.y, start.y + 0.5 * delta.x);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.closePath();
    this.ctx.fill();
  }
  drawLine(isDrawHit = false) {
    const start = {
      x: this.sourceNode.x + Math.cos(this.angle) * this.lineOffset,
      y: this.sourceNode.y + Math.sin(this.angle) * this.lineOffset,
    };

    const end = {
      x:
        this.targetNode.x -
        Math.cos(this.angle) * (this.arrowHeadLength + this.lineOffset),
      y:
        this.targetNode.y -
        Math.sin(this.angle) * (this.arrowHeadLength + this.lineOffset),
    };

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(start.x, start.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
    this.ctx.closePath();

    this.drawArrowHead(end);
    this.ctx.restore();
  }
  draw() {
    this.drawLine();
  }
}

export default Line;
