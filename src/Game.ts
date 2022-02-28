import { toolview } from "@i2analyze/notebook-sdk";
import { IBunker, ILaserBeam, ILaserCannon, LaserCannon } from "./defense";
import { Crab, IInvader, Octopus, Squid } from "./invaders";
import {
  gridCellDimensions,
  gridDimensions,
  totalHeight,
  totalWidth,
  xDelta,
  yDelta,
} from "./common";

export class Game {
  private liveInvaders = new Set<IInvader>();
  private deadInvaders = new Set<IInvader>();
  private bunkers = new Set<IBunker>();

  private laser?: ILaserCannon;

  constructor(private readonly api: toolview.IToolViewApi) {
    this.initialiseGame();

    const remove = api.addEventListener("chartchange", (changes) => {
      // get nodes, position them, and then remove listener

      api.runTrackedMutations((app, mutations) => {
        this.liveInvaders.forEach((invader) => {
          invader.setInitialPosition(mutations, app.chart);
        });

        this.bunkers.forEach((bunker) =>
          bunker.setInitialPosition(mutations, app.chart)
        );

        this.laser?.setInitialPosition(mutations, app.chart);
        return { type: "commit", actionDisplayName: "position invaders" };
      });

      remove();
      setTimeout(() => this.start(), 2000);
    });
  }

  private initialiseGame() {
    this.api.runTrackedMutations((app, mutations) => {
      for (let i = 1; i <= 11; i++) {
        const x =
          ((gridDimensions.x - 11) / (2 * gridDimensions.x)) * totalWidth +
          (i - 0.5) * gridCellDimensions.x * xDelta;
        const y = -1.5 * gridCellDimensions.y * yDelta;
        const squid = new Squid({ x, y }, mutations, app.chart);
        this.liveInvaders.add(squid);
      }

      for (let i = 1; i <= 11; i++) {
        const x =
          ((gridDimensions.x - 11) / (2 * gridDimensions.x)) * totalWidth +
          (i - 0.5) * gridCellDimensions.x * xDelta;

        for (let j = 1; j <= 2; j++) {
          const y = -(1.5 + j) * gridCellDimensions.y * yDelta;
          const crab = new Crab({ x, y }, mutations, app.chart);
          this.liveInvaders.add(crab);
        }
      }

      for (let i = 1; i <= 11; i++) {
        const x =
          ((gridDimensions.x - 11) / (2 * gridDimensions.x)) * totalWidth +
          (i - 0.5) * gridCellDimensions.x * xDelta;

        for (let j = 1; j <= 2; j++) {
          const y = -(3.5 + j) * gridCellDimensions.y * yDelta;
          const octopus = new Octopus({ x, y }, mutations, app.chart);
          this.liveInvaders.add(octopus);
        }
      }

      // for (let i = 1; i <= 10; i = i + 3) {
      //   const x =
      //     ((gridDimensions.x - 11) / (2 * gridDimensions.x)) * totalWidth +
      //     i * gridCellDimensions.x * xDelta;
      //   const y = -11 * gridCellDimensions.y * yDelta;
      //   const bunker = new Bunker({ x, y }, mutations, app.chart);
      //   this.bunkers.add(bunker);
      // }

      const laserX = totalWidth / 2;
      const laserY = -12.5 * gridCellDimensions.y * yDelta;

      this.laser = new LaserCannon(
        { x: laserX, y: laserY },
        mutations,
        app.chart
      );

      return {
        type: "commit",
        actionDisplayName: "Create Space Invaders nodes",
      };
    });
  }

  private isInvaderAtTheLeft() {
    return Array.from(this.liveInvaders).find((i) => i.hitSideTest(0))!!;
  }

  private isInvaderAtTheRight() {
    return Array.from(this.liveInvaders).find((i) =>
      i.hitSideTest(totalWidth)
    )!!;
  }

  private isInvaderAtTheBottom() {
    return Array.from(this.liveInvaders).find((i) =>
      i.hitBottomTest(
        -1 * totalHeight * ((gridDimensions.y - 1) / gridDimensions.y)
      )
    )!!;
  }

  private invaderMoveDirection: "right" | "left" = "right";

  private getDirection(): "right" | "left" {
    if (this.invaderMoveDirection === "right") {
      return this.isInvaderAtTheRight() ? "left" : "right";
    } else {
      return this.isInvaderAtTheLeft() ? "right" : "left";
    }
  }

  private moveTimeoutHandle?: number;

  public end() {
    if (this.moveTimeoutHandle) {
      window.clearTimeout(this.moveTimeoutHandle);
      this.moveTimeoutHandle = undefined;
    }
  }

  start() {
    this.setupDescendingInvaders();
    this.listenToMovingLaser();
    // this.explodeLaser();
  }

  private changesPaused = false;

  private setupDescendingInvaders() {
    const moveInvaders = () => {
      if (this.isInvaderAtTheBottom()) {
        // TODO END GAME
        return;
      }

      this.moveTimeoutHandle = window.setTimeout(() => {
        const invaderMoveDirection = this.getDirection();

        const previousInvaderMoveDirection = this.invaderMoveDirection;

        const yMovement =
          previousInvaderMoveDirection !== invaderMoveDirection
            ? -8 * yDelta
            : 0;

        this.api.runTrackedMutations((_app, mutations) => {
          this.liveInvaders.forEach((invader) => {
            const movement = this.calculateMoveSize();

            invader.move(mutations, {
              xDelta:
                invaderMoveDirection === "right" ? movement : -1 * movement,
              yDelta: yMovement,
            });
          });
          return { type: "commit", actionDisplayName: "position invaders" };
        });

        this.invaderMoveDirection = invaderMoveDirection;
        moveInvaders();
      }, this.calculateMoveTime());
    };

    moveInvaders();
  }

