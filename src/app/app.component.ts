import { Component, OnInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'login-drupal';

  isLogged = false;

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isLogged = val.urlAfterRedirects !== '/' ? true : false;
      }
    });
  }

}


