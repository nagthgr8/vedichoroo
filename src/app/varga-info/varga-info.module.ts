import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VargaInfoPageRoutingModule } from './varga-info-routing.module';

import { VargaInfoPage } from './varga-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VargaInfoPageRoutingModule
  ],
  declarations: [VargaInfoPage]
})
export class VargaInfoPageModule {}