  private async explodeLaser() {
    this.changesPaused = true;

    const runExplosion = (explosionType: "wide" | "narrow") => {
      this.api.runTrackedMutations((_app, mutations) => {
        this.laser?.setExplodePosition(mutations, explosionType);
        return { type: "commit", actionDisplayName: "explode laser" };
      });
    };

    const waitFor = (time: number) =>
      new Promise((res) => setTimeout(res, time));

    for (let i = 1; i < 10; i++) {
      runExplosion("wide");
      await waitFor(100);
      runExplosion("narrow");
      await waitFor(100);
    }
  }

  private laserBeam?: ILaserBeam;
  private moveLaserBeamHandle?: number;

  private triggerHideLaserBeam() {
    window.setTimeout(() => {
      this.api.runTrackedMutations((app, mutations) => {
        this.laserBeam?.hide(mutations);
        this.laserBeam = undefined;
        return { type: "commit", actionDisplayName: "hide laser beam" };
      });
    }, 500);
  }

  private triggerHideInvader(invader: IInvader) {
    window.setTimeout(() => {
      this.api.runTrackedMutations((app, mutations) => {
        invader.hide(mutations);
        return { type: "commit", actionDisplayName: "hide invader" };
      });
    }, 500);
  }

  private setUpAdvancingLaserBeam() {
    const laserBeam = this.laserBeam!;

    const moveLaserBeam = () => {
      this.moveLaserBeamHandle = window.setTimeout(() => {
        // Laser has hit the top of the screen;
        if (laserBeam.getHitPosition().y >= 0) {
          this.api.runTrackedMutations((app, mutations) => {
            laserBeam.explode(mutations, app.chart);
            this.triggerHideLaserBeam();
            return { type: "commit", actionDisplayName: "explode laser beam" };
          });
          return;
        }

        // Laser has hit an invader
        for (const invader of this.liveInvaders) {
          const hasHit = invader.hitTest(laserBeam.getHitPosition());
          if (hasHit) {
            if (this.liveInvaders.size === 1) {
              window.clearTimeout(this.moveTimeoutHandle);
            }

            this.api.runTrackedMutations((app, mutations) => {
              invader.explode(mutations);
              this.laserBeam?.hide(mutations);
              this.laserBeam = undefined;
              this.triggerHideInvader(invader);
              this.liveInvaders.delete(invader);
              this.deadInvaders.add(invader);
              return {
                type: "commit",
                actionDisplayName: "explode invader",
              };
            });
            return;
          }
        }

        this.api.runTrackedMutations((_app, mutations) => {
          laserBeam.move(mutations, 6 * yDelta);
          return { type: "commit", actionDisplayName: "advance laser beam" };
        });

        // TODO track laser beam

        moveLaserBeam();
      }, 30);
    };

    moveLaserBeam();
  }

  private listenToMovingLaser() {
    window.addEventListener("keydown", (e) => {
      console.log("listening to keydown event");
      if (e.key === "ArrowLeft") {
        this.api.runTrackedMutations((_app, mutations) => {
          this.laser?.move(mutations, -2 * xDelta);
          return { type: "commit", actionDisplayName: "Move laser left" };
        });

        e.preventDefault();
        e.stopPropagation();
      }

      if (e.key === "ArrowRight") {
        this.api.runTrackedMutations((_app, mutations) => {
          this.laser?.move(mutations, 2 * xDelta);
          return { type: "commit", actionDisplayName: "Move laser right" };
        });
        e.preventDefault();
        e.stopPropagation();
      }

      if (e.key === "x") {
        e.preventDefault();
        e.stopPropagation();

        if (this.laserBeam) {
          return;
        }

        this.api.runTrackedMutations((_app, mutations) => {
          this.laserBeam = this.laser?.shoot(mutations);
          this.setUpAdvancingLaserBeam();
          return { type: "commit", actionDisplayName: "Fire laser" };
        });
      }
    });
  }

  private calculateMoveTime(): number {
    const numberOfLiveInvaders = this.liveInvaders.size;

    if (numberOfLiveInvaders <= 7) return 40;
    if (numberOfLiveInvaders <= 10) return 80;
    if (numberOfLiveInvaders <= 12) return 150;
    if (numberOfLiveInvaders <= 15) return 250;
    if (numberOfLiveInvaders <= 17) return 300;
    if (numberOfLiveInvaders <= 20) return 350;
    if (numberOfLiveInvaders <= 22) return 400;
    if (numberOfLiveInvaders <= 25) return 500;
    if (numberOfLiveInvaders <= 30) return 600;
    if (numberOfLiveInvaders <= 35) return 700;
    if (numberOfLiveInvaders <= 45) return 800;
    return 900;
  }

  private calculateMoveSize(): number {
    const numberOfLiveInvaders = this.liveInvaders.size;
    if (numberOfLiveInvaders === 1) return 6 * xDelta;
    if (numberOfLiveInvaders <= 3) return 4 * xDelta;
    if (numberOfLiveInvaders <= 5) return 3 * xDelta;
    return 2 * xDelta;
  }
}
