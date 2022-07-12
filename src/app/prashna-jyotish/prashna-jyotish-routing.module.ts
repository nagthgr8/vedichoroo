import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrashnaJyotishPage } from './prashna-jyotish.page';

const routes: Routes = [
  {
    path: '',
    component: PrashnaJyotishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrashnaJyotishPageRoutingModule {}
