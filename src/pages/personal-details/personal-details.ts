import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, Events } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import {HoroscopePage} from '../horoscope/horoscope'; 
import {KpAstroPage} from '../kp-astro/kp-astro'; 
import {DailyForecastPage} from '../dailyforecast/dailyforecast';
import {RajayogaPage} from '../rajayoga/rajayoga';
import {CareerhoroPage} from '../careerhoro/careerhoro';
import {MoneyhoroPage} from '../moneyhoro/moneyhoro';
import {TransitPredictionsPage} from '../transit-predictions/transit-predictions';
import {YogaInfoPage} from '../yoga-info/yoga-info';
import {DivchartsPage} from '../divcharts/divcharts';
import {SubscribePage} from '../subscribe/subscribe';
import {CreditsPage} from '../credits/credits';
import {BtrInfoPage} from '../btr-info/btr-info';
import {FormBuilder, FormGroup} from '@angular/forms';
import { HoroscopeService } from '../../app/horoscope.service';
import { ShareService } from '../../app/share.service'
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2';
import { Device } from '@ionic-native/device';
import { Plan } from '../../app/plan';
import { BirthInfo } from '../../app/birth-info';
/**
 * Generated class for the PersonalDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var google; 

@Component({
  selector: 'page-personal-details',
  templateUrl: 'personal-details.html',
})
export class PersonalDetailsPage {
 objectKeys = Object.keys;
 oBirth :BirthInfo[] = [];
 service = new google.maps.places.AutocompleteService();
 public product: any = {
    name: 'My Product',
    apid: '1234',
    gpid: 'com.mypubz.eportal.dob'
  };
  autocomplete;
  autocompleteItems;

   address;
   //personalDetailsForm: FormGroup;
   info: string = '';
   info2: string = '';
   horo: any;
   errorMessage: string;
   phone: string = '';
   source: string = '';
   nav: any;
   plan: Plan;
   showSU: boolean;
   showCR: boolean;
   showASU: boolean;
   showYO: boolean;
   showH: boolean = false;
   paym: string = 'rpay';
   dob: any;
   tob: any;
   place: string = '';
   nam: string='';
   gen: string = '';
   nwait: number = 0;
  constructor(public navCtrl: NavController, private zone: NgZone, public navParams: NavParams, public modalCtrl: ModalController, public shareService: ShareService, public formBuilder: FormBuilder, public horoService: HoroscopeService, public platform: Platform, public device: Device, private store: InAppPurchase2, public admob: AdMobFree) {
  this.info2 = 'Please wait...';
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

	this.source = navParams.get('item').title;
					this.showSU = false;
					this.showCR = false;
					this.showASU = false;
					this.showYO = false;
	//this.address = {
     // place: this.shareService.getPlace(),
	  //lat: '',
	  //lng: ''
    //};
	//this.personalDetailsForm = formBuilder.group({
		//place: this.shareService.getPlace()
		//tz: this.shareService.getTimezone(),
	//});
	if(this.shareService.getDOB()) {
		this.dob = this.shareService.getDOB().split('T')[0];
		this.tob = this.shareService.getDOB().split('T')[1].split(':')[0] + ':' + this.shareService.getDOB().split('T')[1].split(':')[1];
	}
	if(this.shareService.getPlace()) this.place = this.shareService.getPlace(); 
	this.nav = this.navCtrl;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalDetailsPage');
	var intv = setInterval(() =>  {
			if(this.nwait > 0) {	
			    this.info = 'please wait..' + this.nwait.toString();
				this.nwait--;
			}
	},1000);	
  }
  ionViewDidEnter() {
     console.log('ionViewDidEnter');
     this.info = '';
  this.platform.ready().then(() => {
//     this.splashscreen.hide();
    this.shareService.plan.subscribe((pln) => {
	    console.log('personal-details fetched plan', pln);
		this.plan = pln;
	    this.info2 = '';
		if(pln.name == 'com.mypubz.eportal.astrologer' || pln.name == 'com.mypubz.eportal.offer499'){
			this.showSU = true;
			this.showCR = false;
			this.showASU = false;
			if(this.source == 'Yogas In Your Horoscope') 
			 this.showYO = true;
		} else if(Number(pln.credits) == 0) {
			this.showSU = false;
			this.showCR = true;
			this.showASU = false;
		} else {
			this.showSU = true;
			this.showCR = false;
			this.showASU = true;
			if(this.source == 'Yogas In Your Horoscope') 
			 this.showYO = true;
			
		}
		if(pln.name != 'com.mypubz.eportal.astrologer' && pln.name != 'com.mypubz.eportal.yogas') {
		   this.shareService.setYogAd(true);
		}
		console.log('pln-dobs', pln.dobs);
		if(pln.dobs.trim() != '') {
		   let dobs = pln.dobs.split('|');
		   let i: number =  dobs.length-1;
		  if(dobs.length > 0) {
			this.showH = true;
			let j: number = 0;
			this.oBirth = [];
			while(i > -1) {
				let dob: string = dobs[i];
				let db: string = dob;
				let nam: string = '';
				let gen: string = '';
				let lat: string = '';
				let lng: string = '';
				let tz: string = '';
				if(dob.indexOf('L') > -1) {
					db = dob.split('L')[0].trim();
					lat = dob.split('L')[1].split('@')[0].split(',')[0].trim();
					lng = dob.split('L')[1].split('@')[0].split(',')[1].trim();
					let tng: string = dob.split('L')[1].split('@')[1];
					if(tng.indexOf('#') > -1) {
					   tz = tng.split('#')[0];
						var ng = tng.split('#')[1];
						nam = ng.split('&')[0];
						gen = ng.split('&')[1];
					}
				}
				let oB: BirthInfo = {
					  dob: dob,
					  lat: lat,
					  lng: lng,
					  timezone: tz,
					  lagna: '',
					  lagna_lord: '',
					  moon_sign: '',
					  sun_sign: '',
					  tithi: '',
					  birth_star: '',
					  star_lord: '',
					  moon_phase: '',
					  name: nam,
					  gender: gen,
					  ref: '',
				};
				this.oBirth[j++] = oB;
				if(j == 1) {
					this.nam = nam;
					this.gen = gen;
					//this.dob = dob.split('T')[0];
					//this.tob = dob.split('T')[1].split('L')[0];
				}
				i--;
			}
		}
		}
		if(pln.name != 'com.mypubz.eportal.astrologer') {
		  this.showBanner();
		}
    }, (err) => {
					this.showSU = false;
					this.showCR = false;
					this.showASU = false;
				this.info2 = JSON.stringify(err);
			});
   });
  }
    showBanner() {

        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: false, 
            autoShow: true,
            id: 'ca-app-pub-8442845715303800/3469547317'
        };

        this.admob.banner.config(bannerConfig);

        this.admob.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));

    }

   //showAddressModal () {
   // let modal = this.modalCtrl.create(AutocompletePage);
   // let me = this;
   // modal.onDidDismiss(data => {
      //this.personalDetailsForm.controls['place'].setValue(data);
	 // console.log('onDidDismiss', data);
	 // this.place = data;
	 // this.geoCode(data);
    //});
   // modal.present();
  //}
  init_pur_and_complete() {
    let pid: any;
    if (!this.platform.is('cordova')) { return; }
    try {
      if (this.platform.is('ios')) {
        pid = this.product.apid;
      } else if (this.platform.is('android')) {
        pid = this.product.gpid;
      }

      // Register Product
      // Set Debug High
      this.store.verbosity = this.store.DEBUG;
      // Register the product with the store
      this.store.register({
        id: pid,
        alias: pid,
        type: this.store.CONSUMABLE
      });
      this.pur_handl();

      this.store.ready(() => {
		this.complete_pur();
	  });//.then((status) => {
       // console.log(JSON.stringify(this.store.get(this.platform.is('ios') ? this.product.apid : this.product.gpid)));
       // console.log('Store is Ready: ' + JSON.stringify(status));
        //console.log('Products: ' + JSON.stringify(this.store.products));
	//	this.complete_pur();
	//	console.log('Finished Purchase!');
	 // });

      // Errors On The Specific Product
      this.store.when(pid).error( (error) => {
        console.log('An Error Occured' + JSON.stringify(error));
      });
      // Refresh Always
      console.log('Refresh Store');
      this.store.refresh();
    } catch (err) {
      console.log('Error On Store Issues' + JSON.stringify(err));
    }
  }
 pur_handl() {
    // Handlers
    this.store.when(this.product.gpid).approved( (product: IAPProduct) => {
      product.finish();
	  this.showCR = false;
	  this.showSU = true;
	  if(this.showYO) {
	    this.showYO = false;
		this.horoService.setPlan(this.device.uuid, 'com.mypubz.eportal.yogas')  
		   .subscribe(res => {
			}, (err) => {
			});	  
		
	  } else {
	    this.horoService.addCredits(this.device.uuid, (this.product.gpid == 'com.mypubz.eportal.dob5') ? 5 : 10)
		   .subscribe(res => {
				this.plan.credits += (this.product.gpid == 'com.mypubz.eportal.dob5') ? 5 : 10;
				this.shareService.setPLAN(this.plan);
			}, (err) => {
			});	  
	  } 
    });

    this.store.when(this.product.gpid).registered( (product: IAPProduct) => {
      console.log('Registered: ' + JSON.stringify(product));
    });

    this.store.when(this.product.gpid).updated( (product: IAPProduct) => {
      console.log('Loaded' + JSON.stringify(product));
    });

    this.store.when(this.product.gpid).cancelled( (product) => {
      console.log('Purchase was Cancelled');
    });

    // Overall Store Error
    this.store.error( (err) => {
      console.log('Store Error ' + JSON.stringify(err));
    });
  }
   async complete_pur() {
    let pid;
    if (!this.platform.is('cordova')) {
      return
    }

    if (this.platform.is('ios')) {
      pid = this.product.apid;
    } else if (this.platform.is('android')) {
      pid = this.product.gpid;
    }

    console.log('Products: ' + JSON.stringify(this.store.products));
    console.log('Ordering From Store: ' + pid);
    try {
      let product = this.store.get(pid);
      console.log('Product Info: ' + JSON.stringify(product));
      let order = await this.store.order(pid);
    } catch (err) {
      console.log('Error Ordering ' + JSON.stringify(err));
    }
  }
  buy()
  {
    this.product.gpid = 'com.mypubz.eportal.dob10';
	if(this.paym == 'rpay') this.razpay(70);
	else this.init_pur_and_complete();
  }
  buy5()
  {
    this.product.gpid = 'com.mypubz.eportal.dob5';
	if(this.paym == 'rpay') this.razpay(40);
	else this.init_pur_and_complete();
  }
  yog()
  {
    this.product.gpid = 'com.mypubz.eportal.yogas';
	if(this.paym == 'rpay') this.razpay(126);
	else this.init_pur_and_complete();
  }
  save() {
     this.info = 'please wait...';
	 console.log('dob', this.dob);
	 console.log('tob', this.tob);
     //console.log(this.personalDetailsForm.value);
    // if(this.personalDetailsForm.controls['place'].value.length == 0) {
	if(this.place.length == 0) {
	    this.info = 'Please enter your place of birth';
		return;
		}
    // if(this.personalDetailsForm.controls['dob'].value.length == 0) {
	  if(this.dob.length == 0) {
	    this.info = 'Please enter your date of birth';
		return;
		}
     if(this.tob.length == 0) {
	    this.info = 'Please enter your time of birth';
		return;
		}
	 //if(this.personalDetailsForm.controls['tz'].value.length == 0) {
	   // this.info = 'Please enter your time zone';
		//return;
		//}
    // if(this.personalDetailsForm.controls['place'].value.length == this.shareService.getPlace()) {
	  //if(this.place.length == this.shareService.getPlace().length) {
	    //this.info = '';
		//this.nav.push((this.source == 'Birth Chart') ? HoroscopePage : KpAstroPage);
		//return;
	 //}
	//this.shareService.setPersonDetails(this.personalDetailsForm.controls['place'].value, this.personalDetailsForm.controls['dob'].value) + 'T' + //this.personalDetailsForm.controls['tob'] + ':00Z';
	this.shareService.setPersonDetails(this.place, this.dob + 'T' + this.tob + ':00Z');
	//var dobs = this.plan.dobs.split('|');
	let bdob: boolean = false;
	console.log('oBirth-save', this.oBirth);
	let dob2: string = this.dob.toString().trim();
	for(var d=0; d < this.oBirth.length; d++) {
	    let dob1: string = this.oBirth[d].dob.split('T')[0].trim();
		
		console.log('dob1', dob1);
		console.log('dob2', dob2);
	    if( dob1 == dob2) { bdob = true; break; }
	   // var cdb = (dobs[d].indexOf('L') > -1) ? dobs[d].split('L')[0].trim() : dobs[d].trim();
		//if(cdb == this.personalDetailsForm.controls['dob'].value.trim()) { 
		//if(cdb == this.dob.trim() + 'T' + this.tob + 'Z') { 
			//bdob = true;
			//break;
		//}
	}
	if(!bdob) {
	    console.log('before adding dob', this.oBirth);
		let pd: string = this.dob + 'T' + this.tob + ':00Z' + 'L' + this.shareService.getLAT() + ',' + this.shareService.getLNG() + '@' + this.shareService.getTimezone();
		if(this.nam.length > 0) pd += '#' + this.nam + '&' + this.gen;
		this.info = 'storing DOB..';
		this.horoService.addDOB(this.device.uuid, pd)
		   .subscribe(res => {
		    console.log('addDOB', res);
							let oB: BirthInfo = {
					  dob: this.dob + 'T' + this.tob + ':00Z',
					  lat: this.shareService.getLAT(),
					  lng: this.shareService.getLNG(),
					  timezone: this.shareService.getTimezone(),
					  lagna: '',
					  lagna_lord: '',
					  moon_sign: '',
					  sun_sign: '',
					  tithi: '',
					  birth_star: '',
					  star_lord: '',
					  moon_phase: '',
					  name: this.nam,
					  gender: this.gen,
					  ref: '',
				};
				this.oBirth.unshift(oB);
                if(this.showH == false) this.showH = true;
				let ob: string = '';
				if(res['dobs'].trim() != '') {
				 ob = res['dobs'] + '|' + this.dob + 'T' + this.tob + ':00Z' + 'L' + this.shareService.getLAT() + ',' + this.shareService.getLNG() + '@' + this.shareService.getTimezone() + '#' + this.nam + '&' + this.gen;
				} else {
				  ob = this.dob + 'T' + this.tob + ':00Z' + 'L' + this.shareService.getLAT() + ',' + this.shareService.getLNG() + '@' + this.shareService.getTimezone() + '#' + this.nam + '&' + this.gen;
				}
					
			let pln: Plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: ob };
			this.plan = pln;
			console.log('after adding dob', this.plan);
			//this.plan.dobs = res['dobs'];
		   this.shareService.setPLAN(pln);
		   //if(res['credits'] == -1) {
			//error
		   if (res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.offer499' && res['credits'] == 0) {
			 this.showCR = true;
			 this.showSU = false;
			 return;
		   }
			this.info = '';
			this.nwait = 0;
		}, (err) => {
			this.info = err;
			this.nwait = 0;
		}) ;
	 }
	 this.info = 'processing request..';
	 this.processReq(this.shareService.getLAT(), this.shareService.getLNG(), this.shareService.getDOB(), this.shareService.getTimezone());
	}
    processReq(lat, lng, dob, tz)
    {
	 this.nwait = 18;
	 if(this.source == 'Birth Chart') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		   this.horoService.getProHoro(lat, lng, dob, tz, ofset, ayanid)
		   .subscribe(res => {
			this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setRETRO(res['retroPls']);
			this.info = '';
			this.nwait = 0;
			let binf: BirthInfo = { dob: dob, lat: lat, lng: lng, timezone: tz, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:'',gender:'',ref:'1'};
			this.nav.push(HoroscopePage, {binf: binf});
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
	  } else if(this.source == 'KP Astrology') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 3;
		var res = this.shareService.getKAYNM();
		if(res) ayanid = Number(res);
		this.horoService.getCuspsEx(lat, lng, dob, tz, ofset, ayanid)
		   .subscribe(res => {
			this.shareService.setPLPOS(res['planetPos']);
		    console.log(res['housePos']);
 		    this.shareService.setHPOS(res['housePos']);
			this.info = '';
			this.nwait = 0;
			let binf: BirthInfo = { dob: dob, lat: lat, lng: lng, timezone: tz, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:'',gender:'',ref:'2'};
			this.nav.push(KpAstroPage, {binf: binf});
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
	  
	  } else if(this.source == 'Daily Horoscope') {
	    this.horoService.getBirthStar(dob)
       .subscribe(res => {
	     this.shareService.setMoonSign(res['birthSign']);
		 this.info = '';
		 this.nwait = 0;
		 this.nav.push(DailyForecastPage);
		}, (err) => {
			this.info = err;
			this.nwait = 0;
		}) ;
	  }else if(this.source == 'Yogas In Your Horoscope') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.horoService.getProHoro(lat, lng, dob, tz, ofset, ayanid)
		   .subscribe(res => {
			this.shareService.setPLPOS(res['planetPos']);
			this.horoService.getYogas(lat, lng, dob, tz, this.shareService.getLANG())
				.subscribe(res => {
				this.shareService.setYOGAS(res);
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, lat: lat, lng: lng, timezone: tz, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:'',gender:'',ref:'2'};
				this.nav.push(RajayogaPage, {binf: binf});
			}, (err) => {
				this.info = err;
				this.nwait = 0;
			}) ;
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
	  }else if(this.source == 'Predictions') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
	    this.horoService.getProHoro(lat, lng, dob, tz, ofset, ayanid)
		   .subscribe(res => {
			this.shareService.setPLPOS(res['planetPos']);
			this.info = '';
			this.nwait = 0;
			let binf: BirthInfo = { dob: dob, lat: lat, lng: lng, timezone: tz, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:'',gender:'',ref:'4'};
			this.nav.push(TransitPredictionsPage, {binf: binf});
		}, (err) => {
			this.info = err;
			this.nwait = 0;
		});
	  } else if(this.source == 'Divisional Charts') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.horoService.getProHoro(lat, lng, dob, tz, ofset, ayanid)
		   .subscribe(res => {
			this.shareService.setPLPOS(res['planetPos']);
			this.info = '';
			this.nwait = 0;
			let binf: BirthInfo = { dob: dob, lat: lat, lng: lng, timezone: tz, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:'',gender:'',ref:'5'};
			this.nav.push(DivchartsPage, {binf: binf});
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
	  } else if(this.source == 'Career Horoscope') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.horoService.getProHoro(lat, lng, dob, tz, ofset, ayanid)
		   .subscribe(res => {
			this.shareService.setPLPOS(res['planetPos']);
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, lat: lat, lng: lng, timezone: tz, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:'',gender:'',ref:'4'};
				this.nav.push(CareerhoroPage, {binf: binf});
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
	  } else if(this.source == 'Money Horoscope') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.horoService.getProHoro(lat, lng, dob, tz, ofset, ayanid)
		   .subscribe(res => {
			this.shareService.setPLPOS(res['planetPos']);
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, lat: lat, lng: lng, timezone: tz, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:'',gender:'',ref:'4'};
				this.nav.push(MoneyhoroPage, {binf: binf});
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
	  }
	
    }	
    more()
	{
		this.nav.push(SubscribePage);
	}
	morecred()
	{
		this.nav.push(CreditsPage);
	}
	yoginf()
	{
		this.nav.push(YogaInfoPage);
	}
  paymSel(paym)
  {
     this.paym = paym;
  }
  razpay(amt) {
    let paise: number = amt*100;
	let ccy: string = 'INR';
	let ccode = this.shareService.getCCODE();
	if(ccode && ccode != '' && ccode != 'IN') {
	  paise = amt*1.4;
	  ccy = 'USD';
	}
	   
    var options = {
      description: '126 Astrology - Credits',
      image: 'https://i.imgur.com/YBQF1iV.png',
      currency: ccy, //'INR',
      key: 'rzp_live_B8Zi7S5GIm9G94',
      amount: paise,
      name: '126 Astrology',
      prefill: {
        email: '',
        contact: '',
        name: ''
      },
      theme: {
        color: '#488aff'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

    var successCallback = (payment_id) => {
	  this.showCR = false;
	  this.showSU = true;
	  if(this.showYO) {
	    this.showYO = false;
		this.horoService.setPlan(this.device.uuid, 'com.mypubz.eportal.yogas')  
		   .subscribe(res => {
			}, (err) => {
			});	  
		
	  } else {
	    this.horoService.addCredits(this.device.uuid, (this.product.gpid == 'com.mypubz.eportal.dob5') ? 5 : 10)
		   .subscribe(res => {
				this.plan.credits += (this.product.gpid == 'com.mypubz.eportal.dob5') ? 5 : 10;
				this.shareService.setPLAN(this.plan);
			}, (err) => {
			});	  
	  } 
    };

    var cancelCallback = (error) => {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
  selDOB(evt, pd)
  {
    evt.stopPropagation();
    console.log(pd);
	//var dob = pd.dob;
	//if(dob.indexOf('L') > -1) {
		//var db = dob.split('L')[0].trim();
		//var lat = dob.split('L')[1].split('@')[0].split(',')[0].trim();
		//var lng = dob.split('L')[1].split('@')[0].split(',')[1].trim();
		//let tz: string = dob.split('L')[1].split('@')[1];
		//let nam: string = '';
		//let gen: string = '';
		//if(tz.indexOf('#') > -1) {
			//tz = tz.split('#')[0];
			//nam = tz.split('&')[0];
			//gen = tz.split('&')[1];
		//}
		this.processReq(pd.lat, pd.lng, pd.dob, pd.timezone);
	//}
  }
  reward()
  {
        let RewardVideoConfig: AdMobFreeRewardVideoConfig = {
            isTesting: false, 
            autoShow: true,
            id: "ca-app-pub-8442845715303800/2266363358"
        };
        this.admob.rewardVideo.config(RewardVideoConfig);
        this.admob.rewardVideo.prepare().then(() => {
		  this.horoService.addCredits(this.device.uuid, 2)
		   .subscribe(res => {
				this.plan.credits += 2;
				this.shareService.setPLAN(this.plan);
			  this.showCR = false;
			  this.showSU = true;
			}, (err) => {
			});	  
        }).catch(e => alert(e));
    
  }
  updateSearch() {
    console.log('updateSearch');
    if (this.autocomplete.query == '' || this.autocomplete.query.length < 3 || this.autocomplete.query == this.place) {
     this.autocompleteItems = [];
     return;
    }

    let me = this;
    this.service.getPlacePredictions({
    input: this.autocomplete.query,
    
   }, (predictions, status) => {
     console.log('getPlacePredictions', predictions);
     me.autocompleteItems = [];

   me.zone.run(() => {
     console.log('zone.run', predictions);
     if (predictions != null) {
        predictions.forEach((prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
       }
     });
   });
  }
  chooseItem(item: any) {
	this.place = item;
	this.autocomplete.query = item;
    this.geoCode(item);
	this.autocompleteItems = [];
  }
//convert Address string to lat and long
  geoCode(address:any) {
    this.info = 'geocoding..';
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
    let latitude = results[0].geometry.location.lat();
    let longitude = results[0].geometry.location.lng();
	this.shareService.setLAT( this.getDms(latitude));
	this.shareService.setLNG(this.getDms(longitude));
	//let utc_offset: number = 0;
	//if(results[0].geometry.hasOwnProperty('utc_offset'))
		//utc_offset = results[0].geometry.utc_offset;
    this.horoService.getTimezone(results[0].geometry.location.lat(), results[0].geometry.location.lng(), (Math.round((new Date().getTime())/1000)).toString())
		.subscribe(res2 => {
		   this.shareService.setTimezone(res2['timeZoneId']);
		   console.log(res2['timeZoneId']);
		   this.info = '';
		}, (err) => {
		  console.log(err);
		  this.info = err;
		}) ;

   });
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
