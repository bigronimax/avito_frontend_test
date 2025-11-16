import { useState, useEffect, useRef } from "react";
import FilterCheckListElem from "./FilterCheckListElem.tsx";
import useClickOutside from "../../../hooks/useClickOutside.ts";

interface FilterCheckListProps {
  id?: string;
  elements: { name: string }[];
  selectedItems: string[];
  selectRef?: React.RefObject<HTMLElement | null>;
  onChangeSelected?: (selected: string[]) => void;
  activeSelect?: string | null;
  setActiveSelect?: (id: string | null) => void;
  multiSelect?: boolean;
}

function FilterCheckList({
  id,
  elements,
  selectedItems,
  selectRef,
  onChangeSelected,
  activeSelect,
  setActiveSelect,
  multiSelect = true,
}: FilterCheckListProps) {
  const [checked, setChecked] = useState<boolean[]>(
    elements.map((elem) => selectedItems.includes(elem.name)),
  );

  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(
    ref,
    () => setActiveSelect?.("0"),
    selectRef ?? null,
    activeSelect !== undefined && id !== undefined && activeSelect === id,
  );

  useEffect(() => {
    setChecked(elements.map((elem) => selectedItems.includes(elem.name)));
  }, [selectedItems, elements]);

  const handleToggle = (index: number) => {
    let newState: boolean[];

    if (multiSelect) {
      newState = [...checked];
      newState[index] = !newState[index];
    } else {
      newState = Array(elements.length).fill(false);
      newState[index] = !checked[index];
    }

    setChecked(newState);

    if (onChangeSelected) {
      const selected = elements
        .filter((_, i) => newState[i])
        .map((elem) => elem.name);
      onChangeSelected(selected);
    }
  };

  return (
    <div ref={ref}>
      <ul className="relative flex flex-col gap-[10px]">
        {elements.map((elem, index) => (
          <FilterCheckListElem
            key={index}
            name={elem.name}
            isChecked={checked[index]}
            onToggle={() => handleToggle(index)}
          />
        ))}
      </ul>
    </div>
  );
}

export default FilterCheckList;
