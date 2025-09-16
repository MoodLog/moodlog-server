/**
 * 모든 타입 정의를 중앙에서 export
 */

// 게시글 관련 타입들
export type { Post, CreatePostRequest, UpdatePostRequest } from "./post";

// 페이지 관련 타입들
export type { PaginationParams, PaginatedResponse } from "./page";

// 에러 및 응답 관련 타입들
export type { ErrorResponse, SuccessResponse, ApiResponse } from "./error";

// 공통 유틸리티 타입들
export type ID = string | number;
export type Timestamp = string;
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
