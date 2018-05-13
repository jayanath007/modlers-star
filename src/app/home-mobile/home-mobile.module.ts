import { CreateAlbumComponent } from '../album-desktop/create-album/create-album.component';
import { RouterModule } from '@angular/router';
import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DynamicFormModule } from '../shared/dynamic-form/dynamic-form.module';
import { HomeComponent } from './home/home.component';
import { HomeCoreModule } from '../home-core/home-core.module';
import { ImageGalleryModule } from '../shared/image-gallery/image-gallery.module';
import { CommentBoxDesktopModule } from '../shared/comment/comment-desktop/comment-box-desktop.module';
import { FlexLayoutModule } from '@angular/flex-layout';


const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [
    HomeCoreModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatListModule,
    FormsModule,
    ImageGalleryModule,
    CommentBoxDesktopModule,
    FlexLayoutModule,
  ],
  declarations: [
    HomeComponent,
]
})
export class HomeMobileModule { }
