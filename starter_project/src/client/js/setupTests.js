global.alert = jest.fn();

global.console = {
  ...console,
  log: jest.fn(),
};

import "@testing-library/jest-dom/extend-expect";
