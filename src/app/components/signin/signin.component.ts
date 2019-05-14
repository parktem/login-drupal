import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginService.isLogged.subscribe(data => {
      if (data) {
          this.router.navigate(['']);
      }
    });
  }

  onSignIn(form: NgForm) {
    const name = form.value.name;
    const password = form.value.password;
    this.loginService.signIn({name, password});
  }

}
