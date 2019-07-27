import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Subject, of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { URL_MODE } from '../properties/mode.properties';

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
    headersObject = headersObject.append('Access-Control-Allow-Origin', '*');
    headersObject = headersObject.append('Access-Control-Allow-Methods', 'GET, POST, DELETE');
    return this.http.post(URL_MODE + '/user/login?_format=json', {
      name: user.getUsername(),
      pass: user.getPassword()
      } , {headers: headersObject, observe: 'response'});
  }

  getProfile() {
    let currentUser: {token: string, uid: string};
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headersObject = new HttpHeaders();
    headersObject = headersObject.append('Authorization', 'Bearer ' + currentUser.token);
    console.log('headerObject::', headersObject);
    return this.http.get(URL_MODE + '/perfil/usuario/' + currentUser.uid, {headers: headersObject});
  }

  isAuth() {
    let currentUser: {token: string, uid: string};
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headersObject = new HttpHeaders();
    if (currentUser !== null) {
      headersObject = headersObject.append('Authorization', 'Bearer ' + currentUser.token);
      return this.http.get(URL_MODE + '/session/auth/' + currentUser.uid, {headers: headersObject}).pipe(
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
