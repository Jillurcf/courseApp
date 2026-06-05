export const db = {
  runAsync: jest.fn(),
  getAllAsync: jest.fn(() => Promise.resolve([])),
};