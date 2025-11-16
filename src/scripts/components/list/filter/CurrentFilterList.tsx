import CurrentFilterElem from "./CurrentFilterElem.tsx";

interface CurrentFilterListProps {
  elements: { name: string }[];
}

function CurrentFilterList({ elements }: CurrentFilterListProps) {
  return (
    <div>
      <ul className="flex gap-[10px]">
        {elements.map((elem, index) => (
          <CurrentFilterElem key={index} name={elem.name} />
        ))}
      </ul>
    </div>
  );
}

export default CurrentFilterList;
