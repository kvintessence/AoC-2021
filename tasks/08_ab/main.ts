import { data } from "./input";

/******************************************************* #1 ********************************************************/

function getSimpleNumberCountTotal(): number {
    var simpleNumbers = 0;

    for (var pair of data) {
        var resultNumbers = pair[1].split(" ");

        simpleNumbers += resultNumbers
            .map(v => (v.length <= 4 || v.length == 7) ? 1 as number : 0)
            .reduce((a, b) => a + b, 0);
    }

    return simpleNumbers;
}

console.log(getSimpleNumberCountTotal());

/******************************************************* #2 ********************************************************/

const allLetters = [...'abcdefg'].sort();

/*

  | 0 1 2 3 4 5 6 7 8 9
--+---------------------
a | X   X X   X X X X X
b | X       X X X   X X
c | X X X X X   X X X
d |     X X X X X   X X
e | X   X       X   X
f | X X   X X X X X X X
g | X   X X   X X   X X

*/


function areSameNumbers(n1: string[], n2: string[]): boolean {
    if (n1.length !== n2.length)
        return false;

    for (let i = 0; i < n1.length; i++)
        if (n1[i] !== n2[i])
            return false;

    return true;
}

function findTwo(numbers: string[][]): [string[], string] {
    // find a letter that is used exactly 9 times (only 'two' will not use it)
    var used: { [key: string]: number } = {};

    for (var two of numbers)
        for (var l of two)
            used[l] = (used[l] ?? 0) + 1;

    for (var letterF of Object.keys(used)) {
        if (used[letterF] !== numbers.length - 1)
            continue;

        for (var two of numbers) {
            if (two.includes(letterF))
                continue;

            // we've found number two, 'B' should also be missing
            for (var letterB of allLetters) {
                if (letterB === letterF)
                    continue;

                if (two.includes(letterB))
                    continue;

                return [two, letterB];
            }

            console.error("findTwo - letterB - ?????");
            return [[], ""];
        }
    }

    console.error("findTwo - ?????");
    return [[], ""];
}

function findThree(numbers: string[][], two: string[], letterB: string): [string[], string] {

    for (var three of numbers) {
        if (areSameNumbers(two, three))
            continue;

        if (three.length !== 5)
            continue;

        if (three.includes(letterB))
            continue;

        // found it!
        for (var letterE of allLetters) {
            if (letterB === letterE)
                continue;

            if (three.includes(letterE))
                continue;

            return [three, letterE];
        }

        break;
    }

    console.error("findThree - ?????");
    return [[], ""];
}

function findFive(numbers: string[][], two: string[], three: string[], letterE: string): [string[], string] {

    for (var five of numbers) {
        if (five.length !== 5)
            continue;

        if (areSameNumbers(two, five))
            continue;

        if (areSameNumbers(three, five))
            continue;

        // found it!
        for (var letterC of allLetters) {
            if (letterC === letterE)
                continue;

            if (five.includes(letterC))
                continue;

            return [five, letterC];
        }

        break;
    }

    console.error("findFive - ?????");
    return [[], ""];
}

function findNine(numbers: string[][], letterE: string): string[] {

    for (var nine of numbers) {
        if (nine.length !== 6)
            continue;

        if (nine.includes(letterE))
            continue;

        return nine;
    }

    console.error("findNine - ?????");
    return [];
}

function findSix(numbers: string[][], letterC: string): string[] {

    for (var six of numbers) {
        if (six.length !== 6)
            continue;

        if (six.includes(letterC))
            continue;

        return six;
    }

    console.error("findSix - ?????");
    return [];
}

function findZero(numbers: string[][], six: string[], nine: string[]): string[] {

    for (var zero of numbers) {
        if (zero.length !== 6)
            continue;

        if (areSameNumbers(zero, six))
            continue;

        if (areSameNumbers(zero, nine))
            continue;

        return zero;
    }

    console.error("findZero - ?????");
    return [];
}

function decipherFinalNumber(originalNumbers: string[][], finalNumbers: string[][]): number {
    originalNumbers = originalNumbers
        .map(v => v.sort())
        .sort((a, b) => a.length - b.length);

    finalNumbers = finalNumbers
        .map(v => v.sort());

    var one = originalNumbers[0];
    var seven = originalNumbers[1];
    var four = originalNumbers[2];
    var eight = allLetters;

    var [two, letterB] = findTwo(originalNumbers);
    var [three, letterE] = findThree(originalNumbers, two, letterB);
    var [five, letterC] = findFive(originalNumbers, two, three, letterE);
    var nine = findNine(originalNumbers, letterE);
    var six = findSix(originalNumbers, letterC);
    var zero = findZero(originalNumbers, six, nine);

    var references = [
        { value: "0", letters: zero },
        { value: "1", letters: one },
        { value: "2", letters: two },
        { value: "3", letters: three },
        { value: "4", letters: four },
        { value: "5", letters: five },
        { value: "6", letters: six },
        { value: "7", letters: seven },
        { value: "8", letters: eight },
        { value: "9", letters: nine },
    ];

    var finalNumberString = finalNumbers.map(n => {
        for (var ref of references)
            if (areSameNumbers(ref.letters, n))
                return ref.value;

        console.error(`finalNumberString - ????? - ${n}`);
        return "0";
    }).join("");

    return parseInt(finalNumberString);
}

var result = 0;

for (var pair of data) {
    var value = decipherFinalNumber(
        pair[0].split(" ").map(v => [...v].sort()),
        pair[1].split(" ").map(v => [...v].sort()),
    );
    result += value;
}

console.log(result);
