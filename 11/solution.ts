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
  const tempMap = new Map(stonesMap);

  for (const [stone, count] of [...stonesMap.entries()]) {
    if (count === 0) continue;

    if (stone == "0") {
      const oneStoneCount = tempMap.get("1");

      tempMap.set("1", (oneStoneCount ?? 0) + count);

      const currentCount = tempMap.get(stone)!;

      tempMap.set(stone, currentCount - count);
    } else if (stone.length % 2 === 0) {
      const text = stone.split("");

      const firstHalf = text.slice(0, text.length / 2).join("");
      const secondHalf = text.slice(text.length / 2).join("");

      const firstHalfString = parseInt(firstHalf, 10).toString();
      const secondHalfString = parseInt(secondHalf, 10).toString();

      const firstHalfCount = tempMap.get(firstHalfString);
      const secondHalfCount = tempMap.get(secondHalfString);

      tempMap.set(firstHalfString, (firstHalfCount ?? 0) + count);
      tempMap.set(secondHalfString, (secondHalfCount ?? 0) + count);

      const currentCount = tempMap.get(stone)!;
      tempMap.set(stone, currentCount - count);
    } else {
      const newStone = (parseInt(stone, 10) * 2024).toString();

      const newStoneCount = tempMap.get(newStone);

      tempMap.set(newStone, (newStoneCount ?? 0) + count);

      const currentCount = tempMap.get(stone)!;

      tempMap.set(stone, currentCount - count);
    }
  }

  stonesMap.clear();

  tempMap.forEach((value, key) => stonesMap.set(key, value));
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
