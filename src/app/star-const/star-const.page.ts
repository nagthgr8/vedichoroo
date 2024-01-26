import { Component, OnInit, NgModule, Renderer2, AfterViewInit, ViewChild, ElementRef, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import { ChartSettingsPage } from '../chart-settings/chart-settings.page';
import * as moment from 'moment';
import * as moon_phases from '../moon_phases.json';
import * as mon_weeks from '../mon_weeks.json';
import * as mons from '../mons.json';
import * as lunapics from '../lunapics.json';
import { WeekDay } from '../week-day';
import { LunarDay } from '../lunar-day';
import * as tithi_info from '../tithi_info.json';
declare var admob;

@Component({
  selector: 'app-star-const',
  templateUrl: './star-const.page.html',
  styleUrls: ['./star-const.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StarConstPage implements OnInit {
  @ViewChild('hinduCal1', {static: true}) hinduCal1;
  @ViewChild('hinduCal2', {static: true}) hinduCal2;
   moon_phases_v: any = (moon_phases as any).default;
   mon_weeks_v: any = (mon_weeks as any).default;
   lunapics_v: any = (lunapics as any).default;
   mons_v: any = (mons as any).default;
   tithi_info_v: any = (tithi_info as any).default;
  dt1 :string = '';dt2 :string = '';dt3 :string = '';dt4 :string = '';dt5 :string = '';dt6 :string = '';dt7 :string = '';dt8 :string = '';dt9 :string = '';dt10 :string = '';dt11 :string = '';dt12 :string = '';dt13 :string = '';dt14 :string = '';dt15 :string = '';dt16 :string = '';dt17 :string = '';dt18 :string = '';dt19 :string = '';dt20 :string = '';dt21 :string = '';dt22 :string = '';dt23 :string = '';dt24 :string = '';dt25 :string = '';dt26 :string = '';dt27 :string = '';dt28 :string = '';dt29 :string = '';dt30 :string = '';
  st1 :string = '';st2 :string = '';st3 :string = '';st4 :string = '';st5 :string = '';st6 :string = '';st7 :string = '';st8 :string = '';st9 :string = '';st10 :string = '';st11 :string = '';st12 :string = '';st13 :string = '';st14 :string = '';st15 :string = '';st16 :string = '';st17 :string = '';st18 :string = '';st19 :string = '';st20 :string = '';st21 :string = '';st22 :string = '';st23 :string = '';st24 :string = '';st25 :string = '';st26 :string = '';st27 :string = '';st28 :string = '';st29 :string = '';st30 :string = '';
  lu1 :string = '';lu2 :string = '';lu3 :string = '';lu4 :string = '';lu5 :string = '';lu6 :string = '';lu7 :string = '';lu8 :string = '';lu9 :string = '';lu10 :string = '';lu11 :string = '';lu12 :string = '';lu13 :string = '';lu14 :string = '';lu15 :string = '';lu16 :string = '';lu17 :string = '';lu18 :string = '';lu19 :string = '';lu20 :string = '';lu21 :string = '';lu22 :string = '';lu23 :string = '';lu24 :string = '';lu25 :string = '';lu26 :string = '';lu27 :string = '';lu28 :string = '';lu29 :string = '';lu30 :string = '';
  str1 :string = '';str2 :string = '';str3 :string = '';str4 :string = '';str5 :string = '';str6 :string = '';str7 :string = '';str8 :string = '';str9 :string = '';str10 :string = '';str11 :string = '';str12 :string = '';str13 :string = '';str14 :string = '';str15 :string = '';str16 :string = '';str17 :string = '';str18 :string = '';str19 :string = '';str20 :string = '';str21 :string = '';str22 :string = '';str23 :string = '';str24 :string = '';str25 :string = '';str26 :string = '';str27 :string = '';str28 :string = '';str29 :string = '';str30 :string = '';
  info: string = '';
  dob: string = '';
  lagna_lord: string = '';
  moon_sign: string = '';
  moon_sign_en: string = '';
  moon_deg :number = 0;
  sun_sign: string = '';
  birth_star: string = '';
  birth_star_en: string = '';
  star_lord: string = '';
  moon_phase: string = '';
  birthSignDeg: string;
  device_width :number = 0;
  device_height :number = 0;
  showList: boolean;
  showGrid: boolean;
  showBS: boolean;
  showLgnds: boolean;
  showBD: boolean = false;
  //showCal1: boolean;
  //showCal2: boolean;
  //objectKeys = Object.keys;
  //oTransits: StarStrength[] = [];
  mon: string = '';
  yer: string = '';
  ayanINF: string = ''; 
  aynt: string = ''
  nrefs: number = 0;
  binf: any;
  lbl: string = 'lbl';
  sdt: any = '';
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
  nak_en: string = '';
  tithi: string = '';
  btithi: string = '';
  yoga: string = '';
  karana: string = '';
  //clat: number = 0;
  //clng: number = 0;
  localtz: string = '';
  lunapic: string = '';
  ofset: number = 1;
  hcal: any;
  lstnr: any;
  nl: number = 0;
  tithinf: string = '';
  amsg: string = ''; atitle: string = '';
  constructor(private router: Router, private route: ActivatedRoute, platform: Platform, public renderer: Renderer2, public eleRef: ElementRef, public horoService: HoroscopeService, public shareService: ShareService, private file: File, private translate: TranslateService){//,public admob: AdMob, ) {
	  this.atitle = 'Star Strength & Lunar Strength';
	  this.amsg  = 'Your star strength and lunar strength are calculated from your birth star and the zodiac, which is based on some advanced research done by legendary astrologer B V Raman, the days are highlighted with different colors in the calendar. All dates highlighted with green circles are good for taking up the specific activity related to the nakshatra, dates in red circles are to be avoided, dates in the thick red border are Chandrastama days which is considered very inauspicious. Also, the dates highlighted with a thin red border are to be avoided, these are the 6th or 12th lunar day of your zodiac sign';
   platform.ready().then(() => {
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
		this.translate.use(this.shareService.getLANG());
		this.shareService.getPLAN().then((pln) => {
			//if(pln.name != 'com.mypubz.eportal.astrologer') {
				//this.launchInterstitial();
				//this.showBanner();
			//}
		}, (err) => {
		});
   });
   this.lstnr = [];
  }
  ngOnInit() {
 	this.binf = this.router.getCurrentNavigation().extras.state;
		//this.clat = this.shareService.getCLAT();
		//this.clng = this.shareService.getCLNG();
	  if(this.shareService.getCLAT() == -1) {
		  this.info = "The App could not access current location. This feature will not work! please check your App settings. Please contact info@vedichoroo.com for futher help";
	  } else {
		var cd = new Date();
		let ayanid: number = (this.shareService.getRAYNM()) ? Number(this.shareService.getRAYNM()) : 4;
		this.horoService.getProMoonPhase(this.shareService.getCLAT(), this.shareService.getCLNG(), cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes()+ ':' + cd.getSeconds()+'Z', Intl.DateTimeFormat().resolvedOptions().timeZone, ayanid)
			   .subscribe(res => {
			var m = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
			var cd = new Date();
			this.sdt = cd;
			// var n = cd.getTimezoneOffset();
			 //n = n/60;
			 //this.ofset = Number(n.toFixed(1));
			 this.mon = m[cd.getMonth()];
			 this.yer = cd.getFullYear().toString();
			// this.mid = cd.getMonth()+1;
			 //this.yid = cd.getFullYear();
			let my: string = (this.shareService.getLANG() == 'en') ? this.mon_weeks_v[this.mon.toLowerCase()].split('|')[0] + ' '  + this.yer: (this.shareService.getLANG() == 'te') ? this.mon_weeks_v[this.mon.toLowerCase()].split('|')[1] + ' '  + this.yer : this.mon_weeks_v[this.mon.toLowerCase()].split('|')[2] + ' ' + this.yer;
			 //this.monyer = my; 
			this.sunrise = res['sunrise'];
			this.sunset = res['sunset'];
			this.localtz = Intl.DateTimeFormat().resolvedOptions().timeZone;
			this.ofset = -(cd.getTimezoneOffset() / 60);
			this.calcPanch(cd);
			//this.showCal(cd.getMonth(), cd.getFullYear());
			this.info = 'Please wait..';
			//this.getMoonPhase(cd);
			
		}, (err) => {
				this.info = JSON.stringify(err);
		  });
		  this.shareService.getPLAN()
			   .then(res => {
			if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
				//admob.setDevMode(true);
			admob.banner.show({
				id: {
				  // replace with your ad unit IDs
				  android: 'ca-app-pub-8442845715303800/4867580730',
				  ios: 'ca-app-pub-8442845715303800/4867580730',
				},
			  }).then(() => {
					setTimeout(() => {
					  admob.banner.hide({
						// replace with your ad unit IDs
						android: 'ca-app-pub-8442845715303800/4867580730',
						ios: 'ca-app-pub-8442845715303800/4867580730',
					  })
					}, 10000)
			  })
			}
		 });
		if(this.shareService.getDOB()) {
			this.dob = this.shareService.getDOB();
			console.log('getDOB', this.dob);
		}
		this.info = 'Analyzing stars..';
		this.horoService.getBirthInfoEx(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, ayanid)
		   .subscribe(res => {
			   this.showBD = true;
			   this.info = '';
			   this.dob = res['dob'];
			   this.lagna = this.shareService.translate_func(res['lagna']);
			   this.lagna_lord = this.shareService.translate_func(res['lagna_lord']);
			   this.moon_sign_en = res['moon_sign'];
			   this.moon_sign = this.shareService.translate_func(res['moon_sign']);
			   this.sun_sign = this.shareService.translate_func(res['sun_sign']);
			   this.btithi = this.shareService.translate_func(res['tithi']);
			   this.birth_star_en = res['birth_star'];
			   this.birth_star = this.shareService.translate_func(res['birth_star'].split(' ')[0]);
			   this.star_lord = this.shareService.translate_func(res['star_lord']);
			   this.moon_phase = this.shareService.translate_func(res['moon_phase']);
		   this.birthSignDeg = res['moon_deg'];
		   this.showBS = true;
			 this.getStarConstReport();
			 this.showList = false;
			 this.showLgnds = true;
		  }, (err) => {
			this.info = JSON.stringify(err);
		  }) ;
	  }
 }
 ngAfterViewInit() {
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad StarConstPage');
  }
  ionViewDidEnter() {
		let ayanid: number = (this.shareService.getRAYNM()) ? Number(this.shareService.getRAYNM()) : 4;
	this.aynt = 'NC LAHIRI';
	if(ayanid) {
		switch(Number(ayanid))
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
					this.aynt = 'NC LAHIRI';
					break;
			}
	}
    if(this.nrefs > 0) {
		for (let child of this.hinduCal1.nativeElement.children) {
			this.renderer.removeChild(this.hinduCal1.nativeElement, child);
		}
		for (let child of this.hinduCal2.nativeElement.children) {
			this.renderer.removeChild(this.hinduCal2.nativeElement, child);
		}
		this.info = 'Please wait...';
		this.horoService.getBirthInfoEx(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, Number(ayanid))
		   .subscribe(res => {
		   this.info = '';
		   this.dob = res['dob'];
		   this.lagna = this.shareService.translate_func(res['lagna']);
		   this.lagna_lord = this.shareService.translate_func(res['lagna_lord']);
		   this.moon_sign_en = res['moon_sign'];
		   this.moon_sign = this.shareService.translate_func(res['moon_sign']);
		   this.sun_sign = this.shareService.translate_func(res['sun_sign']);
		   this.tithi = this.shareService.translate_func(res['tithi']);
		   this.birth_star_en = res['birth_star'];
		   this.birth_star = this.shareService.translate_func(res['birth_star']);
		   this.star_lord = this.shareService.translate_func(res['star_lord']);
		   this.moon_phase = this.shareService.translate_func(res['moon_phase']);
	   this.birthSignDeg = res['moon_deg'];
			 this.getStarConstReport();
			 this.showList = false;
			 this.showLgnds = true;
			 
		  }, (err) => {
			this.info = JSON.stringify(err);
		  }) ;
	  }
	this.nrefs++;
	
  }
   ngOnDestroy() {
   }
  getStarConstReport()
  {
  this.info = '';
  this.info = 'Generating Your 1 Month Personalized Calendar. Please wait...';
	this.shareService.getSCR(this.birth_star_en, this.moon_sign_en).then( trns => {
		if(trns) {
			this.info = '';
			this.hcal = trns;
			this.publishReport(trns);
		} else {
		let ayanid: number = 4;
		if(this.shareService.getRAYNM()) ayanid = Number(this.shareService.getRAYNM());
		this.horoService.getStarsForMon(this.birth_star_en, this.moon_sign_en, this.shareService.getCLAT(), this.shareService.getCLNG(), Intl.DateTimeFormat().resolvedOptions().timeZone, this.shareService.getLocalDST(), ayanid)
       .subscribe(res2 => {
		   this.shareService.setSCR(this.birth_star_en, this.moon_sign_en, res2);
		   this.info = '';
		   this.hcal = res2;
		   this.publishReport(res2);
      }, (err) => {
        this.info = JSON.stringify(err);
      }) ;
	 }
	})
	.catch(e => {
		let ayanid: number = 4;
		if(this.shareService.getRAYNM()) ayanid = Number(this.shareService.getRAYNM());
		this.horoService.getStarsForMon(this.birth_star_en, this.moon_sign_en, this.shareService.getCLAT(), this.shareService.getCLNG(), Intl.DateTimeFormat().resolvedOptions().timeZone, this.shareService.getLocalDST(), ayanid)
       .subscribe(res2 => {
			   this.shareService.setSCR(this.birth_star_en, this.moon_sign_en, res2);
			   this.info = '';
			   this.hcal = res2;
			   this.publishReport(res2);
      }, (err) => {
        this.info = JSON.stringify(err);
      }) ;
	});
	//}, (err) => {
		//	this.info = JSON.stringify(err);
	  //});
  }
  
  publishReport(stars: any)
  {
	 console.log('stars', stars);
	 var mons = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	//this.showCal1 = true;
	var dt = new Date();
	this.mon = mons[dt.getMonth()];//stars[0].date.split(',')[0].split(' ')[1];
	this.yer = dt.getFullYear().toString();//stars[0].date.split(',')[1].split(' ')[0];
	this.renderer.appendChild(this.hinduCal1.nativeElement, this.grid(6, this.device_width/6, this.device_width, stars));
	let c: boolean = false;
	let f: boolean = true;
	for(let key of Object.keys(stars)) {
				let dmy : string = key;
				let m = Number(this.mons_v[dmy.split(',')[0].split(' ')[1]]);
				let y = Number(dmy.split(',')[1]);
				let d =  Number(dmy.split(',')[0].split(' ')[2]);
				console.log('m', m);
				console.log('y', y);
				console.log('d', d);
				if(d == dt.getDate()) {
					var pdt = new Date(y, m-1, d, 6, 0, 0);
					this.calcPanch(pdt);
					this.getPanch(dmy);
				}
		
		if(f) { 
			this.getPanch(key);
			f = false;
		}
		if(stars[key].date.split(',')[0].split(' ')[1] != this.mon) { 
		   this.mon = stars[key].date.split(',')[0].split(' ')[1];
		   this.yer = stars[key].date.split(',')[1].split(' ')[0];
			c = true;
			break;
		}
	}
   var keys = Object.keys(stars);
   var last = keys[keys.length-1];
	var ldt = new Date(Number(stars[last].date.split(',')[0].split(' ')[2]), Number(this.mon), Number(this.yer));
	if(ldt < dt) {
		this.info = 'This calendar is cached, hence may not be able to display for current date. Please clear the cache from App settings & reopen the App to get updated calendar. Pleaase contact info@vedichoroo.com for futher help';
	}
	//for(var i = 0; i < stars.length; i++)
	//{
	//	if(this.mon != stars[i].date.split(',')[0].split(' ')[1]) {
	//	   this.mon = stars[i].date.split(',')[0].split(' ')[1];
	//	   this.yer = stars[i].date.split(',')[1].split(' ')[0];
	//	   c = true;
	//	   break;
	//	}
	//}
	if(c) {
	    //this.showCal2 = true;
		this.renderer.appendChild(this.hinduCal2.nativeElement, this.grid(6, this.device_width/6, this.device_width, stars));
	}
	let listItems = Array.from(this.eleRef.nativeElement.querySelectorAll('*[id^="CDY"]'))
	listItems.forEach((listItem, j) => {
		this.renderer.listen(
			listItem, 
			'click',
			(evt) => {
				console.log('clicked', evt);
				console.log('clicked ', evt.path[0]);
				console.log('clicked id', evt.path[0].id);
				let dmy : string = evt.path[0].id.split('|')[1];
				let m = Number(this.mons_v[dmy.split(',')[0].split(' ')[1]]);
				let y = Number(dmy.split(',')[1]);
				let d =  Number(dmy.split(',')[0].split(' ')[2]);
				console.log('m', m);
				console.log('y', y);
				console.log('d', d);
				var dt = new Date(y, m-1, d, 6, 0, 0);
				this.calcPanch(dt);
				this.getPanch(dmy);
			}
		);
	})
  }
  
	grid(numberPerSide, size, pixelsPerSide, naks) {
		var mns = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
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
				let tcal: string = key.split(',')[0].split(' ')[2].trim();
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
				if(dx > 5) dx = dx - 5;
				
				var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
			    var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
				this.renderer.setAttribute(box, "width", size.toString());
				this.renderer.setAttribute(box, "height", size.toString());
				this.renderer.setAttribute(box, "border", "1");
				this.renderer.setAttribute(box, "stroke", "#000000");
				this.renderer.setAttribute(box, "fill", "#ffffff");
				this.renderer.setAttribute(box, "id", 'CDY|'+key);//tcal.toString());
				this.renderer.setAttribute(box, "x", (size*dx).toString());
				this.renderer.setAttribute(box, "y", (size*k + 25).toString());
				this.renderer.appendChild(g, box);
//			   cal = this.getCal(naks, wks[k], i);
//			   if(cal) {
//					var dmon = cal.date.split(',')[0].split(' ')[2];
				//this['lstnr_' + key.split(',')[0].split(' ')[2]] =
				//this.lstnr[this.nl++] = this.renderer.listen(box, 'click', (event) => {
					//console.log('clicked ', event.path[0]);
					//console.log('clicked id', event.path[0].id);
					//let m = Number(this.mons_v[event.path[0].id.split(',')[0].split(' ')[1]]);
					//let y = Number(event.path[0].id.split(',')[1]);
					//let d =  Number(event.path[0].id.split(',')[0].split(' ')[2]);
					//console.log('m', m);
					//console.log('y', y);
					//console.log('d', d);
					//var dt = new Date(y, m-1, d, 6, 0, 0);
					//this.calcPanch(dt);
					//this.getPanch(event.path[0].id);
				//});
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
					this.renderer.appendChild(text2, document.createTextNode(this.translate2(oW[key].star)));
					this.renderer.setAttribute(text2, "font-size", "10px");
					this.renderer.setAttribute(text2, "font-weight", "bold");
					this.renderer.setAttribute(text2, "x", (size*dx + size/2).toString());
					this.renderer.setAttribute(text2, "y", (size*k + 25 + size/2 + 10).toString());
					this.renderer.setAttribute(text2, "alignment-baseline", "middle");
					this.renderer.setAttribute(text2, "text-anchor", "middle");
					this.renderer.setAttribute(text2, "id", "t2" + k.toString() + dx.toString());
					var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
					this.renderer.appendChild(text3, document.createTextNode(this.translate2(oW[key].tithi)));
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
					if(oW[key].lunarStrength != null) {
						console.log('lstren', oW[key].lunarStrength);
						if(oW[key].lunarStrength.indexOf('Chandrastama' ) > -1 || oW[key].lunarStrength.indexOf('Bad') > -1) {
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
			this.renderer.setAttribute(bx, "stroke-width", (oLDays[key].lunarStrength == 'Chandrastama') ? "5" : "2");
			this.renderer.setAttribute(bx, "fill-opacity", "0.0");
			this.renderer.setAttribute(bx, "id", "CDY|" +key);//lnc.toString());
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
  
	translate2(lord: string)
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
	 this.router.navigate(['/chart-settings'], {state: binf});
	 
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
		this.sdt = cd;
			//var cd = new Date();
			console.log('calcPanch', cd);
			console.log('ofset', this.ofset);
		  var jd = this.shareService.getJD(cd.getDate(), cd.getMonth()+1, cd.getFullYear());
		  console.log('jd', jd);
		  console.log('lat', this.shareService.getCLAT());
		  console.log('lng', this.shareService.getCLNG());
		  //var datestr = this.horoService.getDateString(cd)
		 // var utcoffset = moment(datestr).tz(this.localtz).format('Z');
		  //var a = utcoffset.split(":")
		  //var tz = parseFloat(a[0]) + parseFloat(a[1])/60.0
		  this.sunrise = this.shareService.calcSunriseSet(1, jd, this.shareService.getCLAT(), this.shareService.getCLNG(), this.ofset, 0);
		  console.log('sunrise', this.sunrise);
		  this.sunset = this.shareService.calcSunriseSet(0, jd, this.shareService.getCLAT(), this.shareService.getCLNG(), this.ofset, 0);
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
	getPanch(dt) {
		console.log('hcal', this.hcal);
		this.nak_en = this.hcal[dt].star;
		this.nak = this.shareService.translate_func(this.hcal[dt].star);
		this.yoga = this.hcal[dt].yoga;
		this.karana = this.hcal[dt].karana;
		let ky: string = this.hcal[dt].tithi.toLowerCase();
		if(ky != 'purnima' && ky != 'amavasya') {
			ky = (this.hcal[dt].moonPhase == 'waxing') ? this.hcal[dt].tithi.toLowerCase() + '-s' : this.hcal[dt].tithi.toLowerCase() + '-k';
		} 
		console.log(ky);
		this.lunapic = this.lunapics_v[ky];
		this.tithinf = this.tithi_info_v[this.hcal[dt].tithi];
		var tithiRem = this.hcal[dt].tithiRem;
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
		var rem = Math.floor((Number(tithiRem)*Number(totmins))/100);
		console.log('tithiRem in mins=', rem);
		var tite = moment(startTime).add(rem, 'm');
		this.tithi = this.shareService.translate_func(this.hcal[dt].tithi) + ' till ' + tite.format('HH:mm');
	}
	nakdtl() {
	 this.router.navigate(['/nak-info'], {state : this.nak_en.split(' ')[0] as any});
 }
	bsdtl() {
	 this.router.navigate(['/nak-info'], {state : this.birth_star_en.split(' ')[0] as any});
 }
	msgok() {
		this.amsg = '';
	}
}
