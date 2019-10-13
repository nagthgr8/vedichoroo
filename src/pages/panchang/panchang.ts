import { Component, NgModule, Renderer2, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { NavController, NavParams, Platform} from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { File } from '@ionic-native/file';
import { ShareService } from '../../app/share.service'
import { HoroscopeService } from '../../app/horoscope.service';
import { TranslateService } from '@ngx-translate/core';
import { ChartSettingsPage } from '../chart-settings/chart-settings';
import * as sublords from '../horoscope/sublords.json';
import * as lunapics from './lunapics.json';
import * as moment from 'moment';
import * as moon_phases from '../horoscope/moon_phases.json';
import * as mon_weeks from '../horoscope/mon_weeks.json';
import { WeekDay } from '../../app/week-day';
import { LunarDay } from '../../app/lunar-day';

/**
 * Generated class for the PanchangPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

@Component({
  selector: 'page-panchang',
  templateUrl: 'panchang.html',
})
export class PanchangPage {
   @ViewChild('hinduCal') hinduCal;
  today: any = '';
  sunrise: string = '';
  sunset: string = '';
  rahukal: string = '';
  yama: string = '';
  abhjit: string = '';
  showCard: boolean;
  //fetching: string = '';
  lagna: string = '';
  ticks: number = 0;
  lag_d: number = 0;
  lag_m: number = 0;
  lag_s: number = 0;
  lagml: string = '';
  lagal: string = '';
  lagsl: string = '';
  nak: string = '';
  tithi: string = '';
  clat: any;
  clng: any;
  localtz: string = '';
  lunapic: string = '';
  info: string = '';
  showPAN: boolean = false;
  device_width :number = 0;
  device_height :number = 0;
  str :string;
  //objectKeys = Object.keys;
  //oTransits: StarStrength[] = [];
  mon: string = '';
  yer: string = '';
  cal: string = 'Show Calendar';
  hideCALD: boolean = false;
  fetchCAL: boolean = true;
  svgCal: any;
  nrefs: number = 0;
  ayanINF: string = '';
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, public horoService: HoroscopeService, public shareService: ShareService, public translate: TranslateService, private file: File, public renderer: Renderer2, public admob: AdMobFree) {
  this.info = 'Please wait...';
  this.showPAN = false;
     platform.ready().then(() => {
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
		this.showBanner();
      });
  }
showBanner() {

        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: false, 
            autoShow: true,
            id: 'ca-app-pub-8442845715303800/6344800041'
        };

        this.admob.banner.config(bannerConfig);

        this.admob.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));

    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PanchangPage');
	this.today = Date.now();
	this.info = 'Fetching todays panchang....';
    console.log(this.file.dataDirectory);	
	this.file.readAsText(this.file.dataDirectory, 'vedicperfs.json').then(res => {
		console.log('vedicperfs', res);
	    var jsonv = JSON.parse(res);
        this.sunrise = jsonv['srise'];
		this.sunset = jsonv['sset'];
        this.rahukal = jsonv['rahukal_s'] + ' To ' + jsonv['rahukal_e'];
        this.yama = jsonv['yamgand_s'] + ' To ' + jsonv['yamgand_e'];
        this.abhjit = jsonv['abhijit_s'] + ' To ' + jsonv['abhijit_e'];
		this.clat = jsonv['clat'];
		this.clng = jsonv['clng'];
		this.localtz = jsonv['localtz'];
  		var cd = new Date();
		var ct = cd.getHours().toString() + ':' + cd.getMinutes().toString();
		console.log('current time: ', ct);
		var startTime=moment(ct +':00', "HH:mm:ss");
		console.log('sunrise=', startTime);
		var endTime=moment(this.sunset + ':00 pm', "HH:mm:ss a");
		console.log('sunset=',endTime);
		var duration = moment.duration(endTime.diff(startTime));
		var hours = duration.asHours();
		console.log('total hrs=', hours);
		var minutes = duration.asMinutes()%60;	
        var totmins = hours*60 + minutes;		
		console.log('totak mins=', minutes);
		let ayanid: number = (this.shareService.getRAYNM()) ? Number(this.shareService.getRAYNM()) : 1;
		this.info = 'Please wait..';
		this.horoService.getProMoonPhase(this.getDms(jsonv['clat']), this.getDms(jsonv['clng']), cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes(), jsonv['localtz'], ayanid)
		   .subscribe(res3 => {
		   this.showPAN = true;
		   this.info = '';
		   this.nak = this.translate_func(res3['birthStar']);
		   var tithiRem = res3['tithiRem'];
		   console.log('tithiRem=', tithiRem);
		   var rem = Math.floor((Number(tithiRem)*Number(totmins))/100);
		   console.log('tithiRem in mins=', rem);
		   var tite = moment(startTime).add(rem, 'm');
		   this.tithi = this.translate_func(res3['tithi']) + ' till ' + tite.format('HH:mm');
		   console.log(res3['tithi'].toLowerCase());// + (res3['moonPhase'] == 'waxing') ? '-s' : '-k');
		   let ky: string = res3['tithi'].toLowerCase();
		   if(ky != 'purnima' && ky != 'amavasya') {
			ky = (res3['moonPhase'] == 'waxing') ? res3['tithi'].toLowerCase() + '-s' : res3['tithi'].toLowerCase() + '-k';
		   } 
		   console.log(ky);
		   this.lunapic = lunapics[ky];
		   var ascPos = res3['ascPos'];
		   console.log(ascPos);
		   var lag = this.getDms(ascPos[0]);
		   console.log(lag);
		   this.lagna = lag;
		   console.log(lag.indexOf('º'));
		   this.lag_d = Number(lag.substring(0, lag.indexOf('º')));
		   console.log(this.lag_d);
		   this.lag_m = Number(lag.substring(lag.indexOf('º')+1,  lag.indexOf("'")));
		   console.log(this.lag_m);
		   this.lag_s = Math.floor(lag.substring(lag.indexOf("'")+1,  lag.indexOf('"')));
		   console.log(this.lag_s);
		   var c_mins = this.lag_d*60 + this.lag_m + Number((this.lag_s/60).toFixed(2));
		   console.log(c_mins);
		   let sssl: string = this.calcStar(c_mins);
		   console.log(sssl);
		   this.lagml = sssl.split('|')[0];
		   this.lagal = sssl.split('|')[1];
		   this.lagsl = sssl.split('|')[2];
		var intv = setInterval(() =>  {
		    this.ticks++;
			//console.log('ticks=' + this.ticks.toString());
			this.lag_s += 15;
			if(this.lag_s > 59) {
				this.lag_s = this.lag_s -59;
				this.lag_m++;
				if(this.lag_m > 59) {
					this.lag_m = 0;
					this.lag_d++;
				}
			}
			let lag_r: string = '';
			if(this.lag_d < 29) lag_r = 'Aries';
			else if(this.lag_d < 59) lag_r = 'Taurus';
			else if(this.lag_d < 89) lag_r = 'Gemini';
			else if(this.lag_d < 119) lag_r = 'Cancer';
			else if(this.lag_d < 149) lag_r = 'Leo';
			else if(this.lag_d < 179) lag_r = 'Virgo';
			else if(this.lag_d < 209) lag_r = 'Libra';
			else if(this.lag_d < 239) lag_r = 'Scorpio';
			else if(this.lag_d < 269) lag_r = 'Sagittarius';
			else if(this.lag_d < 299) lag_r = 'Capricorn';
			else if(this.lag_d < 329) lag_r = 'Aquarius';
			else lag_r = 'Pisces';
			
			this.lagna = lag_r + ' ' + this.lag_d.toString() + 'º' + this.lag_m.toString() + "'" + this.lag_s.toString() + '"';
		   var cur_m = this.lag_d*60 + this.lag_m + Math.floor(this.lag_s/60);
		   //console.log(cur_m);
		   let sl: string = this.calcStar(cur_m);
		   this.lagml = sl.split('|')[0];
		   this.lagal = sl.split('|')[1];
		   this.lagsl = sl.split('|')[2];
			
		},1000);
	  }, (err) => {
			//this.info = err;
	  });
	}, (err) => {
			this.info = JSON.stringify(err);
	  });
	
  }
   ionViewDidEnter() {
    console.log('ionViewDidEnter PanchangPage');
		var ayn = this.shareService.getRAYNM();
		let say: string = 'BV RAMAN';
		if(ayn) {
		    switch(Number(ayn))
			{
			   case 1:
					say = 'BV RAMAN';
					break;
				case 2:
					say = 'KP OLD';
					break;
				case 3:
					say = 'KP NEW';
					break;
				case 4:
					say = 'NC LAHIRI';
					break;
				case 5:
					say = 'KHULLAR';
					break;
				case 6:
					say = 'FAGAN BRADLEY';
					break;
				default:
					say = 'KP NEW';
					break;
			}
		}
		this.ayanINF = '<span><strong>AYANAMSA:</strong></span><span class="more" tappable (click)="chgayan()">'+say+'</span>';
    if(this.nrefs > 0) {
		this.info = 'Updating....';
  		var cd = new Date();
		var ct = cd.getHours().toString() + ':' + cd.getMinutes().toString();
		var startTime=moment(ct +':00', "HH:mm:ss");
		var endTime=moment(this.sunset + ':00 pm', "HH:mm:ss a");
		console.log('sunset=',endTime);
		var duration = moment.duration(endTime.diff(startTime));
		var hours = duration.asHours();
		console.log('total hrs=', hours);
		var minutes = duration.asMinutes()%60;	
        var totmins = hours*60 + minutes;		
		let ayanid: number = (this.shareService.getRAYNM()) ? Number(this.shareService.getRAYNM()) : 1;
		this.horoService.getProMoonPhase(this.getDms(this.clat), this.getDms(this.clng), cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes(), this.localtz, ayanid)
		   .subscribe(res3 => {
		   this.showPAN = true;
		   this.info = '';
		   this.nak = this.translate_func(res3['birthStar']);
		   var tithiRem = res3['tithiRem'];
		   console.log('tithiRem=', tithiRem);
		   var rem = Math.floor((Number(tithiRem)*Number(totmins))/100);
		   console.log('tithiRem in mins=', rem);
		   var tite = moment(startTime).add(rem, 'm');
		   this.tithi = this.translate_func(res3['tithi']) + ' till ' + tite.format('HH:mm');
		   console.log(res3['tithi'].toLowerCase());// + (res3['moonPhase'] == 'waxing') ? '-s' : '-k');
		   let ky: string = res3['tithi'].toLowerCase();
		   if(ky != 'purnima' && ky != 'amavasya') {
			ky = (res3['moonPhase'] == 'waxing') ? res3['tithi'].toLowerCase() + '-s' : res3['tithi'].toLowerCase() + '-k';
		   } 
		   console.log(ky);
		   this.lunapic = lunapics[ky];
		}, (err) => {
			this.info = JSON.stringify(err);
		});
	}
	this.nrefs++;
   }
  
  	calcStar(mins: number)
	{
		//console.log(mins);
		for(var i = 0; i < Object.keys(sublords).length; i++)
		{
			var nak = sublords[i];
			var degs = sublords[i].deg;
			var s_mins = parseInt(degs.split('-')[0].split('.')[0], 10)*60 + parseInt(degs.split('-')[0].split('.')[1]) + Number(degs.split('-')[0].split('.')[2])/60;
			var e_mins = parseInt(degs.split('-')[1].split('.')[0], 10)*60 + parseInt(degs.split('-')[1].split('.')[1]) + Number(degs.split('-')[1].split('.')[2])/60;
			//var deg_s = parseFloat(degs.split('-')[0].split('.')[0] + '.' + degs.split('-')[0].split('.')[1]);
			//var deg_e = parseFloat(degs.split('-')[1].split('.')[0] + '.' + degs.split('-')[1].split('.')[1]);
			//console.log(s_mins);
			//console.log(e_mins);
			if(mins >= s_mins && mins <= e_mins) {
			    //console.log(s_mins);
				//console.log(e_mins);
				return nak.sign + '|' + nak.star + '|' + nak.sub;
			}
		}
		return '-1';
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
  
calcTime(offset) {
var d = new Date();
var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
var nd = new Date(utc + (3600000*offset));

alert("The local time is " + nd.toLocaleString());
}
	translate_func(lord: string)
	{
	  if(this.shareService.getLANG() == 'en') return lord;
	  let trn: string = lord;
		switch(lord.toLowerCase())
		{
			case 'sun':
			case 'su':
				if(this.shareService.getLANG() == 'te') {
					trn = 'సూర్యుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'रवि ग्रह';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'சூரியன்';
				}
				break;
			case 'moon':
			case 'mo':
				if(this.shareService.getLANG() == 'te') {
					trn = 'చంద్రుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'चांद ग्रह';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'சந்திரன்';
				}
				break;
			case 'jupiter':
			case 'ju':
				if(this.shareService.getLANG() == 'te') {
					trn = 'బృహస్పతి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'बृहस्पति';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'குரு';
				}
				break;
			case 'mercury':
			case 'me':
				if(this.shareService.getLANG() == 'te') {
					trn = 'బుధుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'बुध गृह';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'புதன்';
				}
				break;
			case 'mars':
			case 'ma':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కుజుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मंगल ग्रह';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'செவ்வாய்';
				}
				break;
			case 'venus':
			case 've':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శుక్రుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'शुक्र ग्रह';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'சுக்கிரன்';
				}
				break;
			case 'saturn':
			case 'sa':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శనిగ్రహము';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'शनि ग्रह';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'சனி';
				}
				break;
			case 'rahu':
			case 'ra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'రాహు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'राहु ग्रह';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'ராகு';
				}
				break;
			case 'ketu':
			case 'ke':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కేతు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'केतु ग्रह';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'கேது';
				}
				break;
			case 'aries':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మేషరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मेष राशि';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'மேஷம்';
				}
				break;
			case 'taurus':
				if(this.shareService.getLANG() == 'te') {
					trn = 'వృషభరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'वृषभ राशि';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'ரிஷபம்';
				}
				break;
			case 'gemini':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మిధునరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'மிதுனம்';
				}
				break;
			case 'cancer':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కర్కాటకరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कर्क राशि';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'கடகம்';
				}
				break;
			case 'leo':
				if(this.shareService.getLANG() == 'te') {
					trn = 'సిమ్హరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'सिंह राशि';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'சிம்மம்';
				}
				break;
			case 'virgo':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కన్యరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कन्या राशि';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'கன்னி';
				}
				break;
			case 'libra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'తులారాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'तुला राशि';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'துலாம்';
				}
				break;
			case 'scorpio':
				if(this.shareService.getLANG() == 'te') {
					trn = 'వృశ్చికరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'वृश्चिक राशि';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'விருச்சிகம்';
				}
				break;
			case 'saggitarius':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ధనుస్సురాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'धनु राशि';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'தனுசு';
				}
				break;
			case 'capricorn':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మకరరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'மகரம்';
				}
				break;
			case 'aquarius':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కుంభరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कुंभ राशि';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'கும்பம்';
				}
				break;
			case 'pisces':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మీనరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मीन राशि';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'மீனம்';
				}
				break;
			case 'ashwini':
				if(this.shareService.getLANG() == 'te') {
					trn = 'అశ్వినీ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'अश्विनी';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'அஸ்வினி';
				}
				break;
			case 'bharani':
				if(this.shareService.getLANG() == 'te') {
					trn = 'భరణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'भरणी';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'பரணி';
				}
				break;
			case 'krittika':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కృత్తికా';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कृत्तिका';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'கிருத்திகை';
				}
				break;
			case 'rohini':
				if(this.shareService.getLANG() == 'te') {
					trn = 'రోహిణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'रोहिणी';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'ரோகிணி';
				}
				break;
			case 'mrigashira':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మ్రిగశిర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मृगशिरा';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'மிருகசிரீடம்';
				}
				break;
			case 'ardra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఆర్ద్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'आर्द्र';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'திருவாதிரை';
				}
				break;
			case 'punarvasu':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పునర్వసు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पुनर्वसु';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'புனர்பூசம்';
				}
				break;
			case 'pushya':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పుష్య';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पुष्य';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'பூசம்';
				}
				break;
			case 'ashlesha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఆశ్లేష';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'अश्लेषा';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'ஆயில்யம்';
				}
				break;
			case 'magha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మఘ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मघा';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'மகம்';
				}
				break;
			case 'purvaphalguni':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పూర్వఫల్గుణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पूर्वाफाल्गुनी';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'பூரம்';
				}
				break;
			case 'uttaraaphalguni':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఉత్తరాఫల్గుణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'उत्तराफाल्गुनी';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'உத்திரம்';
				}
				break;
			case 'hastha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'హస్త';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'हस्ता';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'அஸ்தம்';
				}
				break;
			case 'chitra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'చిత్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'चित्र';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'சித்திரை';
				}
				break;
			case 'swati':
				if(this.shareService.getLANG() == 'te') {
					trn = 'స్వాతి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'स्वाति';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'ஸ்வாதி';
				}
				break;
			case 'vishakha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'విశాఖ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'विशाखा';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'விசாகம்';
				}
				break;
			case 'anuradha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'అనురాధ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'अनुराधा';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'அனுஷம்';
				}
				break;
			case 'jyestha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'జ్యేష్ఠా';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'जयस्था';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'கேட்டை';
				}
				break;
			case 'mula':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మూల';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मूल';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'மூலம்';
				}
				break;
			case 'purvaashada':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పూర్వాషాఢ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पूर्वाषाढ़ा';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'பூராடம்';
				}
				break;
			case 'uttaraashada':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఉత్తరాషాఢ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'उत्तराषाढ़ा';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'உத்திராடம்';
				}
				break;
			case 'shravana':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శ్రావణ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'श्रवण';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'திருவோணம்';
				}
				break;
			case 'danishta':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ధనిష్ఠ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'धनिष्ठा';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'அவிட்டம்';
				}
				break;
			case 'shatabhisha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శతభిషా';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'शतभिषा';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'சதயம்';
				}
				break;
			case 'purvabhadra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పూర్వాభాద్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पूर्वभाद्र';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'பூரட்டாதி';
				}
				break;
			case 'uttarabhadra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఉత్తరాభాద్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'உத்திரட்டாதி';
				}
				break;
			case 'revati':
				if(this.shareService.getLANG() == 'te') {
					trn = 'రేవతి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'रेवती';
				} else if(this.shareService.getLANG() == 'ta') { 
					trn = 'ரேவதி';
				}
				break;
			default:
				trn = lord;
				break;
		}
		return trn;
	}
	
	showCal(evt) {
     evt.stopPropagation();
	    if(this.cal == 'Show Calendar') {
		 this.cal = 'Please wait..';
		 this.hideCALD = false;
		 if(this.fetchCAL == true) {
			var cd = new Date();
			let ayanid = 1;
			if(this.shareService.getRAYNM()) ayanid = Number(this.shareService.getRAYNM());
			this.horoService.getProBirthStar(this.getDms(this.clat), this.getDms(this.clng), cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes(), this.localtz, ayanid)
		   .subscribe(res => {
			this.horoService.getProStarConst(res['birthStar'], res['birthSign'], res['birthSignDeg'], this.localtz, ayanid)
			.subscribe(res => {
				this.info = '';
				this.publishReport(res);
				this.cal = 'Hide Calendar';
				this.fetchCAL = false;
				}, (err) => {
				this.info = JSON.stringify(err);
			}) ;
		  }, (err) => {
			this.info = err;
		  });
	   } else {
		 this.cal = 'Hide Calendar';
	   }	   
	  } else {
	    this.hideCALD = true;
		this.cal = 'Show Calendar';
	  }
	}
	
  publishReport(stars: any)
  {
	//this.showCal1 = true;
	this.mon = stars[0].date.split(',')[0].split(' ')[1];
	this.yer = stars[0].date.split(',')[1].split(' ')[0];
	this.svgCal = this.grid(6, this.device_width/6, this.device_width, stars);
	this.renderer.appendChild(this.hinduCal.nativeElement, this.svgCal);
	//this.mon = '';
	//this.yer = '';
	let c: boolean = false;
	for(var i = 0; i < stars.length; i++)
	{
		if(this.mon != stars[i].date.split(',')[0].split(' ')[1]) {
		   this.mon = stars[i].date.split(',')[0].split(' ')[1];
		   this.yer = stars[i].date.split(',')[1].split(' ')[0];
		   c = true;
		   break;
		}
	}
	//if(c) {
	    //this.showCal2 = true;
		//this.renderer.appendChild(this.hinduCal2.nativeElement, this.grid(6, this.device_width/6, this.device_width, stars));
	//}
  }
  
	grid(numberPerSide, size, pixelsPerSide, naks) {
	    var wks = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", pixelsPerSide);
		this.renderer.setAttribute(svg, "height", pixelsPerSide+25);
		this.renderer.setAttribute(svg, "viewBox", [0, 0, numberPerSide * size, 25 + (numberPerSide+1) * size].join(" "));
		var gm = document.createElementNS("http://www.w3.org/2000/svg", "g");
		var bt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.renderer.setAttribute(bt, "width", pixelsPerSide.toString());
		this.renderer.setAttribute(bt, "height", "25");
		this.renderer.setAttribute(bt, "border", "1");
		this.renderer.setAttribute(bt, "stroke", "#000000");
		this.renderer.setAttribute(bt, "fill", "#f9d35c");
		this.renderer.setAttribute(bt, "id", "b999");
		this.renderer.appendChild(gm, bt);
		let my: string = (this.shareService.getLANG() == 'en') ? mon_weeks[this.mon.toLowerCase()].split('|')[0] + ' '  + this.yer: (this.shareService.getLANG() == 'te') ? mon_weeks[this.mon.toLowerCase()].split('|')[1] + ' '  + this.yer : mon_weeks[this.mon.toLowerCase()].split('|')[2] + ' ' + this.yer;
		var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(text, document.createTextNode(my));
		this.renderer.setAttribute(text, "font-size", "15px");
		this.renderer.setAttribute(text, "font-weight", "bold");
		this.renderer.setAttribute(text, "x", "50%");
		this.renderer.setAttribute(text, "y", "12");
		this.renderer.setAttribute(text, "alignment-baseline", "middle");
		this.renderer.setAttribute(text, "text-anchor", "middle");
		this.renderer.setAttribute(text, "id", "t999");
		this.renderer.appendChild(gm, text);
		let bh: number = 25
        let cal: any = null;
		let pday: number = 0;
		let lDay: LunarDay = {
			tithi: '',
			star: '',
			lunarStrength: '',
			moonPhase: '',
			calX: '',
			calY: ''
		};
		var cd = new Date();
		for(var k = 0; k < 7; k++) {
			bt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			this.renderer.setAttribute(bt, "width", size.toString());
			this.renderer.setAttribute(bt, "height", size.toString());
			this.renderer.setAttribute(bt, "y", bh.toString());
			this.renderer.setAttribute(bt, "border", "1");
			this.renderer.setAttribute(bt, "stroke", "#000000");
			this.renderer.setAttribute(bt, "fill", "#f9d35c");
			this.renderer.setAttribute(bt, "id", "b999");
			this.renderer.appendChild(gm, bt);
			text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			this.renderer.appendChild(text, document.createTextNode((this.shareService.getLANG() == 'en') ? wks[k] : (this.shareService.getLANG() == 'te') ? mon_weeks[wks[k]].split('|')[1] : mon_weeks[wks[k]].split('|')[2]));
			this.renderer.setAttribute(text, "font-size", "15px");
			this.renderer.setAttribute(text, "font-weight", "bold");
			this.renderer.setAttribute(text, "alignment-baseline", "middle");
			this.renderer.setAttribute(text, "text-anchor", "middle");
			this.renderer.setAttribute(text, "x", (size/2).toString());
			this.renderer.setAttribute(text, "y", (size/2 + bh).toString());
			this.renderer.setAttribute(text, "id", "t999");
			bh += size;
			this.renderer.appendChild(gm, text);
			svg.appendChild(gm);
			let oW: WeekDay[] = [];
			oW = this.getWeekDays(naks, wks[k]);
			let dx: number = 0;
			for(let key of Object.keys(oW)) {
			    dx++;
				if(dx == 1 && wks[k] == 'SUN' && oW[key].dmon > 1)
				{
				    dx++;
				}
				else if(dx == 1 && wks[k] == 'MON' && oW[key].dmon > 2)
				{
				    dx++;
				}
				else if(dx == 1 && wks[k] == 'TUE' && oW[key].dmon > 3)
				{
				    dx++;
				}
				else if(dx == 1 && wks[k] == 'WED' && oW[key].dmon > 4)
				{
				    dx++;
				}
				else if(dx == 1 && wks[k] == 'THU' && oW[key].dmon > 5)
				{
				    dx++;
				}
				else if(dx == 1 && wks[k] == 'FRI' && oW[key].dmon > 6)
				{
				    dx++;
				}
				else if(dx == 1 && wks[k] == 'SAT' && oW[key].dmon > 7)
				{
				    dx++;
				}
				var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
			    var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
				this.renderer.setAttribute(box, "width", size.toString());
				this.renderer.setAttribute(box, "height", size.toString());
				this.renderer.setAttribute(box, "border", "1");
				this.renderer.setAttribute(box, "stroke", "#000000");
				this.renderer.setAttribute(box, "fill", "#ffffff");
				this.renderer.setAttribute(box, "id", "b" + k.toString() + dx.toString());
				this.renderer.setAttribute(box, "x", (size*dx).toString());
				this.renderer.setAttribute(box, "y", (size*k + 25).toString());
				this.renderer.appendChild(g, box);
//			   cal = this.getCal(naks, wks[k], i);
//			   if(cal) {
//					var dmon = cal.date.split(',')[0].split(' ')[2];
					var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
					this.renderer.appendChild(text1, document.createTextNode(key.split(',')[0].split(' ')[2]));
					this.renderer.setAttribute(text1, "font-size", "15px");
					this.renderer.setAttribute(text1, "font-weight", "bold");
					this.renderer.setAttribute(text1, "alignment-baseline", "middle");
					this.renderer.setAttribute(text1, "text-anchor", "middle");
					this.renderer.setAttribute(text1, "x", (size*dx + size/2).toString());
					this.renderer.setAttribute(text1, "y", (size*k + 25 + size/2).toString());
					this.renderer.setAttribute(text1, "id", "t1" + k.toString() + dx.toString());
					//var br = document.createElement("br");
					//this.renderer.appendChild(text1, document.createElement("br"));
					var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
					this.renderer.appendChild(text2, document.createTextNode(this.translate_func(oW[key].star)));
					this.renderer.setAttribute(text2, "font-size", "10px");
					this.renderer.setAttribute(text2, "font-weight", "bold");
					this.renderer.setAttribute(text2, "x", (size*dx + size/2).toString());
					this.renderer.setAttribute(text2, "y", (size*k + 25 + size/2 + 10).toString());
					this.renderer.setAttribute(text2, "alignment-baseline", "middle");
					this.renderer.setAttribute(text2, "text-anchor", "middle");
					this.renderer.setAttribute(text2, "id", "t2" + k.toString() + dx.toString());
					var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
					this.renderer.appendChild(text3, document.createTextNode(this.translate_func(oW[key].tithi)));
					this.renderer.setAttribute(text3, "font-size", "10px");
					this.renderer.setAttribute(text3, "font-weight", "bold");
					this.renderer.setAttribute(text3, "x", (size*dx + size/2).toString());
					this.renderer.setAttribute(text3, "y", (size*k + 25 + size/2 + 20).toString());
					this.renderer.setAttribute(text3, "alignment-baseline", "middle");
					this.renderer.setAttribute(text3, "text-anchor", "middle");
					this.renderer.setAttribute(text3, "id", "t3" + k.toString() + dx.toString());
					g.appendChild(text1);
					g.appendChild(text2);			   
					g.appendChild(text3);			   
					if(oW[key].tithi == 'Purnima' || oW[key].tithi == 'Amavasya' || oW[key].tithi == 'Sapthami') {
						var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
						this.renderer.setAttribute(image, "x", (size*dx).toString());
						this.renderer.setAttribute(image, "y", (size*k + 25).toString());
						this.renderer.setAttribute(image, "height", "16");
						this.renderer.setAttribute(image, "width", "16");
						this.renderer.setAttribute(image, "id", "i" + k.toString() + dx.toString());
						if(oW[key].tithi == 'Sapthami') {
							if(oW[key].moonPhase == 'waxing') {
								image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", moon_phases[oW[key].tithi].split(',')[0]);
							} else {
								image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", moon_phases[oW[key].tithi].split(',')[1]);
							}	
                        } else {
								image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", moon_phases[oW[key].tithi]);
                        }						
						g.appendChild(image);
					} else {
					}
					console.log('key', key.split(',')[0].split(' ')[2].trim());
					console.log(cd.getDate().toString().trim());
					let tcal: string = key.split(',')[0].split(' ')[2].trim();
					let tday: string = cd.getDate().toString().trim();
				    if(tcal == tday) {
					    console.log(key.split(',')[0].split(' ')[2].trim());
						 lDay.tithi = oW[key].tithi;
						 lDay.star = oW[key].star;
						 lDay.lunarStrength = (oW[key].lunarStrength.indexOf('Chandrastama') > -1) ? 'Chandrastama' : 'Bad';
						 lDay.moonPhase = oW[key].moonPhase;
						 lDay.calX = (size*dx).toString();
						 lDay.calY = (size*k + 25).toString();
						 this.tithi = oW[key].tithi;
						 this.nak = oW[key].star;
					}

				//}
				svg.appendChild(g);
			}
		}
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		    var bx = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			this.renderer.setAttribute(bx, "width", size.toString());
			this.renderer.setAttribute(bx, "height", size.toString());
			this.renderer.setAttribute(bx, "stroke", "#FF5733");
			this.renderer.setAttribute(bx, "stroke-width", "2");
			this.renderer.setAttribute(bx, "fill-opacity", "0.0");
			this.renderer.setAttribute(bx, "id", "bx1");
			this.renderer.setAttribute(bx, "x", lDay.calX);
			this.renderer.setAttribute(bx, "y", lDay.calY);
			this.renderer.appendChild(g, bx);
			svg.appendChild(g);

		console.log(svg);
		return svg;
	};
	
	getWeekDays(strs, wday)
	{
	  let oWDays: WeekDay[] = [];
	  let dmon: number = 0;
		for(let key of Object.keys(strs)) {
		  if(this.mon && strs[key].date.split(',')[0].split(' ')[1] != this.mon) continue;
		  dmon++;
		    if(strs[key].date.indexOf(wday) > -1) {
				let weekDay: WeekDay = {
				 dmon: dmon,
				 tithi: strs[key].tithi,
				 star: strs[key].star,
				 starStrength: strs[key].starStrength,
				 lunarStrength: strs[key].lunarStrength,
				 moonPhase: strs[key].moonPhase
			  };
			  oWDays[strs[key].date] = weekDay;
			}
		}
	  return oWDays;
	}
  getCal(strs, wday, i)
  {
    //console.log(wday);
	//console.log(i);
	//console.log(this.mon);
    let cal: any;
    let n: number = 0;
  	for(let key of Object.keys(strs)) {
	   //console.log(strs[key].date);
	   //console.log(strs[key].date.split(',')[0].split(' ')[1]);
	   if(this.mon && strs[key].date.split(',')[0].split(' ')[1] != this.mon) continue;
	   //console.log(strs[key].date);
	   if(strs[key].date.indexOf(wday) > -1) {
		 n++;
		 cal = strs[key];
	   }
	   if(n == i) return cal;
	}
  }
  chgayan()
  {
     var binf = {
					  dob: '',
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
					  ref: '3',
					};
     this.navCtrl.push(ChartSettingsPage, {binf: binf });
  }
  

}
