
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

interface DeterministicDice {
    nextValue: number,
    rolledTimes: number,
}

interface GameState {
    nextPlayer1: boolean,
    player1: GameStatePlayer,
    player2: GameStatePlayer,
}

interface GameStatePlayer {
    score: number,
    position: number,
}

function isGameOver(game: GameState): boolean {
    return game.player1.score >= 1000 || game.player2.score >= 1000;
}

function rollDeterministicDice(dice: DeterministicDice, times: number): number {
    var sum = 0;

    for (var i = 0; i < times; ++i) {
        sum += dice.nextValue;
        dice.nextValue += 1;

        if (dice.nextValue > 100)
            dice.nextValue -= 100;

        dice.rolledTimes += 1;
    }

    return sum;
}

function makeGameStep(game: GameState, dice: DeterministicDice): void {
    var diceValue = rollDeterministicDice(dice, 3);

    if (game.nextPlayer1)
        game.player1.position += diceValue;
    else
        game.player2.position += diceValue;

    game.player1.position = (game.player1.position - 1) % 10 + 1;
    game.player2.position = (game.player2.position - 1) % 10 + 1;

    if (game.nextPlayer1)
        game.player1.score += game.player1.position;
    else
        game.player2.score += game.player2.position;

    game.nextPlayer1 = !game.nextPlayer1;
}

function solveA() {
    var game: GameState = {
        nextPlayer1: true,
        player1: { score: 0, position: data.player1 },
        player2: { score: 0, position: data.player2 },
    }
    var dice: DeterministicDice = { nextValue: 1, rolledTimes: 0 };

    while (!isGameOver(game))
        makeGameStep(game, dice);

    var minScore = Math.min(game.player1.score, game.player2.score);
    console.log(`A: min score = ${minScore}, dice rolled: ${dice.rolledTimes}`);
    console.log(`A: result = ${minScore * dice.rolledTimes}`);
}

solveA();
