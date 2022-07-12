import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AstroChatPage } from './astro-chat.page';

const routes: Routes = [
  {
    path: '',
    component: AstroChatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AstroChatPageRoutingModule {}
