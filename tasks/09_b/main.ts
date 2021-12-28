
import { data as data } from "./input";

function parseData(data: string[]): number[][] {
    return data.map(v => [...v].map(n => parseInt(n)));
}

function findBasinSize(heightMap: number[][], basinMap: boolean[][], i: number, j: number): number {
    var maxI = heightMap.length - 1;
    var maxJ = heightMap[0].length - 1;

    if (i < 0 || j < 0 || i > maxI || j > maxJ)
        return 0; // out of bounds

    if (basinMap[i][j])
        return 0;  // already handled

    var height = heightMap[i][j];

    if (height >= 9)
        return 0;  // too high

    var canFlowFrom = (ii: number, jj: number) => {
        if (ii < 0 || jj < 0 || ii > maxI || jj > maxJ)
            return true;

        if (basinMap[ii][jj])
            return true; // already in basin

        return heightMap[ii][jj] >= height;
    };

    var lowest = canFlowFrom(i - 1, j)
        && canFlowFrom(i + 1, j)
        && canFlowFrom(i, j - 1)
        && canFlowFrom(i, j + 1);

    if (!lowest)
        return 0;  // water can't flow here

    basinMap[i][j] = true;

    return 1
        + findBasinSize(heightMap, basinMap, i + 1, j)
        + findBasinSize(heightMap, basinMap, i - 1, j)
        + findBasinSize(heightMap, basinMap, i, j + 1)
        + findBasinSize(heightMap, basinMap, i, j - 1)
        ;
}

function createBasinMap(heightMap: number[][]): boolean[][] {
    var basinMap: boolean[][] = new Array<boolean[]>(heightMap.length);
    for (var i = 0; i < heightMap.length; ++i)
        basinMap[i] = new Array<boolean>(heightMap[i].length).fill(false);
    return basinMap;
}

function findBasinSizes(heightMap: number[][]): number[] {
    var maxI = heightMap.length - 1;
    var maxJ = heightMap[0].length - 1;

    var result: number[] = [];
    var basinMap: boolean[][] = createBasinMap(heightMap);

    for (var i = 0; i <= maxI; ++i) {
        for (var j = 0; j <= maxJ; ++j) {
            //console.log(basinMap.map(v => v.map(n => n ? "X" : ".").join("")).join("\n"));

            if (basinMap[i][j])
                continue; // this basin was already handled

            var basinSize = findBasinSize(heightMap, basinMap, i, j);
            if (basinSize === 0)
                continue; // not a basin

            result.push(basinSize);
        }
    }

    return result;
}

var heightMap = parseData(data);
var basinSizes = findBasinSizes(heightMap);
basinSizes.sort((a, b) => b - a);
console.log(basinSizes);
console.log(basinSizes[0] * basinSizes[1] * basinSizes[2]);
