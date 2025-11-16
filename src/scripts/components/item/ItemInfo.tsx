import type { Seller } from "../../api/models.api";
import formatDate from "../../util/formatDate";
import ItemCharacteristic from "./ItemCharacteristic";
import ItemSlider from "./slider/ItemSlider.tsx";

interface ItemInfoProps {
  images: string[];
  characteristics: Record<string, string>;
  seller: Seller;
  description: string;
}

function ItemInfo({
  images,
  characteristics,
  seller,
  description,
}: ItemInfoProps) {
  return (
    <div className="flex w-[50%] flex-col gap-[15px]">
      <div>
        <ItemSlider images={images} />
      </div>
      <div>
        <h3 className="mb-[10px] text-[22px] font-semibold">Описание</h3>
        <div className="text-grey">{description}</div>
      </div>

      <div>
        <h3 className="mb-[10px] text-[22px] font-semibold">Характеристики</h3>
        <div className="grid grid-cols-2 gap-[5px]">
          {Object.entries(characteristics).map(([key, value]) => (
            <ItemCharacteristic key={key} label={key} content={value} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-[10px] text-[22px] font-semibold">О продавце</h3>
        <ul className="flex flex-col gap-[5px]">
          <li className="text-grey">
            Продавец:
            <span className="ml-[10px] text-black-text">{seller.name}</span>
          </li>
          <li className="text-grey">
            Рейтинг продавца:
            <span className="ml-[10px] text-black-text">{seller.rating}</span>
          </li>
          <li className="text-grey">
            Всего объявлений:
            <span className="ml-[10px] text-black-text">{seller.totalAds}</span>
          </li>
          <li className="text-grey">
            Дата регистрации:
            <span className="ml-[10px] text-black-text">
              {formatDate(seller.registeredAt)}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default ItemInfo;
