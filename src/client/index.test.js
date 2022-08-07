const { handleSubmit, checkForUrl } = require("./index");

test("not a string to be false", () => {
  expect(typeof handleSubmit).toBe("function");
  expect(typeof checkForUrl).toBe("function");
});
