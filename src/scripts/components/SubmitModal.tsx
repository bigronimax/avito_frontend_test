import PrimaryButton from "./PrimaryButton";
import RedButton from "./RedButton";

interface SubmitModalProps {
  title: string;
  submitButtonText: string;
  denyButtonText: string;
  onSubmitClick: () => void;
  onDenyClick: () => void;
}

function SubmitModal({
  title,
  submitButtonText,
  denyButtonText,
  onSubmitClick,
  onDenyClick,
}: SubmitModalProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-[20px]">
      <h3 className="text-center text-[22px] font-semibold">{title}</h3>
      <div className="flex w-full justify-between">
        <PrimaryButton text={submitButtonText} onClickEvent={onSubmitClick} />
        <RedButton text={denyButtonText} onClickEvent={onDenyClick} />
      </div>
    </div>
  );
}

export default SubmitModal;
