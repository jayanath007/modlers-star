
import { CoreModule } from './core/core.module';
import { UtilsService } from './shared/Utils.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import 'firebase/storage'; // global firebase storage js;
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRouteRoutes } from './app-route.routing';
import {
  MatButtonModule,
  MatToolbarModule,
  MatCardModule, MatFormFieldModule, MatSelectModule, MatIconModule,
  MatMenuModule, MatSidenavModule, MatListModule, MatInputModule,
  MatAutocompleteModule, MatChipsModule
} from '@angular/material';

import { PaginationService } from './shared/pagination.service';
import { HttpClientModule } from '@angular/common/http';
import { ScrollableDirective } from './shared/scrollable.directive';
import { SearchBoxComponent } from './search-box/search-box.component';
import { SearchFromComponent } from './search-from/search-from.component';
import {MatRadioModule} from '@angular/material/radio';
import { SerachUserService } from './search-box/serach-user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FacebookModule } from 'ngx-facebook';
import { TagModule } from './tag-input-component/tag.module';

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
    SearchBoxComponent,
    SearchFromComponent,
],
  imports: [
    AppRouteRoutes,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    CoreModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    HttpClientModule,
    MatInputModule,
    MatRadioModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FacebookModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'photo-gallery' }),
    BrowserTransferStateModule,
    TagModule
  ],
  providers: [UtilsService,
    SerachUserService,
    PaginationService],

  bootstrap: [AppComponent]
})
export class AppModule { }
