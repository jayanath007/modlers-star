import { CoreModule } from './core/core.module';
import { UtilsService } from './shared/Utils.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import 'firebase/storage'; // global firebase storage js;
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouteRoutes } from './app-route.routing';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule, MatFormFieldModule, MatSelectModule, MatIconModule,
  MatMenuModule, MatSidenavModule, MatListModule ,MatInputModule
} from '@angular/material';

import { PaginationService } from './shared/pagination.service';
import { HttpClientModule } from '@angular/common/http';
import { ScrollableDirective } from './shared/scrollable.directive';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchBoxComponent } from './search-box/search-box.component';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDO4WN4ugiloTsArr1KktR-nVZyJP8s1G8',
  authDomain: 'modlers-star.firebaseapp.com',
  databaseURL: 'https://modlers-star.firebaseio.com',
  projectId: 'modlers-star',
  storageBucket: 'modlers-star.appspot.com',
  messagingSenderId: '268108510880'
};
// AppDatePipe

@NgModule({
  declarations: [
    AppComponent,
    ScrollableDirective,
    SearchBarComponent,
    SearchBoxComponent
],
  imports: [
    AppRouteRoutes,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    CoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    BrowserModule,
    FlexLayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatInputModule,
  ],
  providers: [UtilsService,
    PaginationService],

  bootstrap: [AppComponent]
})
export class AppModule { }
