import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';
import { TranslateService} from '@ngx-translate/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { GooglePlus } from '@awesome-cordova-plugins/google-plus/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx'
import { Device } from '@awesome-cordova-plugins/device/ngx';;
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { AppVersion } from '@awesome-cordova-plugins/app-version/ngx';
import { Market } from '@awesome-cordova-plugins/market/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FilePath } from '@awesome-cordova-plugins/file-path/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { InAppPurchase2 } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { AppRate } from '@awesome-cordova-plugins/app-rate/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShareService } from './share.service';
import { HoroscopeService } from './horoscope.service';
import { CallService } from './call.service';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { BrowserTab } from '@awesome-cordova-plugins/browser-tab/ngx';
import { CalendarModule } from 'ion7-calendar';

@NgModule({
  declarations: [AppComponent],
  imports: [
	BrowserModule, 
	HttpClientModule,
    FormsModule,
	IonicModule.forRoot(), 
	AppRoutingModule,
	//CalendarModule,
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
	],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers: [
	GooglePlus,
    NativeStorage,
    AndroidPermissions,
    Geolocation,
    TranslateService,
    StatusBar,
    SplashScreen,
	BrowserTab,
	Device,
	File,
	FilePath,
	FileOpener,
	InAppPurchase2,
    Camera,
	CallService,
	HoroscopeService,
	ShareService,
	AppVersion,
	AppRate,
	Market,
    CalendarModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}