import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.loginService.isAuth().subscribe( (data: any) => {
      if (data === false) {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }

}
