//
//
//
//
// REMEMBER: with pop(), you are removing the last element form the stack
// depth first is possible itteratively/recursively

const PRINTdepthFirst_loop = (graph, node) => {
  const stack = [node];

  while (stack.length > 0) {
    const current = stack.pop();
    console.log(current);

    for (let neighbour of graph[current]) {
      stack.push(neighbour);
    }
  }
};

const PRINTdepthFirst_recursion = (graph, node) => {
  console.log(node);
  for (let neighbour of graph[node]) {
    PRINTdepthFirst_recursion(graph, neighbour);
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
PRINTdepthFirst_recursion(graph, "a");
