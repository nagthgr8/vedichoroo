import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';
import { VimDasha } from './vim-das';

@Injectable()
export class ShareService {
     
    place: string;
	dob: string;
	timezone: string;
	localTZ: string;
	ltzo: any;
	lat: string;
	lng: string;
	curlat: any;
	curlng: any;
	tz: string;
    plpos: any;
    yogas: any;
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
	tstamp: number = 0;
    constructor(private _storage: Storage, public events: Events) {
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
			});;
			this._storage.get('lat').then(res => {
			    console.log('lat', res);
				this.lat = res;
			});
			this._storage.get('lng').then(res => {
			    console.log('lng', res);
				this.lng = res;
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
				this.events.publish('dbfetch:lang', res);
			});
			this._storage.get('rahu').then(res => {
			    console.log('rahu', res);
				(res) ? this.rahu = res : this.rahu = false;
				this.events.publish('dbfetch:rahu', res);
			});
			this._storage.get('rahus').then(res => {
			    console.log('rahus', res);
				(res) ? this.rahus = res : this.rahus = false;
				this.events.publish('dbfetch:rahus', res);
			});
			this._storage.get('rahut1').then(res => {
			    console.log('rahut1', res);
				(res) ? this.rahut1 = res : this.rahut1 = false;
				this.events.publish('dbfetch:rahut1', res);
			});
			this._storage.get('rahut2').then(res => {
			    console.log('rahut2', res);
				(res) ? this.rahut2 = res : this.rahut2 = false;
				this.events.publish('dbfetch:rahut2', res);
			});
			this._storage.get('rahut3').then(res => {
			    console.log('rahut3', res);
				(res) ? this.rahut3 = res : this.rahut3 = false;
				this.events.publish('dbfetch:rahut3', res);
			});
			this._storage.get('sunrise').then(res => {
			    console.log('sunrise', res);
				(res) ? this.sunrise = res : this.sunrise = false;
				this.events.publish('dbfetch:sunrise', res);
			});
			this._storage.get('sunset').then(res => {
			    console.log('sunset', res);
				(res) ? this.sunset = res : this.sunset = false;
				this.events.publish('dbfetch:sunset', res);
			});
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
		this.curlat = lat;
	}
	setLNG(lng) {
	  this.lng = lng;
		this._storage.set('lng', lng);
	}
	setCLNG(lng) {
	  this.curlng = lng;
	}
	setTimezone(timezone) {
	  this.timezone = timezone;
	  this._storage.set('timezone', timezone);
	}
	setLocalTZ(timezone) {
	  this.localTZ = timezone;
	}
	setLTZO(ltzo) {
	  this.ltzo = ltzo;
	}
	setPLPOS(plpos) {
	 this.plpos = plpos;
	}
	setYOGAS(yogas) {
	 this.yogas = yogas;
	}
	setHPOS(hpos) {
	 this.hpos = hpos;
	}
	setLANG(lang) {
	 this.lang = lang;
	  this._storage.ready().then(() => {
	    console.log('setLANG()', lang);
		this._storage.set('lang', lang);
      });		
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
	addVIM(per, mdas, adas, pdas) {
	  let vimDas: VimDasha = {
		mdas: mdas,
		adas: adas,
		pdas: pdas
	  };
	  this.oVim[per] = vimDas;
	}
	setTSTMP(tstamp) {
		this.tstamp = tstamp;
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
    getLAT() {
        return this.lat;
    }  
	getCLAT() {
		return this.curlat;
	}
    getLNG() {
        return this.lng;
    }
	getCLNG() {
		return this.curlng;
	}
	getVIM() {
		return this.oVim;
	}
	getLANG() {
		return this.lang;
	}
	getLocalTZ() {
		return this.localTZ;
	}
	getLTZO() {
		return this.ltzo;
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
	getTSTMP() {
		return this.tstamp;
	}
}