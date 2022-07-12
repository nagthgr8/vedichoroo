import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyEarningsPageRoutingModule } from './my-earnings-routing.module';

import { MyEarningsPage } from './my-earnings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyEarningsPageRoutingModule
  ],
  declarations: [MyEarningsPage]
})
export class MyEarningsPageModule {}
