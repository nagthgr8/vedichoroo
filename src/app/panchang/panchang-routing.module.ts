import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanchangPage } from './panchang.page';

const routes: Routes = [
  {
    path: '',
    component: PanchangPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanchangPageRoutingModule {}
