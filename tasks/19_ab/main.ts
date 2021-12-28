
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

type Rotation = (dot: number[]) => number[];

interface Scanner {
    beacons: number[][],
    detected: boolean,
    position: number[],
    rotation: Rotation,
}

const ROTATIONS: Rotation[] = [
    ([x, y, z]) => [x, y, z],
    ([x, y, z]) => [y, z, x],
    ([x, y, z]) => [z, x, y],
    ([x, y, z]) => [-x, z, y],
    ([x, y, z]) => [z, y, -x],
    ([x, y, z]) => [y, -x, z],
    ([x, y, z]) => [x, z, -y],
    ([x, y, z]) => [z, -y, x],
    ([x, y, z]) => [-y, x, z],
    ([x, y, z]) => [x, -z, y],
    ([x, y, z]) => [-z, y, x],
    ([x, y, z]) => [y, x, -z],
    ([x, y, z]) => [-x, -y, z],
    ([x, y, z]) => [-y, z, -x],
    ([x, y, z]) => [z, -x, -y],
    ([x, y, z]) => [-x, y, -z],
    ([x, y, z]) => [y, -z, -x],
    ([x, y, z]) => [-z, -x, y],
    ([x, y, z]) => [x, -y, -z],
    ([x, y, z]) => [-y, -z, x],
    ([x, y, z]) => [-z, x, -y],
    ([x, y, z]) => [-x, -z, -y],
    ([x, y, z]) => [-z, -y, -x],
    ([x, y, z]) => [-y, -x, -z],
];

/*****************************************************************************************************/

function readScanners(input: number[][][]): Scanner[] {
    var result: Scanner[] = input.map(v => {
        return {
            beacons: v,
            detected: false,
            position: [0, 0, 0],
            rotation: ROTATIONS[0],
        };
    });

    result[0].rotation = ROTATIONS[0];
    result[0].detected = true;
    return result;
}

function isSameOffset(originOld: number[], originNew: number[], bOld: number[], bNew: number[]): boolean {
    return originNew[0] - originOld[0] === bNew[0] - bOld[0]
        && originNew[1] - originOld[1] === bNew[1] - bOld[1]
        && originNew[2] - originOld[2] === bNew[2] - bOld[2];
}

function findCommonBeacons(scannerOld: Scanner, scannerNew: Scanner): [number[], number[]][] {
    var beaconsOld = scannerOld.beacons.map(b => scannerOld.rotation(b));
    var beaconsNew = scannerNew.beacons.map(b => scannerNew.rotation(b));

    for (var a = 0; a < beaconsOld.length; ++a) {
        for (var b = 0; b < beaconsNew.length; ++b) {
            var originOld = beaconsOld[a];
            var originNew = beaconsNew[b];

            var processedOld = [a];
            var processedNew = [b];

            var result: [number[], number[]][] = [
                [originOld, originNew]
            ];

            for (var i = 0; i < beaconsOld.length; ++i) {
                if (processedOld.includes(i))
                    continue;

                for (var j = 0; j < beaconsNew.length; ++j) {
                    if (processedNew.includes(j))
                        continue;

                    if (!isSameOffset(originOld, originNew, beaconsOld[i], beaconsNew[j]))
                        continue;

                    result.push([beaconsOld[i], beaconsNew[j]]);
                    processedOld.push(i);
                    processedNew.push(j);
                }
            }

            if (result.length >= 12) {
                // console.log(JSON.stringify(result, undefined, " "));
                // console.log(result.length);
                return result;
            }
        }
    }

    return [];
}

function detectAllScanners(scanners: Scanner[]): void {
    for (var i = 0; i < scanners.length; ++i) {
        var scannerNew = scanners[i];

        if (scannerNew.detected)
            continue;

        for (var j = 0; j < scanners.length; ++j) {
            var scannerOld = scanners[j];

            if (i === j || !scannerOld.detected)
                continue;

            if (scannerNew.detected)
                break; // was detected in previous loop

            for (var rotation of ROTATIONS) {
                scannerNew.rotation = rotation; // temp rotation
                var commonBeacons = findCommonBeacons(scannerOld, scannerNew);

                if (commonBeacons.length < 12)
                    continue;

                console.log(`${j} -> ${i}`);

                var [someBeaconOld, someBeaconNew] = commonBeacons[0];
                scannerNew.position = [
                    scannerOld.position[0] + someBeaconOld[0] - someBeaconNew[0],
                    scannerOld.position[1] + someBeaconOld[1] - someBeaconNew[1],
                    scannerOld.position[2] + someBeaconOld[2] - someBeaconNew[2],
                ];
                scannerNew.detected = true;
                break;
            }
        }
    }
}

function solve() {
    var scanners = readScanners(data);

    while (true) {
        detectAllScanners(scanners);

        if (!scanners.some(s => !s.detected))
            break;

        console.log("oh shit, here we go again");
    }

    for (var scanner of scanners) {
        scanner.beacons = scanner.beacons.map(b => scanner.rotation(b));  // apply rotation
    }

    var uniqueBeacons = new Set<string>();

    for (var scanner of scanners)
        for (var beacon of scanner.beacons)
            uniqueBeacons.add(JSON.stringify([
                beacon[0] + scanner.position[0],
                beacon[1] + scanner.position[1],
                beacon[2] + scanner.position[2],
            ]));

    console.log(`A: total = ${scanners.map(s => s.beacons.length).reduce((a, b) => a + b, 0)}`);
    console.log(`A: unique = ${uniqueBeacons.size}`);

    var distances: number[] = [];

    for (var scannerA of scanners) {
        for (var scannerB of scanners) {
            if (scannerA === scannerB)
                continue;

            distances.push(
                Math.abs(scannerA.position[0] - scannerB.position[0]) +
                Math.abs(scannerA.position[1] - scannerB.position[1]) +
                Math.abs(scannerA.position[2] - scannerB.position[2])
            );
        }
    }

    distances.sort((a, b) => b - a);
    console.log(`B: max distance = ${distances[0]}`);
}

solve();
