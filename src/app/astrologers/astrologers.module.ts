import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AstrologersPageRoutingModule } from './astrologers-routing.module';

import { AstrologersPage } from './astrologers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AstrologersPageRoutingModule
  ],
  declarations: [AstrologersPage]
})
export class AstrologersPageModule {}
