var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { throwError as observableThrowError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
var HoroscopeService = /** @class */ (function () {
    function HoroscopeService(http) {
        this.http = http;
        this.apiUrl = 'https://live.makemypublication.com/Publication/Birthchart';
        this.apiUrl2 = 'https://live.makemypublication.com/Publication/DailyHoroscope';
        this.apiUrl3 = 'https://live.makemypublication.com/Publication/SubscribeAstroUser';
        this.apiUrl4 = 'https://live.makemypublication.com/Publication/Birthstars';
        this.apiUrl5 = 'https://live.makemypublication.com/Publication/Birthstar';
        this.apiUrl6 = 'https://live.makemypublication.com/Publication/StarsForMonth';
        this.apiUrl7 = 'https://maps.googleapis.com/maps/api/timezone/json';
        this.apiUrl8 = 'http://www.126news.com/Publication/AstroStories';
        this.apiUrl9 = 'https://live.makemypublication.com/Publication/Getcusps';
        this.apiUrl10 = 'https://live.makemypublication.com/Publication/GetTransits';
        this.apiUrl20 = 'https://live.makemypublication.com/Publication/GetDashTrans';
        this.apiUrl11 = 'https://live.makemypublication.com/Publication/GetDashaTransits';
        this.apiUrl111 = 'https://translation.googleapis.com/language/translate/v2';
        this.apiUrl1111 = 'https://live.makemypublication.com/Publication/GetYogas';
        this.apiUrl22 = 'https://live.makemypublication.com/Publication/RecfyBT';
        this.apiUrl23 = 'https://live.makemypublication.com/Publication/GetPlan';
        this.apiUrl24 = 'https://live.makemypublication.com/Publication/SetPlan';
        this.apiUrl25 = 'https://live.makemypublication.com/Publication/AddCredits';
        this.apiUrl26 = 'https://live.makemypublication.com/Publication/AddDOB';
        this.apiUrl27 = 'https://live.makemypublication.com/Publication/AddTicket';
        this.apiUrl28 = 'https://live.makemypublication.com/Publication/FollowTicket';
        this.apiUrl29 = 'https://live.makemypublication.com/Publication/GetNotif';
        this.apiUrl30 = 'https://live.makemypublication.com/Publication/AddSubscriber';
        this.monthList = [
            { name: "January", numdays: 31, abbr: "Jan" },
            { name: "February", numdays: 28, abbr: "Feb" },
            { name: "March", numdays: 31, abbr: "Mar" },
            { name: "April", numdays: 30, abbr: "Apr" },
            { name: "May", numdays: 31, abbr: "May" },
            { name: "June", numdays: 30, abbr: "Jun" },
            { name: "July", numdays: 31, abbr: "Jul" },
            { name: "August", numdays: 31, abbr: "Aug" },
            { name: "September", numdays: 30, abbr: "Sep" },
            { name: "October", numdays: 31, abbr: "Oct" },
            { name: "November", numdays: 30, abbr: "Nov" },
            { name: "December", numdays: 31, abbr: "Dec" },
        ];
    }
    HoroscopeService.prototype.getCountries = function () {
        return this.http.get(this.apiUrl).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getDailyHoro = function (moonSign) {
        var oDat = {
            sign: ''
        };
        oDat.sign = moonSign;
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl2, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.subscribeAstroUser = function (token, moonSign, moonDeg) {
        var oDat = {
            token: '',
            sign: '',
            deg: ''
        };
        oDat.token = token;
        oDat.sign = moonSign;
        oDat.deg = moonDeg.toString();
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl3, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.addSubscriber = function (uuid, nam, mob, eml) {
        var oDat = {
            uuid: uuid,
            nam: nam,
            mob: mob,
            eml: eml
        };
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl30, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getYogas = function (dmslat, dmslng, dob, tz, lang) {
        var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
        var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
        var latlng = lat + '|' + lng;
        //var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
        var oDat = {
            dob: '',
            tob: '',
            latlng: '',
            timezone: '',
            lang: ''
        };
        oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
        oDat.tob = dob.split('T')[1].split(':')[0] + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
        oDat.latlng = latlng;
        oDat.timezone = tz;
        oDat.lang = lang;
        //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl1111, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getNotif = function (uuid) {
        var oDat = {
            uuid: uuid
        };
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl29, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getPlan = function (uuid) {
        var oDat = {
            uuid: uuid
        };
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl23, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.setPlan = function (uuid, name) {
        var oDat = {
            uuid: uuid,
            name: name
        };
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl24, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.addCredits = function (uuid, credits) {
        var oDat = {
            uuid: uuid,
            credits: credits
        };
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl25, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.addDOB = function (uuid, dob) {
        var oDat = {
            uuid: uuid,
            dob: dob
        };
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl26, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.addTicket = function (uuid, cat, sub, msg) {
        var oDat = {
            uuid: uuid,
            cat: cat,
            sub: sub,
            msg: msg
        };
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl27, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.followTicket = function (uuid, guid, msg) {
        var oDat = {
            uuid: uuid,
            guid: guid,
            msg: msg
        };
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl28, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getHoro = function (dmslat, dmslng, dob, tz) {
        var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
        var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
        var latlng = lat + '|' + lng;
        //var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
        var oDat = {
            dob: '',
            tob: '',
            latlng: '',
            timezone: '',
            name: '',
            eml: ''
        };
        oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
        oDat.tob = dob.split('T')[1].split(':')[0] + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
        oDat.latlng = latlng;
        oDat.timezone = tz;
        oDat.name = '';
        oDat.eml = '';
        //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getCusps = function (dmslat, dmslng, dob, tz) {
        var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
        var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
        var latlng = lat + '|' + lng;
        //var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
        var oDat = {
            dob: '',
            tob: '',
            latlng: '',
            timezone: ''
        };
        oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
        oDat.tob = dob.split('T')[1].split(':')[0] + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
        oDat.latlng = latlng;
        oDat.timezone = tz;
        //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Cache-control', 'no-cache');
        headers.append('Cache-control', 'no-store');
        headers.append('Expires', '0');
        headers.append('Pragma', 'no-cache');
        return this.http.post(this.apiUrl9, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.recfyBT = function (dmslat, dmslng, dob, tz) {
        var lat = dmslat.split("º")[0] + '.' + dmslat.split("º")[1].split("'")[0];
        var lng = dmslng.split("º")[0] + '.' + dmslng.split("º")[1].split("'")[0];
        var latlng = lat + '|' + lng;
        //var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '&latlng=' + latlng + '&timezone=' + tz + '&name=' + '&eml=';
        var oDat = {
            dob: '',
            tob: '',
            latlng: '',
            timezone: ''
        };
        oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
        oDat.tob = dob.split('T')[1].split(':')[0] + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
        oDat.latlng = latlng;
        oDat.timezone = tz;
        //let headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        headers.append('Cache-control', 'no-cache');
        headers.append('Cache-control', 'no-store');
        headers.append('Expires', '0');
        headers.append('Pragma', 'no-cache');
        return this.http.post(this.apiUrl22, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getBirthStars = function (dob, partnerdob) {
        //var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '-' + //partnerdob.split('T')[0].split('-')[2] + '|' + partnerdob.split('T')[0].split('-')[1] + '|' + partnerdob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '-' + partnerdob.split('T')[1].split(':')[0]  + '|' + //partnerdob.split('T')[1].split(':')[1] + '|' + '0';
        var oDat = {
            dob: '',
            tob: ''
        };
        oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '-' + partnerdob.split('T')[0].split('-')[2] + '|' + partnerdob.split('T')[0].split('-')[1] + '|' + partnerdob.split('T')[0].split('-')[0];
        oDat.tob = dob.split('T')[1].split(':')[0] + '|' + dob.split('T')[1].split(':')[1] + '|' + '0' + '-' + partnerdob.split('T')[1].split(':')[0] + '|' + partnerdob.split('T')[1].split(':')[1] + '|' + '0';
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl4, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getBirthStar = function (dob) {
        //var oDat = 'dob=' + dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0] + '&tob=' + //dob.split('T')[1].split(':')[0]  + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
        var oDat = {
            dob: '',
            tob: ''
        };
        oDat.dob = dob.split('T')[0].split('-')[2] + '|' + dob.split('T')[0].split('-')[1] + '|' + dob.split('T')[0].split('-')[0];
        oDat.tob = dob.split('T')[1].split(':')[0] + '|' + dob.split('T')[1].split(':')[1] + '|' + '0';
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl5, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getStarConst = function (star, sign, moondeg) {
        //var oDat = 'star=' + star + '&sign=' + sign + '&moondeg=' + moondeg;
        var oDat = {
            star: '',
            sign: '',
            moondeg: ''
        };
        oDat.star = star;
        oDat.sign = sign;
        oDat.moondeg = moondeg;
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl6, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getTimezone = function (lat, lng, timestamp) {
        var oDat = 'location=' + lat + ',' + lng + '&timestamp=' + timestamp + '&key=' + 'AIzaSyANvr-rVst44P0DMBpDxsu6s0GXUVPrl9M';
        return this.http.post(this.apiUrl7 + '?' + oDat, null).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getStories = function () {
        return this.http.get(this.apiUrl8).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getTransits = function (mdas, adas, pdas, pend) {
        var oDat = {
            mdas: '',
            adas: '',
            pdas: '',
            pend: ''
        };
        oDat.mdas = mdas;
        oDat.adas = adas;
        oDat.pdas = pdas;
        oDat.pend = pend;
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl10, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getDashTrans = function (mdas, adas, pdas, pend) {
        var oDat = {
            mdas: '',
            adas: '',
            pdas: '',
            pend: ''
        };
        oDat.mdas = mdas;
        oDat.adas = adas;
        oDat.pdas = pdas;
        oDat.pend = pend;
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl20, JSON.stringify(oDat), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.getDashaTransits = function (vim) {
        var headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json; charset=utf-8');
        return this.http.post(this.apiUrl11, JSON.stringify(vim), { headers: headers }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.translateText = function (txt, tgt) {
        var params = new HttpParams();
        params = params.append('q', txt);
        params = params.append('source', 'en');
        params = params.append('target', tgt);
        params = params.append('key ', 'AIzaSyByRjvoxkrwrCgMTmawQcm7zo0m2a5wg2s');
        return this.http.get(this.apiUrl111, { params: params }).pipe(map(this.extractData), catchError(this.handleError));
    };
    HoroscopeService.prototype.extractData = function (res) {
        var body = res;
        return body || {};
    };
    HoroscopeService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof Response) {
            var err = error || '';
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return observableThrowError(errMsg);
    };
    HoroscopeService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [HttpClient])
    ], HoroscopeService);
    return HoroscopeService;
}());
export { HoroscopeService };
//# sourceMappingURL=horoscope.service.js.map