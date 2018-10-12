import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CareerhoroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-careerhoro',
  templateUrl: 'careerhoro.html',
})
export class CareerhoroPage {
  info: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.info = 'Please stay tuned, we are working at it...';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareerhoroPage');
  }

}
