import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cx-image-thumbnail',
  templateUrl: './image-thumbnail.component.html',
  styleUrls: ['./image-thumbnail.component.scss']
})
export class ImageThumbnailComponent implements OnInit {

  @Input()
  public file: any;

  public isOpen = false;

  constructor() {}

  ngOnInit() {
  }

  public openImage() {
    this.isOpen = !this.isOpen;
  }

  public closeImage() {
    this.isOpen = false;
  }

  public delete() {
  }
}
