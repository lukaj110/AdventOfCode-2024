// Input

const input = await Deno.readTextFile("./input.txt");

const board = input.split("\r\n").map((row) => row.split(""));

// Part 1

function getNextPosition(
  board: string[][],
  currentPosition: [number, number],
  direction: [number, number]
) {
  if (
    currentPosition[0] + direction[0] < 0 ||
    currentPosition[0] + direction[0] >= board.length
  )
    return;
  return board[currentPosition[0] + direction[0]]?.[
    currentPosition[1] + direction[1]
  ];
}

const directions: [number, number][] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let currentDirectionIndex = 0;

const startRowIndex = board.findIndex((e) => e.includes("^"));

const startColIndex = board[startRowIndex].findIndex((e) => e === "^");

let currentPosition: [number, number] = [startRowIndex, startColIndex];

const visitedPositions: Set<string> = new Set([
  `${currentPosition[0]},${currentPosition[1]}`,
]);

while (
  getNextPosition(board, currentPosition, directions[currentDirectionIndex])
) {
  const nextPosition = getNextPosition(
    board,
    currentPosition,
    directions[currentDirectionIndex]
  );

  if (nextPosition === "#") {
    if (currentDirectionIndex === directions.length - 1) {
      currentDirectionIndex = 0;
    } else currentDirectionIndex += 1;
  } else {
    currentPosition = [
      currentPosition[0] + directions[currentDirectionIndex][0],
      currentPosition[1] + directions[currentDirectionIndex][1],
    ];
  }

  const stateKey = `${currentPosition[0]},${currentPosition[1]}`;

  if (!visitedPositions.has(stateKey)) {
    visitedPositions.add(stateKey);
  }
}

console.log([...visitedPositions.entries()].length);

// Part 2 - Takes about 2 seconds after performance improvements

let timeLoopCount = 0;

for (let i = 0; i < board.length; i++) {
  for (let j = 0; j < board[i].length; j++) {
    if (board[i][j] !== "." || !visitedPositions.has(`${i},${j}`)) continue;

    const visited = new Set<string>();

    board[i][j] = "#";

    let currentDirectionIndex = 0;

    let currentPosition: [number, number] = [startRowIndex, startColIndex];

    while (true) {
      const nextPosition = getNextPosition(
        board,
        currentPosition,
        directions[currentDirectionIndex]
      );

      if (!nextPosition) break;

      if (nextPosition === "#") {
        currentDirectionIndex = (currentDirectionIndex + 1) % directions.length;
      } else {
        currentPosition = [
          currentPosition[0] + directions[currentDirectionIndex][0],
          currentPosition[1] + directions[currentDirectionIndex][1],
        ];
      }

      const stateKey = `${currentPosition[0]},${currentPosition[1]},${currentDirectionIndex}`;

      if (visited.has(stateKey)) {
        timeLoopCount++;
        break;
      }

      visited.add(stateKey);
    }

    board[i][j] = ".";
  }
}

console.log(timeLoopCount);
