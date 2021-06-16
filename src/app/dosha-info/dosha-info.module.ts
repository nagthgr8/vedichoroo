import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { DoshaInfoPageRoutingModule } from './dosha-info-routing.module';

import { DoshaInfoPage } from './dosha-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    DoshaInfoPageRoutingModule
  ],
  declarations: [DoshaInfoPage]
})
export class DoshaInfoPageModule {}
