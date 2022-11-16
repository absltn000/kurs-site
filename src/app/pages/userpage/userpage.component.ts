import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from '../article/article.model';
import { ArticleService } from '../article/article.service';
import { SearchService } from '../search.service';
import { UserService } from '../user.service';

@Component({
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserpageComponent implements OnInit {
  fileName:string;
  fileNameUrl:string;
  name = new FormControl();
  surname = new FormControl();
  constructor(private httpUser:UserService,private http:ArticleService, public search:SearchService, private router:Router) { }
  array:any=[];
  ngOnInit(): void {
    this.http.getArticle().subscribe(
      (a)=>this.array=a
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
  insertImage(imageUrl:any) {
    this.fileName=imageUrl;
  }
  onFileChanged(event:any) {
    const file = event.target.files[0];
    this.fileNameUrl=file.name;
    if (file.type.includes('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                
                this.insertImage(reader.result.toString());
            };
            reader.readAsDataURL(file);
        
    }
  }
  setUser()
  {
    let localuser=JSON.parse(localStorage.getItem('user'));
    if(localuser!=undefined && localuser!=null)
    {
      localuser.image=this.fileName;
      if (this.name.value!="" && this.name.value!=null && this.name.value!=undefined) localuser.name=this.name.value;
      if (this.surname.value!="" && this.surname.value!=null && this.surname.value!=undefined) localuser.surname=this.surname.value;
      localStorage.setItem('user',JSON.stringify(localuser));
      this.httpUser.put(localuser).subscribe();
    } 

  }
}
