import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';
import { Toast } from '@ionic-native/toast';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { AdMobFree } from '@ionic-native/admob-free';
import { MyApp } from './app.component';
import { TransitPredictionsPage } from '../pages/transit-predictions/transit-predictions';
import { PersonalDetailsPage } from '../pages/personal-details/personal-details';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { AutolocatePage } from '../pages/autolocate/autolocate';
import { PrashnaJyotishPage } from '../pages/prashna-jyotish/prashna-jyotish';
import { HoroscopePage } from '../pages/horoscope/horoscope';
import { KpAstroPage } from '../pages/kp-astro/kp-astro';
import { PredictionsPage } from '../pages/predictions/predictions';
import { SubscribePage } from '../pages/subscribe/subscribe';
import { BtrInfoPage } from '../pages/btr-info/btr-info';
import { CreditsPage } from '../pages/credits/credits';
import { HelpDeskPage } from '../pages/help-desk/help-desk';
import { MypubzRespPage } from '../pages/mypubz-resp/mypubz-resp';
import { LovehoroPage } from '../pages/lovehoro/lovehoro';
import { StarConstPage } from '../pages/star-const/star-const';
import { RajayogaPage } from '../pages/rajayoga/rajayoga';
import { CareerhoroPage } from '../pages/careerhoro/careerhoro';
import { MoneyhoroPage } from '../pages/moneyhoro/moneyhoro';
import { YogaInfoPage } from '../pages/yoga-info/yoga-info';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { DailyForecastPage } from '../pages/dailyforecast/dailyforecast';
import { ArticlePage } from '../pages/article/article';
import { StoriesPage } from '../pages/stories/stories';
import { ChooseLanPage } from '../pages/choose-lan/choose-lan';
import { ChartSettingsPage } from '../pages/chart-settings/chart-settings';
import { HouseInfoPage } from '../pages/house-info/house-info';
import { PrivacyPage } from '../pages/privacy/privacy';
import { SankethPage } from '../pages/sanketh/sanketh';
import { MohitSethPage } from '../pages/mohit-seth/mohit-seth';
import { JaidevPage } from '../pages/jaidev/jaidev';
import { AhmadMilanPage } from '../pages/ahmad-milan/ahmad-milan';
import { SatyaPrakashPage } from '../pages/satya-prakash/satya-prakash';
import { SumeshPage } from '../pages/sumesh/sumesh';
import { GirishTiwariPage } from '../pages/girish-tiwari/girish-tiwari';
import { PavanSharmaPage } from '../pages/pavan-sharma/pavan-sharma';
import { DineshSharmaPage } from '../pages/dinesh-sharma/dinesh-sharma';
import { RiSharmaPage } from '../pages/ri-sharma/ri-sharma';
import { BmvsivaPage } from '../pages/bmvsiva/bmvsiva';
import { KalyanPage } from '../pages/kalyan/kalyan';
import {ProfAstroPage} from '../pages/prof-astro/prof-astro';
import {HobbyAstroPage} from '../pages/hobby-astro/hobby-astro';
import { DivchartsPage } from '../pages/divcharts/divcharts';
import { ChartAnalysisPage } from '../pages/chart-analysis/chart-analysis';
import { PanchangPage } from '../pages/panchang/panchang';
import { NotificationsPage } from '../pages/notifications/notifications';
import { AstrologersPage } from '../pages/astrologers/astrologers';
import { AstrologerPage } from '../pages/astrologer/astrologer';
import { ChangeStatusPage } from '../pages/change-status/change-status';
import { PublishBlogPage } from '../pages/publish-blog/publish-blog';
import { AboutAppPage } from '../pages/about-app/about-app';
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
import { FileOpener } from '@ionic-native/file-opener';
import { AppVersion } from '@ionic-native/app-version';

@NgModule({
  declarations: [
    MyApp,
	MoneyhoroPage,
	PersonalDetailsPage, 
    ItemDetailsPage,
    ListPage,
	AutocompletePage,
	AutolocatePage,
	PrashnaJyotishPage,
	HoroscopePage,
	DailyForecastPage,
	LovehoroPage,
	RajayogaPage,
	CareerhoroPage,
	YogaInfoPage,
	StarConstPage,
	StoriesPage,
	ArticlePage,
	KpAstroPage,
	PredictionsPage,
	SubscribePage,
	BtrInfoPage,
	CreditsPage,
	DivchartsPage,
	ChartAnalysisPage,
	ChooseLanPage,
	ChartSettingsPage,
	PrivacyPage,
	HelpDeskPage,
	MypubzRespPage,
	PanchangPage,
	NotificationsPage,
	AstrologersPage,
	AstrologerPage,
	SankethPage,
	MohitSethPage,
	JaidevPage,
	AhmadMilanPage,
	SatyaPrakashPage,
	SumeshPage,
	GirishTiwariPage,
	PavanSharmaPage,
	DineshSharmaPage,
	RiSharmaPage,
	BmvsivaPage,
	KalyanPage,
	ProfAstroPage,
	HobbyAstroPage,
	ChangeStatusPage,
	TransitPredictionsPage,
	PublishBlogPage,
	HouseInfoPage,
	AboutAppPage
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
	AutolocatePage,
	PrashnaJyotishPage,
	HoroscopePage,
	DailyForecastPage,
	LovehoroPage,
	RajayogaPage,
	CareerhoroPage,
	MoneyhoroPage,
	YogaInfoPage,
	StarConstPage,
	StoriesPage,
	ArticlePage,
	KpAstroPage,
	PredictionsPage,
	SubscribePage,
	BtrInfoPage,
	CreditsPage,
	DivchartsPage,
	ChartAnalysisPage,
	ChooseLanPage,
	ChartSettingsPage,
	PrivacyPage,
	HelpDeskPage,
	MypubzRespPage,
	PanchangPage,
	NotificationsPage,
	AstrologersPage,
	AstrologerPage,
	SankethPage,
	MohitSethPage,
	JaidevPage,
	AhmadMilanPage,
	SatyaPrakashPage,
	SumeshPage,
	GirishTiwariPage,
	PavanSharmaPage,
	DineshSharmaPage,
	RiSharmaPage,
	BmvsivaPage,
	KalyanPage,
	ProfAstroPage,
	HobbyAstroPage,
	ChangeStatusPage,
	TransitPredictionsPage,
	PublishBlogPage,
	HouseInfoPage,
	AboutAppPage
  ],
  providers: [
	Device,
	File,
    Transfer,
    Camera,
    FilePath,	
	InAppPurchase2,
    StatusBar,
    SplashScreen,
	AdMobFree,
	HoroscopeService,
	ShareService,
	GetJsonService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppRate,
	LanguageService,
	CallNumber,
	FileOpener,
	SocialSharing,
	Toast,
	AppVersion
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
