// Input

const input = await Deno.readTextFile("./input.txt");

const map = input.split("\r\n").map((e) => e.split("").map((e) => parseInt(e)));

// Part 1

const visitedFinishes: Map<string, string[]> = new Map();

const directions: [number, number][] = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function traversePaths(
  map: number[][],
  currentPosition: [number, number],
  visitedArray: string[]
) {
  const [row, column] = currentPosition;

  const position = map[row][column];

  for (const [rowOffset, colOffset] of directions) {
    const nextRowIndex = row + rowOffset;
    const nextColIndex = column + colOffset;

    const nextPosition = map[nextRowIndex]?.[nextColIndex];

    if (!nextPosition || nextPosition < 1) continue;

    if (position === 8 && nextPosition === 9) {
      visitedArray.push(`${nextRowIndex}-${nextColIndex}`);
      continue;
    }
    if (position + 1 === nextPosition) {
      traversePaths(map, [nextRowIndex, nextColIndex], visitedArray);
    }
  }

  return visitedArray;
}

for (let i = 0; i < map.length; i++) {
  const row = map[i];
  for (let j = 0; j < row.length; j++) {
    const position = row[j];

    if (position !== 0) continue;

    const visited = traversePaths(map, [i, j], []);

    visitedFinishes.set(`${i}-${j}`, visited);
  }
}

const values = [...visitedFinishes.values()].map((row) => {
  return row.filter(
    (position, index) => row.findIndex((pos) => pos === position) === index
  );
});

let trailheadScore = values.reduce((partialSum, b) => partialSum + b.length, 0);

console.log(trailheadScore);

// Part 2

trailheadScore = [...visitedFinishes.values()].reduce(
  (partialSum, b) => partialSum + b.length,
  0
);

console.log(trailheadScore);
