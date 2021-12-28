
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

function getEnhancedPixel(image: boolean[][], i: number, j: number, enhancement: string, emptySpaceIsZero: boolean): boolean {
    var bitsString = "";

    for (var x = i - 1; x < i + 2; ++x) {
        for (var y = j - 1; y < j + 2; ++y) {
            if (x < 0 || x > image.length - 1 || y < 0 || y > image[x].length - 1) {
                bitsString += emptySpaceIsZero ? "0" : "1";
            } else {
                bitsString += image[x][y] ? "1" : "0";
            }
        }
    }

    var enhancementIndex = parseInt(bitsString, 2);
    return enhancement[enhancementIndex] === "#";
}

function enhance(image: boolean[][], enhancement: string, emptySpaceIsZero: boolean): boolean[][] {
    var oldImage = deepObjectCopy(image);
    var emptyValue = emptySpaceIsZero ? false : true;

    for (var i = 0; i < oldImage.length; ++i)
        oldImage[i] = [emptyValue, ...oldImage[i], emptyValue];

    oldImage = [
        oldImage[0].map(_ => emptyValue),
        ...oldImage,
        oldImage[0].map(_ => emptyValue),
    ];

    var newImage = deepObjectCopy(oldImage);

    for (var i = 0; i < oldImage.length; ++i) {
        for (var j = 0; j < oldImage[i].length; ++j) {
            newImage[i][j] = getEnhancedPixel(oldImage, i, j, enhancement, emptySpaceIsZero);
        }
    }

    return newImage;
}

function countLightPixels(image: boolean[][]): number {
    var count = 0;

    for (var row of image)
        for (var pixel of row)
            if (pixel)
                count += 1;

    return count;
}

function readImage(image: string[]): boolean[][] {
    return image.map(row => [...row].map(v => v === "#"));
}

function solveA() {
    var image = readImage(data.image);

    for (var i = 0; i < 2; ++i)
        image = enhance(image, data.enhancement, i % 2 === 0 && data.enhancement[0] === "#");

    var lightPixels = countLightPixels(image);
    console.log(`A: light pixels = ${lightPixels}`);  // 5326 for testData2

    for (var i = 0; i < (50 - 2); ++i)
        image = enhance(image, data.enhancement, i % 2 === 0 && data.enhancement[0] === "#");

    var lightPixels50 = countLightPixels(image);
    console.log(`B: light pixels = ${lightPixels50}`);
}

solveA();
