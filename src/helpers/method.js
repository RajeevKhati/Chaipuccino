export const getDecimal = x => {
  return Number.parseFloat(x)
    .toFixed(5)
    .replace(/(\.0+|0+)$/, '');
  // return Math.round(Number.parseFloat(x) * 10 ** 8) / 10 ** 8;
};
