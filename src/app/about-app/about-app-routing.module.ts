import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutAppPage } from './about-app.page';

const routes: Routes = [
  {
    path: '',
    component: AboutAppPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutAppPageRoutingModule {}
