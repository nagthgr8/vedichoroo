import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditsPageRoutingModule } from './credits-routing.module';

import { CreditsPage } from './credits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditsPageRoutingModule
  ],
  declarations: [CreditsPage]
})
export class CreditsPageModule {}
