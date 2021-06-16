import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BtrInfoPage } from './btr-info.page';

const routes: Routes = [
  {
    path: '',
    component: BtrInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BtrInfoPageRoutingModule {}
