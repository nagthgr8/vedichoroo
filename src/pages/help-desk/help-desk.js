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
import { Device } from '@ionic-native/device';
import { HoroscopeService } from '../../app/horoscope.service';
/**
 * Generated class for the HelpDeskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HelpDeskPage = /** @class */ (function () {
    function HelpDeskPage(navCtrl, navParams, device, horoService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.device = device;
        this.horoService = horoService;
        this.showSU = true;
    }
    HelpDeskPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HelpDeskPage');
    };
    HelpDeskPage.prototype.save = function () {
        var _this = this;
        if (this.cat == '') {
            this.info = 'Please select the category';
            return;
        }
        if (this.sub == '') {
            this.info = 'Please enter subject line';
            return;
        }
        if (this.msg == '') {
            this.info = 'Please enter the message';
            return;
        }
        else {
            this.horoService.addTicket(this.device.uuid, this.cat, this.sub, this.msg)
                .subscribe(function (res) {
                _this.showSU = false;
                if (res['guid'] != '') {
                    _this.info = '<strong>Thank you for contacting our Help Desk. We will respond you shortly</strong>';
                }
                else {
                    _this.info = 'There was some internal failure, we regret inconvinience. Please try after some time.';
                }
            }, function (err) {
                _this.info = JSON.stringify(err);
            });
        }
    };
    HelpDeskPage = __decorate([
        Component({
            selector: 'page-help-desk',
            templateUrl: 'help-desk.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Device, HoroscopeService])
    ], HelpDeskPage);
    return HelpDeskPage;
}());
export { HelpDeskPage };
//# sourceMappingURL=help-desk.js.map