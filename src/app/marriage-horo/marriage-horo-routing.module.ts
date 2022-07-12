import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import { MarriageHoroPage } from './marriage-horo.page';

const routes: Routes = [
  {
    path: '',
    component: MarriageHoroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class MarriageHoroPageRoutingModule {}
