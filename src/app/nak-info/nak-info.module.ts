import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { NakInfoPageRoutingModule } from './nak-info-routing.module';

import { NakInfoPage } from './nak-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    NakInfoPageRoutingModule
  ],
  declarations: [NakInfoPage]
})
export class NakInfoPageModule {}
