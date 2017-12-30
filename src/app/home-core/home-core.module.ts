import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from './service/home.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    HomeService,
  ],
})
export class HomeCoreModule { }
