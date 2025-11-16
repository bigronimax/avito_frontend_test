import { useState, useEffect } from "react";
import Input from "../Input";
import PrimaryButton from "../PrimaryButton";
import FilterCheckListSelect from "./filter/FilterCheckListSelect";
import FilterDoubleInputSelect from "./filter/FilterDoubleInputSelect";
import type { FilterParams } from "../../pages/ListPage.tsx";
import RedButton from "../RedButton";

interface ListFilterProps {
  onApplyFilters: (filters: FilterParams) => void;
  onResetFilters: () => void;
  initialFilters: FilterParams;
}

type SortType = {
  sortBy: "price" | "createdAt" | "priority";
  sortOrder: "asc" | "desc";
};

const sortConvert: Record<string, SortType> = {
  Дешевле: { sortBy: "price", sortOrder: "asc" },
  Дороже: { sortBy: "price", sortOrder: "desc" },
  Новые: { sortBy: "createdAt", sortOrder: "desc" },
  Старые: { sortBy: "createdAt", sortOrder: "asc" },
  Важные: { sortBy: "priority", sortOrder: "desc" },
};

const sortConvertReverse: Record<string, string> = {
  "price-asc": "Дешевле",
  "price-desc": "Дороже",
  "createdAt-desc": "Новые",
  "createdAt-asc": "Старые",
  "priority-desc": "Важные",
};

function ListFilter({
  onApplyFilters,
  onResetFilters,
  initialFilters,
}: ListFilterProps) {
  const [activeSelect, setActiveSelect] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [selectedSort, setSelectedSort] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.status) {
        setSelectedStatus(initialFilters.status);
      }

      if (initialFilters.category) {
        setSelectedCategory([initialFilters.category]);
      }

      if (initialFilters.minPrice !== undefined) {
        setMinPrice(initialFilters.minPrice);
      }

      if (initialFilters.maxPrice !== undefined) {
        setMaxPrice(initialFilters.maxPrice);
      }

      if (initialFilters.sortBy && initialFilters.sortOrder) {
        const sortKey = `${initialFilters.sortBy}-${initialFilters.sortOrder}`;
        const sortName = sortConvertReverse[sortKey];
        if (sortName) {
          setSelectedSort([sortName]);
        }
      }

      if (initialFilters.search) {
        setSearch(initialFilters.search);
      }
    }
  }, [initialFilters]);

  const handleApplyFilters = () => {
    onApplyFilters({
      status: selectedStatus.length > 0 ? selectedStatus : undefined,
      category: selectedCategory.length > 0 ? selectedCategory[0] : undefined,
      minPrice,
      maxPrice,
      sortBy:
        selectedSort.length > 0
          ? sortConvert[selectedSort[0]].sortBy
          : undefined,
      sortOrder:
        selectedSort.length > 0
          ? sortConvert[selectedSort[0]].sortOrder
          : undefined,
      search: search.trim() !== "" ? search : undefined,
    });
  };

  const handleResetFilters = () => {
    setSelectedStatus([]);
    setSelectedCategory([]);
    setMinPrice(undefined);
    setMaxPrice(undefined);
    setSelectedSort([]);
    setSearch("");
    setActiveSelect(null);

    onResetFilters();
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="flex w-[100%] border border-light-grey">
        <FilterCheckListSelect
          id="status"
          activeSelect={activeSelect}
          setActiveSelect={setActiveSelect}
          selectedItems={selectedStatus}
          setSelectedItems={setSelectedStatus}
          multiSelect={true}
          elements={[
            { name: "На модерации" },
            { name: "Одобрено" },
            { name: "Отклонено" },
          ]}
          text="Статус"
        />
        <FilterCheckListSelect
          id="category"
          activeSelect={activeSelect}
          setActiveSelect={setActiveSelect}
          selectedItems={selectedCategory}
          setSelectedItems={setSelectedCategory}
          multiSelect={false}
          elements={[
            { name: "Недвижимость" },
            { name: "Транспорт" },
            { name: "Работа" },
            { name: "Услуги" },
            { name: "Животные" },
            { name: "Мода" },
            { name: "Детское" },
          ]}
          text="Категория"
        />
        <FilterDoubleInputSelect
          id="price"
          activeSelect={activeSelect}
          setActiveSelect={setActiveSelect}
          minValue={minPrice}
          maxValue={maxPrice}
          setMinValue={setMinPrice}
          setMaxValue={setMaxPrice}
          type="text"
          name="item_price"
          text="Цена"
        />
        <FilterCheckListSelect
          id="sort"
          activeSelect={activeSelect}
          setActiveSelect={setActiveSelect}
          selectedItems={selectedSort}
          setSelectedItems={setSelectedSort}
          multiSelect={false}
          elements={[
            { name: "Дешевле" },
            { name: "Дороже" },
            { name: "Новые" },
            { name: "Старые" },
            { name: "Важные" },
          ]}
          text="Сортировка"
        />
        <Input
          className="h-[3em] w-[100%] rounded-none"
          type="text"
          name="search"
          placeholder="Название товара"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        ></Input>
      </div>
      <div className="flex justify-end gap-[10px]">
        <RedButton
          className="w-[20%]"
          text="Сбросить фильтры"
          onClickEvent={handleResetFilters}
        />

        <PrimaryButton
          className="w-[20%]"
          text="Показать объявления"
          onClickEvent={handleApplyFilters}
        />
      </div>
    </div>
  );
}

export default ListFilter;
