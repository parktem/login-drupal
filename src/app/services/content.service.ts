import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Content } from '../models/content.model';
import { URL_MODE } from '../properties/mode.properties';
import { Article } from '../models/article.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  articleUpload: Subject<Article> = new Subject();
  displayCreateDialog: Subject<boolean> = new Subject();

  constructor(private http: HttpClient) { }

  createContent(content: Content): Observable<any> {
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
    return this.http.post(URL_MODE + '/entity/node?_format=json', body, {headers: headersObject});
  }

  editContent(content: Content, id: string): Observable<any> {
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
    return this.http.patch(URL_MODE + '/node/' + id + '?_format=json', body, {headers: headersObject});
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

  getArticlesPublished() {
    let currentUser: {token: string, uid: string, csrf_token: string};
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headersObject = new HttpHeaders();
    headersObject = headersObject.append('Content-Type', 'application/json');
    headersObject = headersObject.append('X-CSRF-Token', currentUser.csrf_token);
    headersObject = headersObject.append('Authorization', 'Bearer ' + currentUser.token);
    return this.http.get(URL_MODE + '/articles/1', {headers: headersObject});
  }

  getArticlesNotPublished() {
    let currentUser: {token: string, uid: string, csrf_token: string};
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let headersObject = new HttpHeaders();
    headersObject = headersObject.append('Content-Type', 'application/json');
    headersObject = headersObject.append('X-CSRF-Token', currentUser.csrf_token);
    headersObject = headersObject.append('Authorization', 'Bearer ' + currentUser.token);
    return this.http.get(URL_MODE + '/articles/0', {headers: headersObject});
  }

}
