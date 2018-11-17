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
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from "../../providers/language.service";
import { ListPage } from '../list/list';
/**
 * Generated class for the ChooseLanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ChooseLanPage = /** @class */ (function () {
    function ChooseLanPage(navCtrl, navParams, translate, languageService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.translate = translate;
        this.languageService = languageService;
        this.languageSelected = 'en';
        this.languages = this.languageService.getLanguages();
        this.setLanguage();
    }
    ChooseLanPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChooseLanPage');
    };
    ChooseLanPage.prototype.setLanguage = function () {
        var defaultLanguage = this.translate.getDefaultLang();
        if (this.languageSelected) {
            this.translate.setDefaultLang(this.languageSelected);
            this.translate.use(this.languageSelected);
        }
        else {
            this.languageSelected = defaultLanguage;
            this.translate.use(defaultLanguage);
        }
    };
    ChooseLanPage.prototype.selLanguage = function () {
        this.setLanguage();
        this.navCtrl.setRoot(ListPage);
    };
    ChooseLanPage = __decorate([
        Component({
            selector: 'page-choose-lan',
            templateUrl: 'choose-lan.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, TranslateService,
            LanguageService])
    ], ChooseLanPage);
    return ChooseLanPage;
}());
export { ChooseLanPage };
//# sourceMappingURL=choose-lan.js.map