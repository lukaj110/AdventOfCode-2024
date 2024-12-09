// Input

const input = await Deno.readTextFile("./input.txt");

const inputText = input.split("\r\n").map((e) => e.split(": "));

const numbers = inputText.map((e) => e[1]);

const result = inputText.map((e) => e[0]).map((e) => parseInt(e));

// Part 1

function generateStringCombinations(
  options: string[],
  length: number
): string[] {
  const combinations: string[] = [];

  function generateCombos(currentCombo: string, remainingLength: number): void {
    if (remainingLength === 0) {
      combinations.push(currentCombo);
      return;
    }

    for (const option of options) {
      generateCombos(currentCombo + option, remainingLength - 1);
    }
  }

  generateCombos("", length);

  return combinations;
}

let totalCalibrationResult = 0;

let options = ["+", "*"];

for (let i = 0; i < result.length; i++) {
  const currentResult = result[i];

  const currentNumbers = numbers[i].split(" ").map((e) => parseInt(e));

  const allCombinations: string[] = generateStringCombinations(
    options,
    currentNumbers.length - 1
  );

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

totalCalibrationResult = 0;

options = ["+", "*", "|"];

for (let i = 0; i < result.length; i++) {
  const currentResult = result[i];

  const currentNumbers = numbers[i].split(" ").map((e) => parseInt(e));

  const allCombinations: string[] = generateStringCombinations(
    options,
    currentNumbers.length - 1
  );

  let found = false;

  allCombinations.forEach((combination) => {
    if (found) return;

    let tempNumbers = [...currentNumbers];

    combination.split("").forEach((operation) => {
      const firstNumber = tempNumbers.shift()!;

      const secondNumber = tempNumbers.shift()!;

      if (operation === "|") {
        tempNumbers = [
          parseInt(`${firstNumber}${secondNumber}`),
          ...tempNumbers,
        ];
      } else {
        tempNumbers = [
          operation === "+"
            ? firstNumber + secondNumber
            : firstNumber * secondNumber,
          ...tempNumbers,
        ];
      }
    });

    if (currentResult === tempNumbers[0]) {
      totalCalibrationResult += currentResult;
      found = true;
    }
  });
}

console.log(totalCalibrationResult);
