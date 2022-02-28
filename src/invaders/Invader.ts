import { app, chart, records, visual } from "@i2analyze/notebook-sdk";
import { getNodeFromRecord } from "../common";
import { offScreen } from "../common";
import { MovementState } from "../Types";
import { getExplosionDimensions } from "./dimensions/explosion";
import { MissileDims } from "./dimensions/missile";
import { IMissile, Missile, MissileType } from "./Missile";

function createKeyFromPosition({ x, y }: visual.IPosition): string {
  return `${x}:${y}`;
}

export interface IInvader {
  move(
    mutations: app.ITrackedMutations,
    delta: { xDelta: number; yDelta: number }
  ): void;

  hitSideTest(value: number): boolean;
  hitBottomTest(value: number): boolean;

  hitTest(position: visual.IPosition): boolean;
  explode(mutations: app.ITrackedMutations): void;
  shoot(mutations: app.ITrackedMutations, chart: chart.IChart): IMissile;
  setInitialPosition(
    mutations: app.ITrackedMutations,
    chart: chart.IChart
  ): void;
  remove(mutations: app.ITrackedMutations): void;
  hide(mutations: app.ITrackedMutations): void;
}

export class Invader implements IInvader {
  private readonly nodes = new Map<visual.ElementId, visual.IPosition>();
  private readonly records = new Map<
    records.AnalyzeRecordId,
    visual.IPosition
  >();

  // Store the center so we can short circuit hit testing
  private center: visual.IPosition;

  private movementState: MovementState = "out";

  private toggleMovementState() {
    this.movementState = this.movementState === "out" ? "in" : "out";
  }

  private missile: IMissile;

  constructor(
    private getPositions: (
      center: visual.IPosition,
      movementState: MovementState
    ) => visual.IPosition[],
    private dimensions: visual.IPosition,
    missileType: MissileType,
    initialCenter: visual.IPosition,
    mutations: app.ITrackedMutations,
    chart: chart.IChart
  ) {
    const type = chart.schema.entityTypes.firstOrDefault(undefined)!;

    const positions = getPositions(initialCenter, this.movementState);
    this.missile = new Missile(initialCenter, mutations, chart, missileType);

    this.center = initialCenter;

    for (let i = 0; i < positions.length; i++) {
      const record = mutations.addEntityRecord({ itemType: type });
      this.records.set(record.recordId, positions[i]);
    }
  }

  setInitialPosition(mutations: app.ITrackedMutations, chart: chart.IChart) {
    this.records.forEach((position, recordId) => {
      const node = getNodeFromRecord(recordId, chart);
      mutations.setNodeCenter(node, position);
      this.nodes.set(node.id, position);
    });

    this.missile.setInitialPosition(mutations, chart, offScreen);
  }

  move(
    mutations: app.ITrackedMutations,
    delta: { xDelta: number; yDelta: number }
  ) {
    this.center = {
      x: this.center.x + delta.xDelta,
      y: this.center.y + delta.yDelta,
    };
    this.toggleMovementState();

    const newPositions = this.getPositions(this.center, this.movementState);
    // Stringify the positions for easy comparison
    const mapOfNewPositions = new Map(
      newPositions.map((p) => [createKeyFromPosition(p), p])
    );

    const setOfNodesToUpdate = new Set<visual.ElementId>();

    for (const [nodeId, oldPosition] of this.nodes.entries()) {
      // If the position still exists in the set of new positions - then the node doesn't move
      const stringPos = createKeyFromPosition(oldPosition);
      if (mapOfNewPositions.has(stringPos)) {
        mapOfNewPositions.delete(stringPos);
      } else {
        setOfNodesToUpdate.add(nodeId);
      }
    }

    // Take an array of new positions - so we can take one at a time - and easily reuse the last
    // position if we run out of unique ones
    const newPositionsToUse = Array.from(mapOfNewPositions.values());

    let i = 0;
    for (const nodeId of setOfNodesToUpdate) {
      const position =
        newPositionsToUse[Math.min(i, newPositionsToUse.length - 1)];
      mutations.setNodeCenter(nodeId, position);
      this.nodes.set(nodeId, position);
      i++;
    }
  }

  hitSideTest(value: number): boolean {
    return Math.abs(value - this.center.x) < this.dimensions.x / 2;
  }

  hitBottomTest(value: number): boolean {
    return Math.abs(value - this.center.y) < this.dimensions.y / 2;
  }

  hitTest(position: visual.IPosition): boolean {
    return (
      Math.abs(position.x - this.center.x) < this.dimensions.x / 2 &&
      Math.abs(position.y - this.center.y) < this.dimensions.y / 2
    );
  }

  explode(mutations: app.ITrackedMutations): void {
    const explosionPositions = getExplosionDimensions(this.center);

    const nodes = Array.from(this.nodes.keys());

    nodes.forEach((nodeId, index) => {
      if (index < explosionPositions.length) {
        const pos = explosionPositions[index];
        mutations.setNodeCenter(nodeId, pos);
      } else {
        mutations.setNodeCenter(nodeId, offScreen);
      }
    });
  }

  removeFromView(mutations: app.ITrackedMutations): void {
    for (const node of this.nodes.keys()) {
      mutations.setNodeCenter(node, offScreen);
    }
  }

  remove(mutations: app.ITrackedMutations): void {
    // mutations.removeElements(this.nodes.keys())
  }

  shoot(mutations: app.ITrackedMutations, chart: chart.IChart) {
    this.missile.setInitialPosition(mutations, chart, {
      x: this.center.x,
      y: this.center.y + this.dimensions.y / 2 + MissileDims.y,
    });
    return this.missile;
  }

  hide(mutations: app.ITrackedMutations) {
    this.nodes.forEach((position, node) => {
      mutations.setNodeCenter(node, offScreen);
    });
  }
}
