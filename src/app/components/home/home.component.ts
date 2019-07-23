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
  //<a href="/node/4" hreflang="en">Alejandro pruebalo</a>
  //Thu, 07/04/2019 - 09:31
  articles: Article[] = [];
  displayEditDialog = false;
  displayDeleteDialog = false;
  titleChanged: string;
  bodyChanged: string;
  idSelected: string;

  constructor(private loginService: LoginService, private contentService: ContentService, private router: Router) {
    this.getArticles();
  }

  lorem(): string {
    return 'Lorem ipsum dolor sit amet adipiscing bibendum sem orci tempus aliquet gravida, orci amet iaculis aptent blandit quam accumsan donec in facilisis, cursus ante curabitur aliquet condimentum tincidunt facilisis non cubilia lorem et pretium aliquam phasellus ipsum metus quisque auctor tristique donec nibh, praesent congue ultricies aenean ornare ligula sagittis proin sed vestibulum purus tempus aenean neque aliquam curae vivamus purus egestas ligula tincidunt nullam';
  }

  ngOnInit() {
    this.articles.push({title: 'Title 1', body: this.lorem(), created: '12', changed: '12', status: true, id: '1',})
    this.articles.push({title: 'Title 2', body: this.lorem(), created: '13', changed: '13', status: true, id: '2',})
    this.articles.push({title: 'Title 3', body: this.lorem(), created: '14', changed: '14', status: true, id: '3',})
    /*this.loginService.isAuth().subscribe( (data: any) => {
    console.log(data);
      if (data === false) {
        localStorage.clear();
        this.router.navigate(['/']);
      }
    });*/
  }

  getArticles() {
    /*this.contentService.getArticles().subscribe( data => {
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
    });*/
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
