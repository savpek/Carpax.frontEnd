import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cx-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private foo: any;

  constructor(private router: ActivatedRoute) {
    router.params.subscribe(x =>
      this.foo = x);
  }

  ngOnInit() {
  }
}
