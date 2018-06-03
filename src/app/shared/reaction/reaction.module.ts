import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactionComponent } from './reaction.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ReactionComponent,
    DatePipe
]
})
export class ReactionModule { }
