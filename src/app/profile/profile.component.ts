import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
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
  display = false;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.getProfile().subscribe( data => {
      console.log(data);
      this.user = new User();
      const roles: string = data[0]['roles_target_id'];
      this.user.setRoles(roles.split(', '));
      this.display = true;
    });
  }

  ngOnInit() {
    this.loginService.isAuth().subscribe( (data: any) => {
      if (data === false) {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }

}
