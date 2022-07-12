import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { KpEventPageRoutingModule } from './kp-event-routing.module';

import { KpEventPage } from './kp-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    KpEventPageRoutingModule
  ],
  declarations: [KpEventPage]
})
export class KpEventPageModule {}
