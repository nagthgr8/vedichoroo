import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events  } from 'ionic-angular';
import { Device } from '@ionic-native/device';
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

@Component({
  templateUrl: 'app.html',
  providers: [ HoroscopeService ]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = ListPage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
	public backgroundMode : BackgroundMode,
	public shareService: ShareService,
	public horoService: HoroscopeService,
	public device: Device,
	public events: Events	
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Birth Chart', component: PersonalDetailsPage, icon: 'planet' },
      { title: 'Star Constellation', component: StarConstPage, icon: 'star'},
      { title: 'Love Horoscope', component: LovehoroPage, icon: 'heart' },
      { title: 'KP Astrology', component: PersonalDetailsPage, icon: 'flower' },
      { title: 'Divisional Charts', component: PersonalDetailsPage, icon: 'podium' },
	  { title: 'Daily Horoscope', component: DailyForecastPage, icon: 'sunny' },
	  { title: 'Vedic Stories', component: StoriesPage, icon: 'paper' },
      { title: 'Subscribe', component: SubscribePage, icon: 'apps' },
      { title: 'Available Credits', component: CreditsPage, icon: 'cash' },
	  { title: 'Privacy Policy', component: PrivacyPage, icon: 'lock' },
	  { title: 'Help Desk', component: HelpDeskPage, icon: 'help-circle'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
	  this.backgroundMode.setDefaults({ silent: true });
	  this.backgroundMode.enable();
	  //var tom4 = moment().add(1, 'days').hours(4).minutes(0).seconds(0);
	  console.log(this.device.uuid);
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
					this.pages[8].title = 'Available Credits(UNL)';
				else
					this.pages[8].title = 'Available Credits(' + res['credits'] + ')';
			}, (err) => {
			});	  
	 this.events.publish('available:credits', this.pages[8]);	 
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
