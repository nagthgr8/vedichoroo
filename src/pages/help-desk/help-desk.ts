import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { HoroscopeService } from '../../app/horoscope.service';

/**
 * Generated class for the HelpDeskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-help-desk',
  templateUrl: 'help-desk.html',
})
export class HelpDeskPage {
  cat: any;
  sub: any;
  msg: any;
  info: string;
  showSU: boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public device: Device, public horoService: HoroscopeService) {
	this.showSU = true;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpDeskPage');
  }
  save()
  {
    if(this.cat == '') {
		this.info = 'Please select the category';
		return;
	} 
	if(this.sub == '') {
		this.info = 'Please enter subject line';
		return;
	}
	if(this.msg == '') {
		this.info = 'Please enter the message';
		return;
	} else {
		this.horoService.addTicket(this.device.uuid, this.cat, this.sub, this.msg)
		.subscribe(res => {
			this.showSU = false;
			if(res['guid'] != '') {
				this.info = '<strong>Thank you for contacting our Help Desk. We will respond you shortly</strong>';
			} else {
			   this.info = 'There was some internal failure, we regret inconvinience. Please try after some time.';
			}
		}, (err) => {
			this.info = JSON.stringify(err);
		});	  
	}
  }
}
