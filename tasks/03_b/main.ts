import { data } from "./input";

function findMostCommonBit(numbers: string[], index: number, whenEqual: "0" | "1", reversed: boolean = false): string {
    var zeroes = 0;
    const halfNumbers = numbers.length * 0.5;

    for (var value of numbers) {
        const digit = value[index];

        if (digit === "0")
            zeroes += 1;
    }

    if (zeroes == halfNumbers)
        return whenEqual;

    if (reversed)
        return zeroes < halfNumbers ? "0" : "1";

    return zeroes > halfNumbers ? "0" : "1";
}

function filterWithBit(numbers: string[], index: number, bit: string): string[] {
    return numbers.filter(n => n[index] == bit);
}

function bitsToNumber(bits: string): number {
    var value = 0;

    for (var b of bits) {
        value *= 2;

        if (b == "1")
            value += 1;
    }

    return value;
}

function findMetric(whenEqual: "0" | "1", reversed: boolean): number {
    const bits = data[0].length;
    var numbers = data;

    for (var i = 0; i < bits; ++i) {
        const mostCommonBit = findMostCommonBit(numbers, i, whenEqual, reversed);
        numbers = filterWithBit(numbers, i, mostCommonBit);

        if (numbers.length == 1)
            break;
    }

    return bitsToNumber(numbers[0]);
}

const v1 = findMetric("0", true);
const v2 = findMetric("1", false);

console.log(v1, v2);
console.log(v1 * v2);
