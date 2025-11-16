import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Item as ItemModel } from "../api/models.api.ts";
import { getItemById } from "../api/api.ts";
import ItemInfo from "../components/item/ItemInfo.tsx";
import ItemModerationHistory from "../components/item/ItemModerationHistory.tsx";
import ItemModerationBtns from "../components/item/ItemModerationBtns.tsx";
import { useSearchParams } from "react-router-dom";

export default function ItemPage() {
  const [item, setItem] = useState<ItemModel>();

  const { id } = useParams();
  const itemId = id ? Number(id) : undefined;

  const [searchParams] = useSearchParams();

  const idList = searchParams.get("idList");
  const itemIdList = idList ? idList.split(",").map((id) => Number(id)) : [];

  const fetchItem = async () => {
    try {
      const response = await getItemById({
        id: itemId,
      });
      if (response) {
        setItem(response);
      }
    } catch (error) {
      console.error("Ошибка загрузки объявления:", error);
    }
  };

  useEffect(() => {
    fetchItem();
  }, [itemId]);

  const priceTitle = `${item?.price.toLocaleString("ru-RU")} ₽`;

  return (
    <div className="h-full">
      <div className="container">
        <div className="flex flex-col gap-[25px] pb-[50px]">
          {item ? (
            <h2 className="text-[32px] font-bold">
              {item.title},<span className="ml-[10px]">{priceTitle}</span>
            </h2>
          ) : (
            ""
          )}
          <div className="flex w-full justify-between">
            {item && (
              <ItemInfo
                images={item.images}
                characteristics={item.characteristics}
                seller={item.seller}
                description={item.description}
              />
            )}
            {item && (
              <ItemModerationHistory
                moderationHistory={item.moderationHistory}
              />
            )}
          </div>
          {item && <ItemModerationBtns id={item.id} idList={itemIdList} />}
        </div>
      </div>
    </div>
  );
}
