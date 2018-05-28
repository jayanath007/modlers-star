import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home-desktop/home/home.component';
import { AuthGuard } from './core/auth.guard';


const routes: Routes = [
  { path: '', loadChildren: 'app/home-desktop/home-desktop.module#HomeDesktopModule' },
  { path: 'mobile', loadChildren: 'app/home-mobile/home-mobile.module#HomeMobileModule'  },
  { path: 'album', loadChildren: 'app/album-desktop/album-desktop.module#AlbumDesktopModule', canActivate: [AuthGuard] },
  { path: 'user', loadChildren: 'app/user-profile/user-profile.module#UserProfileModule' },
];

export const AppRouteRoutes = RouterModule.forRoot(routes);
