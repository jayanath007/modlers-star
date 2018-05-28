import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatIconModule, MatButtonModule } from '@angular/material';

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
  ],
  declarations: [UserProfileComponent]
})
export class UserProfileModule { }
