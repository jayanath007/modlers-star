
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule, MatIconModule,
   ErrorStateMatcher, ShowOnDirtyErrorStateMatcher, MatSnackBarModule,
    MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { AlbumCoreModule } from '../album-core/album-core.module';
import { AddAlbumComponent } from './add-album/add-album.component';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileDropDirective } from './image-upload/file-drop.directive';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { TagInputComponentComponent } from './tag-input-component/tag-input-component.component';

const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'addImages' },

  { path: 'addImages', component: AddAlbumComponent },
  { path: 'AddAlbum', component: AddAlbumComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AlbumCoreModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  declarations: [
    AddAlbumComponent,
    ImageUploadComponent,
    FileDropDirective,
    TagInputComponentComponent
  ],
  providers: [{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}],
})
export class AlbumDesktopModule { }
