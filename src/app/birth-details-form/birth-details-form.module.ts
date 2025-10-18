import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BirthDetailsFormComponent } from './birth-details-form.component';

@NgModule({
  declarations: [BirthDetailsFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [BirthDetailsFormComponent]
})
export class BirthDetailsFormModule {}