const index = require("../index.js");
test("test absolute path", () => {
    const result = index.absolute(-1);
    expect(result).toBe(1);
})