import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HouseInfoPageRoutingModule } from './house-info-routing.module';

import { HouseInfoPage } from './house-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HouseInfoPageRoutingModule
  ],
  declarations: [HouseInfoPage]
})
export class HouseInfoPageModule {}
