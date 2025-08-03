import React from "react";
import { createRoot } from "react-dom/client";
import { removeFailure, throwFailure } from "@lib/state";
import { FailureType } from "@type/states";
import { App } from "./App";

import pkg from "../package.json";

console.clear();
console.log(
  [
    `Created by ${pkg.author.name} / ${pkg.author.url}`,
    `Version ${pkg.version}`,
  ].join("\n")
);

function checkScreenOrientation(event?: MediaQueryListEvent) {
  if (event ? event.matches : window.innerWidth >= window.innerHeight) {
    removeFailure(FailureType.BAD_SCREEN_SIZE);
  } else {
    throwFailure(FailureType.BAD_SCREEN_SIZE);
  }
}

checkScreenOrientation();
window
  .matchMedia("(orientation: landscape)")
  .addEventListener("change", checkScreenOrientation);

// Render the app with providers
const container = document.getElementById("app-root");
if (container) {
  const root = createRoot(container);
  root.render(React.createElement(App));
} else {
  // Fallback to original approach if container doesn't exist
  const { Game } = require('./game');
  const game = new Game();

  if (IS_DEV_MODE) {
    window.GAME = game;
  }
}
