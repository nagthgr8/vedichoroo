import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AppVersion } from '@ionic-native/app-version';

/**
 * Generated class for the AboutAppPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about-app',
  templateUrl: 'about-app.html',
})
export class AboutAppPage {
  appn: string = '';
  ver: string = '';
  verc: any;
  pakn: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, private appVersion: AppVersion) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutAppPage');
	this.appVersion.getAppName().then(appn => {
	    console.log('App Name', appn);
		this.appn = appn;
	});
	this.appVersion.getPackageName().then(pakn => {
	    console.log('Package Name', pakn);
		this.pakn = pakn;
	});
	this.appVersion.getVersionNumber().then(ver => {
	    console.log('Version No', ver);
		this.ver = ver;
	});
	this.appVersion.getVersionCode().then(verc => {
	    console.log('Version Code',verc);
		this.verc = verc;
	});
  }

}
