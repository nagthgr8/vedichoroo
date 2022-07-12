import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AstroChatPageRoutingModule } from './astro-chat-routing.module';

import { AstroChatPage } from './astro-chat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AstroChatPageRoutingModule
  ],
  declarations: [AstroChatPage]
})
export class AstroChatPageModule {}
