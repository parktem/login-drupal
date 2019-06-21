import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  dataReceived: boolean = undefined;
  user: User;

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
      this.dataReceived = response;
    });
  }

    onSignIn(form: NgForm) {
      const user = form.value.user;
      const password = form.value.password;
      this.user = new User(user, password);
      this.loginService.signIn(this.user).subscribe( data => {
        this.user.setEmail(data['email']);
        this.user.setToken(data['token']);
        this.user.setRoles(data['roles']);
        this.loginService.isLogged.next(true);
        this.loginService.currentUser = this.user;
      });
    }

    onRecoveryPassword(form: NgForm) {}

}
