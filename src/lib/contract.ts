export const MINT_CONTRACT_ADDRESS = '0x743f49311a82fe72eb474c44e78da2a6e0ae951c' as const; 

export const ContractConfig = {
    address: MINT_CONTRACT_ADDRESS,
    abi: [ 
      {
        name:"checkId",
        type: "function",
        stateMutability:"view",
        inputs: [{name: "tokenId",type:"uint256"}],
        outputs: [{name:"", type: "bool"}]
      },
      {
        name:"mint",
        type: "function",
        stateMutability:"nonpayable",
        inputs: [{name:"tokenId", type:"uint256"}, {name:"metadataUrl", type:"string"}],
        outputs: [{name:"", type: "string"}]
      },
    ],
}

