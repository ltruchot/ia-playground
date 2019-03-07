/*
We have a boolean matrix that contains 2 lines and 2 columns
Each cell is randomly true or false at start
const matrix = [[true, false], [true, true]];

We can change the value one by one as much as we want
But each time, all the values of the same line and column are negate (flipped)
so here, if we change false to true, we obtain
[[false, true], [true, false]];
So you can only use the immutable "flipcross" function to get the new array

Find an algo that can turn the boolean matrix to fully true
"BIG O" logged must be the smallest possible
"WIN R" must be true
*/
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const negate = a => !a;
const flatArray = arr => arr.reduce((acc, val) => acc.concat(val), []);
const isTruthyArray = arr => !arr.some(negate);
const checkResolvedRiddle = pipe(
  flatArray,
  isTruthyArray
);
const randomBool = () => Math.random() >= 0.5;
const flipCross = y => x => matrix => {
  return matrix
    .map((line, lineIdx) => (lineIdx === y ? line.map(negate) : line))
    .map((line, lineIdx) =>
      line.map((cell, idx) =>
        idx === x && lineIdx !== y ? negate(cell) : cell
      )
    );
};

// random matrix
const randomBoolMatrix = [
  [randomBool(), randomBool()],
  [randomBool(), randomBool()]
];
console.log('randomBoolMatrix', randomBoolMatrix);
// put your code in this function
let bigO = 0;
const resolveRiddle = matrix => {
  bigO++;
  const randomIndexInArray = arr => Math.floor(Math.random() * arr.length);
  const firstFalsyItem = arr => {
    let falseItemCoords;
    arr.some((line, y) =>
      line.some((cell, x) => {
        if (!cell) {
          falseItemCoords = [y, x];
          return true;
        }
      })
    );
    return falseItemCoords;
  };
  const locateTruthyCells = arr => {
    let y = 0;
    return arr.reduce((coords, line) => {
      let x = 0;
      const TruthyCells = line.reduce((cellCoords, cell) => {
        let cellCoord = [];
        if (cell) {
          cellCoord = [y, x];
          cellCoords.push(cellCoord);
        }
        x++;
        return cellCoords;
      }, []);
      y++;
      return coords.concat(TruthyCells);
    }, []);
  };

  const truthyCells = locateTruthyCells(matrix);
  switch (truthyCells.length) {
    case 1: {
      // flip opposite
      let [y0, x0] = truthyCells[0];
      return resolveRiddle(flipCross(+!y0)(+!x0)(matrix));
    }
    case 2: {
      // if same line / column: flip any true, else: flip any false
      let [y0, x0] = truthyCells[0];
      let [y1, x1] = truthyCells[1];

      return resolveRiddle(
        flipCross(y0)(y0 === y1 || x0 === x1 ? x0 : +!x0)(matrix)
      );
    }
    case 3: {
      // flip the only false
      let [y, x] = firstFalsyItem(matrix);
      return resolveRiddle(flipCross(y)(x)(matrix));
    }
    case 4:
      // resolved
      console.log('BIG O:', bigO);
      return matrix;
    default:
      // flip first item
      return resolveRiddle(flipCross(0)(0)(matrix));
  }
};
/*
const AISession = () => {
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
      const randomIndexInArray = arr => Math.floor(Math.random() * arr.length);
      const y = randomIndexInArray(matrix);
      const x = randomIndexInArray(matrix[y]);
      solution.push([y, x]);
      return resolveRiddle(flipCross(y)(x)(matrix));
    };
    resolveRiddle([[false, true], [true, true]]);
    if (bestBigO > bigO) {
      bestBigO = bigO;
      bestSolution = solution;
    }
  }
  console.log('AI Session results:', bestSolution);
};
AISession();
/*
 */
// this is the test case

console.log(
  'WIN R: ',
  pipe(
    resolveRiddle,
    checkResolvedRiddle
  )(randomBoolMatrix)
);
/*
 */
