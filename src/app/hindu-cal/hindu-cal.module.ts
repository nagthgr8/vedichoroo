import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HinduCalPageRoutingModule } from './hindu-cal-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HinduCalPage } from './hindu-cal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    HinduCalPageRoutingModule
  ],
  declarations: [HinduCalPage]
})
export class HinduCalPageModule {}
