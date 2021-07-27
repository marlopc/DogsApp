export const converter = (from, type, min, max) => {
  if (from === "imperial") {
    const minMetric = Math.round(type === "height" ? min * 2.54 : min / 2.2);
    const maxMetric = Math.round(type === "height" ? max * 2.54 : max / 2.2);
    return `${min}-${max}-${minMetric}-${maxMetric}`;
  }

  if (from === "metric") {
    const minImperial = Math.round(type === "height" ? min / 2.54 : min * 2.2);
    const maxImperial = Math.round(type === "height" ? max / 2.54 : max * 2.2);
    return `${minImperial}-${maxImperial}-${min}-${max}`;
  }
};