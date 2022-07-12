import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartSettingsPageRoutingModule } from './chart-settings-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ChartSettingsPage } from './chart-settings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    ChartSettingsPageRoutingModule
  ],
  declarations: [ChartSettingsPage]
})
export class ChartSettingsPageModule {}
