import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import { AuthService } from '../../auth.service';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import {FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  templateUrl: './dialogreg.component.html',
  styleUrls: ['./dialogreg.component.scss']
})
export class Dialogreg implements OnInit {
  constructor( private http:UserService, private authService:AuthService, private router:Router ) { }


    name= new FormControl('',[Validators.required,Validators.minLength(1)]);
    surname= new FormControl('',[Validators.required,Validators.minLength(1)]);
    email= new FormControl('', [Validators.required,Validators.required, Validators.email]);
    password= new FormControl('',[Validators.required,Validators.minLength(6)]);

  Users:User[]=[];
  sex:string[]=["Man","Woman"];
  gender:string = "";
  art=new Image();

  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  matcher = new MyErrorStateMatcher();
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  save() {
    if (!this.name.hasError('minLength') && !this.surname.hasError('minLength') && !this.email.hasError('email') && !this.email.hasError('required') && !this.password.hasError('minLength')
    && !this.name.hasError('required') && !this.surname.hasError('required') && !this.password.hasError('required') && !this.selected.hasError('required') && !this.selected.hasError('pattern'))
    {
      this.http
      .getByLogin(this.email.value)
      .pipe(
        tap((user) => {
          if (user) {
            throw new Error('Логин занят');
          }
          return user;
        }),
        switchMap(() =>
          this.http.add(new User(this.name.value,this.surname.value,this.password.value,this.email.value,this.selected.value))
        )
      )
      .subscribe({
        next: (user) => {
          this.authService.signIn(user);
          this.router.navigate(['']);
        },
        error: (error) => {
          console.log(error);
          alert(error);
        },
      });
    } 
    else{
      alert("Введены некоректные данные")
    }
  }

  ngOnInit(): void {
  }

}
