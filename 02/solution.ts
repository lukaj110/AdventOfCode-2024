// Input

const text = await Deno.readTextFile("./input.txt");

const input = text
  .split("\r\n")
  .map((e) => e.split(" "))
  .map((e) => e.map((x) => parseInt(x)));

// Part 1

const MIN_VALUE_CHANGE = 1;

const MAX_VALUE_CHANGE = 3;

function getDifferences(numbers: number[]) {
  return numbers.slice(0, -1).map((value, index) => {
    const nextValue = numbers[index + 1];

    const difference = nextValue - value;

    return difference;
  });
}

const safeCount = input.filter((row) => {
  const differences = getDifferences(row);

  return (
    differences.every((value) => {
      return value >= MIN_VALUE_CHANGE && value <= MAX_VALUE_CHANGE;
    }) ||
    differences.every((value) => {
      return value <= -MIN_VALUE_CHANGE && value >= -MAX_VALUE_CHANGE;
    })
  );
}).length;

console.log(safeCount);

// Part 2

const saferCount = input.filter((row) => {
  const allPossibilities = row.map((_, index) => {
    const slicedArray = row.filter((_, idx) => index !== idx);
    return getDifferences(slicedArray);
  });

  return allPossibilities.some((numbers) => {
    return (
      numbers.every((value) => {
        return value >= MIN_VALUE_CHANGE && value <= MAX_VALUE_CHANGE;
      }) ||
      numbers.every((value) => {
        return value <= -MIN_VALUE_CHANGE && value >= -MAX_VALUE_CHANGE;
      })
    );
  });
}).length;

console.log(saferCount);
