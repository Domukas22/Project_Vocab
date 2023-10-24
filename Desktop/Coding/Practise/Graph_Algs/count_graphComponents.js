//
//
//
//
// Count all graph components (separate islands in graph)

function COUNTgraphComponents(graph) {
  const visited = new Set();
  let count = 0;
  for (let node in graph) {
    if (explore_depthFirst(graph, node, visited)) {
      count++;
    }
  }

  return count;
}
function explore_depthFirst(graph, currentNODE, visited) {
  // In JS, keys of an object will always be converted to STRINGS
  // the values in this example stay as NUMBER
  // --> let's convert everything to strings
  if (visited.has(String(currentNODE))) return false;
  visited.add(String(currentNODE));

  for (let neighbour of graph[currentNODE]) {
    explore_depthFirst(graph, neighbour, visited);
  }

  return true;
}

const graph = {
  0: [8, 1, 5],
  1: [0],
  5: [0, 8],
  8: [0, 5],
  2: [3, 4],
  3: [2, 4],
  4: [3, 2],
};

console.log(COUNTgraphComponents(graph));
