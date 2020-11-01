/* eslint-disable new-cap */
const BellmanFord = require('./lib/bellmanFord/index');
const Graph = require('./lib/graph/index');

// const array = [
//   // s , t  ,  x  ,  y   , z
//   [null, 6, null, 7, null], // s
//   [null, null, 5, 8, -4], // t
//   [null, -2, null, null, null], // x
//   [null, null, -3, null, 9], // y
//   [2, null, 7, null, null], // z
// ]; // returns true

// const array = [
//   //  1,   2,     3,    4,    5
//   [null, 3, -8, null, -4], // 1
//   [null, null, null, 1, 7], // 2
//   [null, 4, null, null, 3], // 3
//   [2, null, -5, null, null], // 4
//   [null, null, null, 6, null], // 5
// ]; // returns false

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
const s = G.getVertex(`v_0`);
const result = BellmanFord(G, s);
console.log(result);
if (result) {
  for (const v of G.vertexIterable) {
    let path = `${v.id} | d: ${v.d}`;
    let parent = v.parent;
    while (parent != null) {
      path = `${parent.id} -> ` + path;
      parent = parent.parent;
    };
    console.log(path);
  };
};
