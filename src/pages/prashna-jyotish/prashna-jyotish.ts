import { Component, NgModule, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, ModalController, NavParams, Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import {AutolocatePage} from '../autolocate/autolocate'; 
import { HoroscopeService } from '../../app/horoscope.service';
import { ShareService } from '../../app/share.service'
import { File } from '@ionic-native/file';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2';
import { Device } from '@ionic-native/device';
import { Plan } from '../../app/plan';
import {SubscribePage} from '../subscribe/subscribe';

/**
 * Generated class for the PrashnaJyotishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google; 
@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'page-prashna-jyotish',
  templateUrl: 'prashna-jyotish.html',
  encapsulation: ViewEncapsulation.None
})
export class PrashnaJyotishPage {
  loc: string = '';
  que: string = '';
  wque: string = '';
  num: number = -1;
  today: any = '';
  info: string = '';
  ans: string = '';
  det: string = '';
  ticks: number = 0;
  //service = new google.maps.places.AutocompleteService();
  showSU: boolean = false;
  showCR: boolean = false;
  showANS: boolean = false;
  showMSG: boolean = true;
  showQ: boolean = true;
  showDET: boolean = false;
  showBK: boolean = false;
  plan: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public horoService: HoroscopeService, public shareService: ShareService, private file: File, public platform: Platform, public device: Device, private store: InAppPurchase2, public admob: AdMobFree) {
	this.platform.ready().then(() => {
	  console.log('gettting plan..');
	  this.horoService.getPlan(this.device.uuid)
     .subscribe(res => {
	     this.plan = res['name'];
		 this.today = Date.now();
		 var cd = new Date();
		 let dt: string = cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate();
		 if(this.shareService.getPRASDT() != dt) {
			this.shareService.setPRASDT(dt);
			this.shareService.setPRASNAS(0);
		}
		 else if(this.shareService.getPRASNAS() >= 1 && res['name'] != 'com.mypubz.eportal.astrologer') {
		   this.showCR = true;
		 } 
		 if(this.showCR == false) {
			this.info = 'Fetcing...';
			this.file.readAsText(this.file.dataDirectory, 'vedicperfs.json').then(res => {
				var jsonv = JSON.parse(res);
			   //let latlng = jsonv['clat'] + ',' + jsonv['clat'];
			   this.info = 'Geocoding..';
			   this.rgeoCode(Number(jsonv['clat']), Number(jsonv['clng']));
			});
		 }
		 if(this.plan != 'com.mypubz.eportal.astrologer') {
		    this.launchInterstitial();
			this.showBanner();
		 }
     });
	});
		
  }
  launchInterstitial() {

        let interstitialConfig: AdMobFreeInterstitialConfig = {
		    isTesting: false,
            autoShow: true,
            id: 'ca-app-pub-8442845715303800/6131959316'
        }; 

        this.admob.interstitial.config(interstitialConfig);

        this.admob.interstitial.prepare().then(() => {
            // success
        });

    }
  showBanner() {

        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: false, 
            autoShow: true,
            id: 'ca-app-pub-8442845715303800/1745534893'
        };

        this.admob.banner.config(bannerConfig);

        this.admob.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));

    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PrashnaJyotishPage');
	let tks: number = 0;
	var intv = setInterval(() =>  {
				tks++;
				if(tks == 10) this.showMSG = false;
				
	},1000);	
  }
  showAddressModal () {
    let modal = this.modalCtrl.create(AutolocatePage);
   // let me = this;
    modal.onDidDismiss(data => {
      this.loc = data;
    });
    modal.present();
  }  
    more()
	{
		this.navCtrl.push(SubscribePage);
	}
  
  save()
  {
   this.showMSG = false;
   this.ans = '';
   this.det = '';
   if(this.shareService.getPRASNAS() >= 1 && this.plan != 'com.mypubz.eportal.astrologer') {
	  this.showCR = true;
	  return;
   }
   this.info = 'Please wait..';
   if(this.num < 1 || this.num > 249) { 
		this.info = 'Number should be between 1 & 249';
		return;
	}
	if(this.loc.length == 0) {
		this.info = 'Please enter the location from where the question is raised.';
		return;
	}
	if(this.que.length == 0) {
	   this.info = 'Please enter your question';
	   return;
	}
    this.showSU = false;
	var cd = new Date();
		this.horoService.getPrashna(this.shareService.getCLAT(), this.shareService.getCLNG(),  cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes(), this.shareService.getCTimezone(), this.num)
		   .subscribe(res => {
		   this.info = '';
		   this.showQ = false;
		   this.showANS = false;
				    this.showANS = true;
			//this.ans = 'Please wait..';
			this.ticks = 0;
			var intv = setInterval(() =>  {
				this.ticks++;
				if(this.ticks < 5)
					this.ans = '<span><h2>' + this.ticks.toString() + '</h2></span>';
				if(this.ticks == 5) {
				    this.showDET = true;
					this.wque = '<span><h2>' + this.que + '?</h2></span>';
					this.ans = (res['answer'] == 'YES') ? '<span class="blueText"><h2>YES</h2></span>' : '<span class="redText"><h2>NO</h2></span>';
					this.det = '<span>Day Lord: <span class="redText">' + res["dayL"] + '</span></span><br><span> Lagna SSSL: <span class="blueText">' + res["ascSSSL"] + '</span></span><br><span> Moon SSSL: <span class="greenText">' + res["moSSSL"] + '</span></span><br><span>Remarks: <span class="blueText">' + res["remarks"] + '</span></span>';
					if(this.plan == 'com.mypubz.eportal.astrologer') this.showBK = true;

				   this.showSU = true;
				   this.shareService.setPRASNAS(this.shareService.getPRASNAS() + 1);
				}
			},1000);
		  }, (err) => {
			this.info = err;
			this.showSU = true;
		  }) ;
	
  }
  ask()
  {
    this.showBK = false;
    this.showANS = false;
	this.showQ = true;
	this.showSU = true;
  }
//convert Address string to lat and long
  rgeoCode(lat, lng) {
    console.log('lat=', lat);
	console.log('lng=', lng);
    var latlng = new google.maps.LatLng(lat, lng);
    let geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'latLng': latlng }, (results, status) => {
	    console.log('geocoder result=', results);
	    this.loc = (results[0].formatted_address);
		this.horoService.getTimezone(results[0].geometry.location.lat(), results[0].geometry.location.lng(), (Math.round((new Date().getTime())/1000)).toString())
		.subscribe(res2 => {
		   this.shareService.setCLAT(this.getDms(results[0].geometry.location.lat()));
		   this.shareService.setCLNG(this.getDms(results[0].geometry.location.lng()));
		   this.shareService.setCTimezone(res2['timeZoneId']);
		   console.log(res2['timeZoneId']);
		   this.info = '';
		   this.showSU = true;
		}, (err) => {
		  console.log(err);
		  this.info = err;
		}) ;
		
   },(err) => {
	  console.log(err);
	  this.info = err;
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
