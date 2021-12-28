
// import { testData as data } from "./input";
import { data as data } from "./input";

function findInvalidSymbol(sequence: string): string {
    const stack: string[] = [];

    for (var i = 0; i < sequence.length; ++i) {
        const symbol = sequence[i];

        switch (symbol) {
            case "[":
                stack.push("]");
                break;

            case "{":
                stack.push("}");
                break;

            case "(":
                stack.push(")");
                break;

            case "<":
                stack.push(">");
                break;

            default: {
                if (stack.length === 0 || symbol !== stack[stack.length - 1])
                    return symbol;  // invalid sybol

                // valid symbol - pop stack
                stack.pop();
                break;
            }
        }
    }

    return "";
}

function autocompleteSequence(sequence: string): string {
    var result = "";
    const stack: string[] = [];

    for (var i = 0; i < sequence.length; ++i) {
        const symbol = sequence[i];

        switch (symbol) {
            case "[":
                stack.push("]");
                break;

            case "{":
                stack.push("}");
                break;

            case "(":
                stack.push(")");
                break;

            case "<":
                stack.push(">");
                break;

            default: {
                while (true) {
                    if (stack.length === 0)
                        break;

                    if (symbol === stack[stack.length - 1]) {
                        // valid symbol - pop stack
                        stack.pop();
                        break;
                    }

                    // invalid symbol - try to autocomplete current sequence
                    result += stack.pop();
                }

                break;
            }
        }
    }

    while (stack.length > 0) {
        result += stack.pop();
    }

    return result;
}

function solveA() {
    const score: { [key: string]: number } = {
        ")": 3,
        "]": 57,
        "}": 1197,
        ">": 25137,
        "": 0,
    };

    var result = data
        .map(findInvalidSymbol)
        .map(symbol => score[symbol] ?? 0)
        .reduce((a, b) => a + b, 0)
        ;
    console.log(`A: ${result}`);
}

function solveB() {
    const score: { [key: string]: number } = {
        ")": 1,
        "]": 2,
        "}": 3,
        ">": 4,
    };

    var autocompleted = data
        .filter(v => findInvalidSymbol(v).length === 0)
        .map(autocompleteSequence);
    const finalScore = autocompleted.map(v => [...v]
        .map(v => score[v])
        .reduce((sum, v) => sum * 5 + v, 0)
    );
    finalScore.sort((a, b) => a - b)
    const middleIndex = Math.floor(finalScore.length / 2.0);
    console.log(autocompleted);
    console.log(finalScore);
    console.log(`B: ${finalScore[middleIndex]}`);
}

solveA();
solveB();
