import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatToolbarModule,
  MatProgressBarModule,
  MatSelectModule
} from '@angular/material';



// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDO4WN4ugiloTsArr1KktR-nVZyJP8s1G8',
  authDomain: 'modlers-star.firebaseapp.com',
  databaseURL: 'https://modlers-star.firebaseio.com',
  projectId: 'modlers-star',
  storageBucket: 'modlers-star.appspot.com',
  messagingSenderId: '268108510880'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [

    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSelectModule,
    BrowserModule,
    FormsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
