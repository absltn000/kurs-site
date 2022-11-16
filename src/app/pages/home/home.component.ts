import { Component, OnInit, ɵNOT_FOUND_CHECK_ONLY_ELEMENT_INJECTOR } from '@angular/core';
import { Router } from '@angular/router';
import { from, map, Observable, of, range, retry, Subject, tap } from 'rxjs';
import { Article } from '../article/article.model';
import { ArticleService } from '../article/article.service';
import { SearchService } from '../search.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  users:User[]=[];
  usersTop:any=[];
  stream1$:any;
  stream$:any;
  constructor(private httpUsers:UserService, private articleService:ArticleService, private router:Router, 
    public searchhttp:SearchService) { }
  array:any=[];
  arrTop:any=[];
  ngOnInit(): void {
    this.articleService.getArticle().subscribe(
      (arr)=>
      {
        this.array=arr;
        console.log(this.array[0].authorId);
        let arrx=this.array;
        this.httpUsers.getUsers().pipe(retry(3)).subscribe(
          (a:any)=>this.users=a,
          ()=>{},
          ()=>{
            console.log(this.users)
            let userx=this.users;
            this.stream1$=from(this.users).subscribe(
              (a:any)=>{

                a.countViewes=this.getCountView(a);
                for (let i:number=0;i<10;i++)
                if (!this.usersTop[i])
                {
                  this.usersTop[i]=a;
                  this.usersTop[i].countViewes=this.getCountView(a);
                  break;
                }
                else 
                {

                  if (a.countViewes >= this.usersTop[i].countViewes) 
                  {
                    let x:any=[];
                    for (let j:number = 0;j<i;j++)
                    {
                      x.push(this.usersTop[j]);
                    }
                    x.push(a);
                    for (let j:number = i;j<(this.usersTop.length <= 10 ? this.usersTop.length : 10);j++)
                    {
                      x.push(this.usersTop[j]);
                    }
                    this.usersTop=x;
                    break;
                  }
                }
              },
              ()=>{},
              ()=>console.log(this.usersTop)
            )
            this.stream1$.unsubscribe();
          }
        )
        let localuser=JSON.parse(localStorage.getItem('user'));
        if (localuser!=undefined && localuser!=null)
        if (localuser.banArticlesId!=undefined && localuser.banArticlesId!=null)
        for(let i:number=0;i<this.array.length;i++)
        {
          for(let j:number=0;j<this.array.length;j++)
          {
            if (this.array[i].id==localuser.banArticlesId[j])
            {
              this.array.splice(i,1);
            }
          }
        }
        this.stream$=from(arrx).subscribe(
           (a:any)=>{
             for (let i:number=0;i<6;i++)
             if (!this.arrTop[i])
             {
               this.arrTop[i]=a;
               break;
             }
             else if (a.countViewes>=this.arrTop[i].countViewes) 
             {
               console.log(i);
                let x:any=[];
                for (let j:number = 0;j<i;j++)
                {
                  x.push(this.arrTop[j]);
                }
                x.push(a);
                for (let j:number = i;j<(this.arrTop.length <= 6 ? this.arrTop.length : 6);j++)
                {
                  x.push(this.arrTop[j]);
                }
                console.log(x);
                this.arrTop=x;
                break;
              
             }
           }

        )
        this.stream$.unsubscribe();
      }
    )


  }
  onClick(artc:Article)
  {
    artc.countViewes++;
    this.articleService.putArticle(artc).subscribe(
      ()=>{},
      ()=>{},
      ()=>this.articleService.addTempArticle(artc).subscribe(
        (a)=>{
          this.router.navigate(['/articlepage']);
      }
      )
    );
    
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
  getCountView(user:User)
  {
    let x=0;
    if (user.writenArticlesId)
    {
      for (let i:number = 0;i<user.writenArticlesId.length;i++)
      {
        for (let j:number = 0;j<this.array.length;j++)
        {
          if (this.array[j].id==user.writenArticlesId[i])
          {
            x+=this.array[j].countViewes;
          }
        }
      }
    }
    return x;
  }
  goUser(id:number)
  {
    localStorage.setItem('temp',JSON.stringify(id));
    if (id==JSON.parse(localStorage.getItem('user')).id)
    this.router.navigate(['/options']);
    else
    this.router.navigate(['/anyuser']);
  }
}


