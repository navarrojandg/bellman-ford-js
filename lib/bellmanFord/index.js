const {nullSafeLessThan, nullSafeSum} = require('../graph/index');
/** @typedef {import('../graph/index')} Graph */
/** @typedef {import('../vertex/index')} Vertex */

/**
 * Runs the bellman-ford algorithm on G, with source s
 * @param {Graph} G
 * @param {Vertex} s
 * @return {boolean} false if negative weight edge cycle exists
 */
function BellmanFord(G, s) {
  G.initSingleSource(s);
  for (let i = 0; i < G.vertexLength-1; i++) {
    for (const u of G.vertexIterable) {
      for (const v of u.adjacencyList) {
        G.relaxEdge(u, v);
      };
    };
  };
  for (const u of G.vertexIterable) {
    for (const v of u.adjacencyList) {
      const edgeWeight = G.getWeight(u, v);
      const sum = nullSafeSum(u.d, edgeWeight);
      if (nullSafeLessThan(sum, v.id)) {
        return false;
      };
    };
  };
  return true;
};

module.exports = BellmanFord;
