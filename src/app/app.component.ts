import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from './shared/Utils.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  links: Array<{ text: string, path: string }> = [];
  list = ['1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
  '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
  '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1',
   '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1'];
  constructor(private router: Router, utilsService: UtilsService) {
    if (utilsService.isMobile.any()) {
      this.router.resetConfig([
        { path: '', loadChildren: 'app/home-mobile/home-mobile.module#HomeMobileModule' },
        { path: 'album', loadChildren: 'app/album-desktop/album-desktop.module#AlbumDesktopModule' },
      ]);
    }
  }


}
