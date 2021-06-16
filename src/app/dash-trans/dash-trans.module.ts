import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { DashTransPageRoutingModule } from './dash-trans-routing.module';

import { DashTransPage } from './dash-trans.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    DashTransPageRoutingModule
  ],
  declarations: [DashTransPage]
})
export class DashTransPageModule {}
