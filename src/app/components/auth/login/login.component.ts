import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  errorMessage;
  successMessage;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private route:Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    
  }

  get f() { return this.loginForm.controls; };

  onSubmit(){
    this.submitted = true;

    if (this.loginForm.invalid){
      return;
    }

    this.tryLogin(this.loginForm.value);
  }

  tryLogin(value){
    this.authService.login(value)
    .then(res=>{
      this.route.navigate(['/notes']);
      this.successMessage = "Success"
      this.authService.isLoggedIn.next(true);
    }).catch(err=>{     
      this.errorMessage = err.message;
    })
    
  }

}
