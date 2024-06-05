import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export type Command = "L" | "R" | "M";
export type Facing = "N" | "E" | "W" | "S";
export type Position = [number, number, Facing];

export const parseInput = (input: string): (string | number)[][] => {
  const inputLines = input.split(`\n`).filter((line) => line !== "");
  return inputLines.map((line, index) => {
    if (index === 0) return line.split(" ").map((letter) => parseInt(letter));
    if (index % 2 !== 0)
      return line
        .split(" ")
        .map((letter) => (isNaN(parseInt(letter)) ? letter : parseInt(letter)));
    if (index % 2 === 0) return line.split("");
  });
};

const getNewPos = (facing: Facing, command: Command) => {
  const map = {
    N: {
      L: "W",
      R: "E",
      M: 1,
    },
    S: {
      L: "E",
      R: "W",
      M: -1,
    },
    W: {
      L: "S",
      R: "N",
      M: -1,
    },
    E: {
      L: "N",
      R: "S",
      M: 1,
    },
  };

  return map[facing][command];
};

export const getNextPosition = (initPos: Position, command: Command) => {
  const [x, y, facing] = initPos;

  if (command === "L" || command === "R") {
    return [x, y, getNewPos(facing, command)];
  }

  if (command === "M") {
    if (facing === "N" || facing === "S")
      return [x, y + (getNewPos(facing, command) as number), facing];
    else return [x + (getNewPos(facing, command) as number), y, facing];
  }
};

export const orchestrator = (input: string) => {
  const parsedInput = parseInput(input);
  let final = [];
  const [boundX, boundY] = parsedInput[0];
  for (let index = 1; index < parsedInput.length; index += 2) {
    let finalPos = parsedInput[index];
    let finalPosStr = "";
    const commandsList = parsedInput[index + 1];
    commandsList.forEach((command) => {
      finalPos = getNextPosition(finalPos as Position, command as Command);
    });
    finalPosStr = finalPos.join(" ");
    final.push(finalPosStr);
    return final.map((pos) => `${pos[0]} ${pos[1]} ${pos[2]}`).join("\n");
  }
  return final.join("\n");
};

let input = "";
console.log(
  "Please enter the input, and use Ctrl+C when input has been entered:"
);
rl.on("line", (line) => {
  input += `${line.trim()}\n`;
});

rl.on("close", () => {
  console.log(`Result:\n ${orchestrator(input)}`);
});
