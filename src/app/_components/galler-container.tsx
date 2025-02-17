"use client";

import { useGalleryData } from "@/lib/server";
import { useAccount } from "wagmi";
import NFTGalleryItem from "./gallery-item";

function GalleryContainer () {
  // get the connected account, gallery would only fetch if account is connected
  const account = useAccount();
  const {data: gallery, isLoading} = useGalleryData(
    account.address, account.isConnected);


  // TODO: show a spinning loader when loading .. 

  if(!account.isConnected) 
    return <p 
      className="text-center border border-slate-600 rounded-md bg-slate-600/50
      p-4 text-slate-300">Connect your Wallet to view your NFT Gallery</p>

  if (isLoading || !gallery) return <p>Loading ..</p> 

  return (
    <div>
      { gallery.length > 0 ? 
      <div className="md:grid md:grid-cols-3 gap-8 text-white">
        {gallery.map(item => 
           <NFTGalleryItem item={item} key={item.id} />
        )}
      </div>
      : <p>There is no NFT for you</p>
      }
    </div>
  )
}

export default GalleryContainer;
