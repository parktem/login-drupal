import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/services/content.service';
import { Article } from 'src/app/models/article.model';
import Utils from 'src/app/utils/utils';
import { AppService } from 'src/app/services/app.service';
import { CookieService } from 'angular2-cookie/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: Article[] = [];
  articlesAux: Article[] = [];
  displayEditDialog = false;
  displayDeleteDialog = false;
  displayCreateDialog = false;
  titleChanged: string;
  bodyChanged: string;
  statusChanged: boolean;
  idSelected: string;
  searchValue: string;

  constructor(private loginService: LoginService, private appService: AppService,
              private contentService: ContentService, private router: Router, private cookieService: CookieService) {
      this.getArticles();
      console.log(this.cookieService.get('SSESSacb3351bc1b9468f6cb1a99299820b2c'));
  }

  ngOnInit() {
    this.contentService.displayCreateDialog.subscribe( (data: boolean) => {
      this.displayCreateDialog = data;
    });
    this.contentService.articleUpload.subscribe( (data: Article) => {
      this.articles.unshift(data);
    });
  }

  getArticles() {
    this.contentService.getArticlesPublished().subscribe( data => {
      console.log(this.articles);
      console.log(data);
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
      this.articlesAux = this.articles;
    });

    this.contentService.getArticlesNotPublished().subscribe( data => {
      console.log(this.articles);
      console.log(data);
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
      this.articlesAux = this.articles;
    });
  }

  openDialog(title: string, body: string, id: string, status: boolean) {
    this.displayEditDialog = true;
    this.titleChanged = title;
    this.bodyChanged = body;
    this.idSelected = id;
    this.statusChanged = status;
  }

  onEdit() {
    this.contentService.editContent({title : this.titleChanged, body: Utils.formatBody(this.bodyChanged), status: this.statusChanged}
    , this.idSelected).subscribe( data => {
        this.articles.find(a => a.id === this.idSelected).title = this.titleChanged;
        this.articles.find(a => a.id === this.idSelected).body = Utils.formatBody(this.bodyChanged);
        this.articles.find(a => a.id === this.idSelected).status = this.statusChanged;
      });
  }

  onDelete() {
    this.articles = this.articles.filter(a => a.id !== this.idSelected);
    this.contentService.deleteContent({title : this.titleChanged, body: this.bodyChanged, status: true}, this.idSelected);
  }

  filterByTitle() {
    if (this.searchValue !== '') {
      this.articles = this.articlesAux.filter(a => a.title.toLowerCase().includes(this.searchValue.toLowerCase()));
    } else {
      this.articles = this.articlesAux;
    }
  }

}
