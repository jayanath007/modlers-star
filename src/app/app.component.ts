import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';
import { Component, HostListener, ElementRef } from '@angular/core';
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

  constructor(private router: Router, utilsService: UtilsService, public el: ElementRef) {
    if (utilsService.isMobile.any()) {
      this.router.resetConfig([
        { path: '', loadChildren: 'app/home-mobile/home-mobile.module#HomeMobileModule' },
        { path: 'album', loadChildren: 'app/album-desktop/album-desktop.module#AlbumDesktopModule' },
        { path: 'user', loadChildren: 'app/user-profile/user-profile.module#UserProfileModule' },
      ]);
    }
  
  }

}
