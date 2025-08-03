import { ConvexReactClient } from "@convex-dev/react";

const convexUrl = process.env.VITE_CONVEX_URL || process.env.CONVEX_URL;

if (!convexUrl) {
  throw new Error("Missing CONVEX_URL environment variable");
}

export const convex = new ConvexReactClient(convexUrl);