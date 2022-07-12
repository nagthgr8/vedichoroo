import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketDetailPageRoutingModule } from './ticket-detail-routing.module';

import { TicketDetailPage } from './ticket-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketDetailPageRoutingModule
  ],
  declarations: [TicketDetailPage]
})
export class TicketDetailPageModule {}
