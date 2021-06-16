import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import { DashTransPage } from './dash-trans.page';

const routes: Routes = [
  {
    path: '',
    component: DashTransPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class DashTransPageRoutingModule {}
