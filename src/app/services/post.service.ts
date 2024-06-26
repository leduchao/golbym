import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Post } from '../interfaces/post';
import { PagedResult } from '../interfaces/paged-result';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = `${environment.BASE_URL}/posts`;

  private httpClient = inject(HttpClient);

  getPosts(keyword?: string, page?: number, numberPosts?: number) {
    return this.httpClient.get<PagedResult<Post>>(
      `${this.baseUrl}?keyword=${keyword}&page=${page}&numberPosts=${numberPosts}`
    );
  }

  getById(id: string) {
    return this.httpClient.get<Post>(`${this.baseUrl}/${id}`);
  }

  getRelatedPosts(id: string) {
    return this.httpClient.get<Post[]>(`${this.baseUrl}/related/${id}`);
  }

  createPost(formData: FormData) {
    return this.httpClient.post(this.baseUrl, formData, {
      observe: 'response',
    });
  }

  updatePost(id: string, formData: FormData) {
    return this.httpClient.put<any>(`${this.baseUrl}/update/${id}`, formData);
  }

  deletePost(id: string) {
    return this.httpClient.delete(`${this.baseUrl}/delete/${id}`);
  }
}
