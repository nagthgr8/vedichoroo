import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Platform, MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Market } from '@awesome-cordova-plugins/market/ngx';
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.page.html',
  styleUrls: ['./ratings.page.scss'],
})
export class RatingsPage implements OnInit {
	str1: string = 'star-outline';
	str2: string = 'star-outline';
	str3: string = 'star-outline';
	str4: string = 'star-outline';
	str5: string = 'star-outline';
	rating: number = 0;
	msg: string = '';
	showSU: boolean = true;
	info: string = '';
	plan: any;
	urat: any;
	rtitle: string = 'Please rate our App';
	rimg: string = 'assets/icon/icon.png';
  constructor(private route: ActivatedRoute, private device: Device, private platform: Platform, private location: Location, private market: Market, private router: Router, private shareService: ShareService, private horoService: HoroscopeService) { }

  ngOnInit() {
	this.urat = this.router.getCurrentNavigation().extras.state;
	if(this.urat.pid != 'VHO') {
		let asts: any = this.shareService.getASTS();
			for(var i = 0; i < asts.length; i++) {
				if(asts[i].uid == this.urat.pid) {
					this.rtitle = 'Please rate our Astrologer '  + asts[i].name;
					this.rimg = asts[i].avatar;
					break;
				}
			}
		//});
	} 
	if(this.urat.rating) this.updatestrs(this.urat.rating);
	if(this.urat.review) this.msg = this.urat.review;
  	//this.route.queryParams
    //  .filter(params => params.rating)
    //  .subscribe(params => {
    //    console.log(params); 
	//	this.rating = Number(params.rating);
	//	this.updatestrs(this.rating);
	//  });
				this.shareService.plan
						.subscribe((pln) => {
							this.plan = pln;
						});
 }
 launchAppStore() {
	if(this.urat.pid == "VHO") { 
		if (this.platform.is('android')) {
		  // Use your app identifier for android.
		  this.market.open('com.mypubz.eportal');
		} else {
		  // Use the id found in the URL of the ios app store listing.
		  this.market.open('id123456789');
		}
	}
  }

	stars(evt, s) {
		evt.stopPropagation();
	  if(s != this.urat.rating) {
		this.urat.rating = s;
		this.updatestrs(s);
		  //this.horoService.userRating(this.device.uuid, this.urat.name, this.urat.avatar, this.urat.pid, s)
		//	   .subscribe(res => {
			//	 console.log('rating', res['rating']);
			//	if(this.urat.pid == "VHO") {
			//		this.plan.rating = res['rating'];
			//		this.shareService.setPLAN(this.plan);
			//	}
			//	console.log('rating updated to server');
			//	}, (err) => {
			//	});
			//if(s > 3 && this.urat.pid == "VHO") this.launchAppStore();
	  }
		//else this.racmt = 'Please Tell Us How We Can Improve';
		//if(this.plan.rating != s) this.rat = true;
	}
	save(evt) {
		evt.stopPropagation();
		this.showSU = false;
		this.info = 'Submitting..';
		if(this.msg.trim() != '') {
		  this.horoService.userReview(this.device.uuid, this.urat.name, this.urat.avatar, this.urat.pid, this.urat.rating, this.msg)
			   .subscribe(res => {
				this.info = 'Thank you for your review';
				console.log('review updated to server');
				if(this.urat.pid != 'VHO') { 
					this.shareService.setCSTATS('C|' + this.urat.pid);
				}
				}, (err) => {
				});
		} else {
			this.horoService.userRating(this.device.uuid, this.urat.name, this.urat.avatar, this.urat.pid, this.rating)
			   .subscribe(res => {
				 console.log('rating', res['rating']);
				if(this.urat.pid == "VHO") {
					this.plan.rating = res['rating'];
					this.shareService.setPLAN(this.plan);
				}
				console.log('rating updated to server');
				}, (err) => {
				});
		}
		this.info = 'Restoring..';
				if(this.urat.pid == 'VHO') {
					if(this.rating > 3) this.launchAppStore();
					this.location.back();
				} else this.location.back();
		
	}
	updatestrs(s) {
		this.rating = s;
			switch(s) 
			{
				case 1:
				   this.str1 = 'star';
				   this.str2 = 'star-outline';
				   this.str3 = 'star-outline';
				   this.str4 = 'star-outline';
				   this.str5 = 'star-outline';
				   break;
				case 2:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star-outline';
				   this.str4 = 'star-outline';
				   this.str5 = 'star-outline';
				   break;
				case 3:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star';
				   this.str4 = 'star-outline';
				   this.str5 = 'star-outline';
				   break;
				case 4:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star';
				   this.str4 = 'star';
				   this.str5 = 'star-outline';
				   break;
				case 5:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star';
				   this.str4 = 'star';
				   this.str5 = 'star';
				   break;
				 default:
					break;
			}
	}
}
