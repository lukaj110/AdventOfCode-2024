// Input

const input = await Deno.readTextFile("./input.txt");

// Part 1

function getRegexArraySum(matches: RegExpExecArray[]) {
  return matches
    .map((e) => e[0])
    .map((e) => [...e.matchAll(numberRegex)].map((e) => e[0]))
    .map((e) => parseInt(e[0]) * parseInt(e[1]))
    .reduce((a, b) => a + b);
}

const mulRegex = /mul\(\d+,\d+\)/g;

const numberRegex = /\d+/g;

const regexMatches = [...input.matchAll(mulRegex)];

const sum = getRegexArraySum(regexMatches);

console.log(sum);

// Part 2

const toggleRegex = /do\(\)|don't\(\)/g;

const toggles = [...input.matchAll(toggleRegex)]
  .map((e) => {
    return { toggle: e[0] === "do()", index: e.index };
  })
  .sort((a, b) => a.index - b.index);

const filteredMatches = regexMatches.filter((match) => {
  const lastToggle = toggles.findLast((toggle) => toggle.index < match.index);

  if (lastToggle === undefined) return true;

  return lastToggle.toggle;
});

const filteredSum = getRegexArraySum(filteredMatches);

console.log(filteredSum);
