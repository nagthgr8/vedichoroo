import { Component, OnInit, NgModule, Renderer2, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Platform} from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
//import { AdMob } from "ionic-admob";
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';
import { ChartSettingsPage } from '../chart-settings/chart-settings.page';
import * as sublords from '../sublords.json';
import * as lunapics from '../lunapics.json';
import * as moment from 'moment';
import * as moon_phases from '../moon_phases.json';
import * as mon_weeks from '../mon_weeks.json';
import { WeekDay } from '../week-day';
import { LunarDay } from '../lunar-day';
declare var admob;

@Component({
  selector: 'app-panchang',
  templateUrl: './panchang.page.html',
  styleUrls: ['./panchang.page.scss'],
})
export class PanchangPage implements OnInit {
   @ViewChild('hinduCal', {static: false}) hinduCal;
   sublords_v: any = (sublords as any).default;
   lunapics_v: any = (lunapics as any).default;
   moon_phases_v: any = (moon_phases as any).default;
   mon_weeks_v: any = (mon_weeks as any).default;
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
  yoga: string = '';
  karana: string = '';
  clat: any;
  clng: any;
  localtz: string = '';
  ofset: number = 1;
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
  //ayanINF: string = '';
  aynt: string = ''
  arcs: number = 0;
  constructor(private router: Router, public platform: Platform, public horoService: HoroscopeService, public shareService: ShareService, public translate: TranslateService, private file: File, public renderer: Renderer2) {//, public admob: AdMob) { 
  this.info = 'Please wait...';
  this.showPAN = false;
     platform.ready().then(() => {
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
		this.shareService.plan.subscribe((pln) => {
			//if(pln.name != 'com.mypubz.eportal.astrologer') this.showBanner();
		 }, (err) => {
		});	
      });
  }

