import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BE_SERVER ?? `http://localhost:5500`;
axios.defaults.timeout = 10_000;

export async function getNftData(tokenId: number): Promise<NFTItem> {
  const response = await axios.get(`/getNFTData/${tokenId}`);
  return response.data;
}

export async function getGalleryData(owner: `0x${string}` | undefined): Promise<NFTItem[]> {
  if (!owner) return [];
  const response = await axios.get(`/getNFTGallery/${owner}`);
  return response.data;
}

export async function storeNFTData(data: NFTItem): Promise<NFTItem> {
  const response = await axios.post(`/storeNFTData/`, data);
  return response.data;
}

interface NFTFormProps {
  name: string;
  description: string;
  logoUrl: string;
}

export function useStoreNFTData() {
  return useMutation({
    mutationKey: ['store-nft'],
    mutationFn: storeNFTData
  })
}


export function useGalleryData(owner: `0x${string}` | undefined, enabled: boolean) {
  return useQuery({
    queryKey: ['gallery-data', owner],
    queryFn: () => getGalleryData(owner),
    enabled: enabled
  })
}
