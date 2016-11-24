import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileRepo, FileEntry } from '../data/fileRepo';

@Component({
  selector: 'cx-files-form',
  templateUrl: './files-form.component.html',
  styleUrls: ['./files-form.component.scss'],
  providers: [FileRepo]
})
export class FilesFormComponent {
  public files: FileEntry[] = [];
  public currentTicket: string;

  constructor(private fileRepo: FileRepo, private activeRoute: ActivatedRoute) {
      activeRoute.parent.params.subscribe(params =>
        fileRepo.Get(params['id']).subscribe(images => {
          this.files = images;
          this.currentTicket = params['id'];
      }));
  }

  public isImage(file: FileEntry): boolean {
    return !!['.jpg', '.jpeg', '.png', '.bmp', '.JPG'].find(x => x === file.extension);
  }
}