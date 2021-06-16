import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BtrInfoPageRoutingModule } from './btr-info-routing.module';

import { BtrInfoPage } from './btr-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BtrInfoPageRoutingModule
  ],
  declarations: [BtrInfoPage]
})
export class BtrInfoPageModule {}
