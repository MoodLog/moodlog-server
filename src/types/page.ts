/**
 * 페이지 관련 Interface 정의
 */

export type Sort = "asc" | "desc";
export type SortField = "created_at" | "updated_at" | "title";

// 페이지네이션 파라미터
export interface PaginationParams<T, K extends keyof T = keyof T> {
  page?: number;
  limit?: number;
  sort?: Sort;
  sort_by?: SortField;
  keyword_type?: Pick<T, K>;
  keyword?: string;
}

// 페이지네이션된 응답
export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  total_elements: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}
