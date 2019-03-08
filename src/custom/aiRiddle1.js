// extra
import { flipCross } from './../extra/booleanMatrixHelper';
import * as randomHelper from './../core/randomHelper';
import { checkResolvedRiddle } from './testSolution';

export const aiRiddle1 = () => {
  let bestBigO = Infinity;
  let bestSolution;
  for (let i = 0; i < 10000; i++) {
    // put your code in this function
    let bigO = 0;
    const solution = [];
    const resolveRiddle = matrix => {
      bigO++;
      // case already resolved
      if (checkResolvedRiddle(matrix)) {
        return matrix;
      }

      // random resolution
      const y = randomHelper.pickIndexInArray(matrix);
      const x = randomHelper.pickIndexInArray(matrix[y]);
      solution.push([y, x]);
      return resolveRiddle(flipCross([y, x])(matrix));
    };

    resolveRiddle([[false, false], [false, true]]);

    if (bestBigO > bigO) {
      bestBigO = bigO;
      bestSolution = solution;
    }
  }
  console.log('AI Session results:', bestSolution);
};
