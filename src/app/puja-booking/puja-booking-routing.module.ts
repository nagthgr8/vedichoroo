import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PujaBookingPage } from './puja-booking.page';

const routes: Routes = [
  {
    path: '',
    component: PujaBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PujaBookingPageRoutingModule {}
