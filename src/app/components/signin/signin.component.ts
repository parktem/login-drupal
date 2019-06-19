import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';

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
      user: new FormControl(null,
        [Validators.required
        ]),
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
      } else {
        this.dataReceived = false;
      }
    });
  }

    onSignIn(form: NgForm) {
      const user = form.value.user;
      const password = form.value.password;
      this.loginService.signIn({user, password}).subscribe(
        data => console.log('data::', data['correo'])
      );
    }

    onRecoveryPassword(form: NgForm) {

    }

}
