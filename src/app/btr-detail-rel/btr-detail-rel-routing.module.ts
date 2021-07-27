import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BtrDetailRelPage } from './btr-detail-rel.page';

const routes: Routes = [
  {
    path: '',
    component: BtrDetailRelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BtrDetailRelPageRoutingModule {}
