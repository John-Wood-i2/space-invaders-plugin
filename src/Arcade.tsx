import { useState } from "react";
import "./Arcade.css";
import SpaceInvaders from "./SpaceInvaders";

type ArcadeSelector = "none" | "space-invaders";

export default function Arcade() {
  const [game, setGame] = useState<ArcadeSelector>("none");

  return (
    <div className="arcade">
      {game === "none" && <WelcomeScreen setGame={setGame} />}
      {game === "space-invaders" && (
        <SpaceInvaders return={() => setGame("none")} />
      )}
    </div>
  );
}

interface IWelcomeScreenProps {
  setGame: (game: ArcadeSelector) => void;
}

const WelcomeScreen = ({ setGame }: IWelcomeScreenProps) => (
  // TODO I18N
  <>
    <header className="arcade-header">Welcome</header>
    <div className="arcade-text">What shall</div>
    <div className="arcade-text">we play?</div>
    <div className="arcade-games">
      <button
        className="arcade-button"
        onClick={() => setGame("space-invaders")}
      >
        Space Invaders
      </button>
    </div>
  </>
);
