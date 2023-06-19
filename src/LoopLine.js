import { radianToDegree } from "./Utility";

class LoopLine {
  constructor({ ctx, hitCtx, hitColor, node, angle }) {
    this.ctx = ctx;

    this.hitCtx = hitCtx;
    this.hitColor = hitColor;

    this.angle = angle;
    this.node = node;

    this.arrowHeadLength = 12;

    this.radius = 25;
  }
  drawArrow() {
    const endAngle = this.angle + Math.PI * 0.15;

    const start = {
      x:
        this.node.x +
        (this.node.radius + this.arrowHeadLength) * Math.cos(endAngle),
      y:
        this.node.y +
        (this.node.radius + this.arrowHeadLength) * Math.sin(endAngle),
    };

    const end = {
      x: this.node.x + this.node.radius * Math.cos(endAngle),
      y: this.node.y + this.node.radius * Math.sin(endAngle),
    };

    const delta = { x: end.x - start.x, y: end.y - start.y };

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(start.x + 0.5 * delta.y, start.y - 0.5 * delta.x);
    this.ctx.lineTo(start.x - 0.5 * delta.y, start.y + 0.5 * delta.x);
    this.ctx.lineTo(end.x, end.y);
    this.ctx.closePath();
    this.ctx.fillStyle = "#000000";
    this.ctx.fill();
    this.ctx.restore();
  }
  drawLoopLine() {
    const x = Math.cos(this.angle) * (this.node.radius + this.radius / 2);
    const y = Math.sin(this.angle) * (this.node.radius + this.radius / 2);

    this.ctx.beginPath();
    this.ctx.arc(
      this.node.x + x,
      this.node.y + y,
      this.radius,
      this.angle - Math.PI * 0.75,
      this.angle + Math.PI * 0.75
    );
    this.ctx.stroke();
    this.ctx.closePath();
  }
  draw() {
    this.drawLoopLine();
    this.drawArrow();
  }
}

export default LoopLine;
