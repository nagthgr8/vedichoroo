import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShadBalaPage } from './shad-bala.page';

const routes: Routes = [
  {
    path: '',
    component: ShadBalaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShadBalaPageRoutingModule {}
