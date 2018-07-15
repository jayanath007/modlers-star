import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatIconModule, MatButtonModule } from '@angular/material';
import { FacebookModule } from 'ngx-facebook';

const routes = [
  { path: '', pathMatch: 'full', component: UserProfileComponent  },
  // { path: '', component: UserProfileComponent },
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    FacebookModule.forRoot(),
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }
