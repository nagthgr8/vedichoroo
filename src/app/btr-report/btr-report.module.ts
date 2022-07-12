import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BtrReportPageRoutingModule } from './btr-report-routing.module';

import { BtrReportPage } from './btr-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BtrReportPageRoutingModule
  ],
  declarations: [BtrReportPage]
})
export class BtrReportPageModule {}
