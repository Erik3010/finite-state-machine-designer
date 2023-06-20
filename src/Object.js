class Object {
  constructor({ ctx, hitCtx, hitColor, type }) {
    this.ctx = ctx;
    this.hitCtx = hitCtx;
    this.hitColor = hitColor;
    this.type = type;
  }
  draw() {}
}

export default Object;
