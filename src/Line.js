class Line {
  constructor({ ctx, sourceNode, targetNode }) {
    this.ctx = ctx;

    this.sourceNode = sourceNode;
    this.targetNode = targetNode;

    // normal line or loop line
    this.type = "line";
  }
  draw() {}
}

export default Line;
