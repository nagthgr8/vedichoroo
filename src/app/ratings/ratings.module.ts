import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RatingsPageRoutingModule } from './ratings-routing.module';

import { RatingsPage } from './ratings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RatingsPageRoutingModule
  ],
  declarations: [RatingsPage]
})
export class RatingsPageModule {}
