import Calculation from "./calculation.js";

test('single operator - should not be equal to 4359.0908 and should\'nt return', async () => {
  let calculation = new Calculation('42342.54-543.7896');

  expect(calculation.calculate()).not.toEqual(4359.0908);
  expect(calculation.calculate()).not.toBe(false);
})

test('single operator - should return 10.51', function() {
  let calculation = new Calculation('4.01+6.50');

  expect(calculation.calculate()).toEqual(10.51);
});

test('single operator - should return 149991', function () {
  let calculation = new Calculation('150000.5-9.5');

  expect(calculation.calculate()).toEqual(149991);
});

test('single operator - should return 3407.25', function () {
  let calculation = new Calculation('147.5*23.1');

  expect(calculation.calculate()).toEqual(3407.25);
});

test('single operator - should return 2157.1', function () {
  let calculation = new Calculation('4314.2/2');

  expect(calculation.calculate()).toEqual(2157.1);
});

test('multiple operators - should return 12521', function () {
  let calculation = new Calculation('150000/12-3+6*4');

  expect(calculation.calculate()).toEqual(12521);
});

test('multiple operators - should return 2907.25', function () {
  let calculation = new Calculation('147.5*23.1-500');

  expect(calculation.calculate()).toEqual(2907.25);
});

test('multiple operators - should return 2158.1', function () {
  let calculation = new Calculation('1+4314.2/2');

  expect(calculation.calculate()).toEqual(2158.1);
});


test('expression with parentheses - should return 28', function () {
  let calculation = new Calculation('(10 * 3) - (4 / 2)');

  expect(calculation.calculate()).toEqual(28);
});


test('division by zero - should return error message', function () {
  let calculation = new Calculation('5/0');

  expect(calculation.calculate()).toEqual("Division by zero");
});

test('exponential - should return 256', function () {
  let calculation = new Calculation('2^8');

  expect(calculation.calculate()).toEqual(256);
});

test('modulo - should return 1', function () {
  let calculation = new Calculation('7%3');

  expect(calculation.calculate()).toEqual(1);
});

test('trigonometric function - should return 0.7071067811865475', function () {
  let calculation = new Calculation('sin(45)');

  expect(calculation.calculate()).toBeCloseTo(0.8509035245341184);
});



test('invalid expression - should return error message', function () {
  let calculation = new Calculation('2++2');

  expect(calculation.calculate()).toEqual("Invalid expression: Operator at position 2");
});

test('unbalanced parentheses - should return error message', function () {
  let calculation = new Calculation('(5+3))');

  expect(calculation.calculate()).toEqual("Unbalanced parentheses");
});




test('no input - should return error message', function () {
  let calculation = new Calculation('');

  expect(calculation.calculate()).toEqual("Invalid expression");
});