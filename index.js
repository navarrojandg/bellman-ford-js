/* eslint-disable new-cap */
const BellmanFord = require('./lib/bellmanFord/index');
const Graph = require('./lib/graph/index');

const array = [
  // s , t  ,  x  ,  y   , z
  [null, 6, null, 7, null], // s
  [null, null, 5, 8, -4], // t
  [null, -2, null, null, null], // x
  [null, null, -3, null, 9], // y
  [2, null, 7, null, null], // z
];

const G = new Graph();
G.fromArray(array);
const s = G.getVertex(`v_0`);

console.log(BellmanFord(G, s));
for (const v of G.vertexIterable) {
  console.log(v.id, v.d);
};
