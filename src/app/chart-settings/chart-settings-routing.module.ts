import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartSettingsPage } from './chart-settings.page';

const routes: Routes = [
  {
    path: '',
    component: ChartSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartSettingsPageRoutingModule {}
