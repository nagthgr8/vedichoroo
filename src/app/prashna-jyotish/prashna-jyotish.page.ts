import { Component, OnInit, NgModule, NgZone, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
//import { AdMob } from "ionic-admob";
import { Platform } from '@ionic/angular';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { File } from '@ionic-native/file/ngx';
import { Device } from '@ionic-native/device/ngx';
import { Plan } from '../plan';

declare var google; 
declare var admob;
@Component({
  selector: 'app-prashna-jyotish',
  templateUrl: './prashna-jyotish.page.html',
  styleUrls: ['./prashna-jyotish.page.scss'],
})
export class PrashnaJyotishPage implements OnInit {
  loc: string = '';
  autocompleteItems;
  que: string = '';
  wque: string = '';
  num: number = -1;
  today: any = '';
  info: string = '';
  ans: string = '';
  det: string = '';
  ticks: number = 0;
  service = new google.maps.places.AutocompleteService();
  showSU: boolean = false;
  showCR: boolean = false;
  showANS: boolean = false;
  showMSG: boolean = true;
  showQ: boolean = true;
  showDET: boolean = false;
  showBK: boolean = false;
  plan: string = '';
  clat: string = '';
  clng: string = '';
  tzid: string = '';
  constructor(private router: Router, private zone: NgZone, public horoService: HoroscopeService, public shareService: ShareService, private file: File, public platform: Platform, public device: Device, public translate: TranslateService){//, public admob: AdMob) { 
   this.autocompleteItems = [];
}

  ngOnInit() {
    this.info = 'Loading..';
   	this.platform.ready().then(() => {
	  this.info = 'Getting configurations..';
  	  this.shareService.plan
		   .subscribe(res => {
	      this.info = '';
	     this.plan = res['name'];
		 this.today = Date.now();
		 var cd = new Date();
		 let dt: string = cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate();
		 if(this.shareService.getPRASDT() != dt) {
			this.shareService.setPRASDT(dt);
			this.shareService.setPRASNAS(0);
		}
		 else if(this.shareService.getPRASNAS() >= 1 && (res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.year' && res['name'] != 'com.mypubz.eportal.month')) {
		   this.showCR = true;
		 } 
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
		  admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/1745534893',
			  ios: 'ca-app-pub-8442845715303800/1745534893',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/1745534893',
				ios: 'ca-app-pub-8442845715303800/1745534893',
			  })
			}, 10000)
		  })		
		}		  
		}, (err) => {
	 });
      this.rgeoCode2(this.shareService.getCLAT(), this.shareService.getCLNG());
	});
  }
  save()
  {
   this.showMSG = false;
   this.ans = '';
   this.det = '';
   //if(this.shareService.getPRASNAS() >= 1 && (this.plan != 'com.mypubz.eportal.astrologer' && this.plan != 'com.mypubz.eportal.adfree' && this.plan != 'com.mypubz.eportal.year' && this.plan != //'com.mypubz.eportal.month')) {
	//  this.showCR = true;
	//  return;
   //}
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
		this.horoService.getPrashna((this.clat == '') ? this.shareService.getCLAT() : this.clat, (this.clng == '') ? this.shareService.getCLNG() : this.clng,  cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes()+ ':' + cd.getSeconds() + 'Z', (this.tzid == '') ? Intl.DateTimeFormat().resolvedOptions().timeZone : this.tzid, this.num)
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
					if(this.plan == 'com.mypubz.eportal.astrologer' || this.plan == 'com.mypubz.eportal.adfree' || this.plan == 'com.mypubz.eportal.year' || this.plan == 'com.mypubz.eportal.month') this.showBK = true;

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
    rgeoCode2(lat, lng) {
    console.log('lat=', lat);
	console.log('lng=', lng);
    var latlng = new google.maps.LatLng(lat, lng);
    let geocoder = new google.maps.Geocoder();
      this.info = 'getting your current location..';
	geocoder.geocode({ 'latLng': latlng }, (results, status) => {
		this.info = '';
	    console.log('geocoder result=', results);
	    this.loc = (results[0].formatted_address);
		
   },(err) => {
	  console.log(err);
	  this.info = err;
	});
 }

//convert Address string to lat and long
  rgeoCode(lat, lng) {
    console.log('lat=', lat);
	console.log('lng=', lng);
    var latlng = new google.maps.LatLng(lat, lng);
    let geocoder = new google.maps.Geocoder();
      this.info = 'getting your current location..';
	geocoder.geocode({ 'latLng': latlng }, (results, status) => {
		this.info = '';
	    console.log('geocoder result=', results);
	    this.loc = (results[0].formatted_address);
		this.horoService.getTimezone(results[0].geometry.location.lat(), results[0].geometry.location.lng(), (Math.round((new Date().getTime())/1000)).toString())
		.subscribe(res2 => {
		     this.clat = results[0].geometry.location.lat();
		     this.clng = results[0].geometry.location.lng();
		   this.tzid = res2['timeZoneId'];
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
    more()
	{
		this.router.navigate(['/subscribe']);
	}
  updateSearch() {
    console.log('updateSearch');
    if (this.loc == '' || this.loc.length < 3) {
     this.autocompleteItems = [];
     return;
    }

    let me = this;
    this.service.getPlacePredictions({
    input: this.loc,
    
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
	this.loc = item;
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
	this.shareService.setLAT( latitude);
	this.shareService.setLNG(longitude);
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
 showinfo() {
 }
}
