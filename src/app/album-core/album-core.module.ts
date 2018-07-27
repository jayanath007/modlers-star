import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumService } from './service/album.service';
import { TagService } from '../tag-input-component/tag.service';




@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AlbumService,
    TagService
  ],
})
export class AlbumCoreModule { }
