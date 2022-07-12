import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyForecastPage } from './daily-forecast.page';

const routes: Routes = [
  {
    path: '',
    component: DailyForecastPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyForecastPageRoutingModule {}
