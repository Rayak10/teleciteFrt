import { Injectable } from '@angular/core';

import { 
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(public jwtHelper: JwtHelperService, public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedRole: string[] = route.data.expectedRole.split(',');
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    const role = localStorage.getItem('role');
    if (
      !this.isAuthenticated() || 
         expectedRole.indexOf(role) < 0
    ) {
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