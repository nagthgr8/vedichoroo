import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpTransitPage } from './kp-transit.page';

const routes: Routes = [
  {
    path: '',
    component: KpTransitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KpTransitPageRoutingModule {}
