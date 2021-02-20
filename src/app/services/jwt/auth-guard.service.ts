import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public jwtHelper: JwtHelperService ,public router: Router) {}
  canActivate(): boolean {
    if (!this.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    //localStorage.removeItem('token')deconnection
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}