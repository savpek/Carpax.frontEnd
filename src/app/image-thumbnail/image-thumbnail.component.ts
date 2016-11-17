import { FileRepo, IFile } from '../data/FileRepo';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cx-image-thumbnail',
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.scss'],
  providers: []
})
export class ImageThumbnailComponent {

  @Input()
  public file: any;

  public isOpen = false;

  constructor(private fileRepo: FileRepo) {}

  public openImage() {
    this.isOpen = !this.isOpen;
  }

  public closeImage() {
    this.isOpen = false;
  }

  public delete(file: IFile) {
    this.fileRepo.delete(file);
  }
}
