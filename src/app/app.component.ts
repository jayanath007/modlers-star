
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './shared/Utils.service';
import { AuthService } from './core/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  links: Array<{ text: string, path: string }> = [];

  constructor(private router: Router, utilsService: UtilsService, public auth: AuthService) {
    if (utilsService.isMobile.any()) {
      this.router.resetConfig([
        { path: '', loadChildren: 'app/home-mobile/home-mobile.module#HomeMobileModule' },
        { path: 'album', loadChildren: 'app/album-desktop/album-desktop.module#AlbumDesktopModule' },
        { path: 'user', loadChildren: 'app/user-profile/user-profile.module#UserProfileModule' },
      ]);
    }
  }

}
