// Input

const input = await Deno.readTextFile("./input.txt");

const stones = input.split(" ");

// Part 1

const stonesMap: Map<string, number> = new Map();

function initialize(map: Map<string, number>, stones: string[]) {
  for (const stone of stones) {
    const mappedStone = map.get(stone);
    if (!mappedStone) {
      map.set(stone, 1);
    } else {
      map.set(stone, mappedStone + 1);
    }
  }
}

function doBlink(stonesMap: Map<string, number>) {
  for (const [stone, count] of [...stonesMap.entries()]) {
    if (count === 0) continue;

    if (stone == "0") {
      const oneStoneCount = stonesMap.get("1");
      stonesMap.set("1", (oneStoneCount ?? 0) + count);

      const currentCount = stonesMap.get(stone)!;
      stonesMap.set(stone, currentCount - count);
    } else if (stone.length % 2 === 0) {
      const halfIndex = stone.length / 2;

      const firstHalf = (+stone.slice(0, halfIndex)).toString();
      const secondHalf = (+stone.slice(halfIndex)).toString();

      const firstHalfCount = stonesMap.get(firstHalf);
      stonesMap.set(firstHalf, (firstHalfCount ?? 0) + count);

      const secondHalfCount = stonesMap.get(secondHalf);
      stonesMap.set(secondHalf, (secondHalfCount ?? 0) + count);

      const currentCount = stonesMap.get(stone)!;
      stonesMap.set(stone, currentCount - count);
    } else {
      const newStone = (parseInt(stone, 10) * 2024).toString();

      const newStoneCount = stonesMap.get(newStone);
      stonesMap.set(newStone, (newStoneCount ?? 0) + count);

      const currentCount = stonesMap.get(stone)!;
      stonesMap.set(stone, currentCount - count);
    }
  }
}

function blinkTimes(stonesMap: Map<string, number>, count: number) {
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
