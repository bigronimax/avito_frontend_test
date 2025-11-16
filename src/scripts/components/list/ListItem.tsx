import { Link } from "react-router";
import type { Item } from "../../api/models.api";
import PrimaryButton from "../PrimaryButton";
import { useNavigate } from "react-router-dom";
import formatDate from "../../util/formatDate";
import { useSearchParams } from "react-router";

interface ListItemProps {
  item: Item;
  idList: number[];
}

const actionConvert: Record<string, string> = {
  approved: "Одобрено",
  pending: "На модерации",
  draft: "На доработке",
  rejected: "Отклонено",
};

const priorityConvert: Record<string, string> = {
  urgent: "Высокий",
  normal: "Средний",
};

export default function ListItem({ item, idList }: ListItemProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const getItemURL = () => {
    const params = new URLSearchParams(searchParams);
    params.set("idList", idList.join(","));
    return `/item/${item.id}?${params.toString()}`;
  };

  const priceTitle = `${item.price.toLocaleString("ru-RU")} ₽`;
  return (
    <div className="flex justify-between gap-[25px] rounded-[12px] bg-white p-[10px]">
      <div className="relative w-[25%]">
        {item.images.length ? (
          <img
            className="h-full w-full rounded-[12px] object-cover"
            src={item.images[0]}
          />
        ) : (
          <img
            className="h-full w-full rounded-[12px] object-cover"
            src={"./placeholder.jpg"}
          />
        )}
      </div>
      <div className="flex w-[50%] flex-col gap-[20px]">
        <div>
          <div className="flex flex-col">
            <div className="flex gap-[10px] text-[28px] font-bold text-blue">
              <Link to={getItemURL()}>{item.title}</Link>
            </div>
            <span className="text-[28px] font-bold">{priceTitle}</span>
          </div>
          <div>
            <ul>
              <li>{item.category}</li>
              <li className="text-grey">{item.description}</li>
            </ul>
          </div>
        </div>
        <div>
          <PrimaryButton
            text="Перейти"
            onClickEvent={() => navigate(getItemURL())}
          />
        </div>
      </div>
      <div className="flex w-[25%] flex-col">
        <div className="flex flex-col gap-[10px]">
          <div>
            <ul>
              <li>Продавец: {item.seller.name}</li>
              <li>Дата: {formatDate(item.createdAt)}</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>
                Статус:{" "}
                <span
                  className={`${item.status == "approved" ? "text-green" : item.status == "rejected" ? "text-red" : ""}`}
                >
                  {actionConvert[item.status]}
                </span>
              </li>
              <li className={`${item.status == "approved" ? "text-grey" : ""}`}>
                Приоритет:{" "}
                <span
                  className={`${item.priority == "urgent" && item.status != "approved" ? "text-red" : "text-grey"}`}
                >
                  {priorityConvert[item.priority]}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
