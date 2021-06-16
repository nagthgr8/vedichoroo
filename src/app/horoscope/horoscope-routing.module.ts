import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';

import { HoroscopePage } from './horoscope.page';

const routes: Routes = [
  {
    path: '',
    component: HoroscopePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class HoroscopePageRoutingModule {}
