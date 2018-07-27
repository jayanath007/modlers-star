import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-from',
  templateUrl: './search-from.component.html',
  styleUrls: ['./search-from.component.scss']
})
export class SearchFromComponent implements OnInit {

  constructor() { }
  tags = [];
  disabalePlaceholder = 'You can select only one tag for search';
  enabalePlaceholder = 'Select tag';

  ngOnInit() {
  }

  onTagListUpdated($event) {
    this.tags = $event;
  }

}
