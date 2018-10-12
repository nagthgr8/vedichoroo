import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform  } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import {AutocompletePage} from '../autocomplete/autocomplete'; 
import {HoroscopePage} from '../horoscope/horoscope'; 
import {KpAstroPage} from '../kp-astro/kp-astro'; 
import {DailyForecastPage} from '../dailyforecast/dailyforecast';
import {RajayogaPage} from '../rajayoga/rajayoga';
import {DivchartsPage} from '../divcharts/divcharts';
import {FormBuilder, FormGroup} from '@angular/forms';
import { HoroscopeService } from '../../app/horoscope.service';
import { ShareService } from '../../app/share.service'
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
   address;
   personalDetailsForm: FormGroup;
   info: string = '';
   horo: any;
   errorMessage: string;
   phone: string = '';
   source: string = '';
   nav: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public shareService: ShareService, public formBuilder: FormBuilder, public horoService: HoroscopeService, public platform: Platform, public splashscreen: SplashScreen) {
  platform.ready().then(() => {
     this.splashscreen.hide();
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
	this.source = navParams.get('item').title;
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
	  }else if(this.source == 'Yogas in Horoscope') {
		this.horoService.getHoro(this.shareService.getLAT(), this.shareService.getLNG(), this.personalDetailsForm.controls['dob'].value, this.shareService.getTimezone())
		   .subscribe(res => {
			this.shareService.setPLPOS(res);
			this.horoService.getYogas(this.shareService.getLAT(), this.shareService.getLNG(), this.personalDetailsForm.controls['dob'].value, this.shareService.getTimezone())
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
  
}
