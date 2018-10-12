import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { PersonalDetailsPage } from '../pages/personal-details/personal-details';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { HoroscopePage } from '../pages/horoscope/horoscope';
import { KpAstroPage } from '../pages/kp-astro/kp-astro';
import { PredictionsPage } from '../pages/predictions/predictions';
import { SubscribePage } from '../pages/subscribe/subscribe';
import { LovehoroPage } from '../pages/lovehoro/lovehoro';
import { StarConstPage } from '../pages/star-const/star-const';
import { RajayogaPage } from '../pages/rajayoga/rajayoga';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { DailyForecastPage } from '../pages/dailyforecast/dailyforecast';
import { ArticlePage } from '../pages/article/article';
import { StoriesPage } from '../pages/stories/stories';
import { ChooseLanPage } from '../pages/choose-lan/choose-lan';
import { PrivacyPage } from '../pages/privacy/privacy';
import { CareerhoroPage } from '../pages/careerhoro/careerhoro';
import { MoneyhoroPage } from '../pages/moneyhoro/moneyhoro';
import { DivchartsPage } from '../pages/divcharts/divcharts';
import { ChartAnalysisPage } from '../pages/chart-analysis/chart-analysis';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HoroscopeService } from './horoscope.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ShareService } from './share.service';
import { LanguageService } from '../providers/language.service';
import {GetJsonService } from './getjson.service';
import { AppRate } from '@ionic-native/app-rate';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Geolocation } from '@ionic-native/geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
@NgModule({
  declarations: [
    MyApp,
	PersonalDetailsPage, 
    ItemDetailsPage,
    ListPage,
	AutocompletePage,
	HoroscopePage,
	DailyForecastPage,
	LovehoroPage,
	RajayogaPage,
	StarConstPage,
	StoriesPage,
	ArticlePage,
	KpAstroPage,
	PredictionsPage,
	SubscribePage,
	DivchartsPage,
	ChartAnalysisPage,
	ChooseLanPage,
	CareerhoroPage,
	MoneyhoroPage,
	PrivacyPage
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot(),
	TranslateModule.forRoot({
	loader: {
			 provide: TranslateLoader,
			 useFactory: (createTranslateLoader),
			 deps: [HttpClient]
		 }
	})	
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
	PersonalDetailsPage,
    ItemDetailsPage,
    ListPage,
	AutocompletePage,
	HoroscopePage,
	DailyForecastPage,
	LovehoroPage,
	RajayogaPage,
	StarConstPage,
	StoriesPage,
	ArticlePage,
	KpAstroPage,
	PredictionsPage,
	SubscribePage,
	DivchartsPage,
	ChartAnalysisPage,
	ChooseLanPage,
	PrivacyPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
	HoroscopeService,
	ShareService,
	GetJsonService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppRate,
	BackgroundMode,
	Geolocation,
	LocalNotifications,
	LanguageService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {}
export function createTranslateLoader(http: HttpClient) {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
