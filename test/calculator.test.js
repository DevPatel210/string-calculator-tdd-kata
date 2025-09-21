// This file contains the test suite for the String Calculator.
// It is implemented using Mocha and Chai following the TDD principles.

const { expect } = require("chai");
const { add } = require("../src/calculator");

describe("add", () => {
  // empty string.
  it("should return 0 for an empty string", () => {
    expect(add("")).to.equal(0);
  });

  // single number.
  it("should return the number itself for a single number", () => {
    expect(add("5")).to.equal(5);
    expect(add("12")).to.equal(12);
  });

  it("should throw an exception for a single negative number", () => {
    expect(() => add("-8")).to.throw("negative numbers not allowed -8");
    expect(() => add("-25")).to.throw("negative numbers not allowed -25");
  });

  // two numbers separated by comma.
  it("should return the sum of two numbers separated by a comma", () => {
    expect(add("4,2")).to.equal(6);
    expect(add("13,18")).to.equal(31);
  });

  // two numbers separated by new line character.
  it("should return the sum of two numbers separated by a \n", () => {
    expect(add("4\n2")).to.equal(6);
    expect(add("13\n18")).to.equal(31);
  });

  // any amount of numbers.
  it("should handle any amount of numbers", () => {
    expect(add("5,4,3,2,1")).to.equal(15);
    expect(add("11,4,8,20")).to.equal(43);
  });

  // multiple negative number exception in any amout of numbers.
  it("should throw an exception for any negative number", () => {
    expect(() => add("5,-4,3,-2,1")).to.throw(
      "negative numbers not allowed -4, -2"
    );
    expect(() => add("-11,4,-8,20")).to.throw(
      "negative numbers not allowed -11, -8"
    );
  });

  // new line as a delimiter.
  it("should handle new lines as a valid delimiter", () => {
    expect(add("9\n4\n3\n5\n4")).to.equal(25);
    expect(add("11\n4\n8\n20")).to.equal(43);
  });

  // new line and comma both as a delimiter.
  it("should handle new lines as a valid delimiter", () => {
    expect(add("9,4\n3,5\n4")).to.equal(25);
    expect(add("11\n4,8\n20")).to.equal(43);
  });

  // negative number exception with new line as a delimiter.
  it("should throw an exception for any negative number with new line delimiter", () => {
    expect(() => add("-9,4\n3,5\n-4")).to.throw(
      "negative numbers not allowed -9, -4"
    );
    expect(() => add("-11\n4\n-8,20")).to.throw(
      "negative numbers not allowed -11, -8"
    );
  });

  it("should return the exception if any character apart from numbers and delimiter is present", () => {
    expect(() => add("ab")).to.throw("invalid input characters ab");
    expect(() => add("A+2")).to.throw("invalid input characters A+");
    expect(() => add("A+c")).to.throw("invalid input characters A+c");
    expect(() => add("A,2,b,4,$")).to.throw("invalid input characters A, b, $");
    expect(() => add("1,2,c,4")).to.throw("invalid input characters c");
  });

  // custom delimiters.
  it("should support a custom single-character delimiter", () => {
    expect(add("//;\n5")).to.equal(5);
    expect(add("//;\n1;2")).to.equal(3);
    expect(add("//*\n1*2*3")).to.equal(6);
    expect(add("///\n1/2/3")).to.equal(6);
  });

  // invalid delimiter passed exception
  it("should throw an exceptoion if another character than mentioned as delimiter is used", () => {
    expect(() => add("//*\n1*2@3")).to.throw("invalid input characters 2@3");
    expect(() => add("///\n1/2*3")).to.throw("invalid input characters 2*3");
  });

  // negative numbers with custom delimiter
  it("should show all negative numbers in the exception message with custom delimiter as well", () => {
    expect(() => add("//*\n-5")).to.throw("negative numbers not allowed -5");
    expect(() => add("//*\n1*-2*3*-4*5")).to.throw(
      "negative numbers not allowed -2, -4"
    );
    expect(() => add("//@\n1@-2@3@-4@5")).to.throw(
      "negative numbers not allowed -2, -4"
    );
  });

  // multicharacter custom delimiters.
  it("should support a custom multicharacter delimiter", () => {
    expect(add("//%%\n1%%2")).to.equal(3);
    expect(add("//#*#\n1#*#2#*#3")).to.equal(6);
  });

  // invalid multicharacter delimiter passed exception
  it("should throw an exceptoion if invalid multicharacter delimiter is used", () => {
    expect(() => add("//%%\n1%!2")).to.throw("invalid delimiter passed");
    expect(() => add("//@@\n1@@2@$3")).to.throw("invalid delimiter passed");
  });

  // negative numbers with custom multicharacter delimiter
  it("should show all negative numbers in the exception message with custom multicharacter delimiter as well", () => {
    expect(() => add("//**\n1**-2**3**-4**5")).to.throw(
      "negative numbers not allowed -2, -4"
    );
    expect(() => add("//@#\n1@#-2@#3@#-4@#5")).to.throw(
      "negative numbers not allowed -2, -4"
    );
  });
});
