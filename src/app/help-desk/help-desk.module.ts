import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HelpDeskPageRoutingModule } from './help-desk-routing.module';

import { HelpDeskPage } from './help-desk.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HelpDeskPageRoutingModule
  ],
  declarations: [HelpDeskPage]
})
export class HelpDeskPageModule {}
