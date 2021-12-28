
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

type LetterOccurence = { [key: string]: number };

function countUnfolding(sequence: string[], changes: { [key: string]: string }, steps: number): LetterOccurence {
    var howMany: LetterOccurence = {};

    for (var i = 0; i < sequence.length - 1; ++i) {
        var pair = `${sequence[i]}${sequence[i + 1]}`;
        howMany[pair] = (howMany[pair] ?? 0) + 1;
    }

    for (var i = 0; i < steps; ++i) {
        var oldHowMany = howMany;
        howMany = {};

        for (var pair in oldHowMany) {
            var newLetter = changes[pair];
            var newPair1 = `${pair[0]}${newLetter}`;
            var newPair2 = `${newLetter}${pair[1]}`;
            var count = oldHowMany[pair];
            howMany[newPair1] = (howMany[newPair1] ?? 0) + count;
            howMany[newPair2] = (howMany[newPair2] ?? 0) + count;
        }

        // console.log(howMany);
    }

    var letters: { [key: string]: number } = {};

    for (var pair in howMany)
        letters[pair[0]] = (letters[pair[0]] ?? 0) + howMany[pair];

    letters[sequence[sequence.length - 1]] = (letters[sequence[sequence.length - 1]] ?? 0) + 1;  // last letter
    return letters;
}

function createChangesMap(changes: typeof data.changes): { [key: string]: string } {
    var result: { [key: string]: string } = {};

    for (var change of changes)
        result[change.from] = change.to;

    return result;
}

function solve(name: string, steps: number) {
    var sequence = [...data.sequence];
    var changes = createChangesMap(data.changes);

    var howMany = countUnfolding(sequence, changes, steps);
    var howOften = Object.values(howMany).sort((a, b) => a - b);

    var min = howOften[0];
    var max = howOften[howOften.length - 1];

    console.log(howOften);
    console.log(howOften.reduce((a, b) => a + b, 0));
    console.log(`${name}: ${max} - ${min} = ${max - min}`);
}

solve("A", 10);
solve("B", 40);
