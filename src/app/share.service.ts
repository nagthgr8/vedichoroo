import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { HoroscopeService } from './horoscope.service';
import { VimDasha } from './vim-das';
import {PlanetPos } from './planet-pos';
import {HousePos} from './house-pos';
import {Dasha} from './dasha';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
   // private dsStor = new Subject();
	//stor = this.dsStor.asObservable();
    private dsPlan = new BehaviorSubject({ uuid: '', name: '', credits: 0, dobs: '', rating: 0 });
	plan = this.dsPlan.asObservable();
    private dsLang = new BehaviorSubject('en');
	langc = this.dsLang.asObservable();
    private dsRep = new BehaviorSubject({ uuid: '', qta: 0 });
	frep = this.dsRep.asObservable();
    private dsAdv = new BehaviorSubject(0);
	adv = this.dsAdv.asObservable();
    private dsPred = new Subject();
	pred = this.dsPred.asObservable();
    private dsProf = new Subject();
	prof = this.dsProf.asObservable();
	private dsAstro = new Subject();
	astro = this.dsAstro.asObservable();
    place: string;
	dob: string;
	pdob: string = '';
	timezone: string;
	lat: string;
	lng: string;
	ctimezone: string;
	clat: number;
	clng: number;
	tz: string;
    //plpos: any;
    //yogas: any;
	//preds: any;
	//hpos: any;
	moonSign: string = '';
	moonSignDeg: string = '';
	birthStar: string;
	oVim :VimDasha[] = [];
	lang: string = 'en';
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
	token: string = '';
	issubr: boolean = false;
	plnm: string = '';
	asts: any[] = [];
	bAST: boolean = false;
	peerid: string = '';
	uid: string = '';
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
    constructor(private platform: Platform, private _storage: NativeStorage) { 
  	    this.yogad = false;
        this.platform.ready().then(() => {
			//this.dsStor.next(1);
		    console.log('storage is ready');
			//this._storage.getItem('plan').then(res => {
			//	console.log('plan', res);
			//	if(res) { this.dsPlan.next(res); }
		//		else {this.dsPlan.next({ uuid: '', name: '', credits: 0, dobs: '' });}
		//	});
			this._storage.getItem('lang').then(res => {
			    console.log('lang', res);
				if(res) this.lang = res; else this.lang = 'en';
				//this.events.publish('dbfetch:lang', res);
				this.dsLang.next(this.lang);
			})
			.catch(e => {
				 this.lang = 'en';
				this.dsLang.next(this.lang);
			});
			this._storage.getItem('reps').then(res => {
				(res) ? this.reps = res : this.reps = '';
			})
			.catch(e => {
			});
			this._storage.getItem('rahu').then(res => {
			    console.log('rahu', res);
				(res) ? this.rahu = res : this.rahu = false;
				//this.events.publish('dbfetch:rahu', res);
			})
			.catch(e => {
			});
			this._storage.getItem('rahus').then(res => {
			    console.log('rahus', res);
				(res) ? this.rahus = res : this.rahus = false;
				//this.events.publish('dbfetch:rahus', res);
			})
			.catch(e => {
			});
			this._storage.getItem('rahut1').then(res => {
			    console.log('rahut1', res);
				(res) ? this.rahut1 = res : this.rahut1 = false;
				//this.events.publish('dbfetch:rahut1', res);
			})
			.catch(e => {
			});
			this._storage.getItem('rahut2').then(res => {
			    console.log('rahut2', res);
				(res) ? this.rahut2 = res : this.rahut2 = false;
				//this.events.publish('dbfetch:rahut2', res);
			})
			.catch(e => {
			});
			this._storage.getItem('rahut3').then(res => {
			    console.log('rahut3', res);
				(res) ? this.rahut3 = res : this.rahut3 = false;
				//this.events.publish('dbfetch:rahut3', res);
			})
			.catch(e => {
			});
			this._storage.getItem('sunrise').then(res => {
			    console.log('sunrise', res);
				(res) ? this.sunrise = res : this.sunrise = false;
				//this.events.publish('dbfetch:sunrise', res);
			})
			.catch(e => {
			});
			this._storage.getItem('sunset').then(res => {
			    console.log('sunset', res);
				(res) ? this.sunset = res : this.sunset = false;
				//this.events.publish('dbfetch:sunset', res);
			})
			.catch(e => {
			});
			this._storage.getItem('prasdt').then(res => {
				console.log('prasdt', res);
				this.prasdt = res;
			})
			.catch(e => {
			});
			this._storage.getItem('prasnas').then(res => {
				console.log('prasnas', res);
				this.prasnas = res;
			})
			.catch(e => {
			});
			this._storage.getItem('aynm').then(res => {
				console.log('aynm', res);
				this.aynm = res;
			})
			.catch(e => {
			});
			this._storage.getItem('kaynm').then(res => {
				console.log('kaynm', res);
				this.kaynm = res;
			})
			.catch(e => {
			});
			this._storage.getItem('raynm').then(res => {
				console.log('raynm', res);
				this.raynm = res;
			})
			.catch(e => {
			});
			this._storage.getItem('chtyp').then(res => {
				console.log('chtyp', res);
				this.chtyp = res;
			})
			.catch(e => {
			});
			this._storage.getItem('BSTR').then(res => {
				console.log('birthStar', res);
				if(res) this.birthStar = res;
			})
			.catch(e => {
			});
			this._storage.getItem('MSGN').then(res => {
				console.log('moonSign', res);
				if(res) this.moonSign = res;
			})
			.catch(e => {
			});
			this._storage.getItem('MSD').then(res => {
				console.log('moonSignDeg', res);
				if(res) this.moonSignDeg = res;
			})
			.catch(e => {
			});
		});			
	}
	setUID(uid) { this.uid = uid; }
	getUID() { return this.uid; }
	complete() {
		this.dsPred.next(true);
		this.dsPred.complete();
		this.dsPlan.complete();
		this.dsLang.complete();
		this.dsRep.complete();
		this.dsAdv.complete();
		this.dsProf.complete();
		this.dsAstro.complete()
	}
	isSubscr() {
		return this.issubr;
	}
	getToken() {
		return this.token;
	}
	setToken(tok) {
		this.token = tok;
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
		this._storage.setItem('MSGN', moonSign);
	}
	setSunSign(sunSign) {
		this._storage.setItem('SSGN', sunSign);
	}
	setASCSign(ascSign) {
		this._storage.setItem('ASGN', ascSign);
	}
	setBirthStar(birthStar) {
	   this.birthStar = birthStar;
	  this._storage.setItem('BSTR', birthStar);
	}
	setPDOB(dob) {
		this.pdob = dob;
	}
	getPDOB() {
		return this.pdob;
	}
    setPersonDetails(place,dob) {
        this.place = place;   
        this.dob = dob;
		//this._storage.setItem('place', place);
		//this._storage.setItem('dob', dob);
    }
	setLAT(lat) {
	  this.lat = lat;
		//this._storage.setItem('lat', lat);
	}
	setCLAT(lat) {
	  this.clat = lat;
	}
	setLNG(lng) {
	  this.lng = lng;
		//this._storage.setItem('lng', lng);
	}
	setCLNG(lng) {
	  this.clng = lng;
	}	
	setTimezone(timezone) {
	  this.timezone = timezone;
	  //this._storage.setItem('timezone', timezone);
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
	sigPRED(pred) {
		this.dsPred.next(pred);
	}
	
	//setHPOS(hpos) {
	 //this.hpos = hpos;
	//}
	setLANG(lang) {
	 this.lang = lang;
    console.log('setLANG()', lang);
	this._storage.setItem('lang', lang);
	this.dsLang.next(lang);
	}
	setRAHU(rahu) {
		this.rahu = rahu;
		this._storage.setItem('rahu', rahu);
	}
	setRAHUS(rahus) {
		this.rahus = rahus;
		this._storage.setItem('rahus', rahus);
	}
	setSUNR(sunrise) {
		this.sunrise = sunrise;
		this._storage.setItem('sunrise', sunrise);
	}
	setSUNS(sunset) {
		this.sunset = sunset;
		this._storage.setItem('sunset', sunset);
	}
	setRAHUT1(rahut1){
		this.rahut1 = rahut1;
		this._storage.setItem('rahut1', rahut1);
	}
	setRAHUT2(rahut2){
		this.rahut2 = rahut2;
		this._storage.setItem('rahut2', rahut2);
	}
	setRAHUT3(rahut3){
		this.rahut3 = rahut3;
		this._storage.setItem('rahut3', rahut3);
	}
	setPRASDT(prasdt) {
	   this.prasdt = prasdt;
	   this._storage.setItem('prasdt', prasdt);
	}
	setPRASNAS(prasnas) {
	   this.prasnas = prasnas;
	   this._storage.setItem('prasnas', prasnas);
	}
	setCHTYP(chtyp) {
		this.chtyp = chtyp;
	   this._storage.setItem('chtyp', chtyp);
	}
	setAYNM(aynm) {
		this.aynm = aynm;
	   this._storage.setItem('aynm', aynm);
	}
	setKAYNM(aynm) {
		this.kaynm = aynm;
	   this._storage.setItem('kaynm', aynm);
	}
	setRAYNM(aynm) {
		this.raynm = aynm;
	   this._storage.setItem('raynm', aynm);
	}
	setPLAN(pln) {
	if(pln && pln.uuid != '') {
	  this.plnm = pln.name;
	  this.dsPlan.next(pln);
	  this._storage.setItem('PLAN', pln);
	  if(pln.name == 'com.mypubz.eportal.astrologer') {  
	    console.log('issubr', 'true');
		this.issubr = true;
	  }
	}
	}
	sigPLAN(pln) {
	  this.dsPlan.next(pln);
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
	  this._storage.setItem('RETRO-'+dob, rpls);
	}
	setPLSTR(dob, plstr) {
	  this.plstr = plstr;
	  this._storage.setItem('PLSTR-'+dob, plstr);
	}
	setREP(rep) {
		this.reps += rep + '|';
		this._storage.setItem('reps', this.reps);
	}
	setADV(adv) {
		console.log('setADV', adv);
		if(adv) this.adc++; else this.adc--;
	}
	setSDB(dob, sdb) {
		this.sdb = sdb;
		this._storage.setItem('SDB-'+dob, sdb);
	}
	setAKV(dob, akv) {
		this.akv = akv;
		this._storage.setItem('AKV-'+dob, akv);
	}
	setCIMG(cimg) {
		this._storage.setItem('CIMG', cimg);
	}
	setCNME(cnme) {
		this._storage.setItem('CNME', cnme);
	}
	setCNUM(cnum) {
		this._storage.setItem('CNUM', cnum);
	}
	setCEML(ceml) {
		this._storage.setItem('CEML', ceml);
	}
	setRLNG(rlng) {
		this._storage.setItem('RLNG', rlng);
	}
	setRAYN(rayn) {
		this._storage.setItem('RAYN', rayn);
	}
	setRCHTYP(rchtyp) {
		this._storage.setItem('RCHTYP', rchtyp);
	}
	setVIMS(dob, vims) {
		this.vims = vims;
		this._storage.setItem('VIMS-'+dob, vims);
		this.dsProf.next(vims);
	}
	setKVIMS(dob, vims) {
		//this.vims = vims;
		this._storage.setItem('KVIMS-'+dob, vims);
		this.dsProf.next(vims);
	}
	setYOGS(dob, yogs) {
		//this.yogs = vims;
		this._storage.setItem('YOGS-'+dob, yogs);
	}
	setPPOS(dob, ppos) {
		this.ppos = ppos;
		this._storage.setItem('PPOS-'+dob, ppos);
	}
	setKPPOS(dob, ppos) {
		this.ppos = ppos;
		this._storage.setItem('KPPOS-'+dob, ppos);
	}
	setHPOS(dob, hpos) {
		this.hpos = hpos;
		this._storage.setItem('HPOS-'+dob, hpos);
	}
	setMSGN(msgn) {
		this.moonSign = msgn;
		this._storage.setItem('MSGN', msgn);
	}
	setSSGN(ssgn) {
		this._storage.setItem('SSGN', ssgn);
	}
	setASGN(asgn) {
		this._storage.setItem('ASGN', asgn);
	}
	setPRED(pred) {
		this._storage.setItem('PRED', pred);
	}
	setDHORO(msgn, dhoro) {
		//this.dhoro = dhoro;
		this._storage.setItem('DHORO-'+msgn, dhoro);
	}
	setMSD(msd) {
		this.moonSignDeg = msd;
		this._storage.setItem('MSD', msd);
	}
	setDOHS(dob, dohs) {
		this._storage.setItem('DOHS-'+dob, dohs);
	}
	setDSTRNS(dob, md, ad, pd, ayn, trns) {
		this._storage.setItem('DSTRNS-'+dob+md+ad+pd+ayn.toString(), trns);
	}
	setSCR(bs, ms, trns) {
		this._storage.setItem('SCR-'+bs+ms, trns);
	}
	setSTATS(udys, lusd) {
		this._storage.setItem('STATS', udys.toString() + '|'+ lusd);
	}
	setCSTATS(s) {
		this._storage.setItem('CSTATS', s);
	}
	setPIMG(img) {
		this._storage.setItem('PIMG', img);
	}
	setUPRO(upro) {
		this._storage.setItem('UPRO', upro);
	}
	setPeerId(peerid) {
		this.peerid = peerid;
	}
	getPeerId() {
		return this.peerid;
	}
	getUPRO() {
		return this._storage.getItem('UPRO').then(res => {
		  return res;
		});
	}
	getPIMG() {
		return this._storage.getItem('PIMG').then(res => {
		  return res;
		});
	}
	getSTATS() {
		return this._storage.getItem('STATS').then(res => {
		  return res;
		});
	}
	getCSTATS() {
		return this._storage.getItem('CSTATS').then(res => {
		  return res;
		});
	}
	getDSTRNS(dob, md, ad, pd, ayn) {
		return this._storage.getItem('DSTRNS-'+dob+md+ad+pd+ayn.toString()).then(res => {
		  return res;
		});
	}
	getSCR(bs, ms) {
		return this._storage.getItem('SCR-'+bs+ms).then(res => {
		  return res;
		});
	}
	getMSD() {
		return this._storage.getItem('MSD').then(res => {
		  return res;
		});
	}
	getSDB(dob) {
		return this._storage.getItem('SDB-'+dob).then(res => {
		  return res;
		});
	}
	getAKV(dob) {
		return this._storage.getItem('AKV-'+dob).then(res => {
		  return res;
		});
	}
	getCIMG() {
		return this._storage.getItem('CIMG').then(res => {
		  return res;
		});
	}
	getCNME() {
		return this._storage.getItem('CNME').then(res => {
		  return res;
		});
	}
	getCNUM() {
		return this._storage.getItem('CNUM').then(res => {
		  return res;
		});
	}
	getCEML() {
		return this._storage.getItem('CEML').then(res => {
		  return res;
		});
	}
	getRLNG() {
		return this._storage.getItem('RLNG').then(res => {
		  return res;
		});
	}
	getRAYN() {
		return this._storage.getItem('RAYN').then(res => {
		  return res;
		});
	}
	getRCHTYP() {
		return this._storage.getItem('RCHTYP').then(res => {
		  return res;
		});
	}
	getVIMS(dob) {
		return this._storage.getItem('VIMS-'+dob).then(res => {
		   this.dsProf.next(res);
		  return res;
		});
	}
	getKVIMS(dob) {
		return this._storage.getItem('KVIMS-'+dob).then(res => {
		  this.dsProf.next(res);
		  return res;
		});
	}
	getYOGS(dob) {
		return this._storage.getItem('YOGS-'+dob).then(res => {
		  return res;
		});
	}
	 getPPOS(dob)  {
		return this._storage.getItem('PPOS-'+dob).then(res => {
		  return res;
		});
	}
	 getKPPOS(dob)  {
		return this._storage.getItem('KPPOS-'+dob).then(res => {
		  return res;
		});
	}
	getHPOS(dob) {
		return this._storage.getItem('HPOS-'+dob).then(res => {
		return res;
		});
	}
	getMSGN() {
		return this._storage.getItem('MSGN').then(res => {
		return res;
		});
	}
	getSSGN() {
		return this._storage.getItem('SSGN').then(res => {
		return res;
		});
	}
	getASGN() {
		return this._storage.getItem('ASGN').then(res => {
		return res;
		});
	}
	getPRED() {
		return this._storage.getItem('PRED').then(res => {
		return res;
		});
	}
	getBSTR() {
		return this._storage.getItem('BSTR').then(res => {
		return res;
		});
	}
	getDHORO(msgn) {
		return this._storage.getItem('DHORO-'+msgn).then(res => {
		return res;
		});
	}
	getADV() {
		this.dsAdv.next(this.adc);
	}
	getDOHS(dob) {
		return this._storage.getItem('DOHS-'+dob).then(res => {
		  return res;
		});
	}
	getLANGU() {
		return this._storage.getItem('lang').then(res => {
		  this.lang = res;
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
		this._storage.setItem('reps', this.reps);
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
	//getPREDS() {
	//  return this.preds;
	//}
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
		return this._storage.getItem('RETRO-'+dob).then(res => {
		return res;
		});
	}
	getPLSTR(dob) {
		return this._storage.getItem('PLSTR-'+dob).then(res => {
		return res;
		});
	}
	getPLNM() {
		return this.plnm;
	}
	getPLAN() : Promise<any> {
		return new Promise((resolve,reject)=>{ 
			this._storage.getItem('PLAN')
							.then(res => {
										if(res && (res.name == 'com.mypubz.eportal.astrologer')) this.issubr = true;
										resolve(res);
									})
							.catch((err)=>{ 
                                reject(err); 
								});	
		});
	}						
			//	this.horoService.addTicket('xxxxxxx', 'technical', 'info', 'Getting PLAN ')
			//	.subscribe(res => {
			//	});
		//Promise.resolve(this._storage.getItem('PLAN')).then(res => {
			//	this.horoService.addTicket('xxxxxxx', 'technical', 'info', 'PLAN fetched from storage')
			//	.subscribe(res => {
			//	});
			//if(res && (res.name == 'com.mypubz.eportal.astrologer')) this.issubr = true;
			//return res;
		//});
	
	setREWARD(rew) {
		this.rew = rew;
	}
	getREWARD() {
		return this.rew;
	}
	setASTS(asts) {
		asts.sort( () => .5 - Math.random() );
	this.asts = asts.sort(function(a, b){ 
        return b.rating - a.rating;
    });
	}
	getASTS() {
		return this.asts;
	}
	setASTFlag() {
		this.bAST = true;
		this.dsAstro.next(true);
	}
	isAST() { return this.bAST; }
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
			case 'prathama':
				if(this.getLANG() == 'te') {
					trn = 'ప్రథమ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'प्रथम';
				}
				break;
			case 'dwitiya':
				if(this.getLANG() == 'te') {
					trn = 'ద్వితీయ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'द्वितीय';
				}
				break;
			case 'tritiya':
				if(this.getLANG() == 'te') {
					trn = 'తృతీయ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'तृतीया';
				}
				break;
			case 'chaturthi':
				if(this.getLANG() == 'te') {
					trn = 'చవితి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'चतुर्थी';
				}
				break;
			case 'panchami':
				if(this.getLANG() == 'te') {
					trn = 'పంచమి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'पंचमी';
				}
				break;
			case 'shashthi':
				if(this.getLANG() == 'te') {
					trn = 'షష్ఠి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'साष्टी';
				}
				break;
			case 'sapthami':
				if(this.getLANG() == 'te') {
					trn = 'సప్తమి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'सप्तमी';
				}
				break;
			case 'asthami':
				if(this.getLANG() == 'te') {
					trn = 'అష్టమి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'अष्ठमी';
				}
				break;
			case 'navami':
				if(this.getLANG() == 'te') {
					trn = 'నవమి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'रेवती';
				}
				break;
			case 'dasami':
				if(this.getLANG() == 'te') {
					trn = 'దశమి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'दशमी';
				}
				break;
			case 'ekadashi':
				if(this.getLANG() == 'te') {
					trn = 'ఏకాదశి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'एकादशी';
				}
				break;
			case 'dwadashi':
				if(this.getLANG() == 'te') {
					trn = 'ద్వాదశి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'द्वादशी';
				}
				break;
			case 'trayodashi':
				if(this.getLANG() == 'te') {
					trn = 'త్రయోదశి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'त्रयोदशी';
				}
				break;
			case 'chaturdashi':
				if(this.getLANG() == 'te') {
					trn = 'చతుర్దశి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'चतुर्दशी';
				}
				break;
			case 'purnima':
				if(this.getLANG() == 'te') {
					trn = 'పూర్ణిమ';
				} else if(this.getLANG() == 'hi') { 
					trn = 'पूर्णिमा';
				}
				break;
			case 'amavasya':
				if(this.getLANG() == 'te') {
					trn = 'అమావాస్య';
				} else if(this.getLANG() == 'hi') { 
					trn = 'अमावस्या';
				}
				break;
			case 'janma/ danger to body':
				if(this.getLANG() == 'te') {
					trn = 'జన్మ / శరీరానికి ప్రమాదం';
				} else if(this.getLANG() == 'hi') { 
					trn = 'जैनमा / शरीर के लिए खतरा';
				}
				break;
			case 'sampat/ wealth and prosperity':
				if(this.getLANG() == 'te') {
					trn = 'సంపత్ / సంపద మరియు శ్రేయస్సు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'सम्पत / धन और समृद्धि';
				}
				break;
			case 'vipat/ dangers, losses, accidents':
				if(this.getLANG() == 'te') {
					trn = 'విపత్ / ప్రమాదాలు, నష్టాలు, దుర్ఘటనలు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'विपत / खतरे, नुकसान, दुर्घटनाएं';
				}
				break;
			case 'kshema/ prosperity':
				if(this.getLANG() == 'te') {
					trn = 'క్షేమ / శ్రేయస్సు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'क्षेम / समृद्धि';
				}
				break;
			case 'pratyak/ obstacles':
				if(this.getLANG() == 'te') {
					trn = 'ప్రత్యక్ / అడ్డంకులు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'प्रत्येक / बाधाओं';
				}
				break;
			case 'sadhana/ realisation and ambitions':
				if(this.getLANG() == 'te') {
					trn = 'సాధనా / పరిపూర్ణత మరియు లక్ష్యాలు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'साधना / अहसास और महत्वाकांक्षा';
				}
				break;
			case 'naidhana/ dangers':
				if(this.getLANG() == 'te') {
					trn = 'నైదాన / ప్రమాదములు';
				} else if(this.getLANG() == 'hi') { 
					trn = 'नायदाणा / खतरे';
				}
				break;
			case 'mitra/ good':
				if(this.getLANG() == 'te') {
					trn = 'మిత్ర / మంచి';
				} else if(this.getLANG() == 'hi') { 
					trn = 'मित्र / अच्छा';
				}
				break;
			case 'prama mitra/ very favourable':
				if(this.getLANG() == 'te') {
					trn = 'ప్రమా మిత్ర / చాలా అనుకూలమైన';
				} else if(this.getLANG() == 'hi') { 
					trn = 'प्रामा मित्रा / बहुत अनुकूल है';
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
	getDms(val:any) {

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
	}
	
}
