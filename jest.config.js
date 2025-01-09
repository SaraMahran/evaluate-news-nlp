// jest.config.js

module.exports = {
  // Specifies the root directory for Jest to scan for tests and modules
  roots: ["<rootDir>/src/js"],

  // Uses babel-jest to transpile tests and source files
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },

  // Specifies the test environment (jsdom) using jest-environment-jsdom
  testEnvironment: "jest-environment-jsdom",

  // Specifies module file extensions for importing
  moduleFileExtensions: ["js", "jsx", "json", "node"],

  // Setup files after the environment is set up (optional)
  setupFilesAfterEnv: ["<rootDir>/src/js/setupTests.js"],

  // Coverage report configuration (optional)
  collectCoverage: true,
  collectCoverageFrom: ["src/js/**/*.{js,jsx}"],
};
