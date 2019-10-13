import { Component, Renderer2, AfterViewInit, ViewChild, ElementRef, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import {FormBuilder, FormGroup} from '@angular/forms';
import { HoroscopeService } from '../../app/horoscope.service';
import { ShareService } from '../../app/share.service'
import { AppRate } from '@ionic-native/app-rate';
import * as rashis from '../horoscope/rashis.json';
import * as signs_short from '../horoscope/signs_short.json';
import * as rashi_lords from '../horoscope/rashi_lords.json';
import * as ruler_name from '../horoscope/ruler_name.json';
import * as friend_pl from '../horoscope/friend_pl.json';
import * as enemy_pl from '../horoscope/enemy_pl.json';
import * as neutral_pl from '../horoscope/neutral_pl.json';
import * as nakshatras from '../horoscope/nakshatras.json';
import * as nakshatra_o from '../horoscope/nakshatra_o.json';
import * as vasya from '../horoscope/vasya.json';
/**
 * Generated class for the LovehoroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'page-lovehoro',
  templateUrl: 'lovehoro.html',
})
export class LovehoroPage {
	@ViewChild('gridInfo') gridInfo;

  personalDetailsForm: FormGroup;
  birthStar: string;
  birthSign: string;
  partnerBirthStar: string;
  partnerBirthSign: string;
  birthSignDeg: string;
  partnerBirthSignDeg: string;
  info: string = '';
  strii: string = ''
  showList: boolean;
  showGrid: boolean;
  mdob: string = '';
  wdob: string = '';
  mstar: string = '';
  wstar: string = '';
  mpl: string = '';
  wpl: string = '';
  maml: string = '';
  waml: string = '';
  mchr: string = '';
  wchr: string = '';
  nadi: string = '';
  bha: string = '';
  gana: string = '';
  grha: string = '';
  yoni: string = '';
  tara: string = '';
  vsya: string = '';
  vrna: string = '';
  totl: string = '';
  mah: string = '';
  vedh: string = '';
  raju: string = '';
  attr: string = '';
  msign: string = '';
  wsign: string = '';
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public horoService: HoroscopeService, public renderer: Renderer2, private appRate: AppRate, public shareService: ShareService, public admob: AdMobFree) {
    platform.ready().then(() => {
  this.appRate.preferences = {
        displayAppName: '126 Astrology',
        usesUntilPrompt: 2,
		simpleMode: true,
        promptAgainForEachNewVersion: false,
        storeAppURL: {
          ios: '1216856883',
          android: 'market://details?id=com.mypubz.eportal'
        },
        customLocale: {
          title: 'Do you enjoy %@?',
          message: 'If you enjoy using %@, would you mind taking a moment to rate it? Thanks so much!',
          cancelButtonLabel: 'No, Thanks',
          laterButtonLabel: 'Remind Me Later',
          rateButtonLabel: 'Rate It Now'
        },
        callbacks: {
          onRateDialogShow: function(callback){
            console.log('rate dialog shown!');
          },
          onButtonClicked: function(buttonIndex){
            console.log('Selected index: -> ' + buttonIndex);
          }
        }
      };
 
      // Opens the rating immediately no matter what preferences you set
      this.appRate.promptForRating(true);
	  this.showBanner();
    });

    this.personalDetailsForm = formBuilder.group({
		dob: '',
		partnerdob: ''
	});
	this.showGrid = false;
	this.showList = true;
  }
    showBanner() {

        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: false, 
            autoShow: true,
            id: 'ca-app-pub-8442845715303800/5393135865'
        };

        this.admob.banner.config(bannerConfig);

        this.admob.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LovehoroPage');
  }
  save() {
  this.info = 'please wait...';
  if(this.personalDetailsForm.controls['dob'].value.length == 0) {
	    this.info = 'Please enter Man Date of Birth';
		return;
		}
  if(this.personalDetailsForm.controls['partnerdob'].value.length == 0) {
	    this.info = 'Please enter Women Date Of Birth';
		return;
		}
	this.horoService.getBirthStars(this.personalDetailsForm.controls['dob'].value, this.personalDetailsForm.controls['partnerdob'].value)
       .subscribe(res => {
	   this.birthStar = res['birthStar'];
	   this.birthSign = res['birthSign'];
	   this.birthSignDeg = res['birthSignDeg'];
	     this.partnerBirthStar = res['partnerBirthStar'];
		 this.partnerBirthSign = res['partnerBirthSign'];
		 this.partnerBirthSignDeg = res['partnerBirthSignDeg'];
		 this.getLoveReport();
      }, (err) => {
        this.info = err;
      }) ;
  }
  getLoveReport()
  {
    this.showList = false;
	this.showGrid = true;
	this.msign = this.translate(this.birthSign);
	this.wsign = this.translate(this.partnerBirthSign);
	this.mdob = this.personalDetailsForm.controls['dob'].value;
	this.wdob = this.personalDetailsForm.controls['partnerdob'].value;
	var bS = null;
	var partnerbS = null;
	this.strii = 'analyzing...';
	console.log(this.birthSign);
	console
	for(var i = 0; i < Object.keys(nakshatras).length; i++)
	{
		var nak = nakshatras[i];	
		if(nak.name.toLowerCase() == this.birthStar.toLowerCase())
		{
		   bS = nak;
		}
		if(nak.name.toLowerCase() == this.partnerBirthStar.toLowerCase())
		{
			partnerbS = nak;
		}
		if(bS != null && partnerbS != null)
		{
		   var akpts = 0;
		    this.mstar =  this.translate(bS.name);
			this.wstar = this.translate(partnerbS.name);
			this.mpl = this.translate(bS.ruler);
			this.wpl = this.translate(partnerbS.ruler);
			this.maml = this.translate(bS.rulingAnimal);
			this.waml = this.translate(partnerbS.rulingAnimal);
			this.mchr = bS.characteristics;
			this.wchr = partnerbS.characteristics;
		    var res = '';
			var html = '';
			//var diff = Math.abs(bs.order - partnerbS.order);
			//this.add2ColRow(bS.name, partnerbS.name);
			//this.add1ColTitleRow('Ruling Planet');
			//this.add2ColRow(bS.ruler, partnerbS.ruler);
			//this.add1ColTitleRow('Ruling Animal');
			//this.add2ColRow(bS.rulingAnimal, partnerbS.rulingAnimal);
			//this.add1ColTitleRow('Characteristics');
			//this.add2ColRow(bS.characteristics, partnerbS.characteristics);
			//this.add1ColTitleRow('Compatibility Report');
			//var html = '<ion-row><ion-col><h2>' + bS.name + '</h2></ion-col><ion-col><h2>' + partnerbS.name + '</h2></ion-col></ion-row>';
			//html += '<ion-row><ion-col><h2>Ruling Planet</h2></ion-col></ion-row>';
			//html += '<ion-row><ion-col>' + bS.ruler + '</ion-col><ion-col>' + partnerbS.ruler + '</ion-col></ion-row>';
			//html += '<ion-row><ion-col><h2>Ruling Animal</h2></ion-col></ion-row>';
			//html += '<ion-row><ion-col>' + bS.rulingAnimal + '</ion-col><ion-col>' + partnerbS.rulingAnimal + '</ion-col></ion-row>';
			//html += '<ion-row><ion-col><h2>Characteristics</h2></ion-col></ion-row>';
			//html += '<ion-row><ion-col>' + bS.characteristics + '</ion-col><ion-col>' + partnerbS.characteristics + '</ion-col></ion-row>';
			//html += '<ion-row><ion-col><h2>Compatibility Report</h2></ion-col></ion-row>';
			//this.add1ColTitleRow('Respect / Strii Diirgha');
			//html = 'The technique used to determine whether a couple will be inclined to respect each other is known as Strii Diirgha. The Nakshatra (Moons //asterism) of the man should be at least 14 away from the womans. If it is not at least 14 away, problems will be likely. If it is not at least 14 //away, but only nine to thirteen away, then the problems will be somewhat reduced.<br\>When there are at least 14 Nakshatras from the womans from //the mans the shortest flow of energy is from the man to the woman, allowing him to naturally play the masculine role and her to play the //feminine. When there is less than 14 the shortest flow of energy is from her to him. This creates a flow of energy that forces her to play the //masculine role and him the feminine. The result is a short circuit in their relationship. When there is less then 9 Nakshatras separating them //this manifests at its worse.\n';
			var stri = 1;
			if(bS.order != partnerbS.order) {
			while(stri <= 27)
			{
			  var snak;
			  (partnerbS.order + stri > 27) ? snak = nakshatra_o[partnerbS.order + stri - 27]: snak = nakshatra_o[partnerbS.order+stri]
			  if(snak == partnerbS.name) break;
			  stri++;
			  
			}
			} else {
			 stri = 0;
			}
			res = (stri >= 14) ? (this.shareService.getLANG() == 'en') ? 'Good': (this.shareService.getLANG() == 'te') ? 'మంచిది' : 'अच्छा है' : (this.shareService.getLANG() == 'en') ? 'Not Good' :(this.shareService.getLANG() == 'te') ? 'మంచిది కాదు': 'अच्छा नही';
			if(this.shareService.getLANG() == 'en') {
				html = 'The birthstar ' + bS.name + ' is ' + stri + ' nakshatras away from ' + partnerbS.name + ' which is ' + res + '\n';
			} else if(this.shareService.getLANG() == 'te') {
				html = 'వరుని  జన్మ నక్షత్రమ్  వధువు   జన్మ నక్షత్రమ్ నుంచి' + stri + ' నక్షత్రాల దూరం లో ఉంది  అది ' + res + '\n';
			} else if(this.shareService.getLANG() == 'hi') { 
				html = 'दूल्हा जन्म नक्षत्र  दुल्हन  जन्म नक्षत्र  से' + stri + ' नक्षत्र आगे है ये ' + res + '\n';
			}
            this.strii = html;
			
			//this.add1ColRow(html);
			//html += '</ion-col></ion-row>';
			//this.add1ColTitleRow('Wavelength / Ashta Kutas');
			//html = 'The technique that is used to determine your Wavelength points is known as Ashta Kuta, heap of eight. Eight measurements are taken //between your Moons. These eight measurements are known as Nadi Kuta, Bha Kuta, Gana Kuta, Graha Maitram Kuta, Yoni Kuta, Tara Kuta, Vasya Kuta //and Varna Kuta, which are each respectively worth 8, 7, 6, 5, 4, 3, 2 and 1 point.';
			//this.add1ColRow(html);
			var pts = 0;
			res = (this.shareService.getLANG() == 'en') ? 'Not Good': (this.shareService.getLANG() == 'te') ? 'మంచిది కాదు' : 'अच्छा नही';
			if(bS.nadikuta != partnerbS.nadikuta) {
			   pts = 8;
			   res = (this.shareService.getLANG() == 'en') ? 'Good': (this.shareService.getLANG() == 'te') ? 'మంచిి' : 'अच्छा है';
			}
			akpts += pts;
			this.nadi = pts + ' points ' + res;
			pts = 0;
			res = '';
			console.log('Bha Kuta');
			//this.add2ColRow('Excess / Nadi Kuta', pts + ' points ' + res );
			console.log(this.birthSign);
			var ssgn = signs_short[this.birthSign.toLowerCase()];
			console.log(ssgn);
			var num1 = rashis[ssgn].split('|')[0];
			var rashiNum = Number(num1);
			console.log(rashiNum);
			console.log(this.partnerBirthSign);
			ssgn = signs_short[this.partnerBirthSign.toLowerCase()];
			num1 = rashis[ssgn].split('|')[0];
			var partnerRashiNum = Number(num1);
			console.log(partnerRashiNum);
			var iscomp = 0;
			var s1 = (rashiNum + 2) > 12 ? (rashiNum + 2) - 12: rashiNum + 2;
			var s2 = (partnerRashiNum + 2) > 12 ? (partnerRashiNum + 2) - 12 : partnerRashiNum + 2;
			var s3 = (rashiNum + 3) > 12 ? (rashiNum + 3) - 12 : rashiNum + 3;
			var s4 = (partnerRashiNum + 3) > 12 ? (partnerRashiNum + 3) - 12 : partnerRashiNum + 3;
			var s5 = (rashiNum + 6) > 12 ? (rashiNum + 6) - 12 : rashiNum + 6;
			var s6 = (partnerRashiNum + 6) > 12 ? (partnerRashiNum + 6) - 12 : partnerRashiNum + 6;
			var s7 = (rashiNum + 9) > 12 ? (rashiNum + 9) - 12: rashiNum + 9;
			var s8 = (partnerRashiNum + 9) > 12 ? (partnerRashiNum + 9) - 12 : partnerRashiNum + 9;
			var s9 = (rashiNum + 10) > 12 ? (rashiNum + 10) - 12 : rashiNum + 10;
			var s10 = (partnerRashiNum + 10) > 12 ? (partnerRashiNum + 10) - 12 : partnerRashiNum + 10;
			if( s1 == partnerRashiNum || s2 == rashiNum) iscomp = 1;
			else if( s3 == partnerRashiNum || s4 == rashiNum) iscomp = 1;
			else if( s5 == partnerRashiNum || s6 == rashiNum) iscomp = 1;
			else if( s7 == partnerRashiNum || s8 == rashiNum) iscomp = 1;
			else if( s9 == partnerRashiNum || s10 == rashiNum) iscomp = 1;
			
			var s11 = (rashiNum + 1) > 12 ? (rashiNum + 1) - 12 : rashiNum + 1;
			var s12 = (partnerRashiNum + 1) > 12 ? (partnerRashiNum + 1) - 12 : partnerRashiNum + 1;
			var s13 = (rashiNum + 4) > 12 ? (rashiNum + 4) - 12: rashiNum + 4;
			var s14 = (partnerRashiNum + 4) > 12 ? (partnerRashiNum + 4) - 12: partnerRashiNum + 4;
			var s15 = (rashiNum + 5) > 12 ? (rashiNum + 5) - 12 : rashiNum + 5;
			var s16 = (partnerRashiNum + 5) > 12 ? (partnerRashiNum + 5) - 12: partnerRashiNum + 5;
			var s17 = (rashiNum + 7) > 12 ? (rashiNum + 7) - 12 : rashiNum + 7;
			var s18 = (partnerRashiNum + 7) > 12 ? (partnerRashiNum + 7) - 12: partnerRashiNum + 7;
			var s19 = (rashiNum + 8) > 12 ? (rashiNum + 8) - 12 : rashiNum + 8;
			var s20 = (partnerRashiNum + 8) > 12 ? (partnerRashiNum + 8) - 12 : partnerRashiNum + 8;
			var s21 = (rashiNum + 11) > 12 ? (rashiNum + 11) - 12: rashiNum + 11;
			var s22 = (partnerRashiNum + 11) > 12 ? 12 - (partnerRashiNum + 11) : partnerRashiNum + 11;
			var rem = '';
			if( s11 == partnerRashiNum || s12 == rashiNum) {
			  iscomp = 0;
			  if(this.shareService.getLANG() == 'en') {
				rem = 'The second house is the moon sign of either man/women rashi while counted from man/women rashi which is unfavourable.'
			  }else if(this.shareService.getLANG() == 'te') {
				rem = 'వధువు లేదా వరుని జన్మ రశి వధువు లేదా వరుని జన్మ రశి నుంచి  2 house లో ఉంది ఇది ప్రతికూలమైనది.'
			  } else if(this.shareService.getLANG() == 'hi') {
				rem = 'वधू या वर जन्म राशि वधू या वर जन्म राशि  से  2 house में है जो प्रतिकूल है.'
			  }
			}
			else if( s13 == partnerRashiNum || s14 == rashiNum){
 			  iscomp = 0;
			  if(this.shareService.getLANG() == 'en') {
				rem = 'The fifth house is the moon sign of either man/women rashi while counted from man/women rashi which is unfavourable'
			  }else if(this.shareService.getLANG() == 'te') {
				rem = 'వధువు లేదా వరుని జన్మ రశి వధువు లేదా వరుని జన్మ రశి నుంచి  5 house లో ఉంది ఇది ప్రతికూలమైనది.'
			  } else if(this.shareService.getLANG() == 'hi') {
				rem = 'वधू या वर जन्म राशि वधू या वर जन्म राशि  से  5 house में है जो प्रतिकूल है.'
			  }
			}
			else if( s15 == partnerRashiNum || s16 == rashiNum){
			  iscomp = 0;
			  if(this.shareService.getLANG() == 'en') {
				rem = 'The sixth house is the moon sign of either man/women rashi while counted from man/women rashi which is unfavourable.'
			  }else if(this.shareService.getLANG() == 'te') {
				rem = 'వధువు లేదా వరుని జన్మ రశి వధువు లేదా వరుని జన్మ రశి నుంచి  6 house లో ఉంది ఇది ప్రతికూలమైనది.'
			  } else if(this.shareService.getLANG() == 'hi') {
				rem = 'वधू या वर जन्म राशि वधू या वर जन्म राशि  से  6 house में है जो प्रतिकूल है.'
			  }
			}
			else if( s17 == partnerRashiNum || s18 == rashiNum){
    		  iscomp = 0;
			  if(this.shareService.getLANG() == 'en') {
				rem = 'The eighth house is the moon sign of either man/women rashi while counted from man/women rashi which is unfavourable.'
			  }else if(this.shareService.getLANG() == 'te') {
				rem = 'వధువు లేదా వరుని జన్మ రశి వధువు లేదా వరుని జన్మ రశి నుంచి  8 house లో ఉంది ఇది ప్రతికూలమైనది.'
			  } else if(this.shareService.getLANG() == 'hi') {
				rem = 'वधू या वर जन्म राशि वधू या वर जन्म राशि  से  8 house में है जो प्रतिकूल है.'
			  }
		    }
			else if( s19 == partnerRashiNum || s20 == rashiNum) {
			  iscomp = 0;
			  if(this.shareService.getLANG() == 'en') {
				rem = 'The ninth house is the moon sign of either man/women rashi while counted from man/women rashi which is unfavourable.'
			  }else if(this.shareService.getLANG() == 'te') {
				rem = 'వధువు లేదా వరుని జన్మ రశి వధువు లేదా వరుని జన్మ రశి నుంచి  9 house లో ఉంది ఇది ప్రతికూలమైనది.'
			  } else if(this.shareService.getLANG() == 'hi') {
				rem = 'वधू या वर जन्म राशि वधू या वर जन्म राशि  से  9 house में है जो प्रतिकूल है.'
			  }
			}
			else if( s21 == partnerRashiNum || s22 == rashiNum) {
			  iscomp = 0;
			  if(this.shareService.getLANG() == 'en') {
				rem = 'The Twlefth house is the moon sign of either man/women rashi while counted from man/women rashi which is unfavourable.'
			  }else if(this.shareService.getLANG() == 'te') {
				rem = 'వధువు లేదా వరుని జన్మ రశి వధువు లేదా వరుని జన్మ రశి నుంచి  12 house లో ఉంది ఇది ప్రతికూలమైనది.'
			  } else if(this.shareService.getLANG() == 'hi') {
				rem = 'वधू या वर जन्म राशि वधू या वर जन्म राशि  से  12 house में है जो प्रतिकूल है.'
			  }
			}
			if(iscomp == 1) {
			  pts = 7; 
			  rem = (this.shareService.getLANG() == 'en') ? 'Good': (this.shareService.getLANG() == 'te') ? 'మంచిి' : 'अच्छा है';
			} else {
			  pts = 0;
			}
			akpts += pts;
			//this.add2ColRow('Constructivism / Bha Kuta', pts + ' points ' + rem );
			this.bha = pts + ' points ' + rem;
			pts = 0;
			rem = 'Bad';
			if(bS.ganakuta == partnerbS.ganakuta) {
			    pts = 6;
				rem = (this.shareService.getLANG() == 'en') ? 'Good': (this.shareService.getLANG() == 'te') ? 'మంచిి' : 'अच्छा है';
			} else if(partnerbS.gnakuta == 'divine' && bS.ganakuta == 'human'){
			   pts = 3;
			   rem = (this.shareService.getLANG() == 'en') ? 'Average': (this.shareService.getLANG() == 'te') ? 'అవేరేజ్' : 'मध्यम';
			} else if(partnerbS.ganakuta == 'divine' && bS.ganakuta == 'daemon') {
			   pts = 1;
			   rem = (this.shareService.getLANG() == 'en') ? 'Below Average': (this.shareService.getLANG() == 'te') ? 'సగటు కన్నా తక్కువ' : 'औसत से कम';
			} else if(partnerbS.ganakuta == 'human' && bS.ganakuta == 'divine') {
			   pts = 5;
			   rem = 'OK';
			} else if (partnerbS.gnakuta == 'human' && bS.ganakuta == 'daemon') {
			   pts = 3;
			   rem = (this.shareService.getLANG() == 'en') ? 'Average': (this.shareService.getLANG() == 'te') ? 'అవేరేజ్' : 'मध्यम';
			} else if(partnerbS.ganakuta == 'daemon' && bS.ganakuta != 'daemon') {
			   pts = 0;
			   rem = (this.shareService.getLANG() == 'en') ? 'Bad': (this.shareService.getLANG() == 'te') ? 'మంచిది కాదు' : 'बुरा';
			}
			rem += ' According to the classical texts, Gana Kuta keeps the couple ever young, happy and increasing in love for one another';
			//this.add2ColRow('Temperment / Gana Kuta', pts + ' points ' + rem );
			akpts += pts;
			this.gana = pts + ' points ' + rem;
			pts = 0;
			rem = '';
			if( s5 == partnerRashiNum || s6 == rashiNum) {
			  pts = 5;
			  rem = 'Good';
 			  //this.add2ColRow('Friendship / Graha mitram Kuta', pts + ' points ' + rem );
			}
			else {
				var sign1 = signs_short[this.birthSign.toLowerCase()];
				var f1 = friend_pl[rashi_lords[sign1]].split('\|');  
				var sign2 = signs_short[this.partnerBirthSign.toLowerCase()];
				var f2 = friend_pl[rashi_lords[sign2]].split('\|'); 
				var n1 = neutral_pl[rashi_lords[sign1]].split('\|');
				var n2 = neutral_pl[rashi_lords[sign2]].split('\|');
				var e1 = enemy_pl[rashi_lords[sign1]].split('\|');
				var e2 = enemy_pl[rashi_lords[sign2]].split('\|');
				var bsf = 0;
				var pbsf = 0;
				var bsn = 0;
				var pbsn = 0;
				var bse = 0;
				var pbse = 0;
				for(var x = 0; x < f1.length; x++)
				{
					if(rashi_lords[sign2] == ruler_name[f1[x]]) {
					  bsf = 1;
					  break;
					}
				}
				if(n1.length == 0)
				{
				   if(rashi_lords[sign2] == n1) {
					 bsn = 1;
				   }
				} else {
				  for(var k=0; k < n1.length; k++) {
					if(rashi_lords[sign2] == n1[k]) {
					  bsn = 1;
					  break;
					}
				  }
				}
				if(n2.length == 0)
				{
				   if(rashi_lords[sign1] == n2) {
					 pbsn = 1;
				   }
				} else {
				  for(var k1=0; k1 < n2.length; k1++) {
					if(rashi_lords[sign1] == n2[k1]) {
					  pbsn = 1;
					  break;
					}
				  }
				}
				if(e1.length == 0)
				{
				   if(rashi_lords[sign2] == e1) {
					 bse = 1;
				   }
				} else {
				  for(var y=0; y < n1.length; y++) {
					if(rashi_lords[sign2] == e1[y]) {
					  bse = 1;
					  break;
					}
				  }
				}
				if(e2.length == 0)
				{
				   if(rashi_lords[sign2] == e2) {
					 pbse = 1;
				   }
				} else {
				  for(var k2=0; k2 < e2.length; k2++) {
					if(rashi_lords[sign2] == e2[k2]) {
					  pbse = 1;
					  break;
					}
				  }
				}
				
				for(var j = 0; j < f2.length; j++)
				{
					if(rashi_lords[sign1] == ruler_name[f2[j]]) {
					  pbsf = 1;
					  break;
					}
				}
				if(rashi_lords[sign1] == rashi_lords[sign2]) {
				  pts = 5;
				  rem = (this.shareService.getLANG() == 'en') ? 'Good': (this.shareService.getLANG() == 'te') ?  'మంచిి' : 'अच्छा है';
				} else if (bsf == 1 && pbsf == 1) {
				  pts = 5;
				  rem = (this.shareService.getLANG() == 'en') ? 'Good': (this.shareService.getLANG() == 'te') ?  'మంచిి' : 'अच्छा है';
				} else if((bsf == 1 && pbsn == 1) || (bsn == 1 && pbsf == 1)) {
				  pts = 4;
				  rem = 'OK';
				} else if(bsn == 1 && pbsn == 1) {
				  pts = 3;
			      rem = (this.shareService.getLANG() == 'en') ? 'Average': (this.shareService.getLANG() == 'te') ? 'అవేరేజ్' : 'मध्यम';
				} else if((bse == 1 && pbsf == 1) || (pbse == 1 && bsf == 1)) {
				  pts = 1;
			      rem = (this.shareService.getLANG() == 'en') ? 'Below Average': (this.shareService.getLANG() == 'te') ? 'సగటు కన్నా తక్కువ' : 'औसत से कम';
				} else if((bse == 1 && pbsn == 1) || (pbse == 1 && bsn == 1)) {
				  pts = 0.5;
			      rem = (this.shareService.getLANG() == 'en') ? 'Below Average': (this.shareService.getLANG() == 'te') ? 'సగటు కన్నా తక్కువ' : 'औसत से कम';
				} else if(bse == 1 && pbse == 1) {
				  pts = 0;
			      rem = (this.shareService.getLANG() == 'en') ? 'Not Good': (this.shareService.getLANG() == 'te') ? 'మంచిది కాదు' : 'अच्छा नही';
				}
				//this.add2ColRow('Friendship / Graha mitram Kuta', pts + ' points ' + rem );
			}
			akpts += pts;
			this.grha = pts + ' points ' + rem;
			pts = 0;
			rem = '';
			if(bS.rulingAnimal == partnerbS.rulingAnimal) {
			   pts = 4;
			   rem = 'Good';
			   //this.add2ColRow('Instrinctive Compatibility/  Yoni Kuta', pts + ' points ' + rem);
			} else {
			  var bsfanm = bS.friendlyAnimals.split(',');
			  if(bsfanm.length > 0) {
			    for(var v = 0; v < bsfanm.length; v++) {
				  if(partnerbS.rulingAnimal == bsfanm[v]) {
				    pts = 3;
					rem = 'OK';
					break;
				  }
				}
			  }
			  var pbsfanm = partnerbS.friendlyAnimals.split(',');
			  if(pbsfanm.length > 0) {
			    for(var v1 = 0; v1 < pbsfanm.length; v1++) {
				  if(bS.rulingAnimal == pbsfanm[v1]) {
				    pts = 3;
					rem = 'OK';
					break;
				  }
				}
			  }
			  if(pts == 0) {
				  var bsnanm = bS.neutralAnimals.split(',');
				  if(bsnanm.length > 0) {
					for(var k3 = 0; k3 < bsnanm.length; k3++) {
					  if(partnerbS.rulingAnimal == bsnanm[k3]) {
						pts = 2;
						rem = (this.shareService.getLANG() == 'en') ? 'Average': (this.shareService.getLANG() == 'te') ? 'అవేరేజ్' : 'मध्यम';
						break;
					  }
					}
				  }
				  var pbsnanm = partnerbS.neutralAnimals.split(',');
				  if(pbsnanm.length > 0) {
					for(var k4 = 0; k4 < pbsnanm.length; k4++) {
					  if(bS.rulingAnimal == pbsnanm[k4]) {
						pts = 2;
						rem = (this.shareService.getLANG() == 'en') ? 'Average': (this.shareService.getLANG() == 'te') ? 'అవేరేజ్' : 'मध्यम';
						break;
					  }
					}
				  }
			  }
			  if(pts == 0) {
				  var bsunfanm = bS.unfriendlyAnimals.split(',');
				  if(bsunfanm.length > 0) {
					for(var k5 = 0; k5 < bsunfanm.length; k5++) {
					  if(partnerbS.rulingAnimal == bsunfanm[k5]) {
						pts = 1;
						rem = (this.shareService.getLANG() == 'en') ? 'Below Average': (this.shareService.getLANG() == 'te') ? 'సగటు కన్నా తక్కువ' : 'औसत से कम';
						break;
					  }
					}
				  }
				  var pbsunfanm = partnerbS.unfriendlyAnimals.split(',');
				  if(pbsunfanm.length > 0) {
					for(var k6 = 0; k6 < pbsunfanm.length; k6++) {
					  if(bS.rulingAnimal == pbsunfanm[k6]) {
						pts = 1;
						rem = (this.shareService.getLANG() == 'en') ? 'Below Average': (this.shareService.getLANG() == 'te') ? 'సగటు కన్నా తక్కువ' : 'औसत से कम';
						break;
					  }
					}
				  }
			  }
			  //this.add2ColRow('Instrinctive Compatibility/  Yoni Kuta', pts + ' points ' + rem);
			  
			}
			akpts += pts;
			rem += 'The technique used to determine the instinctive compatibility is known as Yoni Kuta. Yoni means, source,and refers to the sexual organ from which we are created. The Nakshatra of the Moon is related to an animal, which symbolizes the primal/instinctive nature of a person';
			this.yoni = pts + ' points ' + rem;
			pts = 0;
			rem = '';
			var cnt = 1;
			while(cnt <= 27)
			{
			  var nakk;
			  (bS.order + cnt > 27) ? nakk = nakshatra_o[bS.order + cnt - 27]: nakk = nakshatra_o[bS.order+cnt]
			  if(nakk == partnerbS.name) break;
			  cnt++;
			  
			}
			var cf = cnt%9;
			if(cf == 0 || cf == 1 || cf == 2 || cf == 4 || cf == 6 || cf == 8) {
				pts = 3;
			    rem = (this.shareService.getLANG() == 'en') ? 'Good': (this.shareService.getLANG() == 'te') ? 'మంచి' : 'अच्छा';
			}
			rem += '  is said to grant luck and long life. When Tara Kuta is met the mans Nakshatra falls in an auspicious Nakshatra in respect to the womans, thereby insuring that the woman is feels comfortable and good with receiving any good that the male has to offer'
		   //this.add2ColRow('Comfort/  Tara Kuta', pts + ' points ' + rem );
		   akpts += pts;
		   this.tara = pts + ' points ' + rem;
		   pts = 0;
		   rem = '';
		   //var bSDeg = parseFloat(this.birthSignDeg);
		   //var pbSDeg = parseFloat(this.partnerBirthSignDeg);
		   
		   var manv = vasya[this.birthSign.toLowerCase()];
		   var womenv = vasya[this.partnerBirthSign.toLowerCase()];
		   
		   var mvs = manv.split('|');
		   var wvs = womenv.split('|');
		   for(var vs1 = 0; vs1 < mvs.length; vs1++)
		   {
		     for(var vs2 = 0; vs2 < wvs.length; vs2++)
			 {
			    if(mvs[vs1] == wvs[vs2]) {
				  pts = 2;
			      rem = (this.shareService.getLANG() == 'en') ? 'Good': (this.shareService.getLANG() == 'te') ? 'మంచి' : 'अच्छा';
				} else{
				   pts = this.calcVasya(mvs[vs1], wvs[vs2]);
				   if(pts == 1) rem = 'OK';
				   else if(pts != 0) rem = (this.shareService.getLANG() == 'en') ? 'Average': (this.shareService.getLANG() == 'te') ? 'అవేరేజ్' : 'मध्यम';
				}
				if(pts > 0) break;
			 }
			 if(pts > 0) break;
		   }
		   //this.add2ColRow('Innate Giving / Vasya Kuta', pts + ' points ' + rem );
		   akpts += pts;
		   this.vsya = pts + ' points ' + rem;
		   pts = 0;
		   rem = '';
		   var mvarna = '';
		   var wvarna = ''
		   if(this.birthSign.toLowerCase() == 'cancer' || this.birthSign.toLowerCase() == 'scorpio' || this.birthSign.toLowerCase() == 'pisces') mvarna = 'priests';
		   else if(this.birthSign.toLowerCase() == 'aries' || this.birthSign.toLowerCase() == 'leo' || this.birthSign.toLowerCase() == 'sagittarius') mvarna = 'warriors';
		   else if(this.birthSign.toLowerCase() == 'libra' || this.birthSign.toLowerCase() == 'aquarius' || this.birthSign.toLowerCase() == 'gemini') mvarna = 'merchants';
		   else mvarna = 'labourers';
		   if(this.partnerBirthSign.toLowerCase() == 'cancer' || this.partnerBirthSign.toLowerCase() == 'scorpio' || this.partnerBirthSign.toLowerCase() == 'pisces') wvarna = 'priests';
		   else if(this.partnerBirthSign.toLowerCase() == 'cancer' || this.partnerBirthSign.toLowerCase() == 'scorpio' || this.partnerBirthSign.toLowerCase() == 'pisces') wvarna = 'warriors';
		   else if(this.partnerBirthSign.toLowerCase() == 'cancer' || this.partnerBirthSign.toLowerCase() == 'scorpio' || this.partnerBirthSign.toLowerCase() == 'pisces') wvarna = 'merchants';
		   else wvarna = 'labourers';
		   
		   if(mvarna == wvarna) {
		     pts = 1;
			 rem = 'OK';
		   } else if(mvarna != 'labourers' && (wvarna == 'warriors' || wvarna == 'merchants')) {
		     pts = 1;
			 rem = 'OK';
		   }
		   //this.add2ColRow('Mutation / Varna Kuta', pts + ' points ' + rem);
		   akpts += pts;
		   this.vrna = pts + ' points ' + rem;
		   if(akpts > 19) rem = 'Good';
		   else if(akpts > 15 && akpts < 20) rem = 'OK';
		   else {
			rem = (this.shareService.getLANG() == 'en') ? 'Bad, need expert consultation' : (this.shareService.getLANG() == 'te') ? 'చెడు, నిపుణుల సంప్రదింపులు అవసరం' : 'बुरा, विशेषज्ञ परामर्श की आवश्यकता है';
		   }
		   this.totl = akpts + ' points ' + rem;
		   cnt = 1;
			while(cnt <= 27)
			{
			  var nak2;
			  (partnerbS.order + cnt > 27) ? nak2 = nakshatra_o[partnerbS.order + cnt - 27]: nak2 = nakshatra_o[partnerbS.order+cnt]
			  if(nak2 == bS.name) break;
			  cnt++;
			}
			if(cnt == 4 || cnt == 7 || cnt == 10 || cnt == 13 || cnt == 16 || cnt == 19 || cnt ==  22 || cnt == 25)
			{
			  rem = (this.shareService.getLANG() == 'en') ? 'Mahendra is present' : (this.shareService.getLANG() == 'te') ? 'మహేంద్ర ఉంది' : 'महेंद्र मौजूद है'
			}
			else
			{
			  rem = (this.shareService.getLANG() == 'en') ? 'Mahendra is not present' : (this.shareService.getLANG() == 'te') ? 'మహేంద్ర లేదు' : 'महेंद्र मौजूद नहीं है'
			}
			html = 'Innate Sense of Purpose / Mahendra\n';
			html += rem + '\n';
			html += 'According to classical texts Mahendra indicates longevity and well being; and grants children, grandchildren and prosperity. Mahendra indicates a special affinity and friendship that provides for a sense of meaning and purpose throughout life. If Mahendra is present, and if the rest of the compatibility is solid, even if the couple gets together for the worst of reasons, or immaturely, they will have a great chance of feeling like they should still be together years down the road. If Mahendra is not present the couple should make sure they know the reasons for getting together and that they will be lasting or, years later, they may likely find that they dont have that much reason to be together.';	
			//this.add1ColRow(html);
			this.mah = rem;
			
			html = (this.shareService.getLANG() == 'en') ? 'Obstructions / Vedha Dosh\n' : (this.shareService.getLANG() == 'te') ? 'అడ్డంకులు / వేదా దోషా' : 'अवरोधों / वेधा दोष';
			var vdh = (this.shareService.getLANG() == 'en') ? 'Vedh Dosha' : (this.shareService.getLANG() == 'te') ? 'వేదా దోషా' : 'वेधा दोष';
			var vext = (this.shareService.getLANG() == 'en') ? ' Exists' : (this.shareService.getLANG() == 'te') ? ' ఉంది' : ' मौजूद';
			var vnext = (this.shareService.getLANG() == 'en') ? ' Not Exists' : (this.shareService.getLANG() == 'te') ? ' లేదు' : ' मौजूद नहीं';
			rem = vdh + vnext;
			if(bS.name == 'ashwini' && partnerbS.name == 'jyestha') rem = vdh + vext;
			else if(bS.name == 'jyestha' && partnerbS.name == 'ashwini') rem = vdh + vext;
			else if(bS.name == 'punarvasu' && partnerbS.name == 'uttarashada') rem = vdh + vext;
			else if(bS.name == 'uttarashada' && partnerbS.name == 'punarvasu') rem = vdh + vext;
			else if(bS.name == 'uttaraphalguni' && partnerbS.name == 'purvabhadra') rem = vdh + vext;
			else if(bS.name == 'purvabhadra' && partnerbS.name == 'uttaraphalguni') rem = vdh + vext;
			else if(bS.name == 'bharani' && partnerbS.name == 'anuradha') rem = vdh + vext;
			else if(bS.name == 'anuradha' && partnerbS.name == 'bharani') rem = vdh + vext;
			else if(bS.name == 'pushyami' && partnerbS.name == 'purvashada') rem = vdh + vext;
			else if(bS.name == 'purvashada' && partnerbS.name == 'pushyami') rem = vdh + vext;
			else if(bS.name == 'hastha' && partnerbS.name == 'sathabhisha') rem = vdh + vext;
			else if(bS.name == 'sathabhisha' && partnerbS.name == 'hastha') rem = vdh + vext;
			else if(bS.name == 'krittika' && partnerbS.name == 'vishakha') rem = vdh + vext;
			else if(bS.name == 'vishakha' && partnerbS.name == 'krittika') rem = vdh + vext;
			else if(bS.name == 'ashlesha' && partnerbS.name == 'moola') rem = vdh + vext;
			else if(bS.name == 'moola' && partnerbS.name == 'ashlesha') rem = vdh + vext;
			else if(bS.name == 'rohini' && partnerbS.name == 'swati') rem = vdh + vext;
			else if(bS.name == 'swati' && partnerbS.name == 'rohini') rem = vdh + vext;
			else if(bS.name == 'magha' && partnerbS.name == 'revati') rem = vdh + vext;
			else if(bS.name == 'revati' && partnerbS.name == 'magha') rem = vdh + vext;
			else if(bS.name == 'ardra' && partnerbS.name == 'saravana') rem = vdh + vext;
			else if(bS.name == 'saravana' && partnerbS.name == 'ardra') rem = vdh + vext;
			else if(bS.name == 'purvaphalguni' && partnerbS.name == 'uttarabhadra') rem = vdh + vext;
			else if(bS.name == 'uttarabhadra' && partnerbS.name == 'purvaphalguni') rem = vdh + vext;
			else if(bS.name == 'mrigashira' && (partnerbS.name == 'chitra' || partnerbS.name == 'danista')) rem = vdh + vext;
			else if((bS.name == 'chitra' || bS.name == 'danista') && partnerbS.name == 'chitra') rem = vdh + vext;
			//html += rem + '\n';
			//html += 'Vedha is one of the two Maha Doshas, Great Blemishes, that can affect a relationship';
			//this.add1ColRow(html);
			this.vedh = rem;
			//html = 'Misfortune / Rajju Dosha\n';
			var rju = (this.shareService.getLANG() == 'en') ? 'Rajju Dosha' : (this.shareService.getLANG() == 'te') ? 'రజ్జు దోషా' : 'रज्जु दोष';
			var rext = (this.shareService.getLANG() == 'en') ? ' Exists' : (this.shareService.getLANG() == 'te') ? ' ఉంది' : ' मौजूद';
			var rnext = (this.shareService.getLANG() == 'en') ? ' Not Exists' : (this.shareService.getLANG() == 'te') ? ' లేదు' : ' मौजूद नहीं';
			rem = rju + rnext;
			//rem = 'Rajju Dosha Does Not Exist';
			if(bS.rajju == partnerbS.rajju)
			{
				rem = rju + rext;//'Rajju Dosha Exist';
			}
			//html += rem + '\n';
			//html += 'According to the ancient texts, the following are the results of the Moons falling in Nakshatras that are of the same body part\nIf they //both fall in the feet there will always be wandering. If the both fall in the hip there will be poverty.\nIf they both fall in the navel there //will be loss of children.<br/>If they both fall in the neck the wife will die.<br/>If they both fall in the head the husband will die.\nTHESE //RESULTS ARE MEANT TO BE TAKEN SYMBOLICALLY AND NOT LITERALLY';
			//this.add1ColRow(html);
			this.raju = rem;
			//html = 'Magnetic Attraction / Vasya\n';
			var vsy = (this.shareService.getLANG() == 'en') ? 'Magnetic Attraction / Vasya' : (this.shareService.getLANG() == 'te') ? 'వాస్య గుణ' : 'वश्य गुण';
			var vext = (this.shareService.getLANG() == 'en') ? ' Exists' : (this.shareService.getLANG() == 'te') ? ' ఉంది' : ' मौजूद';
			var vnext = (this.shareService.getLANG() == 'en') ? ' Not Exists' : (this.shareService.getLANG() == 'te') ? ' లేదు' : ' मौजूद नहीं';
			rem = vsy + vnext;
			//rem = 'Magnetic Attraction Does Not Exist';
		    if(this.birthSign.toLowerCase() == 'aries' && (this.partnerBirthSign.toLowerCase() == 'leo' || this.partnerBirthSign.toLowerCase() == 'scorpio'))
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'taurus' && (this.partnerBirthSign.toLowerCase() == 'cancer' || this.partnerBirthSign.toLowerCase() == 'libra'))
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'gemini' && this.partnerBirthSign.toLowerCase() == 'virgo')
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'cancer' && (this.partnerBirthSign.toLowerCase() == 'scorpio' || this.partnerBirthSign.toLowerCase() == 'sagittarius'))
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'leo' && this.partnerBirthSign.toLowerCase() == 'libra')
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'virgo' && (this.partnerBirthSign.toLowerCase() == 'gemini' || this.partnerBirthSign.toLowerCase() == 'pisces'))
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'libra' && (this.partnerBirthSign.toLowerCase() == 'capricorn' || this.partnerBirthSign.toLowerCase() == 'virgo'))
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'scorpio' && this.partnerBirthSign.toLowerCase() == 'cancer')
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'sagittarius' && this.partnerBirthSign.toLowerCase() == 'pisces')
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'capricorn' && this.partnerBirthSign.toLowerCase() == 'aquarius')
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'aquarius' && this.partnerBirthSign.toLowerCase() == 'aries')
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'pisces' && this.partnerBirthSign.toLowerCase() == 'capricorn')
			 rem = vsy + vext;
		    else if(this.birthSign.toLowerCase() == 'leo' && this.partnerBirthSign.toLowerCase() == 'libra')
			 rem = vsy + vext;
			//html += rem + '\n';
			this.attr = rem;
			//html += 'This magnetic attraction or draw can cause the person who is drawn to the other to do almost anything for the relationship';
			//this.add1ColRow(html);
			//this.showList = false;
			break;
		}
    }
  }
  calcVasya(v1, v2)
  {
	  var pts = 0;
	  var rem = '';
	  if(v1 == 'wild' || v2 == 'wild')
	  {
		if(v1 == 'wild' && v2 != 'insect') {
		  if(v2 == 'quad') {
			pts = 0.5;
			rem = 'Average';
		  } else {
			pts = 1;
			rem = 'OK';
		  }
		} else if(v2 == 'wild' && v1 != 'insect') {
		  if(v1 == 'quad') {
			pts = 0.5;
			rem = 'Average';
		  } else {
			pts = 1;
			rem = 'OK';
		  }				
		}
	  }
	  else if(v1 == 'human' && v2 != 'human')
	  {
		if(v2 == 'quad')
		{
		  pts = 1;
		  rem = 'OK';
		} else if(v2 == 'water') {
		  pts = 0.5;
		  rem = 'Average';
		} else {
		  pts = 1;
		  rem = 'OK';
		}
	  }
	  else if(v2 == 'human' && v2 != 'human')
	  {
		if(v2 == 'quad')
		{
		  pts = 1;
		  rem = 'OK';
		} else if(v2 == 'water') {
		  pts = 0.5;
		  rem = 'Average';
		} else {
		  pts = 1;
		  rem = 'OK';
		}
	  }
	return pts;
  }	
	translate(lord: string)
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
				}
				break;
			case 'moon':
			case 'mo':
				if(this.shareService.getLANG() == 'te') {
					trn = 'చంద్రుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'चांद ग्रह';
				}
				break;
			case 'jupiter':
			case 'ju':
				if(this.shareService.getLANG() == 'te') {
					trn = 'బృహస్పతి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'बृहस्पति';
				}
				break;
			case 'mercury':
			case 'me':
				if(this.shareService.getLANG() == 'te') {
					trn = 'బుధుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'बुध गृह';
				}
				break;
			case 'mars':
			case 'ma':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కుజుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मंगल ग्रह';
				}
				break;
			case 'venus':
			case 've':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శుక్రుడు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'शुक्र ग्रह';
				}
				break;
			case 'saturn':
			case 'sa':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శనిగ్రహము';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'शनि ग्रह';
				}
				break;
			case 'rahu':
			case 'ra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'రాహు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'राहु ग्रह';
				}
				break;
			case 'ketu':
			case 'ke':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కేతు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'केतु ग्रह';
				}
				break;
			case 'aries':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మేషరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मेष राशि';
				}
				break;
			case 'taurus':
				if(this.shareService.getLANG() == 'te') {
					trn = 'వృషభరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'वृषभ राशि';
				}
				break;
			case 'gemini':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మిధునరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मिथुन राशि';
				}
				break;
			case 'cancer':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కర్కాటకరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कर्क राशि';
				}
				break;
			case 'leo':
				if(this.shareService.getLANG() == 'te') {
					trn = 'సిమ్హరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'सिंह राशि';
				}
				break;
			case 'virgo':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కన్యరాశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कन्या राशि';
				}
				break;
			case 'libra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'తులారాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'तुला राशि';
				}
				break;
			case 'scorpio':
				if(this.shareService.getLANG() == 'te') {
					trn = 'వృశ్చికరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'वृश्चिक राशि';
				}
				break;
			case 'saggitarius':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ధనుస్సురాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'धनु राशि';
				}
				break;
			case 'capricorn':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మకరరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मकर राशि';
				}
				break;
			case 'aquarius':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కుంభరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कुंभ राशि';
				}
				break;
			case 'pisces':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మీనరాసి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मीन राशि';
				}
				break;
			case 'ashwini':
				if(this.shareService.getLANG() == 'te') {
					trn = 'అశ్వినీ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'अश्विनी';
				}
				break;
			case 'bharani':
				if(this.shareService.getLANG() == 'te') {
					trn = 'భరణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'भरणी';
				}
				break;
			case 'krittika':
				if(this.shareService.getLANG() == 'te') {
					trn = 'కృత్తికా';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'कृत्तिका';
				}
				break;
			case 'rohini':
				if(this.shareService.getLANG() == 'te') {
					trn = 'రోహిణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'रोहिणी';
				}
				break;
			case 'mrigashira':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మ్రిగశిర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मृगशिरा';
				}
				break;
			case 'ardra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఆర్ద్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'आर्द्र';
				}
				break;
			case 'ardra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఆర్ద్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'आर्द्र';
				}
				break;
			case 'punarvasu':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పునర్వసు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पुनर्वसु';
				}
				break;
			case 'pushya':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పుష్య';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पुष्य';
				}
				break;
			case 'ashlesha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఆశ్లేష';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'अश्लेषा';
				}
				break;
			case 'magha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మఘ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मघा';
				}
				break;
			case 'purvaphalguni':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పూర్వఫల్గుణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पूर्वाफाल्गुनी';
				}
				break;
			case 'uttaraaphalguni':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఉత్తరాఫల్గుణి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'उत्तराफाल्गुनी';
				}
				break;
			case 'hastha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'హస్త';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'हस्ता';
				}
				break;
			case 'chitra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'చిత్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'चित्र';
				}
				break;
			case 'swati':
				if(this.shareService.getLANG() == 'te') {
					trn = 'స్వాతి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'स्वाति';
				}
				break;
			case 'vishakha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'విశాఖ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'विशाखा';
				}
				break;
			case 'anuradha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'అనురాధ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'अनुराधा';
				}
				break;
			case 'jyestha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'జ్యేష్ఠా';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'जयस्था';
				}
				break;
			case 'mula':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మూల';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मूल';
				}
				break;
			case 'purvaashada':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పూర్వాషాఢ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पूर्वाषाढ़ा';
				}
				break;
			case 'uttaraashada':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఉత్తరాషాఢ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'उत्तराषाढ़ा';
				}
				break;
			case 'shravana':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శ్రావణ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'श्रवण';
				}
				break;
			case 'danishta':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ధనిష్ఠ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'धनिष्ठा';
				}
				break;
			case 'shatabhisha':
				if(this.shareService.getLANG() == 'te') {
					trn = 'శతభిషా';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'शतभिषा';
				}
				break;
			case 'purvabhadra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పూర్వాభాద్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पूर्वभाद्र';
				}
				break;
			case 'uttarabhadra':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఉత్తరాభాద్ర';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'उत्तरभाद्र';
				}
				break;
			case 'revati':
				if(this.shareService.getLANG() == 'te') {
					trn = 'రేవతి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'रेवती';
				}
				break;
			case 'prathama':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ప్రథమ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'प्रथम';
				}
				break;
			case 'dwitiya':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ద్వితీయ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'द्वितीय';
				}
				break;
			case 'tritiya':
				if(this.shareService.getLANG() == 'te') {
					trn = 'తృతీయ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'तृतीया';
				}
				break;
			case 'chaturthi':
				if(this.shareService.getLANG() == 'te') {
					trn = 'చవితి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'चतुर्थी';
				}
				break;
			case 'panchami':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పంచమి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पंचमी';
				}
				break;
			case 'shashthi':
				if(this.shareService.getLANG() == 'te') {
					trn = 'షష్ఠి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'साष्टी';
				}
				break;
			case 'sapthami':
				if(this.shareService.getLANG() == 'te') {
					trn = 'సప్తమి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'सप्तमी';
				}
				break;
			case 'asthami':
				if(this.shareService.getLANG() == 'te') {
					trn = 'అష్టమి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'अष्ठमी';
				}
				break;
			case 'navami':
				if(this.shareService.getLANG() == 'te') {
					trn = 'నవమి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'रेवती';
				}
				break;
			case 'dasami':
				if(this.shareService.getLANG() == 'te') {
					trn = 'దశమి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'दशमी';
				}
				break;
			case 'ekadashi':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ఏకాదశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'एकादशी';
				}
				break;
			case 'dwadashi':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ద్వాదశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'द्वादशी';
				}
				break;
			case 'trayodashi':
				if(this.shareService.getLANG() == 'te') {
					trn = 'త్రయోదశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'त्रयोदशी';
				}
				break;
			case 'chaturdashi':
				if(this.shareService.getLANG() == 'te') {
					trn = 'చతుర్దశి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'चतुर्दशी';
				}
				break;
			case 'purnima':
				if(this.shareService.getLANG() == 'te') {
					trn = 'పూర్ణిమ';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'पूर्णिमा';
				}
				break;
			case 'amavasya':
				if(this.shareService.getLANG() == 'te') {
					trn = 'అమావాస్య';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'अमावस्या';
				}
				break;
			case 'janma/ danger to body':
				if(this.shareService.getLANG() == 'te') {
					trn = 'జన్మ / శరీరానికి ప్రమాదం';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'जैनमा / शरीर के लिए खतरा';
				}
				break;
			case 'sampath/ wealth and prosperity':
				if(this.shareService.getLANG() == 'te') {
					trn = 'సంపత్ / సంపద మరియు శ్రేయస్సు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'सम्पत / धन और समृद्धि';
				}
				break;
			case 'vipat/ dangers, losses, accidents':
				if(this.shareService.getLANG() == 'te') {
					trn = 'విపత్ / ప్రమాదాలు, నష్టాలు, దుర్ఘటనలు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'विपत / खतरे, नुकसान, दुर्घटनाएं';
				}
				break;
			case 'kshema/ prosperity':
				if(this.shareService.getLANG() == 'te') {
					trn = 'క్షేమ / శ్రేయస్సు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'क्षेम / समृद्धि';
				}
				break;
			case 'pratyak/ obstacles':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ప్రత్యక్ / అడ్డంకులు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'प्रत्येक / बाधाओं';
				}
				break;
			case 'sadhana/ realisation and ambitions':
				if(this.shareService.getLANG() == 'te') {
					trn = 'సాధనా / పరిపూర్ణత మరియు లక్ష్యాలు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'साधना / अहसास और महत्वाकांक्षा';
				}
				break;
			case 'naidhana/ dangers':
				if(this.shareService.getLANG() == 'te') {
					trn = 'నైదాన / ప్రమాదములు';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'नायदाणा / खतरे';
				}
				break;
			case 'mitra/ good':
				if(this.shareService.getLANG() == 'te') {
					trn = 'మిత్ర / మంచి';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'मित्र / अच्छा';
				}
				break;
			case 'prama mitra/ very favourable':
				if(this.shareService.getLANG() == 'te') {
					trn = 'ప్రమా మిత్ర / చాలా అనుకూలమైన';
				} else if(this.shareService.getLANG() == 'hi') { 
					trn = 'प्रामा मित्रा / बहुत अनुकूल है';
				}
				break;
			default:
				trn = lord;
				break;
		}
		return trn;
	}

}
