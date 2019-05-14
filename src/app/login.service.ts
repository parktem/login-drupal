import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from './models/user.model';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLogged: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  signIn(user: User){
    firebase.auth().signInWithEmailAndPassword(user.name, user.password)
    .then(
        response => {
          console.log(firebase.auth().currentUser.getIdToken()),
          firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              console.log('TOKEN:', token);
              this.isLogged.next(true);
            }
          );
        }
    );
  }
}
