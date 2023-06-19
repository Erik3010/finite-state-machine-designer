export const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomColor = () => {
  const color = { r: 0, g: 0, b: 0 };
  for (const key in color) {
    color[key] = random(0, 255);
  }

  return `rgb(${color.r}, ${color.g}, ${color.b})`;
};

export const measureText = (
  ctx,
  { fontSize = 18, fontFamily = "Arial", text }
) => {
  ctx.save();
  ctx.font = `${fontSize}px ${fontFamily}`;
  const props = ctx.measureText(text);
  ctx.restore();

  return props;
};

export const radianToDegree = (radian) => radian * (180 / Math.PI);

export const getAngleBetweenPoints = (a, b) => Math.atan2(b.y - a.y, b.x - a.x);
