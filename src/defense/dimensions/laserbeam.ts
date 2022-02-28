import { visual } from "@i2analyze/notebook-sdk";
import { xDelta, yDelta } from "../../common";

export const LaserBeamDims = {
  x: 1 * xDelta,
  y: 3 * yDelta,
};

export function getLaserBeamPosition(center: visual.IPosition) {
  const topLeft = {
    x: center.x - LaserBeamDims.x / 2,
    y: center.y + LaserBeamDims.y / 2,
  };

  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  return [
    positionInGrid(1, 1),
    //
    positionInGrid(1, 2),
    //
    positionInGrid(1, 3),
  ];
}

export function getExplosionPositions(center: visual.IPosition) {
  const topLeft = {
    x: center.x - LaserBeamDims.x / 2,
    y: center.y + LaserBeamDims.y / 2,
  };

  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  return [
    positionInGrid(1, 1),
    positionInGrid(1, 3),
    //
    positionInGrid(2, 2),
    positionInGrid(2, 3),
    //
    positionInGrid(1, 3),
    positionInGrid(2, 3),
    positionInGrid(3, 3),
    //
    positionInGrid(2, 4),
    //
    positionInGrid(1, 5),
    positionInGrid(3, 5),
  ];
}
