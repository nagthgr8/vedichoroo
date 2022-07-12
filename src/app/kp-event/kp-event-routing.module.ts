import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KpEventPage } from './kp-event.page';

const routes: Routes = [
  {
    path: '',
    component: KpEventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KpEventPageRoutingModule {}
