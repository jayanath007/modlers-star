import { RouterModule } from '@angular/router';

import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule, MatButtonModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { AlbumCoreModule } from '../album-core/album-core.module';




const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [
    AlbumCoreModule,
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatButtonModule,
  ],
  declarations: [HomeComponent,
]
})
export class AlbumDesktopModule { }
