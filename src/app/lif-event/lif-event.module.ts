import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { LifEventPageRoutingModule } from './lif-event-routing.module';

import { LifEventPage } from './lif-event.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    LifEventPageRoutingModule
  ],
  declarations: [LifEventPage]
})
export class LifEventPageModule {}
