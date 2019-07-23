import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Content } from '../models/content.model';
import { URL_MODE } from '../properties/mode.properties';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  createContent(content: Content) {
    let currentUser: {token: string, uid: string, csrf_token: string};
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headersObject = new HttpHeaders();
    headersObject = headersObject.append('Content-Type', 'application/json');
    headersObject = headersObject.append('X-CSRF-Token', currentUser.csrf_token);
    headersObject = headersObject.append('Authorization', 'Bearer ' + currentUser.token);
    const body = {
      'title': [{
        'value': content.title
      }],
      'body': [{
        'value': content.body,
        'format': 'full_html'
      }],
      'type': [{
        'target_id': 'article'
      }],
      'status': [{
        'value': content.status
      }]
    };
    this.http.post(URL_MODE + '/entity/node?_format=json', body, {headers: headersObject}).subscribe( data => {
      console.log(data);
    });
  }

  editContent(content: Content, id: string) {
    let currentUser: {token: string, uid: string, csrf_token: string};
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headersObject = new HttpHeaders();
    headersObject = headersObject.append('Content-Type', 'application/json');
    headersObject = headersObject.append('X-CSRF-Token', currentUser.csrf_token);
    headersObject = headersObject.append('Authorization', 'Bearer ' + currentUser.token);
    const body = {
      'title': [{
        'value': content.title
      }],
      'body': [{
        'value': content.body,
        'format': 'full_html'
      }],
      'type': [{
        'target_id': 'article'
      }],
      'status': [{
        'value': content.status
      }]
    };
    this.http.patch(URL_MODE + '/node/' + id + '?_format=json', body, {headers: headersObject}).subscribe( data => {
      console.log(data);
    });
  }

  deleteContent(content: Content, id: string) {
    let currentUser: {token: string, uid: string, csrf_token: string};
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headersObject = new HttpHeaders();
    headersObject = headersObject.append('Content-Type', 'application/json');
    headersObject = headersObject.append('X-CSRF-Token', currentUser.csrf_token);
    headersObject = headersObject.append('Authorization', 'Bearer ' + currentUser.token);
    this.http.delete(URL_MODE + '/node/' + id + '?_format=json', {headers: headersObject}).subscribe( data => {
      console.log(data);
    });
  }

  getArticles(published: string = '1') {
    let currentUser: {token: string, uid: string, csrf_token: string};
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headersObject = new HttpHeaders();
    headersObject = headersObject.append('Content-Type', 'application/json');
    headersObject = headersObject.append('X-CSRF-Token', currentUser.csrf_token);
    headersObject = headersObject.append('Authorization', 'Bearer ' + currentUser.token);
    return this.http.get(URL_MODE + '/articles/' + published, {headers: headersObject});
  }

}
