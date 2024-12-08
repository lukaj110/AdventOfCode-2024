// Input

const input = await Deno.readTextFile("./input.txt");

const text = input.split("\r\n").map((e) => e.split(""));

// Part 1

const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

let xmasCount = 0;

text.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    if (col === "X") {
      directions.forEach(([rowOffset, colOffset]) => {
        let found = true;

        ["M", "A", "S"].forEach((char, index) => {
          if (!found) return;

          const nextRowIndex = rowIndex + rowOffset * (index + 1);
          const nextColIndex = colIndex + colOffset * (index + 1);
          const currentLetter = text[nextRowIndex]?.[nextColIndex];

          if (!currentLetter) found = false;
          else if (currentLetter !== char) found = false;
        });

        if (found) xmasCount += 1;
      });
    }
  });
});

console.log(xmasCount);

// Part 2

let masCount = 0;

text.forEach((row, rowIndex) => {
  row.forEach((col, colIndex) => {
    if (col === "A") {
      const topLeftCharacter = text[rowIndex - 1]?.[colIndex - 1];
      const bottomRightCharacter = text[rowIndex + 1]?.[colIndex + 1];

      const topRightCharacter = text[rowIndex - 1]?.[colIndex + 1];
      const bottomLeftCharacter = text[rowIndex + 1]?.[colIndex - 1];

      if (
        ![
          topLeftCharacter,
          bottomLeftCharacter,
          topRightCharacter,
          bottomRightCharacter,
        ].every((char) => ["M", "S"].includes(char))
      )
        return;

      if (
        topLeftCharacter !== bottomRightCharacter &&
        topRightCharacter !== bottomLeftCharacter
      )
        masCount += 1;
    }
  });
});

console.log(masCount);
