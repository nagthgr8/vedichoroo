import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrashnaJyotishPageRoutingModule } from './prashna-jyotish-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PrashnaJyotishPage } from './prashna-jyotish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    PrashnaJyotishPageRoutingModule
  ],
  declarations: [PrashnaJyotishPage]
})
export class PrashnaJyotishPageModule {}
