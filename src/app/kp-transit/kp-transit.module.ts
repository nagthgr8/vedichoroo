import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KpTransitPageRoutingModule } from './kp-transit-routing.module';

import { KpTransitPage } from './kp-transit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KpTransitPageRoutingModule
  ],
  declarations: [KpTransitPage]
})
export class KpTransitPageModule {}
