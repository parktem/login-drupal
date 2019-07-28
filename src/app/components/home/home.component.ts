import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { Article } from 'src/app/models/article.model';
import Utils from 'src/app/utils/utils';
import { AppService } from 'src/app/services/app.service';
import { CookieService } from "angular2-cookie/core";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  displayEditDialog = false;
  displayDeleteDialog = false;
  displayCreateDialog = false;
  titleChanged: string;
  bodyChanged: string;
  idSelected: string;

  constructor(private loginService: LoginService, private appService: AppService,
              private contentService: ContentService, private router: Router, private cookieService: CookieService) {
      this.getArticles();
      console.log(this.cookieService.get('SSESSacb3351bc1b9468f6cb1a99299820b2c'));
  }

  ngOnInit() {

    this.contentService.articleUpload.subscribe( (data: Article) => {
      this.articles.unshift(data);
    });

    this.loginService.isAuth().subscribe( (data: any) => {
      if (data === false) {
        console.log('false');
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }

  getArticles() {
    this.contentService.getArticles().subscribe( data => {
      Object.values(data).forEach( article => {
        const articleFromApi = new Article();
        articleFromApi.body = article.body;
        articleFromApi.title = article.title;
        articleFromApi.title = Utils.formatTitle(articleFromApi.title);
        articleFromApi.id = article['nid'];
        articleFromApi.created = article['created'];
        articleFromApi.changed = article['changed'];
        articleFromApi.status = article['status'];
        this.articles.push(articleFromApi);
      });
    });
  }

  openDialog(title: string, body: string, id: string){
    this.displayEditDialog = true;
    this.titleChanged = title;
    this.bodyChanged = body;
    this.idSelected = id;
  }

  onEdit() {
    this.contentService.editContent({title : this.titleChanged, body: this.bodyChanged, status: true}, this.idSelected);
  }

  onDelete() {
    this.articles = this.articles.filter(a => a.id !== this.idSelected);
    this.contentService.deleteContent({title : this.titleChanged, body: this.bodyChanged, status: true}, this.idSelected);
  }

}
