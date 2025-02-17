import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

console.log('BE SERVER: ', process.env.NEXT_PUBLIC_BE_SERVER);

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BE_SERVER;
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

export function invalidateGallery(client: QueryClient, owner: string) {
  client.invalidateQueries({
    queryKey: ['gallery-data', owner]
  });
}
