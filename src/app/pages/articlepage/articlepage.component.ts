import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Article } from '../article/article.model';
import { ArticleService } from '../article/article.service';
import { SearchService } from '../search.service';

@Component({
  templateUrl: './articlepage.component.html',
  styleUrls: ['./articlepage.component.scss']
})
export class ArticlepageComponent implements OnInit {

  constructor(private http:ArticleService, public httpSearch:SearchService) { }
  arr:any;
  deleteUrl:any;
  page1:any;
  comment=new FormControl();
  ngOnInit(): void {
    this.http.getTempArticle().subscribe(
      (a:any)=>
      {
        this.arr=a
        this.page1=this.arr[0];
        if (this.page1.comments==undefined || this.page1.comments==null)
        this.page1.comments=[];
        let divelement=document.getElementsByClassName('div1');
        divelement[0].innerHTML=this.arr[0].page;
        this.deleteUrl=this.arr[0].id;
      },
      ()=>{},
      ()=>{console.log("Successed");
      this.http.deleteTempArticle(this.deleteUrl).subscribe(
        ()=>{},
        ()=>{},
        ()=>{console.log("delete is end")}
      )
    }
    )
    
    
  }

  AddComment(article:Article)
  {
    let localuser=JSON.parse(localStorage.getItem('user'));
        if (localuser!=undefined && localuser!=null)
        this.httpSearch.setComment(article,localuser,this.comment.value);
  }

}
