import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CareerhoroPage } from './careerhoro.page';

const routes: Routes = [
  {
    path: '',
    component: CareerhoroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CareerhoroPageRoutingModule {}
