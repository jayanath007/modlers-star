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
      ]);
    }
  }

  scrollHandler(event) {
    try {
      const top = event.target.scrollTop;
      const height = event.target.scrollHeight;
      const offset = event.target.offsetHeight;
      if (top > height - offset - 1) {
        console.log('bottom');
      }
      if (top === 0) {
         console.log('top');
      }

    } catch (err) { }
    // should log top or bottom
  }


}
