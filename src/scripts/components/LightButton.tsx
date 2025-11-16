interface LightButtonProps {
  text: string;
  className?: string;
  onClickEvent?: () => void;
}

export default function LightButton({
  text,
  className,
  onClickEvent,
}: LightButtonProps) {
  return (
    <button
      onClick={onClickEvent}
      className={`rounded-[6px] bg-bluish px-[10px] py-[5px] text-[16px] text-darker-blue transition-all duration-200 ease-in-out hover:bg-bluish-hover ${className}`}
    >
      {text}
    </button>
  );
}
