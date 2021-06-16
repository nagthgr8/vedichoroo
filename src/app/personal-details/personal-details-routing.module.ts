import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalDetailsPage } from './personal-details.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalDetailsPageRoutingModule {}
