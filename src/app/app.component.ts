import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Dialogreg } from './pages/dialog/dilalogreg/dialogreg.component';
import {DilaloglogComponent} from './pages/dialog/dilaloglog/dilaloglog.component'
import { AngularEditorComponent } from '@kolkov/angular-editor';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { HttpClient } from '@angular/common/http';
import { ArticleService } from './pages/article/article.service';
import { AuthService } from './pages/auth.service';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent, interval, Observable, Subject, tap, timeInterval, timer } from 'rxjs';
import { User } from './pages/user.model';
import { NgLocalization } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'kurs-site';
  constructor(private dialog: MatDialog, private http:ArticleService, public auth:AuthService, private router:Router) {
    
  }
  ngOnInit(): void {
    
    this.user$.subscribe(
      (a:any)=>{if (a!=null) this.timer$.unsubscribe()}
    );
  }
 
  addevent(){}
  user$:any= new Subject<User>().pipe(tap(
    (a)=>console.log(a)
  ));
  timer$=interval(1000).subscribe(
    ()=>this.user$.next(JSON.parse(localStorage.getItem('user')))
  );;
  user:any;
  openDialog(name:string) {
   
    switch(name)
    {
  
      case 'Registration':
          this.dialog.open(Dialogreg, {
            width:'30%',
          });
        break;
      case 'Login':
           this.dialog.open(DilaloglogComponent, {
            width:'30%',
          });
        break;
    }
    this.user=JSON.parse(localStorage.getItem("user"));
  }
  
  logout()
  {

    localStorage.clear();
    this.router.navigate(['']).finally(()=>location.reload());
    
    

 
  }
  click()
  {
    this.router.navigate(['']);
  }
  click2()
  {
    this.router.navigate(['/create']);
  }
  goOptions()
  {
    this.router.navigate(['/options']);
  }
}

