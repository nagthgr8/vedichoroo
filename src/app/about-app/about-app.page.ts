import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Capacitor } from '@capacitor/core';
import { AppUpdate } from '@capawesome/capacitor-app-update';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';
const getCurrentAppVersion = async () => {
	const result = await AppUpdate.getAppUpdateInfo();
	if (Capacitor.getPlatform() === 'android') {
	  return result.currentVersionCode;
	} else {
	  return result.currentVersionName;
	}
  };
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
  constructor(private platform: Platform, public device: Device, private shareService: ShareService, public horoService: HoroscopeService) { }
  
  ngOnInit() {
    this.platform.ready().then(() => {
		this.dvid = this.device.uuid;
	getCurrentAppVersion().then(ver => {
	    console.log('Version', ver);
		this.verc = ver;
	});
	AppUpdate.getAppUpdateInfo().then((app) => {
	    console.log('Version Name', app.currentVersionName);
		this.ver = app.currentVersionName;
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
