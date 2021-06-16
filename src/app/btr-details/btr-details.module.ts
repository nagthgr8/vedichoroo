import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BtrDetailsPageRoutingModule } from './btr-details-routing.module';

import { BtrDetailsPage } from './btr-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BtrDetailsPageRoutingModule
  ],
  declarations: [BtrDetailsPage]
})
export class BtrDetailsPageModule {}
