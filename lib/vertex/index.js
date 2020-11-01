class Vertex {
  /** @param {string} id - unique vertex identifier */
  constructor(id) {
    this.id = id;

    /** @type {Vertex} */
    this.parent = null;

    /** @type {Vertex[]} */
    this.adjacencyList = [];

    /**
     * Shortest path estimate
     * @type {Number | null}
     */
    this.d = null;
  };

  /**
   * @param {Vertex} v
   */
  addEdge(v) {
    this.adjacencyList.push(v);
    v.parent = this;
  };
};

module.exports = Vertex;
