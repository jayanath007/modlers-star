import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { timeout } from 'q';
import { DynamicFormComponent } from '../../shared/dynamic-form/containers/dynamic-form/dynamic-form.component';
import { FieldConfig } from '../../shared/dynamic-form/models/field-config.interface';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements AfterViewInit {

  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  constructor() { }

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    }
  ];

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });
    setTimeout(() => {
      // this.form.setDisabled('submit', true);
      this.form.setValue('name', 'lushan jayanath');
    }, 1);
  }

  submit(value: { [name: string]: any }) {
    console.log(value);
  }

}
