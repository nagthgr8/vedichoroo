import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegAstPageRoutingModule } from './reg-ast-routing.module';

import { RegAstPage } from './reg-ast.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegAstPageRoutingModule
  ],
  declarations: [RegAstPage]
})
export class RegAstPageModule {}
