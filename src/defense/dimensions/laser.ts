import { visual } from "@i2analyze/notebook-sdk";
import { xDelta, yDelta } from "../../common";

export const LaserDims = {
  x: 15 * xDelta,
  y: 7 * yDelta,
};

export function getLaserPosition(center: visual.IPosition) {
  // we have a 15 x 6 grid with some squares filled in

  const topLeft = {
    x: center.x - LaserDims.x / 2,
    y: center.y + LaserDims.y / 2,
  };

  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  return [
    positionInGrid(8, 1),
    //
    positionInGrid(7, 2),
    positionInGrid(8, 2),
    positionInGrid(9, 2),
    //
    positionInGrid(7, 3),
    positionInGrid(8, 3),
    positionInGrid(9, 3),
    //
    positionInGrid(2, 4),
    positionInGrid(3, 4),
    positionInGrid(4, 4),
    positionInGrid(5, 4),
    positionInGrid(6, 4),
    positionInGrid(7, 4),
    positionInGrid(8, 4),
    positionInGrid(9, 4),
    positionInGrid(10, 4),
    positionInGrid(11, 4),
    positionInGrid(12, 4),
    positionInGrid(13, 4),
    positionInGrid(14, 4),
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
    //
    positionInGrid(1, 6),
    positionInGrid(2, 6),
    positionInGrid(3, 6),
    positionInGrid(4, 6),
    positionInGrid(5, 6),
    positionInGrid(6, 6),
    positionInGrid(7, 6),
    positionInGrid(8, 6),
    positionInGrid(9, 6),
    positionInGrid(10, 6),
    positionInGrid(11, 6),
    positionInGrid(12, 6),
    positionInGrid(13, 6),
    positionInGrid(14, 6),
    positionInGrid(15, 6),
    //
    positionInGrid(1, 7),
    positionInGrid(2, 7),
    positionInGrid(3, 7),
    positionInGrid(4, 7),
    positionInGrid(5, 7),
    positionInGrid(6, 7),
    positionInGrid(7, 7),
    positionInGrid(8, 7),
    positionInGrid(9, 7),
    positionInGrid(10, 7),
    positionInGrid(11, 7),
    positionInGrid(12, 7),
    positionInGrid(13, 7),
    positionInGrid(14, 7),
    positionInGrid(15, 7),
    //
  ];
}

export const WideExplosionDims = {
  x: 21 * xDelta,
  y: 7 * yDelta,
};

export function getLaserFirePositions1(center: visual.IPosition) {
  // we have a 21 x 6 grid with some squares filled in

  const topLeft = {
    x: center.x - WideExplosionDims.x / 2,
    y: center.y + WideExplosionDims.y / 2,
  };

  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  return [
    positionInGrid(18, 1),
    //
    positionInGrid(1, 2),
    positionInGrid(5, 2),
    positionInGrid(9, 2),
    positionInGrid(16, 2),
    positionInGrid(17, 2),
    positionInGrid(18, 2),
    positionInGrid(21, 2),
    //
    positionInGrid(5, 3),
    positionInGrid(9, 3),
    positionInGrid(12, 3),
    positionInGrid(13, 3),
    positionInGrid(14, 3),
    positionInGrid(20, 3),
    //
    positionInGrid(2, 4),
    positionInGrid(6, 4),
    positionInGrid(9, 4),
    positionInGrid(19, 4),
    positionInGrid(21, 4),
    //
    positionInGrid(3, 5),
    positionInGrid(10, 5),
    positionInGrid(11, 5),
    positionInGrid(15, 5),
    positionInGrid(16, 5),
    positionInGrid(18, 5),
    //
    positionInGrid(4, 6),
    positionInGrid(5, 6),
    positionInGrid(6, 6),
    positionInGrid(7, 6),
    positionInGrid(8, 6),
    positionInGrid(9, 6),
    positionInGrid(10, 6),
    positionInGrid(11, 6),
    positionInGrid(12, 6),
    positionInGrid(13, 6),
    positionInGrid(14, 6),
    positionInGrid(15, 6),
    positionInGrid(16, 6),
    //
    positionInGrid(4, 7),
    positionInGrid(5, 7),
    positionInGrid(8, 7),
    positionInGrid(9, 7),
    positionInGrid(10, 7),
    positionInGrid(11, 7),
    positionInGrid(12, 7),
    positionInGrid(13, 7),
    positionInGrid(14, 7),
    positionInGrid(15, 7),
    positionInGrid(16, 7),
    positionInGrid(19, 7),
    //
  ];
}

export const NarrowExplosionDims = {
  x: 15 * xDelta,
  y: 8 * yDelta,
};

export function getLaserFirePositions2(center: visual.IPosition) {
  // we have a 15 x 6 grid with some squares filled in

  const topLeft = {
    x: center.x - NarrowExplosionDims.x / 2,
    y: center.y + NarrowExplosionDims.y / 2,
  };

  function positionInGrid(x: number, y: number): visual.IPosition {
    return { x: topLeft.x + x * xDelta, y: topLeft.y - y * yDelta };
  }

  return [
    positionInGrid(6, 1),
    //
    positionInGrid(11, 2),
    //
    positionInGrid(6, 3),
    positionInGrid(8, 3),
    positionInGrid(10, 3),
    //
    positionInGrid(3, 4),
    positionInGrid(6, 4),

    //
    positionInGrid(7, 5),
    positionInGrid(8, 5),
    positionInGrid(10, 5),
    positionInGrid(11, 5),
    //
    positionInGrid(1, 6),
    positionInGrid(5, 6),
    positionInGrid(7, 6),
    positionInGrid(8, 6),
    positionInGrid(10, 6),
    positionInGrid(12, 6),
    //

    positionInGrid(3, 7),
    positionInGrid(4, 7),
    positionInGrid(5, 7),
    positionInGrid(6, 7),
    positionInGrid(7, 7),
    positionInGrid(8, 7),
    positionInGrid(9, 7),
    positionInGrid(10, 7),
    positionInGrid(13, 7),
    //
    positionInGrid(2, 8),
    positionInGrid(3, 8),
    positionInGrid(4, 8),
    positionInGrid(5, 8),
    positionInGrid(6, 8),
    positionInGrid(7, 8),
    positionInGrid(8, 8),
    positionInGrid(9, 8),
    positionInGrid(10, 8),
    positionInGrid(11, 8),
    positionInGrid(13, 8),
    positionInGrid(15, 8),
  ];
}