  ngOnInit() {
 	this.today = Date.now();
	this.info = 'Fetching todays panchang....';
    console.log(this.file.dataDirectory);	
    this.shareService.plan
		   .subscribe(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
 		  //admob.setDevMode(true);
		  admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/6344800041',
			  ios: 'ca-app-pub-8442845715303800/6344800041',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/6344800041',
				ios: 'ca-app-pub-8442845715303800/6344800041',
			  })
			}, 10000)
		  })		
		}
	}, (err) => {
	});	 
		let ayanid: number = (this.shareService.getRAYNM()) ? Number(this.shareService.getRAYNM()) : 1;
		var cd = new Date();
		this.horoService.getProMoonPhase(this.shareService.getCLAT(), this.shareService.getCLNG(), cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes()+ ':' + cd.getSeconds()+'Z', Intl.DateTimeFormat().resolvedOptions().timeZone, ayanid)
		   .subscribe(res => {
		var cd = new Date();
        this.sunrise = res['sunrise'];
		this.sunset = res['sunset'];
		this.clat = this.shareService.getCLAT();
		this.clng = this.shareService.getCLNG();
		this.localtz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		this.ofset = -(cd.getTimezoneOffset() / 60);
		this.calcPanch(cd);
		this.info = 'Please wait..';
		//this.horoService.getProMoonPhase(jsonv['clat'], jsonv['clng'], cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes()+ ':' + cd.getSeconds()+'Z', //jsonv['localtz'], ayanid)
		//   .subscribe(res3 => {
		   this.showPAN = true;
		   this.info = '';
		   this.nak = this.shareService.translate_func(res['birthStar']);
		   var tithiRem = res['tithiRem'];
		   console.log('tithiRem=', tithiRem);
			var cd2 = new Date();
			var ct = cd2.getHours().toString() + ':' + cd2.getMinutes().toString();
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
		   var rem = Math.floor((Number(tithiRem)*Number(hours))/100);
		   console.log('tithiRem in hrs=', rem);
		   var tite = moment(startTime).add(rem*60, 'm');
		   this.tithi = this.shareService.translate_func(res['tithi']) + ' till ' + tite.format('HH:mm');
		   this.yoga = this.shareService.translate_func(res['yoga']);
		   this.karana = this.shareService.translate_func(res['karana']);
		   console.log(res['tithi'].toLowerCase());// + (res3['moonPhase'] == 'waxing') ? '-s' : '-k');
		   let ky: string = res['tithi'].toLowerCase();
		   if(ky != 'purnima' && ky != 'amavasya') {
			ky = (res['moonPhase'] == 'waxing') ? res['tithi'].toLowerCase() + '-s' : res['tithi'].toLowerCase() + '-k';
		   } 
		   console.log(ky);
		   this.lunapic = this.lunapics_v[ky];
		   var ascPos = res['ascPos'];
		   console.log(ascPos);
		   var lag = this.getDms(ascPos[0]);
		   console.log(lag);
		   this.lagna = lag;
		   console.log(lag.indexOf('?'));
		   this.lag_d = Number(lag.substring(0, lag.indexOf('?')));
		   console.log(this.lag_d);
		   this.lag_m = Number(lag.substring(lag.indexOf('?')+1,  lag.indexOf("'")));
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
			this.arcs++;
			//console.log('ticks=' + this.ticks.toString());
			if(this.arcs == 15) { this.lag_s++; this.arcs = 0; }
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
		   if(this.lag_d >= 360) {
			   this.lag_d = 0;
			   this.lag_m = 0;
			   this.lag_s = 0;
		   }
		},1000);
	  //}, (err) => {
			//this.info = err;
	  //});
	}, (err) => {
			this.info = JSON.stringify(err);
	  });
 }
   ionViewDidEnter() {
    console.log('ionViewDidEnter PanchangPage');
		var ayn = this.shareService.getRAYNM();
		this.aynt = 'BV RAMAN';
		if(ayn) {
		    switch(Number(ayn))
			{
			   case 1:
					this.aynt = 'BV RAMAN';
					break;
				case 2:
					this.aynt = 'KP OLD';
					break;
				case 3:
					this.aynt = 'KP NEW';
					break;
				case 4:
					this.aynt = 'NC LAHIRI';
					break;
				case 5:
					this.aynt = 'KHULLAR';
					break;
				case 6:
					this.aynt = 'FAGAN BRADLEY';
					break;
				default:
					this.aynt = 'KP NEW';
					break;
			}
		}
		//this.ayanINF = '<span><strong>AYANAMSA:</strong></span><span class="more" tappable (click)="chgayan()">'+say+'</span>';
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
		this.horoService.getProMoonPhase(this.clat, this.clng, cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes()+ ':'  + cd.getSeconds()+'Z', this.localtz, ayanid)
		   .subscribe(res3 => {
		   this.showPAN = true;
		   this.info = '';
		   this.nak = this.shareService.translate_func(res3['birthStar']);
		   var tithiRem = res3['tithiRem'];
		   console.log('tithiRem=', tithiRem);
		   var rem = Math.floor((Number(tithiRem)*Number(totmins))/100);
		   console.log('tithiRem in mins=', rem);
		   var tite = moment(startTime).add(rem, 'm');
		   this.tithi = this.shareService.translate_func(res3['tithi']) + ' till ' + tite.format('HH:mm');
		   this.yoga = this.shareService.translate_func(res3['yoga']);
		   this.karana = this.shareService.translate_func(res3['karana']);
		   console.log(res3['tithi'].toLowerCase());// + (res3['moonPhase'] == 'waxing') ? '-s' : '-k');
		   let ky: string = res3['tithi'].toLowerCase();
		   if(ky != 'purnima' && ky != 'amavasya') {
			ky = (res3['moonPhase'] == 'waxing') ? res3['tithi'].toLowerCase() + '-s' : res3['tithi'].toLowerCase() + '-k';
		   } 
		   console.log(ky);
		   this.lunapic = this.lunapics_v[ky];
		}, (err) => {
			this.info = JSON.stringify(err);
		});
	}
	this.nrefs++;
   }
  	calcStar(mins: number)
	{
		//console.log(mins);
		for(var i = 0; i < Object.keys(this.sublords_v).length; i++)
		{
			var nak = this.sublords_v[i];
			var degs = this.sublords_v[i].deg;
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
calcTime(offset) {
var d = new Date();
var utc = d.getTime() + (d.getTimezoneOffset() * 60000);
var nd = new Date(utc + (3600000*offset));

alert("The local time is " + nd.toLocaleString());
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
			this.horoService.calForMon(cd.getMonth()+1, cd.getFullYear(), this.clat+'|'+this.clng, this.localtz, ayanid)
		.subscribe(res => {
//			this.horoService.getProBirthStar(this.clat, this.clng, cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes(), this.localtz, ayanid)
//		   .subscribe(res => {
//			this.horoService.getProStarConst(res['birthStar'], res['birthSign'], res['birthSignDeg'], this.clat+'|'+this.clng, this.localtz, ayanid)
//			.subscribe(res => {
				this.info = '';
				this.publishReport(res);
				this.cal = 'Hide Calendar';
				this.fetchCAL = false;
//				}, (err) => {
//				this.info = JSON.stringify(err);
//			}) ;
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
		let my: string = (this.shareService.getLANG() == 'en') ? this.mon_weeks_v[this.mon.toLowerCase()].split('|')[0] + ' '  + this.yer: (this.shareService.getLANG() == 'te') ? this.mon_weeks_v[this.mon.toLowerCase()].split('|')[1] + ' '  + this.yer : this.mon_weeks_v[this.mon.toLowerCase()].split('|')[2] + ' ' + this.yer;
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
			this.renderer.appendChild(text, document.createTextNode((this.shareService.getLANG() == 'en') ? wks[k] : (this.shareService.getLANG() == 'te') ? this.mon_weeks_v[wks[k]].split('|')[1] : this.mon_weeks_v[wks[k]].split('|')[2]));
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
					this.renderer.appendChild(text2, document.createTextNode(this.shareService.translate_func(oW[key].star)));
					this.renderer.setAttribute(text2, "font-size", "10px");
					this.renderer.setAttribute(text2, "font-weight", "bold");
					this.renderer.setAttribute(text2, "x", (size*dx + size/2).toString());
					this.renderer.setAttribute(text2, "y", (size*k + 25 + size/2 + 10).toString());
					this.renderer.setAttribute(text2, "alignment-baseline", "middle");
					this.renderer.setAttribute(text2, "text-anchor", "middle");
					this.renderer.setAttribute(text2, "id", "t2" + k.toString() + dx.toString());
					var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
					this.renderer.appendChild(text3, document.createTextNode(this.shareService.translate_func(oW[key].tithi)));
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
								image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.moon_phases_v[oW[key].tithi].split(',')[0]);
							} else {
								image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.moon_phases_v[oW[key].tithi].split(',')[1]);
							}	
                        } else {
								image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.moon_phases_v[oW[key].tithi]);
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
     this.router.navigate(['/chart-settings'], {state: binf });
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

        // Add the degrees value to the result by adding the degrees symbol "?".
        result = valDeg + "?"; // 40?

        // ---- Minutes ----
        // Removing the integer of the initial value you get the decimal portion.
        // Multiply the decimal portion by 60.
        // Math.floor returns an integer discarding the decimal portion.
        // ((40.601203 - 40 = 0.601203) * 60 = 36.07218) = 36
        valMin = Math.floor((val - valDeg) * 60); // 36.07218 = 36

        // Add minutes to the result, adding the symbol minutes "'".
        result += valMin + "'"; // 40?36'

        // ---- Seconds ----
        // To get the value in seconds is required:
        // 1? - removing the degree value to the initial value: 40 - 40.601203 = 0.601203;
        // 2? - convert the value minutes (36') in decimal ( valMin/60 = 0.6) so
        // you can subtract the previous value: 0.601203 - 0.6 = 0.001203;
        // 3? - now that you have the seconds value in decimal,
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
        result += valSec + '"'; // 40?36'4.331"

        // Returns the resulting string.
        return result;
	}
	showInf(tpc) {
	this.horoService.getArticle(tpc)
	.subscribe(res => {
		//this.info = '';
		if(res['title'].indexOf('ERROR') == -1)
			this.router.navigate(['/article'], {state: res});
	}, (err) => {
//		this.info = JSON.stringify(err);
	});
 }
    calcPanch(cd) {
		//this.sdt = cd;
			//var cd = new Date();
			console.log('calcPanch', cd);
			//console.log('ofset', this.ofset);
		  var jd = this.shareService.getJD(cd.getDate(), cd.getMonth()+1, cd.getFullYear());
		  console.log('jd', jd);
		  console.log('lat', this.clat);
		  console.log('lng', this.clng);
		  //var datestr = this.horoService.getDateString(cd)
		 // var utcoffset = moment(datestr).tz(this.localtz).format('Z');
		  //var a = utcoffset.split(":")
		  //var tz = parseFloat(a[0]) + parseFloat(a[1])/60.0
		  this.sunrise = this.shareService.calcSunriseSet(1, jd, Number(this.clat), Number(this.clng), this.ofset, 0);
		  console.log('sunrise', this.sunrise);
		  this.sunset = this.shareService.calcSunriseSet(0, jd, Number(this.clat), Number(this.clng), this.ofset, 0);
		  console.log('sunset', this.sunset);
		var startTime=moment(this.sunrise +':00 am', "HH:mm:ss a");
		var endTime=moment(this.sunset + ':00 pm', "HH:mm:ss a");
		var duration = moment.duration(endTime.diff(startTime));
		var hours = duration.asHours();
		var minutes = duration.asMinutes()%60;
		//var tmins = moment(endTime).add(startTime.minutes(), 'm');
		var smins = startTime.hour()*60 + startTime.minute();
		var emins = endTime.hour()*60 + endTime.minute();
		var tmins = (smins + emins)/2;
		var tothrs = Math.floor(tmins/60);
		var totmins = (tmins % 60);
		var midTime = moment(tothrs.toString() + ':' + totmins.toString() + ':00 pm', "HH:mm:ss a");
		//var lnt = Math.floor(tothrs/2);
		//var totmins = hours*60 + minutes;
		var totalsec = hours*60*60 + minutes*60;
		var abhsecs = Math.floor(totalsec/2);
		var abh = Math.floor((hours/30)*60);
		var abhs = moment(midTime).subtract(abh, 'm');
		var abhe = moment(midTime).add(abh, 'm');
		var ethsec = Math.floor(totalsec/8);
		var ethmin = Math.floor(ethsec/60);
		var eth = moment.utc(ethsec*1000).format('HH:mm:ss');
		var weekdays = new Array(7);
		weekdays[0] = "SUN|8|5";
		weekdays[1] = "MON|2|4";
		weekdays[2] = "TUE|7|3";
		weekdays[3] = "WED|5|2";
		weekdays[4] = "THU|6|1";
		weekdays[5] = "FRI|4|7";
		weekdays[6] = "SAT|3|6";	
        var rwv = parseInt(weekdays[cd.getDay()].split('|')[1]);
        var ywv = parseInt(weekdays[cd.getDay()].split('|')[2]);
        var srhu = moment(startTime).add((rwv-1)*ethmin, 'm');
        var erhu = moment(srhu).add(ethmin, 'm');
        var sym = moment(startTime).add((ywv-1)*ethmin, 'm');
        var eym = moment(sym).add(ethmin, 'm');
        this.rahukal = srhu.format('HH:mm')	+ ' To ' + erhu.format('HH:mm');
        this.yama = sym.format('HH:mm')	+ ' To ' + eym.format('HH:mm');
		this.abhjit = abhs.format('HH:mm') + ' To ' + abhe.format('HH:mm');	
	}
	nakdtl() {
	 this.router.navigate(['/nak-info'], {queryParams : {name: this.nak.split(' ')[0]}});
 }
}
