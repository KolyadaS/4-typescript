const enum NumericValues {
    TEN = 10,
    ONE_HUNDRED = 100,
    ONE_THOUSAND = 1000,
    ONE_MILLION = 1000000,
    ONE_BILLION = 1000000000, //         1.000.000.000 (9)
    ONE_TRILLION = 1000000000000, //     1.000.000.000.000 (12)
    ONE_QUADRILLION = 1000000000000000, // 1.000.000.000.000.000 (15)
    MAX = 9007199254740992, // 9.007.199.254.740.992 (15)
}

const LESS_THAN_TWENTY: string[] = [
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

const TENTHS_LESS_THAN_HUNDRED: string[] = [
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

function toWords(num: number, asOrdinal?: boolean): string {
  if (!Number.isFinite(num)) {
    throw new TypeError(
      "Not a finite number: " + num + " (" + typeof num + ")"
    );
  }
  if (asOrdinal !== undefined) {
    throw new SyntaxError('The asOrdinal param is deprecated')
  }
  if (!Number.isSafeInteger(num)) {
    throw new RangeError(
      "Input is not a safe number, it’s either too large or too small."
    );
  }
  const words = generateWords(num);
  return words;
}

function generateWords(num: number, words?: string[]): string {
  let remainder: number = 0;
    let word: string = "";

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
  } else if (num < NumericValues.ONE_HUNDRED) {
    remainder = num % NumericValues.TEN;
    word = TENTHS_LESS_THAN_HUNDRED[Math.floor(num / NumericValues.TEN)];
    // In case of remainder, we need to handle it here to be able to add the “-”
    if (remainder) {
      word += "-" + LESS_THAN_TWENTY[remainder];
      remainder = 0;
    }
  } else if (num < NumericValues.ONE_THOUSAND) {
    remainder = num % NumericValues.ONE_HUNDRED;
    word = generateWords(Math.floor(num / NumericValues.ONE_HUNDRED)) + " hundred";
  } else if (num < NumericValues.ONE_MILLION) {
    remainder = num % NumericValues.ONE_THOUSAND;
    word = generateWords(Math.floor(num / NumericValues.ONE_THOUSAND)) + " thousand,";
  } else if (num < NumericValues.ONE_BILLION) {
    remainder = num % NumericValues.ONE_MILLION;
    word = generateWords(Math.floor(num / NumericValues.ONE_MILLION)) + " million,";
  } else if (num < NumericValues.ONE_TRILLION) {
    remainder = num % NumericValues.ONE_BILLION;
    word = generateWords(Math.floor(num / NumericValues.ONE_BILLION)) + " billion,";
  } else if (num < NumericValues.ONE_QUADRILLION) {
    remainder = num % NumericValues.ONE_TRILLION;
    word = generateWords(Math.floor(num / NumericValues.ONE_TRILLION)) + " trillion,";
  } else if (num <= NumericValues.MAX) {
    remainder = num % NumericValues.ONE_QUADRILLION;
    word =
      generateWords(Math.floor(num / NumericValues.ONE_QUADRILLION)) + " quadrillion,";
  }

  words.push(word);
  return generateWords(remainder, words);
}

console.log(toWords(-12345600000));
