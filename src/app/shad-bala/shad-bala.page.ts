import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareService } from '../share.service'
declare var admob;

@Component({
  selector: 'app-shad-bala',
  templateUrl: './shad-bala.page.html',
  styleUrls: ['./shad-bala.page.scss'],
})
export class ShadBalaPage implements OnInit {
  objectKeys = Object.keys;
  oShd: any = [];
  constructor(private router: Router, public shareService: ShareService) { }

  ngOnInit() {
 	this.oShd = this.router.getCurrentNavigation().extras.state;
    console.log(this.oShd);
  	  this.shareService.plan
		   .subscribe(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
			//admob.setDevMode(true);
		admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/7106962776',
			  ios: 'ca-app-pub-8442845715303800/7106962776',
			},
		  }).then(() => {
				setTimeout(() => {
				  admob.banner.hide({
					// replace with your ad unit IDs
					android: 'ca-app-pub-8442845715303800/7106962776',
					ios: 'ca-app-pub-8442845715303800/7106962776',
				  })
				}, 10000)
		  })
  		}
	 });
  }
}
