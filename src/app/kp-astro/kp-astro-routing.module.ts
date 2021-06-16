import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import { KpAstroPage } from './kp-astro.page';

const routes: Routes = [
  {
    path: '',
    component: KpAstroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class KpAstroPageRoutingModule {}
