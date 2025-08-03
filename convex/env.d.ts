// Environment variables for Convex
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MINT_PRIVATE_KEY: string;
      REWARD_TOKEN_ADDRESS: string;
    }
  }
}

export {};