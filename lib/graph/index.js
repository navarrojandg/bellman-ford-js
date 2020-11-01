/** @typedef {import('../vertex/index')} Vertex */

const Vertex = require('../vertex');

class Graph {
  constructor() {
    /** @private @type {Map<String, Vertex>} */
    this.vertices = new Map();

    /** @private @type {Map<String, Number>} */
    this.weights = new Map();
  };

  /**
   * @param {...Vertex} vertices
   */
  addVertices(...vertices) {
    for (let i = 0; i < vertices.length; i++) {
      this.vertices.set(vertices[i].id, vertices[i]);
    };
  };

  /**
   * @param {Vertex} u
   * @param {Vertex} v
   * @param {Number} w - weight of the edge (u,v)
   */
  addEdge(u, v, w=null) {
    if (this.hasVertex(u) && this.hasVertex(v)) {
      if (w != null ) u.addEdge(v);
      const edge = this.getEdgeString(u, v);
      this.weights.set(edge, w);
    };
  };

  /**
   * Returns a reference to the given vertex in the graph.
   * @param {String} id - vertex identifier
   * @return {Vertex}
   */
  getVertex(id) {
    return this.vertices.get(id);
  };

  /**
   * @param {Vertex} u
   * @param {Vertex} v
   * @return {Number}
   */
  getWeight(u, v) {
    const edge = this.getEdgeString(u, v);
    if (this.weights.has(edge)) return this.weights.get(edge);
    return null;
  };

  /**
   * @param {Vertex} u
   * @param {Vertex} v
   * @return {String} string representation of edge of (u,v)
   */
  getEdgeString(u, v) {
    return `${u.id}${v.id}`;
  };

  /**
   * @param {Vertex | String} u
   * @return {boolean}
   */
  hasVertex(u) {
    if (typeof u == 'string') {
      return this.vertices.has(u);
    };
    if (u instanceof Vertex) {
      return this.vertices.has(u.id);
    };
    return false;
  };

  /**
   * @param {Vertex} s - source vertex
   */
  initSingleSource(s) {
    for (const v of this.vertexIterable) {
      v.d = null;
      v.parent = null;
    };
    s.d = 0;
  };

  /**
   * Relax the edeg (u,v)
   * @param {Vertex} u
   * @param {Vertex} v
   */
  relaxEdge(u, v) {
    const edgeWeight = this.getWeight(u, v);
    const sum = Graph.nullSafeSum(u.d, edgeWeight);
    if (Graph.nullSafeLessThan(sum, v.d)) {
      v.d = sum;
      v.parent = u;
    };
  };


  /**
   * @param {Array.<Array.<Number>>} array
   */
  fromArray(array) {
    for (let i = 0; i < array.length; i++) {
      this.addVertices(new Vertex(`v_${i}`));
    };
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array[i].length; j++) {
        const edgeWeight = array[i][j];
        const u = this.getVertex(`v_${i}`);
        const v = this.getVertex(`v_${j}`);
        this.addEdge(u, v, edgeWeight);
      };
    };
  };

  get vertexLength() {
    return this.vertices.size;
  };

  get edgeLength() {
    let count = 0;
    for (const vertex of this.vertexIterable) {
      count += vertex.adjacencyList.length;
    };
    return count;
  };

  get vertexIterable() {
    return this.vertices.values();
  };

  /**
   * Assumes null is infinity. Compares a < b
   * @param {Number | null} a
   * @param {Number | null} b
   * @return {boolean} true if a < b, false if a > b
   */
  static nullSafeLessThan(a, b) {
    if (a == null && b == null) return false;
    if (a == null || b == null) return !(a < b);
    return a < b;
  };

  /**
   * Assumes null is infinity. Sums a + b
   * @param {Number | null} a
   * @param {Number | null} b
   * @return {Number | null}
   */
  static nullSafeSum(a, b) {
    if (a == null || b == null) return null;
    return a + b;
  };
};

module.exports = Graph;
