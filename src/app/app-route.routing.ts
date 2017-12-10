import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: 'app/album-desktop/album-desktop.module#AlbumDesktopModule' },
];

export const AppRouteRoutes = RouterModule.forRoot(routes);
