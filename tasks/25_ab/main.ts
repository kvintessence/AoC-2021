
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

export type Content = '>' | 'v' | '.';
export type Map = Content[][];

function moveSpecific(oldMap: Map, who: Content, pi: number, pj: number): [Map, boolean] {
    var somethingMoved = false;
    var newMap = deepObjectCopy(oldMap);

    for (var i = 0; i < oldMap.length; ++i) {
        for (var j = 0; j < oldMap[i].length; ++j) {
            var nextI = (i + pi) % oldMap.length;
            var nextJ = (j + pj) % oldMap[i].length;

            if (oldMap[i][j] !== who)
                continue;

            if (oldMap[nextI][nextJ] !== '.')  // should be emoty
                continue;

            somethingMoved = true;
            newMap[nextI][nextJ] = who;
            newMap[i][j] = '.';
        }
    }

    return [newMap, somethingMoved];
}

function makeStep(oldMap: Map): [Map, boolean] {
    var [newMap1, somethingMoved1] = moveSpecific(oldMap, '>', 0, 1);
    var [newMap2, somethingMoved2] = moveSpecific(newMap1, 'v', 1, 0);
    return [newMap2, somethingMoved1 || somethingMoved2];
}

function solve(originalMap: Map) {
    var steps = 0;
    var map = originalMap;

    while (true) {
        // console.log(map.map(v => v.join("")).join("\n") + "\n");

        var [newMap, somethingMoved] = makeStep(map);
        map = newMap;
        steps += 1;

        if (!somethingMoved)
            break;
    }

    console.log(`A: steps = ${steps}`);
}

solve(data);
