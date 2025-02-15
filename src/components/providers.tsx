"use client";

import {getDefaultConfig, RainbowKitProvider} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { sepolia } from "wagmi/chains";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: 'Mintly',
  projectId: '8641a3c75b5e6880c34ba6f11d04e1dc',
  chains: [ sepolia ],
  ssr: true,
});

const queryClient = new QueryClient();

function Providers ({children}: {children: React.ReactNode}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Providers;
