import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RatingsPage } from './ratings.page';

const routes: Routes = [
  {
    path: '',
    component: RatingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RatingsPageRoutingModule {}
