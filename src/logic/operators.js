export const operators = {
    "+": { func: (a, b) => a + b, precedence: 1 },
    "-": { func: (a, b) => a - b, precedence: 1 },
    "*": { func: (a, b) => a * b, precedence: 2 },
    "/": {
      func: (a, b) => {
        if (b === 0) {
          throw new Error("Division by zero");
        }
        return a / b;
      },
      precedence: 2,
    },
    "^": { func: (a, b) => Math.pow(a, b), precedence: 3 },
    "%": { func: (a, b) => a % b, precedence: 2 },
    sin: { func: (a) => Math.sin(a), precedence: 4 },
    cos: { func: (a) => Math.cos(a), precedence: 4 },
    tan: { func: (a) => Math.tan(a), precedence: 4 },
    sqrt: { func: (a) => Math.sqrt(a), precedence: 4 },
    log: { func: (a, b) => Math.log(a, b), precedence: 4 },
  };