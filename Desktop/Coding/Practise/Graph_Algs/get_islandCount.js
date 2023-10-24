//
//
//
//

function GET_smallestIslandCount(grid) {
  const visited = new Set();
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[0].length; col++) {
      if (explore_recursive(grid, row, col, visited)) {
        count += 1;
      }
    }
  }
  return count;
}
function explore_recursive(grid, row, col, visited) {
  // are number inside grid?
  if (row < 0 || grid.length - 1 < row) return false;
  if (col < 0 || grid[0].length - 1 < col) return false;

  // is it Land?
  if (grid[row][col] !== "L") return false;

  // why store strings? See
  if (visited.has(row + ", " + col)) return false;
  visited.add(row + ", " + col);

  explore_recursive(grid, row, col - 1, visited);
  explore_recursive(grid, row, col + 1, visited);
  explore_recursive(grid, row - 1, col, visited);
  explore_recursive(grid, row + 1, col, visited);

  return true;
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
//
//
//
//
//
//
// ----------------------------------------------------------------
// Two arrays with the same values are not considered equal
// unless they are the same object in memory ==> "new Set()" problem
// ==> Either create a named variable const array = [1,3]
// and place it into the Set, or store strings instead
const set = new Set();
set.add([1, 3]);
set.has([1, 3]); // does not have it

const set_2 = new Set();
const arr = [1, 3];
set.add(arr);
set.has(arr); // has it
