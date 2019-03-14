import { negate } from "./../core/functionalHelper";
import { generateBool } from "./../core/randomHelper";

export const flipCross = matrix => ([y, x]) => {
  return matrix
    .map((line, lineIdx) => (lineIdx === y ? line.map(negate) : line))
    .map((line, lineIdx) =>
      line.map((cell, idx) =>
        idx === x && lineIdx !== y ? negate(cell) : cell
      )
    );
};

export const firstFalsyItem = arr => {
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

export const locateTruthyCells = arr => {
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

export const generateSquaredMatrix = length =>
  Array.from({ length }, () => [
    ...Array.from({ length }, () => generateBool())
  ]);
