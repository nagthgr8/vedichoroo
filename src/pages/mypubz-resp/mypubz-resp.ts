import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { HoroscopeService } from '../../app/horoscope.service';
import { ListPage } from '../list/list';

/**
 * Generated class for the MypubzRespPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mypubz-resp',
  templateUrl: 'mypubz-resp.html',
})
export class MypubzRespPage {
  mpz: any;
  guid: any;
  uuid: any;
  msg: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public device: Device, public horoService: HoroscopeService) {
    this.uuid = navParams.get('ticket').uuid;
    this.guid = navParams.get('ticket').guid;
	this.mpz = navParams.get('ticket').resp;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MypubzRespPage');
  }
  save()
  {
  if(this.msg != '') {
	this.horoService.followTicket(this.device.uuid, this.guid, this.msg)
	.subscribe(res => {
		this.navCtrl.setRoot(ListPage);
	}, (err) => { //silently quit without annoying user, as this is our issue..
		this.navCtrl.setRoot(ListPage);
	});	 
   } else {
		this.navCtrl.setRoot(ListPage);
   }
  }
}
