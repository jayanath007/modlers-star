import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from './service/album.service';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AlbumService,
  ],
})
export class AlbumCoreModule { }
