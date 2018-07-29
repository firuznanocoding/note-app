import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NotifierModule } from 'angular-notifier';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NoteComponent } from './components/note/note.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthGuard } from './core/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { AlertComponent } from './components/alert/alert.component';
import { NotificationService } from './services/notification.service';


const appRoute: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'notes', component: NoteComponent, canActivate: [AuthGuard]},
  {path: '**', component:HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NoteComponent,
    LoginComponent,
    RegisterComponent,
    TimeAgoPipe,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoute),
    ReactiveFormsModule,
    FormsModule,
    AngularFireDatabaseModule,
    NotifierModule.withConfig( {
      position:{
        horizontal: {
          position: 'right',
          distance: 12
        },
      },
      theme: 'material',
      behaviour:{
        autoHide: 2000
      }
    } )
    
  ],
  providers: [
    AuthGuard,
    NotificationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
