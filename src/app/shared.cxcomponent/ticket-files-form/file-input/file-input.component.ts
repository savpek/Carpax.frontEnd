import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FileRepo } from 'app/data/FileRepo';

@Component({
  selector: 'cx-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent {
  @Input()
  public targetTicket: string;
  public uploadedfiles: any[] = [];

  constructor(private http: Http, private fileRepo: FileRepo) { }

  upload(event) {
    let files = event.srcElement.files;
    for (let i = 0; i < files.length; i++) {
      let formData: FormData = new FormData();
      formData.append('file', files[i]);

      this.fileRepo.upload(this.targetTicket, formData)
        .subscribe(x => {});
    }
  }
}
