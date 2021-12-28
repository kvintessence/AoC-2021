
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

interface ProbeResult {
    hit: boolean,
    maxY: number,
}

/*****************************************************************************************************/

function simulateProbe(velocityX: number, velocityY: number, trench: typeof data): ProbeResult {
    var maxY = 0;
    var x = 0;
    var y = 0;

    while (true) {
        x += velocityX;
        y += velocityY;
        maxY = Math.max(maxY, y);

        if (velocityX > 0)
            velocityX -= 1;

        velocityY -= 1;

        if (y < trench.y.min || x > trench.x.max)
            break;

        if (trench.x.min <= x && x <= trench.x.max && trench.y.min <= y && y <= trench.y.max)
            return { hit: true, maxY: maxY };
    }

    return { hit: false, maxY: maxY };
}

function solveA() {
    for (var y = 1000; y > 0; --y) {
        for (var x = 1; x < data.x.max; ++x) {
            var result = simulateProbe(x, y, data);

            if (!result.hit)
                continue;

            console.log(`A: ${result.maxY}`);
            return;
        }
    }
}

function solveB() {
    var count = 0;

    for (var y = 1000; y > -1000; --y) {
        for (var x = 1; x <= data.x.max; ++x) {
            var result = simulateProbe(x, y, data);

            if (!result.hit)
                continue;

            count += 1;
        }
    }

    console.log(`B: ${count}`);
}

solveA();
solveB();
