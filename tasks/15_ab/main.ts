
// import { testData as data } from "./input";
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

const MAX_DISTANCE = 999999999;

function findShortestDistance(cost: number[][]): number {
    var result = mirrorMatrix(cost, 0);

    for (var i = 0; i < cost.length; ++i) {
        for (var j = 0; j < cost[i].length; ++j) {
            if (i === 0 && j === 0)
                continue;

            var sum = MAX_DISTANCE;
            if (i > 0) sum = Math.min(sum, result[i - 1][j] + cost[i][j]);
            if (j > 0) sum = Math.min(sum, result[i][j - 1] + cost[i][j]);
            result[i][j] = sum;
        }
    }

    var newPathFound = true;

    do {
        if (newPathFound)
            console.log("newPathFound!");

        newPathFound = false;

        for (var i = 0; i < cost.length; ++i) {
            for (var j = 0; j < cost[i].length; ++j) {
                var sum = result[i][j];
                if (i > 0) sum = Math.min(sum, result[i - 1][j] + cost[i][j]);
                if (j > 0) sum = Math.min(sum, result[i][j - 1] + cost[i][j]);
                if (i < cost.length - 1) sum = Math.min(sum, result[i + 1][j] + cost[i][j]);
                if (j < cost[0].length - 1) sum = Math.min(sum, result[i][j + 1] + cost[i][j]);

                if (sum < result[i][j]) {
                    result[i][j] = sum;
                    newPathFound = true;
                }
            }
        }
    } while (newPathFound);

    return result[result.length - 1][result[result.length - 1].length - 1]; // last value
}

function increaseCost(cost: number, times: number): number {
    for (var i = 0; i < times; ++i) {
        cost += 1;

        if (cost > 9)
            cost = 1;
    }

    return cost;
}

function duplicateCost(cost: number[][], times: number): number[][] {
    var result: number[][] = new Array<number[]>(data.length * times);

    for (var i = 0; i < result.length; ++i) {
        result[i] = new Array<number>(data[0].length * 5);

        for (var j = 0; j < result[i].length; ++j)
            result[i][j] = increaseCost(cost[i % cost.length][j % cost[0].length], Math.floor(i / cost.length) + Math.floor(j / cost[0].length));
    }

    return result;
}

function solveA() {
    var result = findShortestDistance(data);
    console.log(`A: ${result}`);
}

function solveB() {
    var biggerCost = duplicateCost(data, 5);
    // console.log(biggerCost.map(v => v.join("")).join("\n"));
    var result = findShortestDistance(biggerCost);
    console.log(`B: ${result}`);
}

solveA();
solveB();
