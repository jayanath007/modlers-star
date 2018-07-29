import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SerachUserService } from './serach-user.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith, map, switchMap } from 'rxjs/operators';
import { Search } from '../models/models';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  constructor(private serachUserService: SerachUserService) { }

  myControl = new FormControl();
  filteredOptions: Observable<Search[]>;
  @Output() searchTextChange = new EventEmitter<string>();


  ngOnInit() {


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(null),
      switchMap((value) => {
        return this.serachUserService.getUserByValue(value).map((item) => {
          return item.map(data => data);
        });
      })
    );

  }

  selected(event) {
    if (event.option.value) {
      const values = event.option.value.split('-');
      const search = values[1].trim().replace(' ', '.').toLowerCase() + '/'
      +  values[0].trim().replace(' ', '.').toLowerCase();
      this.searchTextChange.emit(search);
    }
  }
}
