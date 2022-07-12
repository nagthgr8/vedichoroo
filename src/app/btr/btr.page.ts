import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Device } from '@ionic-native/device/ngx';
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';

@Component({
  selector: 'app-btr',
  templateUrl: './btr.page.html',
  styleUrls: ['./btr.page.scss'],
})
export class BtrPage implements OnInit {

binf: any = null;
  plan: any;
  constructor(private router: Router, public device: Device, private shareService: ShareService, public horoService: HoroscopeService) { }

  ngOnInit() {
     this.binf = this.router.getCurrentNavigation().extras.state;
	this.shareService.getPLAN()
		.then((pln) => {
			if(pln) {
			  if(pln.name != '') {
				this.plan = pln;
			  }
			} else {
			  this.horoService.getPlan(this.device.uuid)
				   .subscribe(res => {
						console.log('Fetched the plan details from btr page');
						this.plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'], rating: res['rating'] };
				   });
				
			}
		  });
}
  rfy(id) {
			if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') {
	  if(id == 'RAM' && this.binf ) {
				let btr: any = {};
				btr.binf1 = this.binf;
				btr.binf2 = null;
				btr.id = id;
				this.router.navigate(['/btr-report'], {state: btr});
	  } else {
	   let btd: any = {};
	   btd.id = id;
	   btd.binf = (this.binf) ? this.binf : null;
   	    this.router.navigate(['/btr-details'], {state : btd});
	  }
	} else {
	   this.router.navigate(['/subscribe']);
	}
  }
}
