// This file contains the implementation for the String Calculator Kata.

/**
 * Parses the input string to determine the delimiter and the numbers to process.
 * @param {string} numbers - The input string.
 * @returns {{delimiter: RegExp, numbersToProcess: string}} - An object containing the
 * parsed delimiter and the string of numbers to process.
 */
const parseInput = (numbers) => {
  // Regex for multiple/multicharacter delimiters: //[delim1][delim2]\n...
  const multipleDelimiterRegex = /^\/\/(\[(.+?)\])+\n/;
  const singleDelimiterRegex = /^\/\/(.)\n(.*)/;

  if (numbers.startsWith("//")) {
    // Custom delimiter condition
    if (numbers.match(multipleDelimiterRegex)) {
      // Check for multiple delimiters
      // Extracting delimiters between // and \n
      const delimPart = numbers.slice(2, numbers.indexOf("\n"));
      // If any character outside [] exists, it's invalid
      const invalidDelims = delimPart.replace(/\[(.*?)\]/g, "");
      if (invalidDelims.trim().length > 0) {
        throw new Error("invalid delimiter format");
      }
      const delimMatches = [...delimPart.matchAll(/\[(.*?)\]/g)];
      if (!delimMatches.length) {
        throw new Error("invalid delimiter format");
      }
      const delimiters = delimMatches.map((m) => m[1]);
      // Check for empty delimiters
      if (delimiters.some((d) => d.length === 0)) {
        throw new Error("invalid delimiter format");
      }
      // Escape delimiters for regex
      const escaped = delimiters.map((d) =>
        d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      );
      const delimiter = new RegExp(escaped.join("|"), "g");
      return {
        delimiter,
        numbersToProcess: numbers.slice(numbers.indexOf("\n") + 1),
      };
    } else if (numbers.match(singleDelimiterRegex)) {
      // Single character delimiter
      const match = numbers.match(singleDelimiterRegex);
      const delimiter = new RegExp(
        `[${match[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]`
      );
      return {
        delimiter,
        numbersToProcess: match[2],
      };
    } else {
      throw new Error("invalid delimiter format");
    }
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
  return numbersArray
    .map(Number)
    .filter((num) => num <= 1000)
    .reduce((sum, current) => sum + current, 0);
};

module.exports = {
  add,
};
