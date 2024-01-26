import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';

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
  pln: string = 'Undefined';
  dvid: string = '';
  constructor(private platform: Platform, private appVersion: AppVersion, public device: Device, private shareService: ShareService, public horoService: HoroscopeService) { }

  ngOnInit() {
    this.platform.ready().then(() => {
		this.dvid = this.device.uuid;
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
	this.shareService.getPLAN()
		.then((pln) => {
			if(pln) {
				this.pln = pln.name;
			} else {
			  this.horoService.getPlan(this.device.uuid)
				   .subscribe(res => {
						console.log('Fetched the plan details from about app page');
						this.pln = res['name'];
				 });
			}
		  });
	});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutAppPage');
  }

}
