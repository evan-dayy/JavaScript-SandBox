const index = require("../index.js");


test("test absolute path", () => {
    const result = index.absolute(-1);
    expect(result).toBe(1);
})


test("test absolute path - 2", () => {
    const result = index.absolute(10);
    expect(result).toBe(10);
})


test("test absolute path - 3", () => {
    const result = index.absolute(1);
    expect(result).toBe(1);
})


describe("greet", () => {
    it("test absolute path", () => {
        const result = index.absolute(-1);
        expect(result).toBe(1);
    })
    
    
    it("test absolute path - 2", () => {
        const result = index.absolute(10);
        expect(result).toBe(10);
    })
    
    
    it("test absolute path - 3", () => {
        const result = index.absolute(1);
        expect(result).toBe(1);
    })
})