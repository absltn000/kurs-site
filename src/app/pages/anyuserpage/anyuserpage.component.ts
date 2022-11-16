import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../article/article.model';
import { ArticleService } from '../article/article.service';
import { SearchService } from '../search.service';
import { UserService } from '../user.service';

@Component({
  templateUrl: './anyuserpage.component.html',
  styleUrls: ['./anyuserpage.component.scss']
})
export class AnyuserpageComponent implements OnInit {

  constructor(private httpUser:UserService,private http:ArticleService, public httpSearch:SearchService, private router:Router) { }
  array:any;
  user:any;
  ngOnInit(): void {
    this.http.getArticle().subscribe(
      (a)=>this.array=a
    )
    this.httpUser.getUsers().subscribe(
      (a:any)=>{
        let id=localStorage.getItem('temp')
        for (let i:number=0;i<a.length;i++)
        {
          if(id==a[i].id)
          this.user=a[i];
        }
      }
    )
  }
  onClick(artc:Article)
  {
    artc.countViewes++;
    this.http.putArticle(artc).subscribe(
      ()=>{},
      ()=>{},
      ()=>this.http.addTempArticle(artc).subscribe(
        (a)=>{
          this.router.navigate(['/articlepage']);
      }
      )
    );
  }
}
