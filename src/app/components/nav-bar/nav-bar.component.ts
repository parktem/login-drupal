import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLogged = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    console.log(this.isLogged);
    this.loginService.isLogged.subscribe(logged => {
      if (logged) {
        this.isLogged = true;
        console.log(this.isLogged);
      }
    });
  }

}
