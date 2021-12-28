
// import { testData as data } from "./input";
import { data as data } from "./input";

/*****************************************************************************************************/

export function deepObjectCopy<T = any>(src: T): T {
    return JSON.parse(JSON.stringify(src)) as T;
}

export function getUniqueListBy<T, F>(array: T[], keyFunc: (value: T) => F) {
    return [...new Map(array.map(item => [keyFunc(item), item])).values()];
}

/*****************************************************************************************************/

function unfoldSequence(sequence: string[], changes: { [key: string]: string }): string[] {
    var newSequence: string[] = new Array(sequence.length * 2 - 1);

    for (var i = 0; i < sequence.length - 1; ++i) {
        newSequence[i * 2] = sequence[i];
        newSequence[i * 2 + 1] = changes[`${sequence[i]}${sequence[i + 1]}`];
    }

    newSequence[sequence.length * 2 - 2] = sequence[sequence.length - 1];

    return newSequence;
}

function createChangesMap(changes: typeof data.changes): { [key: string]: string } {
    var result: { [key: string]: string } = {};

    for (var change of changes)
        result[change.from] = change.to;

    return result;
}

interface SequenceStats {
    min: number,
    max: number,
}

function giveStats(sequence: string[]): SequenceStats {
    var howMany: { [key: string]: number } = {};

    for (var letter of sequence)
        howMany[letter] = (howMany[letter] ?? 0) + 1;

    var howOften = Object.values(howMany).sort((a, b) => a - b);
    console.log(howOften);
    return { min: howOften[0], max: howOften[howOften.length - 1] };
}

function solveA() {
    var sequence = [...data.sequence];
    var changes = createChangesMap(data.changes);
    console.log(sequence.join(""));

    for (var i = 0; i < 10; ++i) {
        sequence = unfoldSequence(sequence, changes);
        //console.log(sequence.join(""));
    }

    var stats = giveStats(sequence);
    console.log(`A: ${stats.max} - ${stats.min} = ${stats.max - stats.min}`);
}

solveA();
