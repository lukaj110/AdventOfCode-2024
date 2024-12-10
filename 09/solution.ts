// Input

const input = await Deno.readTextFile("./input.txt");

const text = input.split("").map((e) => parseInt(e));

// Part 1

type Data = {
  id: number | null;
};

const data: Data[] = [];

let fileIdCounter = 0;

// Implement count in the data structure for better performance

for (let i = 0; i < text.length; i++) {
  if (i % 2 === 0) {
    for (let j = 0; j < text[i]; j++) {
      data.push({ id: fileIdCounter });
    }
    fileIdCounter++;
  } else {
    for (let j = 0; j < text[i]; j++) {
      data.push({ id: null });
    }
  }
}

// Sort the data structure

for (let i = data.length - 1; 0 < i; i--) {
  const temp = data[i];

  if (temp.id === null) continue;

  const firstEmptyIndex = data.findIndex((e) => e.id === null);

  if (firstEmptyIndex > i) continue;

  data[firstEmptyIndex] = temp;

  data[i] = { id: null };
}

function calculateChecksum(data: Data[]) {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    const currentData = data[i];
    if (currentData.id === null) continue;
    sum += currentData.id * i;
  }

  return sum;
}

let checksum = calculateChecksum(data);

console.log(checksum);

// Part 2

type ExtendedData = Data & {
  count: number;
};

const newData: ExtendedData[] = [];

fileIdCounter = 0;

for (let i = 0; i < text.length; i++) {
  if (i % 2 === 0) {
    newData.push({ id: fileIdCounter, count: text[i] });
    fileIdCounter++;
  } else {
    newData.push({ id: null, count: text[i] });
  }
}

// Sort the data structure

function insertAtIndex(
  data: ExtendedData[],
  index: number,
  element: ExtendedData
) {
  data.splice(index, 0, element);
}

function calculateBlockChecksum(data: ExtendedData[]) {
  let sum = 0;

  let currentPosition = 0;

  for (let i = 0; i < data.length; i++) {
    const currentData = data[i];
    if (currentData.id === null) {
      currentPosition += currentData.count;
      continue;
    }

    for (let j = 0; j < currentData.count; j++) {
      sum += currentData.id * currentPosition;
      currentPosition++;
    }
  }

  return sum;
}

while (true) {
  let mutated = false;

  for (let i = newData.length - 1; 0 < i; i--) {
    const tempData = { ...newData[i] };

    if (tempData.id === null) continue;

    const firstEmptyIndex = newData.findIndex(
      (e) => e.id === null && tempData.count <= e.count
    );

    if (firstEmptyIndex > i) continue;

    const emptyData = { ...newData[firstEmptyIndex] };

    if (emptyData.count === tempData.count) {
      newData[i] = emptyData;
      newData[firstEmptyIndex] = tempData;

      mutated = true;
    } else if (emptyData.count > tempData.count) {
      newData[firstEmptyIndex].count -= tempData.count;
      insertAtIndex(newData, firstEmptyIndex, tempData);
      newData[i + 1].id = null;
      mutated = true;
    }

    if (mutated) break;
  }

  if (!mutated) break;
}

checksum = calculateBlockChecksum(newData);

console.log(checksum);
