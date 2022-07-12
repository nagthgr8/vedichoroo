import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BtrPageRoutingModule } from './btr-routing.module';

import { BtrPage } from './btr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BtrPageRoutingModule
  ],
  declarations: [BtrPage]
})
export class BtrPageModule {}
