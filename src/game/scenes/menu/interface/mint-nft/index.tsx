import React, { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useMutation } from "convex/react";
import { Button } from "@game/scenes/system/interface/button";
import ABI from "@lib/abi.json";
import { api } from "../../../../../../convex/_generated/api";
import { MintContainer, MintButton, MintStatus, MintInfo } from "./styles";

const CONTRACT_ADDRESS = "0xAe467A4CfCe5310C50E2b2A1ad30768A02155fAC" as `0x${string}`;

export const MintNFT: React.FC = () => {
  const { address, isConnected } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [mintError, setMintError] = useState<string | null>(null);

  // Convex mutation to record the mint
  const recordMint = useMutation(api.nfts.recordMint);

  const { config, error: prepareError, isError: isPrepareError } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "mint",
    args: [address],
    enabled: Boolean(address && isConnected),
  });

  const { data, write, error: writeError, isError: isWriteError } = useContractWrite(config);

  const { isLoading: isTransactionLoading, isSuccess, data: receipt } = useWaitForTransaction({
    hash: data?.hash,
  });

  // Record the mint in Convex when transaction is successful
  React.useEffect(() => {
    if (isSuccess && data?.hash && address && receipt) {
      const recordMintInBackend = async () => {
        try {
          // Extract token ID from transaction receipt logs
          const transferLog = receipt.logs?.find(log => 
            log.topics[0] === "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef" // Transfer event signature
          );
          
          let tokenId = 0;
          if (transferLog && transferLog.topics[3]) {
            tokenId = parseInt(transferLog.topics[3], 16);
          }

          await recordMint({
            player_address: address,
            token_id: tokenId,
            transaction_hash: data.hash,
            contract_address: CONTRACT_ADDRESS,
          });

          console.log("Mint recorded in backend successfully");
        } catch (error) {
          console.error("Failed to record mint in backend:", error);
          setMintError("Mint successful but failed to record in backend");
        }
      };

      recordMintInBackend();
      setIsMinting(false);
    }
  }, [isSuccess, data?.hash, address, receipt, recordMint]);

  // Debug logging
  React.useEffect(() => {
    console.log("MintNFT Debug Info:", {
      address,
      isConnected,
      hasConfig: !!config,
      hasWrite: !!write,
      prepareError: prepareError?.message,
      isPrepareError,
      writeError: writeError?.message,
      isWriteError
    });
  }, [address, isConnected, config, write, prepareError, isPrepareError, writeError, isWriteError]);

  const handleMint = async () => {
    if (!write) {
      console.error("Write function not available");
      return;
    }
    
    try {
      setIsMinting(true);
      setMintError(null);
      write();
    } catch (error) {
      console.error("Minting failed:", error);
      setIsMinting(false);
      setMintError("Failed to initiate mint transaction");
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      setIsMinting(false);
    }
  }, [isSuccess]);

  if (!isConnected) {
    return (
      <MintContainer>
        <MintInfo>Connect your wallet to mint Survival NFT</MintInfo>
      </MintContainer>
    );
  }

  return (
    <MintContainer>
      {/* Show debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <MintInfo style={{ color: 'orange', fontSize: '10px' }}>
          Debug: Connected: {isConnected ? 'Yes' : 'No'} | 
          Config: {config ? 'Ready' : 'Not Ready'} | 
          Write: {write ? 'Available' : 'Not Available'}
          {prepareError && <div>Prepare Error: {prepareError.message}</div>}
        </MintInfo>
      )}
      
      <MintButton
        onClick={handleMint}
        disabled={!write || isMinting || isTransactionLoading}
        view={isSuccess ? "confirm" : "primary"}
        size="medium"
      >
        {isTransactionLoading || isMinting ? (
          "Minting..."
        ) : isSuccess ? (
          "✅ NFT Minted!"
        ) : !write ? (
          "Preparing..."
        ) : (
          "Mint Survival NFT"
        )}
      </MintButton>
      
      {isPrepareError && prepareError && (
        <MintInfo style={{ color: 'red' }}>
          Error: {prepareError.message}
        </MintInfo>
      )}

      {mintError && (
        <MintInfo style={{ color: 'orange' }}>
          {mintError}
        </MintInfo>
      )}
      
      {isSuccess && (
        <MintStatus>
          🎉 Successfully minted your Survival NFT!
        </MintStatus>
      )}
      
      {data?.hash && (
        <MintInfo>
          <a 
            href={`https://testnet-explorer.etherlink.com/tx/${data.hash}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            View transaction
          </a>
        </MintInfo>
      )}
    </MintContainer>
  );
};