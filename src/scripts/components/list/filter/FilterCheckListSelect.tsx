import FilterCheckList from "./FilterCheckList.tsx";
import { useRef } from "react";

interface FilterCheckListSelectProps {
  id: string;
  className?: string;
  elements: { name: string }[];
  text: string;
  activeSelect: string | null;
  setActiveSelect: (id: string | null) => void;
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  multiSelect?: boolean;
}

function FilterCheckListSelect({
  id,
  className,
  elements,
  text,
  activeSelect,
  setActiveSelect,
  selectedItems,
  setSelectedItems,
  multiSelect = true,
}: FilterCheckListSelectProps) {
  const selectRef = useRef<HTMLButtonElement>(null);
  const isActive = activeSelect === id;

  const toggleSelect = () => {
    setActiveSelect(isActive ? null : id);
  };

  const handleSelectedChange = (names: string[]) => {
    setSelectedItems(names);
  };

  const displayText =
    selectedItems.length > 0 ? selectedItems.join(", ") : text;

  return (
    <div className="relative max-w-[200px] flex-none basis-[200px]">
      <button
        ref={selectRef}
        onClick={toggleSelect}
        className={`filter-arrow relative h-[3em] w-[100%] whitespace-nowrap border border-r border-solid border-light-grey bg-white py-[10px] pl-[20px] text-left text-black-text outline-none transition-all hover:text-blue ${className}`}
      >
        <span className="block overflow-hidden text-ellipsis whitespace-nowrap pr-[1.5em]">
          {displayText}
        </span>
      </button>
      <div
        className={`absolute left-0 z-[1005] mt-[10px] min-w-[300px] rounded-[6px] bg-white p-[16px] shadow-md ${isActive ? "block" : "hidden"}`}
      >
        <FilterCheckList
          id={id}
          elements={elements}
          onChangeSelected={handleSelectedChange}
          selectRef={selectRef}
          activeSelect={activeSelect}
          setActiveSelect={setActiveSelect}
          selectedItems={selectedItems}
          multiSelect={multiSelect}
        />
      </div>
    </div>
  );
}

export default FilterCheckListSelect;
