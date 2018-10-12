import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../../app/share.service'
import { HoroscopeService } from '../../app/horoscope.service';

/**
 * Generated class for the DailyForecastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dailyforecast',
  templateUrl: 'dailyforecast.html',
})
export class DailyForecastPage {
  info: string;
  today: any;
  rashi: string;
  backgroundImg: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shareService: ShareService, public horoService: HoroscopeService) {
    	this.today = Date.now();
		this.rashi = this.shareService.getMoonSign();
		var rnd = this.getRandomNum(1,12);
		this.backgroundImg = 'assets/imgs/nature' + rnd + '.png'
		if(navParams.get('message') == null) {
			this.horoService.getDailyHoro(this.shareService.getMoonSign())
		   .subscribe(res => {
			this.info = JSON.stringify(res);
		  }, (err) => {
			this.info = err;
		  }) ;
	   } else {
	     this.info = navParams.get('message');
	   }

  }
	getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyforecastPage');
  }

}
