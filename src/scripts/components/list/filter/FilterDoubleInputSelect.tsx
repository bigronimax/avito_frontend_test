import FilterDoubleInput from "./FilterDoubleInput.tsx";
import { useRef } from "react";

interface FilterDoubleInputSelectProps {
  id: string;
  text: string;
  className?: string;
  type: string;
  name: string;
  activeSelect: string | null;
  setActiveSelect: (id: string | null) => void;
  minValue?: number;
  maxValue?: number;
  setMinValue: (value: number | undefined) => void;
  setMaxValue: (value: number | undefined) => void;
}

function FilterDoubleInputSelect({
  id,
  text,
  className,
  type,
  name,
  activeSelect,
  setActiveSelect,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
}: FilterDoubleInputSelectProps) {
  const selectRef = useRef<HTMLButtonElement>(null);
  const isActive = activeSelect === id;

  const toggleSelect = () => {
    setActiveSelect(isActive ? null : id);
  };

  return (
    <div className="relative max-w-[200px] flex-none basis-[200px]">
      <button
        ref={selectRef}
        onClick={toggleSelect}
        className={`filter-arrow relative h-[3em] w-[100%] whitespace-nowrap border border-r border-solid border-light-grey bg-white py-[10px] pl-[20px] text-left text-black-text outline-none transition-all hover:text-blue ${className}`}
      >
        {text}
      </button>
      <div
        className={`absolute left-0 z-[1005] mt-[10px] min-w-[300px] rounded-[6px] bg-white p-[16px] shadow-md ${isActive ? "block" : "hidden"}`}
      >
        <FilterDoubleInput
          id={id}
          type={type}
          name={name}
          minValue={minValue}
          maxValue={maxValue}
          setMinValue={setMinValue}
          setMaxValue={setMaxValue}
          activeSelect={activeSelect}
          setActiveSelect={setActiveSelect}
          selectRef={selectRef}
        />
      </div>
    </div>
  );
}

export default FilterDoubleInputSelect;
