import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileRepo, FileEntry } from '../../data/fileRepo';

@Component({
  selector: 'cx-ticket-files-form',
  templateUrl: './ticket-files-form.component.html',
  styleUrls: ['./ticket-files-form.component.scss'],
  providers: [FileRepo]
})
export class TicketFilesFormComponent {
  public files: FileEntry[] = [];
  public currentTicket: string;

  @Input()
  set ticketId(value: string) {
    this.currentTicket = value;
    this.fileRepo.Get(value).subscribe(images => {
          this.files = images;
          this.currentTicket = value;
    });
  }

  constructor(private fileRepo: FileRepo, private activeRoute: ActivatedRoute) {}

  public isImage(file: FileEntry): boolean {
    return !!['.jpg', '.jpeg', '.png', '.bmp', '.JPG'].find(x => x === file.extension);
  }
}