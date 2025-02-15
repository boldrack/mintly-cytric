import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckIcon, ShareIcon, WalletIcon } from "lucide-react";

interface MintSuccessCardProps {
  data: NFTItem;
  handleCreateAnother: () => void;
}

function MintSuccessCard ({data, handleCreateAnother}: MintSuccessCardProps) {
  const {name, description, logo, id} = data;
  return (
    <div className="p-8 border-[0.5px] border-[#10B981] rounded-lg max-w-[400px] mx-auto bg-[#111827]/50">
      <div className="flex flex-col items-center gap-3">
        <div className=" size-12 rounded-full bg-[#10B981]/20 flex justify-center items-center">
          <CheckIcon className="size-8 text-[#10B981]"/>
        </div>
        <h4 className="text-green-500 font-bold">NFT Minted Successfully</h4>
        <span className="text-slate-500 text-xs">
          Your NFT has been created and added to your collection
        </span>
      </div>

      <div className="mt-8">
        <div className="h-40 w-full relative w-full grow">
          <img src={logo}  className="w-full h-full"/>
        </div>

        <div className="max-h-[200px] my-6 space-y-2 text-white [&_label]:text-xs [&_label]:text-slate-500">
          <div className="flex flex-col">
            <Label>NFT Name</Label>
            <span>{name}</span>
          </div>

          <div className="flex flex-col">
            <Label>Description </Label>
            <span>{description}</span>
          </div>

          <div className="flex flex-col">
            <Label>NFT ID</Label>
            <span>{id}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 [&_button]:text-xs">
        <Button className="w-full bg-slate-700"><ShareIcon /> Share</Button>
        <Button className="w-full bg-gradientbtn" onClick={handleCreateAnother}>
          <WalletIcon /> Mint Another
        </Button>
      </div>
    </div>
  )
}

export default MintSuccessCard;
