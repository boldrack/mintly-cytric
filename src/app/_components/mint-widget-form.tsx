import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Box, LoaderIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface MintWidgetFormProps {
  handleSubmit: (name: string, descriptino: string, logoUrl: string) => void;
  connected: boolean;
  loading: boolean;
  disabled: boolean;
}
function MintWidgetForm ({handleSubmit, connected, loading, disabled}: MintWidgetFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  return (
    <div className="fields flex flex-col gap-6   mt-8">
      <div className="field space-y-1.5">
        <Label className="text-xs">NFT Name</Label>
        <Input 
          placeholder="Enter NFT Name" 
          className="text-xs bg-[#1F2937] border border-[#374151]"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="field space-y-1.5 ">
        <Label className="text-xs ">Description</Label>
        <Textarea placeholder="Describe your NFT" 
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="bg-[#1F2937] border border-[#374151]"
        />
      </div>

      <div className="field space-y-1.5">
        <Label className="text-xs">Image URL</Label>
        <Input placeholder="Enter image URL" 
          value={logoUrl}
          onChange={e => setLogoUrl(e.target.value)}
          className="bg-[#1F2937] text-xs border border-[#374151]"
        />
      </div>

      <Button onClick={() => handleSubmit(name, description, logoUrl)}
        disabled={!connected || disabled}
        className="bg-gradientbtn"

      >
        {loading ? <LoaderIcon className="animate-spin" /> : <Box /> }
        <span className="text-xs font-bold">
          {connected ? 'Mint NFT' : 'Connect Wallet to Mint NFT'}
        </span>
      </Button>
    </div>
  )
}

export default MintWidgetForm;
