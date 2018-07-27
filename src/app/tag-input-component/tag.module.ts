
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagService } from './tag.service';
import { TagInputComponentComponent } from './tag-input-component.component';
import { MatChipsModule, MatIconModule, MatInputModule, MatAutocompleteModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MatChipsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  declarations: [TagInputComponentComponent],
  exports: [TagInputComponentComponent],
  providers: [TagService],
})
export class TagModule { }
