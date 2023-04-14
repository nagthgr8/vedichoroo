import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import { AstroCallPage } from './astro-call.page';

const routes: Routes = [
  {
    path: '',
    component: AstroCallPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class AstroCallPageRoutingModule {}
