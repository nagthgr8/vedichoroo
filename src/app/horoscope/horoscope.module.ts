import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HoroscopePageRoutingModule } from './horoscope-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { HoroscopePage } from './horoscope.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    HoroscopePageRoutingModule
  ],
  declarations: [HoroscopePage]
})
export class HoroscopePageModule {}
