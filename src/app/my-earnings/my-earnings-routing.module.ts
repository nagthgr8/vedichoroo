import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyEarningsPage } from './my-earnings.page';

const routes: Routes = [
  {
    path: '',
    component: MyEarningsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyEarningsPageRoutingModule {}
