// Input

const input = await Deno.readTextFile("./input.txt");

const stones = input.split(" ").map(Number);

// Part 1

const stonesMap: Map<number, number> = new Map();

stones.forEach((stone) => stonesMap.set(stone, stonesMap.get(stone) ?? 0 + 1));

function doBlink(stonesMap: Map<number, number>) {
  for (const [stone, count] of [...stonesMap.entries()]) {
    if (count === 0) continue;

    if (stone === 0) {
      const oneStoneCount = stonesMap.get(1) ?? 0;

      stonesMap.set(1, oneStoneCount + count);
      stonesMap.set(stone, (stonesMap.get(stone) ?? 0) - count);
    } else {
      const stoneString = stone.toString();

      if (stoneString.length % 2 === 0) {
        const halfIndex = stoneString.length / 2;
        const firstHalf = Math.floor(stone / 10 ** halfIndex);
        const secondHalf = Math.floor(stone % 10 ** halfIndex);

        const firstHalfCount = stonesMap.get(firstHalf) ?? 0;
        stonesMap.set(firstHalf, firstHalfCount + count);

        const secondHalfCount = stonesMap.get(secondHalf) ?? 0;
        stonesMap.set(secondHalf, secondHalfCount + count);
      } else {
        const newStone = stone * 2024;
        const newStoneCount = stonesMap.get(newStone) ?? 0;

        stonesMap.set(newStone, newStoneCount + count);
      }

      stonesMap.set(stone, (stonesMap.get(stone) ?? 0) - count);
    }
  }
}

function blinkTimes(stonesMap: Map<number, number>, count: number) {
  for (let i = 0; i < count; i++) doBlink(stonesMap);
}

blinkTimes(stonesMap, 25);

let stonesCount = [...stonesMap.values()].reduce((a, b) => a + b, 0);

console.log(stonesCount);

// Part 2

blinkTimes(stonesMap, 50);

stonesCount = [...stonesMap.values()].reduce((a, b) => a + b, 0);

console.log(stonesCount);
