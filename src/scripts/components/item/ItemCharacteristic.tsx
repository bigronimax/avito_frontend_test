interface ItemCharacteristicProps {
  label: string;
  content: string;
}

function ItemCharacteristic({ label, content }: ItemCharacteristicProps) {
  return (
    <div className="flex gap-[10px]">
      <div className="text-grey">
        <span>{label}:</span>
      </div>
      <div>
        <span>{content}</span>
      </div>
    </div>
  );
}

export default ItemCharacteristic;
