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
function toWords(num, asOrdinal) {
    if (!Number.isFinite(num)) {
        throw new TypeError("Not a finite number: " + num + " (" + typeof num + ")");
    }
    if (asOrdinal !== undefined) {
        throw new SyntaxError('The asOrdinal param is deprecated');
    }
    if (!Number.isSafeInteger(num)) {
        throw new RangeError("Input is not a safe number, it’s either too large or too small.");
    }
    const words = generateWords(num);
    return words;
}
function generateWords(num, words) {
    let remainder = 0;
    let word = "";
    // We’re done
    if (num === 0) {
        return !words ? "zero" : words.join(" ").replace(/,$/, "");
    }
    // First run
    if (!words) {
        words = [];
    }
    // If negative, prepend “minus”
    if (num < 0) {
        words.push("minus");
        num = Math.abs(num);
    }
    if (num < 20) {
        remainder = 0;
        word = LESS_THAN_TWENTY[num];
    }
    else if (num < 100 /* NumericValues.ONE_HUNDRED */) {
        remainder = num % 10 /* NumericValues.TEN */;
        word = TENTHS_LESS_THAN_HUNDRED[Math.floor(num / 10 /* NumericValues.TEN */)];
        // In case of remainder, we need to handle it here to be able to add the “-”
        if (remainder) {
            word += "-" + LESS_THAN_TWENTY[remainder];
            remainder = 0;
        }
    }
    else if (num < 1000 /* NumericValues.ONE_THOUSAND */) {
        remainder = num % 100 /* NumericValues.ONE_HUNDRED */;
        word = generateWords(Math.floor(num / 100 /* NumericValues.ONE_HUNDRED */)) + " hundred";
    }
    else if (num < 1000000 /* NumericValues.ONE_MILLION */) {
        remainder = num % 1000 /* NumericValues.ONE_THOUSAND */;
        word = generateWords(Math.floor(num / 1000 /* NumericValues.ONE_THOUSAND */)) + " thousand,";
    }
    else if (num < 1000000000 /* NumericValues.ONE_BILLION */) {
        remainder = num % 1000000 /* NumericValues.ONE_MILLION */;
        word = generateWords(Math.floor(num / 1000000 /* NumericValues.ONE_MILLION */)) + " million,";
    }
    else if (num < 1000000000000 /* NumericValues.ONE_TRILLION */) {
        remainder = num % 1000000000 /* NumericValues.ONE_BILLION */;
        word = generateWords(Math.floor(num / 1000000000 /* NumericValues.ONE_BILLION */)) + " billion,";
    }
    else if (num < 1000000000000000 /* NumericValues.ONE_QUADRILLION */) {
        remainder = num % 1000000000000 /* NumericValues.ONE_TRILLION */;
        word = generateWords(Math.floor(num / 1000000000000 /* NumericValues.ONE_TRILLION */)) + " trillion,";
    }
    else if (num <= 9007199254740992 /* NumericValues.MAX */) {
        remainder = num % 1000000000000000 /* NumericValues.ONE_QUADRILLION */;
        word =
            generateWords(Math.floor(num / 1000000000000000 /* NumericValues.ONE_QUADRILLION */)) + " quadrillion,";
    }
    words.push(word);
    return generateWords(remainder, words);
}
console.log(toWords(-12345600000));
