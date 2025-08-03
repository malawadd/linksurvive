import "wagmi/window";
import { createConfig, Chain  } from "wagmi";
import { createPublicClient, http } from "viem";
import { opBNBTestnet, polygon } from "viem/chains";
import { getDefaultConfig } from "connectkit";

const alchemyId = process.env.ALCHEMY_API_KEY;
const alchemyPolygonId = process.env.ALCHEMY_POLYGON_API_KEY;
const walletConnectProjectID = "6c37429d912cb97065107c0f849bc879";


const wagmiConfig = createConfig(
  getDefaultConfig({
    alchemyId,
    walletConnectProjectId: walletConnectProjectID,
    appName: "Survival",
    appDescription: "Isometric game. Build and Defence in the onchain crypto world",
    appUrl: "https://aeons-woad.vercel.app/",
    appIcon: "https://aeons-woad.vercel.app/assets/logotype.png",
    chains: [opBNBTestnet]
    
  }),
);

const client = createPublicClient({
  chain: opBNBTestnet,
  transport: http("https://opbnb-testnet-rpc.bnbchain.org")
});

const polygonClient = createPublicClient({
  chain: opBNBTestnet,
  transport: http("https://opbnb-testnet-rpc.bnbchain.org")
})

export { client, polygonClient, wagmiConfig };
