import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AstakvargaPage } from './astakvarga.page';

const routes: Routes = [
  {
    path: '',
    component: AstakvargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AstakvargaPageRoutingModule {}
