import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AstrologerPageRoutingModule } from './astrologer-routing.module';

import { AstrologerPage } from './astrologer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AstrologerPageRoutingModule
  ],
  declarations: [AstrologerPage]
})
export class AstrologerPageModule {}
