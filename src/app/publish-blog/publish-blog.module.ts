import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishBlogPageRoutingModule } from './publish-blog-routing.module';

import { PublishBlogPage } from './publish-blog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishBlogPageRoutingModule
  ],
  declarations: [PublishBlogPage]
})
export class PublishBlogPageModule {}
