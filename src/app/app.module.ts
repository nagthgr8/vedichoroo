import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
import { MyApp } from './app.component';
import { PersonalDetailsPage } from '../pages/personal-details/personal-details';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { HoroscopePage } from '../pages/horoscope/horoscope';
import { KpAstroPage } from '../pages/kp-astro/kp-astro';
import { PredictionsPage } from '../pages/predictions/predictions';
import { SubscribePage } from '../pages/subscribe/subscribe';
import { CreditsPage } from '../pages/credits/credits';
import { HelpDeskPage } from '../pages/help-desk/help-desk';
import { MypubzRespPage } from '../pages/mypubz-resp/mypubz-resp';
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
import { PanchangPage } from '../pages/panchang/panchang';
import { NotificationsPage } from '../pages/notifications/notifications';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HoroscopeService } from './horoscope.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ShareService } from './share.service';
import { LanguageService } from '../providers/language.service';
import {GetJsonService } from './getjson.service';
import { AppRate } from '@ionic-native/app-rate';
import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
import { File } from '@ionic-native/file';

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
	CreditsPage,
	DivchartsPage,
	ChartAnalysisPage,
	ChooseLanPage,
	CareerhoroPage,
	MoneyhoroPage,
	PrivacyPage,
	HelpDeskPage,
	MypubzRespPage,
	PanchangPage,
	NotificationsPage
  ],
  imports: [
    BrowserModule,
	HttpClientModule,
    IonicModule.forRoot(MyApp),
	IonicStorageModule.forRoot({
      name: '__vedichoroo',
      driverOrder: ['sqlite','indexeddb','websql']
    }),
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
	CreditsPage,
	DivchartsPage,
	ChartAnalysisPage,
	ChooseLanPage,
	PrivacyPage,
	HelpDeskPage,
	MypubzRespPage,
	PanchangPage,
	NotificationsPage
  ],
  providers: [
	Device,
	File,
	InAppPurchase2,
    StatusBar,
    SplashScreen,
	HoroscopeService,
	ShareService,
	GetJsonService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppRate,
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
