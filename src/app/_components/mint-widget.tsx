"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { useWriteContract, useConfig, useAccount } from "wagmi";
import { ContractConfig } from "@/lib/contract";
import MintWidgetForm from "./mint-widget-form";
import { useState } from "react";
import { readContract, waitForTransactionReceipt} from "@wagmi/core";
import { useStoreNFTData } from "@/lib/server";
import MintSuccessCard from "./mint-success-card";

function MintWidget () {

  const account = useAccount();
  const wagmiConfig = useConfig();
  const { writeContractAsync } = useWriteContract();

  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [lastCreated, setLastCreated] = useState<NFTItem | null>(null);
  const [lastError, setLastError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const storeNFTData = useStoreNFTData();

  const _handleCreate = async (name: string, description: string, logo: string) => {
    console.log('creating .. ', name, description, logo) // start loading 

    if(name.length === 0 || description.length == 0 || logo.length == 0)
      return

    if(!account.address) return // return early if we're connected. Failsafe
    
    setLoading(true);

    const generatedTokenId = _generateTokenId();
    //
    // we loop until we get a valid number
    while (1) {
      console.log('generated number', generatedTokenId);
      const exists = await _checkTokenId(generatedTokenId);
      console.log('exists: ', exists);
      if (exists) continue;
      break;
    }

    // Handle fail state
     await storeNFTData.mutateAsync({
      id: String(generatedTokenId), name, description, logo, owner: account.address}, {
        onSuccess: (data) => {
          setLastCreated(data);
        },
        onError: (error) => setLastError(error),
      });


    const mintHash = await _mintToken(generatedTokenId, resolveTokenURI(generatedTokenId));

    await waitForTransactionReceipt(wagmiConfig, { hash: mintHash });

    setShowSuccessCard(true);
    setLoading(false);
  }
  
  const resolveTokenURI = (tokenId: number) => {
    return `http://localhost:5500/getNFTGallery${tokenId}`;
  }

  const _generateTokenId = () => {
    return Math.floor(Math.random() * (10_000 - 1_000)) + 1_000;
  }

  const _mintToken = async (tokenId: number, tokenURI: string) => {
    return writeContractAsync({
      ...ContractConfig,
      functionName: 'mint', // checkId(uint256 tokenId) 
      args: [ tokenId, tokenURI ]
    });
  }


  const _checkTokenId = async (tokenId: number) => {
    const exists = await readContract(wagmiConfig, {
      ...ContractConfig, functionName: 'checkId', args: [ tokenId ],
    });
    console.log('_checkTokenId: ', exists)
    return exists;
  }

  const _createAnother = () => {
    setShowSuccessCard(false);
  }

  //
  return (
    <div className="mt-16">
      {showSuccessCard && lastCreated ?
      <MintSuccessCard data={lastCreated} handleCreateAnother={_createAnother} />  : 
      <Card className="border border-[#1F2937] p-8 bg-[#111827] text-white">
        <CardContent>
          <CardTitle> Mint Your NFT</CardTitle>
          <MintWidgetForm handleSubmit={_handleCreate} 
            connected={account.isConnected} loading={loading} disabled={loading} />
            {lastError ? 
              <div className="w-full border border-red-500/50 p-4 text-xs mt-4">
                <span>Error Occured</span>
                <span>{(lastError as Error)?.message}</span>
              </div> : null }
        </CardContent>
      </Card>
      }
    </div>
  )
}

export default MintWidget;
