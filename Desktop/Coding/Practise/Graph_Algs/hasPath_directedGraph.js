//
//
//
//
// Is there a path that exists between the nodes a and b?

const HASpath_breadthFirst = (graph, node, targetNODE) => {
  const que = [node];
  while (que.length > 0) {
    const current = que.shift();
    if (current === targetNODE) return true;
    for (let neighbour of graph[current]) {
      que.push(neighbour);
    }
  }

  return false;
};

const HASpath_depthFirst = (graph, node, targetNODE) => {
  if (node === targetNODE) return true;

  for (let neighbour of graph[node]) {
    if (HASpath_depthFirst(graph, neighbour, targetNODE)) {
      return true;
    }
  }
  return false;
};

// adjacencyLIST
// directed graph
// asyclycal
const graph = {
  f: ["g", "i"],
  g: ["h"],
  h: [],
  i: ["k", "g"],
  j: ["i"],
  k: [],
};
console.log(HASpath_breadthFirst(graph, "f", "j"));
