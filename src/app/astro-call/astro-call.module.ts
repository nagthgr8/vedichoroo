import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AstroCallPageRoutingModule } from './astro-call-routing.module';

import { AstroCallPage } from './astro-call.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AstroCallPageRoutingModule
  ],
  declarations: [AstroCallPage]
})
export class AstroCallPageModule {}
