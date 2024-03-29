import Text from "./Text";
import Object from "./Object";

class Node extends Object {
  constructor({ ctx, hitCtx, hitColor, x, y }) {
    super({ ctx, hitCtx, hitColor, type: "node" });

    this.x = x;
    this.y = y;
    this.isSelected = false;
    this.isAcceptState = false;

    this.text = new Text({
      ctx: this.ctx,
      x: this.x,
      y: this.y,
      text: "",
    });

    this.radius = 40;
  }
  drawNode(isDrawHit = false) {
    const ctx = isDrawHit ? this.hitCtx : this.ctx;

    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    if (isDrawHit) {
      ctx.fillStyle = this.hitColor;
      ctx.fill();
    } else {
      ctx.strokeStyle = this.isSelected ? "#ff0000" : "#000000";
      ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();

    if (this.isAcceptState && !isDrawHit) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius - 6, 0, 2 * Math.PI);
      this.ctx.strokeStyle = this.isSelected ? "#ff0000" : "#000000";
      this.ctx.stroke();
      this.ctx.closePath();
      this.ctx.restore();
    }
  }
  movePosition(newPosition) {
    const { x, y } = {
      x: newPosition.x - this.x,
      y: newPosition.y - this.y,
    };
    this.x += x;
    this.y += y;

    this.text.x = this.x;
    this.text.y = this.y;
  }
  draw() {
    this.drawNode();
    this.drawNode(true);

    this.text.draw();
    this.text.isCaretActive = this.isSelected;
  }
}

export default Node;
