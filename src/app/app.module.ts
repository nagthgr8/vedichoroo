import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { TranslateService} from '@ngx-translate/core';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx'
import { Device } from '@ionic-native/device/ngx';;
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { InAppPurchase2 } from '@ionic-native//in-app-purchase-2/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AppRate } from '@ionic-native/app-rate/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ShareService } from './share.service';
import { HoroscopeService } from './horoscope.service';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
	BrowserModule, 
	HttpClientModule,
    FormsModule,
	IonicModule.forRoot(), 
	AppRoutingModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
	],
  providers: [
    AndroidPermissions,
    Geolocation,
    TranslateService,
    StatusBar,
    SplashScreen,
	BrowserTab,
	Crop,
	Device,
	File,
	FilePath,
	FileOpener,
	InAppPurchase2,
    Camera,
	HoroscopeService,
	ShareService,
	AppVersion,
	CallNumber,
	DatePicker,
	AppRate,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}