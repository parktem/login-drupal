import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Content } from '../models/content.model';

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
    this.http.post('https://drupalcms.centos.local/entity/node?_format=json', body, {headers: headersObject}).subscribe( data => {
      console.log(data);
    });
  }

  getArticles() {
    return this.http.get('http://drupalcms.centos.local/api/node/article');
  }

}
