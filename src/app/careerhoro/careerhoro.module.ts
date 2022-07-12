import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CareerhoroPageRoutingModule } from './careerhoro-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CareerhoroPage } from './careerhoro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    CareerhoroPageRoutingModule
  ],
  declarations: [CareerhoroPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CareerhoroPageModule {}
