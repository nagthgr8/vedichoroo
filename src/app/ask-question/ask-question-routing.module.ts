import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AskQuestionPage } from './ask-question.page';

const routes: Routes = [
  {
    path: '',
    component: AskQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AskQuestionPageRoutingModule {}
