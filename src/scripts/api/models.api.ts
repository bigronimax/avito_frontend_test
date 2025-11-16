type Status = "pending" | "approved" | "rejected" | "draft";
type Priority = "normal" | "urgent";
type Category =
  | "Электроника"
  | "Недвижимость"
  | "Транспорт"
  | "Работа"
  | "Услуги"
  | "Животные"
  | "Мода"
  | "Детское";
type RejectionReasons =
  | "Запрещенный товар"
  | "Неверная категория"
  | "Некорректное описание"
  | "Проблемы с фото"
  | "Подозрение на мошенничество"
  | "Другое";

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface Seller {
  id: number;
  name: string;
  rating: string;
  totalAds: number;
  registeredAt: string;
}

export interface ModerationHistory {
  id: number;
  moderatorId: number;
  moderatorName: string;
  action: Status;
  reason: RejectionReasons | null;
  comment: string;
  timestamp: string;
}

export interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  category: Category;
  categoryId: number;
  status: Status;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  images: string[];
  seller: Seller;
  characteristics: Record<string, string>;
  moderationHistory: ModerationHistory[];
}

export interface ItemsResponse {
  ads: Item[];
  pagination: Pagination;
}

export interface StatsSummaryResponse {
  totalReviewed: number;
  totalReviewedToday: number;
  totalReviewedThisWeek: number;
  totalReviewedThisMonth: number;
  approvedPercentage: number;
  rejectedPercentage: number;
  requestChangesPercentage: number;
  averageReviewTime: number;
}

export interface ActivityDataResponse {
  date: string;
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface DecisionsDataResponse {
  approved: number;
  rejected: number;
  requestChanges: number;
}

export interface ModeratorResponse {
  id: number;
  name: string;
  email: string;
  role: string;
  statistics: ModeratorStats;
  permissions: string[];
}

export interface ModeratorStats {
  totalReviewed: number;
  todayReviewed: number;
  thisWeekReviewed: number;
  thisMonthReviewed: number;
  averageReviewTime: number;
  approvalRate: number;
}

export type CategoriesChartResponse = Record<string, number>;
