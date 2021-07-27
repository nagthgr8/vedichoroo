import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';
declare var admob;

@Component({
  selector: 'app-stories',
  templateUrl: './stories.page.html',
  styleUrls: ['./stories.page.scss'],
})
export class StoriesPage implements OnInit {
  page: any;
  articles:any;
  mode: String="list";
  info: string = '';
  adv: string = '';
  showASU: boolean = false;
  constructor(private router: Router, public platform: Platform, public device: Device,  public horoService: HoroscopeService, public shareService: ShareService){//, public admob: AdMob) { 
  }

  ngOnInit() {
	  this.info = 'Loading..';
   this.platform.ready().then(() => {
	   this.info = 'Fetching stories..';
  	  this.shareService.getPLAN()
		   .then(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
			//admob.setDevMode(true);
		admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/2951315091',
			  ios: 'ca-app-pub-8442845715303800/2951315091',
			},
		  }).then(() => {
				setTimeout(() => {
				  admob.banner.hide({
					// replace with your ad unit IDs
					android: 'ca-app-pub-8442845715303800/2951315091',
					ios: 'ca-app-pub-8442845715303800/2951315091',
				  })
				}, 10000)
		  })
		}
	 }, (err) => {
	});	 
    this.getStories(0);
    this.page=0;
	this.horoService.getMsg(this.device.uuid, 'adv-stories')
	.subscribe(res => {
		this.adv = res['msg'];
		this.showASU = true;
	}, (err) => {
		//this.info = JSON.stringify(err);
	});
		this.shareService.getPLAN().then((pln) => {
			//if(pln.name != 'com.mypubz.eportal.astrologer') this.showBanner();
		 }, (err) => {
		});	
	});	 
  }
  more(evt)
  {
	  evt.stopPropagation();
  this.router.navigate(['/publish-blog']);
	  
  }
  getStories(refresher){
    this.page= 0;
    this.articles=[];
	//this.info = 'fetching...';
    this.horoService.getStories()
	.subscribe(res => {
	   this.info = '';
	  this.articles = res;//this.publishStories(res);
	  for(var i = 0; i < this.articles.length; i++) if(this.articles[i].img == null) this.articles[i].img = 'assets/imgs/vedichoroo.png';
	},(err) => {
	  this.info = err;
    });
  }
  publishStories(stories: any)
  {
    //this.info = Object.keys(stories).length.toString();
  	for(var i = 0; i < Object.keys(stories).length; i++) {
	  this.articles.push(stories[i]);
	}
  }
  detail(item){
  this.router.navigate(['/article'], {state: item});
 }

  makelist(){
    this.mode="list";
  }

  makecard(){
    this.mode="card";
  }
}
