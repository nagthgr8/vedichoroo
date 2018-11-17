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
import { NavController, NavParams, Events } from 'ionic-angular';
import { ShareService } from '../../app/share.service';
/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var NotificationsPage = /** @class */ (function () {
    function NotificationsPage(navCtrl, navParams, shareService, events) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.shareService = shareService;
        this.events = events;
        this.rahu = false;
        this.rahus = false;
        this.rahut1 = false;
        this.rahut2 = false;
        this.rahut3 = false;
        this.sunrise = false;
        this.sunset = false;
        this.showRAH = false;
        var res = this.shareService.getRAHU();
        if (res) {
            this.rahu = res;
        }
        else {
            this.rahu = false;
        }
        res = this.shareService.getRAHUS();
        if (res) {
            this.rahus = res;
        }
        else {
            this.rahus = false;
        }
        res = this.shareService.getRAHUT1();
        if (res) {
            this.rahut1 = res;
        }
        else {
            this.rahut1 = false;
        }
        res = this.shareService.getRAHUT2();
        if (res) {
            this.rahut2 = res;
        }
        else {
            this.rahut2 = false;
        }
        res = this.shareService.getRAHUT3();
        if (res) {
            this.rahut3 = res;
        }
        else {
            this.rahut3 = false;
        }
        res = this.shareService.getSUNR();
        if (res) {
            this.sunrise = res;
        }
        else {
            this.sunrise = false;
        }
        res = this.shareService.getSUNS();
        if (res) {
            this.sunset = res;
        }
        else {
            this.sunset = false;
        }
        this.showRAH = this.rahu;
        //this.rahu = this.shareService.getRAHU();
        //this.rahus =  this.shareService.getRAHUS();
        //this.rahut1 = this.shareService.getRAHUT1();
        //this.rahut2 = this.shareService.getRAHUT2();
        //this.rahut3 = this.shareService.getRAHUT3();
        //this.sunrise = this.shareService.getSUNR();
        //this.sunset = this.shareService.getSUNS();
    }
    NotificationsPage.prototype.notifyRahu = function () {
        console.log('notifyRahu()', this.rahu);
        this.showRAH = this.rahu;
        this.shareService.setRAHU(this.rahu);
        this.events.publish('backmode', 'justify');
    };
    NotificationsPage.prototype.notifyRahus = function () {
        console.log('notifyRahus()', this.rahus);
        this.shareService.setRAHUS(this.rahus);
        this.events.publish('backmode', 'justify');
    };
    NotificationsPage.prototype.notifyRahut1 = function () {
        console.log('notifyRahut1()', this.rahut1);
        this.shareService.setRAHUT1(this.rahut1);
        this.events.publish('backmode', 'justify');
    };
    NotificationsPage.prototype.notifyRahut2 = function () {
        console.log('notifyRahut2()', this.rahut2);
        this.shareService.setRAHUT2(this.rahut2);
        this.events.publish('backmode', 'justify');
    };
    NotificationsPage.prototype.notifyRahut3 = function () {
        console.log('notifyRahut3()', this.rahut3);
        this.shareService.setRAHUT3(this.rahut3);
        this.events.publish('backmode', 'justify');
    };
    NotificationsPage.prototype.notifySunrise = function () {
        console.log('notifySunrise()', this.sunrise);
        this.shareService.setSUNR(this.sunrise);
        this.events.publish('backmode', 'justify');
    };
    NotificationsPage.prototype.notifySunset = function () {
        console.log('notifySunset()', this.sunset);
        this.shareService.setSUNS(this.sunset);
        this.events.publish('backmode', 'justify');
    };
    NotificationsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad NotificationsPage');
    };
    NotificationsPage = __decorate([
        Component({
            selector: 'page-notifications',
            templateUrl: 'notifications.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ShareService, Events])
    ], NotificationsPage);
    return NotificationsPage;
}());
export { NotificationsPage };
//# sourceMappingURL=notifications.js.map