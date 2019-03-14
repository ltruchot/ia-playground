import { pipe } from "./../core/functionalHelper";
import * as arrayHelper from "./../core/arrayHelper";
import * as stringHelper from "./../core/stringHelper";
import * as typeHelper from "./../core/typeHelper";
import { flipCross } from "./../extra/booleanMatrixHelper";
import { checkResolvedRiddle } from "./../custom/testSolution";

const intToMatrix = int =>
  pipe(
    typeHelper.intToStrOf4Bits,
    stringHelper.splitBy2,
    arr => arr.map(str => str.split("").map(typeHelper.strBitToBool))
  )(int);

const matrixToStrOfBits = matrix =>
  arrayHelper
    .flat(matrix)
    .map(typeHelper.strToInt)
    .join("");

const intToCoord = int =>
  typeHelper
    .intToStrOf2Bits(int)
    .split("")
    .map(typeHelper.strToInt);

// Int -> Array<Array<Bool>>
const deduceBestSolutions = sideLength =>
  // start with an array of sideLength^3 integers
  // ex: for 2, matrix will be 4 cells, and there will be 16 possible states
  [...Array(Math.pow(sideLength, 4)).keys()]

    // convert each integer into a boolean matrix
    // ex: (0 => 0000 => [[false, false], [false, false]])
    .map(intToMatrix)

    // for each matrix, find recursivly a solution, trying each move
    .map(initialState => moveUntilSolution(initialState));

const moveUntilSolution = (state, solution = []) => {
  let done = false;
  let reachedStates = [matrixToStrOfBits(state)];
  let flip = flipCross(state);

  // tag every impasse and prepare flip state for a new solution
  if (solution.length) {
    flip = flipCross(
      solution.reduce((acc, curMove) => {
        const flipped = flipCross(acc)(intToCoord(curMove));
        reachedStates = [...reachedStates, matrixToStrOfBits(flipped)];
        return flipped;
      }, state)
    );
  }

  // check every possible next state
  // WARNING: should check every tree, but always stop with 0 beginnig tree !!!
  for (let i = 0; i < 4; i++) {
    const move = intToCoord(i);
    const nextState = flip(move);
    const impasse = reachedStates.find(s => s === matrixToStrOfBits(nextState));

    // base case: resolution worked ([[true, true], [true,true]] state reached)
    if (checkResolvedRiddle(nextState)) {
      return [...solution, i];
    }

    // before continue recursively, we want to check:
    //  - if a direct solution work (ex: test [1] before [0, 0])
    //  - if the next state wasn't already tagged as an impasse (ex: "0000")
    if (done && !impasse) {
      return moveUntilSolution(state, [...solution, i]);
    }

    // none of the direct solutions worked
    else if (i === 3 && !done) {
      i = -1;
      done = true;
    }
  }
};

deduceBestSolutions(2).map((a, i) => console.log(intToMatrix(i), a));
