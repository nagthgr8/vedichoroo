import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PanchangPageRoutingModule } from './panchang-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PanchangPage } from './panchang.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    PanchangPageRoutingModule
  ],
  declarations: [PanchangPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class PanchangPageModule {}
