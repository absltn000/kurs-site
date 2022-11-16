import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from './article/article.model';
import { ArticleService } from './article/article.service';
import { User } from './user.model';
import { UserService } from './user.service';
import { Comment } from './article/article.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  users: any[];
  articles:any[];
  constructor(private httpUsers:UserService, private httpArticle:ArticleService) { 
    httpUsers.getUsers().subscribe(
      (a:any)=>this.users=a
    )
    httpArticle.getArticle().subscribe(
      (a:any)=>this.articles=a
    )
  }
  getUserById()
  {

  }
  getImage(id:number)
  {
    let x:string;
    for (let i:number=0;i<this.users.length;i++)
    {
      if (this.users[i] && this.users[i].id==id)
      {
        x=this.users[i].image;
      }
    }
    return x;
  }
  favoriteSet(id:number)
  {
    let localuser=JSON.parse(localStorage.getItem('user'));
    if(localuser!=undefined && localuser!=null)
    {
      if (localuser.favouriteArticleId==undefined)
      {
        localuser.favouriteArticleId=[];
        localuser.favouriteArticleId.push(id);
      }
      else
      {
        if (!this.favorite(id))
        localuser.favouriteArticleId.push(id);
        else
        {
          for (let i:number=0;i<localuser.favouriteArticleId.length;i++)
          {
            if (localuser.favouriteArticleId[i]==id)
            localuser.favouriteArticleId.splice(i,1);
          }
        }
      }
    }
    localStorage.setItem('user',JSON.stringify(localuser));
    this.httpUsers.put(localuser).subscribe();
  }
  favorite(id:number)
  {
    let localuser=JSON.parse(localStorage.getItem('user'));
    if(localuser!=undefined && localuser!=null)
    {
      console.log("fav")
      if(localuser.favouriteArticleId!=undefined)
      {
        console.log("fav1")
      for(let i:number=0;i<localuser.favouriteArticleId.length;i++)
        if (id==localuser.favouriteArticleId[i])
         return true;
      }
    }
    return false;
  }
  setComment(article:Article,user:User,text:string)
  {
    let x:Comment;
    if (text!="")
    {
      if (article.comments!=undefined && article.comments!=null)
      {
        x=new Comment(user.id,text);
        article.comments.push(
          x
        )
        this.httpArticle.putArticle(article).subscribe();
      }
    }
  }
  getAuthor(id:number)
  {
    let x:string;
    for (let i:number=0;i<this.users.length;i++)
    {
      if (this.users[i] && this.users[i].id==id)
      {
        x=this.users[i].name+' '+this.users[i].surname;
      }
    }
    return x;
  }

  banSet(id:number)
  {
    let localuser=JSON.parse(localStorage.getItem('user'));
    if(localuser!=undefined && localuser!=null)
    {
      if (localuser.banArticlesId==undefined)
      {
        localuser.banArticlesId=[];
        localuser.banArticlesId.push(id);
      }
      else
      {
        if (!this.ban(id))
        localuser.banArticlesId.push(id);
        else
        {
          for (let i:number=0;i<localuser.banArticlesId.length;i++)
          {
            if (localuser.banArticlesId[i]==id)
            localuser.banArticlesId.splice(i,1);
          }
        }
      }
    }
    localStorage.setItem('user',JSON.stringify(localuser));
    this.httpUsers.put(localuser).subscribe();
  }
  ban(id:number)
  {
    let localuser=JSON.parse(localStorage.getItem('user'));
    if(localuser!=undefined && localuser!=null)
    {
      console.log("bav")
      if(localuser.banArticlesId!=undefined)
      {
        console.log("bav1")
      for(let i:number=0;i<localuser.banArticlesId.length;i++)
        if (id==localuser.banArticlesId[i])
         return true;
      }
    }
    return false;
  }
  written(id:number, user?:User)
  {
    let localuser
    if (user!=undefined && user!=null)
    {
      localuser=user;
    }
    else
    {
    localuser=JSON.parse(localStorage.getItem('user'));
    }
    if(localuser!=undefined && localuser!=null)
    {
      console.log("bav")
      if(localuser.writenArticlesId!=undefined)
      {
        console.log("bav1")
      for(let i:number=0;i<localuser.writenArticlesId.length;i++)
        if (id==localuser.writenArticlesId[i])
         return true;
      }
    }
    return false;
  }
  deleteArticle(id:number)
  {
    this.httpArticle.deleteArticle(id).subscribe();
  }
}
