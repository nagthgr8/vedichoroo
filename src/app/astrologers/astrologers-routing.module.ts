import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AstrologersPage } from './astrologers.page';

const routes: Routes = [
  {
    path: '',
    component: AstrologersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AstrologersPageRoutingModule {}
