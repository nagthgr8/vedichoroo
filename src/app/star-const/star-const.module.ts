import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StarConstPageRoutingModule } from './star-const-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { StarConstPage } from './star-const.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
	TranslateModule,
    StarConstPageRoutingModule
  ],
  declarations: [StarConstPage]
})
export class StarConstPageModule {}
