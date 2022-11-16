import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User | null = null;

  users$=new Subject();
  constructor(private router:Router) {
    try {
      this.currentUser = User.of(
        JSON.parse(localStorage.getItem('user') ?? '')
      );
    } catch (error) {
      console.error(error);
      this.currentUser = null;
    }
  }

  public get isAuth() {
    return this.currentUser != null;
  }

  signIn(user: User) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(this.currentUser));
    this.users$.next(user);
  }

}