import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HoroscopeService } from '../../app/horoscope.service';
import { Yoga } from '../../app/yoga';

@Component({
  selector: 'page-yoga-info',
  templateUrl: 'yoga-info.html',
})
export class YogaInfoPage {
  objectKeys = Object.keys;
  oYog: Yoga[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private horoService: HoroscopeService) {
		this.horoService.getJson('assets/data/yog-inf.json')
			.subscribe(yogs => {
				//yogas to be analyzed
				for(let key of Object.keys(yogs)) {
				    let yg : Yoga = {
					  name: key,
					  desc: yogs[key]
					};
					this.oYog[key] = yg;
				}
			}, (err) => {
			});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad YogaInfoPage');
  }

}
