import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../shared/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate {

  constructor(private authorizationService : AuthorizationService,  private router: Router) {};

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let isLoggedIn = this.authorizationService.isAutenticaded();

    if(isLoggedIn) {
      return true;
    }
    else {
      this.router.navigate(['']);
    }
    return false;
  }
  
}
