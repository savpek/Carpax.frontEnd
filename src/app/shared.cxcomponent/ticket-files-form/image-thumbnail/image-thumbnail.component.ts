import { FileRepo, FileEntry } from '../../../data/fileRepo';
import { Component, Input } from '@angular/core';
import { CxModal } from '../../../service/modal';

@Component({
  selector: 'cx-image-thumbnail',
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.scss'],
  providers: [CxModal]
})
export class ImageThumbnailComponent {

  @Input()
  public file: any;

  constructor(private fileRepo: FileRepo, private modal: CxModal) {}

  public openImage(image) {
    this.modal.show.alert()
        .size('lg')
        .okBtn('Sulje')
        .body(`<img src="${image.uri}" class="image-in-modal" />`)
        .open();
  }

  public closeImage() {
  }

  public delete(file: FileEntry) {
    this.fileRepo.delete(file);
  }
}
