import { operators } from "./operators.js";

class Calculation {
  constructor(expression) {
    this.expression = expression;
    this.history = [];
  }

  calculate() {

    try {
      const calculatedResult = this.evaluateExpression(this.expression);
      this.addToHistory(this.expression, calculatedResult);
      return calculatedResult;
    } catch (error) {
      return error.message;
    }
  }

  evaluateExpression(expression) {

    if (expression.trim() === "" || expression.includes("=")) {
        return "Invalid expression";
      }


    const outputQueue = this.parseExpression(expression);
    const result = this.evaluateRPN(outputQueue);

    return result;
  }
  parseExpression(expression) {
    const outputQueue = [];
    const operatorStack = [];

    let currentNumber = "";
    let currentFunction = "";
    let parenthesesCount = 0;
    let lastTokenWasOperator = false;

    for (let i = 0; i < expression.length; i++) {
      const token = expression[i];
      if (/[a-z]/.test(token)) {
        currentFunction += token;
        if (currentFunction in operators) {
          operatorStack.push(currentFunction);
          currentFunction = "";
        }
        lastTokenWasOperator = false;
      } else if (/[\d.]/.test(token)) {
        currentNumber += token;
        if (i === expression.length - 1 || !/[\d.]/.test(expression[i + 1])) {
          outputQueue.push(parseFloat(currentNumber));
          currentNumber = "";
        }
        lastTokenWasOperator = false;
      } else if (token in operators) {
        if (lastTokenWasOperator) {
          throw new Error(`Invalid expression: Operator at position ${i}`);
        }
        while (
          operatorStack.length &&
          operatorStack[operatorStack.length - 1] !== "(" &&
          operators[token].precedence <=
            operators[operatorStack[operatorStack.length - 1]].precedence
        ) {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
        lastTokenWasOperator = true;
      } else if (token === "(") {
        operatorStack.push(token);
        parenthesesCount++;
        lastTokenWasOperator = false;
      } else if (token === ")") {
        if (parenthesesCount === 0) {
          throw new Error("Unbalanced parentheses");
        }
        while (operatorStack[operatorStack.length - 1] !== "(") {
          outputQueue.push(operatorStack.pop());
        }
        operatorStack.pop();
        parenthesesCount--;
        lastTokenWasOperator = false;
      } 
    }
    if (parenthesesCount !== 0) {
      throw new Error("Unbalanced parentheses");
    }

    if (operatorStack.includes("(") || operatorStack.includes(")")) {
      throw new Error("Unbalanced parentheses");
    }

    if (lastTokenWasOperator) {
      throw new Error(`Invalid expression: Operator at the end`);
    }

    while (operatorStack.length) {
      outputQueue.push(operatorStack.pop());
    }

    return outputQueue;
  }


  evaluateRPN(outputQueue) {
    const stack = [];
    for (let token of outputQueue) {
      if (typeof token === "number") {
        stack.push(token);
      } else if (token in operators) {
        let [b, a] = [stack.pop(), stack.pop()];
        if (b !== undefined && a !== undefined) {
          stack.push(operators[token].func(a, b));
        } else {
          stack.push(operators[token].func(b));
        }
      } else {
        throw new Error(`Invalid token: ${token}`);
      }
    }

    return stack.pop();
  }

  addToHistory(input, result) {
    this.history.push({ input, result });
  }
}

export default Calculation;
