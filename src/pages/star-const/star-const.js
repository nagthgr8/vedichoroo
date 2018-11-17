var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgModule, Renderer2, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
import { HoroscopeService } from '../../app/horoscope.service';
import { AppRate } from '@ionic-native/app-rate';
import { ShareService } from '../../app/share.service';
import * as moon_phases from '../horoscope/moon_phases.json';
import * as mon_weeks from '../horoscope/mon_weeks.json';
/**
 * Generated class for the StarConstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StarConstPage = /** @class */ (function () {
    function StarConstPage(platform, navCtrl, navParams, formBuilder, renderer, horoService, appRate, shareService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.renderer = renderer;
        this.horoService = horoService;
        this.appRate = appRate;
        this.shareService = shareService;
        this.dt1 = '';
        this.dt2 = '';
        this.dt3 = '';
        this.dt4 = '';
        this.dt5 = '';
        this.dt6 = '';
        this.dt7 = '';
        this.dt8 = '';
        this.dt9 = '';
        this.dt10 = '';
        this.dt11 = '';
        this.dt12 = '';
        this.dt13 = '';
        this.dt14 = '';
        this.dt15 = '';
        this.dt16 = '';
        this.dt17 = '';
        this.dt18 = '';
        this.dt19 = '';
        this.dt20 = '';
        this.dt21 = '';
        this.dt22 = '';
        this.dt23 = '';
        this.dt24 = '';
        this.dt25 = '';
        this.dt26 = '';
        this.dt27 = '';
        this.dt28 = '';
        this.dt29 = '';
        this.dt30 = '';
        this.st1 = '';
        this.st2 = '';
        this.st3 = '';
        this.st4 = '';
        this.st5 = '';
        this.st6 = '';
        this.st7 = '';
        this.st8 = '';
        this.st9 = '';
        this.st10 = '';
        this.st11 = '';
        this.st12 = '';
        this.st13 = '';
        this.st14 = '';
        this.st15 = '';
        this.st16 = '';
        this.st17 = '';
        this.st18 = '';
        this.st19 = '';
        this.st20 = '';
        this.st21 = '';
        this.st22 = '';
        this.st23 = '';
        this.st24 = '';
        this.st25 = '';
        this.st26 = '';
        this.st27 = '';
        this.st28 = '';
        this.st29 = '';
        this.st30 = '';
        this.lu1 = '';
        this.lu2 = '';
        this.lu3 = '';
        this.lu4 = '';
        this.lu5 = '';
        this.lu6 = '';
        this.lu7 = '';
        this.lu8 = '';
        this.lu9 = '';
        this.lu10 = '';
        this.lu11 = '';
        this.lu12 = '';
        this.lu13 = '';
        this.lu14 = '';
        this.lu15 = '';
        this.lu16 = '';
        this.lu17 = '';
        this.lu18 = '';
        this.lu19 = '';
        this.lu20 = '';
        this.lu21 = '';
        this.lu22 = '';
        this.lu23 = '';
        this.lu24 = '';
        this.lu25 = '';
        this.lu26 = '';
        this.lu27 = '';
        this.lu28 = '';
        this.lu29 = '';
        this.lu30 = '';
        this.str1 = '';
        this.str2 = '';
        this.str3 = '';
        this.str4 = '';
        this.str5 = '';
        this.str6 = '';
        this.str7 = '';
        this.str8 = '';
        this.str9 = '';
        this.str10 = '';
        this.str11 = '';
        this.str12 = '';
        this.str13 = '';
        this.str14 = '';
        this.str15 = '';
        this.str16 = '';
        this.str17 = '';
        this.str18 = '';
        this.str19 = '';
        this.str20 = '';
        this.str21 = '';
        this.str22 = '';
        this.str23 = '';
        this.str24 = '';
        this.str25 = '';
        this.str26 = '';
        this.str27 = '';
        this.str28 = '';
        this.str29 = '';
        this.str30 = '';
        this.info = '';
        this.device_width = 0;
        this.device_height = 0;
        //objectKeys = Object.keys;
        //oTransits: StarStrength[] = [];
        this.mon = '';
        this.yer = '';
        platform.ready().then(function () {
            console.log('Width: ' + platform.width());
            _this.device_width = platform.width();
            console.log('Height: ' + platform.height());
            _this.device_height = platform.height();
            _this.appRate.preferences = {
                displayAppName: '126 Astrology',
                usesUntilPrompt: 2,
                simpleMode: true,
                promptAgainForEachNewVersion: false,
                storeAppURL: {
                    ios: '1216856883',
                    android: 'market://details?id=com.mypubz.eportal'
                },
                customLocale: {
                    title: 'Do you enjoy %@?',
                    message: 'If you enjoy using %@, would you mind taking a moment to rate it? Thanks so much!',
                    cancelButtonLabel: 'No, Thanks',
                    laterButtonLabel: 'Remind Me Later',
                    rateButtonLabel: 'Rate It Now'
                },
                callbacks: {
                    onRateDialogShow: function (callback) {
                        console.log('rate dialog shown!');
                    },
                    onButtonClicked: function (buttonIndex) {
                        console.log('Selected index: -> ' + buttonIndex);
                    }
                }
            };
            // Opens the rating immediately no matter what preferences you set
            _this.appRate.promptForRating(true);
        });
        this.personalDetailsForm = formBuilder.group({
            dob: this.shareService.getDOB(),
        });
        this.showGrid = false;
        this.showBS = false;
        this.showList = true;
        this.showLgnds = false;
        //this.showCal1 = false;
        //this.showCal2 = false;
    }
    StarConstPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StarConstPage');
    };
    StarConstPage.prototype.save = function () {
        var _this = this;
        this.info = 'please wait...';
        if (this.personalDetailsForm.controls['dob'].value.length == 0) {
            this.info = 'Please enter Man Date of Birth';
            return;
        }
        this.horoService.getBirthStar(this.personalDetailsForm.controls['dob'].value)
            .subscribe(function (res) {
            _this.birthStar = res['birthStar'];
            _this.birthSign = res['birthSign'];
            _this.birthSignDeg = res['birthSignDeg'];
            _this.showBS = true;
            if (_this.shareService.getLANG().toLowerCase() == 'en') {
                _this.str = 'Your BirthStar is ' + _this.birthStar + ' Your Moon Sign is ' + _this.birthSign + '. Below calendar projects the Star Strength & Lunar Strength for the next 30 days analyzed based on your BirthStar.';
            }
            else if (_this.shareService.getLANG().toLowerCase() == 'te') {
                _this.str = ' మీ జన్మ నక్షత్రమ్  ' + _this.translate(_this.birthStar) + ' మీ జన్మ రశి  ' + _this.translate(_this.birthSign) + '. మీ జన్మ నక్షత్రమ్ ఆధారంగా తదుపరి 30 రోజుల్లో మీ తారా బలం మరియు చంద్ర బలం క్రింద క్యాలెండర్లో కలదు.';
            }
            else if (_this.shareService.getLANG().toLowerCase() == 'hi') {
                _this.str = ' आप के जन्म नक्षत्र   ' + _this.translate(_this.birthStar) + ' आप के जन्म राशि  ' + _this.translate(_this.birthSign) + '. इसके अनुसार अगले 30 दिनों में आप के तारा बहल और चन्द्र भाल नीचे कैलेंडर में है.';
            }
            _this.getStarConstReport();
            _this.showList = false;
            _this.showLgnds = true;
        }, function (err) {
            _this.info = err;
        });
    };
    StarConstPage.prototype.getStarConstReport = function () {
        var _this = this;
        this.info = 'Generating Your 1 Month Personalized Calendar. Please wait...';
        this.horoService.getStarConst(this.birthStar, this.birthSign, this.birthSignDeg)
            .subscribe(function (res) {
            _this.info = '';
            _this.publishReport(res);
        }, function (err) {
            _this.info = JSON.stringify(err);
        });
    };
    StarConstPage.prototype.publishReport = function (stars) {
        //this.showCal1 = true;
        this.mon = stars[0].date.split(',')[0].split(' ')[1];
        this.yer = stars[0].date.split(',')[1].split(' ')[0];
        this.renderer.appendChild(this.hinduCal1.nativeElement, this.grid(6, this.device_width / 6, this.device_width, stars));
        //this.mon = '';
        //this.yer = '';
        var c = false;
        for (var i = 0; i < stars.length; i++) {
            if (this.mon != stars[i].date.split(',')[0].split(' ')[1]) {
                this.mon = stars[i].date.split(',')[0].split(' ')[1];
                this.yer = stars[i].date.split(',')[1].split(' ')[0];
                c = true;
                break;
            }
        }
        if (c) {
            //this.showCal2 = true;
            this.renderer.appendChild(this.hinduCal2.nativeElement, this.grid(6, this.device_width / 6, this.device_width, stars));
        }
    };
    StarConstPage.prototype.grid = function (numberPerSide, size, pixelsPerSide, naks) {
        var wks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.renderer.setAttribute(svg, "width", pixelsPerSide);
        this.renderer.setAttribute(svg, "height", pixelsPerSide + 25);
        this.renderer.setAttribute(svg, "viewBox", [0, 0, numberPerSide * size, 25 + (numberPerSide + 1) * size].join(" "));
        var gm = document.createElementNS("http://www.w3.org/2000/svg", "g");
        var bt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        this.renderer.setAttribute(bt, "width", pixelsPerSide.toString());
        this.renderer.setAttribute(bt, "height", "25");
        this.renderer.setAttribute(bt, "border", "1");
        this.renderer.setAttribute(bt, "stroke", "#000000");
        this.renderer.setAttribute(bt, "fill", "#f9d35c");
        this.renderer.setAttribute(bt, "id", "b999");
        this.renderer.appendChild(gm, bt);
        var my = (this.shareService.getLANG() == 'en') ? mon_weeks[this.mon.toLowerCase()].split('|')[0] + ' ' + this.yer : (this.shareService.getLANG() == 'te') ? mon_weeks[this.mon.toLowerCase()].split('|')[1] + ' ' + this.yer : mon_weeks[this.mon.toLowerCase()].split('|')[2] + ' ' + this.yer;
        var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        this.renderer.appendChild(text, document.createTextNode(my));
        this.renderer.setAttribute(text, "font-size", "15px");
        this.renderer.setAttribute(text, "font-weight", "bold");
        this.renderer.setAttribute(text, "x", "50%");
        this.renderer.setAttribute(text, "y", "12");
        this.renderer.setAttribute(text, "alignment-baseline", "middle");
        this.renderer.setAttribute(text, "text-anchor", "middle");
        this.renderer.setAttribute(text, "id", "t999");
        this.renderer.appendChild(gm, text);
        var bh = 25;
        var cal = null;
        var pday = 0;
        var oLDays = [];
        for (var k = 0; k < 7; k++) {
            bt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            this.renderer.setAttribute(bt, "width", size.toString());
            this.renderer.setAttribute(bt, "height", size.toString());
            this.renderer.setAttribute(bt, "y", bh.toString());
            this.renderer.setAttribute(bt, "border", "1");
            this.renderer.setAttribute(bt, "stroke", "#000000");
            this.renderer.setAttribute(bt, "fill", "#f9d35c");
            this.renderer.setAttribute(bt, "id", "b999");
            this.renderer.appendChild(gm, bt);
            text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            this.renderer.appendChild(text, document.createTextNode((this.shareService.getLANG() == 'en') ? wks[k] : (this.shareService.getLANG() == 'te') ? mon_weeks[wks[k]].split('|')[1] : mon_weeks[wks[k]].split('|')[2]));
            this.renderer.setAttribute(text, "font-size", "15px");
            this.renderer.setAttribute(text, "font-weight", "bold");
            this.renderer.setAttribute(text, "alignment-baseline", "middle");
            this.renderer.setAttribute(text, "text-anchor", "middle");
            this.renderer.setAttribute(text, "x", (size / 2).toString());
            this.renderer.setAttribute(text, "y", (size / 2 + bh).toString());
            this.renderer.setAttribute(text, "id", "t999");
            bh += size;
            this.renderer.appendChild(gm, text);
            svg.appendChild(gm);
            var oW = [];
            oW = this.getWeekDays(naks, wks[k]);
            var dx = 0;
            for (var _i = 0, _a = Object.keys(oW); _i < _a.length; _i++) {
                var key = _a[_i];
                dx++;
                if (dx == 1 && wks[k] == 'SUN' && oW[key].dmon > 1) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'MON' && oW[key].dmon > 2) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'TUE' && oW[key].dmon > 3) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'WED' && oW[key].dmon > 4) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'THU' && oW[key].dmon > 5) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'FRI' && oW[key].dmon > 6) {
                    dx++;
                }
                else if (dx == 1 && wks[k] == 'SAT' && oW[key].dmon > 7) {
                    dx++;
                }
                var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
                var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                this.renderer.setAttribute(box, "width", size.toString());
                this.renderer.setAttribute(box, "height", size.toString());
                this.renderer.setAttribute(box, "border", "1");
                this.renderer.setAttribute(box, "stroke", "#000000");
                this.renderer.setAttribute(box, "fill", "#ffffff");
                this.renderer.setAttribute(box, "id", "b" + k.toString() + dx.toString());
                this.renderer.setAttribute(box, "x", (size * dx).toString());
                this.renderer.setAttribute(box, "y", (size * k + 25).toString());
                this.renderer.appendChild(g, box);
                //			   cal = this.getCal(naks, wks[k], i);
                //			   if(cal) {
                //					var dmon = cal.date.split(',')[0].split(' ')[2];
                var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
                this.renderer.appendChild(text1, document.createTextNode(key.split(',')[0].split(' ')[2]));
                this.renderer.setAttribute(text1, "font-size", "15px");
                this.renderer.setAttribute(text1, "font-weight", "bold");
                this.renderer.setAttribute(text1, "alignment-baseline", "middle");
                this.renderer.setAttribute(text1, "text-anchor", "middle");
                this.renderer.setAttribute(text1, "x", (size * dx + size / 2).toString());
                this.renderer.setAttribute(text1, "y", (size * k + 25 + size / 2).toString());
                this.renderer.setAttribute(text1, "id", "t1" + k.toString() + dx.toString());
                //var br = document.createElement("br");
                //this.renderer.appendChild(text1, document.createElement("br"));
                var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
                this.renderer.appendChild(text2, document.createTextNode(this.translate(oW[key].star)));
                this.renderer.setAttribute(text2, "font-size", "10px");
                this.renderer.setAttribute(text2, "font-weight", "bold");
                this.renderer.setAttribute(text2, "x", (size * dx + size / 2).toString());
                this.renderer.setAttribute(text2, "y", (size * k + 25 + size / 2 + 10).toString());
                this.renderer.setAttribute(text2, "alignment-baseline", "middle");
                this.renderer.setAttribute(text2, "text-anchor", "middle");
                this.renderer.setAttribute(text2, "id", "t2" + k.toString() + dx.toString());
                var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
                this.renderer.appendChild(text3, document.createTextNode(this.translate(oW[key].tithi)));
                this.renderer.setAttribute(text3, "font-size", "10px");
                this.renderer.setAttribute(text3, "font-weight", "bold");
                this.renderer.setAttribute(text3, "x", (size * dx + size / 2).toString());
                this.renderer.setAttribute(text3, "y", (size * k + 25 + size / 2 + 20).toString());
                this.renderer.setAttribute(text3, "alignment-baseline", "middle");
                this.renderer.setAttribute(text3, "text-anchor", "middle");
                this.renderer.setAttribute(text3, "id", "t3" + k.toString() + dx.toString());
                g.appendChild(text1);
                g.appendChild(text2);
                g.appendChild(text3);
                if (oW[key].tithi == 'Purnima' || oW[key].tithi == 'Amavasya' || oW[key].tithi == 'Sapthami') {
                    var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
                    this.renderer.setAttribute(image, "x", (size * dx).toString());
                    this.renderer.setAttribute(image, "y", (size * k + 25).toString());
                    this.renderer.setAttribute(image, "height", "16");
                    this.renderer.setAttribute(image, "width", "16");
                    this.renderer.setAttribute(image, "id", "i" + k.toString() + dx.toString());
                    if (oW[key].tithi == 'Sapthami') {
                        if (oW[key].moonPhase == 'waxing') {
                            image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", moon_phases[oW[key].tithi].split(',')[0]);
                        }
                        else {
                            image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", moon_phases[oW[key].tithi].split(',')[1]);
                        }
                    }
                    else {
                        image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", moon_phases[oW[key].tithi]);
                    }
                    g.appendChild(image);
                }
                else {
                }
                if (oW[key].starStrength.indexOf('Janma') > -1) {
                    var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    this.renderer.setAttribute(crc, "width", "8");
                    this.renderer.setAttribute(crc, "height", "8");
                    this.renderer.setAttribute(crc, "fill", "#ee4f7c");
                    this.renderer.setAttribute(crc, "stroke", "#ee4f7c");
                    this.renderer.setAttribute(crc, "stroke-width", "6");
                    this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
                    this.renderer.setAttribute(crc, "cx", (size * dx + size - 8).toString());
                    this.renderer.setAttribute(crc, "cy", (size * k + 25 + 8).toString());
                    this.renderer.setAttribute(crc, "r", "4");
                    this.renderer.appendChild(g, crc);
                    //this.renderer.setAttribute(box, "stroke", "#ee4f7c");
                    //this.renderer.setAttribute(text1, "fill", "#000000");
                    //this.renderer.setAttribute(text2, "fill", "#000000");
                }
                else if (oW[key].starStrength.indexOf('Sampat') > -1) {
                    var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    this.renderer.setAttribute(crc, "width", "8");
                    this.renderer.setAttribute(crc, "height", "8");
                    this.renderer.setAttribute(crc, "fill", "#ffe1ff");
                    this.renderer.setAttribute(crc, "stroke", "#ffe1ff");
                    this.renderer.setAttribute(crc, "stroke-width", "6");
                    this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
                    this.renderer.setAttribute(crc, "cx", (size * dx + size - 8).toString());
                    this.renderer.setAttribute(crc, "cy", (size * k + 25 + 8).toString());
                    this.renderer.setAttribute(crc, "r", "4");
                    this.renderer.appendChild(g, crc);
                    //this.renderer.setAttribute(box, "stroke", "#ffe1ff");
                    //this.renderer.setAttribute(text1, "fill", "#000000");
                    //this.renderer.setAttribute(text2, "fill", "#000000");
                }
                else if (oW[key].starStrength.indexOf('Vipat') > -1) {
                    var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    this.renderer.setAttribute(crc, "width", "8");
                    this.renderer.setAttribute(crc, "height", "8");
                    this.renderer.setAttribute(crc, "fill", "#ff0000");
                    this.renderer.setAttribute(crc, "stroke", "#ff0000");
                    this.renderer.setAttribute(crc, "stroke-width", "6");
                    this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
                    this.renderer.setAttribute(crc, "cx", (size * dx + size - 8).toString());
                    this.renderer.setAttribute(crc, "cy", (size * k + 25 + 8).toString());
                    this.renderer.setAttribute(crc, "r", "4");
                    this.renderer.appendChild(g, crc);
                    //this.renderer.setAttribute(box, "stroke", "#ff0000");
                    //this.renderer.setAttribute(text1, "fill", "#000000");
                    //this.renderer.setAttribute(text2, "fill", "#000000");
                }
                else if (oW[key].starStrength.indexOf('Kshema') > -1) {
                    var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    this.renderer.setAttribute(crc, "width", "8");
                    this.renderer.setAttribute(crc, "height", "8");
                    this.renderer.setAttribute(crc, "fill", "#fff68f");
                    this.renderer.setAttribute(crc, "stroke", "#fff68f");
                    this.renderer.setAttribute(crc, "stroke-width", "6");
                    this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
                    this.renderer.setAttribute(crc, "cx", (size * dx + size - 8).toString());
                    this.renderer.setAttribute(crc, "cy", (size * k + 25 + 8).toString());
                    this.renderer.setAttribute(crc, "r", "4");
                    this.renderer.appendChild(g, crc);
                    //this.renderer.setAttribute(box, "stroke", "#fff68f");
                    //this.renderer.setAttribute(text1, "fill", "#000000");
                    //this.renderer.setAttribute(text2, "fill", "#000000");
                }
                else if (oW[key].starStrength.indexOf('Pratyak') > -1) {
                    var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    this.renderer.setAttribute(crc, "width", "8");
                    this.renderer.setAttribute(crc, "height", "8");
                    this.renderer.setAttribute(crc, "fill", "#ff6666");
                    this.renderer.setAttribute(crc, "stroke", "#ff6666");
                    this.renderer.setAttribute(crc, "stroke-width", "6");
                    this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
                    this.renderer.setAttribute(crc, "cx", (size * dx + size - 8).toString());
                    this.renderer.setAttribute(crc, "cy", (size * k + 25 + 8).toString());
                    this.renderer.setAttribute(crc, "r", "4");
                    this.renderer.appendChild(g, crc);
                    //this.renderer.setAttribute(box, "stroke", "#ff6666");
                    //this.renderer.setAttribute(text1, "fill", "#000000");
                    //this.renderer.setAttribute(text2, "fill", "#000000");
                }
                else if (oW[key].starStrength.indexOf('Sadhana') > -1) {
                    var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    this.renderer.setAttribute(crc, "width", "8");
                    this.renderer.setAttribute(crc, "height", "8");
                    this.renderer.setAttribute(crc, "fill", "#ffd700");
                    this.renderer.setAttribute(crc, "stroke", "#ffd700");
                    this.renderer.setAttribute(crc, "stroke-width", "6");
                    this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
                    this.renderer.setAttribute(crc, "cx", (size * dx + size - 8).toString());
                    this.renderer.setAttribute(crc, "cy", (size * k + 25 + 8).toString());
                    this.renderer.setAttribute(crc, "r", "4");
                    this.renderer.appendChild(g, crc);
                    //this.renderer.setAttribute(box, "stroke", "#ffd700");
                    //this.renderer.setAttribute(text1, "fill", "#000000");
                    //this.renderer.setAttribute(text2, "fill", "#000000");
                }
                else if (oW[key].starStrength.indexOf('Naidhana') > -1) {
                    var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    this.renderer.setAttribute(crc, "width", "8");
                    this.renderer.setAttribute(crc, "height", "8");
                    this.renderer.setAttribute(crc, "fill", "#ff0000");
                    this.renderer.setAttribute(crc, "stroke", "#ff0000");
                    this.renderer.setAttribute(crc, "stroke-width", "6");
                    this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
                    this.renderer.setAttribute(crc, "cx", (size * dx + size - 8).toString());
                    this.renderer.setAttribute(crc, "cy", (size * k + 25 + 8).toString());
                    this.renderer.setAttribute(crc, "r", "4");
                    this.renderer.appendChild(g, crc);
                    //this.renderer.setAttribute(box, "stroke", "#ff0000");
                    //this.renderer.setAttribute(text1, "fill", "#000000");
                    //this.renderer.setAttribute(text2, "fill", "#000000");
                }
                else if (oW[key].starStrength.indexOf('Prama Mitra') > -1) {
                    var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    this.renderer.setAttribute(crc, "width", "8");
                    this.renderer.setAttribute(crc, "height", "8");
                    this.renderer.setAttribute(crc, "fill", "#00ff7f");
                    this.renderer.setAttribute(crc, "stroke", "#00ff7f");
                    this.renderer.setAttribute(crc, "stroke-width", "6");
                    this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
                    this.renderer.setAttribute(crc, "cx", (size * dx + size - 8).toString());
                    this.renderer.setAttribute(crc, "cy", (size * k + 25 + 8).toString());
                    this.renderer.setAttribute(crc, "r", "4");
                    this.renderer.appendChild(g, crc);
                    //this.renderer.setAttribute(box, "stroke", "#00ff7f");
                    //this.renderer.setAttribute(text1, "fill", "#000000");
                    //this.renderer.setAttribute(text2, "fill", "#000000");
                }
                else if (oW[key].starStrength.indexOf('Mitra') > -1) {
                    var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                    this.renderer.setAttribute(crc, "width", "8");
                    this.renderer.setAttribute(crc, "height", "8");
                    this.renderer.setAttribute(crc, "fill", "#b4eeb4");
                    this.renderer.setAttribute(crc, "stroke", "#b4eeb4");
                    this.renderer.setAttribute(crc, "stroke-width", "6");
                    this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
                    this.renderer.setAttribute(crc, "cx", (size * dx + size - 8).toString());
                    this.renderer.setAttribute(crc, "cy", (size * k + 25 + 8).toString());
                    this.renderer.setAttribute(crc, "r", "4");
                    this.renderer.appendChild(g, crc);
                    //this.renderer.setAttribute(box, "stroke", "#b4eeb4");
                    //this.renderer.setAttribute(text1, "fill", "#000000");
                    //this.renderer.setAttribute(text2, "fill", "#000000");
                }
                else {
                    //this.renderer.setAttribute(box, "stroke", "#000000");
                }
                if (oW[key].lunarStrength.indexOf('Chandrastama') > -1 || oW[key].lunarStrength.indexOf('Bad') > -1) {
                    var lunarDay = {
                        tithi: oW[key].tithi,
                        star: oW[key].star,
                        lunarStrength: (oW[key].lunarStrength.indexOf('Chandrastama') > -1) ? 'Chandrastama' : 'Bad',
                        moonPhase: oW[key].moonPhase,
                        calX: (size * dx).toString(),
                        calY: (size * k + 25).toString()
                    };
                    oLDays[key] = lunarDay;
                }
                //}
                svg.appendChild(g);
            }
        }
        var lnc = 0;
        for (var _b = 0, _c = Object.keys(oLDays); _b < _c.length; _b++) {
            var key = _c[_b];
            lnc++;
            var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
            var bx = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            this.renderer.setAttribute(bx, "width", size.toString());
            this.renderer.setAttribute(bx, "height", size.toString());
            this.renderer.setAttribute(bx, "stroke", "#FF5733");
            this.renderer.setAttribute(bx, "stroke-width", (oLDays[key].lunarStrength == 'Chandrastama') ? "3" : "1");
            this.renderer.setAttribute(bx, "fill-opacity", "0.0");
            this.renderer.setAttribute(bx, "id", "bx" + lnc.toString());
            this.renderer.setAttribute(bx, "x", oLDays[key].calX);
            this.renderer.setAttribute(bx, "y", oLDays[key].calY);
            this.renderer.appendChild(g, bx);
            svg.appendChild(g);
        }
        console.log(svg);
        return svg;
    };
    ;
    StarConstPage.prototype.getWeekDays = function (strs, wday) {
        var oWDays = [];
        var dmon = 0;
        for (var _i = 0, _a = Object.keys(strs); _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.mon && strs[key].date.split(',')[0].split(' ')[1] != this.mon)
                continue;
            dmon++;
            if (strs[key].date.indexOf(wday) > -1) {
                var weekDay = {
                    dmon: dmon,
                    tithi: strs[key].tithi,
                    star: strs[key].star,
                    starStrength: strs[key].starStrength,
                    lunarStrength: strs[key].lunarStrength,
                    moonPhase: strs[key].moonPhase
                };
                oWDays[strs[key].date] = weekDay;
            }
        }
        return oWDays;
    };
    StarConstPage.prototype.getCal = function (strs, wday, i) {
        //console.log(wday);
        //console.log(i);
        //console.log(this.mon);
        var cal;
        var n = 0;
        for (var _i = 0, _a = Object.keys(strs); _i < _a.length; _i++) {
            var key = _a[_i];
            //console.log(strs[key].date);
            //console.log(strs[key].date.split(',')[0].split(' ')[1]);
            if (this.mon && strs[key].date.split(',')[0].split(' ')[1] != this.mon)
                continue;
            //console.log(strs[key].date);
            if (strs[key].date.indexOf(wday) > -1) {
                n++;
                cal = strs[key];
            }
            if (n == i)
                return cal;
        }
    };
    StarConstPage.prototype.translate = function (lord) {
        if (this.shareService.getLANG() == 'en')
            return lord;
        var trn = lord;
        switch (lord.toLowerCase()) {
            case 'sun':
            case 'su':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'సూర్యుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रवि ग्रह';
                }
                break;
            case 'moon':
            case 'mo':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'చంద్రుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'चांद ग्रह';
                }
                break;
            case 'jupiter':
            case 'ju':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'బృహస్పతి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'बृहस्पति';
                }
                break;
            case 'mercury':
            case 'me':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'బుధుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'बुध गृह';
                }
                break;
            case 'mars':
            case 'ma':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కుజుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मंगल ग्रह';
                }
                break;
            case 'venus':
            case 've':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శుక్రుడు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'शुक्र ग्रह';
                }
                break;
            case 'saturn':
            case 'sa':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శనిగ్రహము';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'शनि ग्रह';
                }
                break;
            case 'rahu':
            case 'ra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'రాహు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'राहु ग्रह';
                }
                break;
            case 'ketu':
            case 'ke':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కేతు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'केतु ग्रह';
                }
                break;
            case 'aries':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మేషరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मेष राशि';
                }
                break;
            case 'taurus':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'వృషభరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'वृषभ राशि';
                }
                break;
            case 'gemini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మిధునరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मिथुन राशि';
                }
                break;
            case 'cancer':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కర్కాటకరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कर्क राशि';
                }
                break;
            case 'leo':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'సిమ్హరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'सिंह राशि';
                }
                break;
            case 'virgo':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కన్యరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कन्या राशि';
                }
                break;
            case 'libra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'తులారాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'तुला राशि';
                }
                break;
            case 'scorpio':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'వృశ్చికరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'वृश्चिक राशि';
                }
                break;
            case 'saggitarius':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ధనుస్సురాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'धनु राशि';
                }
                break;
            case 'capricorn':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మకరరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मकर राशि';
                }
                break;
            case 'aquarius':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కుంభరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कुंभ राशि';
                }
                break;
            case 'pisces':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మీనరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मीन राशि';
                }
                break;
            case 'ashwini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'అశ్వినీ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अश्विनी';
                }
                break;
            case 'bharani':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'భరణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'भरणी';
                }
                break;
            case 'krittika':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కృత్తికా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कृत्तिका';
                }
                break;
            case 'rohini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'రోహిణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रोहिणी';
                }
                break;
            case 'mrigashira':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మ్రిగశిర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मृगशिरा';
                }
                break;
            case 'ardra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఆర్ద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'आर्द्र';
                }
                break;
            case 'ardra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఆర్ద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'आर्द्र';
                }
                break;
            case 'punarvasu':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పునర్వసు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पुनर्वसु';
                }
                break;
            case 'pushya':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పుష్య';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पुष्य';
                }
                break;
            case 'ashlesha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఆశ్లేష';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अश्लेषा';
                }
                break;
            case 'magha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మఘ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मघा';
                }
                break;
            case 'purvaphalguni':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వఫల్గుణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वाफाल्गुनी';
                }
                break;
            case 'uttaraaphalguni':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాఫల్గుణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'उत्तराफाल्गुनी';
                }
                break;
            case 'hastha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'హస్త';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'हस्ता';
                }
                break;
            case 'chitra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'చిత్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'चित्र';
                }
                break;
            case 'swati':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'స్వాతి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'स्वाति';
                }
                break;
            case 'vishakha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'విశాఖ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'विशाखा';
                }
                break;
            case 'anuradha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'అనురాధ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अनुराधा';
                }
                break;
            case 'jyestha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'జ్యేష్ఠా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'जयस्था';
                }
                break;
            case 'mula':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మూల';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मूल';
                }
                break;
            case 'purvaashada':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వాషాఢ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वाषाढ़ा';
                }
                break;
            case 'uttaraashada':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాషాఢ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'उत्तराषाढ़ा';
                }
                break;
            case 'shravana':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శ్రావణ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'श्रवण';
                }
                break;
            case 'danishta':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ధనిష్ఠ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'धनिष्ठा';
                }
                break;
            case 'shatabhisha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శతభిషా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'शतभिषा';
                }
                break;
            case 'purvabhadra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వాభాద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वभाद्र';
                }
                break;
            case 'uttarabhadra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాభాద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'उत्तरभाद्र';
                }
                break;
            case 'revati':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'రేవతి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रेवती';
                }
                break;
            case 'prathama':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ప్రథమ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'प्रथम';
                }
                break;
            case 'dwitiya':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ద్వితీయ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'द्वितीय';
                }
                break;
            case 'tritiya':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'తృతీయ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'तृतीया';
                }
                break;
            case 'chaturthi':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'చవితి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'चतुर्थी';
                }
                break;
            case 'panchami':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పంచమి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पंचमी';
                }
                break;
            case 'shashthi':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'షష్ఠి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'साष्टी';
                }
                break;
            case 'sapthami':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'సప్తమి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'सप्तमी';
                }
                break;
            case 'asthami':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'అష్టమి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अष्ठमी';
                }
                break;
            case 'navami':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'నవమి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रेवती';
                }
                break;
            case 'dasami':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'దశమి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'दशमी';
                }
                break;
            case 'ekadashi':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఏకాదశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'एकादशी';
                }
                break;
            case 'dwadashi':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ద్వాదశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'द्वादशी';
                }
                break;
            case 'trayodashi':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'త్రయోదశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'त्रयोदशी';
                }
                break;
            case 'chaturdashi':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'చతుర్దశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'चतुर्दशी';
                }
                break;
            case 'purnima':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్ణిమ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्णिमा';
                }
                break;
            case 'amavasya':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'అమావాస్య';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अमावस्या';
                }
                break;
            case 'janma/ danger to body':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'జన్మ / శరీరానికి ప్రమాదం';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'जैनमा / शरीर के लिए खतरा';
                }
                break;
            case 'sampat/ wealth and prosperity':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'సంపత్ / సంపద మరియు శ్రేయస్సు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'सम्पत / धन और समृद्धि';
                }
                break;
            case 'vipat/ dangers, losses, accidents':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'విపత్ / ప్రమాదాలు, నష్టాలు, దుర్ఘటనలు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'विपत / खतरे, नुकसान, दुर्घटनाएं';
                }
                break;
            case 'kshema/ prosperity':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'క్షేమ / శ్రేయస్సు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'क्षेम / समृद्धि';
                }
                break;
            case 'pratyak/ obstacles':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ప్రత్యక్ / అడ్డంకులు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'प्रत्येक / बाधाओं';
                }
                break;
            case 'sadhana/ realisation and ambitions':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'సాధనా / పరిపూర్ణత మరియు లక్ష్యాలు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'साधना / अहसास और महत्वाकांक्षा';
                }
                break;
            case 'naidhana/ dangers':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'నైదాన / ప్రమాదములు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'नायदाणा / खतरे';
                }
                break;
            case 'mitra/ good':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మిత్ర / మంచి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मित्र / अच्छा';
                }
                break;
            case 'prama mitra/ very favourable':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ప్రమా మిత్ర / చాలా అనుకూలమైన';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'प्रामा मित्रा / बहुत अनुकूल है';
                }
                break;
            default:
                trn = lord;
                break;
        }
        return trn;
    };
    __decorate([
        ViewChild('hinduCal1'),
        __metadata("design:type", Object)
    ], StarConstPage.prototype, "hinduCal1", void 0);
    __decorate([
        ViewChild('hinduCal2'),
        __metadata("design:type", Object)
    ], StarConstPage.prototype, "hinduCal2", void 0);
    StarConstPage = __decorate([
        NgModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        }),
        Component({
            selector: 'page-star-const',
            templateUrl: 'star-const.html',
        }),
        __metadata("design:paramtypes", [Platform, NavController, NavParams, FormBuilder, Renderer2, HoroscopeService, AppRate, ShareService])
    ], StarConstPage);
    return StarConstPage;
}());
export { StarConstPage };
//# sourceMappingURL=star-const.js.map