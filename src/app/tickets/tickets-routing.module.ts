import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TicketsPage } from './tickets.page';

const routes: Routes = [
  {
    path: '',
    component: TicketsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TicketsPageRoutingModule {}
