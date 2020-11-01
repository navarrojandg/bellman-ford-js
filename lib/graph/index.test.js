const Vertex = require('../vertex');
const Graph = require('./index');

/** @type {Graph} */
let g;
beforeEach(() => {
  g = new Graph();
});

describe('Graph', () => {
  it('constructs', () => {
    expect(g.vertices).toBeTruthy();
  });
  it('adds vertices', () => {
    const a = new Vertex('a');
    const b = new Vertex('b');
    const c = new Vertex('c');
    g.addVertices(a);
    expect(g.getVertex('a')).toBeInstanceOf(Vertex);
    expect(g.getVertex('a')).toBe(a);
    expect(g.vertexLength).toBe(1);

    g.addVertices(b, c);
    expect(g.vertexLength).toBe(3);
  });
  it('adds edges', () => {
    const a = new Vertex('a');
    const b = new Vertex('b');
    const c = new Vertex('c');

    g.addEdge(a, b, 3);
    expect(g.edgeLength).toBe(0);
    expect(g.getWeight(a, b)).toBe(null);

    g.addVertices(a, b, c);
    g.addEdge(a, b, 3);
    expect(g.edgeLength).toBe(1);
    expect(g.getWeight(a, b)).toBe(3);

    g.addEdge(a, c, 4);
    g.addEdge(b, c);
    expect(g.edgeLength).toBe(2);
    g.addEdge(b, c, null);
    expect(g.edgeLength).toBe(2);
    expect(g.getWeight(a, c)).toBe(4);
    expect(g.getWeight(b, c)).toBe(null);
  });
  it('can check if vertex in graph', () => {
    const a = new Vertex('a');
    expect(g.hasVertex(a)).toBeFalsy();
    expect(g.hasVertex('a')).toBeFalsy();
  });
  it('generates edge string', () => {
    const a = new Vertex('a');
    const b = new Vertex('b');
    const c = new Vertex('c');
    expect(g.getEdgeString(a, b)).toBe(`${a.id}${b.id}`);
    expect(g.getEdgeString(c, b)).toBe('cb');
  });
  it('init single source', () => {
    const a = new Vertex('a');
    const b = new Vertex('b');
    const c = new Vertex('c');
    g.addVertices(a, b, c);

    let isInitialized = false;
    isInitialized = Array.from(g.vertexIterable)
        .filter((v) => v.d == 0)
        .length == 1;
    expect(isInitialized).toBeFalsy();

    g.initSingleSource(a);
    isInitialized = Array.from(g.vertexIterable)
        .filter((v) => v.d == 0)
        .length == 1;
    expect(isInitialized).toBeTruthy();
    expect(g.getVertex('a').d).toBe(0);
    expect(g.getVertex('b').d).toBe(null);
    expect(g.getVertex('c').d).toBe(null);
  });
  it('safely compares null and numerical values', () => {
    expect(Graph.nullSafeLessThan(null, null)).toBeFalsy();
    expect(Graph.nullSafeLessThan(12, null)).toBeTruthy();
    expect(Graph.nullSafeLessThan(null, 10)).toBeFalsy();
    expect(Graph.nullSafeLessThan(10, 10)).toBeFalsy();
    expect(Graph.nullSafeLessThan(-2, -2)).toBeFalsy();
  });
  it('relaxes edges', () => {
    const a = new Vertex('a');
    const b = new Vertex('b');
    g.addVertices(a, b);
    g.addEdge(a, b, 2);
    g.initSingleSource(a);

    g.relaxEdge(a, b);
    expect(b.d).toBe(2);
    expect(b.parent).toBe(a);

    a.d = 5;
    b.d = 9;
    g.relaxEdge(a, b);
    expect(b.d).toBe(7);
    expect(b.parent).toBe(a);

    b.d = 6;
    g.relaxEdge(a, b);
    expect(b.d).toBe(6);
    expect(b.parent).toBe(a);
  });
  it('init from array', () => {
    const array = [
      // s , t  ,  x  ,  y   , z
      [null, 6, null, 7, null], // s
      [null, null, 5, 8, -4], // t
      [null, -2, null, null, null], // x
      [null, null, -3, null, 9], // y
      [2, null, 7, null, null], // z
    ];

    g.fromArray(array);
    expect(g.vertexLength).toBe(5);
    expect(g.edgeLength).toBe(10);

    const s = g.getVertex(`v_0`);
    const t = g.getVertex(`v_1`);
    const x = g.getVertex(`v_2`);
    const y = g.getVertex(`v_3`);
    const z = g.getVertex(`v_4`);

    expect(g.getWeight(s, t)).toBe(6);
    expect(g.getWeight(s, y)).toBe(7);

    expect(g.getWeight(t, x)).toBe(5);
    expect(g.getWeight(t, y)).toBe(8);
    expect(g.getWeight(t, z)).toBe(-4);

    expect(g.getWeight(x, t)).toBe(-2);
    expect(g.getWeight(x, s)).toBeNull();
    expect(g.getWeight(x, y)).toBeNull();
    expect(g.getWeight(x, z)).toBeNull();

    expect(g.getWeight(y, x)).toBe(-3);
    expect(g.getWeight(y, z)).toBe(9);

    expect(g.getWeight(z, s)).toBe(2);
    expect(g.getWeight(z, x)).toBe(7);
  });
});
