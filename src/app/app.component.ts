import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events  } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { PowerManagement } from '@ionic-native/power-management';
import { Geolocation } from '@ionic-native/geolocation';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Media, MediaObject } from '@ionic-native/media';
import { PersonalDetailsPage } from '../pages/personal-details/personal-details';
import { ListPage } from '../pages/list/list';
import { LovehoroPage } from '../pages/lovehoro/lovehoro';
import { DailyForecastPage } from '../pages/dailyforecast/dailyforecast';
import { StarConstPage } from '../pages/star-const/star-const';
import { StoriesPage } from '../pages/stories/stories';
import { SubscribePage } from '../pages/subscribe/subscribe';
import { PrivacyPage } from '../pages/privacy/privacy';
import { HelpDeskPage } from '../pages/help-desk/help-desk';
import { MypubzRespPage } from '../pages/mypubz-resp/mypubz-resp';
import { ShareService } from './share.service'
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HoroscopeService } from './horoscope.service';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Ticket } from './ticket';
import {CreditsPage} from '../pages/credits/credits';
import {PanchangPage} from '../pages/panchang/panchang';
import {NotificationsPage} from '../pages/notifications/notifications';
import * as moment from 'moment';

@Component({
  templateUrl: 'app.html',
  providers: [ HoroscopeService ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  file: any;
  backmode: boolean = false;
  rootPage = ListPage;
  pages: Array<{title: string, component: any, icon: string}>;
  constructor(
    private powerManagement: PowerManagement,
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
	public backgroundMode : BackgroundMode,
	public shareService: ShareService,
	public horoService: HoroscopeService,
	public device: Device,
	public events: Events,
	public localNotifs: LocalNotifications,
	private geolocation: Geolocation,
	private media: Media,
	private backgroundGeolocation: BackgroundGeolocation
  ) {
    this.backmode = false;
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Birth Chart', component: PersonalDetailsPage, icon: 'planet' },
      { title: 'Panchangam', component: PanchangPage, icon: 'time'},
      { title: 'Star Constellation', component: StarConstPage, icon: 'star'},
      { title: 'Love Horoscope', component: LovehoroPage, icon: 'heart' },
      { title: 'KP Astrology', component: PersonalDetailsPage, icon: 'flower' },
      { title: 'Divisional Charts', component: PersonalDetailsPage, icon: 'podium' },
	  { title: 'Daily Horoscope', component: DailyForecastPage, icon: 'sunny' },
	  { title: 'Vedic Stories', component: StoriesPage, icon: 'paper' },
      { title: 'Subscribe', component: SubscribePage, icon: 'apps' },
      { title: 'Available Credits', component: CreditsPage, icon: 'cash' },
	  { title: 'Privacy Policy', component: PrivacyPage, icon: 'lock' },
	  { title: 'Notifications', component: NotificationsPage, icon: 'notifications' },
	  { title: 'Help Desk', component: HelpDeskPage, icon: 'help-circle'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
	  this.events.subscribe('dbfetch:rahu', (notify) => {
	      if(notify && !this.backmode) {
			console.log('enabling background mode');
			this.backgroundMode.enable();
		  } 
	  });
	  this.events.subscribe('dbfetch:rahus', (notify) => {
	      if(notify && !this.backmode) {
			console.log('enabling background mode');
			this.backgroundMode.enable();
		  } 
	  });
	  this.events.subscribe('dbfetch:rahut1', (notify) => {
	      if(notify && !this.backmode) {
			console.log('enabling background mode');
			this.backgroundMode.enable();
		  } 
	  });
	  this.events.subscribe('dbfetch:rahut2', (notify) => {
	      if(notify && !this.backmode) {
			console.log('enabling background mode');
			this.backgroundMode.enable();
		  } 
	  });
	  this.events.subscribe('dbfetch:rahut3', (notify) => {
	      if(notify && !this.backmode) {
			console.log('enabling background mode');
			this.backgroundMode.enable();
		  } 
	  });
	  this.events.subscribe('dbfetch:sunrise', (notify) => {
	      if(notify && !this.backmode) {
			console.log('enabling background mode');
			this.backgroundMode.enable();
		  } 
	  });
	  this.events.subscribe('dbfetch:sunset', (notify) => {
	      if(notify && !this.backmode) {
			console.log('enabling background mode');
			this.backgroundMode.enable();
		  } 
	  });
	  this.backgroundMode.on('disable').subscribe(() => {
	    console.log('triggered disable event');
		this.backmode = false;
	  });
	  this.backgroundMode.on('enable').subscribe(() => {
	    console.log('triggered enable event');
		this.backmode = true;
	  });
	  this.backgroundMode.on('activate').subscribe(() => {
	    console.log('triggered disableWebViewOptimizations()');
		this.backgroundMode.disableWebViewOptimizations(); 
	  });
	  this.events.subscribe('backmode', (res) => {
	     if(this.shareService.getRAHU() || this.shareService.getRAHUS() || this.shareService.getRAHUT1() || this.shareService.getRAHUT2() || this.shareService.getRAHUT3() || this.shareService.getSUNR() || this.shareService.getSUNS()) {
		     if(!this.backmode) {
				 console.log('enabling background mode');
				 this.backgroundMode.enable();
			 }
		 } else {
		     if(this.backmode) {
				 console.log('disabling background mode');
				 this.backgroundMode.disable();
			 }
		 }
	  });
	  this.backgroundMode.setDefaults({
        title: "126 Astrology",
        text: "Working for you in the background",
        icon: 'assets/icon/icon.png',
        hidden: true
		});
	if (this.platform.is('android')) {
        this.powerManagement.dim().then(() => {
            console.log('enablebackground: Wakelock acquired');
        }, function () {	
            console.log('enablebackground: Failed to acquire wakelock');
        });
		this.powerManagement.setReleaseOnPause(false).then(() => {
			 console.log('enablebackground: setReleaseOnPause success');
		  }, (err) => {
			console.log('enablebackground: setReleaseOnPause Failed to set');
		});	  
    }		
	
	//this.backgroundMode.setDefaults({ silent: true });
	  //this.backgroundMode.enable();
	  //var tom4 = moment().add(1, 'days').hours(4).minutes(0).seconds(0);
	  console.log(this.device.uuid);
	  console.log('Fetching geolocation...');
	this.geolocation.getCurrentPosition().then((resp) => {
	    this.shareService.setCLAT(resp.coords.latitude);
		this.shareService.setCLNG(resp.coords.longitude);
		this.shareService.setTSTMP(resp.timestamp);
	    this.horoService.getTimezone(resp.coords.latitude.toString(), resp.coords.longitude.toString(), (resp.timestamp/1000).toString())
		.subscribe(res2 => {
		  console.log('rawOffset=' + parseInt(res2['rawOffset'])/3600);
		  this.shareService.setLTZO(parseInt(res2['rawOffset'])/3600);
		  this.shareService.setLocalTZ(res2['timeZoneId']);
		  console.log('Local Timezone(app): ' + this.shareService.getLocalTZ());
			this.events.publish('curpos', 'success');
		}, (err) => {
		    console.log(err);
		});
	   
	}).catch((error) => {
		console.log('Error getting location', error);
	});
			let config = {
				desiredAccuracy: 0,
				stationaryRadius: 20,
				distanceFilter: 10,
				debug: true,
				interval: 2000
			  };
			 
	this.backgroundGeolocation.configure(config).subscribe((location) => {	
        console.log('background-geolocation fetched', location);	
		this.shareService.setCLAT(location.latitude);
		this.shareService.setCLNG(location.longitude);
		this.shareService.setTSTMP(location.time);
	}, (err) => {
     console.log(err);
   });	
   console.log('starting background-geolocation service');
   this.backgroundGeolocation.start();
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
				console.log(this.nav);
				this.nav.setRoot(MypubzRespPage, {ticket: ticket});
		} else if(res['status'] == 'CI') {
			this.nav.setRoot(SubscribePage, {ci: true});
		}
	}, (err) => {
	});	  
	  this.horoService.getPlan(this.device.uuid)
		   .subscribe(res => {
		        console.log('Updated the plan details from App component');
				if(res['name'] == 'com.mypubz.eportal.astrologer')
					this.pages[9].title = 'Available Credits(UNL)';
				else
					this.pages[9].title = 'Available Credits(' + res['credits'] + ')';
			}, (err) => {
			});	  
	 this.events.publish('available:credits', this.pages[8]);
	 var cd = new Date();
	 cd.setDate(cd.getDate()+1);
	 cd.setHours(5,0,0,0);
	this.localNotifs.schedule({  
	  id: 999,
	  trigger: { at: cd }
	});
	this.localNotifs.on('trigger').subscribe(notification  => {
            console.log("Triggering notification (Page)",notification);
			if(notification.id == 126) {
			   // this.file.stop();
				//this.file.release();
			    console.log('sunrise notification triggered..');
				 var p = window.location.pathname;
				var path = p.substring(0, p.lastIndexOf('/')) + '/assets/sounds/';
				console.log(path);
				this.file = this.media.create(path + 'krish.mp3');
				this.file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
				this.file.onSuccess.subscribe(() => console.log('Action is successful'));
				this.file.onError.subscribe(error => console.log('Error!', error));
				console.log('playing music');
				this.file.play();
			} else if(notification.id == 130) {
			    console.log('rahu kaal notification triggered..');
				 var p = window.location.pathname;
				var path = p.substring(0, p.lastIndexOf('/')) + '/assets/sounds/';
				console.log(path);
				this.file = this.media.create(path + 'rahu.mp3');
				this.file.onStatusUpdate.subscribe(status => console.log(status)); // fires when file status changes
				this.file.onSuccess.subscribe(() => console.log('Action is successful'));
				this.file.onError.subscribe(error => console.log('Error!', error));
				console.log('playing music');
				this.file.play();
			} else if(notification.id == 999) {
                  this.localNotifs.clear(notification.id).then((result)=> {
                      console.log('Successfully cleared',result);
					 var d1 = new Date();
						 d1.setDate(d1.getDate()+1);
						 d1.setHours(5,0,0,0);
						this.localNotifs.schedule({  
						  id: 999,
						  trigger: { at: d1 }
						});					  
					}).catch((err)=> {
						  console.log('Failed clearing notification',err);
					})	
					console.log('getting timezone...');
					if(this.shareService.getTSTMP() == 0) { 
					    console.log('geolocation not identified.');
						return;
					}
					this.horoService.getTimezone(this.shareService.getCLAT().toString(), this.shareService.getCLNG().toString(), (this.shareService.getTSTMP()/1000).toString())
					 .subscribe(res2 => {
					  console.log('rawOffset=' + parseInt(res2['rawOffset'])/3600);
					  this.shareService.setLTZO(parseInt(res2['rawOffset'])/3600);
					  this.shareService.setLocalTZ(res2['timeZoneId']);
					  console.log('Local Timezone(app): ' + this.shareService.getLocalTZ());
						this.events.publish('curpos', 'success');
						 var cd = new Date();
						 var jd = this.horoService.getJD(cd.getDate(), cd.getMonth()+1, cd.getFullYear());
						 var sunrise = this.horoService.calcSunriseSet(1, jd, this.shareService.getCLAT(), this.shareService.getCLNG(), this.shareService.getLTZO(), 0);//parseInt(res2['rawOffset'])/3600, 0);
						 var sunset = this.horoService.calcSunriseSet(0, jd, this.shareService.getCLAT(), this.shareService.getCLNG(), this.shareService.getLTZO(), 0);//parseInt(res2['rawOffset'])/3600, 0);
						var startTime=moment(sunrise +':00 am', "HH:mm:ss a");
						var endTime=moment(sunset + ':00 pm', "HH:mm:ss a");
						var duration = moment.duration(endTime.diff(startTime));
						var hours = duration.asHours();
						var minutes = duration.asMinutes()%60;
						//var tmins = moment(endTime).add(startTime.minutes(), 'm');
						var smins = startTime.hour()*60 + startTime.minute();
						var emins = endTime.hour()*60 + endTime.minute();
						var tmins = (smins + emins)/2;
						var tothrs = Math.floor(tmins/60);
						var totmins = (tmins % 60);
						var midTime = moment(tothrs.toString() + ':' + totmins.toString() + ':00 pm', "HH:mm:ss a");
						//var lnt = Math.floor(tothrs/2);
						//var totmins = hours*60 + minutes;
						var totalsec = hours*60*60 + minutes*60;
						var abhsecs = Math.floor(totalsec/2);
						var abh = Math.floor((hours/30)*60);
						var abhs = moment(midTime).subtract(abh, 'm');
						var abhe = moment(midTime).add(abh, 'm');
						var ethsec = Math.floor(totalsec/8);
						var ethmin = Math.floor(ethsec/60);
						var eth = moment.utc(ethsec*1000).format('HH:mm:ss');
						var weekdays = new Array(7);
						weekdays[0] = "SUN|8|5";
						weekdays[1] = "MON|2|4";
						weekdays[2] = "TUE|7|3";
						weekdays[3] = "WED|5|2";
						weekdays[4] = "THU|6|1";
						weekdays[5] = "FRI|4|7";
						weekdays[6] = "SAT|3|6";	
						var rwv = parseInt(weekdays[cd.getDay()].split('|')[1]);
						//var ywv = parseInt(weekdays[cd.getDay()].split('|')[2]);
						//var srhu = moment(startTime).add((rwv-1)*ethmin, 'm');
						//var erhu = moment(srhu).add(ethmin, 'm');
						//var sym = moment(startTime).add((ywv-1)*ethmin, 'm');
						//var eym = moment(sym).add(ethmin, 'm');
					     if(this.shareService.getRAHU()) {
						  var srhu = moment(startTime).add((rwv-1)*ethmin, 'm');
						  var erhu = moment(srhu).add(ethmin, 'm');
						  let msg = 'Today Rahu Kalam begins at ' + srhu.format('HH:mm') + ' and ends at ' + erhu.format('HH:mm') + ' in your current location';
					        if(this.shareService.getRAHUT1()) {
							    var srhu1 = moment(startTime).add((rwv-2)*ethmin, 'm');
							    this.localNotifs.schedule({
								  id: 127,
								  title: 'Rahu Kaalam',
								  text: 'Rahu Kaalam starts in 1 hour',
								  led: 'FF0000',
								  icon: 'https://66.media.tumblr.com/e5dbe359045e1bd4aadcd3326ea5712b/tumblr_phkcj7LrJb1xp0noco1_75sq.png',
								  trigger: {at: new Date(srhu.format('DD/MM/YYYY HH:mm'))}
								});
							}
					        if(this.shareService.getRAHUT2()) {
							    var srhu1 = moment(startTime).add((rwv-1.5)*ethmin, 'm');
							    this.localNotifs.schedule({
								  id: 128,
								  title: 'Rahu Kaalam',
								  text: 'Rahu Kaalam starts in 30 minutes',
								  led: 'FF0000',
								  icon: 'https://66.media.tumblr.com/e5dbe359045e1bd4aadcd3326ea5712b/tumblr_phkcj7LrJb1xp0noco1_75sq.png',
								  trigger: {at: new Date(srhu1.format('DD/MM/YYYY HH:mm'))}
								});
							}
					        if(this.shareService.getRAHUT3()) {
							    var srhu1 = moment(startTime);
							    this.localNotifs.schedule({
								  id: 129,
								  title: 'Rahu Kaalam',
								  text: msg,
								  led: 'FF0000',
								  icon: 'https://66.media.tumblr.com/e5dbe359045e1bd4aadcd3326ea5712b/tumblr_phkcj7LrJb1xp0noco1_75sq.png',
								  trigger: {at: new Date(srhu1.format('DD/MM/YYYY HH:mm'))}
								});
							}
							if(this.shareService.getRAHUS()) {
							    this.localNotifs.schedule({
								  id: 130,
								  title: 'Rahu Kaalam',
								  text: 'Rahu Kaalam started.',
								  led: 'FF0000',
								  icon: 'https://66.media.tumblr.com/e5dbe359045e1bd4aadcd3326ea5712b/tumblr_phkcj7LrJb1xp0noco1_75sq.png',
								  trigger: {at: new Date(srhu.format('DD/MM/YYYY HH:mm'))}
								});
							}
						  }
						  if(this.shareService.getSUNR()) {
							    this.localNotifs.schedule({
								  id: 126,
								  title: 'Good Morning',
								  text: 'Sun has raised at your current location',
								  led: 'FF0000',
								  icon: 'https://66.media.tumblr.com/ec76b7d7e0529af6e3a437edb6c6c255/tumblr_phiurjqePq1xp0noco1_75sq.png',
								  trigger: {at: new Date(startTime.format('DD/MM/YYYY HH:mm'))}
								});
						  }
						  if(this.shareService.getSUNR()) {
							    this.localNotifs.schedule({
								  id: 126,
								  title: 'Good Morning',
								  text: 'Sunset happened at your current location',
								  led: 'FF0000',
								  icon: 'https://66.media.tumblr.com/13aee56bcd3ca9e102f84df710ee7157/tumblr_phiut1zqQs1xp0noco1_75sq.png',
								  trigger: {at: new Date(endTime.format('DD/MM/YYYY HH:mm'))}
								});
						  }
					    }, (err) => {
							console.log(err);
						});
					       
					//});//.catch((error) => {
					//	console.log('Error getting location', error);
					//});
			} 
          //return;
        });	
	this.localNotifs.on('click').subscribe(notification => {
	      console.log('Notification clicked by user..');
              this.localNotifs.clear(notification.id).then((result)=> {
                      console.log('Successfully cleared',result);
					  if(notification.id == 126) {
					     //this.file.stop();
						 //this.file.release();
						this.nav.push(DailyForecastPage);
					   }
                  }).catch((err)=> {
                      console.log('Failed clearing notification',err);
                  })	
		});
   });
 }
  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
	 if(page.title == 'Daily Horoscope') {
	  if(this.shareService.getMoonSign() == null) {
		 this.nav.push(PersonalDetailsPage, {
		  item: page
		  });
	  } else {
		 this.nav.push(DailyForecastPage, {
		  item: page
		  });
	  }
    } else {	
		// navigate to the new page if it is not the current page
		this.nav.setRoot(page.component, {item: page});
	}
  }

}
