import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AstroCallPage } from './astro-call.page';

const routes: Routes = [
  {
    path: '',
    component: AstroCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AstroCallPageRoutingModule {}
