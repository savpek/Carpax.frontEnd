import { Component, Input, OnInit } from '@angular/core';
import { FileRepo, FileEntry } from '../../../data/fileRepo';

@Component({
  selector: 'cx-file-thumbnail',
  templateUrl: './file-thumbnail.component.html',
  styleUrls: ['./file-thumbnail.component.scss']
})
export class FileThumbnailComponent {

  @Input()
  public file: FileEntry;

  constructor(private fileRepo: FileRepo) {}

  public delete(file: FileEntry) {
    this.fileRepo.delete(file);
  }
}