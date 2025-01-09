import { checkForName } from "../checkForName";

// Mock the alert function
global.alert = jest.fn();

// Mock the console.log function
global.console = {
  ...console,
  log: jest.fn(),
};

describe("checkForName", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();
  });

  it('should alert "Welcome, Captain!" when inputText is a valid name', () => {
    const validName = "Picard";
    checkForName(validName);

    // Verify console.log was called correctly
    expect(console.log).toHaveBeenCalledWith(
      "::: Running checkForName :::",
      validName
    );

    // Verify alert was called with the correct message
    expect(alert).toHaveBeenCalledWith("Welcome, Captain!");
  });

  it('should alert "Enter a valid captain name" when inputText is not a valid name', () => {
    const invalidName = "Spock";
    checkForName(invalidName);

    // Verify console.log was called correctly
    expect(console.log).toHaveBeenCalledWith(
      "::: Running checkForName :::",
      invalidName
    );

    // Verify alert was called with the correct message
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });

  it('should alert "Enter a valid captain name" for empty input', () => {
    const emptyInput = "";
    checkForName(emptyInput);

    expect(console.log).toHaveBeenCalledWith(
      "::: Running checkForName :::",
      emptyInput
    );
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });

  it('should alert "Enter a valid captain name" for null input', () => {
    const nullInput = null;
    checkForName(nullInput);

    expect(console.log).toHaveBeenCalledWith(
      "::: Running checkForName :::",
      nullInput
    );
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });

  it('should alert "Enter a valid captain name" for undefined input', () => {
    const undefinedInput = undefined;
    checkForName(undefinedInput);

    expect(console.log).toHaveBeenCalledWith(
      "::: Running checkForName :::",
      undefinedInput
    );
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });

  it("should handle case sensitivity correctly", () => {
    const lowerCaseName = "kirk";
    checkForName(lowerCaseName);

    expect(console.log).toHaveBeenCalledWith(
      "::: Running checkForName :::",
      lowerCaseName
    );
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });
});
