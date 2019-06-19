import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user.model';
import { Subject, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogged: Subject<boolean> = new Subject();
  dataResponded: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  signIn(user: User) {
    let headersObject = new HttpHeaders();
    headersObject = headersObject.append('Authorization', 'Basic ' + btoa(user.getUsername() + ':' + user.getPassword()));
    return this.http.post('https://drupalcms.centos.local/router_test/test11', {}, {headers : headersObject})
    .pipe(
      catchError(val => {
        console.log(val['email']);
        return of(val);
      })
    );
  }

  signUp(user: User) {}

  signOut() {}

  recoveryPassword(user: User) {}

}
