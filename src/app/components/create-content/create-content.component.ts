import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import Utils from 'src/app/utils/utils';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.css']
})
export class CreateContentComponent implements OnInit {

  display = true;
  bodyChanged: string;
  titleChanged: string;
  statusChanged = false;

  constructor(private contentService: ContentService) { }

  ngOnInit() {}

  onCreateContent() {
    const title = this.titleChanged;
    const body = Utils.formatBody(this.bodyChanged);
    console.log(this.statusChanged);
    this.contentService.createContent({title, body, status: this.statusChanged}).subscribe( data => {
      console.log(data);
      const id = data['nid'][0]['value'];
      const created = data['created'][0]['value'];
      this.contentService.articleUpload.next({title, body, status: this.statusChanged, id, created});
      this.contentService.displayCreateDialog.next(false);
    });
  }

  changeDisplay(status: boolean) {
    this.contentService.displayCreateDialog.next(status);
  }

}
