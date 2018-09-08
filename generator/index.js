module.exports = function generator(sequencer, ...args) {
  const seq = sequencer(...args);
  return Object.assign(Object.create({
    next() {
      return seq.apply(null);
    },
  }));
};
