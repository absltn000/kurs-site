import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article } from './article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  constructor(private http:HttpClient) { };
  getArticle()
  {
    return this.http.get(' http://localhost:3000/article');
  }
  addArticle(Article:Article)
  {
    return this.http.post(' http://localhost:3000/article',Article);
  }
  addTempArticle(article:Article)
  {
    return this.http.post(' http://localhost:3000/file',article);
  }
  getTempArticle()
  {
    return this.http.get(' http://localhost:3000/file');
  }
  deleteTempArticle(id:any)
  {
    let url="http://localhost:3000/file/"+id;
    return this.http.delete(`${url}`);
  }
  putArticle(article:Article)
  {
    let url="http://localhost:3000/article/"+article.id;
    return this.http.put(url,article);
  }
  deleteArticle(id:number)
  {
    let url="http://localhost:3000/file/"+id;
    return this.http.delete(`${url}`);
  }
}
