import { app, chart, records, visual } from "@i2analyze/notebook-sdk";
import { getNodeFromRecord, offScreen } from "../common";
import {
  getCrossMissilePositions,
  getExplosionPositions,
  getSMissilePositions,
  getTMissilePositions,
  MissileDims,
  SMissileTailPosition,
} from "./dimensions/missile";

export interface IMissile {
  move(mutations: app.ITrackedMutations, xDelta: number): void;
  hide(mutations: app.ITrackedMutations): void;
  setInitialPosition(
    mutations: app.ITrackedMutations,
    chart: chart.IChart,
    position: visual.IPosition
  ): void;
  getHitArea(): {
    x: { min: number; max: number };
    y: { min: number; max: number };
  };
  explode(mutations: app.ITrackedMutations, chart: chart.IChart): void;
}

export type MissileType = "T" | "S" | "CROSS";

export class Missile implements IMissile {
  private readonly records = new Set<records.AnalyzeRecordId>();

  private readonly nodes: visual.ElementId[] = [];
  private center: visual.IPosition;

  private readonly dimensions = MissileDims;

  constructor(
    initialCenter: visual.IPosition,
    mutations: app.ITrackedMutations,
    chart: chart.IChart,
    private readonly type: MissileType
  ) {
    const itemType = chart.schema.entityTypes.firstOrDefault(undefined)!;

    this.center = initialCenter;
    // Get the explosion positions because we need all the nodes we could use to draw the missile
    const positions = getExplosionPositions(this.center);

    for (let i = 0; i < positions.length; i++) {
      const record = mutations.addEntityRecord({ itemType });
      this.records.add(record.recordId);
    }
  }

  private missileTailPosition: SMissileTailPosition =
    SMissileTailPosition.centerLeft;

  private getMissilePositions() {
    switch (this.type) {
      case "CROSS":
        return getCrossMissilePositions(this.center);
      case "S":
        return getSMissilePositions(this.center, this.missileTailPosition);
      case "T":
        return getTMissilePositions(this.center);
    }
  }

  private cycleTailPosition() {
    switch (this.missileTailPosition) {
      case SMissileTailPosition.left:
        this.missileTailPosition = SMissileTailPosition.centerLeft;
        break;
      case SMissileTailPosition.centerLeft:
        this.missileTailPosition = SMissileTailPosition.right;
        break;
      case SMissileTailPosition.right:
        this.missileTailPosition = SMissileTailPosition.centerRight;
        break;
      case SMissileTailPosition.centerRight:
        this.missileTailPosition = SMissileTailPosition.left;
        break;
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

  move(mutations: app.ITrackedMutations, yDelta: number): void {
    this.center = {
      x: this.center.x,
      y: this.center.y - yDelta,
    };

    const newPositions = this.getMissilePositions();

    this.nodes.forEach((node, index) => {
      const position = newPositions[index] ?? offScreen;
      mutations.setNodeCenter(node, position);
    });

    this.cycleTailPosition();
  }

  hide(mutations: app.ITrackedMutations) {
    this.nodes.forEach((node) => {
      mutations.setNodeCenter(node, offScreen);
    });
  }

  getHitArea() {
    return {
      x: {
        min: this.center.x - this.dimensions.x / 2,
        max: this.center.x + this.dimensions.x / 2,
      },
      y: {
        min: this.center.y - this.dimensions.y / 2,
        max: this.center.y + this.dimensions.y / 2,
      },
    };
  }

  explode(mutations: app.ITrackedMutations) {
    const newPositions = getExplosionPositions(this.center);

    this.nodes.forEach((node, index) => {
      const position = newPositions[index] ?? offScreen;
      mutations.setNodeCenter(node, position);
    });
  }
}
