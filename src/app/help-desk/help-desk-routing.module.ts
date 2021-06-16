import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpDeskPage } from './help-desk.page';

const routes: Routes = [
  {
    path: '',
    component: HelpDeskPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HelpDeskPageRoutingModule {}
