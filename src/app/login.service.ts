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
  dataResponded: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  signIn(user: User) {
    this.dataResponded.next(true);
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(
      response => {
          console.log(firebase.auth().currentUser.getIdToken()),
          firebase.auth().currentUser.getIdToken()
          .then(
            (token: string) => {
              this.isLogged.next(true);
            }
          );
        }
    ).catch(
      response => {
        console.log('correo erroneo'),
        this.dataResponded.next(false);
      }
    );
  }

  signUp(user: User) {
    this.dataResponded.next(true);
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(
      response => {
        this.signIn(user);
      }
    );
  }

  signOut() {
    firebase.auth().signOut();
    this.isLogged.next(false);
  }

  recoveryPassword(user: User) {
    firebase.auth().sendPasswordResetEmail(user.email);
  }
}
