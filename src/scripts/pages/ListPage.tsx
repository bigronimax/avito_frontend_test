import { getItemsByFilters } from "../api/api.ts";
import type { Item as ListItemModel, Pagination } from "../api/models.api.ts";
import ListBlock from "../components/list/ListBlock.tsx";
import ListFilter from "../components/list/ListFilter.tsx";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";

export interface FilterParams {
  status?: string[];
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
}

export default function ListPage() {
  const [cards, setCards] = useState<ListItemModel[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
    totalItems: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams();

  const getCurrentPage = (): number => {
    const page = searchParams.get("page");
    return page ? Number(page) : 1;
  };

  const getFiltersFromURL = (): FilterParams => {
    const filters: FilterParams = {};

    const status = searchParams.get("status");
    if (status) {
      filters.status = status.split(",");
    }

    const category = searchParams.get("category");
    if (category) {
      filters.category = category;
    }

    const minPrice = searchParams.get("minPrice");
    if (minPrice) {
      filters.minPrice = Number(minPrice);
    }

    const maxPrice = searchParams.get("maxPrice");
    if (maxPrice) {
      filters.maxPrice = Number(maxPrice);
    }

    const sortBy = searchParams.get("sortBy");
    if (sortBy) {
      filters.sortBy = sortBy;
    }

    const sortOrder = searchParams.get("sortOrder");
    if (sortOrder) {
      filters.sortOrder = sortOrder;
    }

    const search = searchParams.get("search");
    if (search) {
      filters.search = search;
    }

    return filters;
  };

  const updateURL = (filterParams: FilterParams, page: number) => {
    const params = new URLSearchParams();

    params.set("page", String(page));

    if (filterParams.status && filterParams.status.length > 0) {
      params.set("status", filterParams.status.join(","));
    }

    if (filterParams.category) {
      params.set("category", filterParams.category);
    }

    if (filterParams.minPrice !== undefined) {
      params.set("minPrice", String(filterParams.minPrice));
    }

    if (filterParams.maxPrice !== undefined) {
      params.set("maxPrice", String(filterParams.maxPrice));
    }

    if (filterParams.sortBy) {
      params.set("sortBy", filterParams.sortBy);
    }

    if (filterParams.sortOrder) {
      params.set("sortOrder", filterParams.sortOrder);
    }

    if (filterParams.search) {
      params.set("search", filterParams.search);
    }

    setSearchParams(params);
  };

  const fetchItems = async (filterParams: FilterParams = {}, page = 1) => {
    try {
      const response = await getItemsByFilters({
        page,
        limit: 10,
        status: filterParams.status,
        category: filterParams.category,
        minPrice: filterParams.minPrice,
        maxPrice: filterParams.maxPrice,
        sortBy: filterParams.sortBy,
        sortOrder: filterParams.sortOrder,
        search: filterParams.search,
      });

      if (response && response.ads) {
        setCards(response.ads);
        setPagination(response.pagination);
      }
    } catch (error) {
      console.error("Ошибка загрузки объявлений:", error);
    }
  };

  useEffect(() => {
    const filters = getFiltersFromURL();
    const currentPage = getCurrentPage();
    fetchItems(filters, currentPage);
  }, [searchParams]);

  const handleApplyFilters = (filterParams: FilterParams) => {
    updateURL(filterParams, 1);
  };

  const handleResetFilters = () => {
    setSearchParams({ page: "1" });
  };

  const handlePageChange = (page: number) => {
    const filters = getFiltersFromURL();
    updateURL(filters, page);
  };

  return (
    <div className="min-h-screen bg-grey-3">
      <div className="container">
        <div>
          <div className="py-[25px]">
            <ListFilter
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
              initialFilters={getFiltersFromURL()}
            />
          </div>
          <div className="py-[50px]">
            <ListBlock
              cards={cards}
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
