

interface NFTGalleryItemProps {
  item: NFTItem;
}

function NFTGalleryItem ({item}: NFTGalleryItemProps) {
  const {logo, name, description} = item;
  return (
    <div className="flex flex-col border border-[#1F2937] rounded-xl w-[200px] h-[200px]" >
      <div className="grow relative">
        <img src={logo} alt="" />
      </div>
      <div className="flex flex-col gap-2 h-[70px] border border-[#1F2937] w-full 
        text-white px-4 py-2">
        <span className="font-normal text-sm">{name}</span>
        <span className="text-slate-300 text-xs">{description}</span>
      </div>
    </div>
  )
}

export default NFTGalleryItem;
