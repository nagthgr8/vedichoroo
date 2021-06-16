import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YogaInfoPage } from './yoga-info.page';

const routes: Routes = [
  {
    path: '',
    component: YogaInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YogaInfoPageRoutingModule {}
