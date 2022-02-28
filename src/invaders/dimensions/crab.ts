import { visual } from "@i2analyze/notebook-sdk";
import { MovementState } from "../../Types";
import { xDelta, yDelta } from "../../common";

export const CrabDims = {
  x: 12 * xDelta,
  y: 8 * yDelta,
};

export function getCrabPositions(
  center: visual.IPosition,
  movementState: MovementState
) {
  // we have a 8 x 12 grid with some squares filled in

  const topLeft = {
    x: center.x - CrabDims.x / 2,
    y: center.y + CrabDims.y / 2,
  };
  // we have a 8 x 11 grid with some squares filled in
  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  const isOut = movementState === "out";

  return [
    positionInGrid(3, 1),
    positionInGrid(9, 1),
    //
    isOut ? positionInGrid(1, 2) : positionInGrid(5, 8),
    positionInGrid(4, 2),
    positionInGrid(8, 2),
    isOut ? positionInGrid(11, 2) : positionInGrid(7, 8),
    //
    isOut ? positionInGrid(1, 3) : positionInGrid(1, 6),
    positionInGrid(3, 3),
    positionInGrid(4, 3),
    positionInGrid(5, 3),
    positionInGrid(6, 3),
    positionInGrid(7, 3),
    positionInGrid(8, 3),
    positionInGrid(9, 3),
    isOut ? positionInGrid(11, 3) : positionInGrid(11, 6),
    //
    isOut ? positionInGrid(1, 4) : positionInGrid(1, 7),
    positionInGrid(2, 4),
    positionInGrid(3, 4),
    positionInGrid(5, 4),
    positionInGrid(6, 4),
    positionInGrid(7, 4),
    positionInGrid(9, 4),
    positionInGrid(10, 4),
    isOut ? positionInGrid(11, 4) : positionInGrid(11, 7),
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
    //
    positionInGrid(2, 6),
    positionInGrid(3, 6),
    positionInGrid(4, 6),
    positionInGrid(5, 6),
    positionInGrid(6, 6),
    positionInGrid(7, 6),
    positionInGrid(8, 6),
    positionInGrid(9, 6),
    positionInGrid(10, 6),
    //
    positionInGrid(3, 7),
    positionInGrid(9, 7),
    //
    isOut ? positionInGrid(2, 8) : positionInGrid(4, 8),
    isOut ? positionInGrid(10, 8) : positionInGrid(8, 8),
  ];
}
