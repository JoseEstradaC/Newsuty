import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsPag } from '../dto';
import { NewsDto } from '../dto/news.dto';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private httpClient: HttpClient) {}

  async getNewsPag(index: number): Promise<NewsPag> {
    try {
      return await this.httpClient
        .get<NewsPag>(`http://localhost:3000/news/dest/${index}`, { withCredentials: true })
        .toPromise();
    } catch (error) {
      return {
        fin: true,
        news: [],
      };
    }
  }

  async getNewNewsPag(index: number): Promise<NewsPag> {
    try {
      return await this.httpClient
        .get<NewsPag>(`http://localhost:3000/news/new/${index}`, { withCredentials: true })
        .toPromise();
    } catch (error) {
      return {
        fin: true,
        news: [],
      };
    }
  }
  async getUserNewsPag(index: number): Promise<NewsPag> {
    try {
      return await this.httpClient
        .get<NewsPag>(`http://localhost:3000/news/user/${index}`, { withCredentials: true })
        .toPromise();
    } catch (error) {
      return {
        fin: true,
        news: [],
      };
    }
  }

  async voteNews(id: string, isLike: boolean) {
    try {
      return await this.httpClient
        .post<NewsDto>('http://localhost:3000/news/add/vote', { id, isLike }, { withCredentials: true })
        .toPromise();
    } catch (error) {
      return false;
    }
  }

  async deleteVoteNews(id: string) {
    try {
      return await this.httpClient
        .post<NewsDto>('http://localhost:3000/news/remove/vote', { id }, { withCredentials: true })
        .toPromise();
    } catch (error) {
      return false;
    }
  }

  async deleteNews(id: string) {
    try {
      await this.httpClient.delete(`http://localhost:3000/news/${id}`, { withCredentials: true }).toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }

  async createNews(url: string) {
    try {
      await this.httpClient.post(`http://localhost:3000/news/add/url`, { url }, { withCredentials: true }).toPromise();
      return true;
    } catch (error) {
      return false;
    }
  }
}
