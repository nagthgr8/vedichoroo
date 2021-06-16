import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanetSigPageRoutingModule } from './planet-sig-routing.module';

import { PlanetSigPage } from './planet-sig.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanetSigPageRoutingModule
  ],
  declarations: [PlanetSigPage]
})
export class PlanetSigPageModule {}
