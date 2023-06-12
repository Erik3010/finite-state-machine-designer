class Line {
  constructor({
    ctx,
    hitCtx,
    hitColor,
    sourceNode,
    targetNode,
    isPlaceholderLine = false,
  }) {
    this.ctx = ctx;

    this.sourceNode = sourceNode;
    this.targetNode = targetNode;

    this.hitCtx = hitCtx;
    this.hitColor = hitColor;

    // normal line or loop line
    this.type = "line";
    this.isPlaceholderLine = isPlaceholderLine;

    this.arrowHeadLength = 10;
  }
  get delta() {
    return {
      x: this.targetNode.x - this.sourceNode.x,
      y: this.targetNode.y - this.sourceNode.y,
    };
  }
  drawArrowHead(start) {
    const delta = {
      x: this.targetNode.x - start.x,
      y: this.targetNode.y - start.y,
    };

    this.ctx.beginPath();
    this.ctx.moveTo(start.x + 0.5 * delta.y, start.y - 0.5 * delta.x);
    this.ctx.lineTo(start.x - 0.5 * delta.y, start.y + 0.5 * delta.x);
    this.ctx.lineTo(this.targetNode.x, this.targetNode.y);
    this.ctx.closePath();
    this.ctx.fill();
  }
  drawLine(isDrawHit = false) {
    const angle = Math.atan2(this.delta.y, this.delta.x);
    const end = {
      x: this.targetNode.x - Math.cos(angle) * this.arrowHeadLength,
      y: this.targetNode.y - Math.sin(angle) * this.arrowHeadLength,
    };

    this.ctx.beginPath();
    this.ctx.moveTo(this.sourceNode.x, this.sourceNode.y);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.stroke();
    this.ctx.closePath();

    this.drawArrowHead(end);
  }
  draw() {
    this.drawLine();
  }
}

export default Line;
