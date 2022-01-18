import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '',
    loadChildren:
      './website-content/website-content.module#WebsiteContentModule'
  },
  // {
  //   path: 'website-content',
  //   loadChildren:
  //     './website-content/website-content.module#WebsiteContentModule'
  // }
];
