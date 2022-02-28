import { app, chart, visual } from "@i2analyze/notebook-sdk";

export interface ISaucer {
  appearAt(
    mutations: app.ITrackedMutations,
    chart: chart.IChart,
    position: visual.IPosition
  ): void;
  disappear(): void;
  move(
    mutations: app.ITrackedMutations,
    delta: { xDelta: number; yDelta: number }
  ): void;
  hitTest(position: visual.IPosition): boolean;
  explode(): void;
}

export type MovementState = "out" | "in";
