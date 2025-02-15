import '@rainbow-me/rainbowkit/styles.css';
import { Button } from "@/components/ui/button"
import { PlayIcon, RocketIcon, WalletIcon } from "lucide-react"
import Image from "next/image"

import MintWidget from "./_components/mint-widget";
import MintlyConnectButton from './_components/connect-button';
import GalleryContainer from './_components/galler-container';


function Home() {
  return (
    <div className="home min-h-screen" style={{background: "linear-gradient(90deg, #000000 0%, #111827 100%);"}}>
      <nav className="border border-[#1F2937] py-4 px-16 flex justify-between items-center">
        <div className="flex gap-4">
          <Image src={`/logo.png`} alt="Logo" width={20} height={20} />
          <span className="text-white">NFT Mint</span>
        </div>
        <div className="connect">
        {/**<Button> <WalletIcon className="size-6"/> Connect Wallet</Button>**/}
        <MintlyConnectButton />
        </div>
      </nav>
      <section className="text-white flex flex-col items-center my-12 gap-6">
        <h4 className="text-[48px] leading-[60px] font-bold">
          Discover &amp; Collect <br/>Extraordinary NFTs
        </h4>
        <p className="text-sm">Enter the world of digital art and collectibles, Explore unique NFTs created
        by artists worldwide</p>
        <div className="actions flex gap-4">
          <Button className="bg-gradientbtn"><RocketIcon />Start Creating</Button>
          <Button className="border border-[#374151] text-white">
            <PlayIcon /> Watch Demo
          </Button>
        </div>
      </section>

      <section className="flex justify-center">
        <div className="min-w-[500px]">
          <MintWidget />
        </div>
      </section>

      <section className="text-white py-24 px-20">
        <h4 className="font-bold mb-10">Your NFT Gallery</h4>
        <GalleryContainer />
      </section>
    </div>
  )
}

export default Home;
