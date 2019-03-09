import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HoroscopeService } from '../../app/horoscope.service';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the ChangeStatusPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-change-status',
  templateUrl: 'change-status.html',
})
export class ChangeStatusPage {
  info: string = '';
  showASU: boolean = false;
  tagline: string = '';
  avatar: string = '';
  status: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public horoService: HoroscopeService, public device: Device) {
  this.info = 'Please wait..';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangeStatusPage');
	this.horoService.getAstrologer(this.device.uuid)
	.subscribe(res => {
	   this.info = '';
		if(res['status'] == 'X') {
			this.info = res['tagline'];
		} else {
		    this.showASU = true;
			this.status = (res['status'] == 'A') ? true : false;
			this.tagline = res['tagline'];
			this.avatar = res['avatar'];
		}
	}, (err) => {
		this.info = err;
	});
  }
  chgtgline() {
   this.horoService.setAstTagline(this.device.uuid, this.tagline)
   .subscribe(res => {
   }, (err) => {
   });
  }
  chgstatus() {
   this.horoService.setAstStatus(this.device.uuid, (this.status == true) ? 'A' : 'NA')
   .subscribe(res => {
   }, (err) => {
   });
  }
  chgavatar() {
   this.horoService.setAstAvatar(this.device.uuid, this.avatar)
   .subscribe(res => {
   }, (err) => {
   });
  }

}
