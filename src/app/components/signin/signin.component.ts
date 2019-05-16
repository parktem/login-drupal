import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  dataReceived: boolean = undefined;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl(null,
        [Validators.required,
          Validators.email]),
          password: new FormControl(null,
            [Validators.required])
          });
    this.loginService.isLogged.subscribe(logged => {
      if (logged) {
        this.router.navigate(['']);
      }
    });
    this.loginService.dataResponded.subscribe(response => {
      if (response) {
        this.dataReceived = true;
      }
    });
  }

    onSignIn(form: NgForm) {
      const email = form.value.email;
      const password = form.value.password;
      this.loginService.signIn({email, password});
    }

    onRecoveryPassword(form: NgForm) {
      const email = form.value.email;
      const password = form.value.password;
      this.loginService.recoveryPassword({email, password});
  }

}
