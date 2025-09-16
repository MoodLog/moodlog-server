/**
 * 에러 및 응답 관련 Interface 정의
 */

// 에러 응답
export interface ErrorResponse {
  success: false;
  error: string;
  message?: string;
}

// 성공 응답
export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

// API 응답 (성공/실패 통합)
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
