import { visual } from "@i2analyze/notebook-sdk";
import { MovementState } from "../../Types";
import { xDelta, yDelta } from "../../common";

export const SquidDims = {
  x: 8 * xDelta,
  y: 8 * yDelta,
};

export function getSquidPositions(
  center: visual.IPosition,
  movementState: MovementState
) {
  // we have a 8 x 8 grid with some squares filled in

  const topLeft = {
    x: center.x - SquidDims.x / 2,
    y: center.y + SquidDims.y / 2,
  };

  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  const isOut = movementState === "out";

  return [
    positionInGrid(4, 1),
    positionInGrid(5, 1),
    //
    positionInGrid(3, 2),
    positionInGrid(4, 2),
    positionInGrid(5, 2),
    positionInGrid(6, 2),
    //
    positionInGrid(2, 3),
    positionInGrid(3, 3),
    positionInGrid(4, 3),
    positionInGrid(5, 3),
    positionInGrid(6, 3),
    positionInGrid(7, 3),
    //
    positionInGrid(1, 4),
    positionInGrid(2, 4),
    positionInGrid(4, 4),
    positionInGrid(5, 4),
    positionInGrid(7, 4),
    positionInGrid(8, 4),
    //
    positionInGrid(1, 5),
    positionInGrid(2, 5),
    positionInGrid(3, 5),
    positionInGrid(4, 5),
    positionInGrid(5, 5),
    positionInGrid(6, 5),
    positionInGrid(7, 5),
    positionInGrid(8, 5),
    //
    positionInGrid(3, 6),
    positionInGrid(6, 6),
    //
    positionInGrid(2, 7),
    isOut ? positionInGrid(4, 7) : positionInGrid(2, 7),
    isOut ? positionInGrid(5, 7) : positionInGrid(7, 7),
    positionInGrid(7, 7),
    //
    isOut ? positionInGrid(1, 8) : positionInGrid(3, 8),
    positionInGrid(3, 8),
    positionInGrid(6, 8),
    isOut ? positionInGrid(8, 8) : positionInGrid(6, 8),
  ];
}
