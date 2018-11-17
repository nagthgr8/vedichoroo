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
import { NavController, NavParams, Platform, Events } from 'ionic-angular';
import { SubscribePage } from '../subscribe/subscribe';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
import { Device } from '@ionic-native/device';
import { HoroscopeService } from '../../app/horoscope.service';
/**
 * Generated class for the CreditsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreditsPage = /** @class */ (function () {
    function CreditsPage(navCtrl, navParams, platform, device, store, horoService, events) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.device = device;
        this.store = store;
        this.horoService = horoService;
        this.events = events;
        this.product = {
            name: 'My Product',
            apid: '1234',
            gpid: 'com.mypubz.eportal.dob'
        };
        platform.ready().then(function () {
            _this.horoService.getPlan(_this.device.uuid)
                .subscribe(function (res) {
                var pln = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'] };
                _this.plan = pln;
            }, function (err) {
                _this.info = err;
            });
        });
    }
    CreditsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreditsPage');
    };
    CreditsPage.prototype.more = function () {
        this.navCtrl.push(SubscribePage);
    };
    CreditsPage.prototype.init_pur_and_complete = function () {
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
    CreditsPage.prototype.pur_handl = function () {
        var _this = this;
        // Handlers
        this.store.when(this.product.gpid).approved(function (product) {
            product.finish();
            var creds = 5;
            switch (_this.product.gpid) {
                case 'com.mypubz.eportal.dob50':
                    creds = 5;
                    break;
                case 'com.mypubz.eportal.dob25':
                    creds = 5;
                    break;
                case 'com.mypubz.eportal.dob10':
                    creds = 5;
                    break;
                case 'com.mypubz.eportal.dob5':
                    creds = 5;
                    break;
                case 'com.mypubz.eportal.dob':
                    creds = 2;
                    break;
                default:
                    creds = 2;
                    break;
            }
            _this.horoService.addCredits(_this.device.uuid, creds)
                .subscribe(function (res) {
                console.log('credits updated to server');
                _this.events.subscribe('available:credits', function (page) {
                    page.title = 'Available Credits(' + res['credits'] + ')';
                    console.log('Credits updated in App');
                });
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
    CreditsPage.prototype.complete_pur = function () {
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
    CreditsPage.prototype.buy = function () {
        this.product.gpid = 'com.mypubz.eportal.dob';
        this.init_pur_and_complete();
    };
    CreditsPage.prototype.buy5 = function () {
        this.product.gpid = 'com.mypubz.eportal.dob5';
        this.init_pur_and_complete();
    };
    CreditsPage.prototype.buy10 = function () {
        this.product.gpid = 'com.mypubz.eportal.dob10';
        this.init_pur_and_complete();
    };
    CreditsPage.prototype.buy25 = function () {
        this.product.gpid = 'com.mypubz.eportal.dob25';
        this.init_pur_and_complete();
    };
    CreditsPage.prototype.buy50 = function () {
        this.product.gpid = 'com.mypubz.eportal.dob50';
        this.init_pur_and_complete();
    };
    CreditsPage = __decorate([
        Component({
            selector: 'page-credits',
            templateUrl: 'credits.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform, Device, InAppPurchase2, HoroscopeService, Events])
    ], CreditsPage);
    return CreditsPage;
}());
export { CreditsPage };
//# sourceMappingURL=credits.js.map