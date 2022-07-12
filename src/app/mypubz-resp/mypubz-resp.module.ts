import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MypubzRespPageRoutingModule } from './mypubz-resp-routing.module';

import { MypubzRespPage } from './mypubz-resp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MypubzRespPageRoutingModule
  ],
  declarations: [MypubzRespPage]
})
export class MypubzRespPageModule {}
