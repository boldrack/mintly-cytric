"use client";

import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { WalletIcon } from "lucide-react";

function MintlyConnectButton () {
  return (
    <ConnectButton.Custom>
      {({
        account, 
        chain, 
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected = ready && account && chain && (
          !authenticationStatus || authenticationStatus === 'authenticated'
        )
        return (
          <div>
            { ( () => {
              if (!connected)
                return ( <Button onClick={openConnectModal} className="bg-gradientbtn">
                          <WalletIcon /> Connect Wallet
                        </Button> )

              if (chain.unsupported)
                return <Button onClick={openChainModal}>Wrong Network</Button>

              return <Button className="bg-gradientbtn w-48" onClick={openAccountModal}>
                {account.displayName}</Button>
            })()}  {/** IIFE **/}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export default MintlyConnectButton;
