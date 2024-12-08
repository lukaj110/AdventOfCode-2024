// Input

const text = await Deno.readTextFile("./input.txt");

const input = text
  .split("\r\n")
  .map((e) => e.split("   "))
  .map((e) => e.map((x) => parseInt(x)));

const first = input.map((e) => e[0]).sort();

const second = input.map((e) => e[1]).sort();

// Part 1

let totalDistance = 0;

for (let i = 0; i < first.length; i++) {
  totalDistance +=
    Math.max(first[i], second[i]) - Math.min(first[i], second[i]);
}

console.log(totalDistance);

// Part 2

let similarityScore = 0;

for (let i = 0; i < first.length; i++) {
  similarityScore += first[i] * second.filter((e) => first[i] === e).length;
}

console.log(similarityScore);
