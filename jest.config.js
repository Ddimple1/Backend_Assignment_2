export const preset = "ts-jest";
export const testEnvironment = "node";
export const testMatch = ["**/*.test.ts"];
export const collectCoverageFrom = [
  "src/**/*.ts",
  "!src/server.ts", // Exclude server startup file
  "!src/types/**/*.ts", // Exclude type definitions
];