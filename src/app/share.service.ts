import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { VimDasha } from './vim-das';

@Injectable()
export class ShareService {
     
    place: string;
	dob: string;
	timezone: string;
	lat: string;
	lng: string;
	tz: string;
    plpos: any;
    yogas: any;
	hpos: any;
	moonSign: string;
	birthStar: string;
	oVim :VimDasha[] = [];
	lang: string;
    constructor(private _storage: Storage) {
        this._storage.get('place').then(res => {
			this.place = res;
		});
		this._storage.get('dob').then(res => {
			this.dob = res;
		});
		this._storage.get('timezone').then(res => {
			this.timezone = res;
		});;
		this._storage.get('lat').then(res => {
			this.lat = res;
		});
		this._storage.get('lng').then(res => {
			this.lng = res;
		});
		this._storage.get('moonSign').then(res => {
			this.moonSign = res;
		});
		this._storage.get('birthStar').then(res => {
			this.birthStar = res;
		});
		this._storage.get('lang').then(res => {
			this.lang = (res == null) ? 'en' : res;
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
	setLNG(lng) {
	  this.lng = lng;
		this._storage.set('lng', lng);
	}
	setTimezone(timezone) {
	  this.timezone = timezone;
	  this._storage.set('timezone', timezone);
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
		this._storage.set('lang', lang);
	}
	addVIM(per, mdas, adas, pdas) {
	  let vimDas: VimDasha = {
		mdas: mdas,
		adas: adas,
		pdas: pdas
	  };
	  this.oVim[per] = vimDas;
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
    getLNG() {
        return this.lng;
    }
	getVIM() {
		return this.oVim;
	}
	getLANG() {
		return this.lang;
	}
}