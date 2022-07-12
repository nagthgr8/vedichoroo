import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AstrologerPage } from './astrologer.page';

const routes: Routes = [
  {
    path: '',
    component: AstrologerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AstrologerPageRoutingModule {}
