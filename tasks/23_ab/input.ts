
import { Animal } from "./main";

interface Data {
    depth: number,
    holes: Animal[][],
}


export const testData1: Data = {
    depth: 2,
    holes: [
        ['A', 'B'],
        ['D', 'C'],
        ['C', 'B'],
        ['A', 'D'],
    ],
};

export const testData2: Data = {
    depth: 4,
    holes: [
        ['A', 'D', 'D', 'B'],
        ['D', 'B', 'C', 'C'],
        ['C', 'A', 'B', 'B'],
        ['A', 'C', 'A', 'D'],
    ],
};

export const data1: Data = {
    depth: 2,
    holes: [
        ['C', 'B'],
        ['C', 'B'],
        ['A', 'D'],
        ['A', 'D'],
    ],
};

export const data2: Data = {
    depth: 4,
    holes: [
        ['C', 'D', 'D', 'B'],
        ['C', 'B', 'C', 'B'],
        ['A', 'A', 'B', 'D'],
        ['A', 'C', 'A', 'D'],
    ],
};
