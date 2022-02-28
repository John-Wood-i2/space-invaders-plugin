import { app, chart, records, visual } from "@i2analyze/notebook-sdk";
import { getNodeFromRecord } from "../common/getNodeFromRecord";
import { getBunkerPositions } from "./dimensions/bunker";

export interface IBunker {
  hitTest(position: visual.IPosition): boolean;
  takeDamage(
    mutations: app.ITrackedMutations,
    position: visual.IPosition,
    scale: number
  ): void;
  setInitialPosition(
    mutations: app.ITrackedMutations,
    chart: chart.IChart
  ): void;
}

export class Bunker implements IBunker {
  private readonly records = new Map<
    records.AnalyzeRecordId,
    visual.IPosition
  >();

  private readonly nodes: visual.ElementId[] = [];

  constructor(
    initialCenter: visual.IPosition,
    mutations: app.ITrackedMutations,
    chart: chart.IChart
  ) {
    const type = chart.schema.entityTypes.firstOrDefault(undefined)!;

    const positions = getBunkerPositions(initialCenter);

    for (let i = 0; i < positions.length; i++) {
      const record = mutations.addEntityRecord({ itemType: type });
      this.records.set(record.recordId, positions[i]);
    }
  }

  setInitialPosition(mutations: app.ITrackedMutations, chart: chart.IChart) {
    this.records.forEach((position, recordId) => {
      const node = getNodeFromRecord(recordId, chart);
      mutations.setNodeCenter(node, position);
      this.nodes.push(node.id);
    });
  }

  hitTest(_postion: visual.IPosition): boolean {
    return false;
  }

  takeDamage(): void {
    // TODO implement
  }
}
