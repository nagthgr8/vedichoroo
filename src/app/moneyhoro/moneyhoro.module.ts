import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MoneyhoroPageRoutingModule } from './moneyhoro-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MoneyhoroPage } from './moneyhoro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    MoneyhoroPageRoutingModule
  ],
  declarations: [MoneyhoroPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MoneyhoroPageModule {}
