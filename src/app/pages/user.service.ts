import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { pipe } from 'rxjs';
import { map } from 'rxjs';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  Users:User[]=[];
  user:User;
  constructor(private http:HttpClient) { };
  getByLogin(mail: string): Observable<User | null> {
    return this.http
      .get<Object[]>(`http://localhost:3000/users?mail=${mail}`)
      .pipe(map((users:any) => (users.length ? users[0] : null)),
      tap((x)=>console.log(x)));
  }
  getUsers()
  {
    let url="http://localhost:3000/users";
    return this.http.get(url);
  }
  add(user: User): Observable<User> {
    return this.http
      .post('http://localhost:3000/users', user)
      .pipe(map((user) => User.of(user)));
  }
  put(user:User)
  {
    let url="http://localhost:3000/users"+'/'+user.id;
    return this.http.put(url,user);
  }
}
