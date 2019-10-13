import {Component, NgZone} from '@angular/core';
import {ViewController} from 'ionic-angular';
import { ShareService } from '../../app/share.service';
import { HoroscopeService } from '../../app/horoscope.service';

declare var google; 

@Component({
  templateUrl: 'autocomplete.html'
})
export class AutocompletePage {
  autocompleteItems;
  autocomplete;

  //latitude: number = 0;
  //longitude: number = 0;
  //geo: any;
  service = new google.maps.places.AutocompleteService();

  constructor (public viewCtrl: ViewController, private zone: NgZone, public shareService: ShareService, public horoService: HoroscopeService) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    //this.geo = item;
    //this.geoCode(item);
    this.viewCtrl.dismiss(item);
  }

  updateSearch() {

    if (this.autocomplete.query == '' || this.autocomplete.query.length < 3) {
     this.autocompleteItems = [];
     return;
    }

    let me = this;
    this.service.getPlacePredictions({
    input: this.autocomplete.query,
    
   }, (predictions, status) => {
     me.autocompleteItems = [];

   me.zone.run(() => {
     if (predictions != null) {
        predictions.forEach((prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
       }
     });
   });
  }

}