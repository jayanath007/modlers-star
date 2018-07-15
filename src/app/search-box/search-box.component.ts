import { Component, OnInit } from '@angular/core';
import { SerachUserService } from './serach-user.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { startWith, map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {

  constructor(private serachUserService: SerachUserService) { }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {


    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(null),
      switchMap((value) => {
        return this.serachUserService.getUserByValue(value).map((item) => {
          return item.map(data => data['displayName']);
        });
      })
    );

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
