import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import 'firebase/storage'; // global firebase storage js;
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatToolbarModule
} from '@angular/material';
import { AppRouteRoutes } from './app-route.routing';



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
    AppComponent,
],
  imports: [
    AppRouteRoutes,
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
