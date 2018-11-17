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
import { NavController, NavParams, Platform } from 'ionic-angular';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { InAppPurchase2 } from '@ionic-native/in-app-purchase-2';
import { Device } from '@ionic-native/device';
import { HoroscopeService } from '../../app/horoscope.service';
import { HelpDeskPage } from '../help-desk/help-desk';
import { ListPage } from '../list/list';
/**
 * Generated class for the SubscribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SubscribePage = /** @class */ (function () {
    function SubscribePage(navCtrl, navParams, platform, device, store, horoService, formBuilder) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.platform = platform;
        this.device = device;
        this.store = store;
        this.horoService = horoService;
        this.formBuilder = formBuilder;
        this.product = {
            name: 'My Product',
            apid: '1234',
            gpid: 'com.mypubz.eportal.dob'
        };
        this.showSU = false;
        this.showCR = false;
        this.showWC = false;
        this.showCI = false;
        if (navParams.get('ci') == true)
            this.showCI = true;
        else
            this.horoService.getPlan(this.device.uuid)
                .subscribe(function (res) {
                var pln = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'] };
                _this.plan = pln;
                if (res['name'] != 'com.mypubz.eportal.astrologer') {
                    _this.showSU = true;
                    _this.showCR = false;
                }
                else {
                    _this.showSU = false;
                    _this.showCR = true;
                }
            }, function (err) {
                _this.info = err;
            });
        this.personalDetailsForm = this.formBuilder.group({
            nam: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
            mob: new FormControl('', { validators: Validators.required, updateOn: 'blur' }),
            eml: new FormControl('', Validators.compose([
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ]))
        });
    }
    SubscribePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SubscribePage');
    };
    SubscribePage.prototype.init_pur_and_complete = function () {
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
                type: this.store.PAID_SUBSCRIPTION
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
    SubscribePage.prototype.pur_handl = function () {
        var _this = this;
        // Handlers
        this.store.when(this.product.gpid).approved(function (product) {
            product.finish();
            _this.showCR = false;
            _this.showSU = false;
            _this.showWC = true;
            _this.showCI = true;
            _this.horoService.setPlan(_this.device.uuid, _this.product.gpid)
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
            _this.horoService.setPlan(_this.device.uuid, 'com.mypubz.eportal.dob') //default plan
                .subscribe(function (res) {
            }, function (err) {
            });
        });
        // Overall Store Error
        this.store.error(function (err) {
            console.log('Store Error ' + JSON.stringify(err));
        });
    };
    SubscribePage.prototype.complete_pur = function () {
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
    SubscribePage.prototype.buy = function () {
        this.product.gpid = 'com.mypubz.eportal.astrologer';
        this.init_pur_and_complete();
    };
    SubscribePage.prototype.help = function () {
        this.navCtrl.push(HelpDeskPage);
    };
    SubscribePage.prototype.saveSub = function () {
        var _this = this;
        if (this.personalDetailsForm.controls['nam'].value.length == 0) {
            this.sinf = 'Please enter your name';
            return;
        }
        if (this.personalDetailsForm.controls['mob'].value.length == 0) {
            this.sinf = 'Please enter your Mobile Number';
            return;
        }
        //if(this.personalDetailsForm.controls['eml'].value.length == 0) {
        // this.info = 'Please enter your name';
        //return;
        //}  
        this.sinf = 'Please wait...';
        this.horoService.addSubscriber(this.device.uuid, this.personalDetailsForm.controls['nam'].value, this.personalDetailsForm.controls['mob'].value, this.personalDetailsForm.controls['eml'].value)
            .subscribe(function (res) {
            _this.sinf = 'Thank you for providing details. We will be in touch with you shortly';
            if (!_this.showWC)
                _this.navCtrl.setRoot(ListPage);
        }, function (err) {
            _this.sinf = JSON.stringify(err);
        });
    };
    SubscribePage = __decorate([
        Component({
            selector: 'page-subscribe',
            templateUrl: 'subscribe.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Platform, Device, InAppPurchase2, HoroscopeService, FormBuilder])
    ], SubscribePage);
    return SubscribePage;
}());
export { SubscribePage };
//# sourceMappingURL=subscribe.js.map