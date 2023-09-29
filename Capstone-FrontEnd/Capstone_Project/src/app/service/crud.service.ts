import { HttpClient, HttpClientModule, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../interface/post.interface';
import { User } from '../interface/user.interface';


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private baseUrl = environment.urlSocial;

  constructor(private http: HttpClient) { }

  getAllUsersPosts(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/post/home`);
  }

  getPostById(postId: number): Observable<any> {
    return this.http.get<Post[]>(`${this.baseUrl}/post/${postId}`);
  }
  //da usare⛔
  modificaPost(data: Post, postId: String): Observable<any> {
    return this.http.put<Post[]>(`${this.baseUrl}/post/${postId}`, data);
  }

  savePost(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/post/save`, formData);
  }
  //da usare⛔
  deletePost(postId: String): Observable<any> {
    return this.http.delete<Post[]>(`${this.baseUrl}/post/${postId}`);
  }
  getUserById(userId: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/utente/${userId}`);
  }

  getCommentsByPostId(postId: number): Observable<any> {
    return this.http.get<Post[]>(`${this.baseUrl}/comment/getAllComments/${postId}`);
  }


  getCommentById(commentId: number): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/comment/${commentId}`);
  }


  getRepliesByCommentId(commentId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/reply/byComment/${commentId}`)
  }

  LikePost(postId: number): Observable<string> {
    const requestBody = { postId: postId };
    return this.http.post(`${this.baseUrl}/post/${postId}/togglelike`, requestBody, { responseType: 'text' });
  }
  commentPost(postId: number, data: {
    content: string
  }): Observable<string> {
    return this.http.post(`${this.baseUrl}/comment/${postId}/create`, data, { responseType: 'text' });
  }

  commentReply(commentId: number, data: {
    content: string}): Observable<any> {
    return this.http.post(`${this.baseUrl}/reply/create/${commentId}`, data)
  }

  likeComment(commentId: number): Observable<string> {
    const requestBody = { commentId: commentId };
  return this.http.post(`${this.baseUrl}/comment/${commentId}/togglelike`, requestBody, { responseType: 'text' });
  }
  likeReply(repliesId: number): Observable<string> {
    const requestBody = { repliesId: repliesId };
  return this.http.post(`${this.baseUrl}/reply/${repliesId}/togglelike`, requestBody, { responseType: 'text' });
  }
  toggleFollowing(userId: number, userFollowedId: number): Observable<string> {
    const requestBody = { userId: userId, followId: userFollowedId };
    return this.http.post(`${this.baseUrl}/utente/${userFollowedId}/follow/${userId}`, requestBody, { responseType: 'text' });
  }
  //da usare⛔
  getFollowers(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/utente/followers`);
  }
  getFollowings(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/utente/following`);
  }

  getSuggestedUsers(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/utente/all`);
  }

}
