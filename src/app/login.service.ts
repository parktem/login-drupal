import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user.model';
import { Subject, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'; 

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
    headersObject = headersObject.append('Content-Type', 'application/json');
    headersObject = headersObject.append('Authorization', 'Basic ' + btoa(user.getUsername() + ':' + user.getPassword()));
    console.log('headersObject::', headersObject);
    return this.http.post('https://drupalcms.centos.local/user/login?_format=json', {
      name: user.getUsername(),
      pass: user.getPassword()
      } , {});
  }

  getProfile() {
    let currentUser: {token: string, uid: string};
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headersObject = new HttpHeaders();
    headersObject = headersObject.append('Authorization', 'Bearer ' + currentUser.token);
    return this.http.get('http://drupalcms.centos.local/perfil/usuario/' + currentUser.uid, {headers: headersObject});
  }

  delete(user: User) {
    let headersObject = new HttpHeaders();
    headersObject = headersObject.append('Authorization', 'Bearer ' + user.getToken());
    return this.http.delete('http://drupalcms.centos.local/api/users/' + 5, {headers: headersObject}).subscribe(data => {
    });
  }

  signUp(user: User) {

  }

  signOut() {
    localStorage.removeItem('currentUser');
    this.isLogged.next(false);
    this.currentUser = undefined;
  }

  isAuth() {
    let currentUser: {token: string, uid: string};
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headersObject = new HttpHeaders();
    if (currentUser !== null) {
      headersObject = headersObject.append('Authorization', 'Bearer ' + currentUser.token);
      return this.http.get('http://drupalcms.centos.local/session/auth/' + currentUser.uid, {headers: headersObject}).pipe(
        catchError(err => {
          this.isLogged.next(false);
          return of(false);
        }));
    } else {
      return of(false);
    }
  }

  recoveryPassword(user: User) {}

}
