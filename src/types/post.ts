/**
 * 게시글 관련 Interface 정의
 */

// 기본 게시글 타입
export interface Post {
  id: number;
  title?: string;
  content?: string;
  created_at: string;
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
