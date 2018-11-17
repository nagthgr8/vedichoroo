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
import { File } from '@ionic-native/file';
import { ShareService } from '../../app/share.service';
import { HoroscopeService } from '../../app/horoscope.service';
import { TranslateService } from '@ngx-translate/core';
import * as sublords from '../horoscope/sublords.json';
import * as lunapics from './lunapics.json';
/**
 * Generated class for the PanchangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PanchangPage = /** @class */ (function () {
    function PanchangPage(navCtrl, navParams, horoService, shareService, translate, file) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.horoService = horoService;
        this.shareService = shareService;
        this.translate = translate;
        this.file = file;
        this.today = '';
        this.sunrise = '';
        this.sunset = '';
        this.rahukal = '';
        this.yama = '';
        this.abhjit = '';
        //fetching: string = '';
        this.lagna = '';
        this.ticks = 0;
        this.lag_d = 0;
        this.lag_m = 0;
        this.lag_s = 0;
        this.lagml = '';
        this.lagal = '';
        this.lagsl = '';
        this.nak = '';
        this.tithi = '';
        this.lunapic = '';
        this.info = '';
        this.showPAN = false;
        this.info = 'Please wait...';
        this.showPAN = false;
    }
    PanchangPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad PanchangPage');
        this.today = Date.now();
        this.info = 'Fetching todays panchang....';
        console.log(this.file.dataDirectory);
        this.file.readAsText(this.file.dataDirectory, 'vedicperfs.json').then(function (res) {
            console.log('vedicperfs', res);
            var jsonv = JSON.parse(res);
            _this.sunrise = jsonv['srise'];
            _this.sunset = jsonv['sset'];
            _this.rahukal = jsonv['rahukal_s'] + ' To ' + jsonv['rahukal_e'];
            _this.yama = jsonv['yamagand_s'] + ' To ' + jsonv['yamagand_e'];
            _this.abhjit = jsonv['abhijit_s'] + ' To ' + jsonv['abhijit_e'];
            var cd = new Date();
            _this.horoService.getCusps(_this.getDms(jsonv['clat']), _this.getDms(jsonv['clat']), cd.getFullYear() + '-' + (cd.getMonth() + 1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes(), jsonv['localtz'])
                .subscribe(function (res3) {
                _this.showPAN = true;
                _this.info = '';
                _this.nak = _this.translate_func(res3['birthStar']);
                _this.tithi = _this.translate_func(res3['tithi']);
                console.log(res3['tithi'].toLowerCase()); // + (res3['moonPhase'] == 'waxing') ? '-s' : '-k');
                var ky = (res3['moonPhase'] == 'waxing') ? res3['tithi'].toLowerCase() + '-s' : res3['tithi'].toLowerCase() + '-k';
                console.log(ky);
                _this.lunapic = lunapics[ky];
                var ascPos = res3['ascPos'];
                console.log(ascPos);
                var lag = _this.getDms(ascPos[0]);
                console.log(lag);
                _this.lagna = lag;
                console.log(lag.indexOf('º'));
                _this.lag_d = Number(lag.substring(0, lag.indexOf('º')));
                console.log(_this.lag_d);
                _this.lag_m = Number(lag.substring(lag.indexOf('º') + 1, lag.indexOf("'")));
                console.log(_this.lag_m);
                _this.lag_s = Math.floor(lag.substring(lag.indexOf("'") + 1, lag.indexOf('"')));
                console.log(_this.lag_s);
                var c_mins = _this.lag_d * 60 + _this.lag_m + Number((_this.lag_s / 60).toFixed(2));
                console.log(c_mins);
                var sssl = _this.calcStar(c_mins);
                console.log(sssl);
                _this.lagml = sssl.split('|')[0];
                _this.lagal = sssl.split('|')[1];
                _this.lagsl = sssl.split('|')[2];
                var intv = setInterval(function () {
                    _this.ticks++;
                    //console.log('ticks=' + this.ticks.toString());
                    _this.lag_s += 15;
                    if (_this.lag_s > 59) {
                        _this.lag_s = _this.lag_s - 59;
                        _this.lag_m++;
                        if (_this.lag_m > 59) {
                            _this.lag_m = 0;
                            _this.lag_d++;
                        }
                    }
                    var lag_r = '';
                    if (_this.lag_d < 29)
                        lag_r = 'Aries';
                    else if (_this.lag_d < 59)
                        lag_r = 'Taurus';
                    else if (_this.lag_d < 89)
                        lag_r = 'Gemini';
                    else if (_this.lag_d < 119)
                        lag_r = 'Cancer';
                    else if (_this.lag_d < 149)
                        lag_r = 'Leo';
                    else if (_this.lag_d < 179)
                        lag_r = 'Virgo';
                    else if (_this.lag_d < 209)
                        lag_r = 'Libra';
                    else if (_this.lag_d < 239)
                        lag_r = 'Scorpio';
                    else if (_this.lag_d < 269)
                        lag_r = 'Sagittarius';
                    else if (_this.lag_d < 299)
                        lag_r = 'Capricorn';
                    else if (_this.lag_d < 329)
                        lag_r = 'Aquarius';
                    else
                        lag_r = 'Pisces';
                    _this.lagna = lag_r + ' ' + _this.lag_d.toString() + 'º' + _this.lag_m.toString() + "'" + _this.lag_s.toString() + '"';
                    var cur_m = _this.lag_d * 60 + _this.lag_m + Math.floor(_this.lag_s / 60);
                    //console.log(cur_m);
                    var sl = _this.calcStar(cur_m);
                    _this.lagml = sl.split('|')[0];
                    _this.lagal = sl.split('|')[1];
                    _this.lagsl = sl.split('|')[2];
                }, 1000);
            }, function (err) {
                //this.info = err;
            });
        });
    };
    PanchangPage.prototype.calcStar = function (mins) {
        //console.log(mins);
        for (var i = 0; i < Object.keys(sublords).length; i++) {
            var nak = sublords[i];
            var degs = sublords[i].deg;
            var s_mins = parseInt(degs.split('-')[0].split('.')[0], 10) * 60 + parseInt(degs.split('-')[0].split('.')[1]) + Number(degs.split('-')[0].split('.')[2]) / 60;
            var e_mins = parseInt(degs.split('-')[1].split('.')[0], 10) * 60 + parseInt(degs.split('-')[1].split('.')[1]) + Number(degs.split('-')[1].split('.')[2]) / 60;
            //var deg_s = parseFloat(degs.split('-')[0].split('.')[0] + '.' + degs.split('-')[0].split('.')[1]);
            //var deg_e = parseFloat(degs.split('-')[1].split('.')[0] + '.' + degs.split('-')[1].split('.')[1]);
            //console.log(s_mins);
            //console.log(e_mins);
            if (mins >= s_mins && mins <= e_mins) {
                //console.log(s_mins);
                //console.log(e_mins);
                return nak.sign + '|' + nak.star + '|' + nak.sub;
            }
        }
        return '-1';
    };
    PanchangPage.prototype.getDms = function (val) {
        // Required variables
        var valDeg, valMin, valSec, result;
        // Here you'll convert the value received in the parameter to an absolute value.
        // Conversion of negative to positive.
        // In this step it does not matter if it's North, South, East or West,
        // such verification was performed earlier.
        val = Math.abs(val); // -40.601203 = 40.601203
        // ---- Degrees ----
        // Stores the integer of DD for the Degrees value in DMS
        valDeg = Math.floor(val); // 40.601203 = 40
        // Add the degrees value to the result by adding the degrees symbol "º".
        result = valDeg + "º"; // 40º
        // ---- Minutes ----
        // Removing the integer of the initial value you get the decimal portion.
        // Multiply the decimal portion by 60.
        // Math.floor returns an integer discarding the decimal portion.
        // ((40.601203 - 40 = 0.601203) * 60 = 36.07218) = 36
        valMin = Math.floor((val - valDeg) * 60); // 36.07218 = 36
        // Add minutes to the result, adding the symbol minutes "'".
        result += valMin + "'"; // 40º36'
        // ---- Seconds ----
        // To get the value in seconds is required:
        // 1º - removing the degree value to the initial value: 40 - 40.601203 = 0.601203;
        // 2º - convert the value minutes (36') in decimal ( valMin/60 = 0.6) so
        // you can subtract the previous value: 0.601203 - 0.6 = 0.001203;
        // 3º - now that you have the seconds value in decimal,
        // you need to convert it into seconds of degree.
        // To do so multiply this value (0.001203) by 3600, which is
        // the number of seconds in a degree.
        // You get 0.001203 * 3600 = 4.3308
        // As you are using the function Math.round(),
        // which rounds a value to the next unit,
        // you can control the number of decimal places
        // by multiplying by 1000 before Math.round
        // and subsequent division by 1000 after Math.round function.
        // You get 4.3308 * 1000 = 4330.8 -> Math.round = 4331 -> 4331 / 1000 = 4.331
        // In this case the final value will have three decimal places.
        // If you only want two decimal places
        // just replace the value 1000 by 100.
        valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000; // 40.601203 = 4.331 
        // Add the seconds value to the result,
        // adding the seconds symbol " " ".
        result += valSec + '"'; // 40º36'4.331"
        // Returns the resulting string.
        return result;
    };
    PanchangPage.prototype.calcTime = function (offset) {
        var d = new Date();
        var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
        var nd = new Date(utc + (3600000 * offset));
        alert("The local time is " + nd.toLocaleString());
    };
    PanchangPage.prototype.translate_func = function (lord) {
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
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சூரியன்';
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
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சந்திரன்';
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
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'குரு';
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
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'புதன்';
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
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'செவ்வாய்';
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
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சுக்கிரன்';
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
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சனி';
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
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ராகு';
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
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கேது';
                }
                break;
            case 'aries':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మేషరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मेष राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'மேஷம்';
                }
                break;
            case 'taurus':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'వృషభరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'वृषभ राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ரிஷபம்';
                }
                break;
            case 'gemini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మిధునరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'மிதுனம்';
                }
                break;
            case 'cancer':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కర్కాటకరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कर्क राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கடகம்';
                }
                break;
            case 'leo':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'సిమ్హరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'सिंह राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சிம்மம்';
                }
                break;
            case 'virgo':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కన్యరాశి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कन्या राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கன்னி';
                }
                break;
            case 'libra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'తులారాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'तुला राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'துலாம்';
                }
                break;
            case 'scorpio':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'వృశ్చికరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'वृश्चिक राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'விருச்சிகம்';
                }
                break;
            case 'saggitarius':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ధనుస్సురాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'धनु राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'தனுசு';
                }
                break;
            case 'capricorn':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మకరరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'மகரம்';
                }
                break;
            case 'aquarius':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కుంభరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कुंभ राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கும்பம்';
                }
                break;
            case 'pisces':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మీనరాసి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मीन राशि';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'மீனம்';
                }
                break;
            case 'ashwini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'అశ్వినీ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अश्विनी';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'அஸ்வினி';
                }
                break;
            case 'bharani':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'భరణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'भरणी';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'பரணி';
                }
                break;
            case 'krittika':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'కృత్తికా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'कृत्तिका';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கிருத்திகை';
                }
                break;
            case 'rohini':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'రోహిణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रोहिणी';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ரோகிணி';
                }
                break;
            case 'mrigashira':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మ్రిగశిర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मृगशिरा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'மிருகசிரீடம்';
                }
                break;
            case 'ardra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఆర్ద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'आर्द्र';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'திருவாதிரை';
                }
                break;
            case 'punarvasu':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పునర్వసు';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पुनर्वसु';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'புனர்பூசம்';
                }
                break;
            case 'pushya':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పుష్య';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पुष्य';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'பூசம்';
                }
                break;
            case 'ashlesha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఆశ్లేష';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अश्लेषा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ஆயில்யம்';
                }
                break;
            case 'magha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మఘ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मघा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'மகம்';
                }
                break;
            case 'purvaphalguni':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వఫల్గుణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वाफाल्गुनी';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'பூரம்';
                }
                break;
            case 'uttaraaphalguni':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాఫల్గుణి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'उत्तराफाल्गुनी';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'உத்திரம்';
                }
                break;
            case 'hastha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'హస్త';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'हस्ता';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'அஸ்தம்';
                }
                break;
            case 'chitra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'చిత్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'चित्र';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சித்திரை';
                }
                break;
            case 'swati':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'స్వాతి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'स्वाति';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ஸ்வாதி';
                }
                break;
            case 'vishakha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'విశాఖ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'विशाखा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'விசாகம்';
                }
                break;
            case 'anuradha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'అనురాధ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'अनुराधा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'அனுஷம்';
                }
                break;
            case 'jyestha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'జ్యేష్ఠా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'जयस्था';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'கேட்டை';
                }
                break;
            case 'mula':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'మూల';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'मूल';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'மூலம்';
                }
                break;
            case 'purvaashada':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వాషాఢ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वाषाढ़ा';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'பூராடம்';
                }
                break;
            case 'uttaraashada':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాషాఢ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'उत्तराषाढ़ा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'உத்திராடம்';
                }
                break;
            case 'shravana':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శ్రావణ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'श्रवण';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'திருவோணம்';
                }
                break;
            case 'danishta':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ధనిష్ఠ';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'धनिष्ठा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'அவிட்டம்';
                }
                break;
            case 'shatabhisha':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'శతభిషా';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'शतभिषा';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'சதயம்';
                }
                break;
            case 'purvabhadra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'పూర్వాభాద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'पूर्वभाद्र';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'பூரட்டாதி';
                }
                break;
            case 'uttarabhadra':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'ఉత్తరాభాద్ర';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'உத்திரட்டாதி';
                }
                break;
            case 'revati':
                if (this.shareService.getLANG() == 'te') {
                    trn = 'రేవతి';
                }
                else if (this.shareService.getLANG() == 'hi') {
                    trn = 'रेवती';
                }
                else if (this.shareService.getLANG() == 'ta') {
                    trn = 'ரேவதி';
                }
                break;
            default:
                trn = lord;
                break;
        }
        return trn;
    };
    PanchangPage = __decorate([
        Component({
            selector: 'page-panchang',
            templateUrl: 'panchang.html',
        }),
        __metadata("design:paramtypes", [NavController, NavParams, HoroscopeService, ShareService, TranslateService, File])
    ], PanchangPage);
    return PanchangPage;
}());
export { PanchangPage };
//# sourceMappingURL=panchang.js.map