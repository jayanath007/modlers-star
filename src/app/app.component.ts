
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilsService } from './shared/Utils.service';
import { AuthService } from './core/auth.service';
import { FacebookService, InitParams } from 'ngx-facebook';
import { AuthGuard } from './core/auth.guard';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  links: Array<{ text: string, path: string }> = [];

  constructor(private router: Router, utilsService: UtilsService,
    public auth: AuthService,
    private fb: FacebookService) {
    if (utilsService.isMobile.any()) {
      this.router.resetConfig([
        { path: '', loadChildren: 'app/home-mobile/home-mobile.module#HomeMobileModule' },
        { path: 'mobile', loadChildren: 'app/home-mobile/home-mobile.module#HomeMobileModule' },
        { path: 'album', loadChildren: 'app/album-desktop/album-desktop.module#AlbumDesktopModule', canActivate: [AuthGuard] },
        { path: 'user', loadChildren: 'app/user-profile/user-profile.module#UserProfileModule' },
      ]);
    }

    const initParams: InitParams = {
      appId: '1170263726357175',
      xfbml: true,
      version: 'v2.8'
    };

    fb.init(initParams);

  }

  searchOnChange(event) {
    this.router.navigate(['/modler/' + event]);
  }
  tagValueOnChange(event) {
    this.router.navigate(['/modler/category/' + event]);
  }


}
