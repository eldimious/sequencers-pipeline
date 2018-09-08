module.exports = function rangeSeq(start, step) {
  let currentValue = start;
  return () => {
    const value = currentValue;
    currentValue += step;
    return value;
  };
};
