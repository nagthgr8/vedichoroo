import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublishBlogPage } from './publish-blog.page';

const routes: Routes = [
  {
    path: '',
    component: PublishBlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishBlogPageRoutingModule {}
