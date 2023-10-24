//
//
//
// return the shortest path between 2 given nodes

function GETshortestPath_breadthFirst(graph, nodeA, nodeB) {
  const visited = new Set([nodeA]); // brackets required when setting default values to Set()
  const que = [[nodeA, 0]];

  while (que.length > 0) {
    const [currNODE, count] = que.shift();
    if (currNODE === nodeB) return count;

    for (let neighbour of graph[currNODE]) {
      if (!visited.has(String(neighbour))) {
        visited.add(String(neighbour));
        que.push([neighbour, count + 1]);
      }
    }
  }

  return "uh oh";
}

function BUILDgraph(edges) {
  const graph = {};

  for (let edge of edges) {
    let [a, b] = edge;

    if (!(a in graph)) graph[a] = [];
    if (!(b in graph)) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }

  return graph;
}

const edges = [
  ["w", "x"],

  ["x", "y"],
  ["z", "y"],
  ["z", "v"],
  ["w", "v"],
];

console.log(GETshortestPath_breadthFirst(BUILDgraph(edges), "w", "z"));
console.log(BUILDgraph(edges));
