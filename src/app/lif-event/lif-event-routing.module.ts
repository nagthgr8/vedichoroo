import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LifEventPage } from './lif-event.page';

const routes: Routes = [
  {
    path: '',
    component: LifEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LifEventPageRoutingModule {}
