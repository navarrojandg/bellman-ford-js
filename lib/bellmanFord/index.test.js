/* eslint-disable new-cap */
const BellmanFord = require('./index');
const Graph = require('../graph/index');

describe('Bellman Ford', () => {
  it('figure 24.4 CLRS 3rd ed. returns true', () => {
    const array = [
      // s , t  ,  x  ,  y   , z
      [null, 6, null, 7, null], // s
      [null, null, 5, 8, -4], // t
      [null, -2, null, null, null], // x
      [null, null, -3, null, 9], // y
      [2, null, 7, null, null], // z
    ]; // returns true

    const G = new Graph();
    G.fromArray(array);
    const s = G.getVertex('v_0');
    expect(BellmanFord(G, s)).toBeTruthy();
  });
  it('figure 25.1 CLRS 3rd ed. returns true', () => {
    const array = [
      //  1,   2,     3,    4,    5
      [null, 3, 8, null, -4], // 1
      [null, null, null, 1, 7], // 2
      [null, 4, null, null, null], // 3
      [2, null, -5, null, null], // 4
      [null, null, null, 6, null], // 5
    ]; // returns true

    const G = new Graph();
    G.fromArray(array);
    const s = G.getVertex('v_0');
    expect(BellmanFord(G, s)).toBeTruthy();
  });
  it('exam 2 4A returns false', () => {
    const array = [
      //  1,   2,     3,    4,    5
      [null, 3, -8, null, -4], // 1
      [null, null, null, 1, 7], // 2
      [null, 4, null, null, 3], // 3
      [2, null, -5, null, null], // 4
      [null, null, null, 6, null], // 5
    ]; // returns true

    const G = new Graph();
    G.fromArray(array);
    const s = G.getVertex('v_0');
    expect(BellmanFord(G, s)).toBeFalsy();
  });
  it('exam 2 4B returns true', () => {
    const array = [
      //  1,   2,     3,    4,    5
      [null, 3, -6, null, -4], // 1
      [null, null, null, 1, 7], // 2
      [null, 4, null, null, 3], // 3
      [2, null, -5, null, null], // 4
      [null, null, null, 6, null], // 5
    ]; // returns true

    const G = new Graph();
    G.fromArray(array);
    expect(G.vertexLength).toBe(5);
    expect(G.edgeLength).toBe(10);
    const s = G.getVertex('v_0');
    expect(BellmanFord(G, s)).toBeTruthy();
  });
  it('simple example returns false', () => {
    const array = [
      //  0,    1,    2,    3
      [null, 1, null, null], // 0
      [null, null, -1, null], // 1
      [null, null, null, -1], // 2
      [-1, null, null, null], // 3
    ];

    const G = new Graph();
    G.fromArray(array);
    expect(G.vertexLength).toBe(4);
    expect(G.edgeLength).toBe(4);
    const s = G.getVertex('v_0');
    expect(BellmanFord(G, s)).toBeFalsy();
  });
});
