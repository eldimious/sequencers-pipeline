module.exports = function accumulator() {
  let sum = 0;
  return (value) => {
    sum += value;
    return sum;
  };
};
