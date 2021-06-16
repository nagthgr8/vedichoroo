import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
})
export class AboutAppPage implements OnInit {
  appn: string = '';
  ver: string = '';
  verc: any;
  pakn: string = '';

  constructor(private appVersion: AppVersion) { }

  ngOnInit() {
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
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutAppPage');
  }

}
