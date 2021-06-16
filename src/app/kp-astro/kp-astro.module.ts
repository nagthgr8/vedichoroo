import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { KpAstroPageRoutingModule } from './kp-astro-routing.module';

import { KpAstroPage } from './kp-astro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
	TranslateModule,
    IonicModule,
    KpAstroPageRoutingModule
  ],
  declarations: [KpAstroPage]
})
export class KpAstroPageModule {}
