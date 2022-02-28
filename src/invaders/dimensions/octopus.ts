import { visual } from "@i2analyze/notebook-sdk";
import { MovementState } from "../../Types";
import { xDelta, yDelta } from "../../common";

export const OctopusDims = {
  x: 12 * xDelta,
  y: 8 * yDelta,
};

export function getOctopusPositions(
  center: visual.IPosition,
  movementState: MovementState
) {
  // we have a 8 x 12 grid with some squares filled in

  const topLeft = {
    x: center.x - OctopusDims.x / 2,
    y: center.y + OctopusDims.y / 2,
  };

  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  const isOut = movementState === "out";

  return [
    positionInGrid(5, 1),
    positionInGrid(6, 1),
    positionInGrid(7, 1),
    positionInGrid(8, 1),
    //
    positionInGrid(2, 2),
    positionInGrid(3, 2),
    positionInGrid(4, 2),
    positionInGrid(5, 2),
    positionInGrid(6, 2),
    positionInGrid(7, 2),
    positionInGrid(8, 2),
    positionInGrid(9, 2),
    positionInGrid(10, 2),
    positionInGrid(11, 2),
    //
    positionInGrid(1, 3),
    positionInGrid(2, 3),
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
    //
    positionInGrid(1, 4),
    positionInGrid(2, 4),
    positionInGrid(3, 4),
    positionInGrid(5, 4),
    positionInGrid(6, 4),
    positionInGrid(7, 4),
    positionInGrid(10, 4),
    positionInGrid(11, 4),
    positionInGrid(12, 4),
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
    //
    positionInGrid(3, 6),
    positionInGrid(4, 6),
    positionInGrid(5, 6),
    positionInGrid(8, 6),
    positionInGrid(9, 6),
    positionInGrid(10, 6),
    //
    positionInGrid(2, 7),
    positionInGrid(3, 7),
    positionInGrid(6, 7),
    positionInGrid(7, 7),
    positionInGrid(10, 7),
    positionInGrid(11, 7),
    //
    isOut ? positionInGrid(1, 8) : positionInGrid(3, 8),
    isOut ? positionInGrid(2, 8) : positionInGrid(4, 8),
    isOut ? positionInGrid(11, 8) : positionInGrid(9, 8),
    isOut ? positionInGrid(12, 8) : positionInGrid(10, 8),
  ];
}
