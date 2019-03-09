import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform, Events } from 'ionic-angular';
import {AutocompletePage} from '../autocomplete/autocomplete'; 
import {HoroscopePage} from '../horoscope/horoscope'; 
import {KpAstroPage} from '../kp-astro/kp-astro'; 
import {DailyForecastPage} from '../dailyforecast/dailyforecast';
import {RajayogaPage} from '../rajayoga/rajayoga';
import {CareerhoroPage} from '../careerhoro/careerhoro';
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


@Component({
  selector: 'page-personal-details',
  templateUrl: 'personal-details.html',
})
export class PersonalDetailsPage {
 objectKeys = Object.keys;
 oBirth :BirthInfo[] = [];

 public product: any = {
    name: 'My Product',
    apid: '1234',
    gpid: 'com.mypubz.eportal.dob'
  };

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public shareService: ShareService, public formBuilder: FormBuilder, public horoService: HoroscopeService, public platform: Platform, public device: Device, private store: InAppPurchase2) {
  this.info2 = 'Please wait...';
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
  }
  ionViewDidEnter() {
     this.info = '';
  this.platform.ready().then(() => {
//     this.splashscreen.hide();
    this.shareService.plan.subscribe((pln) => {
	    console.log('personal-details fetched plan', pln);
		this.plan = pln;
	    this.info2 = '';
		if(pln.name == 'com.mypubz.eportal.astrologer'){
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
		if(pln.dobs.split('|').length > 1) {
			this.showH = true;
			let dobs = pln.dobs.split('|');
			let i: number =  dobs.length-1;
			let j: number = 0;
			while(i > -1) {
					let oB: BirthInfo = {
					  dob: dobs[i],
					  lat: '',
					  lng: '',
					  timezone: '',
					  lagna: '',
					  lagna_lord: '',
					  moon_sign: '',
					  sun_sign: '',
					  tithi: '',
					  birth_star: '',
					  star_lord: '',
					  moon_phase: '',
					  ref: '',
					};
					this.oBirth[j++] = oB;
					i--;
			}
		}
    }, (err) => {
					this.showSU = false;
					this.showCR = false;
					this.showASU = false;
				this.info2 = JSON.stringify(err);
			});
   });
  }
  
   showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
   // let me = this;
    modal.onDidDismiss(data => {
      //this.personalDetailsForm.controls['place'].setValue(data);
	  this.place = data;
    });
    modal.present();
  }
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
	    this.horoService.addCredits(this.device.uuid, (this.product.gpid == 'com.mypubz.eportal.dob5') ? 5 : 2)
		   .subscribe(res => {
				this.plan.credits += (this.product.gpid == 'com.mypubz.eportal.dob5') ? 5 : 2;
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
    this.product.gpid = 'com.mypubz.eportal.dob';
	if(this.paym == 'rpay') this.razpay(10);
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
	var dobs = this.plan.dobs.split('|');
	let bdob: boolean = false;
	for(var d=0; d < dobs.length; d++) {
	    var cdb = (dobs[d].indexOf('L') > -1) ? dobs[d].split('L')[0].trim() : dobs[d].trim();
		//if(cdb == this.personalDetailsForm.controls['dob'].value.trim()) { 
		if(cdb == this.dob.trim() + 'T' + this.tob + ':00Z') { 
			bdob = true;
			break;
		}
	}
	if(!bdob) {
	    console.log('before adding dob', this.plan);
		this.horoService.addDOB(this.plan.uuid, this.dob + 'T' + this.tob + ':00Z' + 'L' + this.shareService.getLAT() + ',' + this.shareService.getLNG() + '@' + this.shareService.getTimezone())
		   .subscribe(res => {
			let pln: Plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'] };
			this.plan = pln;
			console.log('after adding dob', this.plan);
			//this.plan.dobs = res['dobs'];
		   this.shareService.setPLAN(pln);
		   if(res['credits'] == -1) {
			//error
		   } else if (res['name'] != 'com.mypubz.eportal.astrologer' && res['credits'] == 0) {
			 this.showCR = true;
			 this.showSU = false;
			 return;
		   }
			this.info = '';
		}, (err) => {
			this.info = err;
		}) ;
	 }
	 this.processReq(this.shareService.getLAT(), this.shareService.getLNG(), this.shareService.getDOB(), this.shareService.getTimezone());
	}
    processReq(lat, lng, dob, tz)
    {
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
			this.shareService.setPLPOS(res);
			this.info = '';
			let binf: BirthInfo = { dob: dob, lat: lat, lng: lng, timezone: tz, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',ref:'1'};
			this.nav.push(HoroscopePage, {binf: binf});
		  }, (err) => {
			this.info = err;
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
			let binf: BirthInfo = { dob: dob, lat: lat, lng: lng, timezone: tz, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',ref:'2'};
			this.nav.push(KpAstroPage, {binf: binf});
		  }, (err) => {
			this.info = err;
		  }) ;
	  
	  } else if(this.source == 'Daily Horoscope') {
	    this.horoService.getBirthStar(this.dob + 'T' + this.tob + 'Z')
       .subscribe(res => {
	     this.shareService.setMoonSign(res['birthSign']);
		 this.nav.push(DailyForecastPage);
		}, (err) => {
			this.info = err;
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
			this.shareService.setPLPOS(res);
			this.horoService.getYogas(lat, lng, dob, tz, this.shareService.getLANG())
				.subscribe(res => {
				this.shareService.setYOGAS(res);
				this.info = '';
				this.nav.push(RajayogaPage);
			}, (err) => {
				this.info = err;
			}) ;
		  }, (err) => {
			this.info = err;
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
			this.shareService.setPLPOS(res);
		    let item: any = {};
			item.dob = dob;
			this.nav.push(TransitPredictionsPage, {item: item});
		}, (err) => {
			this.info = err;
		});
	  } else if(this.source == 'Divisional Charts') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getKAYNM();
		if(res) ayanid = Number(res);
		this.horoService.getProHoro(lat, lng, dob, tz, ofset, ayanid)
		   .subscribe(res => {
			this.shareService.setPLPOS(res);
			this.nav.push(DivchartsPage);
		  }, (err) => {
			this.info = err;
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
			this.shareService.setPLPOS(res);
				this.info = '';
				let binf: BirthInfo = { dob: dob, lat: lat, lng: lng, timezone: tz, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',ref:'4'};
				this.nav.push(CareerhoroPage, {binf: binf});
		  }, (err) => {
			this.info = err;
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
	    this.horoService.addCredits(this.device.uuid, (this.product.gpid == 'com.mypubz.eportal.dob5') ? 5 : 2)
		   .subscribe(res => {
				this.plan.credits += (this.product.gpid == 'com.mypubz.eportal.dob5') ? 5 : 2;
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
	var dob = pd.dob;
	if(dob.indexOf('L') > -1) {
		var db = dob.split('L')[0].trim();
		var lat = dob.split('L')[1].split('@')[0].split(',')[0].trim();
		var lng = dob.split('L')[1].split('@')[0].split(',')[1].trim();
		var tz = dob.split('L')[1].split('@')[1];
		this.processReq(lat, lng, db, tz);
	}
  }
	
}
