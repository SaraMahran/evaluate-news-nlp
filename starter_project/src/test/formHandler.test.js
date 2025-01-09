import { handleSubmit } from "../formHandler";
import { checkForName } from "../nameChecker";

// Mock the checkForName function
jest.mock("../nameChecker", () => ({
  checkForName: jest.fn(),
}));

describe("handleSubmit", () => {
  let form;
  let input;

  beforeEach(() => {
    // Set up our document body
    document.body.innerHTML = `
      <form id="urlForm">
        <input type="text" id="name" value="Picard">
        <button type="submit">Submit</button>
      </form>
    `;

    form = document.getElementById("urlForm");
    input = document.getElementById("name");

    // Attach the event listener again since the DOM was reset
    form.addEventListener("submit", handleSubmit);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should prevent the default form submission behavior", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    handleSubmit(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it("should call checkForName with the input value", () => {
    const mockEvent = {
      preventDefault: jest.fn(),
    };

    handleSubmit(mockEvent);

    expect(checkForName).toHaveBeenCalledWith("Picard");
  });

  it("should alert the user when a valid name is entered", () => {
    // Assuming checkForName triggers an alert internally,
    // you might need to mock the alert function if it's used within checkForName.
    // Since checkForName is mocked, you can define its behavior here.

    checkForName.mockImplementation((name) => {
      if (["Picard", "Janeway", "Kirk", "Archer", "Georgiou"].includes(name)) {
        alert("Welcome, Captain!");
      } else {
        alert("Enter a valid captain name");
      }
    });

    // Mock the alert function
    global.alert = jest.fn();

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    handleSubmit(mockEvent);

    expect(alert).toHaveBeenCalledWith("Welcome, Captain!");
  });

  it("should alert the user when an invalid name is entered", () => {
    // Change the input value to an invalid name
    input.value = "Spock";

    // Mock the alert function
    global.alert = jest.fn();

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    handleSubmit(mockEvent);

    expect(checkForName).toHaveBeenCalledWith("Spock");
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });

  it("should handle empty input gracefully", () => {
    // Change the input value to an empty string
    input.value = "";

    // Mock the alert function
    global.alert = jest.fn();

    const mockEvent = {
      preventDefault: jest.fn(),
    };

    handleSubmit(mockEvent);

    expect(checkForName).toHaveBeenCalledWith("");
    expect(alert).toHaveBeenCalledWith("Enter a valid captain name");
  });
});
