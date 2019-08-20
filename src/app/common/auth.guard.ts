import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!localStorage.getItem('currentAppUser')) {
      window.location.replace('/home-page');
    } else {
      if (JSON.parse(localStorage.getItem('currentAppUser')).role == 'ADMIN') {
        return true;
      } else {
        window.location.replace('/home-page');
      }
    }

  }
}
