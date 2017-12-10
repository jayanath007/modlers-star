import { RouterModule } from '@angular/router';

import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { AlbumCoreModule } from '../album-core/album-core.module';
import { AddAlbumComponent } from './add-album/add-album.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'addImages', component: AddAlbumComponent }
];

@NgModule({
  imports: [
    AlbumCoreModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
  ],
  declarations: [HomeComponent,
    AddAlbumComponent
  ]
})
export class AlbumDesktopModule { }
