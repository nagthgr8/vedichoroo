import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PujalistPage } from './pujalist.page';

const routes: Routes = [
  {
    path: '',
    component: PujalistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PujalistPageRoutingModule {}
