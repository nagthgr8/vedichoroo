var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
var ShareService = /** @class */ (function () {
    function ShareService(_storage, events) {
        var _this = this;
        this._storage = _storage;
        this.events = events;
        this.oVim = [];
        this._storage.ready().then(function () {
            console.log('storage is ready');
            _this._storage.get('place').then(function (res) {
                console.log('place', res);
                _this.place = res;
            });
            _this._storage.get('dob').then(function (res) {
                console.log('dob', res);
                _this.dob = res;
            });
            _this._storage.get('timezone').then(function (res) {
                console.log('timezone', res);
                _this.timezone = res;
            });
            _this._storage.get('lat').then(function (res) {
                console.log('lat', res);
                _this.lat = res;
            });
            _this._storage.get('lng').then(function (res2) {
                console.log('lng', res2);
                _this.lng = res2;
            });
            _this._storage.get('moonSign').then(function (res) {
                console.log('moonSign', res);
                _this.moonSign = res;
            });
            _this._storage.get('birthStar').then(function (res) {
                console.log('birthStar', res);
                _this.birthStar = res;
            });
            _this._storage.get('lang').then(function (res) {
                console.log('lang', res);
                if (res)
                    _this.lang = res;
                else
                    _this.lang = 'en';
                _this.events.publish('dbfetch:lang', res);
            });
            _this._storage.get('rahu').then(function (res) {
                console.log('rahu', res);
                (res) ? _this.rahu = res : _this.rahu = false;
                _this.events.publish('dbfetch:rahu', res);
            });
            _this._storage.get('rahus').then(function (res) {
                console.log('rahus', res);
                (res) ? _this.rahus = res : _this.rahus = false;
                _this.events.publish('dbfetch:rahus', res);
            });
            _this._storage.get('rahut1').then(function (res) {
                console.log('rahut1', res);
                (res) ? _this.rahut1 = res : _this.rahut1 = false;
                _this.events.publish('dbfetch:rahut1', res);
            });
            _this._storage.get('rahut2').then(function (res) {
                console.log('rahut2', res);
                (res) ? _this.rahut2 = res : _this.rahut2 = false;
                _this.events.publish('dbfetch:rahut2', res);
            });
            _this._storage.get('rahut3').then(function (res) {
                console.log('rahut3', res);
                (res) ? _this.rahut3 = res : _this.rahut3 = false;
                _this.events.publish('dbfetch:rahut3', res);
            });
            _this._storage.get('sunrise').then(function (res) {
                console.log('sunrise', res);
                (res) ? _this.sunrise = res : _this.sunrise = false;
                _this.events.publish('dbfetch:sunrise', res);
            });
            _this._storage.get('sunset').then(function (res) {
                console.log('sunset', res);
                (res) ? _this.sunset = res : _this.sunset = false;
                _this.events.publish('dbfetch:sunset', res);
            });
        });
    }
    ShareService.prototype.setMoonSign = function (moonSign) {
        this.moonSign = moonSign;
        this._storage.set('moonSign', moonSign);
    };
    ShareService.prototype.setBirthStar = function (birthStar) {
        this.birthStar = birthStar;
        this._storage.set('birthStar', birthStar);
    };
    ShareService.prototype.setPersonDetails = function (place, dob) {
        this.place = place;
        this.dob = dob;
        this._storage.set('place', place);
        this._storage.set('dob', dob);
    };
    ShareService.prototype.setLAT = function (lat) {
        this.lat = lat;
        this._storage.set('lat', lat);
    };
    ShareService.prototype.setLNG = function (lng) {
        this.lng = lng;
        this._storage.set('lng', lng);
    };
    ShareService.prototype.setTimezone = function (timezone) {
        this.timezone = timezone;
        this._storage.set('timezone', timezone);
    };
    ShareService.prototype.setPLPOS = function (plpos) {
        this.plpos = plpos;
    };
    ShareService.prototype.setYOGAS = function (yogas) {
        this.yogas = yogas;
    };
    ShareService.prototype.setHPOS = function (hpos) {
        this.hpos = hpos;
    };
    ShareService.prototype.setLANG = function (lang) {
        var _this = this;
        this.lang = lang;
        this._storage.ready().then(function () {
            console.log('setLANG()', lang);
            _this._storage.set('lang', lang);
        });
    };
    ShareService.prototype.setRAHU = function (rahu) {
        this.rahu = rahu;
        this._storage.set('rahu', rahu);
    };
    ShareService.prototype.setRAHUS = function (rahus) {
        this.rahus = rahus;
        this._storage.set('rahus', rahus);
    };
    ShareService.prototype.setSUNR = function (sunrise) {
        this.sunrise = sunrise;
        this._storage.set('sunrise', sunrise);
    };
    ShareService.prototype.setSUNS = function (sunset) {
        this.sunset = sunset;
        this._storage.set('sunset', sunset);
    };
    ShareService.prototype.setRAHUT1 = function (rahut1) {
        this.rahut1 = rahut1;
        this._storage.set('rahut1', rahut1);
    };
    ShareService.prototype.setRAHUT2 = function (rahut2) {
        this.rahut2 = rahut2;
        this._storage.set('rahut2', rahut2);
    };
    ShareService.prototype.setRAHUT3 = function (rahut3) {
        this.rahut3 = rahut3;
        this._storage.set('rahut3', rahut3);
    };
    ShareService.prototype.addVIM = function (per, mdas, adas, pdas) {
        var vimDas = {
            mdas: mdas,
            adas: adas,
            pdas: pdas
        };
        this.oVim[per] = vimDas;
    };
    ShareService.prototype.getMoonSign = function () {
        return this.moonSign;
    };
    ShareService.prototype.getBirthStar = function () {
        return this.birthStar;
    };
    ShareService.prototype.getPLPOS = function () {
        return this.plpos;
    };
    ShareService.prototype.getYOGAS = function () {
        return this.yogas;
    };
    ShareService.prototype.getHPOS = function () {
        return this.hpos;
    };
    ShareService.prototype.getPlace = function () {
        return this.place;
    };
    ShareService.prototype.getDOB = function () {
        return this.dob;
    };
    ShareService.prototype.getTimezone = function () {
        return this.timezone;
    };
    ShareService.prototype.getLAT = function () {
        return this.lat;
    };
    ShareService.prototype.getLNG = function () {
        return this.lng;
    };
    ShareService.prototype.getVIM = function () {
        return this.oVim;
    };
    ShareService.prototype.getLANG = function () {
        return this.lang;
    };
    ShareService.prototype.getRAHU = function () {
        return this.rahu;
    };
    ShareService.prototype.getRAHUS = function () {
        return this.rahus;
    };
    ShareService.prototype.getSUNR = function () {
        return this.sunrise;
    };
    ShareService.prototype.getSUNS = function () {
        return this.sunset;
    };
    ShareService.prototype.getRAHUT1 = function () {
        return this.rahut1;
    };
    ShareService.prototype.getRAHUT2 = function () {
        return this.rahut2;
    };
    ShareService.prototype.getRAHUT3 = function () {
        return this.rahut3;
    };
    ShareService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage, Events])
    ], ShareService);
    return ShareService;
}());
export { ShareService };
//# sourceMappingURL=share.service.js.map