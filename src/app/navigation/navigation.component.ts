import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cx-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public user : any = {
    name: "name",
    customerName: "customerName"
  }

  public partnerInfo: any = {
    id: "1234"
  }

  public isPartnerPage() : boolean {
    return false;
  }

  constructor() { }

  ngOnInit() {
  }

}
