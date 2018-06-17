
import { CreateAlbumComponent } from '../album-desktop/create-album/create-album.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { AlbumCoreModule } from '../album-core/album-core.module';
import { AddAlbumComponent } from './add-album/add-album.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { DynamicFormModule } from '../shared/dynamic-form/dynamic-form.module';
import { FileDropDirective } from './image-upload/file-drop.directive';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

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
    MatProgressBarModule
  ],
  declarations: [
    AddAlbumComponent,
    CreateAlbumComponent,
    ImageUploadComponent,
    FileDropDirective
  ],
  providers: [],
})
export class AlbumDesktopModule { }
