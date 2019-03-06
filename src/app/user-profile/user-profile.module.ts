import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule } from '@angular/router';
import {
  MatCardModule, MatIconModule, MatButtonModule,
  MatProgressBarModule,
  MatInputModule
} from '@angular/material';
import { FacebookModule } from 'ngx-facebook';
import { FlexLayoutModule } from '../../../node_modules/@angular/flex-layout';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

const routes = [
  { path: '', pathMatch: 'full', component: UserProfileComponent },
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
    FlexLayoutModule,
    MatProgressBarModule,
    MatInputModule,
    FormsModule,
    AngularFontAwesomeModule,
  ],
  declarations: [UserProfileComponent, SignUpComponent]
})
export class UserProfileModule { }
