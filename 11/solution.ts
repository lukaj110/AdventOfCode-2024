// Input

const input = await Deno.readTextFile("./input.txt");

const stones = input.split(" ");

// Part 1

const stonesMap: Map<number, number> = new Map();

function initialize(map: Map<number, number>, stones: string[]) {
  for (const stone of stones) {
    const parsedStone = parseInt(stone);

    const mappedStone = map.get(parsedStone);

    if (!mappedStone) {
      map.set(parsedStone, 1);
    } else {
      map.set(parsedStone, mappedStone + 1);
    }
  }
}

function doBlink(stonesMap: Map<number, number>) {
  for (const [stone, count] of [...stonesMap.entries()]) {
    if (count === 0) continue;

    const stoneString = stone.toString();

    if (stone == 0) {
      const oneStoneCount = stonesMap.get(1);
      stonesMap.set(1, (oneStoneCount ?? 0) + count);

      const currentCount = stonesMap.get(stone)!;
      stonesMap.set(stone, currentCount - count);
    } else if (stoneString.length % 2 === 0) {
      const halfIndex = stoneString.length / 2;

      const firstHalf = Math.floor(stone / Math.pow(10, halfIndex));
      const secondHalf = Math.floor(stone % Math.pow(10, halfIndex));

      const firstHalfCount = stonesMap.get(firstHalf);
      stonesMap.set(firstHalf, (firstHalfCount ?? 0) + count);

      const secondHalfCount = stonesMap.get(secondHalf);
      stonesMap.set(secondHalf, (secondHalfCount ?? 0) + count);

      const currentCount = stonesMap.get(stone)!;
      stonesMap.set(stone, currentCount - count);
    } else {
      const newStone = stone * 2024;

      const newStoneCount = stonesMap.get(newStone);
      stonesMap.set(newStone, (newStoneCount ?? 0) + count);

      const currentCount = stonesMap.get(stone)!;
      stonesMap.set(stone, currentCount - count);
    }
  }
}

function blinkTimes(stonesMap: Map<number, number>, count: number) {
  for (let i = 0; i < count; i++) doBlink(stonesMap);
}

initialize(stonesMap, stones);

blinkTimes(stonesMap, 25);

let stonesCount = [...stonesMap.values()].reduce((a, b) => a + b, 0);

console.log(stonesCount);

// Part 2

blinkTimes(stonesMap, 50);

stonesCount = [...stonesMap.values()].reduce((a, b) => a + b, 0);

console.log(stonesCount);
