import { visual } from "@i2analyze/notebook-sdk";
import { xDelta, yDelta } from "../common/spacing";

export function getSaucerPositions(topLeft: visual.IPosition) {
  // we have a 7 x 16 grid with some squares filled in
  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  return [
    positionInGrid(6, 1),
    positionInGrid(7, 1),
    positionInGrid(8, 1),
    positionInGrid(9, 1),
    positionInGrid(10, 1),
    positionInGrid(11, 1),
    //
    positionInGrid(4, 2),
    positionInGrid(5, 2),
    positionInGrid(6, 2),
    positionInGrid(7, 2),
    positionInGrid(8, 2),
    positionInGrid(9, 2),
    positionInGrid(10, 2),
    positionInGrid(11, 2),
    positionInGrid(12, 2),
    positionInGrid(13, 2),
    //
    positionInGrid(3, 3),
    positionInGrid(4, 3),
    positionInGrid(5, 3),
    positionInGrid(6, 3),
    positionInGrid(7, 3),
    positionInGrid(8, 3),
    positionInGrid(9, 3),
    positionInGrid(10, 3),
    positionInGrid(11, 3),
    positionInGrid(12, 3),
    positionInGrid(13, 3),
    positionInGrid(14, 3),
    //
    positionInGrid(2, 4),
    positionInGrid(3, 4),
    positionInGrid(5, 4),
    positionInGrid(6, 4),
    positionInGrid(8, 4),
    positionInGrid(9, 4),
    positionInGrid(11, 4),
    positionInGrid(12, 4),
    positionInGrid(14, 4),
    positionInGrid(15, 4),
    //
    positionInGrid(1, 5),
    positionInGrid(2, 5),
    positionInGrid(3, 5),
    positionInGrid(4, 5),
    positionInGrid(5, 5),
    positionInGrid(6, 5),
    positionInGrid(7, 5),
    positionInGrid(8, 5),
    positionInGrid(9, 5),
    positionInGrid(10, 5),
    positionInGrid(11, 5),
    positionInGrid(12, 5),
    positionInGrid(13, 5),
    positionInGrid(14, 5),
    positionInGrid(15, 5),
    positionInGrid(16, 5),
    //
    positionInGrid(3, 6),
    positionInGrid(4, 6),
    positionInGrid(5, 6),
    positionInGrid(12, 6),
    positionInGrid(13, 6),
    positionInGrid(14, 6),
    //
    positionInGrid(4, 7),
    positionInGrid(13, 7),
  ];
}
