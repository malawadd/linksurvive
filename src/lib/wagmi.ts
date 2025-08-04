import "wagmi/window";
import { createConfig, Chain  } from "wagmi";
import { createPublicClient, http } from "viem";
import { getDefaultConfig } from "connectkit";

const alchemyId = process.env.ALCHEMY_API_KEY;
const alchemyPolygonId = process.env.ALCHEMY_POLYGON_API_KEY;
const walletConnectProjectID = "6c37429d912cb97065107c0f849bc879";

// Define Etherlink Testnet chain
const etherlinkTestnet: Chain = {
  id: 128123,
  name: 'Etherlink Testnet',
  network: 'etherlink-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Tezos',
    symbol: 'XTZ',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.ankr.com/etherlink_testnet'],
    },
    public: {
      http: ['https://rpc.ankr.com/etherlink_testnet'],
    },
  },
  blockExplorers: {
    default: { 
      name: 'Etherlink Explorer', 
      url: 'https://testnet-explorer.etherlink.com' 
    },
  },
  testnet: true,
};

const wagmiConfig = createConfig(
  getDefaultConfig({
    alchemyId,
    walletConnectProjectId: walletConnectProjectID,
    appName: "Survival",
    appDescription: "Isometric game. Build and Defence in the onchain crypto world",
    appUrl: "https://aeons-woad.vercel.app/",
    appIcon: "https://aeons-woad.vercel.app/assets/logotype.png",
    chains: [etherlinkTestnet]
    
  }),
);

const client = createPublicClient({
  chain: etherlinkTestnet,
  transport: http("https://rpc.ankr.com/etherlink_testnet")
});

const polygonClient = createPublicClient({
  chain: etherlinkTestnet,
  transport: http("https://rpc.ankr.com/etherlink_testnet")
})

export { client, polygonClient, wagmiConfig, etherlinkTestnet };
