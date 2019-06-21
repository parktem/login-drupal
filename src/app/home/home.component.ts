import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  signinForm: FormGroup;
  dataReceived: boolean = undefined;
  user: User;

  constructor(private loginService: LoginService, private router: Router) { }

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
        this.router.navigate(['/profile']);
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
      this.user.setEmail(data['correo']);
      this.user.setToken(data['token']);
      this.user.setRoles(data['roles']);
      this.loginService.currentUser = this.user;
      this.loginService.isLogged.next(true);
      //this.loginService.delete(this.user);
    },
    err => console.log());
  }

  onRecoveryPassword(form: NgForm) {}

}
