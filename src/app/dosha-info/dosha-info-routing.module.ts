import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import { DoshaInfoPage } from './dosha-info.page';

const routes: Routes = [
  {
    path: '',
    component: DoshaInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class DoshaInfoPageRoutingModule {}
