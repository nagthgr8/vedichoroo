import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AstrologersPage');
	platform.ready().then((readySource) => {
		
	});
	
  }

}
