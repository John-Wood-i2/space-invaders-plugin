import { app, chart, records, visual } from "@i2analyze/notebook-sdk";
import { getNodeFromRecord, offScreen } from "../common";
import {
  getLaserFirePositions1,
  getLaserFirePositions2,
  getLaserPosition,
  LaserDims,
} from "./dimensions/laser";
import { LaserBeamDims } from "./dimensions/laserbeam";
import { ILaserBeam, LaserBeam } from "./LaserBeam";

export interface ILaserCannon {
  move(mutations: app.ITrackedMutations, xDelta: number): void;
  hitTest(position: visual.IPosition): boolean;
  setExplodePosition(
    mutations: app.ITrackedMutations,
    option: "wide" | "narrow"
  ): void;
  shoot(mutations: app.ITrackedMutations): ILaserBeam;
  setInitialPosition(
    mutations: app.ITrackedMutations,
    chart: chart.IChart
  ): void;
}

export class LaserCannon implements ILaserCannon {
  private readonly records = new Map<
    records.AnalyzeRecordId,
    visual.IPosition
  >();

  private readonly nodes: visual.ElementId[] = [];
  private center: visual.IPosition;

  private dimensions = LaserDims;

  private laserBeam: ILaserBeam;

  constructor(
    initialCenter: visual.IPosition,
    mutations: app.ITrackedMutations,
    chart: chart.IChart
  ) {
    const type = chart.schema.entityTypes.firstOrDefault(undefined)!;

    this.center = initialCenter;
    const positions = getLaserPosition(this.center);

    for (let i = 0; i < positions.length; i++) {
      const record = mutations.addEntityRecord({ itemType: type });
      this.records.set(record.recordId, positions[i]);
    }

    this.laserBeam = new LaserBeam(initialCenter, mutations, chart);
  }

  setInitialPosition(mutations: app.ITrackedMutations, chart: chart.IChart) {
    this.records.forEach((position, recordId) => {
      const node = getNodeFromRecord(recordId, chart);
      mutations.setNodeCenter(node, position);
      this.nodes.push(node.id);
    });

    this.laserBeam.setInitialPosition(mutations, chart, offScreen);
  }

  hitTest(position: visual.IPosition): boolean {
    return (
      Math.abs(position.x - this.center.x) < this.dimensions.x / 2 ||
      Math.abs(position.y - this.center.y) < this.dimensions.y / 2
    );
  }

  setExplodePosition(
    mutations: app.ITrackedMutations,
    option: "wide" | "narrow"
  ): void {
    return this.setExplodePositions(
      () =>
        option === "wide"
          ? getLaserFirePositions1(this.center)
          : getLaserFirePositions2(this.center),
      mutations
    );
  }

  private setExplodePositions(
    getPositions: () => visual.IPosition[],
    mutations: app.ITrackedMutations
  ) {
    const explosionPositions = getPositions();
    this.nodes.forEach((nodeId, index) => {
      if (index < explosionPositions.length) {
        const pos = explosionPositions[index];
        mutations.setNodeCenter(nodeId, pos);
      } else {
        mutations.setNodeCenter(nodeId, offScreen);
      }
    });
  }

  move(mutations: app.ITrackedMutations, xDelta: number) {
    this.center = {
      x: this.center.x + xDelta,
      y: this.center.y,
    };

    const newPositions = getLaserPosition(this.center);

    this.nodes.forEach((node, index) => {
      mutations.setNodeCenter(node, newPositions[index]);
    });
  }

  shoot(mutations: app.ITrackedMutations) {
    this.laserBeam.fire(mutations, {
      x: this.center.x,
      y: this.center.y + LaserDims.y / 2 + LaserBeamDims.y,
    });
    return this.laserBeam;
  }
}
