import { pipe } from "./../core/functionalHelper";
import * as arrayHelper from "./../core/arrayHelper";
import * as stringHelper from "./../core/stringHelper";
import * as typeHelper from "./../core/typeHelper";
import { flipCross } from "./../extra/booleanMatrixHelper";
import { checkResolvedRiddle } from "./../custom/testSolution";

const intToMatrix = int =>
  pipe(
    typeHelper.intToStrOfBits,
    stringHelper.splitBy2,
    arr => arr.map(str => str.split("").map(typeHelper.strBitToBool))
  )(int);

const matrixToStrOfBits = matrix =>
  arrayHelper
    .flat(matrix)
    .map(a => +a)
    .join("");

const intToCoord = int =>
  typeHelper
    .intToStrOfBits(int, 2)
    .split("")
    .map(typeHelper.strToInt);

const getAllInitialStates = () => {
  return [...Array(16).keys()].map(intToMatrix);
};

const deduceBestSolutions = () => {
  const bestSolutions = [];
  getAllInitialStates().forEach((initialState, idx) => {
    bestSolutions[idx] = moveUntilSolution(initialState);
  });
  return bestSolutions;
};

const moveUntilSolution = (state, solution = []) => {
  let done = false;
  let reachedStates = [matrixToStrOfBits(state)];
  let flip = flipCross(state);
  if (solution.length) {
    flip = flipCross(
      solution.reduce((acc, curMove) => {
        const flipped = flipCross(acc)(intToCoord(curMove));
        reachedStates = [...reachedStates, matrixToStrOfBits(flipped)];
        return flipped;
      }, state)
    );
  }
  for (let i = 0; i < 4; i++) {
    const move = typeHelper
      .intToStrOfBits(i, 2)
      .split("")
      .map(typeHelper.strToInt);
    const nextState = flip(move);
    if (done && !reachedStates.find(s => s === matrixToStrOfBits(nextState))) {
      return moveUntilSolution(state, [...solution, i], i);
    }

    if (checkResolvedRiddle(nextState)) {
      return [...solution, i];
    } else if (i === 3 && !done) {
      i = -1;
      done = true;
    }
  }
};

deduceBestSolutions().map((a, i) => console.log(intToMatrix(i), a));
