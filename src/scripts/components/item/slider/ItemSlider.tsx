import ItemSliderImg from "./ItemSliderImg.tsx";
import { useState } from "react";
import { ItemSliderArrowRight } from "./ItemSliderArrowRight.tsx";
import { ItemSliderArrowLeft } from "./ItemSliderArrowLeft.tsx";

interface ItemSliderProps {
  images: string[];
}

export default function ItemSlider({ images }: ItemSliderProps) {
  const [index, setIndex] = useState(0);

  const slideToRight = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const slideToLeft = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${index * 100}%)`,
          }}
        >
          {images.length ? (
            images.map((img, ind) => <ItemSliderImg key={ind} img={img} />)
          ) : (
            <ItemSliderImg key={1} img={"./placeholder.jpg"} />
          )}
        </div>
        {images.length > 1 ? (
          <div className="absolute top-[50%] flex w-full translate-y-[-50%] justify-between">
            <ItemSliderArrowLeft onClickEvent={slideToLeft} />
            <ItemSliderArrowRight onClickEvent={slideToRight} />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
