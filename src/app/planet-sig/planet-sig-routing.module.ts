import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanetSigPage } from './planet-sig.page';

const routes: Routes = [
  {
    path: '',
    component: PlanetSigPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanetSigPageRoutingModule {}
