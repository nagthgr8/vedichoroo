import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChartAnalysisPage } from './chart-analysis.page';

const routes: Routes = [
  {
    path: '',
    component: ChartAnalysisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartAnalysisPageRoutingModule {}
