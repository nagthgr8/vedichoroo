import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegAstPage } from './reg-ast.page';

const routes: Routes = [
  {
    path: '',
    component: RegAstPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegAstPageRoutingModule {}
