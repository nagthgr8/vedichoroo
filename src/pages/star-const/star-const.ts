import { Component, NgModule, Renderer2, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import {FormBuilder, FormGroup} from '@angular/forms';
import { HoroscopeService } from '../../app/horoscope.service';
import { AppRate } from '@ionic-native/app-rate';
import { ShareService } from '../../app/share.service';
import * as moon_phases from '../horoscope/moon_phases.json';
import * as mon_weeks from '../horoscope/mon_weeks.json';
import { WeekDay } from '../../app/week-day';
import { LunarDay } from '../../app/lunar-day';
/**
 * Generated class for the StarConstPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'page-star-const',
  templateUrl: 'star-const.html',
})
export class StarConstPage {
  @ViewChild('hinduCal1') hinduCal1;
  @ViewChild('hinduCal2') hinduCal2;
  dt1 :string = '';dt2 :string = '';dt3 :string = '';dt4 :string = '';dt5 :string = '';dt6 :string = '';dt7 :string = '';dt8 :string = '';dt9 :string = '';dt10 :string = '';dt11 :string = '';dt12 :string = '';dt13 :string = '';dt14 :string = '';dt15 :string = '';dt16 :string = '';dt17 :string = '';dt18 :string = '';dt19 :string = '';dt20 :string = '';dt21 :string = '';dt22 :string = '';dt23 :string = '';dt24 :string = '';dt25 :string = '';dt26 :string = '';dt27 :string = '';dt28 :string = '';dt29 :string = '';dt30 :string = '';
  st1 :string = '';st2 :string = '';st3 :string = '';st4 :string = '';st5 :string = '';st6 :string = '';st7 :string = '';st8 :string = '';st9 :string = '';st10 :string = '';st11 :string = '';st12 :string = '';st13 :string = '';st14 :string = '';st15 :string = '';st16 :string = '';st17 :string = '';st18 :string = '';st19 :string = '';st20 :string = '';st21 :string = '';st22 :string = '';st23 :string = '';st24 :string = '';st25 :string = '';st26 :string = '';st27 :string = '';st28 :string = '';st29 :string = '';st30 :string = '';
  lu1 :string = '';lu2 :string = '';lu3 :string = '';lu4 :string = '';lu5 :string = '';lu6 :string = '';lu7 :string = '';lu8 :string = '';lu9 :string = '';lu10 :string = '';lu11 :string = '';lu12 :string = '';lu13 :string = '';lu14 :string = '';lu15 :string = '';lu16 :string = '';lu17 :string = '';lu18 :string = '';lu19 :string = '';lu20 :string = '';lu21 :string = '';lu22 :string = '';lu23 :string = '';lu24 :string = '';lu25 :string = '';lu26 :string = '';lu27 :string = '';lu28 :string = '';lu29 :string = '';lu30 :string = '';
   str1 :string = '';str2 :string = '';str3 :string = '';str4 :string = '';str5 :string = '';str6 :string = '';str7 :string = '';str8 :string = '';str9 :string = '';str10 :string = '';str11 :string = '';str12 :string = '';str13 :string = '';str14 :string = '';str15 :string = '';str16 :string = '';str17 :string = '';str18 :string = '';str19 :string = '';str20 :string = '';str21 :string = '';str22 :string = '';str23 :string = '';str24 :string = '';str25 :string = '';str26 :string = '';str27 :string = '';str28 :string = '';str29 :string = '';str30 :string = '';
    info: string = '';
  birthStar: string;
  birthSign: string;
  birthSignDeg: string;
  personalDetailsForm: FormGroup;
  device_width :number = 0;
  device_height :number = 0;
  showList: boolean;
  showGrid: boolean;
  showBS: boolean;
  showLgnds: boolean;
  //showCal1: boolean;
  //showCal2: boolean;
  str :string;
  //objectKeys = Object.keys;
  //oTransits: StarStrength[] = [];
  mon: string = '';
  yer: string = '';
 

  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder, public renderer: Renderer2, public horoService: HoroscopeService, private appRate: AppRate, public shareService: ShareService) {
   platform.ready().then(() => {
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
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
    });
	this.personalDetailsForm = formBuilder.group({
		dob: this.shareService.getDOB(),
	});
	this.showGrid = false;
	this.showBS = false;
	this.showList = true;
	this.showLgnds = false;
	//this.showCal1 = false;
	//this.showCal2 = false;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad StarConstPage');
  }
  save() {
  this.info = 'please wait...';
  if(this.personalDetailsForm.controls['dob'].value.length == 0) {
	    this.info = 'Please enter Man Date of Birth';
		return;
		}
 	this.horoService.getBirthStar(this.personalDetailsForm.controls['dob'].value)
       .subscribe(res => {
	   this.birthStar = res['birthStar'];
	   this.birthSign = res['birthSign'];
	   this.birthSignDeg = res['birthSignDeg'];
	   this.showBS = true;
	   if(this.shareService.getLANG().toLowerCase() == 'en') {
	    this.str = 'Your BirthStar is ' + this.birthStar + ' Your Moon Sign is ' + this.birthSign + '. Below calendar projects the Star Strength & Lunar Strength for the next 30 days analyzed based on your BirthStar.';
		} else if(this.shareService.getLANG().toLowerCase() == 'te') {
	    this.str = ' మీ జన్మ నక్షత్రమ్  ' + this.translate(this.birthStar) + ' మీ జన్మ రశి  ' + this.translate(this.birthSign) + '. మీ జన్మ నక్షత్రమ్ ఆధారంగా తదుపరి 30 రోజుల్లో మీ తారా బలం మరియు చంద్ర బలం క్రింద క్యాలెండర్లో కలదు.';
		} else if(this.shareService.getLANG().toLowerCase() == 'hi') {
	    this.str = ' आप के जन्म नक्षत्र   ' + this.translate(this.birthStar) + ' आप के जन्म राशि  ' + this.translate(this.birthSign) + '. इसके अनुसार अगले 30 दिनों में आप के तारा बहल और चन्द्र भाल नीचे कैलेंडर में है.';
		}
		 this.getStarConstReport();
		 this.showLgnds = true;
      }, (err) => {
        this.info = err;
      }) ;
  }
  
  getStarConstReport()
  {
  this.horoService.getStarConst(this.birthStar, this.birthSign, this.birthSignDeg)
       .subscribe(res => {
	   this.publishReport(res);
      }, (err) => {
        this.info = err;
      }) ;
  }
  
  publishReport(stars: any)
  {
    this.showList = false;
	//this.showCal1 = true;
	this.mon = stars[0].date.split(',')[0].split(' ')[1];
	this.yer = stars[0].date.split(',')[1].split(' ')[0];
	this.renderer.appendChild(this.hinduCal1.nativeElement, this.grid(6, this.device_width/6, this.device_width, stars));
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
	if(c) {
	    //this.showCal2 = true;
		this.renderer.appendChild(this.hinduCal2.nativeElement, this.grid(6, this.device_width/6, this.device_width, stars));
	}
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
		let oLDays: LunarDay[] = [];
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
					this.renderer.appendChild(text2, document.createTextNode(this.translate(oW[key].star)));
					this.renderer.setAttribute(text2, "font-size", "10px");
					this.renderer.setAttribute(text2, "font-weight", "bold");
					this.renderer.setAttribute(text2, "x", (size*dx + size/2).toString());
					this.renderer.setAttribute(text2, "y", (size*k + 25 + size/2 + 10).toString());
					this.renderer.setAttribute(text2, "alignment-baseline", "middle");
					this.renderer.setAttribute(text2, "text-anchor", "middle");
					this.renderer.setAttribute(text2, "id", "t2" + k.toString() + dx.toString());
					var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
					this.renderer.appendChild(text3, document.createTextNode(this.translate(oW[key].tithi)));
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
					if(oW[key].starStrength.indexOf('Janma') > -1){
						var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
						this.renderer.setAttribute(crc, "width", "8");
						this.renderer.setAttribute(crc, "height", "8");
						this.renderer.setAttribute(crc, "fill", "#ee4f7c");
						this.renderer.setAttribute(crc, "stroke", "#ee4f7c");
						this.renderer.setAttribute(crc, "stroke-width", "6");
						this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
						this.renderer.setAttribute(crc, "cx", (size*dx + size-8).toString());
						this.renderer.setAttribute(crc, "cy", (size*k + 25 + 8).toString());
						this.renderer.setAttribute(crc, "r", "4");
						this.renderer.appendChild(g, crc);
							//this.renderer.setAttribute(box, "stroke", "#ee4f7c");
							//this.renderer.setAttribute(text1, "fill", "#000000");
							//this.renderer.setAttribute(text2, "fill", "#000000");
					} else if(oW[key].starStrength.indexOf('Sampat') > -1) {
						var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
						this.renderer.setAttribute(crc, "width", "8");
						this.renderer.setAttribute(crc, "height", "8");
						this.renderer.setAttribute(crc, "fill", "#ffe1ff");
						this.renderer.setAttribute(crc, "stroke", "#ffe1ff");
						this.renderer.setAttribute(crc, "stroke-width", "6");
						this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
						this.renderer.setAttribute(crc, "cx", (size*dx + size-8).toString());
						this.renderer.setAttribute(crc, "cy", (size*k + 25 + 8).toString());
						this.renderer.setAttribute(crc, "r", "4");
						this.renderer.appendChild(g, crc);
							//this.renderer.setAttribute(box, "stroke", "#ffe1ff");
							//this.renderer.setAttribute(text1, "fill", "#000000");
							//this.renderer.setAttribute(text2, "fill", "#000000");
					} else if(oW[key].starStrength.indexOf('Vipat') > -1) {
						var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
						this.renderer.setAttribute(crc, "width", "8");
						this.renderer.setAttribute(crc, "height", "8");
						this.renderer.setAttribute(crc, "fill", "#ff0000");
						this.renderer.setAttribute(crc, "stroke", "#ff0000");
						this.renderer.setAttribute(crc, "stroke-width", "6");
						this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
						this.renderer.setAttribute(crc, "cx", (size*dx + size-8).toString());
						this.renderer.setAttribute(crc, "cy", (size*k + 25 + 8).toString());
						this.renderer.setAttribute(crc, "r", "4");
						this.renderer.appendChild(g, crc);
							//this.renderer.setAttribute(box, "stroke", "#ff0000");
							//this.renderer.setAttribute(text1, "fill", "#000000");
							//this.renderer.setAttribute(text2, "fill", "#000000");
					} else if(oW[key].starStrength.indexOf('Kshema') > -1) {
						var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
						this.renderer.setAttribute(crc, "width", "8");
						this.renderer.setAttribute(crc, "height", "8");
						this.renderer.setAttribute(crc, "fill", "#fff68f");
						this.renderer.setAttribute(crc, "stroke", "#fff68f");
						this.renderer.setAttribute(crc, "stroke-width", "6");
						this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
						this.renderer.setAttribute(crc, "cx", (size*dx + size-8).toString());
						this.renderer.setAttribute(crc, "cy", (size*k + 25 + 8).toString());
						this.renderer.setAttribute(crc, "r", "4");
						this.renderer.appendChild(g, crc);
							//this.renderer.setAttribute(box, "stroke", "#fff68f");
							//this.renderer.setAttribute(text1, "fill", "#000000");
							//this.renderer.setAttribute(text2, "fill", "#000000");
					} else if(oW[key].starStrength.indexOf('Pratyak') > -1) {
						var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
						this.renderer.setAttribute(crc, "width", "8");
						this.renderer.setAttribute(crc, "height", "8");
						this.renderer.setAttribute(crc, "fill", "#ff6666");
						this.renderer.setAttribute(crc, "stroke", "#ff6666");
						this.renderer.setAttribute(crc, "stroke-width", "6");
						this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
						this.renderer.setAttribute(crc, "cx", (size*dx + size-8).toString());
						this.renderer.setAttribute(crc, "cy", (size*k + 25 + 8).toString());
						this.renderer.setAttribute(crc, "r", "4");
						this.renderer.appendChild(g, crc);
							//this.renderer.setAttribute(box, "stroke", "#ff6666");
							//this.renderer.setAttribute(text1, "fill", "#000000");
							//this.renderer.setAttribute(text2, "fill", "#000000");
					} else if(oW[key].starStrength.indexOf('Sadhana') > -1) {
						var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
						this.renderer.setAttribute(crc, "width", "8");
						this.renderer.setAttribute(crc, "height", "8");
						this.renderer.setAttribute(crc, "fill", "#ffd700");
						this.renderer.setAttribute(crc, "stroke", "#ffd700");
						this.renderer.setAttribute(crc, "stroke-width", "6");
						this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
						this.renderer.setAttribute(crc, "cx", (size*dx + size-8).toString());
						this.renderer.setAttribute(crc, "cy", (size*k + 25 + 8).toString());
						this.renderer.setAttribute(crc, "r", "4");
						this.renderer.appendChild(g, crc);
							//this.renderer.setAttribute(box, "stroke", "#ffd700");
							//this.renderer.setAttribute(text1, "fill", "#000000");
							//this.renderer.setAttribute(text2, "fill", "#000000");
					} else if(oW[key].starStrength.indexOf('Naidhana') > -1) {
						var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
						this.renderer.setAttribute(crc, "width", "8");
						this.renderer.setAttribute(crc, "height", "8");
						this.renderer.setAttribute(crc, "fill", "#ff0000");
						this.renderer.setAttribute(crc, "stroke", "#ff0000");
						this.renderer.setAttribute(crc, "stroke-width", "6");
						this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
						this.renderer.setAttribute(crc, "cx", (size*dx + size-8).toString());
						this.renderer.setAttribute(crc, "cy", (size*k + 25 + 8).toString());
						this.renderer.setAttribute(crc, "r", "4");
						this.renderer.appendChild(g, crc);
							//this.renderer.setAttribute(box, "stroke", "#ff0000");
							//this.renderer.setAttribute(text1, "fill", "#000000");
							//this.renderer.setAttribute(text2, "fill", "#000000");
					} else if(oW[key].starStrength.indexOf('Prama Mitra') > -1) {
						var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
						this.renderer.setAttribute(crc, "width", "8");
						this.renderer.setAttribute(crc, "height", "8");
						this.renderer.setAttribute(crc, "fill", "#00ff7f");
						this.renderer.setAttribute(crc, "stroke", "#00ff7f");
						this.renderer.setAttribute(crc, "stroke-width", "6");
						this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
						this.renderer.setAttribute(crc, "cx", (size*dx + size-8).toString());
						this.renderer.setAttribute(crc, "cy", (size*k + 25 + 8).toString());
						this.renderer.setAttribute(crc, "r", "4");
						this.renderer.appendChild(g, crc);
							//this.renderer.setAttribute(box, "stroke", "#00ff7f");
							//this.renderer.setAttribute(text1, "fill", "#000000");
							//this.renderer.setAttribute(text2, "fill", "#000000");
					} else if(oW[key].starStrength.indexOf('Mitra') > -1) {
						var crc = document.createElementNS("http://www.w3.org/2000/svg", "circle");
						this.renderer.setAttribute(crc, "width", "8");
						this.renderer.setAttribute(crc, "height", "8");
						this.renderer.setAttribute(crc, "fill", "#b4eeb4");
						this.renderer.setAttribute(crc, "stroke", "#b4eeb4");
						this.renderer.setAttribute(crc, "stroke-width", "6");
						this.renderer.setAttribute(crc, "id", "c" + k.toString() + dx.toString());
						this.renderer.setAttribute(crc, "cx", (size*dx + size-8).toString());
						this.renderer.setAttribute(crc, "cy", (size*k + 25 + 8).toString());
						this.renderer.setAttribute(crc, "r", "4");
						this.renderer.appendChild(g, crc);
							//this.renderer.setAttribute(box, "stroke", "#b4eeb4");
							//this.renderer.setAttribute(text1, "fill", "#000000");
							//this.renderer.setAttribute(text2, "fill", "#000000");
					} else {
						//this.renderer.setAttribute(box, "stroke", "#000000");
					}
					if(oW[key].lunarStrength.indexOf('Chandrastama') > -1 || oW[key].lunarStrength.indexOf('Bad') > -1) {
						let lunarDay: LunarDay = {
						 tithi: oW[key].tithi,
						 star: oW[key].star,
						 lunarStrength: (oW[key].lunarStrength.indexOf('Chandrastama') > -1) ? 'Chandrastama' : 'Bad',
						 moonPhase: oW[key].moonPhase,
						 calX: (size*dx).toString(),
						 calY: (size*k + 25).toString()
					  };
					  oLDays[key] = lunarDay;
					}
				//}
				svg.appendChild(g);
			}
		}
		let lnc: number =0;
		for(let key of Object.keys(oLDays)) {
		    lnc++;
			var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		    var bx = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			this.renderer.setAttribute(bx, "width", size.toString());
			this.renderer.setAttribute(bx, "height", size.toString());
			this.renderer.setAttribute(bx, "stroke", "#FF5733");
			this.renderer.setAttribute(bx, "stroke-width", (oLDays[key].lunarStrength == 'Chandrastama') ? "3" : "1");
			this.renderer.setAttribute(bx, "fill-opacity", "0.0");
			this.renderer.setAttribute(bx, "id", "bx" + lnc.toString());
			this.renderer.setAttribute(bx, "x", oLDays[key].calX);
			this.renderer.setAttribute(bx, "y", oLDays[key].calY);
			this.renderer.appendChild(g, bx);
			svg.appendChild(g);
		}
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
			case 'sampat/ wealth and prosperity':
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
