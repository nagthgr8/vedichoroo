import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BtrDetailRelPageRoutingModule } from './btr-detail-rel-routing.module';

import { BtrDetailRelPage } from './btr-detail-rel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BtrDetailRelPageRoutingModule
  ],
  declarations: [BtrDetailRelPage]
})
export class BtrDetailRelPageModule {}
