import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HoroscopeService } from '../../app/horoscope.service';
import { ShareService } from '../../app/share.service';
import { Device } from '@ionic-native/device';
import { House } from '../../app/house';
import { Group } from '../../app/group';

/**
 * Generated class for the HouseInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-house-info',
  templateUrl: 'house-info.html',
})
export class HouseInfoPage {
  objectKeys = Object.keys;
  oHou: House[] = [];
  oGrp: Group[] = [];
  hou: string = '';
  info: string = '';
  msg: string = '';
  showSU: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private horoService: HoroscopeService, public device: Device, public shareService: ShareService) {
       this.hou = navParams.get("h");
  	   this.horoService.getJson('assets/data/' + this.hou + '.json')
			.subscribe(hevts => {
				for(let key of Object.keys(hevts)) {
				    let hd : House = {
					  details: hevts[key]
					};
					this.oHou[key] = hd;
				}
				console.log('house details', this.oHou);
			}, (err) => {
			   console.log(err);
			});
  	   this.horoService.getJson('assets/data/' + this.hou +  '-G.json')
			.subscribe(hgps => {
				for(let key of Object.keys(hgps)) {
				    let hg : Group = {
					  details: hgps[key]
					};
					this.oGrp[key] = hg;
				}
				console.log('house group', this.oGrp);
			}, (err) => {
			   console.log(err);
			});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HouseInfoPage');
	this.shareService.plan.subscribe((pln) => {
		this.showSU = (pln.name == 'com.mypubz.eportal.astrologer') ? true : false;
	 }, (err) => {
	});
  }
  save()
  {
	console.log(this.msg);
	if(this.msg.trim().length == 0) {
		this.info = 'Please enter your suggestion';
		return;
	} else {
	    this.showSU = false;
		this.info = 'Please wait..';
		this.horoService.addTicket(this.device.uuid, 'house', '', this.msg)
		.subscribe(res => {
			if(res['guid'] != '') {
				this.info = '<strong>Thank you for your suggestion.</strong>';
			} else {
			   this.info = 'There was some internal failure, we regret inconvinience. Please try after some time.';
			}
		}, (err) => {
			this.info = JSON.stringify(err);
		});	  
	}
  }

}
