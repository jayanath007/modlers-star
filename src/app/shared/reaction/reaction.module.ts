import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactionComponent } from './reaction.component';
import { DatePipe } from '.c:/Users/Jayanath/Desktop/PhotoGallery/src/app/shared/date.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReactionComponent,
    DatePipe
]
})
export class ReactionModule { }
