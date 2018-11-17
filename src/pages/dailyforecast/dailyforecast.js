var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShareService } from '../../app/share.service';
import { HoroscopeService } from '../../app/horoscope.service';
/**
 * Generated class for the DailyForecastPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DailyForecastPage = /** @class */ (function () {
    function DailyForecastPage(navCtrl, navParams, shareService, horoService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shareService = shareService;
        this.horoService = horoService;
        this.today = Date.now();
        this.rashi = this.shareService.getMoonSign();
        var rnd = this.getRandomNum(1, 12);
        this.backgroundImg = 'assets/imgs/nature' + rnd + '.png';
        if (navParams.get('message') == null) {
            this.horoService.getDailyHoro(this.shareService.getMoonSign())
                .subscribe(function (res) {
                _this.info = JSON.stringify(res);
            }, function (err) {
                _this.info = err;
            });
        }
        else {
            this.info = navParams.get('message');
        }
    }
    DailyForecastPage.prototype.getRandomNum = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    DailyForecastPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DailyforecastPage');
    };
    DailyForecastPage = __decorate([
        Component({
            selector: 'page-dailyforecast',
            templateUrl: 'dailyforecast.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ShareService, HoroscopeService])
    ], DailyForecastPage);
    return DailyForecastPage;
}());
export { DailyForecastPage };
//# sourceMappingURL=dailyforecast.js.map