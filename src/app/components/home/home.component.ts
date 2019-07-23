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
  displayEditDialog = false;
  displayDeleteDialog = false;
  titleChanged: string;
  bodyChanged: string;
  idSelected: string;

  constructor(private loginService: LoginService, private contentService: ContentService, private router: Router) {
    this.getArticles();
  }

  ngOnInit() {
    this.loginService.isAuth().subscribe( (data: any) => {
      console.log(data);
      if (data === false) {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });
  }

  getArticles() {
    this.contentService.getArticles().subscribe( data => {
      console.log(data);
      Object.values(data).forEach( article => {
        const articleFromApi = new Article();
        articleFromApi.body = article['body'];
        articleFromApi.title = article['title'];
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
    this.contentService.deleteContent({title : this.titleChanged, body: this.bodyChanged, status: true}, this.idSelected);
  }

}
