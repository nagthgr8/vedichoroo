import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VargaInfoPage } from './varga-info.page';

const routes: Routes = [
  {
    path: '',
    component: VargaInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VargaInfoPageRoutingModule {}
