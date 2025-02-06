"use strict";
const LESS_THAN_TWENTY = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
];
const TENTHS_LESS_THAN_HUNDRED = [
    "zero",
    "ten",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
];
/**
 * Converts an integer into words.
 * If number is decimal, the decimals will be removed.
 * @example toWords(12) => 'twelve'
 * @param {number|string} number
 * @param {boolean} [asOrdinal] - Deprecated, use toWordsOrdinal() instead!
 * @returns {string}
 */
function toWords(num, asOrdinal) {
    if (!Number.isFinite(num)) {
        throw new TypeError("Not a finite number: " + num + " (" + typeof num + ")");
    }
    if (asOrdinal !== undefined && asOrdinal) {
        throw new SyntaxError("asOrdinal is deprecated");
    }
    if (!Number.isSafeInteger(num)) {
        throw new RangeError("Input is not a safe number, it’s either too large or too small.");
    }
    const words = generateWords(num);
    return words;
}
function generateWords(number, words) {
    let remainder = 0;
    let word = "";
    // We’re done
    if (number === 0) {
        return !words ? "zero" : words.join(" ").replace(/,$/, "");
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (number < 0) {
        words.push("minus");
        number = Math.abs(number);
    }
    if (number < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[number];
    }
    else if (number < 100 /* NumericValue.ONE_HUNDRED */) {
        remainder = number % 10 /* NumericValue.TEN */;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(number / 10 /* NumericValue.TEN */)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += "-" + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    }
    else if (number < 1000 /* NumericValue.ONE_THOUSAND */) {
        remainder = number % 100 /* NumericValue.ONE_HUNDRED */;
        word = generateWords(Math.floor(number / 100 /* NumericValue.ONE_HUNDRED */)) + " hundred";
    }
    else if (number < 1000000 /* NumericValue.ONE_MILLION */) {
        remainder = number % 1000 /* NumericValue.ONE_THOUSAND */;
        word = generateWords(Math.floor(number / 1000 /* NumericValue.ONE_THOUSAND */)) + " thousand,";
    }
    else if (number < 1000000000 /* NumericValue.ONE_BILLION */) {
        remainder = number % 1000000 /* NumericValue.ONE_MILLION */;
        word = generateWords(Math.floor(number / 1000000 /* NumericValue.ONE_MILLION */)) + " million,";
    }
    else if (number < 1000000000000 /* NumericValue.ONE_TRILLION */) {
        remainder = number % 1000000000 /* NumericValue.ONE_BILLION */;
        word = generateWords(Math.floor(number / 1000000000 /* NumericValue.ONE_BILLION */)) + " billion,";
    }
    else if (number < 1000000000000000 /* NumericValue.ONE_QUADRILLION */) {
        remainder = number % 1000000000000 /* NumericValue.ONE_TRILLION */;
        word = generateWords(Math.floor(number / 1000000000000 /* NumericValue.ONE_TRILLION */)) + " trillion,";
    }
    else if (number <= 9007199254740992 /* NumericValue.MAX */) {
        remainder = number % 1000000000000000 /* NumericValue.ONE_QUADRILLION */;
        word =
            generateWords(Math.floor(number / 1000000000000000 /* NumericValue.ONE_QUADRILLION */)) + " quadrillion,";
    }
    words.push(word);
    return generateWords(remainder, words);
}
console.log(toWords(321));
