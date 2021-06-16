import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Storage } from '@ionic/storage';
import { VimDasha } from './vim-das';
import {PlanetPos } from './planet-pos';
import {HousePos} from './house-pos';
import {Dasha} from './dasha';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
    private dsPlan = new BehaviorSubject({ uuid: '', name: '', credits: 0, dobs: '' });
	plan = this.dsPlan.asObservable();
    private dsLang = new BehaviorSubject('');
	langc = this.dsLang.asObservable();
    private dsRep = new BehaviorSubject({ uuid: '', qta: 0 });
	frep = this.dsRep.asObservable();
    private dsAdv = new BehaviorSubject(0);
	adv = this.dsAdv.asObservable();
    private dsPred = new BehaviorSubject('');
	pred = this.dsPred.asObservable();
    place: string;
	dob: string;
	timezone: string;
	lat: string;
	lng: string;
	ctimezone: string;
	clat: string;
	clng: string;
	tz: string;
    //plpos: any;
    //yogas: any;
	preds: any;
	//hpos: any;
	moonSign: string = '';
	moonSignDeg: string = '';
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
	plstr: string;
    rew: boolean = false;
	reps: string;
	adc: number = 0;
	ppos: any;
	hpos: any;
	vims: any;
	sdb: any;
	akv: any;
	localtz: string = '';
	localdst: number = 0;
  private monthList = [
	{name: "January",   numdays: 31, abbr: "Jan"},
	{name: "February",  numdays: 28, abbr: "Feb"},
	{name: "March",     numdays: 31, abbr: "Mar"},
	{name: "April",     numdays: 30, abbr: "Apr"},
	{name: "May",       numdays: 31, abbr: "May"},
	{name: "June",      numdays: 30, abbr: "Jun"},
	{name: "July",      numdays: 31, abbr: "Jul"},
	{name: "August",    numdays: 31, abbr: "Aug"},
	{name: "September", numdays: 30, abbr: "Sep"},
	{name: "October",   numdays: 31, abbr: "Oct"},
	{name: "November",  numdays: 30, abbr: "Nov"},
	{name: "December",  numdays: 31, abbr: "Dec"},
];
    constructor(private _storage: Storage) { 
  	    this.yogad = false;
        this._storage.ready().then(() => {
		    console.log('storage is ready');
			this._storage.get('plan').then(res => {
				console.log('plan', res);
				if(res) { this.dsPlan.next(res); }
				else {this.dsPlan.next({ uuid: '', name: '', credits: 0, dobs: '' });}
			});
			this._storage.get('lang').then(res => {
			    console.log('lang', res);
				if(res) this.lang = res; else this.lang = 'en';
				//this.events.publish('dbfetch:lang', res);
				this.dsLang.next(this.lang);
			});
			this._storage.get('reps').then(res => {
				(res) ? this.reps = res : this.reps = '';
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
			this._storage.get('BSTR').then(res => {
				console.log('birthStar', res);
				if(res) this.birthStar = res;
			});
			this._storage.get('MSGN').then(res => {
				console.log('moonSign', res);
				if(res) this.moonSign = res;
			});
			this._storage.get('MSD').then(res => {
				console.log('moonSignDeg', res);
				if(res) this.moonSignDeg = res;
			});
		});			
	}
	getLocalTZ() {
		return this.localtz;
	}
	getLocalDST() {
		return this.localdst;
	}
	setLocalTZ(tz, dst) {
		this.localtz = tz;
		this.localdst = dst;
	}
    setMoonSign(moonSign) {
		this.moonSign = moonSign;
		this._storage.set('MSGN', moonSign);
	}
	setSunSign(sunSign) {
		this._storage.set('SSGN', sunSign);
	}
	setASCSign(ascSign) {
		this._storage.set('ASGN', ascSign);
	}
	setBirthStar(birthStar) {
	   this.birthStar = birthStar;
	  this._storage.set('BSTR', birthStar);
	}
    setPersonDetails(place,dob) {
        this.place = place;   
        this.dob = dob;
		//this._storage.set('place', place);
		//this._storage.set('dob', dob);
    }
	setLAT(lat) {
	  this.lat = lat;
		//this._storage.set('lat', lat);
	}
	setCLAT(lat) {
	  this.clat = lat;
	}
	setLNG(lng) {
	  this.lng = lng;
		//this._storage.set('lng', lng);
	}
	setCLNG(lng) {
	  this.clng = lng;
	}	
	setTimezone(timezone) {
	  this.timezone = timezone;
	  //this._storage.set('timezone', timezone);
	}
	setCTimezone(timezone) {
	  this.ctimezone = timezone;
	}	
	//setPLPOS(plpos) {
	// this.plpos = plpos;
	//}
	//setYOGAS(yogas) {
	 //this.yogas = yogas;
	//}
	setPREDS(preds) {
	  this.preds = preds;
	  this.dsPred.next(preds);
	}
	//setHPOS(hpos) {
	 //this.hpos = hpos;
	//}
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
	  this._storage.set('plan', pln);
	}
	setQUOTA(quo) {
	  this.dsRep.next(quo);
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
	setRETRO(dob, rpls) {
	  this.rpls = rpls;
	  this._storage.set('RETRO-'+dob, rpls);
	}
	setPLSTR(dob, plstr) {
	  this.plstr = plstr;
	  this._storage.set('PLSTR-'+dob, plstr);
	}
	setREP(rep) {
		this.reps += rep + '|';
		this._storage.set('reps', this.reps);
	}
	setADV(adv) {
		console.log('setADV', adv);
		if(adv) this.adc++; else this.adc--;
	}
	setSDB(dob, sdb) {
		this.sdb = sdb;
		this._storage.set('SDB-'+dob, sdb);
	}
	setAKV(dob, akv) {
		this.akv = akv;
		this._storage.set('AKV-'+dob, akv);
	}
	setCIMG(cimg) {
		this._storage.set('CIMG', cimg);
	}
	setCNME(cnme) {
		this._storage.set('CNME', cnme);
	}
	setCNUM(cnum) {
		this._storage.set('CNUM', cnum);
	}
	setCEML(ceml) {
		this._storage.set('CEML', ceml);
	}
	setRLNG(rlng) {
		this._storage.set('RLNG', rlng);
	}
	setRAYN(rayn) {
		this._storage.set('RAYN', rayn);
	}
	setRCHTYP(rchtyp) {
		this._storage.set('RCHTYP', rchtyp);
	}
	setVIMS(dob, vims) {
		this.vims = vims;
		this._storage.set('VIMS-'+dob, vims);
	}
	setYOGS(dob, yogs) {
		//this.yogs = vims;
		this._storage.set('YOGS-'+dob, yogs);
	}
	setPPOS(dob, ppos) {
		this.ppos = ppos;
		this._storage.set('PPOS-'+dob, ppos);
	}
	setKPPOS(dob, ppos) {
		this.ppos = ppos;
		this._storage.set('KPPOS-'+dob, ppos);
	}
	setHPOS(dob, hpos) {
		this.hpos = hpos;
		this._storage.set('HPOS-'+dob, hpos);
	}
	setMSGN(msgn) {
		this.moonSign = msgn;
		this._storage.set('MSGN', msgn);
	}
	setSSGN(ssgn) {
		this._storage.set('SSGN', ssgn);
	}
	setASGN(asgn) {
		this._storage.set('ASGN', asgn);
	}
	setPRED(pred) {
		this._storage.set('PRED', pred);
	}
	setDHORO(msgn, dhoro) {
		//this.dhoro = dhoro;
		this._storage.set('DHORO-'+msgn, dhoro);
	}
	setMSD(msd) {
		this.moonSignDeg = msd;
		this._storage.set('MSD', msd);
	}
	setDOHS(dob, dohs) {
		this._storage.set('DOHS-'+dob, dohs);
	}
	setDSTRNS(dob, md, ad, pd, trns) {
		this._storage.set('DSTRNS-'+dob+md+ad+pd, trns);
	}
	setSCR(bs, ms, trns) {
		this._storage.set('SCR-'+bs+ms, trns);
	}
	getDSTRNS(dob, md, ad, pd) {
		return this._storage.get('DSTRNS-'+dob+md+ad+pd).then(res => {
		  return res;
		});
	}
	getSCR(bs, ms) {
		return this._storage.get('SCR-'+bs+ms).then(res => {
		  return res;
		});
	}
	getMSD() {
		return this._storage.get('MSD').then(res => {
		  return res;
		});
	}
	getSDB(dob) {
		return this._storage.get('SDB-'+dob).then(res => {
		  return res;
		});
	}
	getAKV(dob) {
		return this._storage.get('AKV-'+dob).then(res => {
		  return res;
		});
	}
	getCIMG() {
		return this._storage.get('CIMG').then(res => {
		  return res;
		});
	}
	getCNME() {
		return this._storage.get('CNME').then(res => {
		  return res;
		});
	}
	getCNUM() {
		return this._storage.get('CNUM').then(res => {
		  return res;
		});
	}
	getCEML() {
		return this._storage.get('CEML').then(res => {
		  return res;
		});
	}
	getRLNG() {
		return this._storage.get('RLNG').then(res => {
		  return res;
		});
	}
	getRAYN() {
		return this._storage.get('RAYN').then(res => {
		  return res;
		});
	}
	getRCHTYP() {
		return this._storage.get('RCHTYP').then(res => {
		  return res;
		});
	}
	getVIMS(dob) {
		return this._storage.get('VIMS-'+dob).then(res => {
		  return res;
		});
	}
	getYOGS(dob) {
		return this._storage.get('YOGS-'+dob).then(res => {
		  return res;
		});
	}
	 getPPOS(dob)  {
		return this._storage.get('PPOS-'+dob).then(res => {
		  return res;
		});
	}
	 getKPPOS(dob)  {
		return this._storage.get('KPPOS-'+dob).then(res => {
		  return res;
		});
	}
	getHPOS(dob) {
		return this._storage.get('HPOS-'+dob).then(res => {
		return res;
		});
	}
	getMSGN() {
		return this._storage.get('MSGN').then(res => {
		return res;
		});
	}
	getSSGN() {
		return this._storage.get('SSGN').then(res => {
		return res;
		});
	}
	getASGN() {
		return this._storage.get('ASGN').then(res => {
		return res;
		});
	}
	getPRED() {
		return this._storage.get('PRED').then(res => {
		return res;
		});
	}
	getBSTR() {
		return this._storage.get('BSTR').then(res => {
		return res;
		});
	}
	getDHORO(msgn) {
		return this._storage.get('DHORO-'+msgn).then(res => {
		return res;
		});
	}
	getADV() {
		this.dsAdv.next(this.adc);
	}
	getDOHS(dob) {
		return this._storage.get('DOHS-'+dob).then(res => {
		  return res;
		});
	}
	remREP(rep) {
		let rps = this.reps.split('|');
		let urp: string = '';
		for(let i = 0; i < rps.length; i++) {
			if(rps[i] != rep) {
				urp += rps + '|';
			}
		}
		this.reps = urp;
		this._storage.set('reps', this.reps);
	}
	
	getREPS() {
		return this.reps;
	}
    getMoonSign() {
		return this.moonSign;
	}
	getBirthStar(){
	    return this.birthStar;
	}
//	getPLPOS() {
//	  return this.plpos;
//	}
	//getYOGAS() {
	  //return this.yogas;
	//}
	getPREDS() {
	  return this.preds;
	}
	//getHPOS() {
	//  return this.hpos;
	//}
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
	getRETRO(dob)  {
		return this._storage.get('RETRO-'+dob).then(res => {
		return res;
		});
	}
	getPLSTR(dob) {
		return this._storage.get('PLSTR-'+dob).then(res => {
		return res;
		});
	}
	setREWARD(rew) {
		this.rew = rew;
	}
	getREWARD() {
		return this.rew;
	}
	translate_func(lord: string)
	{
	  if(this.getLANG() == 'en') return lord;
	  let trn: string = lord;
		switch(lord.toLowerCase())
		{
			case 'sun':
			case 'su':
				if(this.getLANG() == 'te') {
					trn = 'సూర్యుడు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'रवि ग्रह';
				} else if(this.getLANG() == 'ta') { 
					trn = 'சூரியன்';
				}
				break;
			case 'moon':
			case 'mo':
				if(this.getLANG() == 'te') {
					trn = 'చంద్రుడు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'चांद ग्रह';
				} else if(this.getLANG() == 'ta') { 
					trn = 'சந்திரன்';
				}
				break;
			case 'jupiter':
			case 'ju':
				if(this.getLANG() == 'te') {
					trn = 'బృహస్పతి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'बृहस्पति';
				} else if(this.getLANG() == 'ta') { 
					trn = 'குரு';
				}
				break;
			case 'mercury':
			case 'me':
				if(this.getLANG() == 'te') {
					trn = 'బుధుడు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'बुध गृह';
				} else if(this.getLANG() == 'ta') { 
					trn = 'புதன்';
				}
				break;
			case 'mars':
			case 'ma':
				if(this.getLANG() == 'te') {
					trn = 'కుజుడు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'मंगल ग्रह';
				} else if(this.getLANG() == 'ta') { 
					trn = 'செவ்வாய்';
				}
				break;
			case 'venus':
			case 've':
				if(this.getLANG() == 'te') {
					trn = 'శుక్రుడు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'शुक्र ग्रह';
				} else if(this.getLANG() == 'ta') { 
					trn = 'சுக்கிரன்';
				}
				break;
			case 'saturn':
			case 'sa':
				if(this.getLANG() == 'te') {
					trn = 'శనిగ్రహము';
				} else if(this.getLANG() == 'hi') { 
					trn = 'शनि ग्रह';
				} else if(this.getLANG() == 'ta') { 
					trn = 'சனி';
				}
				break;
			case 'rahu':
			case 'ra':
				if(this.getLANG() == 'te') {
					trn = 'రాహు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'राहु ग्रह';
				} else if(this.getLANG() == 'ta') { 
					trn = 'ராகு';
				}
				break;
			case 'ketu':
			case 'ke':
				if(this.getLANG() == 'te') {
					trn = 'కేతు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'केतु ग्रह';
				} else if(this.getLANG() == 'ta') { 
					trn = 'கேது';
				}
				break;
			case 'asc':
			case'ac':
			case 'ascendant':
				if(this.getLANG() == 'te') {
					trn = 'లగ్నమ్';
				} else if(this.getLANG() == 'hi') { 
					trn = 'लग्न';
				} else if(this.getLANG() == 'ta') { 
					trn = 'லக்னத்தில்';
				}
				break;
			case 'aries':
				if(this.getLANG() == 'te') {
					trn = 'మేషరాశి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'मेष राशि';
				} else if(this.getLANG() == 'ta') { 
					trn = 'மேஷம்';
				}
				break;
			case 'taurus':
				if(this.getLANG() == 'te') {
					trn = 'వృషభరాశి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'वृषभ राशि';
				} else if(this.getLANG() == 'ta') { 
					trn = 'ரிஷபம்';
				}
				break;
			case 'gemini':
				if(this.getLANG() == 'te') {
					trn = 'మిధునరాశి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'मिथुन राशि';
				} else if(this.getLANG() == 'ta') {
					trn = 'மிதுனம்';
				}
				break;
			case 'cancer':
				if(this.getLANG() == 'te') {
					trn = 'కర్కాటకరాశి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'कर्क राशि';
				} else if(this.getLANG() == 'ta') { 
					trn = 'கடகம்';
				}
				break;
			case 'leo':
				if(this.getLANG() == 'te') {
					trn = 'సిమ్హరాశి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'सिंह राशि';
				} else if(this.getLANG() == 'ta') { 
					trn = 'சிம்மம்';
				}
				break;
			case 'virgo':
				if(this.getLANG() == 'te') {
					trn = 'కన్యరాశి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'कन्या राशि';
				} else if(this.getLANG() == 'ta') { 
					trn = 'கன்னி';
				}
				break;
			case 'libra':
				if(this.getLANG() == 'te') {
					trn = 'తులారాసి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'तुला राशि';
				} else if(this.getLANG() == 'ta') { 
					trn = 'துலாம்';
				}
				break;
			case 'scorpio':
				if(this.getLANG() == 'te') {
					trn = 'వృశ్చికరాసి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'वृश्चिक राशि';
				} else if(this.getLANG() == 'ta') { 
					trn = 'விருச்சிகம்';
				}
				break;
			case 'saggitarius':
				if(this.getLANG() == 'te') {
					trn = 'ధనుస్సురాసి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'धनु राशि';
				} else if(this.getLANG() == 'ta') { 
					trn = 'தனுசு';
				}
				break;
			case 'capricorn':
				if(this.getLANG() == 'te') {
					trn = 'మకరరాసి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'मकर राशि';
				} else if(this.getLANG() == 'ta') {
					trn = 'மகரம்';
				}
				break;
			case 'aquarius':
				if(this.getLANG() == 'te') {
					trn = 'కుంభరాసి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'कुंभ राशि';
				} else if(this.getLANG() == 'ta') { 
					trn = 'கும்பம்';
				}
				break;
			case 'pisces':
				if(this.getLANG() == 'te') {
					trn = 'మీనరాసి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'मीन राशि';
				} else if(this.getLANG() == 'ta') { 
					trn = 'மீனம்';
				}
				break;
			case 'ashwini':
				if(this.getLANG() == 'te') {
					trn = 'అశ్వినీ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'अश्विनी';
				} else if(this.getLANG() == 'ta') { 
					trn = 'அஸ்வினி';
				}
				break;
			case 'bharani':
				if(this.getLANG() == 'te') {
					trn = 'భరణి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'भरणी';
				} else if(this.getLANG() == 'ta') { 
					trn = 'பரணி';
				}
				break;
			case 'krittika':
				if(this.getLANG() == 'te') {
					trn = 'కృత్తికా';
				} else if(this.getLANG() == 'hi') { 
					trn = 'कृत्तिका';
				} else if(this.getLANG() == 'ta') { 
					trn = 'கிருத்திகை';
				}
				break;
			case 'rohini':
				if(this.getLANG() == 'te') {
					trn = 'రోహిణి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'रोहिणी';
				} else if(this.getLANG() == 'ta') { 
					trn = 'ரோகிணி';
				}
				break;
			case 'mrigashira':
				if(this.getLANG() == 'te') {
					trn = 'మ్రిగశిర';
				} else if(this.getLANG() == 'hi') { 
					trn = 'मृगशिरा';
				} else if(this.getLANG() == 'ta') { 
					trn = 'மிருகசிரீடம்';
				}
				break;
			case 'ardra':
				if(this.getLANG() == 'te') {
					trn = 'ఆర్ద్ర';
				} else if(this.getLANG() == 'hi') { 
					trn = 'आर्द्र';
				} else if(this.getLANG() == 'ta') { 
					trn = 'திருவாதிரை';
				}
				break;
			case 'punarvasu':
				if(this.getLANG() == 'te') {
					trn = 'పునర్వసు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'पुनर्वसु';
				} else if(this.getLANG() == 'ta') { 
					trn = 'புனர்பூசம்';
				}
				break;
			case 'pushya':
				if(this.getLANG() == 'te') {
					trn = 'పుష్య';
				} else if(this.getLANG() == 'hi') { 
					trn = 'पुष्य';
				} else if(this.getLANG() == 'ta') { 
					trn = 'பூசம்';
				}
				break;
			case 'ashlesha':
				if(this.getLANG() == 'te') {
					trn = 'ఆశ్లేష';
				} else if(this.getLANG() == 'hi') { 
					trn = 'अश्लेषा';
				} else if(this.getLANG() == 'ta') { 
					trn = 'ஆயில்யம்';
				}
				break;
			case 'magha':
				if(this.getLANG() == 'te') {
					trn = 'మఘ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'मघा';
				} else if(this.getLANG() == 'ta') { 
					trn = 'மகம்';
				}
				break;
			case 'purvaphalguni':
				if(this.getLANG() == 'te') {
					trn = 'పూర్వఫల్గుణి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'पूर्वाफाल्गुनी';
				} else if(this.getLANG() == 'ta') { 
					trn = 'பூரம்';
				}
				break;
			case 'uttaraaphalguni':
				if(this.getLANG() == 'te') {
					trn = 'ఉత్తరాఫల్గుణి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'उत्तराफाल्गुनी';
				} else if(this.getLANG() == 'ta') { 
					trn = 'உத்திரம்';
				}
				break;
			case 'hastha':
				if(this.getLANG() == 'te') {
					trn = 'హస్త';
				} else if(this.getLANG() == 'hi') { 
					trn = 'हस्ता';
				} else if(this.getLANG() == 'ta') { 
					trn = 'அஸ்தம்';
				}
				break;
			case 'chitra':
				if(this.getLANG() == 'te') {
					trn = 'చిత్ర';
				} else if(this.getLANG() == 'hi') { 
					trn = 'चित्र';
				} else if(this.getLANG() == 'ta') { 
					trn = 'சித்திரை';
				}
				break;
			case 'swati':
				if(this.getLANG() == 'te') {
					trn = 'స్వాతి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'स्वाति';
				} else if(this.getLANG() == 'ta') { 
					trn = 'ஸ்வாதி';
				}
				break;
			case 'vishakha':
				if(this.getLANG() == 'te') {
					trn = 'విశాఖ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'विशाखा';
				} else if(this.getLANG() == 'ta') { 
					trn = 'விசாகம்';
				}
				break;
			case 'anuradha':
				if(this.getLANG() == 'te') {
					trn = 'అనురాధ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'अनुराधा';
				} else if(this.getLANG() == 'ta') { 
					trn = 'அனுஷம்';
				}
				break;
			case 'jyestha':
				if(this.getLANG() == 'te') {
					trn = 'జ్యేష్ఠా';
				} else if(this.getLANG() == 'hi') { 
					trn = 'जयस्था';
				} else if(this.getLANG() == 'ta') { 
					trn = 'கேட்டை';
				}
				break;
			case 'mula':
				if(this.getLANG() == 'te') {
					trn = 'మూల';
				} else if(this.getLANG() == 'hi') { 
					trn = 'मूल';
				} else if(this.getLANG() == 'ta') { 
					trn = 'மூலம்';
				}
				break;
			case 'purvaashada':
				if(this.getLANG() == 'te') {
					trn = 'పూర్వాషాఢ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'पूर्वाषाढ़ा';
				} else if(this.getLANG() == 'hi') { 
					trn = 'பூராடம்';
				}
				break;
			case 'uttaraashada':
				if(this.getLANG() == 'te') {
					trn = 'ఉత్తరాషాఢ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'उत्तराषाढ़ा';
				} else if(this.getLANG() == 'ta') { 
					trn = 'உத்திராடம்';
				}
				break;
			case 'shravana':
				if(this.getLANG() == 'te') {
					trn = 'శ్రావణ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'श्रवण';
				} else if(this.getLANG() == 'ta') { 
					trn = 'திருவோணம்';
				}
				break;
			case 'danishta':
				if(this.getLANG() == 'te') {
					trn = 'ధనిష్ఠ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'धनिष्ठा';
				} else if(this.getLANG() == 'ta') { 
					trn = 'அவிட்டம்';
				}
				break;
			case 'shatabhisha':
				if(this.getLANG() == 'te') {
					trn = 'శతభిషా';
				} else if(this.getLANG() == 'hi') { 
					trn = 'शतभिषा';
				} else if(this.getLANG() == 'ta') { 
					trn = 'சதயம்';
				}
				break;
			case 'purvabhadra':
				if(this.getLANG() == 'te') {
					trn = 'పూర్వాభాద్ర';
				} else if(this.getLANG() == 'hi') { 
					trn = 'पूर्वभाद्र';
				} else if(this.getLANG() == 'ta') { 
					trn = 'பூரட்டாதி';
				}
				break;
			case 'uttarabhadra':
				if(this.getLANG() == 'te') {
					trn = 'ఉత్తరాభాద్ర';
				} else if(this.getLANG() == 'hi') { 
					trn = 'உத்திரட்டாதி';
				}
				break;
			case 'revati':
				if(this.getLANG() == 'te') {
					trn = 'రేవతి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'रेवती';
				} else if(this.getLANG() == 'ta') { 
					trn = 'ரேவதி';
				}
				break;
			default:
				trn = lord;
				break;
		}
		return trn;
	}
	dmsToDec(d, m, s)
    {
       let v: number = d + (m /60) + (s /3600);
       return Number(v.toFixed(2));
    }
    //calc sunrise & sunset
  calcSunDeclination(t)
  {
    var e = this.calcObliquityCorrection(t);
    var lambda = this.calcSunApparentLong(t);

    var sint = Math.sin(this.degToRad(e)) * Math.sin(this.degToRad(lambda));
    var theta = this.radToDeg(Math.asin(sint));
    return theta;		// in degrees
  }
  calcSunApparentLong(t)
  {
    var o = this.calcSunTrueLong(t);
    var omega = 125.04 - 1934.136 * t;
    var lambda = o - 0.00569 - 0.00478 * Math.sin(this.degToRad(omega));
    return lambda;		// in degrees
  }
  calcSunTrueLong(t)
  {
    var l0 = this.calcGeomMeanLongSun(t);
    var c = this.calcSunEqOfCenter(t);
    var O = l0 + c;
    return O;		// in degrees
  }
  calcSunEqOfCenter(t)
  {
    var m = this.calcGeomMeanAnomalySun(t);
    var mrad = this.degToRad(m);
    var sinm = Math.sin(mrad);
    var sin2m = Math.sin(mrad+mrad);
    var sin3m = Math.sin(mrad+mrad+mrad);
    var C = sinm * (1.914602 - t * (0.004817 + 0.000014 * t)) + sin2m * (0.019993 - 0.000101 * t) + sin3m * 0.000289;
    return C;		// in degrees
  }
  calcSunriseSetUTC( rise,  JD,  latitude,  longitude)
  {
    var t = this.calcTimeJulianCent(JD);
    var eqTime = this.calcEquationOfTime(t);
    var solarDec = this.calcSunDeclination(t);
    var hourAngle = this.calcHourAngleSunrise(latitude, solarDec);
    //alert("HA = " + radToDeg(hourAngle));
    if (!rise) hourAngle = -hourAngle;
    var delta = longitude + this.radToDeg(hourAngle);
    var timeUTC = 720 - (4.0 * delta) - eqTime;	// in minutes
    return timeUTC;
  }
  calcHourAngleSunrise( lat, solarDec)
  {
    var latRad = this.degToRad(lat);
    var sdRad  = this.degToRad(solarDec);
    var HAarg = (Math.cos(this.degToRad(90.833))/(Math.cos(latRad)*Math.cos(sdRad))-Math.tan(latRad) * Math.tan(sdRad));
    var HA = Math.acos(HAarg);
    return HA;		// in radians (for sunset, use -HA)
  }
  calcSunriseSet( rise,  JD,  latitude,  longitude,  timezone,  dst)
// rise = 1 for sunrise, 0 for sunset
  {
    //var id = ((rise) ? "risebox" : "setbox")
    var timeUTC = this.calcSunriseSetUTC(rise, JD, latitude, longitude);
    var newTimeUTC = this.calcSunriseSetUTC(rise, JD + timeUTC/1440.0, latitude, longitude);
    var srise = "";
    if (this.isNumber(newTimeUTC)) {
      var timeLocal = newTimeUTC + (timezone * 60.0);
      timeLocal += ((dst) ? 60.0 : 0.0);
      if ( (timeLocal >= 0.0) && (timeLocal < 1440.0) ) {
        srise = this.timeString(timeLocal,2);
      } else  {
        var jday = JD;
        var increment = ((timeLocal < 0) ? 1 : -1);
        while ((timeLocal < 0.0)||(timeLocal >= 1440.0)) {
          timeLocal += increment * 1440.0;
          jday -= increment;
        }
        console.log("VedicHoroo", "calcSunriseSet:jday ", jday );
        srise = this.timeDateString(jday,timeLocal);
      }
    } else { // no sunrise/set found
      srise = "not found";
    }
    return srise;
  }
  timeDateString( JD,  minutes)
  {
    var output = this.timeString(minutes, 2) + " " + this.dayString(JD, false, 2);
    return output;
  }

   timeString( minutes,  flag)
// timeString returns a zero-padded string (HH:MM:SS) given time in minutes
// flag=2 for HH:MM, 3 for HH:MM:SS
  {
    var output = "";
    if ( (minutes >= 0) && (minutes < 1440) ) {
      var floatHour = minutes / 60.0;
      var hour = Math.floor(floatHour);
      var floatMinute = 60.0 * (floatHour - Math.floor(floatHour));
      var minute = Math.floor(floatMinute);
      var floatSec = 60.0 * (floatMinute - Math.floor(floatMinute));
      var second = Math.floor(floatSec + 0.5);
      if (second > 59) {
        second = 0;
        minute += 1;
      }
      if ((flag == 2) && (second >= 30)) minute++;
      if (minute > 59) {
        minute = 0;
        hour += 1;
      }
      output = this.zeroPad(hour,2) + ":" + this.zeroPad(minute,2);
      if (flag > 2) output = output + ":" + this.zeroPad(second,2);
    } else {
      output = "time error";
    }
    return output;
  }
  zeroPad( n,  digits) {
    var n1 = n;
    while (n1.length < digits) {
      n1 = '0' + n1;
    }
    return n1;
  }
  isNumber( inputVal)
  {
    var oneDecimal = false;
    var inputStr = "" + inputVal;
    for (var i = 0; i < inputStr.length; i++)
    {
      var oneChar = inputStr.charAt(i);
      if (i == 0 && (oneChar == '-' || oneChar == '+'))
      {
        continue;
      }
      if (oneChar == '.' && !oneDecimal)
      {
        oneDecimal = true;
        continue;
      }
      if (oneChar < '0' || oneChar > '9')
      {
        return false;
      }
    }
    return true;
  }
   calcTimeJulianCent( jd)
  {
    var T = (jd - 2451545.0)/36525.0;
    return T;
  }
  calcSunTrueAnomaly( t)
  {
    var m = this.calcGeomMeanAnomalySun(t);
    var c = this.calcSunEqOfCenter(t);
    var v = m + c;
    return v;		// in degrees
  }
   calcSunRadVector( t)
  {
    var v = this.calcSunTrueAnomaly(t);
    var e = this.calcEccentricityEarthOrbit(t);
    var R = (1.000001018 * (1 - e * e)) / (1 + e * Math.cos(this.degToRad(v)));
    return R;		// in AUs
  }

   calcEquationOfTime( t)
  {
    var epsilon = this.calcObliquityCorrection(t);
    var l0 = this.calcGeomMeanLongSun(t);
    var e = this.calcEccentricityEarthOrbit(t);
    var m = this.calcGeomMeanAnomalySun(t);

    var y = Math.tan(this.degToRad(epsilon)/2.0);
    y *= y;

    var sin2l0 = Math.sin(2.0 * this.degToRad(l0));
    var sinm   = Math.sin(this.degToRad(m));
    var cos2l0 = Math.cos(2.0 * this.degToRad(l0));
    var sin4l0 = Math.sin(4.0 * this.degToRad(l0));
    var sin2m  = Math.sin(2.0 * this.degToRad(m));

    var Etime = y * sin2l0 - 2.0 * e * sinm + 4.0 * e * y * sinm * cos2l0 - 0.5 * y * y * sin4l0 - 1.25 * e * e * sin2m;
    return this.radToDeg(Etime)*4.0;	// in minutes of time
  }
   calcMeanObliquityOfEcliptic( t)
  {
    var seconds = 21.448 - t*(46.8150 + t*(0.00059 - t*(0.001813)));
    var e0 = 23.0 + (26.0 + (seconds/60.0))/60.0;
    return e0;		// in degrees
  }

   calcObliquityCorrection( t)
  {
    var e0 = this.calcMeanObliquityOfEcliptic(t);
    var omega = 125.04 - 1934.136 * t;
    var e = e0 + 0.00256 * Math.cos(this.degToRad(omega));
    return e;		// in degrees
  }
   calcGeomMeanLongSun( t)
  {
    var L0 = 280.46646 + t * (36000.76983 + t*(0.0003032));
    while(L0 > 360.0)
    {
      L0 -= 360.0;
    }
    while(L0 < 0.0)
    {
      L0 += 360.0;
    }
    return L0;		// in degrees
  }
   calcEccentricityEarthOrbit( t)
  {
    var e = 0.016708634 - t * (0.000042037 + 0.0000001267 * t);
    return e;		// unitless
  }
   calcGeomMeanAnomalySun( t)
  {
    var M = 357.52911 + t * (35999.05029 - 0.0001537 * t);
    return M;		// in degrees
  }
   radToDeg( angleRad)
  {
    return (180.0 * angleRad / Math.PI);
  }
   isLeapYear( yr)
  {
    return ((yr % 4 == 0 && yr % 100 != 0) || yr % 400 == 0);
  }

   dayString( jd,  next,  flag)
  {
    var output = "JD error";
      var A;
// returns a string in the form DDMMMYYYY[ next] to display prev/next rise/set
// flag=2 for DD MMM, 3 for DD MM YYYY, 4 for DDMMYYYY next/prev

      if ((jd < 900000) || (jd > 2817000)) {
        output = "Julian Day cannot be < 900000 or > 2817000";
      } else {
        var z = Math.floor(jd + 0.5);
        var f = (jd + 0.5) - z;
        if (z < 2299161) {
          A = z;
        } else {
          var alpha = Math.floor((z - 1867216.25) / 36524.25);
          A = z + 1 + alpha - Math.floor(alpha / 4);
        }
        var B = A + 1524;
        var C = Math.floor((B - 122.1) / 365.25);
        var D = Math.floor(365.25 * C);
        var E = Math.floor((B - D) / 30.6001);
        var day = B - D - Math.floor(30.6001 * E) + f;
        var month = (E < 14) ? E - 1 : E - 13;
        var year = ((month > 2) ? C - 4716 : C - 4715);
        if (flag == 2)
          output = this.zeroPad(day, 2) + " " + this.monthList[Math.round(month - 1)].abbr;
        if (flag == 3)
          output = this.zeroPad(day, 2) + this.monthList[Math.round(month - 1)].abbr + year.toString();
        if (flag == 4)
          output = this.zeroPad(day, 2) + this.monthList[Math.round(month - 1)].abbr + year.toString() + ((next) ? " next" : " prev");
      }
    return output;
  }
   degToRad( angleDeg)
  {
    return (Math.PI * angleDeg / 180.0);
  }
   getJD( day,  mon,  yer)
  {
    var JD = -1;
    var docmonth = mon;
    var docday =   day;
    var docyear =  yer;
      if ((this.isLeapYear(docyear)) && (docmonth == 2)) {
        if (docday > 29) {
          docday = 29;
        }
      } else {
        if (docday > this.monthList[Math.round(docmonth - 1)].numdays) {
          docday = this.monthList[Math.round(docmonth - 1)].numdays;
        }
      }
      if (docmonth <= 2) {
        docyear -= 1;
        docmonth += 12;
      }
      var A = Math.floor(docyear / 100);
      var B = 2 - A + Math.floor(A / 4);

      var jdbl = Math.floor(365.25 * (docyear + 4716)) + Math.floor(30.6001 * (docmonth + 1)) + docday + B - 1524.5;
      JD = Math.floor(jdbl);
    return JD;
  }
	
}
