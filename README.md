# string-calculator-tdd-kata

Incubyte TDD Assessment

# Problem Statement: String Calculator Kata

1. Create a simple String calculator with a method signature:

   int Add(string numbers)

   The method can take up to two numbers, separated by commas, and will return their sum.
   for example “” or “1” or “1,2” as inputs.
   (for an empty string it will return 0)
   Hints:

   - Start with the simplest test case of an empty string and move to one and two numbers
   - Remember to solve things as simply as possible so that you force yourself to write tests you did not think about
   - Remember to refactor after each passing test
     ———————————————————————————————

2. Allow the Add method to handle an unknown amount of numbers
   ————————————————————————————————

3. Allow the Add method to handle new lines between numbers (instead of commas).
   1. the following input is ok: “1\n2,3” (will equal 6)
   2. the following input is NOT ok: “1,\n” (not need to prove it - just clarifying)
      ——————————————————————————————-
4. Support different delimiters
   1. to change a delimiter, the beginning of the string will contain a separate line that looks like this: “//[delimiter]\n[numbers…]” for example “//;\n1;2” should return three where the default delimiter is ‘;’ .
   2. the first line is optional. all existing scenarios should still be supported
      ——————————————————————————————
5. Calling Add with a negative number will throw an exception “negatives not allowed” - and the negative that was passed.
   if there are multiple negatives, show all of them in the exception message.
   ————————————————————————————————
6. Numbers bigger than 1000 should be ignored, so adding 2 + 1001 = 2
   ————————————————————————————————
7. Delimiters can be of any length with the following format: “//[delimiter]\n” for example: “//[***]\n1**_2_**3” should return 6
   ————————————————————————————————
8. Allow multiple delimiters like this: “//[delim1][delim2]\n” for example “//[\*][%]\n1\*2%3” should return 6.
   ————————————————————————————————
9. make sure you can also handle multiple delimiters with length longer than one char

# Implementation

As part of this repository I have solved the String Calculator Kata (mentioned above) using TDD.

The code is developed in `Nodejs` and I have used `Javascript` as my language and used `Chai` library for writing unit tests.

Install dependencies: `npm install`

Run tests: `npm run test`

# Usage

```
const {add} = require('./src/calculator');

const answer = add('5,4,3,2,1');
console.log(answer); // output would be 16
```

# Test Run

![alt text](image.png)
