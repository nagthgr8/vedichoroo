import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MoneyhoroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-moneyhoro',
  templateUrl: 'moneyhoro.html',
})
export class MoneyhoroPage {
  info: string = ''
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.info = 'Please stay tuned, we are working at it...';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoneyhoroPage');
  }

}
