import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YogaInfoPageRoutingModule } from './yoga-info-routing.module';

import { YogaInfoPage } from './yoga-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YogaInfoPageRoutingModule
  ],
  declarations: [YogaInfoPage]
})
export class YogaInfoPageModule {}
