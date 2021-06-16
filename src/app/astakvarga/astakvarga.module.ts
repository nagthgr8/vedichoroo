import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AstakvargaPageRoutingModule } from './astakvarga-routing.module';

import { AstakvargaPage } from './astakvarga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AstakvargaPageRoutingModule
  ],
  declarations: [AstakvargaPage]
})
export class AstakvargaPageModule {}
