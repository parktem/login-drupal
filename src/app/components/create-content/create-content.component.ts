import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {

  signinForm: FormGroup;

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.signinForm = new FormGroup({
      title: new FormControl(null,
      [Validators.required
      ]),
      body: new FormControl(null,
        [Validators.required]),
      status: new FormControl(null,
        [Validators.required])
    });
  }

  onCreateContent(form: NgForm){
    const title = form.value.title;
    const body = form.value.body;
    const status = form.value.status;
    this.contentService.article.next();
    this.contentService.createContent({title, body, status});
  }

}
