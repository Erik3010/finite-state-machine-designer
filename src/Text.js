import { measureText } from "./Utility";

class Text {
  constructor({ ctx, x, y, angle = null, text, fontSize = 18 }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.text = text;
    this.fontFamily = "Arial";
    this.fontSize = fontSize;

    this.angle = angle;

    this.caret = null;

    this.isCaretActive = true;
    this.isCaretVisible = true;
    this.caretInterval = null;

    this.init();
  }
  init() {
    this.caretInterval = setInterval(
      () => (this.isCaretVisible = !this.isCaretVisible),
      500
    );
  }
  applyFontStyle() {
    this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
  }
  get textProps() {
    return measureText(this.ctx, {
      fontSize: this.fontSize,
      fontFamily: this.fontFamily,
      text: this.text,
    });
  }
  /**
   * Make text position in the middle of line but didn't overlap with the line itself
   * Highly inspired from https://github.com/evanw/fsm
   */
  get textPosition() {
    const { width } = this.textProps;
    const pos = { x: this.x - width / 2, y: this.y };

    if (!this.angle) return pos;

    const cos = Math.cos(this.angle);
    const sin = Math.sin(this.angle);

    const cornerPointX = (width / 2 + 5) * Math.sign(cos);
    const cornerPointY = 15 * Math.sign(sin);

    const slide =
      sin * Math.pow(Math.abs(sin), 40) * cornerPointX -
      cos * Math.pow(Math.abs(cos), 10) * cornerPointY;

    pos.x += cornerPointX - sin * slide;
    pos.y += cornerPointY + cos * slide;

    return pos;
  }
  draw() {
    this.ctx.save();
    this.applyFontStyle();
    const { x, y } = this.textPosition;

    this.ctx.textBaseline = "middle";
    this.ctx.fillText(this.text, x, y);
    this.ctx.restore();

    this.isCaretActive && this.drawCaret();
  }
  drawCaret() {
    if (!this.isCaretVisible) return;
    this.applyFontStyle();
    const { width } = this.textProps;
    const { x, y } = this.textPosition;

    const GAP = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(x + width + GAP, y - this.fontSize / 2);
    this.ctx.lineTo(x + width + GAP, y + this.fontSize / 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  setText(text) {
    this.text = text;
  }
  updatePostition({ x, y, angle }) {
    this.x = x;
    this.y = y;
    this.angle = angle;
  }
}

export default Text;
