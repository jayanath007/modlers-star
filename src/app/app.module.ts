import { UtilsService } from './shared/Utils.service';
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
import { AppRouteRoutes } from './app-route.routing';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule, MatFormFieldModule, MatSelectModule, MatIconModule,
  MatMenuModule, MatSidenavModule, MatListModule
} from '@angular/material';
import { environment } from '../environments/environment';
import { PaginationService } from './shared/pagination.service';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import { ScrollableDirective } from './shared/scrollable.directive';


// Initialize Firebase


@NgModule({
  declarations: [
    AppComponent,
    ScrollableDirective
  ],
  imports: [
    AppRouteRoutes,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
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
  ],
  providers: [UtilsService,
    PaginationService],

  bootstrap: [AppComponent]
})
export class AppModule { }
