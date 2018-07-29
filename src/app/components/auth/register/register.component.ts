import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  errorMessage;
  successMessage;


  constructor( private fb: FormBuilder, private authService: AuthService ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'password': ['', [Validators.required]]
    })
  }

  get f(){
    return this.registerForm.controls;
  }

  onSubmit(){
    this.submitted = true;

    if(this.registerForm.invalid){
      return;
    }

    this.tryRegister(this.registerForm.value);
  }

  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      //console.log(res);
      this.errorMessage = "";
      this.successMessage = "Your account has been created";
    }, err => {
      //console.log(err);
      this.errorMessage = err.message;
      this.successMessage = "";
    })
  }

}
