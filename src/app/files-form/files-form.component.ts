import { FileRepo, IFile } from '../data/FileRepo';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'cx-files-form',
  templateUrl: './files-form.component.html',
  styleUrls: ['./files-form.component.scss'],
  providers: [FileRepo]
})
export class FilesFormComponent {
  public files: IFile[] = [];

  constructor(private fileRepo: FileRepo, private activeRoute: ActivatedRoute) {
      activeRoute.parent.params.subscribe(params =>
      fileRepo.Get(params['id']).subscribe(images => {
        this.files = images;
      }));
  }
}