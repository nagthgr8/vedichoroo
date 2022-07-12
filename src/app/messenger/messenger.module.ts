import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessengerPageRoutingModule } from './messenger-routing.module';

import { MessengerPage } from './messenger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessengerPageRoutingModule
  ],
  declarations: [MessengerPage]
})
export class MessengerPageModule {}
