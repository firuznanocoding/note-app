import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private myRoute: Router, private angularFireAuth: AngularFireAuth){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var user = this.angularFireAuth.auth.currentUser;
    if (user) {
       return true;
    } else {
      this.myRoute.navigate(['login']);
      return false;
    }
  }
}