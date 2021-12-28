import { bingoesData, sequence } from "./input";

interface Bingo {
    allNumbers: number[],
    rows: number[][],
}

function readBingoes(bingoes: typeof bingoesData): Bingo[] {
    var result: Bingo[] = [];

    for (var bingoData of bingoes) {
        var bingo: Bingo = {
            allNumbers: ([] as number[]).concat(...bingoData),
            rows: [],
        };

        for (var row of bingoData)
            bingo.rows.push(row);

        for (var i = 0; i < bingoData.length; ++i) {
            var columnSet: number[] = [];

            for (var j = 0; j < bingoData.length; ++j) {
                columnSet.push(bingoData[j][i]);
            }

            bingo.rows.push(columnSet);
        }

        result.push(bingo);
    }

    return result;
}

function findBingo(): void {
    var processedNumbers: number[] = [];
    var bingoes = readBingoes(bingoesData);

    for (var bingoNumber of sequence) {
        processedNumbers.push(bingoNumber);

        for (var bingo of bingoes) {
            for (var row of bingo.rows) {
                const allNumbersPresent = row.every(n => processedNumbers.includes(n));

                if (!allNumbersPresent)
                    continue;

                // we've found a bingo!
                var missingNumbers = bingo.allNumbers.filter(n => !processedNumbers.includes(n));
                var sum = missingNumbers.reduce((a, b) => a + b, 0);
                console.log(sum, bingoNumber);
                console.log(sum * bingoNumber);
                return;
            }
        }
    }
}

findBingo();
