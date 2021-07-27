import { Component, OnInit, Renderer2 } from '@angular/core';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { File } from '@ionic-native/file/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';
import { Ticket } from '../ticket';
import * as sign_imgs from '../sign_imgs.json';
import * as sublords from '../sublords.json';
import * as moment from 'moment';
declare var admob;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  lstnr1: () => void;
  lstnr2: () => void;
  lstnr3: () => void;
  sublords_v: any = (sublords as any).default;
  sign_imgs_v: any = (sign_imgs as any).default;
  icons: string[];
  title: string[];
  note: string[];
  r1items: Array<{title: string, note: string, icon: string, spin: boolean, fuse: boolean}>;
  r2items: Array<{title: string, note: string, icon: string, spin: boolean, fuse: boolean}>;
  r3items: Array<{title: string, note: string, icon: string, spin: boolean, fuse: boolean}>;
  r4items: Array<{title: string, note: string, icon: string, spin: boolean, fuse: boolean}>;
 r5items: Array<{title: string, note: string, icon: string, spin: boolean, fuse: boolean}>;
  today: any = '';
  lang: string;
  sunrise: string = '';
  sunset: string = '';
  rahukal: string = '';
  yama: string = '';
  abhjit: string = '';
  showCard: boolean;
  vsts: number = 0;
  apr: boolean = false;
  //fetching: string = '';
  lagna: string = '';
  ticks: number = 0;
  lag_d: number = 0;
  lag_m: number = 0;
  lag_s: number = 0;
  lagml: string = '';
  lagal: string = '';
  lagsl: string = '';
  nak: string = '';
  tithi: string = '';
  yog: string = '';
  karn: string = '';
  showASU: boolean = false;
  shwAD: boolean = false;
  showBN: boolean = false;
  ofrm: string = '';
  ofr: any;
  adv: any = {
	tag: 'blogad',
	msg: '',
	img:''
  };
  dho: any = {
	  sho: false,
	  msgn: '',
	  msg: '',
	  smsg:'',
	  img: ''
  };
  sstr: any = {
	  sho: false,
	  ssg: '',
	  lsg:''
  };
  choice: string = '';
  bthi: boolean = true;
  blag: boolean = true;
  brev: boolean = true;
  plan: any;
  info: string = '';
  bpf: boolean = false;
    ticket: Ticket;
	notif: boolean = false;
	arcs: number = 0;
  constructor(private menu: MenuController, private device: Device, private browserTab: BrowserTab, private androidPermissions: AndroidPermissions, 	private geolocation: Geolocation,
private router: Router, private appRate: AppRate, private renderer: Renderer2, private platform: Platform, private translate: TranslateService, private shareService: ShareService, private horoService: HoroscopeService, private file: File) 
  {
   console.log('home-const', this.plan);
    this.icons = ['assets/imgs/kundli.png','assets/imgs/kp.png','assets/imgs/prashna.png', 'assets/imgs/bvraman.png','assets/imgs/astrologer.png', 'assets/imgs/report.png','assets/imgs/predictions.png','assets/imgs/money.png','assets/imgs/career.png','assets/imgs/dailyhoroscope.png','assets/imgs/vargas.png','assets/imgs/marriage.png','assets/imgs/calendar.png','assets/imgs/vedicstories.png','assets/imgs/publish.png'];
	this.title = ['Birth Chart','KP Astrology','Prashna Jyotish','Muhurtha by BV Raman','Talk to Astrologer', 'Personalized Report','Transit Predictions','Money Horoscope','Career Horoscope','Daily Horoscope','Divisional Charts', 'Kundli Matching','Hindu Calendar','Vedic Stories','Write an Article']
    this.note = ['Vedic Horoscope with Vimsottara Dasha predictions','KP Astrology, Life Event Predictions','30 Day Transit Predictions based on your birth sign','Know your lucky days/star strength, based on Muhurta by B V Raman','Hindu Calendar','Get Detailed Report','Horary, Ask any question & know the answer.','Know your Raja Yogas, Panchmahapurush Yogas, Gajakesari Yoga, Lakshmi Yogas and many more..','Career Predictions using Dasamsa Chart','Know yoour wealth using Hora Chart analysis, ','Analysis On Each Life Aspect','Love/Marriage Compatibility Report','Based On Your Moon Sign', 'Vedic Astrology Stories', 'Ask a question or Talk instantly with our expert astrologers','Play 250+ Trending Games']
    this.r1items = [];
    this.r2items = [];
    this.r3items = [];
    this.r4items = [];
    this.r5items = [];
   this.today = Date.now();
  }
    showRatePrompt(){
	 this.appRate.preferences = {
		displayAppName: '126 ASTROLOGY',
		usesUntilPrompt: 5,
		promptAgainForEachNewVersion: true,
		inAppReview: true,
		storeAppURL:{
			ios: '123456', 
			android: 'market://details?id=com.mypubz.eportal'
		},
		customLocale: {
			title: 'Do you enjoy %@?',
			message: 'If you enjoy %@. would you mind talking to rate it?',
			cancelButtonLabel: 'No, Thanks',
			laterButtonLabel: 'Remind Me Later',
			rateButtonLabel: 'Rate It Now'
		},
		callbacks:{
			onRateDialogShow: function(callback) {
				console.log('User Prompt for Rating');
			},
			onButtonClicked: function(buttonIndex){
				console.log('Selected Button Index',buttonIndex);
				if(buttonIndex == 3) this.apr = true;
			}
		},
		openUrl: this.appRate.preferences.openUrl
	}
    this.appRate.promptForRating(true); 
  }

  ngOnInit() {
	this.shareService.langc
	 .subscribe((lang) => {
		 console.log('list page: received language setting', lang);
		 if(lang) {
			 this.lang = lang;
			 this.translate.use(this.lang);
		 } else {
			 this.lang = 'en';
			 this.translate.use(this.lang);
		 }
	  }, (err) => {
	  });
	   this.shareService.adv
	         .subscribe((adc) => {
				 console.log('adv triggered', adc);
				 if(adc > 0) {
					 console.log('adv exists');
					 this.shareService.setADV(false);
					 admob.interstitial.show();
				 } 
			 });
	if(!this.bpf) {
		this.info = "Please wait, while the App fetches your current plan...";
	}
 }
 ngAfterViewInit() {
  this.platform.ready().then(() => {
	console.log('check location permission');
	this.shareService.plan
		.subscribe((pln) => {
		  console.log('pln', pln);
		  if(pln && pln.name != '') {
			this.plan = pln;
			if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') {
			} else if(this.plan.credits == 0) {
				this.router.navigate(['/subscribe'], {queryParams : {ci: true}, replaceUrl: true});
			}
        if(!this.bpf) {			
			for(let i = 1; i < 16; i++) {
				let fuse: boolean = true;
			  if( i == 4 ) fuse = false;
			  if(i < 4) {
				  this.r1items.push({
					title: this.title[i-1],
					note: this.note[i-1],
					icon: this.icons[i-1],
					spin: false,
					fuse: fuse
				  });
			  }
			  else if(i < 7) {
				  this.r2items.push({
					title: this.title[i-1],
					note: this.note[i-1],
					icon: this.icons[i-1],
					spin: false,
					fuse: fuse
				  });
			  }
			  else if(i < 10) {
				  this.r3items.push({
					title: this.title[i-1],
					note: this.note[i-1],
					icon: this.icons[i-1],
					spin: false,
					fuse: fuse
				  });
			  }
			  else  if(i < 13){
				  this.r4items.push({
					title: this.title[i-1],
					note: this.note[i-1],
					icon: this.icons[i-1],
					spin: false,
					fuse: fuse
				  });
			  }
			  else {
				  this.r5items.push({
					title: this.title[i-1],
					note: this.note[i-1],
					icon: this.icons[i-1],
					spin: false,
					fuse: fuse
				  });
			  }
			}
			
			this.bpf = true;
		}
			this.info = '';
			console.log('home-init', this.plan);
			if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') {
				this.r2items[0].fuse = true;
				this.r3items[0].fuse = true;
			}
		 
			  this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
				res => {
			  console.log('request permission?',res)
			  this.geolocation.getCurrentPosition().then((resp) => {
				  console.log('loc', resp);
					if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') {
					   this.shareService.setCLAT(resp.coords.latitude);
					   this.shareService.setCLNG(resp.coords.longitude);
					   this.showPanch();
					   this.getDST(resp.coords.latitude, resp.coords.longitude);
					} else {
					}
			   });  
		 }, (err) => {
			console.log(err);
		});
		if(!this.notif) {
			this.notif = true;
			this.horoService.getNotif(this.device.uuid)
			.subscribe(res => {
				if(res['status'] == 'R') {
					let ticket: Ticket = {
							uuid: res['uuid'],
							guid: res['guid'],
							resp: res['resp'],
							status: res['status']
						};	
						console.log('notification');
						this.ticket = ticket;
						this.router.navigate(['/mypubz-resp'], {state : this.ticket});
				} else if(res['status'] == 'CI') {
					this.router.navigate(['/subscribe'], {queryParams : {ci: true}, replaceUrl: true});
				}
			}, (err) => {
			  //this.splashScreen.hide();
			});	 
		}
	this.shareService.getMSGN().then( msgn => {
	  if(msgn != null && msgn.trim() != '') {
		this.dho.msgn = msgn;
		this.dho.img = this.sign_imgs_v[msgn.substring(0,2).toLowerCase()];
		this.shareService.getDHORO(msgn).then( res1 => {
			var cd = new Date();
		  if(res1) {
			if(res1.split('|')[0] == cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear()) {
			  this.dho.msg = JSON.stringify(res1).split('|')[0];
			  this.dho.smsg = JSON.stringify(this.dho.msg).substring(0,128) ;
			  this.dho.sho = true;
		    } else {
			  this.horoService.getDailyHoro(msgn)
				.subscribe(res2 => {
				this.shareService.setDHORO(msgn,   res2+ '|' + cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear());
			  this.dho.msg = JSON.stringify(res2);
			  this.dho.smsg = JSON.stringify(this.dho.msg).substring(0,128);
				this.dho.sho = true;
			  }, (err) => {
				//this.info = JSON.stringify(err);
			  }) ;
		 }
	  } else {
			  this.horoService.getDailyHoro(msgn)
				.subscribe(res2 => {
				this.shareService.setDHORO(msgn,   res2+ '|' + cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear());
				this.dho.msg = JSON.stringify(res2);
				this.dho.smsg = JSON.stringify(res2).substring(0,128);
				this.dho.sho = true;
			  }, (err) => {
				//this.info = JSON.stringify(err);
			  }) ;
	  }
    });
	}	else this.router.navigate(['/profile'], {queryParams : {source: 'proreq-home'}});
	this.shareService.getSSGN().then( ssgn => {
		if(!ssgn) this.router.navigate(['/profile'], {queryParams : {source: 'proreq-home'}});
	});
	this.shareService.getASGN().then( asgn => {
		if(!asgn) this.router.navigate(['/profile'], {queryParams : {source: 'proreq-home'}});
	});
    });
   }
   });
  });
 }
   getDST(lat, lng) {
    this.horoService.getTimezone(lat, lng, (Math.round((new Date().getTime())/1000)).toString())
		.subscribe(res2 => {
		   console.log(res2['timeZoneId'], res2['dstOffset']);
		   this.shareService.setLocalTZ(res2['timeZoneId'], res2['dstOffset']);
		   if(res2['timeZoneId'].indexOf('India') > -1) this.shareService.setCCODE('IN');
		   else this.shareService.setCCODE('US');
		}, (err) => {
		  console.log(err);
		}) ;
   }
 showPanch() {
   		var cd = new Date();
		let ayanid: number = (this.shareService.getRAYNM()) ? Number(this.shareService.getRAYNM()) : 1;
		this.info = "Fetching todays panchang...";
		this.horoService.getProMoonPhase(this.shareService.getCLAT(), this.shareService.getCLNG(), cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes()+ ':' + cd.getSeconds()+'Z', Intl.DateTimeFormat().resolvedOptions().timeZone, ayanid)
		   .subscribe(res3 => {
			   this.info = '';
		   this.bthi = false;
		   this.sunrise = res3['sunrise'];
		   this.sunset = res3['sunset'];
		   this.nak = this.shareService.translate_func(res3['birthStar']);
		   this.tithi = this.shareService.translate_func(res3['tithi']);
		   this.yog = this.shareService.translate_func(res3['yoga']);
		   this.karn = this.shareService.translate_func(res3['karana']);
		   this.calcPanch(cd, this.shareService.getCLAT(), this.shareService.getCLNG(), -(cd.getTimezoneOffset() / 60));
		   var ascPos = res3['ascPos'];
		   console.log(ascPos);
		   var lag = this.getDms(ascPos[0]);
		   console.log(lag);
		   this.lagna = lag;
		   //console.log(lag.indexOf('º'));
		   this.lag_d = Number(lag.substring(0, lag.indexOf('º')));
		   console.log(this.lag_d);
		   this.lag_m = Number(lag.substring(lag.indexOf('º')+1,  lag.indexOf("'")));
		   console.log(this.lag_m);
		   this.lag_s = Math.floor(lag.substring(lag.indexOf("'")+1,  lag.indexOf('"')));
		   console.log(this.lag_s);
		   //var c_mins = this.lag_d*60 + this.lag_m + Number((this.lag_s/60).toFixed(2));
		   //console.log(c_mins);
		   let sssl: string = this.calcStar(this.dmsToDec(this.lag_d, this.lag_m, this.lag_s));
		   console.log(sssl);
		   this.blag = false;
		   this.lagml = sssl.split('|')[0];
		   this.lagal = sssl.split('|')[1];
		   this.lagsl = sssl.split('|')[2];
		   var intv = setInterval(() =>  {
			//this.arcs++;
			//console.log('ticks=' + this.ticks.toString());
			if(this.ticks > 0) {
			this.lag_s += 15; 
			if(this.lag_s > 59) {
				this.lag_s = this.lag_s -59;
				this.lag_m++;
				if(this.lag_m > 59) {
					this.lag_m = 0;
					this.lag_d++;
				}
			}
			let lag_r: string = '';
			if(this.lag_d < 29) lag_r = 'Aries';
			else if(this.lag_d < 59) lag_r = 'Taurus';
			else if(this.lag_d < 89) lag_r = 'Gemini';
			else if(this.lag_d < 119) lag_r = 'Cancer';
			else if(this.lag_d < 149) lag_r = 'Leo';
			else if(this.lag_d < 179) lag_r = 'Virgo';
			else if(this.lag_d < 209) lag_r = 'Libra';
			else if(this.lag_d < 239) lag_r = 'Scorpio';
			else if(this.lag_d < 269) lag_r = 'Sagittarius';
			else if(this.lag_d < 299) lag_r = 'Capricorn';
			else if(this.lag_d < 329) lag_r = 'Aquarius';
			else lag_r = 'Pisces';
			
			this.lagna = lag_r + ' ' + this.lag_d.toString() + 'º' + this.lag_m.toString() + "'" + this.lag_s.toString() + '"';
		  // var cur_m = this.lag_d*60 + this.lag_m + Math.floor(this.lag_s/60);
		   //console.log(cur_m);
		   let sl: string = this.calcStar(this.dmsToDec(this.lag_d, this.lag_m, this.lag_s));
		   this.lagml = sl.split('|')[0];
		   this.lagal = sl.split('|')[1];
		   this.lagsl = sl.split('|')[2];
		   if(this.lag_d >= 360) {
			   this.lag_d = 0;
			   this.lag_m = 0;
			   this.lag_s = 0;
		   }
		  }
		    this.ticks++;
			//let key: string = this.lag_d.toString() + '-' + this.lag_m.toString() + '-' + this.lag_s.toString();
			//this.lagna = this.lag_d.toString() + 'º' + this.lag_m.toString() + "'" + this.lag_s.toString() + '"';
			//this.lagml = lagnas[key].split('-')[0];
			//this.lagal = lagnas[key].split('-')[1];
			//this.lagsl = lagnas[key].split('-')[2];
					//if(this.lag_d == 360) {
						//this.lag_d = 0;
						//this.lag_m = 0;
						//this.lag_s = 0;
					//}
			
		   },1000);
		  }, (err) => {
		});
}
 	calcPanch(cd, clat, clng, ofset) {
		//this.sdt = cd;
		//var cd = new Date();
		console.log('calcPanch', cd);
		console.log('ofset', ofset);
		//var jd = this.shareService.getJD(cd.getDate(), cd.getMonth() + 1, cd.getFullYear());
		//console.log('jd', jd);
		//console.log('lat', clat);
		//console.log('lng', clng);
		//var datestr = this.horoService.getDateString(cd)
		// var utcoffset = moment(datestr).tz(this.localtz).format('Z');
		//var a = utcoffset.split(":")
		//var tz = parseFloat(a[0]) + parseFloat(a[1])/60.0
		//this.sunrise = this.horoService.calcSunriseSet(1, jd, Number(clat), Number(clng), ofset, 0);
		console.log('sunrise', this.sunrise);
		//this.sunset = this.horoService.calcSunriseSet(0, jd, Number(clat), Number(clng), ofset, 0);
		console.log('sunset', this.sunset);
		var startTime = moment(this.sunrise + ':00 am', "HH:mm:ss a");
		var endTime = moment(this.sunset + ':00 pm', "HH:mm:ss a");
		var duration = moment.duration(endTime.diff(startTime));
		var hours = duration.asHours();
		var minutes = duration.asMinutes() % 60;
		//var tmins = moment(endTime).add(startTime.minutes(), 'm');
		var smins = startTime.hour() * 60 + startTime.minute();
		var emins = endTime.hour() * 60 + endTime.minute();
		var tmins = (smins + emins) / 2;
		var tothrs = Math.floor(tmins / 60);
		var totmins = (tmins % 60);
		var midTime = moment(tothrs.toString() + ':' + totmins.toString() + ':00 pm', "HH:mm:ss a");
		//var lnt = Math.floor(tothrs/2);
		//var totmins = hours*60 + minutes;
		var totalsec = hours * 60 * 60 + minutes * 60;
		var abhsecs = Math.floor(totalsec / 2);
		var abh = Math.floor((hours / 30) * 60);
		var abhs = moment(midTime).subtract(abh, 'm');
		var abhe = moment(midTime).add(abh, 'm');
		var ethsec = Math.floor(totalsec / 8);
		var ethmin = Math.floor(ethsec / 60);
		var eth = moment.utc(ethsec * 1000).format('HH:mm:ss');
		var weekdays = new Array(7);
		weekdays[0] = "SUN|8|5";
		weekdays[1] = "MON|2|4";
		weekdays[2] = "TUE|7|3";
		weekdays[3] = "WED|5|2";
		weekdays[4] = "THU|6|1";
		weekdays[5] = "FRI|4|7";
		weekdays[6] = "SAT|3|6";
		var rwv = parseInt(weekdays[cd.getDay()].split('|')[1]);
		var ywv = parseInt(weekdays[cd.getDay()].split('|')[2]);
		var srhu = moment(startTime).add((rwv - 1) * ethmin, 'm');
		var erhu = moment(srhu).add(ethmin, 'm');
		var sym = moment(startTime).add((ywv - 1) * ethmin, 'm');
		var eym = moment(sym).add(ethmin, 'm');
		this.rahukal = srhu.format('HH:mm') + ' To ' + erhu.format('HH:mm');
		this.yama = sym.format('HH:mm') + ' To ' + eym.format('HH:mm');
		this.abhjit = abhs.format('HH:mm') + ' To ' + abhe.format('HH:mm');
		//this.sunrise = this.sunrise.split(' ')[0];
		//this.sunset = this.sunset.split(' ')[0];
	}

   ngOnDestroy() {
    if (this.lstnr1) {
      this.lstnr1();
    }
    if (this.lstnr2) {
      this.lstnr2();
    }
    if (this.lstnr3) {
      this.lstnr3();
    }
   }
  ionViewDidEnter()
  {
	  this.vsts++;
	 // if(this.apr == false && this.vsts % 2 == 0) {
		  //this.showRatePrompt();
		  this.shareService.getADV()
	  //}
	  if(this.bpf) {
		for(let i = 0; i < 3 ; i++) {
		  this.r1items[i].spin = false;
		}
		for(let i = 0; i < 3; i++) {
		  this.r2items[i].spin = false;
		}
		for(let i = 0; i < 3; i++) {
		  this.r3items[i].spin = false;
		}
		for(let i = 0; i < 3; i++) {
		  this.r4items[i].spin = false;
		}
		for(let i = 0; i < 3; i++) {
		  this.r5items[i].spin = false;
		}
	  }
    if (this.lstnr1) {
      this.lstnr1();
    }
    if (this.lstnr2) {
      this.lstnr2();
    }
    if (this.lstnr3) {
      this.lstnr3();
    }
	this.lstnr1 = this.renderer.listen('document', 'admob.interstitial.close', (event) => {
	// document.addEventListener('admob.interstitial.close', () => {
		 console.log('home close event triggered');
	  // handle event
	 })	
	this.lstnr2 = this.renderer.listen('document', 'admob.reward_video.reward', (event) => {
//	document.addEventListener('admob.reward_video.reward', () => {
		console.log('home admob.reward_video.reward', this.brev);
	  // handle event
	    switch(this.choice)
		{
		 case 'Birth Chart':
		 case 'KP Astrology':
		 case 'Predictions':
		 case 'Yogas In Your Horoscope':
		 case 'Career Horoscope':
		 case 'Money Horoscope':
		 case 'Muhurtha by BV Raman':
		 case 'Divisional Charts':
			this.router.navigate(['/personal-details'], {queryParams : {title: this.choice}});
			break;
		 case 'Daily Horoscope':
			if(this.shareService.getMoonSign() == '') {
				this.router.navigate(['/personal-details'], {queryParams : {title: this.choice}});
			} else {
				this.router.navigate(['/daily-forecast'], {queryParams : {title: this.choice}});
			}
			break;
		case 'Prashna Jyotish':
			this.router.navigate(['/prashna-jyotish'], {queryParams : {title: this.choice}});
			break;
		case 'Kundli Matching':
			this.router.navigate(['/marriage-horo'], {queryParams : {title: this.choice}});
			break;
		default:
			break;
		}
	  this.brev = true;
	})
	this.lstnr3 = this.renderer.listen('document', 'admob.reward_video.exit_app', (event) => {
	//document.addEventListener('admob.reward_video.exit_app', () => {
	  // handle event
		console.log('home admob.reward_video.exit_app', this.brev);
		console.log(this.choice);
	  if(this.brev) {
		  this.brev = false;
	    switch(this.choice)
		{
		 case 'Birth Chart':
		 case 'KP Astrology':
		 case 'Predictions':
		 case 'Yogas In Your Horoscope':
		 case 'Career Horoscope':
		 case 'Money Horoscope':
		 case 'Muhurtha by BV Raman':
		 case 'Divisional Charts':
			this.router.navigate(['/personal-details'], {queryParams : {title: this.choice}});
			break;
		 case 'Daily Horoscope':
			if(this.shareService.getMoonSign() == '') {
				this.router.navigate(['/personal-details'], {queryParams : {title: this.choice}});
			} else {
				this.router.navigate(['/daily-forecast'], {queryParams : {title: this.choice}});
			}
			break;
		case 'Prashna Jyotish':
			this.router.navigate(['/prashna-jyotish'], {queryParams : {title: this.choice}});
			break;
		case 'Kundli Matching':
			this.router.navigate(['/marriage-horo'], {queryParams : {title: this.choice}});
			break;
		default:
			break;
		}
	  }
	})	
  }
  itemTapped(event, item) {
   event.preventDefault();	 
   item.spin = true;
   console.log(item.title);
   this.choice = item.title;
    switch(item.title)
    {
	 case 'Birth Chart':
	 case 'KP Astrology':
	 case 'Transit Predictions':
	 case 'Yogas In Your Horoscope':
	 case 'Career Horoscope':
	 case 'Money Horoscope':
	 case 'Muhurtha by BV Raman':
	 case 'Divisional Charts':
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') 
			this.router.navigate(['/personal-details'], {queryParams : {title: item.title}});
		else if(this.plan.credits > 0) {
			if(this.ticks > 60) {
				this.ticks = 0;
				let adu: string = this.adUnit(item.title);
				//admob.setDevMode(true);
				admob.interstitial.load({
				id: {
				  // replace with your ad unit IDs
				  android: adu,
				  ios: adu,
				  },
				}).then(() =>  {
				this.shareService.setADV(true);
				})		
			}
			this.router.navigate(['/personal-details'], {queryParams : {title: item.title}});
		} else if(this.shareService.getREWARD() && item.title != 'Personalized Calendar') {
			//admob.setDevMode(true);
		    admob.rewardVideo.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5788035885',
			  ios: 'ca-app-pub-8442845715303800/5788035885',
			  },
		    }).then(() => admob.rewardVideo.show())			
		}
		else
			this.router.navigate(['/personal-details'], {queryParams : {title: item.title}});
			//this.router.navigate(['/subscribe'], {queryParams : {title: item.title}});
		break;
	 case 'Daily Horoscope':
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') {
			if(this.shareService.getMoonSign() == null || this.shareService.getMoonSign().trim() == '') {
				this.router.navigate(['/profile'], {queryParams : {source: 'home'}});
			} else {
				console.log('Moonsign', this.shareService.getMoonSign())
				this.router.navigate(['/daily-forecast'], {queryParams : {title: item.title}});
			}
		} else if(this.shareService.getREWARD()) {
		    admob.rewardVideo.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5788035885',
			  ios: 'ca-app-pub-8442845715303800/5788035885',
			  },
		    }).then(() => admob.rewardVideo.show())			
		} else {
			if(this.ticks > 60) {
				this.ticks = 0;
			 let adu: string = this.adUnit(item.title);
			//admob.setDevMode(true);
		     admob.interstitial.load({
			 id: {
			  // replace with your ad unit IDs
			  android: adu,
			  ios: adu,
			  },
		     }).then(() => {
				this.shareService.setADV(true);
				//admob.interstitial.show()
			 })	
			}
			if(this.shareService.getMoonSign() == null || this.shareService.getMoonSign().trim() == '') {
				this.router.navigate(['/profile'], {queryParams : {source: 'home'}});
			} else {
				console.log('Moonsign', this.shareService.getMoonSign())
				this.router.navigate(['/daily-forecast'], {queryParams : {title: item.title}});
			}
		}		
		break;
	 case 'Prashna Jyotish':
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') 
			this.router.navigate(['/prashna-jyotish'], {queryParams : {title: item.title}});
		else if(this.plan.name == 'com.mypubz.eportal.month'|| this.plan.name == 'com.mypubz.eportal.year' || this.plan.credits > 0) {
			if(this.ticks > 60) {
				this.ticks = 0;
				let adu: string = this.adUnit(item.title);
			//admob.setDevMode(true);
				admob.interstitial.load({
				id: {
			  // replace with your ad unit IDs
				android: adu,
				ios: adu,
				},
				}).then(() => { 
					this.shareService.setADV(true);
				})
			  }
			  this.router.navigate(['/prashna-jyotish'], {queryParams : {title: item.title}});
		} else if(this.shareService.getREWARD()) {
		    admob.rewardVideo.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5788035885',
			  ios: 'ca-app-pub-8442845715303800/5788035885',
			  },
		    }).then(() => admob.rewardVideo.show())			
		} else
			this.router.navigate(['/subscribe'], {queryParams : {title: item.title}});
	    break;
	 case 'Kundli Matching':
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') 
			this.router.navigate(['/marriage-horo'], {queryParams : {title: item.title}});
		else if(this.plan.name == 'com.mypubz.eportal.month'|| this.plan.name == 'com.mypubz.eportal.year' || this.plan.credits > 0) {
			if(this.ticks > 60) {
				this.ticks = 0;
				let adu: string = this.adUnit(item.title);
			//admob.setDevMode(true);
				admob.interstitial.load({
				id: {
			  // replace with your ad unit IDs
				android: adu,
				ios: adu,
				},
				}).then(() => {
				//admob.interstitial.show())		
					this.shareService.setADV(true);
				})
			}				
			this.router.navigate(['/marriage-horo'], {queryParams : {title: item.title}});
		} else if(this.shareService.getREWARD()) {
		    admob.rewardVideo.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5788035885',
			  ios: 'ca-app-pub-8442845715303800/5788035885',
			  },
		    }).then(() => admob.rewardVideo.show())			
		} else
			this.router.navigate(['/subscribe'], {queryParams : {title: item.title}});
		break;
	 case 'Vedic Stories':
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') 
			this.router.navigate(['/stories'], {queryParams : {title: item.title}});
		else {
			if(this.ticks > 60) {
				this.ticks = 0;
				let adu: string = this.adUnit(item.title);
			//admob.setDevMode(true);
				admob.interstitial.load({
				id: {
			  // replace with your ad unit IDs
				android: adu,
				ios: adu,
				},
				}).then(() => {
				//admob.interstitial.show())		
					this.shareService.setADV(true);
				})
			}				
			this.router.navigate(['/stories'], {queryParams : {title: item.title}});
		}			
		break;
	case 'Write an Article':
	   this.article();
	   break;
	 case 'Talk to Astrologer':
	    this.router.navigate(['/astrologers'], {queryParams : {title: item.title}});
		break;
	case 'Hindu Calendar':
	    this.router.navigate(['/hindu-cal']);
		break;
	case 'Games':
	    this.openUrl();
		break;
	case 'Personalized Report':
	    this.router.navigate(['/reports']);
	   break;
	 default:
		break;
    }
   }
   yogs() {
	    this.router.navigate(['/personal-details'], {queryParams : {title: 'Yogas In Your Horoscope'}});
   }
   daily() {
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') {
			if(this.shareService.getMoonSign() == '') {
				this.router.navigate(['/profile'], {queryParams : {source: 'home'}});
			} else {
				this.router.navigate(['/daily-forecast'], {queryParams : {title: 'Daily Horoscope'}});
			}
		} else if(this.shareService.getREWARD()) {
		    admob.rewardVideo.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5788035885',
			  ios: 'ca-app-pub-8442845715303800/5788035885',
			  },
		    }).then(() => admob.rewardVideo.show())			
		} else {
			if(this.ticks > 60) {
				this.ticks = 0;
				let adu: string = this.adUnit('Daily Horoscope');
			//admob.setDevMode(true);
				admob.interstitial.load({
				id: {
			  // replace with your ad unit IDs
				android: adu,
				ios: adu,
				},
			 }).then(() => {
				this.shareService.setADV(true);
				//admob.interstitial.show()
			})	
		  }			
			this.router.navigate(['/daily-forecast'], {queryParams : {title: 'Daily Horoscope'}});
		}		
   }
   adUnit(choice: string)
   {
	   let adu: string = 'ca-app-pub-8442845715303800/9358299242';
	   switch(choice)
	   {
		 case 'Birth Chart':
			adu = 'ca-app-pub-8442845715303800/9358299242';
			break;
		 case 'KP Astrology':
			adu = 'ca-app-pub-8442845715303800/7470502506';
			break;
		 case 'Predictions':
			adu = 'ca-app-pub-8442845715303800/8031293215';
			break;
		 case 'Yogas In Your Horoscope':
			adu = 'ca-app-pub-8442845715303800/6353921799';
			break;
		 case 'Career Horoscope':
			adu = 'ca-app-pub-8442845715303800/2090107688';
			break;
		 case 'Money Horoscope':
			adu = 'ca-app-pub-8442845715303800/8867601157';
			break;
		 case 'Personalized Calendar':
			adu = 'ca-app-pub-8442845715303800/3342144443';
			break;
		 case 'Divisional Charts':
			adu = 'ca-app-pub-8442845715303800/2339277287';
			break;
		 case 'Daily Horoscope':
			adu = 'ca-app-pub-8442845715303800/2778966539';
			break;
		 case 'Prashna Jyotish':
			adu = 'ca-app-pub-8442845715303800/6131959316';
			break;
		 case 'Kundli Matching':
			adu = 'ca-app-pub-8442845715303800/2040599938';
			break;
		 case 'Vedic Stories':
		    adu = 'ca-app-pub-8442845715303800/8208869109';
			break;
		 default:
			break;
	   }
	   return adu;
   }
  viewPanchang()
  {
	  console.log('viewPanchang');
	    if(this.plan.name != 'com.mypubz.eportal.astrologer' && this.plan.name != 'com.mypubz.eportal.adfree' && this.plan.name != 'com.mypubz.eportal.month' && this.plan.name != 'com.mypubz.eportal.year') {
			//admob.setDevMode(true);
			this.choice = 'Panch';
		    admob.interstitial.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/4044525017',
			  ios: 'ca-app-pub-8442845715303800/4044525017',
			  },
		    }).then(() => {
				//admob.interstitial.show())
				this.shareService.setADV(true);
			})
		} 		
	  this.router.navigate(['/panchang'], {queryParams : {title: 'panchang'}});
	//this.navCtrl.push(PanchangPage);
  }
  switchLanguage() {
    this.translate.use(this.lang);
	console.log(this.lang);
	this.shareService.setLANG(this.lang);
  }
  advt()
  {
//	 if(this.adv.tag == 'blogad')  
	//	this.navCtrl.push(PublishBlogPage, {item: 'PublishBlogPage'});
  }
  calcStar(mins: number)
  {
		//console.log('calcStar', mins);
		for(var i = 0; i < Object.keys(this.sublords_v).length; i++)
		{
			var nak = this.sublords_v[i];
			var degs = this.sublords_v[i].deg;
			var s_mins = this.dmsToDec(Number(degs.split('-')[0].split('.')[0]), Number(degs.split('-')[0].split('.')[1]), Number(degs.split('-')[0].split('.')[2]));
			var e_mins = this.dmsToDec(Number(degs.split('-')[1].split('.')[0]), Number(degs.split('-')[1].split('.')[1]), Number(degs.split('-')[1].split('.')[2]));
			//var deg_s = parseFloat(degs.split('-')[0].split('.')[0] + '.' + degs.split('-')[0].split('.')[1]);
			//var deg_e = parseFloat(degs.split('-')[1].split('.')[0] + '.' + degs.split('-')[1].split('.')[1]);
			//console.log(s_mins);
			//console.log(e_mins);
			if(mins >= s_mins && mins < e_mins) {
			    //console.log(s_mins);
				//console.log(e_mins);
				return nak.sign + '|' + nak.star + '|' + nak.sub;
			}
		}
		console.log('calcStar', -1);
		return '-1';
  }
  
	getDms(val:any) {

        // Required variables
        var valDeg, valMin, valSec, result;

        // Here you'll convert the value received in the parameter to an absolute value.
        // Conversion of negative to positive.
        // In this step it does not matter if it's North, South, East or West,
        // such verification was performed earlier.
        val = Math.abs(val); // -40.601203 = 40.601203

        // ---- Degrees ----
        // Stores the integer of DD for the Degrees value in DMS
        valDeg = Math.floor(val); // 40.601203 = 40

        // Add the degrees value to the result by adding the degrees symbol "º".
        result = valDeg + "º"; // 40º

        // ---- Minutes ----
        // Removing the integer of the initial value you get the decimal portion.
        // Multiply the decimal portion by 60.
        // Math.floor returns an integer discarding the decimal portion.
        // ((40.601203 - 40 = 0.601203) * 60 = 36.07218) = 36
        valMin = Math.floor((val - valDeg) * 60); // 36.07218 = 36

        // Add minutes to the result, adding the symbol minutes "'".
        result += valMin + "'"; // 40º36'

        // ---- Seconds ----
        // To get the value in seconds is required:
        // 1º - removing the degree value to the initial value: 40 - 40.601203 = 0.601203;
        // 2º - convert the value minutes (36') in decimal ( valMin/60 = 0.6) so
        // you can subtract the previous value: 0.601203 - 0.6 = 0.001203;
        // 3º - now that you have the seconds value in decimal,
        // you need to convert it into seconds of degree.
        // To do so multiply this value (0.001203) by 3600, which is
        // the number of seconds in a degree.
        // You get 0.001203 * 3600 = 4.3308
        // As you are using the function Math.round(),
        // which rounds a value to the next unit,
        // you can control the number of decimal places
        // by multiplying by 1000 before Math.round
        // and subsequent division by 1000 after Math.round function.
        // You get 4.3308 * 1000 = 4330.8 -> Math.round = 4331 -> 4331 / 1000 = 4.331
        // In this case the final value will have three decimal places.
        // If you only want two decimal places
        // just replace the value 1000 by 100.
        valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000; // 40.601203 = 4.331 

        // Add the seconds value to the result,
        // adding the seconds symbol " " ".
        result += valSec + '"'; // 40º36'4.331"

        // Returns the resulting string.
        return result;
	}
	dmsToDec(d, m, s)
    {
       let v: number = d + (m /60) + (s /3600);
       return Number(v.toFixed(2));
    }
  subscribe() {
	  this.router.navigate(['/subscribe']);
  }
  openUrl() {
    this.browserTab.isAvailable()
        .then((isAvailable: boolean) => {
        if(isAvailable) {
            this.browserTab.openUrl('https://www.gamezop.com/?id=bh0UMvrkw');
        } else {
            // if custom tabs are not available you may  use InAppBrowser
        }
      });   
	}
	article() {
		this.router.navigate(['/publish-blog']);
	}
	dhoro() {
		this.router.navigate(['/daily-forecast'], {state : this.dho});
	}
	rightmenu() {
		this.menu.open('second');
	}
	btr() {
		this.router.navigate(['/btr'], {state: null});
	}
}
