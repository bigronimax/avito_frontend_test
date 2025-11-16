interface ItemSliderImgProps {
  img: string;
}

export default function ItemSliderImg({ img }: ItemSliderImgProps) {
  return (
    <div className="h-full flex-none basis-full">
      <img src={img} className="h-full w-full object-cover" />
    </div>
  );
}
