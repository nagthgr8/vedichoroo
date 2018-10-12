import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate';
import { Platform } from 'ionic-angular';
/*
  Generated class for the RateServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RateServiceProvider {
appRate: any = AppRate;
  constructor(public platform: Platform) {
  this.platform.ready().then(
    () => {
      this.appRate.preferences= {
        storeAppURL: {
          ios: '849930087',
          android: 'market://details?id=com.mypubz.eportal'
        },
        usesUntilPrompt: 2,
        customLocale: {
          title: 'Rate Us... Pretty Please?',
          message: 'Without ratings we starve =(',
          cancelButtonLabel: 'Pass',
          rateButtonLabel: 'Rate it!',
          laterButtonLabel: 'Ask Later'
        }
      }
    }
  )
    console.log('Hello RateServiceProvider Provider');
  }

}
