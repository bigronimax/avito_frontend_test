import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface CurrentFilterElemProps {
  name: string;
}

function CurrentFilterElem({ name }: CurrentFilterElemProps) {
  return (
    <li className="bg-gray-border flex cursor-pointer items-center gap-[10px] px-[10px] py-[8px]">
      <span className="text-black-text">{name}</span>
      <div className="flex h-[16px] w-[16px] items-center justify-center border-[1.5px] transition-all duration-200 ease-in-out hover:text-black-text">
        <FontAwesomeIcon icon={faXmark} />
      </div>
    </li>
  );
}

export default CurrentFilterElem;
