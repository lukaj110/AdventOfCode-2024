// Input

const input = await Deno.readTextFile("./input.txt");

const inputText = input.split("\r\n").map((e) => e.split(": "));

const numbers = inputText.map((e) => e[1]);

const result = inputText.map((e) => e[0]).map((e) => parseInt(e));

// Part 1

const operations = ["*", "+"];

let totalCalibrationResult = 0;

for (let i = 0; i < result.length; i++) {
  const currentResult = result[i];

  const currentNumbers = numbers[i].split(" ").map((e) => parseInt(e));

  const allCombinations: string[] = [];

  for (let j = 0; j < 1 << (currentNumbers.length - 1); j++) {
    const binaryString = (j >>> 0)
      .toString(2)
      .padStart(currentNumbers.length - 1, "0")
      .replaceAll("0", operations[0])
      .replaceAll("1", operations[1]);

    allCombinations.push(binaryString);
  }

  let found = false;

  allCombinations.forEach((combination) => {
    if (found) return;

    let tempNumbers = [...currentNumbers];

    combination.split("").forEach((operation) => {
      const firstNumber = tempNumbers.shift()!;

      const secondNumber = tempNumbers.shift()!;

      tempNumbers = [
        operation === "+"
          ? firstNumber + secondNumber
          : firstNumber * secondNumber,
        ...tempNumbers,
      ];
    });

    if (currentResult === tempNumbers[0]) {
      totalCalibrationResult += currentResult;
      found = true;
    }
  });
}

console.log(totalCalibrationResult);

// Part 2
