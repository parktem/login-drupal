import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user.model';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogged: Subject<boolean> = new Subject();
  dataResponded: Subject<boolean> = new Subject();
  currentUser: User;

  constructor(private http: HttpClient) { }

  signIn(user: User) {
    let headersObject = new HttpHeaders();
    headersObject = headersObject.append('Authorization', 'Basic ' + btoa(user.getUsername() + ':' + user.getPassword()));
    return this.http.post('https://drupalcms.centos.local/router_test/test11', {}, {headers : headersObject});
  }

  signUp(user: User) {}

  signOut() {
    this.isLogged.next(false);
    this.currentUser = undefined;
  }

  recoveryPassword(user: User) {}

}
