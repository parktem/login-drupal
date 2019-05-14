import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'login-drupal';
}

firebase.initializeApp({
  apiKey: "AIzaSyAnkyH8peI52bz62pIkPK61io4a3OvlGis",
  authDomain: "paginapeliculas-d7a99.firebaseapp.com"
});
