import { measureText } from "./Utility";

class Text {
  constructor({ ctx, x, y, text, fontSize = 18 }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.text = text;
    this.fontFamily = "Arial";
    this.fontSize = fontSize;

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
  draw() {
    this.ctx.save();
    this.applyFontStyle();
    const { width } = this.textProps;
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(this.text, this.x - width / 2, this.y);
    // this.ctx.fillText(this.text, this.x, this.y);
    this.ctx.restore();

    this.isCaretActive && this.drawCaret();
  }
  drawCaret() {
    if (!this.isCaretVisible) return;
    this.applyFontStyle();
    const { width } = this.textProps;

    const GAP = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x + width / 2 + GAP, this.y - this.fontSize / 2);
    this.ctx.lineTo(this.x + width / 2 + GAP, this.y + this.fontSize / 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
  setText(text) {
    this.text = text;
  }
}

export default Text;
