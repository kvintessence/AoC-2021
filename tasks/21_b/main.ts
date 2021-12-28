
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

interface QuantumRoll {
    roll: number,
    times: number,
}

var quantumRollsDistribution: QuantumRoll[] = [
    { roll: 3, times: 1 },
    { roll: 4, times: 3 },
    { roll: 5, times: 6 },
    { roll: 6, times: 7 },
    { roll: 7, times: 6 },
    { roll: 8, times: 3 },
    { roll: 9, times: 1 },
];

interface GameStatePlayer {
    score: number,
    position: number,
}

interface GameState {
    player1Turn: boolean,
    player1: GameStatePlayer,
    player2: GameStatePlayer,
    timesHappened: number,
}

function getGameKey(game: GameState): string {
    return `${game.player1.score}_${game.player1.position}_${game.player2.score}_${game.player2.position}_${game.player1Turn}`;
}

const MAX_SCORE = 21;  // 1000

function isGameOver(game: GameState): boolean {
    return game.player1.score >= MAX_SCORE || game.player2.score >= MAX_SCORE;
}

function makeGameStep(gameOld: GameState, diceRoll: QuantumRoll): GameState {
    var game = deepObjectCopy(gameOld);

    var player = game.player1Turn ? game.player1 : game.player2;
    player.position += diceRoll.roll;
    player.position = (player.position - 1) % 10 + 1;
    player.score += player.position;

    game.timesHappened *= diceRoll.times;
    game.player1Turn = !game.player1Turn;
    return game;
}

function getAllPossibleWins(): GameState[] {
    var originalGame: GameState = {
        player1Turn: true,
        player1: { score: 0, position: data.player1 },
        player2: { score: 0, position: data.player2 },
        timesHappened: 1,
    };

    var gamesFinished: Record<string, GameState> = {};
    var gamesToProcess: Record<string, GameState> = {};
    gamesToProcess[getGameKey(originalGame)] = originalGame;

    while (true) {
        var shouldBreak = true;
        var newGames: Record<string, GameState> = {};
        console.log(`new iteration`);

        for (var gameKey in gamesToProcess) {
            var game = gamesToProcess[gameKey];

            for (var quantumRoll of quantumRollsDistribution) {
                var newGame = makeGameStep(game, quantumRoll);
                var whereToAdd = isGameOver(newGame) ? gamesFinished : newGames;
                var newKey = getGameKey(newGame);

                if (whereToAdd[newKey] === undefined) {
                    whereToAdd[newKey] = newGame;
                } else {
                    whereToAdd[newKey].timesHappened += newGame.timesHappened;
                }
            }

            shouldBreak = false;
        }

        if (shouldBreak)
            break;

        gamesToProcess = newGames;
    }

    return Object.values(gamesFinished);
}

function solveB() {
    var games = getAllPossibleWins();

    var wonBy1 = 0;
    var wonBy2 = 0;

    for (var game of games) {
        if (game.player1.score >= MAX_SCORE) {
            wonBy1 += game.timesHappened;
        } else {
            wonBy2 += game.timesHappened;
        }
    }

    console.log(`A: player #1 times won = ${wonBy1}`);
    console.log(`A: player #2 times won = ${wonBy2}`);
    console.log(`A: result = ${Math.max(wonBy1, wonBy2)}`);
}

solveB();
