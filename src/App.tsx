import React from "react";
import { AppProviders } from "./AppProviders";
import { Game } from "./game";

// Create a wrapper component for the game
const GameWrapper: React.FC = () => {
  React.useEffect(() => {
    const game = new Game();
    
    if (IS_DEV_MODE) {
      window.GAME = game;
    }

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div id="game-container" />;
};

// Main App component with providers
export const App: React.FC = () => {
  return (
    <AppProviders>
      <GameWrapper />
    </AppProviders>
  );
};