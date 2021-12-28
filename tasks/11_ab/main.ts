
// import { testData as data } from "./input";
import { data as data } from "./input";


export function deepObjectCopy<T = any>(src: T): T {
    return JSON.parse(JSON.stringify(src)) as T;
}

function createLightsMap(data: number[][]): boolean[][] {
    var basinMap: boolean[][] = new Array<boolean[]>(data.length);
    for (var i = 0; i < data.length; ++i)
        basinMap[i] = new Array<boolean>(data[i].length).fill(false);
    return basinMap;
}

function countLights(lightsMap: boolean[][]): number {
    return lightsMap.reduce((a, b) => a + b.map(v => v ? 1 as number : 0).reduce((a, b) => a + b, 0), 0);
}

function tryToFlash(data: number[][], lightsMap: boolean[][], i: number, j: number): boolean {
    if (data[i][j] <= 9 || lightsMap[i][j])
        return false;

    lightsMap[i][j] = true;

    if (i > 0) {
        data[i - 1][j] += 1;
        tryToFlash(data, lightsMap, i - 1, j);
    }

    if (j > 0) {
        data[i][j - 1] += 1;
        tryToFlash(data, lightsMap, i, j - 1);
    }

    if (i > 0 && j > 0) {
        data[i - 1][j - 1] += 1;
        tryToFlash(data, lightsMap, i - 1, j - 1);
    }

    if (i < data.length - 1) {
        data[i + 1][j] += 1;
        tryToFlash(data, lightsMap, i + 1, j);
    }

    if (j < data[i].length - 1) {
        data[i][j + 1] += 1;
        tryToFlash(data, lightsMap, i, j + 1);
    }

    if (i < data.length - 1 && j < data[i].length - 1) {
        data[i + 1][j + 1] += 1;
        tryToFlash(data, lightsMap, i + 1, j + 1);
    }

    if (i < data.length - 1 && j > 0) {
        data[i + 1][j - 1] += 1;
        tryToFlash(data, lightsMap, i + 1, j - 1);
    }

    if (i > 0 && j < data[i].length - 1) {
        data[i - 1][j + 1] += 1;
        tryToFlash(data, lightsMap, i - 1, j + 1);
    }

    return true;
}

function emulateStep(data: number[][]): number {
    var lightsMap = createLightsMap(data);

    for (var i = 0; i < data.length; ++i) {
        for (var j = 0; j < data[i].length; ++j) {
            data[i][j] += 1;
            tryToFlash(data, lightsMap, i, j);
        }
    }

    for (var i = 0; i < data.length; ++i)
        for (var j = 0; j < data[i].length; ++j)
            if (lightsMap[i][j])
                data[i][j] = 0;

    //console.log(data.map(v => v.join("")).join("\n") + "\n");

    return countLights(lightsMap);
}

function solveA() {
    var ligths = 0;
    var squids = deepObjectCopy(data);

    for (var i = 0; i < 100; ++i)
        ligths += emulateStep(squids);

    console.log(`A: ${ligths}`);
}

function solveB() {
    var step = 1;
    var squids = deepObjectCopy(data);

    while (true && step < 100000) {
        if (emulateStep(squids) === squids.length * squids[0].length)
            break;

        step += 1;
    }

    console.log(`B: ${step}`);
}

solveA();
solveB();
