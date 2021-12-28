
// import { testData3 as data } from "./input";
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

export interface Operation {
    op: "on" | "off",
    x1: number,
    x2: number,
    y1: number,
    y2: number,
    z1: number,
    z2: number,
}

function intersectOperations(a: Operation, b: Operation, op: Operation["op"]): Operation | undefined {
    if (a.x1 > b.x2 || a.x2 < b.x1 || a.y1 > b.y2 || a.y2 < b.y1 || a.z1 > b.z2 || a.z2 < b.z1)
        return undefined;

    return {
        op: op,
        x1: Math.max(a.x1, b.x1),
        x2: Math.min(a.x2, b.x2),
        y1: Math.max(a.y1, b.y1),
        y2: Math.min(a.y2, b.y2),
        z1: Math.max(a.z1, b.z1),
        z2: Math.min(a.z2, b.z2),
    };
}

function getSize(op: Operation) {
    return (op.x2 - op.x1 + 1) * (op.y2 - op.y1 + 1) * (op.z2 - op.z1 + 1);
}

function solveB() {
    var finalOperations: Operation[] = [];

    for (var inputOperation of data) {
        var newOperations: Operation[] = [];

        if (inputOperation.op === "on")
            newOperations.push(inputOperation);

        for (var finalOperation of finalOperations) {
            // If the cube is ON, remove double-counted ON's and remove undercounted OFF's
            // If the cube is OFF, remove double-counted OFF's and remove undercounted ON's
            var intersection = intersectOperations(inputOperation, finalOperation, finalOperation.op === "on" ? "off" : "on");
            if (intersection !== undefined) {
                newOperations.push(intersection);
            }
        }

        finalOperations = [...finalOperations, ...newOperations];
    }

    var blocksActive = finalOperations.map(b => getSize(b) * (b.op === "on" ? 1 : -1)).reduce((a, b) => a + b, 0);
    console.log(`A: blocks active = ${blocksActive}`);
}

solveB();
