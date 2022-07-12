import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartAnalysisPageRoutingModule } from './chart-analysis-routing.module';

import { ChartAnalysisPage } from './chart-analysis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartAnalysisPageRoutingModule
  ],
  declarations: [ChartAnalysisPage]
})
export class ChartAnalysisPageModule {}
