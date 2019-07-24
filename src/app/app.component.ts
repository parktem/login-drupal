import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router, NavigationEnd } from '@angular/router';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'login-drupal';
  displaySpinner = false;
  isLogged = false;

  constructor(private loginService: LoginService, private appService: AppService, private router: Router) {}

  ngOnInit() {
    this.appService.suscribed.subscribe( (data: boolean) => {
      this.displaySpinner = data;
    });

    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.isLogged = val.urlAfterRedirects !== '/' ? true : false;
      }
    });
  }

}


