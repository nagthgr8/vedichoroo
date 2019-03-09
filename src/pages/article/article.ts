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
  showIMG: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.art= navParams.get('item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
	this.showIMG = (this.art.image == '') ?  false : true;
	
  }

}
