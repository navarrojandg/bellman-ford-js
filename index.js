/* eslint-disable new-cap */
const BellmanFord = require('./lib/bellmanFord/index');
const Graph = require('./lib/graph/index');

const array = [
  //  1,    2,    3,    4,    5,    6,    7,    8
  [null, null, null, null, null, null, -2, 3], // 1
  [5, null, 2, null, 1, 1, null, null], // 2
  [null, null, null, null, null, -1, null, null], // 3
  [null, null, 4, null, null, null, -1, null], // 4
  [4, null, null, null, null, null, null, 3], // 5
  [5, null, null, -2, 0, null, null, null], // 6
  [10, 2, 4, null, null, 3, null, 5], // 7
  [1, 0, 1, 2, null, 0, null, null], // 8
];

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
