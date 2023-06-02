export const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const randomColor = () => {
  const color = { r: 0, g: 0, b: 0 };
  for (const key in color) {
    color[key] = random(0, 255);
  }

  return `rgb(${color.r}, ${color.g}, ${color.b})`;
};
