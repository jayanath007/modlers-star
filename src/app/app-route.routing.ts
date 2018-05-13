import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home-desktop/home/home.component';


const routes: Routes = [
  { path: '', loadChildren: 'app/home-desktop/home-desktop.module#HomeDesktopModule' },
  { path: 'mobile', loadChildren: 'app/home-mobile/home-mobile.module#HomeMobileModule' },

  { path: 'album', loadChildren: 'app/album-desktop/album-desktop.module#AlbumDesktopModule' },
];

export const AppRouteRoutes = RouterModule.forRoot(routes);
