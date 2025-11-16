import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";

export interface FilterCheckListElemProps {
  name: string;
  isChecked: boolean;
  onToggle: () => void;
}

function FilterCheckListElem({
  name,
  isChecked,
  onToggle,
}: FilterCheckListElemProps) {
  return (
    <li
      onClick={onToggle}
      className="flex cursor-pointer items-center gap-[10px] rounded-[6px] px-[15px] py-[10px] transition-all hover:bg-grey-2"
    >
      <div
        className={`flex h-[16px] w-[16px] items-center justify-center rounded-[4px] border-[1.5px] border-solid ${isChecked ? "border-blue bg-blue" : "border-grey"}`}
      >
        <FontAwesomeIcon
          icon={faCheck}
          className={`text-[11px] transition-all duration-100 ease-in-out ${isChecked ? "scale-1 text-white" : "scale-0"}`}
        />
      </div>
      <span>{name}</span>
    </li>
  );
}

export default FilterCheckListElem;
