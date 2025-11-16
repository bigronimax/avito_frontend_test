import type { ModerationHistory } from "../../api/models.api";
import formatDate from "../../util/formatDate";

interface ItemModerationHistoryProps {
  moderationHistory: ModerationHistory[];
}

const actionConvert: Record<string, string> = {
  approved: "Одобрено",
  pending: "На модерации",
  rejected: "Отклонено",
};

export default function ItemModerationHistory({
  moderationHistory,
}: ItemModerationHistoryProps) {
  return (
    <div className="flex h-fit w-[45%] flex-col gap-[20px] rounded-[12px] border border-solid border-light-grey px-[30px] py-[20px]">
      <h2 className="text-[28px] font-bold">История модерации</h2>
      <div>
        {moderationHistory.length ? (
          <ul className="flex max-h-[300px] flex-col gap-[20px] overflow-y-auto">
            {moderationHistory.map((elem) => (
              <li key={elem.id} className="flex flex-col gap-[5px]">
                <span>Модератор: {elem.moderatorName}</span>
                <span>Дата проверки: {formatDate(elem.timestamp)}</span>
                <span
                  className={`${elem.action == "approved" ? "text-green" : elem.action == "rejected" ? "text-red" : ""}`}
                >
                  {actionConvert[elem.action]}
                </span>
                {elem.comment ? <span>Комментарий: {elem.comment}</span> : ""}
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-[18px]">Не проверено</div>
        )}
      </div>
    </div>
  );
}
