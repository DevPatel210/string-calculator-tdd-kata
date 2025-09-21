// This file contains the implementation for the String Calculator Kata.

/**
 * Parses the input string to determine the delimiter and the numbers to process.
 * @param {string} numbers - The input string.
 * @returns {{delimiter: RegExp, numbersToProcess: string}} - An object containing the
 * parsed delimiter and the string of numbers to process.
 */
const parseInput = (numbers) => {
  // Regex to match the custom delimiter format "//[delimiter]\n[numbers...]"
  const customDelimiterRegex = /^\/\/([^\n])\n(.*)/;
  const match = numbers.match(customDelimiterRegex);

  if (match) {
    const delimiter = new RegExp(`[${match[1]}]`);
    return {
      delimiter: delimiter,
      numbersToProcess: match[2],
    };
  } else {
    // Default delimiters are comma and newline.
    return {
      delimiter: /[,\n]/,
      numbersToProcess: numbers,
    };
  }
};

/**
 * Validates the numbers and throws an exception if any are negative or have invalid characters.
 * @param {number[]} numbersArray - An array of parsed numbers.
 */
const validateNumbers = (numbersArray) => {
  const invalidEntries = numbersArray.filter(
    (num) =>
      isNaN(num) || /[a-zA-Z!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~]/.test(num)
  );
  if (invalidEntries.length > 0) {
    throw new Error(`invalid input characters ${invalidEntries.join(", ")}`);
  }

  const negativeNumbers = numbersArray.filter((num) => Number(num) < 0);
  if (negativeNumbers.length > 0) {
    throw new Error(
      `negative numbers not allowed ${negativeNumbers.join(", ")}`
    );
  }
};

/**
 * Calculates the sum of a string of numbers based on specified rules.
 * @param {string} numbers - The string of numbers to sum.
 * @returns {number} - The sum of the numbers.
 * @throws {Error} - Throws an error if a negative number or invalid delimiter is found.
 */
const add = (numbers) => {
  // Return 0 for an empty string as per the first rule.
  if (numbers === "") {
    return 0;
  }

  // Parse the input to handle default (, and \n) and custom delimiters.
  const { delimiter, numbersToProcess } = parseInput(numbers);

  // Split the string of numbers using the determined delimiter.
  const numbersArray = numbersToProcess.split(delimiter);

  // Validate for negative numbers before summing.
  validateNumbers(numbersArray);

  // sum the numbers.
  return numbersArray.map(Number).reduce((sum, current) => sum + current, 0);
};

module.exports = {
  add,
};
