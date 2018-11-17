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
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HoroscopeService } from '../../app/horoscope.service';
import { LoadingController } from 'ionic-angular';
import { ArticlePage } from '../article/article';
/**
 * Generated class for the StoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StoriesPage = /** @class */ (function () {
    function StoriesPage(navCtrl, horoService, alertCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.horoService = horoService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.mode = "list";
        this.info = '';
        this.getStories(0);
        this.page = 0;
    }
    StoriesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StoriesPage');
    };
    StoriesPage.prototype.getStories = function (refresher) {
        this.page = 0;
        this.articles = [];
        this.info = 'Sorry for the inconvinience as we are making some crucial updates to our blog engine. Please try after few days';
        // this.horoService.getStories()
        //.subscribe(res => {
        //  this.info = '';
        // this.articles = res;//this.publishStories(res);
        //},(err) => {
        //this.info = err;
        //});
    };
    StoriesPage.prototype.publishStories = function (stories) {
        //this.info = Object.keys(stories).length.toString();
        for (var i = 0; i < Object.keys(stories).length; i++) {
            this.articles.push(stories[i]);
        }
    };
    StoriesPage.prototype.detail = function (item) {
        this.navCtrl.push(ArticlePage, {
            item: item
        });
    };
    StoriesPage.prototype.makelist = function () {
        this.mode = "list";
    };
    StoriesPage.prototype.makecard = function () {
        this.mode = "card";
    };
    StoriesPage = __decorate([
        Component({
            selector: 'page-stories',
            templateUrl: 'stories.html',
        }),
        __metadata("design:paramtypes", [NavController, HoroscopeService, AlertController, LoadingController])
    ], StoriesPage);
    return StoriesPage;
}());
export { StoriesPage };
//# sourceMappingURL=stories.js.map