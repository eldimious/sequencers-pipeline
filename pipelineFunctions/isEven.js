module.exports = function isEven() {
  return num => ({
    status: ((num % 2) === 0),
    number: num,
  });
};
