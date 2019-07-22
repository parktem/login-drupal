import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  articles: Article[] = [];
  display = false;

  constructor(private loginService: LoginService, private contentService: ContentService, private router: Router) {
    this.getArticles();
  }

  ngOnInit() {
    this.loginService.isAuth().subscribe( (data: any) => {
      if (data === false) {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }

  getArticles() {
    this.contentService.getArticles().subscribe( data => {
      Object.values(data['data']).forEach( article => {
        const articleFromApi = new Article();
        articleFromApi.body = article['attributes']['body']['value'];
        articleFromApi.title = article['attributes']['title'];
        articleFromApi.id = article['id'];
        articleFromApi.created = article['attributes']['created'];
        articleFromApi.changed = article['attributes']['changed'];
        articleFromApi.status = article['attributes']['status'];
        this.articles.push(articleFromApi);
      });
    });
  }

}
