//
//
//
//
// REMEMBER: with pop(), you are removing the last element form the stack
// breadth first is only possible itteratively, becasue it requires a que

const PRINTbreadthFirst = (graph, node) => {
  const que = [node];
  while (que.length > 0) {
    const current = que.shift();
    console.log(current);
    for (let neighbour of graph[current]) {
      que.push(neighbour);
    }
  }
};

const graph = {
  a: ["c", "b"],
  b: ["d"],
  c: ["e"],
  d: ["f"],
  e: [],
  f: [],
};
PRINTbreadthFirst(graph, "a");
