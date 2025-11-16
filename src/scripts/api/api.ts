import type {
  ItemsResponse,
  Item,
  StatsSummaryResponse,
  ActivityDataResponse,
  DecisionsDataResponse,
  ModeratorResponse,
  CategoriesChartResponse,
} from "./models.api";

const API_URL = "/api/v1";

const statusConvert: Record<string, string> = {
  Одобрено: "approved",
  "На модерации": "pending",
  Отклонено: "rejected",
  "На доработке": "draft",
};

const categories = [
  "Электроника",
  "Недвижимость",
  "Транспорт",
  "Работа",
  "Услуги",
  "Животные",
  "Мода",
  "Детское",
];

export const getItemsByFilters = async ({
  page = 1,
  limit = 10,
  status,
  category,
  minPrice,
  maxPrice,
  search,
  sortBy = "createdAt",
  sortOrder = "desc",
}: {
  page?: number;
  limit?: number;
  status?: string[];
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}): Promise<ItemsResponse | undefined> => {
  const statusQuery =
    status && status.length
      ? status.map((s) => `status=${statusConvert[s]}`).join("&")
      : "";
  const query =
    `page=${page}&limit=${limit}` +
    (status ? `&${statusQuery}` : "") +
    (category ? `&categoryId=${categories.indexOf(category)}` : "") +
    (minPrice ? `&minPrice=${minPrice}` : "") +
    (maxPrice ? `&maxPrice=${maxPrice}` : "") +
    (search ? `&search=${search}` : "") +
    `&sortBy=${sortBy}&sortOrder=${sortOrder}`;
  try {
    const response = await fetch(`${API_URL}/ads?${query}`);
    if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getItemById = async ({
  id,
}: {
  id: number | undefined;
}): Promise<Item | undefined> => {
  try {
    const response = await fetch(`${API_URL}/ads/${id}`);
    if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const approveItem = async ({
  id,
}: {
  id: number;
}): Promise<Item | undefined> => {
  try {
    const response = await fetch(`${API_URL}/ads/${id}/approve`, {
      method: "POST",
    });
    if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const rejectItem = async ({
  id,
  reason,
  comment = "",
}: {
  id: number;
  reason: string;
  comment?: string;
}): Promise<Item | undefined> => {
  try {
    const response = await fetch(`${API_URL}/ads/${id}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, comment }),
    });
    if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const requestItemChanges = async ({
  id,
  reason,
  comment = "",
}: {
  id: number;
  reason: string;
  comment?: string;
}): Promise<Item | undefined> => {
  try {
    const response = await fetch(`${API_URL}/ads/${id}/request-changes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reason, comment }),
    });
    if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getStatsSummary = async ({
  period,
  startDate,
  endDate,
}: {
  period?: string;
  startDate?: string;
  endDate?: string;
}): Promise<StatsSummaryResponse | undefined> => {
  try {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    const response = await fetch(
      `${API_URL}/stats/summary${params.toString() ? "?" + params.toString() : ""}`,
    );
    if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getActivityChart = async ({
  period,
  startDate,
  endDate,
}: {
  period?: string;
  startDate?: string;
  endDate?: string;
}): Promise<ActivityDataResponse[] | undefined> => {
  try {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    const response = await fetch(
      `${API_URL}/stats/chart/activity${params.toString() ? "?" + params.toString() : ""}`,
    );
    if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getDecisionsChart = async ({
  period,
  startDate,
  endDate,
}: {
  period?: string;
  startDate?: string;
  endDate?: string;
}): Promise<DecisionsDataResponse | undefined> => {
  try {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    const response = await fetch(
      `${API_URL}/stats/chart/decisions${params.toString() ? "?" + params.toString() : ""}`,
    );
    if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCategoriesChart = async ({
  period,
  startDate,
  endDate,
}: {
  period?: string;
  startDate?: string;
  endDate?: string;
}): Promise<CategoriesChartResponse | undefined> => {
  try {
    const params = new URLSearchParams();
    if (period) params.append("period", period);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    const response = await fetch(
      `${API_URL}/stats/chart/categories${params.toString() ? "?" + params.toString() : ""}`,
    );
    if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentModerator = async (): Promise<
  ModeratorResponse | undefined
> => {
  try {
    const response = await fetch(`${API_URL}/moderators/me`);
    if (!response.ok) throw new Error(`Fetch error: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
};
