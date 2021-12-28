
// import { testData2 as data } from "./input";
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

function getIndex(x: number, y: number, z: number): number {
    var result = z + 50;
    result = result * 101 + y + 50;
    result = result * 101 + x + 50;
    return result;
}

function applyOperation(blocks: boolean[], op: Operation): void {
    var newValue = op.op === "on" ? true : false;

    var minX = Math.max(-50, op.x1);
    var maxX = Math.min(50, op.x2);

    var minY = Math.max(-50, op.y1);
    var maxY = Math.min(50, op.y2);

    var minZ = Math.max(-50, op.z1);
    var maxZ = Math.min(50, op.z2);

    for (var x = minX; x <= maxX; ++x) {
        for (var y = minY; y <= maxY; ++y) {
            for (var z = minZ; z <= maxZ; ++z) {
                blocks[getIndex(x, y, z)] = newValue;
            }
        }
    }
}

function countActiveBlocks(blocks: boolean[]): number {
    var result = 0;

    for (var i = 0; i < blocks.length; ++i)
        if (blocks[i])
            result += 1;

    return result;
}

function solveA() {
    var blocks: boolean[] = new Array(101 * 101 * 101).fill(false);

    for (var op of data) {
        applyOperation(blocks, op);
    }

    var blocksActive = countActiveBlocks(blocks);
    console.log(`A: blocks active = ${blocksActive}`);
}

solveA();
