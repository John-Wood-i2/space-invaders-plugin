import { app, chart, visual } from "@i2analyze/notebook-sdk";
import { Invader, IInvader } from "./Invader";
import { getSquidPositions, SquidDims } from "./dimensions/squid";

export class Squid implements IInvader {
  private invader: IInvader;

  constructor(
    initialCenter: visual.IPosition,
    mutations: app.ITrackedMutations,
    chart: chart.IChart
  ) {
    this.invader = new Invader(
      getSquidPositions,
      SquidDims,
      "S",
      initialCenter,
      mutations,
      chart
    );
  }

  setInitialPosition(mutations: app.ITrackedMutations, chart: chart.IChart) {
    this.invader.setInitialPosition(mutations, chart);
  }

  move(
    mutations: app.ITrackedMutations,
    delta: { xDelta: number; yDelta: number }
  ) {
    this.invader.move(mutations, delta);
  }

  hitSideTest(value: number): boolean {
    return this.invader.hitSideTest(value);
  }

  hitBottomTest(value: number): boolean {
    return this.invader.hitBottomTest(value);
  }

  hitTest(position: visual.IPosition): boolean {
    return this.invader.hitTest(position);
  }

  explode(mutations: app.ITrackedMutations): void {
    return this.invader.explode(mutations);
  }

  remove(mutations: app.ITrackedMutations): void {
    return this.invader.remove(mutations);
  }

  shoot(mutations: app.ITrackedMutations, chart: chart.IChart) {
    return this.invader.shoot(mutations, chart);
  }

  hide(mutations: app.ITrackedMutations): void {
    this.invader.hide(mutations);
  }
}
