import Node from "./Node";
import Line from "./Line";
import { randomColor } from "./Utility";

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
    this.currentObject = null;

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

    window.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  handleKeyDown(event) {
    const { keyCode } = event;

    // if (!this.selectedObject || this.selectedObject.constructor.name !== "Node")
    if (!this.selectedObject) return;

    const { text } = this.selectedObject.text;

    // is alphabet
    if (
      (keyCode > 64 && keyCode < 91) ||
      (keyCode > 96 && keyCode < 123) ||
      (keyCode > 47 && keyCode < 58) ||
      keyCode === 32
    ) {
      this.selectedObject.text.setText(`${text}${event.key}`);
    } else if (event.key === "Backspace") {
      this.selectedObject.text.setText(text.substring(0, text.length - 1));
    }
  }
  handleMouseDown(event) {
    // need to check is node clicked

    const { offsetX: x, offsetY: y } = event;
    const object = this.getObjectByCoordinate({ x, y });

    this.selectedObject && (this.selectedObject.isSelected = false);
    if (!object) return;

    this.isMouseDown = true;
    object.isSelected = true;

    if (event.shiftKey && object.constructor.name === "Node") {
      this.placeholderLine = this.createLine({
        sourceNode: object,
        targetNode: { x, y },
        isPlaceholderLine: true,
      });
      return;
    }

    this.currentObject = object;
  }
  handleMouseMove(event) {
    if (!this.isMouseDown) return;

    const { offsetX: x, offsetY: y } = event;

    if (this.placeholderLine) {
      this.placeholderLine.targetNode = { x, y };
      return;
    }

    if (
      !this.currentObject ||
      !(this.currentObject.constructor.name === "Node")
    )
      return;

    this.currentObject.movePosition({ x, y });
  }
  handleMouseUp(event) {
    const { offsetX: x, offsetY: y } = event;

    // need to check if target in node
    if (this.placeholderLine) {
      const object = this.getObjectByCoordinate({ x, y });
      if (
        object &&
        object.constructor.name === "Node" &&
        object !== this.selectedObject
      ) {
        const line = this.createLine({
          sourceNode: this.placeholderLine.sourceNode,
          targetNode: object,
          lineOffset: object.radius,
        });
        this.objects[line.hitColor] = line;
      }
      this.placeholderLine = null;
    }

    this.currentObject = null;
    this.isMouseDown = false;
  }
  handleDoubleClick(event) {
    const { offsetX: x, offsetY: y } = event;
    const object = this.getObjectByCoordinate({ x, y });
    if (object) return;

    const node = this.createNode({ x, y });
    this.objects[node.hitColor] = node;
  }
  draw() {
    if (this.placeholderLine) {
      this.placeholderLine.draw();
    }

    for (const key in this.objects) {
      this.objects[key].draw();
    }
  }
  get selectedObject() {
    return Object.values(this.objects).find((obj) => obj.isSelected);
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
    return node;
  }
  createLine({
    sourceNode,
    targetNode,
    isPlaceholderLine = false,
    lineOffset = null,
  }) {
    const color = this.hitDetectionColor;

    const line = new Line({
      sourceNode,
      targetNode,
      isPlaceholderLine,
      lineOffset,
      ctx: this.ctx,
      hitCtx: this.hitCanvasCtx,
      hitColor: color,
    });
    return line;
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
