import { visual } from "@i2analyze/notebook-sdk";
import { xDelta, yDelta } from "../../common";

export const MissileDims = {
  x: 3 * xDelta,
  y: 5 * yDelta,
};

export function getTMissilePositions(center: visual.IPosition) {
  const topLeft = {
    x: center.x - MissileDims.x / 2,
    y: center.y + MissileDims.y / 2,
  };
  // we have a 8 x 11 grid with some squares filled in
  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  return [
    positionInGrid(1, 1),
    positionInGrid(2, 1),
    positionInGrid(3, 1),
    //
    positionInGrid(2, 2),
    //
    positionInGrid(3, 2),
    //
    positionInGrid(4, 2),
    //
    positionInGrid(5, 2),
  ];
}

export function getCrossMissilePositions(center: visual.IPosition) {
  const topLeft = {
    x: center.x - MissileDims.x / 2,
    y: center.y + MissileDims.y / 2,
  };
  // we have a 8 x 11 grid with some squares filled in
  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  return [
    positionInGrid(1, 1),
    //
    positionInGrid(2, 2),
    positionInGrid(2, 2),
    positionInGrid(3, 2),
    //
    positionInGrid(3, 2),
    //
    positionInGrid(4, 2),
    //
    positionInGrid(5, 2),
  ];
}

export enum SMissileTailPosition {
  left,
  centerLeft,
  right,
  centerRight,
}

export function getSMissilePositions(
  center: visual.IPosition,
  tailPosition: SMissileTailPosition
) {
  const topLeft = {
    x: center.x - MissileDims.x / 2,
    y: center.y + MissileDims.y / 2,
  };
  // we have a 8 x 11 grid with some squares filled in
  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  switch (tailPosition) {
    case SMissileTailPosition.left:
      return [
        positionInGrid(1, 1),
        positionInGrid(2, 2),
        positionInGrid(3, 3),
        positionInGrid(2, 4),
        positionInGrid(1, 5),
      ];
    case SMissileTailPosition.centerLeft:
      return [
        positionInGrid(2, 1),
        positionInGrid(3, 2),
        positionInGrid(2, 3),
        positionInGrid(1, 4),
        positionInGrid(2, 5),
      ];
    case SMissileTailPosition.right:
      return [
        positionInGrid(3, 1),
        positionInGrid(2, 2),
        positionInGrid(1, 3),
        positionInGrid(2, 4),
        positionInGrid(3, 5),
      ];
    case SMissileTailPosition.centerRight:
      return [
        positionInGrid(2, 1),
        positionInGrid(1, 2),
        positionInGrid(2, 3),
        positionInGrid(3, 4),
        positionInGrid(2, 5),
      ];
  }
}

export function getExplosionPositions(center: visual.IPosition) {
  const topLeft = {
    x: center.x - MissileDims.x / 2,
    y: center.y + MissileDims.y / 2,
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
