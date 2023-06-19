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

    this.isSelected = false;
  }
  drawArrow(isDrawHit = false) {
    const ctx = isDrawHit ? this.hitCtx : this.ctx;
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

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(start.x + 0.5 * delta.y, start.y - 0.5 * delta.x);
    ctx.lineTo(start.x - 0.5 * delta.y, start.y + 0.5 * delta.x);
    ctx.lineTo(end.x, end.y);
    ctx.closePath();
    ctx.fillStyle = isDrawHit
      ? this.hitColor
      : this.isSelected
      ? "#ff0000"
      : "#000";
    ctx.fill();
    ctx.restore();
  }
  /**
   * Drawing the loop line
   * Highly inspired from: https://github.com/evanw/fsm
   */
  drawLoopLine(isDrawHit = false) {
    const ctx = isDrawHit ? this.hitCtx : this.ctx;

    const x = Math.cos(this.angle) * (this.node.radius + this.radius / 2);
    const y = Math.sin(this.angle) * (this.node.radius + this.radius / 2);

    ctx.beginPath();
    ctx.arc(
      this.node.x + x,
      this.node.y + y,
      this.radius,
      this.angle - Math.PI * 0.75,
      this.angle + Math.PI * 0.75
    );
    isDrawHit && (ctx.lineWidth = 10);
    ctx.strokeStyle = isDrawHit
      ? this.hitColor
      : this.isSelected
      ? "#ff0000"
      : "#000";
    ctx.stroke();
    ctx.closePath();

    this.drawArrow(isDrawHit);
  }
  draw() {
    this.drawLoopLine();
    this.drawLoopLine(true);
  }
}

export default LoopLine;
