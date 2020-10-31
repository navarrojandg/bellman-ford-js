/** @typedef {import('../vertex/index')} Vertex */

class Path {
  constructor() {
    /** @type {Vertex[]} */
    this.path = [];
  };

  /**
   * @param {Vertex} vertex
   */
  add(vertex) {
    this.path.push(vertex);
  };

  get(index) {
    return this.path[index];
  };

  get length() {
    return this.path.length;
  };

  get isSelfCycle() {
    if (this.length == 1) return true;
    return false;
  };

  get isCycle() {
    if (this.length > 1) {
      return this.path[0] == this.path[this.length-1];
    } else {
      return this.isSelfCycle;
    };
  };

  /**
   * Check if path2 is the same cycle as path1.
   * @param {Path} path1
   * @param {Path} path2
   * @return {boolean} true if both paths form the same cycle
   */
  static isSameCycle(path1, path2) {
    let same = false;
    for (let i = 0; i < path2.length; i++) {
      for (let j = 0; j < path1.length; j++) {
        
      };
    };
    return same;
  };
};

module.exports = Path;
