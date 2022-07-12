import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShadBalaPageRoutingModule } from './shad-bala-routing.module';

import { ShadBalaPage } from './shad-bala.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShadBalaPageRoutingModule
  ],
  declarations: [ShadBalaPage]
})
export class ShadBalaPageModule {}
