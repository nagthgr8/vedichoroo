import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../../app/share.service'
import { HoroscopeService } from '../../app/horoscope.service';
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  info: string;
  today: any;
  rashi: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shareService: ShareService, public horoService: HoroscopeService) {
    // If we navigated to this page, we will have an item available as a nav param
	this.today = Date.now();
	this.rashi = this.shareService.getMoonSign();
    this.selectedItem = navParams.get('item');
	if(this.selectedItem.title == 'Your Daily Forecast') {
	    this.selectedItem.title = "Daily Forecast for " + this.shareService.getMoonSign();
		this.horoService.getDailyHoro(this.shareService.getMoonSign())
       .subscribe(res => {
		this.info = JSON.stringify(res);
      }, (err) => {
        this.info = err;
      }) ;
	} else {
	  this.info = 'Please stay tuned, we are working at it...';
	}
  }
}
