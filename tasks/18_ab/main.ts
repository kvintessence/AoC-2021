
// import { testData5 as data } from "./input";
import { data as data } from "./input";

/*****************************************************************************************************/

export function deepObjectCopy<T = any>(src: T): T {
    return JSON.parse(JSON.stringify(src)) as T;
}

export function getUniqueListBy<T, F>(array: T[], keyFunc: (value: T) => F) {
    return [...new Map(array.map(item => [keyFunc(item), item])).values()];
}

export function mirrorMatrix<T, F>(data: T[][], defaultValue: F): F[][] {
    var result: F[][] = new Array<F[]>(data.length);
    for (var i = 0; i < data.length; ++i)
        result[i] = new Array<F>(data[i].length).fill(defaultValue);
    return result;
}

/*****************************************************************************************************/

export type Snailfish = number | Snailfish[];

/*****************************************************************************************************/

function tryToSplitSnailfish(value: Snailfish): boolean {
    if (typeof value === "number")
        return false;

    for (var i = 0; i < 2; ++i) {
        var subValue = value[i];

        if (typeof subValue === "number") {
            if (subValue > 9) {
                value[i] = [Math.floor(subValue / 2.0), Math.ceil(subValue / 2.0)];
                return true;
            }
        } else if (tryToSplitSnailfish(value[i])) {
            return true;
        }
    }

    return false;
}

type CurrentIndex = { currentIndex: number };

function tryToExplodeSnailfish(value: Snailfish, deep: number, index: CurrentIndex): [boolean, boolean, Snailfish, number] {
    if (typeof value === "number")
        return [false, false, 0, 0];

    if (typeof value[0] === "number" && typeof value[1] === "number" && deep > 4)
        return [true, true, value, index.currentIndex];

    for (var i = 0; i < 2; ++i) {
        if (typeof value[i] !== "number") {
            var [exploded, immediately, pair, explosionIndex] = tryToExplodeSnailfish(value[i], deep + 1, index);

            if (immediately)
                value[i] = 0;

            if (exploded)
                return [exploded, false, pair, explosionIndex];
        } else {
            index.currentIndex += 1;
        }
    }

    return [false, false, 0, 0];
}

function explodeSnailfishWithPair(value: Snailfish, currentIndex: CurrentIndex, explosionIndex: number, pair: Snailfish): void {
    if (typeof value === "number")
        return;

    for (var i = 0; i < 2; ++i) {
        if (typeof value[i] === "number") {
            if (currentIndex.currentIndex === explosionIndex - 1)
                value[i] = (value[i] as number) + ((pair as number[])[0]);

            if (currentIndex.currentIndex === explosionIndex + 1)
                value[i] = (value[i] as number) + ((pair as number[])[1]);

            currentIndex.currentIndex += 1;
        } else {
            explodeSnailfishWithPair(value[i], currentIndex, explosionIndex, pair);
        }
    }
}

function reduceSnailfish(value: Snailfish): [boolean, Snailfish] {
    // console.log(`       reduce: ${JSON.stringify(value)}`);

    var [exploded, _, pair, explosionIndex] = tryToExplodeSnailfish(value, 1, { currentIndex: 0 });

    if (exploded) {
        explodeSnailfishWithPair(value, { currentIndex: 0 }, explosionIndex, pair);
        return [true, value];
    }

    if (tryToSplitSnailfish(value))
        return [true, value];

    return [false, value];
}

function reduceSnailfishFinal(value: Snailfish): Snailfish {
    while (true) {
        var reduced = true;
        [reduced, value] = reduceSnailfish(value);

        if (!reduced)
            break;
    }

    return value;
}

function getSnailfishMagnitude(value: Snailfish): number {
    if (typeof value === "number")
        return value;

    return getSnailfishMagnitude(value[0]) * 3 + getSnailfishMagnitude(value[1]) * 2;
}

function solveA() {
    var value = deepObjectCopy(data[0]);

    for (var i = 1; i < data.length; ++i) {
        value = [value, deepObjectCopy(data[i])];  // sum two snailfish numbers
        //console.log(`value: ${JSON.stringify(value)}`);
        value = reduceSnailfishFinal(value);
        //console.log(`              final: ${JSON.stringify(value)}`);
    }

    var magnitude = getSnailfishMagnitude(value);
    console.log(`A: value = ${JSON.stringify(value)}`);
    console.log(`A: magnitude = ${magnitude}`);
}

function solveB() {
    var maxMagnitude = 0;
    var maxValue: Snailfish = 0;

    for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < data.length; ++j) {
            if (i === j)
                continue;

            var value: Snailfish = [deepObjectCopy(data[i]), deepObjectCopy(data[j])];  // sum two snailfish numbers
            value = reduceSnailfishFinal(value);
            var magnitude = getSnailfishMagnitude(value);

            if (magnitude > maxMagnitude) {
                maxMagnitude = magnitude;
                maxValue = value;
            }
        }
    }

    console.log(`B: max value = ${JSON.stringify(maxValue)}`);
    console.log(`B: max magnitude = ${maxMagnitude}`);
}

solveA();
solveB();
