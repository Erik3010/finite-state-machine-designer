import Node from "./Node";
import { random, randomColor } from "./Utility";

class FSMDesigner {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.hitCanvas = document.createElement("canvas");
    this.hitCanvasCtx = this.hitCanvas.getContext("2d", {
      willReadFrequently: true,
    });

    this.objects = {};

    this.placeholderLine = null;

    this.isMouseDown = false;
    this.selectedObject = null;

    this.initHitCanvas();
  }
  init() {
    this.registerEventListener();
    this.render();
  }
  initHitCanvas() {
    this.hitCanvas.width = this.canvas.width;
    this.hitCanvas.height = this.canvas.height;

    // document.body.appendChild(this.hitCanvas);
  }
  registerEventListener() {
    this.canvas.addEventListener("dblclick", this.handleDoubleClick.bind(this));

    this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.canvas.addEventListener("mouseup", this.handleMouseUp.bind(this));
  }
  handleMouseDown(event) {
    // need to check is node clicked

    const { offsetX: x, offsetY: y } = event;
    const object = this.getObjectByCoordinate({ x, y });

    if (!object) return;

    this.isMouseDown = true;
    this.selectedObject = object;
  }
  handleMouseMove(event) {
    if (!this.isMouseDown || !this.selectedObject) return;

    const { offsetX: x, offsetY: y } = event;
    this.selectedObject.movePosition({ x, y });
  }
  handleMouseUp(event) {
    // need to check if target in node
    this.selectedObject = null;
    this.isMouseDown = false;
  }
  handleDoubleClick(event) {
    const { offsetX: x, offsetY: y } = event;
    const object = this.getObjectByCoordinate({ x, y });
    if (object) return;

    this.createNode({ x, y });
  }
  draw() {
    for (const key in this.objects) {
      this.objects[key].draw();
    }
  }
  get hitDetectionColor() {
    let color;
    do {
      color = randomColor();
    } while (this.objects[color]);

    return color;
  }
  getObjectByCoordinate({ x, y }) {
    const pixel = this.hitCanvasCtx.getImageData(x, y, 1, 1);
    const [r, g, b] = pixel.data;
    const color = `rgb(${r}, ${g}, ${b})`;

    return this.objects[color];
  }
  createNode({ x, y }) {
    const color = this.hitDetectionColor;

    const node = new Node({
      x,
      y,
      ctx: this.ctx,
      hitCtx: this.hitCanvasCtx,
      hitColor: color,
    });
    this.objects[color] = node;
  }
  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.hitCanvasCtx.clearRect(
      0,
      0,
      this.hitCanvas.width,
      this.hitCanvas.height
    );

    this.draw();

    setTimeout(this.render.bind(this), 10);
  }
}

export default FSMDesigner;
