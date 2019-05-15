import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(null,
        [Validators.required,
          Validators.email]),
      password: new FormControl(null,
        [Validators.required,
        Validators.minLength(3)]),
      secondPassword: new FormControl(null,
        [Validators.required,
          Validators.minLength(3)]),
    });
  }

  ontoad(AC: AbstractControl) {
    AC.setErrors({onload: false});
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.loginService.signUp({email, password});
    this.router.navigate(['']);
  }
}
