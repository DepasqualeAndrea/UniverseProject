import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, take } from 'rxjs';
import { AuthService } from './auth.service';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ):
      | Observable<boolean | UrlTree>
      | Promise<boolean | UrlTree>
      | boolean
      | UrlTree {
        if (this.authService.isLoggedIn()) {
          return true;
        } else {
          alert(
            'Per visualizzare questa risorsa devi essere loggato!\nAccedi o registrati')
          this.router.navigate(['/login']);
          return false;
        }
  }

}
