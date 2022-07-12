import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransitPredictionsPage } from './transit-predictions.page';

const routes: Routes = [
  {
    path: '',
    component: TransitPredictionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransitPredictionsPageRoutingModule {}
