import React from "react";
import { WagmiConfig } from "wagmi";
import { ConnectKitProvider } from "connectkit";
import { ConvexProvider } from "@convex-dev/react";
import { wagmiConfig } from "@lib/wagmi";
import { convex } from "@lib/convex";

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
