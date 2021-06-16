import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import { NakInfoPage } from './nak-info.page';

const routes: Routes = [
  {
    path: '',
    component: NakInfoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), TranslateModule],
  exports: [RouterModule],
})
export class NakInfoPageRoutingModule {}
