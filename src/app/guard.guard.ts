import { Inject, Injectable } from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from "./pages/auth.service";
 
@Injectable()
export class AuthGuard
  implements CanActivate, CanActivateChild {
  constructor(
    @Inject(AuthService) private auth: AuthService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.auth.isAuth
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.canActivate(next, state)
  }
}