import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HouseInfoPage } from './house-info.page';

const routes: Routes = [
  {
    path: '',
    component: HouseInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HouseInfoPageRoutingModule {}
