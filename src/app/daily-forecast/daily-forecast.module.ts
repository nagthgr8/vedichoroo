import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyForecastPageRoutingModule } from './daily-forecast-routing.module';

import { DailyForecastPage } from './daily-forecast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyForecastPageRoutingModule
  ],
  declarations: [DailyForecastPage]
})
export class DailyForecastPageModule {}
