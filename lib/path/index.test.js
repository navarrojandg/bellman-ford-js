const Path = require('./index');
const Vertex = require('../vertex/index');

/** @type {Path} */
let p;
beforeEach(() => {
  p = new Path();
});

describe('Path', () => {
  it('constructs', () => {
    expect(p.length).toBe(0);
    expect(p).toBeTruthy();
  });
  it('adds', () => {
    p.add(new Vertex());
    expect(p.length).toBe(1);
    expect(p.path[0]).toBeInstanceOf(Vertex);
  });
  it('detects self cycle', () => {
    expect(p.isSelfCycle).toBeFalsy();
    const v = new Vertex();
    p.add(v);
    expect(p.isSelfCycle).toBeTruthy();
    p.add(v);
    expect(p.isSelfCycle).toBeFalsy();
  });
  it('detects cycle', () => {
    expect(p.isCycle).toBeFalsy();
    const v = new Vertex();
    const w = new Vertex();
    const x = new Vertex();
    p.add(v);
    expect(p.isCycle).toBeTruthy();
    p.add(w);
    expect(p.isCycle).toBeFalsy();
    p.add(x);
    expect(p.isCycle).toBeFalsy();
    p.add(v);
    expect(p.isCycle).toBeTruthy();
  });
});
