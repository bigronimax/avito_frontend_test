import Input from "./Input";
import FilterCheckList from "./list/filter/FilterCheckList";
import PrimaryButton from "./PrimaryButton";
import RedButton from "./RedButton";
import { useState } from "react";

interface ReasonModalProps {
  title: string;
  submitButtonText: string;
  denyButtonText: string;
  onSubmitClick: (reason: string, comment: string) => void;
  onDenyClick: () => void;
}

const reasons = [
  { name: "Запрещенный товар" },
  { name: "Неверная категория" },
  { name: "Некорректное описание" },
  { name: "Проблемы с фото" },
  { name: "Подозрение на мошенничество" },
  { name: "Другое" },
];

function ReasonModal({
  title,
  submitButtonText,
  denyButtonText,
  onSubmitClick,
  onDenyClick,
}: ReasonModalProps) {
  const [selectedReason, setSelectedReason] = useState<string[]>([]);
  const [comment, setComment] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleSelectedChange = (names: string[]) => {
    setSelectedReason(names);
    if (error) setError("");
  };

  const handleSubmit = () => {
    if (!selectedReason[0]) {
      setError("Пожалуйста, выберите причину");
      return;
    }
    setError("");
    onSubmitClick(selectedReason[0], comment ?? "");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-[10px]">
      <h3 className="text-center text-[22px] font-semibold">{title}</h3>
      <div className="flex flex-col items-center justify-center gap-[20px]">
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <FilterCheckList
            elements={reasons}
            onChangeSelected={handleSelectedChange}
            selectedItems={selectedReason}
            multiSelect={false}
          />
          {error && <div className="text-[14px] text-red">{error}</div>}
          <Input
            className="h-[50px]"
            type="text"
            name="comment"
            placeholder="Комментарий"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <div className="flex w-full justify-between">
          <PrimaryButton text={submitButtonText} onClickEvent={handleSubmit} />
          <RedButton text={denyButtonText} onClickEvent={onDenyClick} />
        </div>
      </div>
    </div>
  );
}

export default ReasonModal;
