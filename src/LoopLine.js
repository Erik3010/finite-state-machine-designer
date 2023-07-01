import Text from "./Text";
import Object from "./Object";

class LoopLine extends Object {
  constructor({ ctx, hitCtx, hitColor, isPlaceholderLine, node, angle }) {
    super({ ctx, hitCtx, hitColor, type: "loopLine" });

    this.angle = angle;
    this.node = node;

    this.arrowHeadLength = 12;

    this.radius = 25;

    this.isSelected = false;

    this.initialText = "";
    this.isPlaceholderLine = isPlaceholderLine;

    const { x, y } = this.textPosition;
    this.text = new Text({
      x,
      y,
      angle: this.angle,
      ctx: this.ctx,
      text: this.initialText,
    });
  }
  get textPosition() {
    const radius = this.node.radius + this.radius / 2 + this.radius;
    const x = Math.cos(this.angle) * radius;
    const y = Math.sin(this.angle) * radius;

    return { x: this.node.x + x, y: this.node.y + y };
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

    ctx.save();
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
    ctx.restore();

    this.drawArrow(isDrawHit);
  }
  draw() {
    this.drawLoopLine();
    this.drawLoopLine(true);

    this.text.draw();

    this.text.isCaretActive = this.isSelected;
    this.text.updatePostition({ ...this.textPosition, angle: this.angle });
  }
}

export default LoopLine;
