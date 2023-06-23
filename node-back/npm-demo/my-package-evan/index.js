
module.exports.add = function(a, b) {
    return a + b;
}

module.exports.mul = function(a, b) {
    return a * b;
}

module.exports.divide = function(a, b) {
    if (b == 0) throw new Error("The denominator cannot be 0!");
    return a / b;
}
// npm config set registry https://registry.npmjs.org/
// npm login
// npm publish


// --------
// how to update a package
// npm version major | npm version minor | patch
// npm publish





