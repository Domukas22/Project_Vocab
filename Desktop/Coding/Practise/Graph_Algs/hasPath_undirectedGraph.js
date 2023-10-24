//
//
//
//
// Is there a path that exists between the nodes a and b?

// Edge-list
// Turned into adjacency-list/graph by BUILDgraph()
// This graph is UNDIRECTED and has 2 cycles: i-j-k and o-n
const edges = [
  ["i", "j"],
  ["k", "i"],
  ["m", "k"],
  ["k", "l"],
  ["o", "n"],
];

function BUILDgraph(edges) {
  const graph = {};

  for (let edge of edges) {
    const [a, b] = edge;

    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];

    // because the graph is undirected, push values both ways
    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
}

function HASpath_depthFirst(graph, node, targetNODE, visited) {
  if (visited.has(node)) return false;
  if (node === targetNODE) return true;

  visited.add(node);
  // In order to avoid cyclycal behaviour, we need to mark each visited node

  for (let neighbour of graph[node]) {
    if (HASpath_depthFirst(graph, neighbour, targetNODE, visited)) {
      return true;
    }
  }
  return false;
}

console.log(HASpath_depthFirst(BUILDgraph(edges), "i", "m", new Set()));
