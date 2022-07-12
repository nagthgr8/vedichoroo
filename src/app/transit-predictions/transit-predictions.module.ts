import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransitPredictionsPageRoutingModule } from './transit-predictions-routing.module';

import { TransitPredictionsPage } from './transit-predictions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransitPredictionsPageRoutingModule
  ],
  declarations: [TransitPredictionsPage]
})
export class TransitPredictionsPageModule {}
