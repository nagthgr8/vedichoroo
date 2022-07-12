import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessengerPage } from './messenger.page';

const routes: Routes = [
  {
    path: '',
    component: MessengerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessengerPageRoutingModule {}
