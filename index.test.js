const sequencers = require('./sequencers');
const generator = require('./generator');
const pipe = require('./pipe');
const pipelineFunctions = require('./pipelineFunctions');
const expect = require('chai').expect;


describe('test generators es5', () => {
  it('test fibonacci sequencer', (done) => {
    const seq = generator(sequencers.fibonacciSeq);
    expect(seq.next()).to.eql(1);
    expect(seq.next()).to.eql(1);
    expect(seq.next()).to.eql(2);
    expect(seq.next()).to.eql(3);
    expect(seq.next()).to.eql(5);
    return done();
  });
  it('test factorial sequencer', (done) => {
    const seq = generator(sequencers.factorialSeq);
    expect(seq.next()).to.eql(1);
    expect(seq.next()).to.eql(1);
    expect(seq.next()).to.eql(2);
    expect(seq.next()).to.eql(6);
    expect(seq.next()).to.eql(24);
    return done();
  });
  it('test range sequencer ', (done) => {
    const seq = generator(sequencers.rangeSeq, 1, 2);
    expect(seq.next()).to.eql(1);
    expect(seq.next()).to.eql(3);
    expect(seq.next()).to.eql(5);
    expect(seq.next()).to.eql(7);
    expect(seq.next()).to.eql(9);
    return done();
  });
  it('test partial sum sequencer', (done) => {
    const seq = generator(sequencers.partialSumSeq, 1, 3, 7, 2, 0);
    expect(seq.next()).to.eql(1);
    expect(seq.next()).to.eql(4);
    expect(seq.next()).to.eql(11);
    expect(seq.next()).to.eql(13);
    expect(seq.next()).to.eql(13);
    expect(() => seq.next()).to.throw(Error);
    return done();
  });
  it('test partial sequencer', (done) => {
    const seq = generator(sequencers.primeSeq);
    expect(seq.next()).to.eql(2);
    expect(seq.next()).to.eql(3);
    expect(seq.next()).to.eql(5);
    expect(seq.next()).to.eql(7);
    expect(seq.next()).to.eql(11);
    expect(seq.next()).to.eql(13);
    expect(seq.next()).to.eql(17);
    return done();
  });
});


describe('functions for composition', () => {
  it('test isEven function', (done) => {
    const isEven = pipelineFunctions.isEven();
    const evenNumber = isEven(8);
    const oddNumber = isEven(7);
    expect(evenNumber.status).to.eql(true);
    expect(evenNumber.number).to.eql(8);
    expect(oddNumber.status).to.eql(false);
    expect(oddNumber.number).to.eql(7);
    return done();
  });
  it('test accumulator function', (done) => {
    const accumulator = pipelineFunctions.accumulator();
    const initialvalue = accumulator(5);
    const nextValue = accumulator(2);
    expect(initialvalue).to.eql(5);
    expect(nextValue).to.eql(7);
    return done();
  });
});


describe('compose functions', () => {
  it('test compose rangeSeq and accumulator', (done) => {
    const pipedSeq = pipe.pipeSeq(sequencers.rangeSeq, 2, 3).pipeline(pipelineFunctions.accumulator).invoke();
    const seq = generator(pipedSeq);
    expect(seq.next()).to.eql(2);
    expect(seq.next()).to.eql(7);
    expect(seq.next()).to.eql(15);
    expect(seq.next()).to.eql(26);
    return done();
  });
  it('test compose rangeSeq and isEven', (done) => {
    const pipedSeq = pipe.pipeSeq(sequencers.rangeSeq, 0, 1).pipeline(pipelineFunctions.isEven).invoke();
    const seq = generator(pipedSeq);
    expect(seq.next().status).to.eql(true);
    expect(seq.next().status).to.eql(false);
    expect(seq.next().status).to.eql(true);
    expect(seq.next().status).to.eql(false);
    return done();
  });
  it('test compose throw error for not passing func in pipeline', (done) => {
    expect(() => pipe.pipeSeq(sequencers.rangeSeq, 2, 3).pipeline()).to.throw(Error);
    return done();
  });
  it('test compose throw error for not passing func type in pipeline', (done) => {
    expect(() => pipe.pipeSeq(sequencers.rangeSeq, 2, 3).pipeline('test')).to.throw(Error);
    return done();
  });
});

/*
  pipeSeqMultiple accepts as parameters multiple arrays.
  each array element accepts an func that we want to compose and parameters that we want to pass in the funcs
  for example pipeline([pipelineFunctions.accumulator]) or pipeline([pipelineFunctions.accumulator], [pipelineFunctions.accumulator, 0] etc)
*/
describe('compose multiple functions', () => {
  it('test compose rangeSeq and accumulator', (done) => {
    const pipedSeq = pipe.pipeSeqMultiple(sequencers.rangeSeq, 2, 3).pipeline([pipelineFunctions.accumulator]).invoke();
    const seq = generator(pipedSeq);
    expect(seq.next()).to.eql(2);
    expect(seq.next()).to.eql(7);
    expect(seq.next()).to.eql(15);
    expect(seq.next()).to.eql(26);
    return done();
  });
  it('test compose rangeSeq and accumulator', (done) => {
    const pipedSeq = pipe.pipeSeqMultiple(sequencers.rangeSeq, 2, 3).pipeline([pipelineFunctions.accumulator], [pipelineFunctions.accumulator]).invoke();
    const seq = generator(pipedSeq);
    expect(seq.next()).to.eql(2);
    expect(seq.next()).to.eql(9);
    expect(seq.next()).to.eql(24);
    expect(seq.next()).to.eql(50);
    return done();
  });
  it('test compose throw error for not passing func in pipeline', (done) => {
    expect(() => pipe.pipeSeqMultiple(sequencers.rangeSeq, 2, 3).pipeline()).to.throw(Error);
    return done();
  });
  it('test compose throw error for not passing func type in pipeline', (done) => {
    expect(() => pipe.pipeSeq(sequencers.rangeSeq, 2, 3).pipeline(['test'])).to.throw(Error);
    return done();
  });
});
