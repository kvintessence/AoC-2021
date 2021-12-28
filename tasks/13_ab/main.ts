
// import { testData as data } from "./input";
import { data as data } from "./input";


export function deepObjectCopy<T = any>(src: T): T {
    return JSON.parse(JSON.stringify(src)) as T;
}

function getUniqueListBy<T, F>(array: T[], keyFunc: (value: T) => F) {
    return [...new Map(array.map(item => [keyFunc(item), item])).values()];
}

function foldDots(dots: typeof data.dots, fold: typeof data.folds[0]): typeof data.dots {
    if (fold.axis == "x") {
        for (var dot of dots) {
            if (dot.x <= fold.value)
                continue;

            dot.x = fold.value - (dot.x - fold.value);
        }
    }

    if (fold.axis == "y") {
        for (var dot of dots) {
            if (dot.y <= fold.value)
                continue;

            dot.y = fold.value - (dot.y - fold.value);
        }
    }

    return getUniqueListBy(dots, d => `${d.x}_${d.y}`);
}

function printDots(dots: typeof data.dots): void {
    var maxX = dots.map(v => v.x).reduce((sum, v) => Math.max(sum, v));
    var maxY = dots.map(v => v.y).reduce((sum, v) => Math.max(sum, v));

    function createEmpty(): string[][] {
        var map: string[][] = new Array<string[]>(maxY+1);
        for (var i = 0; i <= maxY; ++i)
            map[i] = new Array<string>(maxX+1).fill(".");
        return map;
    }

    var map = createEmpty();

    for (var dot of dots)
        map[dot.y][dot.x] = "X";

    console.log("\n");
    console.log(map.map(v => v.join("")).join("\n"));
}

function solveA() {
    var dots = deepObjectCopy(data.dots);
    dots = foldDots(dots, data.folds[0]);
    var dotsCount = dots.length;
    console.log(`A: ${dotsCount}`);
}

function solveB() {
    var dots = deepObjectCopy(data.dots);

    for (var fold of data.folds)
        dots = foldDots(dots, fold);

        printDots(dots);
}

solveA();
solveB();
