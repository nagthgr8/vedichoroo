import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import { GemstoneAstroPage } from './gemstone-astro.page';

const routes: Routes = [
  {
    path: '',
    component: GemstoneAstroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),TranslateModule],
  exports: [RouterModule],
})
export class GemstoneAstroPageRoutingModule {}
