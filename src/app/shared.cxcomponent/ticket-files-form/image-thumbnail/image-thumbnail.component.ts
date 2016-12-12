import { FileRepo, FileEntry } from '../../../data/fileRepo';
import { Component, Input } from '@angular/core';

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

  public delete(file: FileEntry) {
    this.fileRepo.delete(file);
  }
}
