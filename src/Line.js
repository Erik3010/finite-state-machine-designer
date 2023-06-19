import Text from "./Text";
import { measureText } from "./Utility";

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

    this.initialText = "";

    const { x, y } = this.textPosition;
    this.text = new Text({ x, y, ctx: this.ctx, text: this.initialText });
  }
  get delta() {
    return {
      x: this.targetNode.x - this.sourceNode.x,
      y: this.targetNode.y - this.sourceNode.y,
    };
  }
  get textPosition() {
    const start = {
      x: this.sourceNode.x + Math.cos(this.angle) * this.lineOffset,
      y: this.sourceNode.y + Math.sin(this.angle) * this.lineOffset,
    };

    const end = {
      x: this.targetNode.x - Math.cos(this.angle) * this.lineOffset,
      y: this.targetNode.y - Math.sin(this.angle) * this.lineOffset,
    };

    /**
     * Make text position in the middle of line but didn't overlap with the line itself
     * Highly inspired from https://github.com/evanw/fsm
     */
    const { width } = measureText(this.ctx, {
      text: this.text?.text ?? this.initialText,
    });
    const angle = Math.atan2(end.x - start.x, start.y - end.y);

    const cos = Math.cos(angle + Math.PI);
    const sin = Math.sin(angle + Math.PI);
    const cornerPointX = (width / 2 + 5) * Math.sign(cos);
    const cornerPointY = 15 * Math.sign(sin);
    const slide =
      sin * Math.pow(Math.abs(sin), 40) * cornerPointX -
      cos * Math.pow(Math.abs(cos), 10) * cornerPointY;

    return {
      x: (start.x + end.x) / 2 + (cornerPointX - sin * slide),
      y: (start.y + end.y) / 2 + (cornerPointY + cos * slide),
    };
  }
  get angle() {
    return Math.atan2(this.delta.y, this.delta.x);
  }
  drawArrowHead(start, isDrawHit = false) {
    const ctx = isDrawHit ? this.hitCtx : this.ctx;

    const end = {
      x: this.targetNode.x - Math.cos(this.angle) * this.lineOffset,
      y: this.targetNode.y - Math.sin(this.angle) * this.lineOffset,
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
      : "#000000";
    ctx.fill();
    ctx.restore();
  }
  drawLine(isDrawHit = false) {
    const ctx = isDrawHit ? this.hitCtx : this.ctx;

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

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    isDrawHit && (ctx.lineWidth = 15);
    ctx.strokeStyle = isDrawHit
      ? this.hitColor
      : this.isSelected
      ? "#ff0000"
      : "#000000";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    this.drawArrowHead(end, isDrawHit);
  }
  draw() {
    this.drawLine();
    this.drawLine(true);

    const { x, y } = this.textPosition;

    this.text.draw();
    this.text.x = x;
    this.text.y = y;
    this.text.isCaretActive = this.isSelected;
  }
}

export default Line;
