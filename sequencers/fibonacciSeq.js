module.exports = function fibonacciSeq() {
  let [
    previousValue,
    currentValue,
  ] = [0, 1];
  return () => {
    const value = currentValue;
    [
      previousValue,
      currentValue,
    ] = [currentValue, previousValue + currentValue];
    return value;
  };
};
