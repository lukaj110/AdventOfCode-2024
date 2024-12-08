// Input

const input = await Deno.readTextFile("./input.txt");

const [rulesText, updatesText] = input.split("\r\n\r\n");

const rules = rulesText
  .split("\r\n")
  .map((e) => e.split("|"))
  .map((str) => str.map((x) => parseInt(x)));

const updates = updatesText
  .split("\r\n")
  .map((e) => e.split(","))
  .map((str) => str.map((x) => parseInt(x)));

// Part 1

let middleSum = 0;

const incorrectUpdates: number[][] = [];

function getIsUpdateValid(update: number[], rules: number[][]) {
  let allRulesPassed = true;

  const applicableRules = rules.filter((rule) =>
    rule.every((num) => update.includes(num))
  );

  update.forEach((number, index) => {
    const specificRules = applicableRules.filter((rule) =>
      rule.includes(number)
    );

    const allPassed = specificRules
      .map(([before, after]) => {
        if (before === number) {
          const afterIndex = update.findIndex((num) => num === after);

          return index < afterIndex;
        }

        const beforeIndex = update.findIndex((num) => num === before);

        return index > beforeIndex;
      })
      .every((e) => e);

    if (!allPassed) allRulesPassed = false;
  });

  return allRulesPassed;
}

updates.forEach((update) => {
  const updateValid = getIsUpdateValid(update, rules);

  if (updateValid) {
    const middleNumber = update[Math.floor(update.length / 2)];

    middleSum += middleNumber;
  } else {
    incorrectUpdates.push(update);
  }
});

console.log(middleSum);

// Part 2

let correctedSum = 0;

incorrectUpdates.forEach((incorrectUpdate) => {
  const sorted = incorrectUpdate.sort((a, b) => {
    const applicableRules = rules.find(
      (rule) => rule.includes(a) && rule.includes(b)
    );

    if (!applicableRules) return 0;

    if (applicableRules![1] === a) return 1;

    return -1;
  });

  const middleNumber = sorted[Math.floor(sorted.length / 2)];

  correctedSum += middleNumber;
});

console.log(correctedSum);
