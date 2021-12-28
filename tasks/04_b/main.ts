import { bingoesData, sequence } from "./input";

interface Bingo {
    allNumbers: number[],
    rows: number[][],
    toRemove: boolean,
}

function readBingoes(bingoes: typeof bingoesData): Bingo[] {
    var result: Bingo[] = [];

    for (var bingoData of bingoes) {
        var bingo: Bingo = {
            allNumbers: ([] as number[]).concat(...bingoData),
            rows: [],
            toRemove: false,
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

function findWorstBingo(): void {
    var processedNumbers: number[] = [];
    var bingoes = readBingoes(bingoesData);

    for (var bingoNumber of sequence) {
        processedNumbers.push(bingoNumber);

        for (var bingo of bingoes) {
            if (bingo.toRemove)
                break;

            for (var row of bingo.rows) {
                const allNumbersPresent = row.every(n => processedNumbers.includes(n));

                if (!allNumbersPresent)
                    continue;

                bingo.toRemove = true;
                break;
            }
        }

        if (bingoes.length > 1)
            bingoes = bingoes.filter(b => !b.toRemove);

        if (!(bingoes.length == 1 && bingoes[0].toRemove))
            continue;

        // we've found a bingo!
        var bingo = bingoes[0];
        var missingNumbers = bingo.allNumbers.filter(n => !processedNumbers.includes(n));
        var sum = missingNumbers.reduce((a, b) => a + b, 0);
        console.log(processedNumbers);
        console.log(sum, bingoNumber);
        console.log(sum * bingoNumber);
        return;
    }
}

findWorstBingo();
