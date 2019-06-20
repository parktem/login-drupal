import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  isAdministrator = false;
  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    console.log('llega');
    this.user = this.loginService.currentUser;
    if (this.user === undefined) {
      this.router.navigate(['']);
    }
    console.log(this.user);
  }

}
