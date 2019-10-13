import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { VimDasha } from './vim-das';

@Injectable()
export class ShareService {
    private dsPlan = new BehaviorSubject({ uuid: '', name: '', credits: 0, dobs: '' });
	plan = this.dsPlan.asObservable();
    private dsLang = new BehaviorSubject('');
	langc = this.dsLang.asObservable();
    place: string;
	dob: string;
	timezone: string;
	lat: string;
	lng: string;
	ctimezone: string;
	clat: string;
	clng: string;
	tz: string;
    plpos: any;
    yogas: any;
	preds: any;
	hpos: any;
	moonSign: string;
	birthStar: string;
	oVim :VimDasha[] = [];
	lang: string;
	rahu: boolean;
	rahus: boolean;
	rahut1: boolean;
	rahut2: boolean;
	rahut3: boolean;
	sunrise: boolean;
	sunset: boolean;
	yogad: boolean;
	prasnas: number;
	prasdt: string;
	chtyp: string;
	aynm: string;
	kaynm: string;
	raynm: string;
	ccode: string;
	rpls: string;
    constructor(private _storage: Storage, public events: Events) { 
	    this.yogad = false;
        this._storage.ready().then(() => {
		    console.log('storage is ready');
			this._storage.get('place').then(res => {
			    console.log('place', res);
				this.place = res;
			});
			this._storage.get('dob').then(res => {
			    console.log('dob', res);
				this.dob = res;
			});
			this._storage.get('timezone').then(res => {
			    console.log('timezone', res);
				this.timezone = res;
			});
			this._storage.get('lat').then(res => {
			    console.log('lat', res);
				this.lat = res;
			});
				this._storage.get('lng').then(res2 => {
					console.log('lng', res2);
					this.lng = res2;
				});
			this._storage.get('moonSign').then(res => {
			    console.log('moonSign', res);
				this.moonSign = res;
			});
			this._storage.get('birthStar').then(res => {
			    console.log('birthStar', res);
				this.birthStar = res;
			});
			this._storage.get('lang').then(res => {
			    console.log('lang', res);
				if(res) this.lang = res; else this.lang = 'en';
				//this.events.publish('dbfetch:lang', res);
				this.dsLang.next(this.lang);
			});
			this._storage.get('rahu').then(res => {
			    console.log('rahu', res);
				(res) ? this.rahu = res : this.rahu = false;
				//this.events.publish('dbfetch:rahu', res);
			});
			this._storage.get('rahus').then(res => {
			    console.log('rahus', res);
				(res) ? this.rahus = res : this.rahus = false;
				//this.events.publish('dbfetch:rahus', res);
			});
			this._storage.get('rahut1').then(res => {
			    console.log('rahut1', res);
				(res) ? this.rahut1 = res : this.rahut1 = false;
				//this.events.publish('dbfetch:rahut1', res);
			});
			this._storage.get('rahut2').then(res => {
			    console.log('rahut2', res);
				(res) ? this.rahut2 = res : this.rahut2 = false;
				//this.events.publish('dbfetch:rahut2', res);
			});
			this._storage.get('rahut3').then(res => {
			    console.log('rahut3', res);
				(res) ? this.rahut3 = res : this.rahut3 = false;
				//this.events.publish('dbfetch:rahut3', res);
			});
			this._storage.get('sunrise').then(res => {
			    console.log('sunrise', res);
				(res) ? this.sunrise = res : this.sunrise = false;
				//this.events.publish('dbfetch:sunrise', res);
			});
			this._storage.get('sunset').then(res => {
			    console.log('sunset', res);
				(res) ? this.sunset = res : this.sunset = false;
				//this.events.publish('dbfetch:sunset', res);
			});
			this._storage.get('prasdt').then(res => {
				console.log('prasdt', res);
				this.prasdt = res;
			});
			this._storage.get('prasnas').then(res => {
				console.log('prasnas', res);
				this.prasnas = res;
			});
			this._storage.get('aynm').then(res => {
				console.log('aynm', res);
				this.aynm = res;
			});
			this._storage.get('kaynm').then(res => {
				console.log('kaynm', res);
				this.kaynm = res;
			});
			this._storage.get('raynm').then(res => {
				console.log('raynm', res);
				this.raynm = res;
			});
			this._storage.get('chtyp').then(res => {
				console.log('chtyp', res);
				this.chtyp = res;
			});
			//this._storage.get('plan').then(res => {
				//console.log('plan', res);
				//this.plan = res;
			//});
		});			
    }
    setMoonSign(moonSign) {
		this.moonSign = moonSign;
		this._storage.set('moonSign', moonSign);
	}
	setBirthStar(birthStar) {
	   this.birthStar = birthStar;
	   this._storage.set('birthStar', birthStar);
	}
    setPersonDetails(place,dob) {
        this.place = place;   
        this.dob = dob;
		this._storage.set('place', place);
		this._storage.set('dob', dob);
    }
	setLAT(lat) {
	  this.lat = lat;
		this._storage.set('lat', lat);
	}
	setCLAT(lat) {
	  this.clat = lat;
	}
	setLNG(lng) {
	  this.lng = lng;
		this._storage.set('lng', lng);
	}
	setCLNG(lng) {
	  this.clng = lng;
	}	
	setTimezone(timezone) {
	  this.timezone = timezone;
	  this._storage.set('timezone', timezone);
	}
	setCTimezone(timezone) {
	  this.ctimezone = timezone;
	}	
	setPLPOS(plpos) {
	 this.plpos = plpos;
	}
	setYOGAS(yogas) {
	 this.yogas = yogas;
	}
	setPREDS(preds) {
	  this.preds = preds;
	}
	setHPOS(hpos) {
	 this.hpos = hpos;
	}
	setLANG(lang) {
	 this.lang = lang;
    console.log('setLANG()', lang);
	this._storage.set('lang', lang);
	this.dsLang.next(lang);
	}
	setRAHU(rahu) {
		this.rahu = rahu;
		this._storage.set('rahu', rahu);
	}
	setRAHUS(rahus) {
		this.rahus = rahus;
		this._storage.set('rahus', rahus);
	}
	setSUNR(sunrise) {
		this.sunrise = sunrise;
		this._storage.set('sunrise', sunrise);
	}
	setSUNS(sunset) {
		this.sunset = sunset;
		this._storage.set('sunset', sunset);
	}
	setRAHUT1(rahut1){
		this.rahut1 = rahut1;
		this._storage.set('rahut1', rahut1);
	}
	setRAHUT2(rahut2){
		this.rahut2 = rahut2;
		this._storage.set('rahut2', rahut2);
	}
	setRAHUT3(rahut3){
		this.rahut3 = rahut3;
		this._storage.set('rahut3', rahut3);
	}
	setPRASDT(prasdt) {
	   this.prasdt = prasdt;
	   this._storage.set('prasdt', prasdt);
	}
	setPRASNAS(prasnas) {
	   this.prasnas = prasnas;
	   this._storage.set('prasnas', prasnas);
	}
	setCHTYP(chtyp) {
		this.chtyp = chtyp;
	   this._storage.set('chtyp', chtyp);
	}
	setAYNM(aynm) {
		this.aynm = aynm;
	   this._storage.set('aynm', aynm);
	}
	setKAYNM(aynm) {
		this.kaynm = aynm;
	   this._storage.set('kaynm', aynm);
	}
	setRAYNM(aynm) {
		this.raynm = aynm;
	   this._storage.set('raynm', aynm);
	}
	setPLAN(pln) {
	  this.dsPlan.next(pln);
	}
	addVIM(per, mdas, adas, pdas) {
	  let vimDas: VimDasha = {
		mdas: mdas,
		adas: adas,
		pdas: pdas
	  };
	  this.oVim[per] = vimDas;
	}
	setCCODE(ccode) {
	  this.ccode = ccode;
	}
	setRETRO(rpls) {
	  this.rpls = rpls;
	}
    getMoonSign() {
		return this.moonSign;
	}
	getBirthStar(){
	    return this.birthStar;
	}
	getPLPOS() {
	  return this.plpos;
	}
	getYOGAS() {
	  return this.yogas;
	}
	getPREDS() {
	  return this.preds;
	}
	getHPOS() {
	  return this.hpos;
	}
    getPlace() {
        return this.place;
    }  
    getDOB() {
        return this.dob;
    }  
    getTimezone() {
        return this.timezone;
    }
	getCTimezone() {
        return this.ctimezone;
    } 	
    getLAT() {
        return this.lat;
    }  
	getCLAT() {
        return this.clat;
    } 
    getLNG() {
        return this.lng;
    }
	getCLNG() {
        return this.clng;
    }
	getVIM() {
		return this.oVim;
	}
	getLANG() {
		return this.lang;
	}
	getRAHU() {
		return this.rahu;
	}
	getRAHUS() {
		return this.rahus;
	}
	getSUNR() {
		return this.sunrise;
	}
	getSUNS() {
		return this.sunset;
	}
	getRAHUT1() {
		return this.rahut1;
	}
	getRAHUT2() {
		return this.rahut2;
	}
	getRAHUT3() {
		return this.rahut3;
	}
	setYogAd(show) {
	  this.yogad = show;
	}
	getYogAd() {
	  return this.yogad;
	}
	getPRASDT() {
	  return this.prasdt;
	}
	getPRASNAS() {
	   return this.prasnas;
	}
	getCHTYP() {
		return this.chtyp;
	}
	getAYNM() {
		return this.aynm;
	}
	getKAYNM() {
		return this.kaynm;
	}
	getRAYNM() {
		return this.raynm;
	}
	getCCODE() {
		return this.ccode;
	}
	getRETRO() {
		return this.rpls;
	}
}	

