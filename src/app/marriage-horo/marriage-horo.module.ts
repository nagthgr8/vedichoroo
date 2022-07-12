import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MarriageHoroPageRoutingModule } from './marriage-horo-routing.module';
import { MarriageHoroPage } from './marriage-horo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    MarriageHoroPageRoutingModule
  ],
  declarations: [MarriageHoroPage],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MarriageHoroPageModule {}
