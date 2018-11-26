import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { HoroscopeService } from '../../app/horoscope.service';
import { CallNumber } from '@ionic-native/call-number';
import { Toast } from '@ionic-native/toast';
import { Astrologer } from '../../app/astrologer';
import { SankethPage } from '../sanketh/sanketh';
import * as astrologers from './astrologers.json';

/**
 * Generated class for the AstrologersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-astrologers',
  templateUrl: 'astrologers.html',
})
export class AstrologersPage {
  objectKeys = Object.keys;
  info: string;
  oAst :Astrologer[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,  public horoService: HoroscopeService, private callNumber: CallNumber, private toast: Toast) {
    this.info = '';
        for(let key in Object.keys(astrologers)) {
			console.log(key, astrologers[key]);
			let walnk = 'https://wa.me/' + astrologers[key].mob + '?text=I%20am%20interested%20to%20consult%20you%20for%20astrology';
			let ast: Astrologer = {
					name: astrologers[key].name,
					tagline: astrologers[key].tagline,
					avatar: astrologers[key].avatar,
					uid: astrologers[key].uid,
					mob: astrologers[key].mob,
					walnk: walnk
					};
			this.oAst[key] = ast;
		}
    //this.horoService.getJson('./astrologers.json')
	//.subscribe(res => {
	  // console.log('result', res);
	   //this.info = '';
	  //this.oAst = res;
	//},(err) => {
	  //this.info = err;
    //});
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AstrologersPage');
	this.platform.ready().then((readySource) => {
		this.toast.show('just slide the list item of your selected astrologer and see what happens', '5000', 'center').subscribe(
		  toast => {
			console.log(toast);
		  }
		);		
	});
	
  }
  callreq(event, ast) {
     event.stopPropagation();
     console.log(ast);
	 this.callNumber.callNumber(ast.mob, true)
		.then(res => console.log('Launched dialer!', res))
		.catch(err => console.log('Error launching dialer', err));
  }
  viewprof(event, ast) {
     event.stopPropagation();
     console.log(ast);
	 switch(ast.uid)
	 {
		case 'sanketh':
			this.navCtrl.push(SankethPage);
			break;
		default:
			break;
	 }
  }

}
