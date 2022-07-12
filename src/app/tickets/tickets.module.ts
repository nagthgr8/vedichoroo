import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TicketsPageRoutingModule } from './tickets-routing.module';

import { TicketsPage } from './tickets.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TicketsPageRoutingModule
  ],
  declarations: [TicketsPage]
})
export class TicketsPageModule {}
