//
//
//
//
//
function knightMoves(currPOS, tarPOS) {
  const [tarX, tarY] = tarPOS;
  const que = [[...currPOS, []]];

  while (que.length !== 0) {
    const [curX, curY, previousMOVES] = que.shift();
    if (curX === tarX && curY === tarY) return [...previousMOVES, [curX, curY]];
    if (!IS_posInBoard(curX, curY)) continue;

    // push new position to the que, with previous moves in memory
    que.push([curX - 2, curY - 1, [...previousMOVES, [curX, curY]]]);
    que.push([curX - 1, curY - 2, [...previousMOVES, [curX, curY]]]);
    que.push([curX + 1, curY - 2, [...previousMOVES, [curX, curY]]]);
    que.push([curX + 2, curY - 1, [...previousMOVES, [curX, curY]]]);
    que.push([curX + 2, curY + 1, [...previousMOVES, [curX, curY]]]);
    que.push([curX + 1, curY + 2, [...previousMOVES, [curX, curY]]]);
    que.push([curX - 1, curY + 2, [...previousMOVES, [curX, curY]]]);
    que.push([curX - 2, curY + 1, [...previousMOVES, [curX, curY]]]);
  }
}
function IS_posInBoard(curX, curY) {
  return 0 <= curX && 0 <= curY && curX <= 7 && curY <= 7;
}
console.log(knightMoves([0, 2], [7, 4]));
