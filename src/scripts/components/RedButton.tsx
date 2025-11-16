interface RedButtonProps {
  text: string;
  className?: string;
  onClickEvent?: () => void;
}

export default function RedButton({
  text,
  className,
  onClickEvent,
}: RedButtonProps) {
  return (
    <button
      className={`rounded-[6px] bg-milk px-[20px] py-[10px] text-red ${className}`}
      onClick={onClickEvent}
    >
      {text}
    </button>
  );
}
