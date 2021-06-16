import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoneyhoroPage } from './moneyhoro.page';

const routes: Routes = [
  {
    path: '',
    component: MoneyhoroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoneyhoroPageRoutingModule {}
