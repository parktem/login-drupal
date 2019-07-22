import { Component, OnInit, Input } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() isLogged: boolean;

  constructor(private loginService: LoginService, private router: Router) {
  }

  ngOnInit() {}

  onSignOut() {
   // this.loginService.signOut();
  }
}
