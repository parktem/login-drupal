import { OnInit, Component} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { User } from '../../models/user.model';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  dataReceived: boolean = undefined;
  user: User;
  incorrectPassword = false;

  constructor(private loginService: LoginService, private appService: AppService, private router: Router) { }

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
        this.router.navigate(['/home']);
      }
    });
    this.loginService.dataResponded.subscribe(response => {
      this.dataReceived = response;
    });
  }

  onSignIn(form: NgForm) {
    this.incorrectPassword = false;
    const user = form.value.user;
    const password = form.value.password;
    console.log(form);
    this.user = new User(user, password);
    this.appService.suscribed.next(true);
    this.loginService.signIn(this.user).subscribe( data => {
      this.user.setusername(data['current_user']['name']);
      this.user.setUid(data['current_user']['uid']);
      this.user.setRoles(data['current_user']['roles']);
      this.user.setToken(data['access_token']);
      this.user.setCsrfToken(data['csrf_token']);
      localStorage.setItem('currentUser', JSON.stringify(
        {token: this.user.getToken(), uid: this.user.getUid(), csrf_token: this.user.getCsrfToken(), roles: this.user.getRoles(),
          admin: this.user.isAdministrator()
        }
        ));
      this.loginService.currentUser = this.user;
      this.appService.suscribed.next(false);
      this.router.navigate(['/home']);
    },
    err => this.incorrectPassword = true);
  }

  onRecoveryPassword(form: NgForm) {}

}
