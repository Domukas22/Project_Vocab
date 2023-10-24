//
//
//
//
// Count the largest component of a given graph

function GETlargestComponentCount(graph) {
  const visited = new Set();
  let num = 0;
  for (let node in graph) {
    num = Math.max(num, explore(graph, node, visited));
  }

  return num;
}
function explore(graph, currentNODE, visited) {
  if (visited.has(String(currentNODE))) return 0;
  visited.add(String(currentNODE));
  let count = 1;

  for (let neighbour of graph[currentNODE]) {
    count += explore(graph, neighbour, visited);
  }

  return count;
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
console.log(GETlargestComponentCount(graph));
