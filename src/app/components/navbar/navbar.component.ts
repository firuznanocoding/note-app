import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  destroy$: Subject<Boolean> = new Subject<Boolean>();
  email;
  isLoggedIn = false;

  constructor(
              private authService: AuthService, 
              private route: Router,
              private angularFireAuth: AngularFireAuth) { }

  ngOnInit() {
    this.authService.isLoggedIn
    .pipe(takeUntil(this.destroy$))
    .subscribe(res=>{
      this.email = this.angularFireAuth.auth.currentUser.email;
      this.isLoggedIn = res;
    })
  } 

  logout(){
    this.authService.logout()
    .then(()=>{
      this.isLoggedIn = false;
      return this.route.navigate(['login']);
    })

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
