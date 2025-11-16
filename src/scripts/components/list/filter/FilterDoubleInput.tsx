import ClearInput from "./ClearInput.tsx";
import { useRef } from "react";
import useClickOutside from "../../../hooks/useClickOutside.ts";

interface FilterDoubleInputProps {
  id?: string;
  type: string;
  name: string;
  minValue?: number;
  maxValue?: number;
  setMinValue: (value: number | undefined) => void;
  setMaxValue: (value: number | undefined) => void;
  activeSelect?: string | null;
  setActiveSelect?: (id: string | null) => void;
  selectRef?: React.RefObject<HTMLElement | null>;
}

function FilterDoubleInput({
  id,
  type,
  name,
  minValue,
  maxValue,
  setMinValue,
  setMaxValue,
  selectRef,
  activeSelect,
  setActiveSelect,
}: FilterDoubleInputProps) {
  const MAX_SAFE = Number.MAX_SAFE_INTEGER;

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(
    ref,
    () => setActiveSelect?.("0"),
    selectRef ?? null,
    activeSelect !== undefined && id !== undefined && activeSelect === id,
  );

  const handleMinChange = (value: string) => {
    if (value === "") {
      setMinValue(undefined);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue <= MAX_SAFE) {
        setMinValue(numValue);
      }
    }
  };

  const handleMaxChange = (value: string) => {
    if (value === "") {
      setMaxValue(undefined);
    } else {
      const numValue = Number(value);
      if (!isNaN(numValue) && numValue <= MAX_SAFE) {
        setMaxValue(numValue);
      }
    }
  };

  const handleMinClear = () => {
    setMinValue(undefined);
  };

  const handleMaxClear = () => {
    setMaxValue(undefined);
  };

  return (
    <div ref={ref} className="w-[100%]">
      <div className="flex w-[100%] justify-between gap-[20px]">
        <div className="w-[100%]">
          <ClearInput
            type={type}
            name={name}
            placeholder={"От"}
            value={minValue ?? ""}
            onChange={(event) => handleMinChange(event.target.value)}
            onClear={handleMinClear}
          />
          <div className="input-error error"></div>
        </div>
        <div className="w-[100%]">
          <ClearInput
            type={type}
            name={name}
            placeholder={"До"}
            value={maxValue ?? ""}
            onChange={(event) => handleMaxChange(event.target.value)}
            onClear={handleMaxClear}
          />
          <div className="input-error error"></div>
        </div>
      </div>
    </div>
  );
}

export default FilterDoubleInput;
