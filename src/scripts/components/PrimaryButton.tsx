interface PrimaryButtonProps {
  text: string;
  className?: string;
  onClickEvent?: () => void;
}

export default function PrimaryButton({
  text,
  className,
  onClickEvent,
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClickEvent}
      className={`${className} flex items-center justify-center rounded-[6px] bg-darker-blue px-[28px] py-[10px] text-[16px] font-medium text-white transition-all hover:bg-blue-hover disabled:cursor-default`}
    >
      {text}
    </button>
  );
}
