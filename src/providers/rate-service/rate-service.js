var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate';
import { Platform } from 'ionic-angular';
/*
  Generated class for the RateServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var RateServiceProvider = /** @class */ (function () {
    function RateServiceProvider(platform) {
        var _this = this;
        this.platform = platform;
        this.appRate = AppRate;
        this.platform.ready().then(function () {
            _this.appRate.preferences = {
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
            };
        });
        console.log('Hello RateServiceProvider Provider');
    }
    RateServiceProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Platform])
    ], RateServiceProvider);
    return RateServiceProvider;
}());
export { RateServiceProvider };
//# sourceMappingURL=rate-service.js.map