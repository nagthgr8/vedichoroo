import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ArticlePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-article',
  templateUrl: 'article.html',
})
export class ArticlePage {
  art: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.art= navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }

}
