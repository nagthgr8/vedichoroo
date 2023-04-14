import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemoriesPage } from './memories.page';

const routes: Routes = [
  {
    path: '',
    component: MemoriesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MemoriesPageRoutingModule {}
