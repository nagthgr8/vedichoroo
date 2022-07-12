import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DivchartsPageRoutingModule } from './divcharts-routing.module';

import { DivchartsPage } from './divcharts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DivchartsPageRoutingModule
  ],
  declarations: [DivchartsPage]
})
export class DivchartsPageModule {}
