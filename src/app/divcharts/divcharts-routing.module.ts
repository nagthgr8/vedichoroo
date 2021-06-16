import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DivchartsPage } from './divcharts.page';

const routes: Routes = [
  {
    path: '',
    component: DivchartsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivchartsPageRoutingModule {}
