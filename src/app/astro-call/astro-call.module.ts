import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { AstroCallPageRoutingModule } from './astro-call-routing.module';

import { AstroCallPage } from './astro-call.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AstroCallPageRoutingModule
  ],
  declarations: [AstroCallPage]
})
export class AstroCallPageModule {}
