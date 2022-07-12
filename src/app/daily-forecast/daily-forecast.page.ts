import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
//import { AdMob } from "ionic-admob";
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';
declare var admob;
@Component({
  selector: 'app-daily-forecast',
  templateUrl: './daily-forecast.page.html',
  styleUrls: ['./daily-forecast.page.scss'],
})
export class DailyForecastPage implements OnInit, AfterViewInit {
  today: any;
  backgroundImg: string;
  dho: any = {
	  sho: false,
	  msgn:'',
	  msg: '',
	  smsg:'',
	  img: ''
  };

  constructor(private router: Router, public platform: Platform, public shareService: ShareService, public horoService: HoroscopeService) {//, public admob: AdMob) { 
	var rnd = this.getRandomNum(1,10);
	this.backgroundImg = 'assets/imgs/nature' + rnd + '.jpg'
  }

  ngOnInit() {
	this.today = Date.now();
  	  this.shareService.getPLAN()
		   .then(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
		  admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/8643987291',
			  ios: 'ca-app-pub-8442845715303800/8643987291',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/8643987291',
				ios: 'ca-app-pub-8442845715303800/8643987291',
			  })
			}, 10000)
		  })
		}		  
	}, (err) => {
	});	 
	this.dho = this.router.getCurrentNavigation().extras.state;
	if(this.dho.msg == '') {
		this.dho.msg = 'fetching...';
		this.horoService.getDailyHoro(this.dho.msgn)
 		   .subscribe(res => {
			var cd = new Date();
			this.shareService.setDHORO(this.dho.msgn,   res+ '|' + cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear());
			this.dho.msg = JSON.stringify(res);
		  }, (err) => {
			this.dho.msg = JSON.stringify(err);
		  }) ;
	}
  }
  ngAfterViewInit() {
 }
	getRandomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyforecastPage');
   this.platform.ready().then(() => {
		this.shareService.getPLAN().then((pln) => {
			//if(pln.name != 'com.mypubz.eportal.astrologer') this.showBanner();
		 }, (err) => {
		});	
	});	 
  }

}
