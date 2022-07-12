import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RajayogaPageRoutingModule } from './rajayoga-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RajayogaPage } from './rajayoga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    RajayogaPageRoutingModule
  ],
  declarations: [RajayogaPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class RajayogaPageModule {}
