import { CreateAlbumComponent } from '../album-desktop/create-album/create-album.component';
import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { AlbumCoreModule } from '../album-core/album-core.module';
import { AddAlbumComponent } from './add-album/add-album.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicFormModule } from '../shared/dynamic-form/dynamic-form.module';
import { StarRatingModule } from 'angular-star-rating';



const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'addImages' },

  { path: 'addImages', component: AddAlbumComponent },
  { path: 'createAlbum', component: CreateAlbumComponent },
  { path: 'AddAlbum', component: AddAlbumComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    DynamicFormModule,
    CommonModule,
    AlbumCoreModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    // ImageUploadModule,
    StarRatingModule,
  ],
  declarations: [
    AddAlbumComponent,
    CreateAlbumComponent,
  ]
})
export class AlbumDesktopModule { }
