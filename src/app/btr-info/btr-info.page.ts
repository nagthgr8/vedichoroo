import { Component, OnInit } from '@angular/core';
import { ShareService } from '../share.service'
declare var admob;

@Component({
  selector: 'app-btr-info',
  templateUrl: './btr-info.page.html',
  styleUrls: ['./btr-info.page.scss'],
})
export class BtrInfoPage implements OnInit {

  constructor(public shareService: ShareService) { }

  ngOnInit() {
   	  this.shareService.plan
		   .subscribe(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
			//admob.setDevMode(true);
		admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/2943769759',
			  ios: 'ca-app-pub-8442845715303800/2943769759',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/2943769759',
				ios: 'ca-app-pub-8442845715303800/2943769759',
			  })
			}, 10000)
		  })
 		}
	 });
 }

}
