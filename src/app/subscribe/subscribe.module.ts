import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SubscribePageRoutingModule } from './subscribe-routing.module';
import { TranslateModule } from '@ngx-translate/core';

import { SubscribePage } from './subscribe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	FormsModule,
    ReactiveFormsModule,
	TranslateModule,
    SubscribePageRoutingModule
  ],
  declarations: [SubscribePage]
})
export class SubscribePageModule {}
