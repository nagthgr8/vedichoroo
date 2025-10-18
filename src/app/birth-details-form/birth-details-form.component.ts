import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-birth-details-form',
  templateUrl: './birth-details-form.component.html',
  styleUrls: ['./birth-details-form.component.scss']
})
export class BirthDetailsFormComponent {
  nam = '';
  dob = '';
  tob = '';
  place = '';
  gen = '';

  @Output() submitted = new EventEmitter<any>();

  submitForm() {
    this.submitted.emit({
      nam: this.nam,
      dob: this.dob,
      tob: this.tob,
      place: this.place,
      gen: this.gen
    });
  }
}