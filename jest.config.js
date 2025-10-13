export const preset = "ts-jest";
export const testEnvironment = "node";
export const testMatch = ["**/*.test.ts"];
export const collectCoverageFrom = [
  "src/**/*.ts",
  "!src/server.ts", // Exclude server startup file
  "!src/types/**/*.ts", // Exclude type definitions
];

module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
};