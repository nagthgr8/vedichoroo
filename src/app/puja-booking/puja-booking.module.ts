import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PujaBookingPageRoutingModule } from './puja-booking-routing.module';

import { PujaBookingPage } from './puja-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PujaBookingPageRoutingModule
  ],
  declarations: [PujaBookingPage]
})
export class PujaBookingPageModule {}
