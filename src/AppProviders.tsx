import React from "react";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { ConvexProvider } from "convex/react";
import { wagmiConfig } from "@lib/wagmi";
import { convex } from "@lib/convex";

interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ConvexProvider client={convex}>
      <WagmiConfig config={wagmiConfig}>
        <ConnectKitProvider>
          {children}
        </ConnectKitProvider>
      </WagmiConfig>
    </ConvexProvider>
  );
};