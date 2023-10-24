//
//
//
//
//
//
function GET_smallestIslandCount(grid) {
  const visited = new Set();
  let smallest = Infinity;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      const result = explore_recursive(grid, row, col, visited);
      if (result > 0 && result < smallest) {
        smallest = result;
      }
    }
  }
  return smallest;
}

function explore_recursive(grid, row, col, visited) {
  // are number inside grid?
  if (row < 0 || grid.length - 1 < row) return 0;
  if (col < 0 || grid[0].length - 1 < col) return 0;

  // is it Land?
  if (grid[row][col] !== "L") return 0;

  // why store strings? See
  if (visited.has(row + ", " + col)) return 0;
  visited.add(row + ", " + col);

  let size = 1;
  size += explore_recursive(grid, row, col - 1, visited);
  size += explore_recursive(grid, row, col + 1, visited);
  size += explore_recursive(grid, row - 1, col, visited);
  size += explore_recursive(grid, row + 1, col, visited);

  return size;
}
const grid = [
  ["L", "W", "W", "L", "L"],
  ["L", "W", "W", "W", "W"],
  ["W", "W", "W", "L", "W"],
  ["W", "W", "L", "L", "W"],
  ["W", "W", "W", "L", "L"],
  ["L", "W", "W", "W", "W"],
];

console.log(GET_smallestIslandCount(grid));
