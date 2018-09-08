const isArgumentFunction = (f) => {
  if (!f || typeof f !== 'function' || f.constructor !== Function) {
    return false;
  }
  return true;
};


const pipeSeq = function pipeSeq(sequencer, ...params) {
  const initialValue = sequencer(...params);
  const fns = [];
  return {
    pipeline(f, ...args) {
      if (!isArgumentFunction(f)) {
        throw new Error('No function passed as param');
      }
      fns.push(f(...args));
      return this;
    },
    invoke() {
      return () => () => fns.reduce((res, fn) => fn(res), initialValue());
    },
  };
};

/*
  pipeSeqMultiple accepts as parameters multiple arrays.
  each array element accepts an func that we want to compose and optional parameters that we want to pass in this func
  for example pipeline([pipelineFunctions.accumulator]) or pipeline([pipelineFunctions.accumulator], [pipelineFunctions.accumulator, 0] etc)
*/
const pipeSeqMultiple = function pipeSeqMultiple(sequencer, ...params) {
  const initialValue = sequencer(...params);
  const fns = [];
  return {
    pipeline(...theArgs) {
      theArgs.forEach((argument) => {
        const fn = argument.filter(arg => typeof arg === 'function').pop();
        const restParams = argument.filter(arg => typeof arg !== 'function');
        if (!isArgumentFunction(fn)) {
          return;
        }
        fns.push(fn(...restParams));
      });
      if (fns.length <= 0) {
        throw new Error('No functions passed as param');
      }
      return this;
    },
    invoke() {
      return () => () => fns.reduce((res, fn) => fn(res), initialValue());
    },
  };
};

module.exports = {
  pipeSeq,
  pipeSeqMultiple,
};
