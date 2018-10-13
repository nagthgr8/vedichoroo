import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { PersonalDetailsPage } from '../pages/personal-details/personal-details';

import { ListPage } from '../pages/list/list';
import { LovehoroPage } from '../pages/lovehoro/lovehoro';
import { DailyForecastPage } from '../pages/dailyforecast/dailyforecast';
import { StarConstPage } from '../pages/star-const/star-const';
import { StoriesPage } from '../pages/stories/stories';
import { PrivacyPage } from '../pages/privacy/privacy';
import { ShareService } from './share.service'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HoroscopeService } from './horoscope.service';
import { BackgroundMode } from '@ionic-native/background-mode';

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
	public shareService: ShareService
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Birth Chart', component: PersonalDetailsPage, icon: 'planet' },
      { title: 'Star Constellation', component: StarConstPage, icon: 'star'},
      { title: 'Love Horoscope', component: LovehoroPage, icon: 'heart' },
      { title: 'KP Astrology', component: PersonalDetailsPage, icon: 'flower' },
      { title: 'Yogas in Horoscope', component: PersonalDetailsPage, icon: 'body' },
      { title: 'Divisional Charts', component: PersonalDetailsPage, icon: 'podium' },
	  { title: 'Daily Horoscope', component: DailyForecastPage, icon: 'sunny' },
	  { title: 'Vedic Stories', component: StoriesPage, icon: 'paper' },
	  { title: 'Privacy Policy', component: PrivacyPage, icon: 'lock' },
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
