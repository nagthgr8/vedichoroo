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
var ItemDetailsPage = /** @class */ (function () {
    function ItemDetailsPage(navCtrl, navParams, shareService, horoService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shareService = shareService;
        this.horoService = horoService;
        // If we navigated to this page, we will have an item available as a nav param
        this.today = Date.now();
        this.rashi = this.shareService.getMoonSign();
        this.selectedItem = navParams.get('item');
        if (this.selectedItem.title == 'Your Daily Forecast') {
            this.selectedItem.title = "Daily Forecast for " + this.shareService.getMoonSign();
            this.horoService.getDailyHoro(this.shareService.getMoonSign())
                .subscribe(function (res) {
                _this.info = JSON.stringify(res);
            }, function (err) {
                _this.info = err;
            });
        }
        else {
            this.info = 'Please stay tuned, we are working at it...';
        }
    }
    ItemDetailsPage = __decorate([
        Component({
            selector: 'page-item-details',
            templateUrl: 'item-details.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ShareService, HoroscopeService])
    ], ItemDetailsPage);
    return ItemDetailsPage;
}());
export { ItemDetailsPage };
//# sourceMappingURL=item-details.js.map