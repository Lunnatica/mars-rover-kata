import {
  Facing,
  Position,
  getNextPosition,
  orchestrator,
  parseInput,
} from "./app";

describe("parseInput", () => {
  it("should receive the input and parse it", () => {
    const testInput = `5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM`;

    expect(parseInput(testInput)).toEqual([
      [5, 5],
      [1, 2, "N"],
      ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
      [3, 3, "E"],
      ["M", "M", "R", "M", "M", "R", "M", "R", "R", "M"],
    ]);
  });
});

describe("getNextPosition", () => {
  it.each`
    initialPos     | command | expected
    ${[1, 2, "N"]} | ${"L"}  | ${[1, 2, "W"]}
    ${[1, 2, "S"]} | ${"L"}  | ${[1, 2, "E"]}
    ${[1, 2, "E"]} | ${"L"}  | ${[1, 2, "N"]}
    ${[1, 2, "W"]} | ${"L"}  | ${[1, 2, "S"]}
    ${[1, 2, "N"]} | ${"R"}  | ${[1, 2, "E"]}
    ${[1, 2, "S"]} | ${"R"}  | ${[1, 2, "W"]}
    ${[1, 2, "E"]} | ${"R"}  | ${[1, 2, "S"]}
    ${[1, 2, "W"]} | ${"R"}  | ${[1, 2, "N"]}
    ${[1, 2, "N"]} | ${"M"}  | ${[1, 3, "N"]}
    ${[1, 2, "S"]} | ${"M"}  | ${[1, 1, "S"]}
    ${[1, 2, "E"]} | ${"M"}  | ${[2, 2, "E"]}
    ${[1, 2, "W"]} | ${"M"}  | ${[0, 2, "W"]}
  `(
    `should rotate the robot $command when it initially faces $initialPos[2]`,
    ({ initialPos, command, expected }) => {
      expect(getNextPosition(initialPos, command)).toEqual(expected);
    }
  );
});

describe("orchestrator", () => {
  it("should receive the input and return the final position of the robot", () => {
    const testInput = `5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM`;

    expect(orchestrator(testInput)).toEqual(`1 3 N\n5 1 E`);
  });
});
