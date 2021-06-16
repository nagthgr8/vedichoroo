import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BtrDetailsPage } from './btr-details.page';

const routes: Routes = [
  {
    path: '',
    component: BtrDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BtrDetailsPageRoutingModule {}
