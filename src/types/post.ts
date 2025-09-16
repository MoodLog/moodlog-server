/**
 * 게시글 관련 Interface 정의
 */

import { PaginatedResponse } from "./page";

// 기본 게시글 타입
export interface Post {
  id: number;
  title?: string;
  content?: string;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

// 게시글 생성 요청
export interface CreatePostRequest {
  title?: string;
  content?: string;
  image_url?: string;
}

// 게시글 수정 요청
export interface UpdatePostRequest {
  title?: string;
  content?: string;
  image_url?: string;
}

// 게시글 리스트 응답
export type PostListResponse = PaginatedResponse<Post>;

// 게시글 삭제 요청
export interface DeletePostParams {
  ids: number[];
}
