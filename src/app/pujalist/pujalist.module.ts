import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PujalistPageRoutingModule } from './pujalist-routing.module';

import { PujalistPage } from './pujalist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PujalistPageRoutingModule
  ],
  declarations: [PujalistPage]
})
export class PujalistPageModule {}
