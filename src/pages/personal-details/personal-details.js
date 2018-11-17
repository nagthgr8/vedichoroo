var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { AutocompletePage } from '../autocomplete/autocomplete';
import { HoroscopePage } from '../horoscope/horoscope';
import { KpAstroPage } from '../kp-astro/kp-astro';
import { DailyForecastPage } from '../dailyforecast/dailyforecast';
import { RajayogaPage } from '../rajayoga/rajayoga';
import { DivchartsPage } from '../divcharts/divcharts';
import { SubscribePage } from '../subscribe/subscribe';
import { CreditsPage } from '../credits/credits';
import { FormBuilder } from '@angular/forms';
import { HoroscopeService } from '../../app/horoscope.service';
import { ShareService } from '../../app/share.service';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
import { Device } from '@ionic-native/device';
/**
 * Generated class for the PersonalDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PersonalDetailsPage = /** @class */ (function () {
    function PersonalDetailsPage(navCtrl, navParams, modalCtrl, shareService, formBuilder, horoService, platform, device, store) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.shareService = shareService;
        this.formBuilder = formBuilder;
        this.horoService = horoService;
        this.platform = platform;
        this.device = device;
        this.store = store;
        this.product = {
            name: 'My Product',
            apid: '1234',
            gpid: 'com.mypubz.eportal.dob'
        };
        this.info = '';
        this.info2 = '';
        this.phone = '';
        this.source = '';
        this.info2 = 'Please wait...';
        this.showSU = false;
        this.showCR = false;
        this.showASU = false;
        this.platform.ready().then(function () {
            //     this.splashscreen.hide();
            _this.horoService.getPlan(_this.device.uuid)
                .subscribe(function (res) {
                _this.info2 = '';
                var pln = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'] };
                _this.plan = pln;
                if (res['name'] == 'com.mypubz.eportal.astrologer') {
                    _this.showSU = true;
                    _this.showCR = false;
                    _this.showASU = false;
                }
                else if (Number(res['credits']) == 0) {
                    _this.showSU = false;
                    _this.showCR = true;
                    _this.showASU = false;
                }
                else {
                    _this.showSU = true;
                    _this.showCR = false;
                    _this.showASU = true;
                }
            }, function (err) {
                _this.showSU = false;
                _this.showCR = false;
                _this.showASU = false;
                _this.info2 = JSON.stringify(err);
            });
        });
        //this.address = {
        // place: this.shareService.getPlace(),
        //lat: '',
        //lng: ''
        //};
        this.personalDetailsForm = formBuilder.group({
            place: this.shareService.getPlace(),
            dob: this.shareService.getDOB(),
        });
        this.source = navParams.get('item').title;
        this.nav = this.navCtrl;
    }
    PersonalDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PersonalDetailsPage');
    };
    PersonalDetailsPage.prototype.showAddressModal = function () {
        var _this = this;
        var modal = this.modalCtrl.create(AutocompletePage);
        // let me = this;
        modal.onDidDismiss(function (data) {
            _this.personalDetailsForm.controls['place'].setValue(data);
        });
        modal.present();
    };
    PersonalDetailsPage.prototype.init_pur_and_complete = function () {
        var _this = this;
        var pid;
        if (!this.platform.is('cordova')) {
            return;
        }
        try {
            if (this.platform.is('ios')) {
                pid = this.product.apid;
            }
            else if (this.platform.is('android')) {
                pid = this.product.gpid;
            }
            // Register Product
            // Set Debug High
            this.store.verbosity = this.store.DEBUG;
            // Register the product with the store
            this.store.register({
                id: pid,
                alias: pid,
                type: this.store.CONSUMABLE
            });
            this.pur_handl();
            this.store.ready(function () {
                _this.complete_pur();
            }); //.then((status) => {
            // console.log(JSON.stringify(this.store.get(this.platform.is('ios') ? this.product.apid : this.product.gpid)));
            // console.log('Store is Ready: ' + JSON.stringify(status));
            //console.log('Products: ' + JSON.stringify(this.store.products));
            //	this.complete_pur();
            //	console.log('Finished Purchase!');
            // });
            // Errors On The Specific Product
            this.store.when(pid).error(function (error) {
                console.log('An Error Occured' + JSON.stringify(error));
            });
            // Refresh Always
            console.log('Refresh Store');
            this.store.refresh();
        }
        catch (err) {
            console.log('Error On Store Issues' + JSON.stringify(err));
        }
    };
    PersonalDetailsPage.prototype.pur_handl = function () {
        var _this = this;
        // Handlers
        this.store.when(this.product.gpid).approved(function (product) {
            product.finish();
            _this.showCR = false;
            _this.showSU = true;
            _this.horoService.addCredits(_this.device.uuid, (_this.product.gpid == 'com.mypubz.eportal.dob5') ? 5 : 2)
                .subscribe(function (res) {
            }, function (err) {
            });
        });
        this.store.when(this.product.gpid).registered(function (product) {
            console.log('Registered: ' + JSON.stringify(product));
        });
        this.store.when(this.product.gpid).updated(function (product) {
            console.log('Loaded' + JSON.stringify(product));
        });
        this.store.when(this.product.gpid).cancelled(function (product) {
            console.log('Purchase was Cancelled');
        });
        // Overall Store Error
        this.store.error(function (err) {
            console.log('Store Error ' + JSON.stringify(err));
        });
    };
    PersonalDetailsPage.prototype.complete_pur = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pid, product, order, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.platform.is('cordova')) {
                            return [2 /*return*/];
                        }
                        if (this.platform.is('ios')) {
                            pid = this.product.apid;
                        }
                        else if (this.platform.is('android')) {
                            pid = this.product.gpid;
                        }
                        console.log('Products: ' + JSON.stringify(this.store.products));
                        console.log('Ordering From Store: ' + pid);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        product = this.store.get(pid);
                        console.log('Product Info: ' + JSON.stringify(product));
                        return [4 /*yield*/, this.store.order(pid)];
                    case 2:
                        order = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        console.log('Error Ordering ' + JSON.stringify(err_1));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    PersonalDetailsPage.prototype.buy = function () {
        this.product.gpid = 'com.mypubz.eportal.dob';
        this.init_pur_and_complete();
    };
    PersonalDetailsPage.prototype.buy5 = function () {
        this.product.gpid = 'com.mypubz.eportal.dob5';
        this.init_pur_and_complete();
    };
    PersonalDetailsPage.prototype.save = function () {
        var _this = this;
        this.info = 'please wait...';
        console.log(this.personalDetailsForm.value);
        if (this.personalDetailsForm.controls['place'].value.length == 0) {
            this.info = 'Please enter your place of birth';
            return;
        }
        if (this.personalDetailsForm.controls['dob'].value.length == 0) {
            this.info = 'Please enter your date of birth';
            return;
        }
        //if(this.personalDetailsForm.controls['tz'].value.length == 0) {
        // this.info = 'Please enter your time zone';
        //return;
        //}
        if (this.personalDetailsForm.controls['place'].value.length == this.shareService.getPlace()) {
            this.info = '';
            this.nav.push((this.source == 'Birth Chart') ? HoroscopePage : KpAstroPage);
            return;
        }
        this.shareService.setPersonDetails(this.personalDetailsForm.controls['place'].value, this.personalDetailsForm.controls['dob'].value);
        var dobs = this.plan.dobs.split('|');
        var bdob = false;
        for (var d = 0; d < dobs.length; d++) {
            if (dobs[d].trim() == this.personalDetailsForm.controls['dob'].value.trim()) {
                bdob = true;
                break;
            }
        }
        if (!bdob) {
            this.horoService.addDOB(this.plan.uuid, this.personalDetailsForm.controls['dob'].value)
                .subscribe(function (res) {
                if (res['credits'] == -1) {
                    //error
                }
                else if (res['name'] != 'com.mypubz.eportal.astrologer' && res['credits'] == 0) {
                    _this.showCR = true;
                    _this.showSU = false;
                    return;
                }
                _this.info = '';
            }, function (err) {
                _this.info = err;
            });
        }
        if (this.source == 'Birth Chart') {
            this.horoService.getHoro(this.shareService.getLAT(), this.shareService.getLNG(), this.personalDetailsForm.controls['dob'].value, this.shareService.getTimezone())
                .subscribe(function (res) {
                _this.shareService.setPLPOS(res);
                _this.info = '';
                _this.nav.push(HoroscopePage);
            }, function (err) {
                _this.info = err;
            });
        }
        else if (this.source == 'KP Astrology') {
            this.horoService.getCusps(this.shareService.getLAT(), this.shareService.getLNG(), this.personalDetailsForm.controls['dob'].value, this.shareService.getTimezone())
                .subscribe(function (res) {
                _this.shareService.setPLPOS(res['planetPos']);
                console.log(res['housePos']);
                _this.shareService.setHPOS(res['housePos']);
                _this.nav.push(KpAstroPage);
            }, function (err) {
                _this.info = err;
            });
        }
        else if (this.source == 'Daily Horoscope') {
            this.horoService.getBirthStar(this.personalDetailsForm.controls['dob'].value)
                .subscribe(function (res) {
                _this.shareService.setMoonSign(res['birthSign']);
                _this.nav.push(DailyForecastPage);
            }, function (err) {
                _this.info = err;
            });
        }
        else if (this.source == 'Yogas In Your Horoscope') {
            this.horoService.getHoro(this.shareService.getLAT(), this.shareService.getLNG(), this.personalDetailsForm.controls['dob'].value, this.shareService.getTimezone())
                .subscribe(function (res) {
                _this.shareService.setPLPOS(res);
                _this.horoService.getYogas(_this.shareService.getLAT(), _this.shareService.getLNG(), _this.personalDetailsForm.controls['dob'].value, _this.shareService.getTimezone(), _this.shareService.getLANG())
                    .subscribe(function (res) {
                    _this.shareService.setYOGAS(res);
                    _this.info = '';
                    _this.nav.push(RajayogaPage);
                }, function (err) {
                    _this.info = err;
                });
            }, function (err) {
                _this.info = err;
            });
        }
        else if (this.source == 'Divisional Charts') {
            this.horoService.getHoro(this.shareService.getLAT(), this.shareService.getLNG(), this.personalDetailsForm.controls['dob'].value, this.shareService.getTimezone())
                .subscribe(function (res) {
                _this.shareService.setPLPOS(res);
                _this.nav.push(DivchartsPage);
            }, function (err) {
                _this.info = err;
            });
        }
    };
    PersonalDetailsPage.prototype.more = function () {
        this.nav.push(SubscribePage);
    };
    PersonalDetailsPage.prototype.morecred = function () {
        this.nav.push(CreditsPage);
    };
    PersonalDetailsPage = __decorate([
        Component({
            selector: 'page-personal-details',
            templateUrl: 'personal-details.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, ModalController, ShareService, FormBuilder, HoroscopeService, Platform, Device, InAppPurchase2])
    ], PersonalDetailsPage);
    return PersonalDetailsPage;
}());
export { PersonalDetailsPage };
//# sourceMappingURL=personal-details.js.map