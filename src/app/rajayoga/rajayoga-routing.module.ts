import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RajayogaPage } from './rajayoga.page';

const routes: Routes = [
  {
    path: '',
    component: RajayogaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RajayogaPageRoutingModule {}
