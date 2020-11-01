const Vertex = require('./index');

describe('Vertex', () => {
  it('constructs', () => {
    const a = new Vertex('a');
    expect(a).toBeTruthy();
    expect(a.parent).toBe(null);
    expect(a.d).toBe(null);
  });
  it('adds edge to adjacency list', () => {
    const a = new Vertex('a');
    const b = new Vertex('b');
    expect(a.adjacencyList.length).toBe(0);
    a.addEdge(b);
    expect(a.adjacencyList.length).toBe(1);
  });
  it('adds u as parent to v', () => {
    const u = new Vertex('u');
    const v = new Vertex('v');
    expect(v.parent).toBe(null);
    u.addEdge(v);
    expect(v.parent).toBe(u);
    expect(v.parent).toBeInstanceOf(Vertex);
    expect(u.adjacencyList.length).toBe(1);
  });
});
