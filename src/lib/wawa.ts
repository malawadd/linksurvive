// @ts-nocheck
import { useQuery } from "convex/react";
import { useQuery as useWagmiQuery } from "wagmi";
import { FactionId, PetId, Tier, Swatch, Metadata, Wawa } from "@type/wawa";
import { api } from "../../convex/_generated/api";
import { client } from "./wagmi";

const wawaNftAddress = "0xAe467A4CfCe5310C50E2b2A1ad30768A02155fAC" as const;

const wawaNftABI = [
  {
    inputs: [{ internalType: "uint256", name: "tokenId", type: "uint256" }],
    name: "getAeonInfo",
    outputs: [
      {
        components: [
          {
            components: [
              { internalType: "string", name: "headwear", type: "string" },
              { internalType: "string", name: "eyes", type: "string" },
              { internalType: "string", name: "chest", type: "string" },
              { internalType: "string", name: "legs", type: "string" },
              { internalType: "string", name: "bodySwatch", type: "string" },
              { internalType: "string", name: "headwearSwatch", type: "string" },
              { internalType: "string", name: "eyesSwatch", type: "string" },
              { internalType: "string", name: "chestSwatch", type: "string" },
              { internalType: "string", name: "legsSwatch", type: "string" },
              { internalType: "string", name: "petSwatch", type: "string" }
            ],
            internalType: "struct AeonNFT.Trait",
            name: "trait",
            type: "tuple",
          },
          { internalType: "string", name: "tokenURI", type: "string" },
          { internalType: "enum AeonNFT.Faction", name: "faction", type: "uint8" },
          { internalType: "uint8", name: "petId", type: "uint8" },
          { internalType: "bytes32", name: "gene", type: "bytes32" },
        ],
        internalType: "struct AeonNFT.Aeon",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export async function getMetadata(tokenURI: string): Promise<Metadata> {
  console.log("query metadata")
  const metadata = (await (await fetch("https://bafkreidrxvhsldtk6j5f3gfwstoiuwzo35y2mdtvoqkllzzko3fjfmtxb4.ipfs.nftstorage.link")).json()) as {
    name: string;
    description: string;
    attributes: { trait_type: string; value: string | string[] }[];
    properties: { files: { uri: string; type: string }[]; category: string };
    image: string;
  };
  console.log("return metadata", metadata)
  return {
    name: metadata.name,
    image: {
      x1: metadata.properties.files[2].uri,
      x10: metadata.properties.files[1].uri,
      x10bg: metadata.properties.files[0].uri,
    },
    swatches: {
      body: metadata.attributes[6].value as Swatch,
      headwear: metadata.attributes[7].value as Swatch,
      eyes: metadata.attributes[8].value as Swatch,
      chest: metadata.attributes[9].value as Swatch,
      legs: metadata.attributes[10].value as Swatch,
      pet: metadata.attributes[11].value as Swatch,
    },
    gene: metadata.attributes[12].value as `0x${string}}`,
  };
}

export async function getWawa(tokenId: number): Promise<Wawa> {
  console.log("query getWawa")
  console.log("query tokenId", tokenId)
  const res = await client.readContract({
    address: wawaNftAddress,
    abi: wawaNftABI,
    functionName: "getAeonInfo",
    args: [BigInt(tokenId)],
  });
  console.log("accountData", res)
  return {
    tokenId,
    factionId: res.faction as FactionId,
    petId: res.petId as PetId,
    tiers: {
      headwear: res.trait.headwear as Tier,
      eyes: res.trait.eyes as Tier,
      chest: res.trait.chest as Tier,
      legs: res.trait.legs as Tier,
    },
    ...(await getMetadata(res.tokenURI)),
  };
}

// Updated to use Convex backend instead of blockchain logs
export const useOwnedWawas = (address?: `0x${string}`) => {
  console.log("query useOwnedWawas from Convex backend")
  
  // Query NFTs from Convex backend
  const playerNFTs = useQuery(
    api.nfts.getPlayerNFTs,
    address ? { player_address: address } : "skip"
  );

  // Use Wagmi's useQuery to fetch the Wawa data when we have NFTs
  const { data, isFetched } = useWagmiQuery(
    ["owned-wawas-from-backend", address, playerNFTs?.length],
    async () => {
      if (!address || !playerNFTs || playerNFTs.length === 0) return [];
      
      console.log("Fetching Wawa data for NFTs:", playerNFTs);
      
      // Convert backend NFT data to Wawa format
      const wawas = await Promise.all(
        playerNFTs.map(async (nft) => {
          try {
            return await getWawa(nft.tokenId);
          } catch (error) {
            console.error(`Failed to get Wawa data for token ${nft.tokenId}:`, error);
            return null;
          }
        })
      );
      
      // Filter out any failed requests
      return wawas.filter((wawa): wawa is Wawa => wawa !== null);
    },
    { 
      enabled: Boolean(address && playerNFTs),
      staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    }
  );

  return { 
    data: data || [], 
    isFetched: isFetched && playerNFTs !== undefined 
  };
};

// Helper function to check if user has minted any NFTs
export const useHasMintedNFT = (address?: `0x${string}`) => {
  const hasMinted = useQuery(
    api.nfts.hasPlayerMintedNFT,
    address ? { player_address: address } : "skip"
  );
  
  return hasMinted;
};

// Helper function to get user's latest NFT
export const useLatestNFT = (address?: `0x${string}`) => {
  const latestNFT = useQuery(
    api.nfts.getPlayerLatestNFT,
    address ? { player_address: address } : "skip"
  );
  
  return latestNFT;
};
