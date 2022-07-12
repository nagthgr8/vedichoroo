import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import { StarConstPage } from './star-const.page';

const routes: Routes = [
  {
    path: '',
    component: StarConstPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class StarConstPageRoutingModule {}
