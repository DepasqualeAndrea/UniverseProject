import { SafeUrl } from "@angular/platform-browser";

export interface PostInfo {
  postId: number;
  userId: number;
  username: string;
  likeCount: number;
  postImageUrl: string;
}
