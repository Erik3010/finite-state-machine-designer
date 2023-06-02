import Node from "./Node";

class FSMDesigner {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.nodes = [];
    this.lines = [];

    this.placeholderLine = null;

    this.isMouseDown = false;
  }
  init() {
    this.registerEventListener();
    this.render();
  }
  registerEventListener() {
    this.canvas.addEventListener("dblclick", this.handleDoubleClick.bind(this));

    this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }
  handleMouseDown(event) {
    // need to check is node clicked
    if (!event.shiftKey) return;

    this.isMouseDown = true;
  }
  handleMouseMove(event) {
    if (!this.isMouseDown) return;
  }
  handleMouseUp(event) {
    // need to check if target in node
  }
  handleDoubleClick(event) {
    const { offsetX: x, offsetY: y } = event;

    const node = new Node({ ctx: this.ctx, x, y });
    this.nodes.push(node);
  }
  draw() {
    for (const node of this.nodes) {
      node.draw();
    }

    for (const line of this.lines) {
      line.draw();
    }
  }
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.draw();

    setTimeout(this.render.bind(this), 10);
  }
}

export default FSMDesigner;
