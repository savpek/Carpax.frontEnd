import { FileEntry, FileRepo } from '../data/fileRepo';
import { Component, ElementRef, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'cx-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss']
})
export class FileInputComponent {
    @Input()
    public targetTicket: string;
    public uploadedfiles: any[] = [];

    constructor(private http: Http, private el: ElementRef, private fileRepo: FileRepo) {}

    upload() {
        let inputEl = this.el.nativeElement.getElementsByTagName('input')[0];

        for (let i = 0; i < inputEl.files.length; i++) {
          this.uploadedfiles.push({
            name: inputEl.files[i],
            ready: false
          });

          this.fileRepo.upload(this.targetTicket, inputEl.files[i]).subscribe()
        }
    }
}
