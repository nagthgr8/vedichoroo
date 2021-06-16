import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BtrPage } from './btr.page';

const routes: Routes = [
  {
    path: '',
    component: BtrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BtrPageRoutingModule {}
