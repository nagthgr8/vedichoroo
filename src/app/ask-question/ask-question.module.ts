import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AskQuestionPageRoutingModule } from './ask-question-routing.module';

import { AskQuestionPage } from './ask-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AskQuestionPageRoutingModule
  ],
  declarations: [AskQuestionPage]
})
export class AskQuestionPageModule {}
