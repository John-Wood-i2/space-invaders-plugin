import { app, chart, records, visual } from "@i2analyze/notebook-sdk";
import { getNodeFromRecord, offScreen } from "../common";
import {
  getExplosionPositions,
  getLaserBeamPosition,
  LaserBeamDims,
} from "./dimensions/laserbeam";

export interface ILaserBeam {
  move(mutations: app.ITrackedMutations, yDelta: number): void;
  hide(mutations: app.ITrackedMutations): void;
  setInitialPosition(
    mutations: app.ITrackedMutations,
    chart: chart.IChart,
    position: visual.IPosition
  ): void;
  getHitPosition(): visual.IPosition;
  explode(mutations: app.ITrackedMutations, chart: chart.IChart): void;
  fire(mutations: app.ITrackedMutations, position: visual.IPosition): void;
}

export class LaserBeam implements ILaserBeam {
  private readonly records = new Set<records.AnalyzeRecordId>();

  private readonly nodes: visual.ElementId[] = [];
  private center: visual.IPosition;

  private dimensions = LaserBeamDims;

  constructor(
    initialCenter: visual.IPosition,
    mutations: app.ITrackedMutations,
    chart: chart.IChart
  ) {
    const type = chart.schema.entityTypes.firstOrDefault(undefined)!;

    this.center = initialCenter;
    // Get the explosion positions because we need all the nodes we could use to draw the missile
    const positions = getExplosionPositions(this.center);

    for (let i = 0; i < positions.length; i++) {
      const record = mutations.addEntityRecord({ itemType: type });
      this.records.add(record.recordId);
    }
  }

  setInitialPosition(
    mutations: app.ITrackedMutations,
    chart: chart.IChart,
    position: visual.IPosition
  ) {
    this.records.forEach((_position, recordId) => {
      const node = getNodeFromRecord(recordId, chart);
      mutations.setNodeCenter(node, position);
      this.nodes.push(node.id);
    });
  }

  fire(mutations: app.ITrackedMutations, position: visual.IPosition) {
    this.center = position;
    const newPositions = getLaserBeamPosition(position);

    this.nodes.forEach((node, index) => {
      const position = newPositions[index] ?? offScreen;
      mutations.setNodeCenter(node, position);
    });
  }

  move(mutations: app.ITrackedMutations, yDelta: number): void {
    this.center = {
      x: this.center.x,
      y: this.center.y + yDelta,
    };

    const newPositions = getLaserBeamPosition(this.center);

    this.nodes.forEach((node, index) => {
      const position = newPositions[index] ?? offScreen;
      mutations.setNodeCenter(node, position);
    });
  }

  hide(mutations: app.ITrackedMutations) {
    this.nodes.forEach((node) => {
      mutations.setNodeCenter(node, offScreen);
    });
  }

  getHitPosition() {
    return this.center;
  }

  explode(mutations: app.ITrackedMutations) {
    const newPositions = getExplosionPositions(this.center);

    this.nodes.forEach((node, index) => {
      const position = newPositions[index] ?? offScreen;
      mutations.setNodeCenter(node, position);
    });
  }
}
