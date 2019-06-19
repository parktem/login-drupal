import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { LoginService } from 'src/app/login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  dataReceived: boolean = undefined;
  user: User;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.signupForm = new FormGroup({
      user: new FormControl(null,
        [Validators.required,
          Validators.email]),
      password: new FormControl(null,
        [Validators.required,
        Validators.minLength(6)]),
      secondPassword: new FormControl(null,
        [Validators.required,
          Validators.minLength(6)]),
    }, { validators: samePasswords });
    this.loginService.isLogged.subscribe(logged => {
      if (logged) {
        this.router.navigate(['']);
      }
    });
    this.loginService.dataResponded.subscribe(response => {
      if (response) {
        this.dataReceived = true;
      } else {
        this.dataReceived = false;
      }
    });
  }

  ontoad(AC: AbstractControl) {
    AC.setErrors({onload: false});
  }

  onSignUp(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;
    this.user = new User(username, password);
    this.loginService.signUp(this.user);
  }

}

function samePasswords(form: FormGroup): {[key: string]: any} | null {
  if (form.get('password').value !== form.get('secondPassword').value) {
    return { notMatch : 'passwords dont match' };
  }
  return null;
}
