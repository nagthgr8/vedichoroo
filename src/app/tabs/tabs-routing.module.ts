import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: '',
        children: [
          {
            path: 'home',
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: '',
        children: [
          {
            path: 'report',
            loadChildren: () => import('../report/report.module').then( m => m.ReportPageModule)
          }
        ]
      },
      {
        path: '',
        children: [
          {
            path: 'hindu-cal',
            loadChildren: () => import('../hindu-cal/hindu-cal.module').then( m => m.HinduCalPageModule)
          }
        ]
      },
      {
        path: '',
        children: [
          {
            path: 'about-app',
            loadChildren: () => import('../about-app/about-app.module').then( m => m.AboutAppPageModule)
          }
        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
