import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

interface ItemSliderArrowLeftProps {
  className?: string;
  onClickEvent?: () => void;
}

export function ItemSliderArrowLeft({
  className,
  onClickEvent,
}: ItemSliderArrowLeftProps) {
  return (
    <button className={className} onClick={onClickEvent}>
      <div className="z-10 flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-black/35 p-2 text-[24px] font-normal text-white transition duration-200 hover:bg-black/20">
        <FontAwesomeIcon icon={faChevronLeft} />
      </div>
    </button>
  );
}
