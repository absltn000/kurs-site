import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { finalize } from 'rxjs/operators';
import { ArticleService } from '../../article/article.service';
import { AuthService } from '../../auth.service';
import { UserService } from '../../user.service';

@Component({
  templateUrl: './dilaloglog.component.html',
  styleUrls: ['./dilaloglog.component.scss']
})
export class DilaloglogComponent implements OnInit{
  
  constructor(private http:UserService, private authService:AuthService, private router:Router){};
  fileName="";
  email=new FormControl('',[Validators.required]);
  password = new FormControl('',[Validators.required]);
  ngOnInit(): void{

  }
  login()
  {

      this.http
        .getByLogin(this.email.value)
        .subscribe((user) => {
          if (!user) {
            alert('Такого пользователя нет!');
            return;
          }
          if (this.password.value !== user.password) {
            alert('Неверный пароль!');
            return;
          }
  
          this.authService.signIn(user);
          this.router.navigate(['']);
        });
  }
}
