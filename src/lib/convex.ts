import { ConvexReactClient } from "convex/react";

// const convexUrl = process.env.VITE_CONVEX_URL || process.env.CONVEX_URL;

const convexUrl ="https://laudable-dolphin-198.convex.cloud"

if (!convexUrl) {
  throw new Error("Missing CONVEX_URL environment variable");
}

export const convex = new ConvexReactClient(convexUrl);