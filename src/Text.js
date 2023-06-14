class Text {
  constructor({ ctx, x, y, text, fontSize = 18 }) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;

    this.text = text;
    this.fontFamily = "Arial";
    this.fontSize = fontSize;

    this.caret = null;

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
  get textProps() {
    return this.ctx.measureText(this.text);
  }
  draw() {
    this.ctx.save();
    this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;

    const { width } = this.textProps;

    this.ctx.textBaseline = "middle";
    this.ctx.fillText(this.text, this.x - width / 2, this.y);
    this.ctx.restore();

    this.drawCaret();
  }
  drawCaret() {
    if (!this.isCaretVisible) return;

    const { width } = this.textProps;

    this.ctx.beginPath();
    this.ctx.moveTo(this.x + width, this.y - this.fontSize / 2);
    this.ctx.lineTo(this.x + width, this.y + this.fontSize / 2);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

export default Text;
