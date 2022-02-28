import { visual } from "@i2analyze/notebook-sdk";
import { xDelta, yDelta } from "../../common";

export const ExplosionDims = {
  x: 13 * xDelta,
  y: 9 * yDelta,
};

export function getExplosionDimensions(center: visual.IPosition) {
  // we have a 8 x 12 grid with some squares filled in

  const topLeft = {
    x: center.x - ExplosionDims.x / 2,
    y: center.y + ExplosionDims.y / 2,
  };

  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  return [
    positionInGrid(5, 1),
    positionInGrid(9, 1),
    //
    positionInGrid(2, 2),
    positionInGrid(6, 2),
    positionInGrid(8, 2),
    positionInGrid(12, 2),
    //
    positionInGrid(3, 3),
    positionInGrid(11, 3),
    //
    positionInGrid(4, 4),
    positionInGrid(10, 4),
    //
    positionInGrid(1, 5),
    positionInGrid(2, 5),
    positionInGrid(12, 5),
    positionInGrid(13, 5),
    //
    positionInGrid(4, 6),
    positionInGrid(10, 6),
    //
    positionInGrid(3, 7),
    positionInGrid(11, 7),
    //
    positionInGrid(2, 8),
    positionInGrid(6, 8),
    positionInGrid(8, 8),
    positionInGrid(12, 8),
    //
    positionInGrid(5, 9),
    positionInGrid(9, 9),
  ];
}
