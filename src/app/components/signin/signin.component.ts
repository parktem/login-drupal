import { OnInit, Component} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../login.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { User } from '../../models/user.model';

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
    this.user = new User(user, password);
    this.loginService.signIn(this.user).subscribe( data => {
      this.user.setusername(data['current_user']['name']);
      this.user.setUid(data['current_user']['uid']);
      this.user.setRoles(data['current_user']['roles']);
      this.user.setToken(data['access_token']);
      localStorage.setItem('currentUser', JSON.stringify({token: this.user.getToken(), uid: this.user.getUid()}));
      this.loginService.currentUser = this.user;
      this.router.navigate(['/home']);
    },
    err => this.incorrectPassword = true);
  }

  onRecoveryPassword(form: NgForm) {}

}
