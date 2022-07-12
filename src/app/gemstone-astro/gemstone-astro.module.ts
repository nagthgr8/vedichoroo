import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GemstoneAstroPageRoutingModule } from './gemstone-astro-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { GemstoneAstroPage } from './gemstone-astro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    GemstoneAstroPageRoutingModule
  ],
  declarations: [GemstoneAstroPage]
})
export class GemstoneAstroPageModule {}
