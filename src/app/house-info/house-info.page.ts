import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import { Device } from '@ionic-native/device/ngx';
import { House } from '../house';
import { Group } from '../group';
declare var admob;

@Component({
  selector: 'app-house-info',
  templateUrl: './house-info.page.html',
  styleUrls: ['./house-info.page.scss'],
})
export class HouseInfoPage implements OnInit {
  objectKeys = Object.keys;
  oHou: House[] = [];
  oGrp: Group[] = [];
  hou: string = '';
  info: string = '';
  msg: string = '';
  showSU: boolean = false;
  constructor(private router: Router, private route: ActivatedRoute, private platform: Platform, private horoService: HoroscopeService, public device: Device, public shareService: ShareService, public file: File) { 
  }

  ngOnInit() {
 	this.route.queryParams
      .filter(params => params.h)
      .subscribe(params => {
        console.log(params); 
		this.hou = params.h;
  	   this.horoService.getJson('assets/data/' + params.h + '.json')
			.subscribe(hevts => {
				for(let key of Object.keys(hevts)) {
				    let hd : House = {
					  details: hevts[key]
					};
					this.oHou[key] = hd;
				}
				console.log('house details', this.oHou);
			}, (err) => {
			   console.log(err);
			});
   this.platform.ready().then(() => {
	this.shareService.plan.subscribe((pln) => {
		this.showSU = (pln.name == 'com.mypubz.eportal.astrologer') ? true : false;
		 if(pln.name == 'com.mypubz.eportal.astrologer' || pln.name == 'com.mypubz.eportal.adfree' || pln.name == 'com.mypubz.eportal.year' || pln.name == 'com.mypubz.eportal.month') {
				this.horoService.getKPHouseGroup(this.device.uuid)
			   .subscribe(res => {
				   if(res['hgp'] == 'not found') {
					  this.horoService.getJson('assets/data/house_groups.json')
						.subscribe(hgps => {		
							for(let key of Object.keys(hgps)) {
						if(key.toString().split('-')[0] == this.hou) {
								let hg : Group = {
								  details: hgps[key]
								};
								this.oGrp[key] = hg;
							 }
							}
							console.log('house group', this.oGrp);
						}, (err) => {
							console.log(err);
						}); 
				   } else {
					   var hgps = JSON.parse(res['hgp']);
					for(let key of Object.keys(hgps)) {
						if(key.toString().split('-')[0] == this.hou) {
							let hg : Group = {
							  details: hgps[key]
							};
							this.oGrp[key] = hg;
						}
					}
					console.log('house group', this.oGrp);
				   }
			   }, (err) => {
				console.log(err);
			 });
		    } else {
			this.horoService.getJson('assets/data/' + this.hou +  '-G.json')
			.subscribe(hgps => {
				for(let key of Object.keys(hgps)) {
				    let hg : Group = {
					  details: hgps[key]
					};
					this.oGrp[key] = hg;
				}
				console.log('house group', this.oGrp);
			}, (err) => {
			   console.log(err);
			});
			if(pln.name != 'com.mypubz.eportal.astrologer' && pln.name != 'com.mypubz.eportal.adfree' && pln.name != 'com.mypubz.eportal.month' && name != 'com.mypubz.eportal.year') {
				//admob.setDevMode(true);
			admob.banner.show({
				id: {
				  // replace with your ad unit IDs
				  android: 'ca-app-pub-8442845715303800/9317606411',
				  ios: 'ca-app-pub-8442845715303800/9317606411',
				},
			  }).then(() => {
				setTimeout(() => {
				  admob.banner.hide({
					// replace with your ad unit IDs
					android: 'ca-app-pub-8442845715303800/9317606411',
					ios: 'ca-app-pub-8442845715303800/9317606411',
				  })
				}, 10000)
			  })
		    }
		   }
		 }, (err) => {
			   console.log(err);
	  });		
    });
   });	 
 }
  save()
  {
	console.log(this.msg);
	if(this.msg.trim().length == 0) {
		this.info = 'Please enter your suggestion';
		return;
	} else {
	    this.showSU = false;
		this.info = 'Please wait..';
		this.horoService.addTicket(this.device.uuid, 'houseinfo', '', this.msg)
		.subscribe(res => {
			if(res['guid'] != '') {
				this.info = '<strong>Thank you for your suggestion.</strong>';
			} else {
			   this.info = 'There was some internal failure, we regret inconvinience. Please try after some time.';
			}
		}, (err) => {
			this.info = JSON.stringify(err);
		});	  
	}
  }
}
