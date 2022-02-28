import "./SpaceInvaders.css";
import { useToolViewApi } from "./useToolViewApi";
import { Game } from "./Game";
import { CrabIcon, OctopusIcon, SaucerIcon, SquidIcon } from "./invaders";

export interface ISpaceInvadersProps {
  return: () => void;
}

const svgDims = { width: 64, height: 64 };

export default function SpaceInvaders(_props: ISpaceInvadersProps) {
  const api = useToolViewApi();

  function createGame() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _game = new Game(api);
  }
  return (
    <>
      <div className="si_instructions">
        <span> -&gt; </span>
        <span>Move right</span>
        <span> &lt;- </span>
        <span>Move left</span>
        <span> x</span>
        <span>shoot</span>
      </div>
      <div className="si_points">
        <OctopusIcon {...svgDims} title="Octopus" />
        <span>10</span>
        <CrabIcon {...svgDims} title="Crab" />
        <span>20</span>
        <SquidIcon {...svgDims} title="Squid" />
        <span>30</span>
        <SaucerIcon {...svgDims} title="Saucer" />
        <span>?</span>
      </div>
      <button onClick={() => createGame()}>Start</button>
    </>
  );
}
