import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform  } from 'ionic-angular';
import {AutocompletePage} from '../autocomplete/autocomplete'; 
import {HoroscopePage} from '../horoscope/horoscope'; 
import {KpAstroPage} from '../kp-astro/kp-astro'; 
import {DailyForecastPage} from '../dailyforecast/dailyforecast';
import {RajayogaPage} from '../rajayoga/rajayoga';
import {YogaInfoPage} from '../yoga-info/yoga-info';
import {DivchartsPage} from '../divcharts/divcharts';
import {SubscribePage} from '../subscribe/subscribe';
import {CreditsPage} from '../credits/credits';
import {FormBuilder, FormGroup} from '@angular/forms';
import { HoroscopeService } from '../../app/horoscope.service';
import { ShareService } from '../../app/share.service'
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2';
import { Device } from '@ionic-native/device';
import { Plan } from '../../app/plan';
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

 public product: any = {
    name: 'My Product',
    apid: '1234',
    gpid: 'com.mypubz.eportal.dob'
  };

   address;
   personalDetailsForm: FormGroup;
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public shareService: ShareService, public formBuilder: FormBuilder, public horoService: HoroscopeService, public platform: Platform, public device: Device, private store: InAppPurchase2) {
  this.info2 = 'Please wait...';
	this.source = navParams.get('item').title;
					this.showSU = false;
					this.showCR = false;
					this.showASU = false;
					this.showYO = false;
  this.platform.ready().then(() => {
//     this.splashscreen.hide();
	  this.horoService.getPlan(this.device.uuid)
		   .subscribe(res => {
		        this.info2 = '';
				let pln: Plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'] };
				this.plan = pln;
				if(res['name'] == 'com.mypubz.eportal.astrologer'){
					this.showSU = true;
					this.showCR = false;
					this.showASU = false;
				} else if(this.source != 'Yogas In Your Horoscope' && Number(res['credits']) == 0) {
					this.showSU = false;
					this.showCR = true;
					this.showASU = false;
				} else if(this.source == 'Yogas In Your Horoscope' && res['name'] != 'com.mypubz.eportal.yogas') {
				    this.showYO = true;
				} else {
					this.showSU = true;
					this.showCR = false;
					this.showASU = true;
				}
			}, (err) => {
					this.showSU = false;
					this.showCR = false;
					this.showASU = false;
				this.info2 = JSON.stringify(err);
			});	  
   });
	//this.address = {
     // place: this.shareService.getPlace(),
	  //lat: '',
	  //lng: ''
    //};
	this.personalDetailsForm = formBuilder.group({
		place: this.shareService.getPlace(),
		dob: this.shareService.getDOB(),
		//tz: this.shareService.getTimezone(),
	});
	this.nav = this.navCtrl;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalDetailsPage');
  }
   showAddressModal () {
    let modal = this.modalCtrl.create(AutocompletePage);
   // let me = this;
    modal.onDidDismiss(data => {
      this.personalDetailsForm.controls['place'].setValue(data);
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
	this.init_pur_and_complete();
  }
  buy5()
  {
    this.product.gpid = 'com.mypubz.eportal.dob5';
	this.init_pur_and_complete();
  }
  yog()
  {
    this.product.gpid = 'com.mypubz.eportal.yogas';
	this.init_pur_and_complete();
  }
  save() {
     this.info = 'please wait...';
     console.log(this.personalDetailsForm.value);
     if(this.personalDetailsForm.controls['place'].value.length == 0) {
	    this.info = 'Please enter your place of birth';
		return;
		}
     if(this.personalDetailsForm.controls['dob'].value.length == 0) {
	    this.info = 'Please enter your date of birth';
		return;
		}
	 //if(this.personalDetailsForm.controls['tz'].value.length == 0) {
	   // this.info = 'Please enter your time zone';
		//return;
		//}
     if(this.personalDetailsForm.controls['place'].value.length == this.shareService.getPlace()) {
	    this.info = '';
		this.nav.push((this.source == 'Birth Chart') ? HoroscopePage : KpAstroPage);
		return;
	 }
	this.shareService.setPersonDetails(this.personalDetailsForm.controls['place'].value, this.personalDetailsForm.controls['dob'].value);
	var dobs = this.plan.dobs.split('|');
	let bdob: boolean = false;
	for(var d=0; d < dobs.length; d++) {
		if(dobs[d].trim() == this.personalDetailsForm.controls['dob'].value.trim()) { 
			bdob = true;
			break;
		}
	}
	if(!bdob) {
		this.horoService.addDOB(this.plan.uuid, this.personalDetailsForm.controls['dob'].value)
		   .subscribe(res => {
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
	if(this.source == 'Birth Chart') {
		this.horoService.getHoro(this.shareService.getLAT(), this.shareService.getLNG(), this.personalDetailsForm.controls['dob'].value, this.shareService.getTimezone())
		   .subscribe(res => {
			this.shareService.setPLPOS(res);
			this.info = '';
			this.nav.push(HoroscopePage);
		  }, (err) => {
			this.info = err;
		  }) ;
	  } else if(this.source == 'KP Astrology') {
		this.horoService.getCusps(this.shareService.getLAT(), this.shareService.getLNG(), this.personalDetailsForm.controls['dob'].value, this.shareService.getTimezone())
		   .subscribe(res => {
			this.shareService.setPLPOS(res['planetPos']);
		    console.log(res['housePos']);
 		    this.shareService.setHPOS(res['housePos']);
			this.nav.push(KpAstroPage);
		  }, (err) => {
			this.info = err;
		  }) ;
	  
	  } else if(this.source == 'Daily Horoscope') {
	    this.horoService.getBirthStar(this.personalDetailsForm.controls['dob'].value)
       .subscribe(res => {
	     this.shareService.setMoonSign(res['birthSign']);
		 this.nav.push(DailyForecastPage);
		}, (err) => {
			this.info = err;
		}) ;
	  }else if(this.source == 'Yogas In Your Horoscope') {
		this.horoService.getHoro(this.shareService.getLAT(), this.shareService.getLNG(), this.personalDetailsForm.controls['dob'].value, this.shareService.getTimezone())
		   .subscribe(res => {
			this.shareService.setPLPOS(res);
			this.horoService.getYogas(this.shareService.getLAT(), this.shareService.getLNG(), this.personalDetailsForm.controls['dob'].value, this.shareService.getTimezone(), this.shareService.getLANG())
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
	  }else if(this.source == 'Divisional Charts') {
		this.horoService.getHoro(this.shareService.getLAT(), this.shareService.getLNG(), this.personalDetailsForm.controls['dob'].value, this.shareService.getTimezone())
		   .subscribe(res => {
			this.shareService.setPLPOS(res);
			this.nav.push(DivchartsPage);
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
}
