import { Component, OnInit, NgModule, Renderer2, AfterViewInit, ViewChild, ElementRef, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Platform, MenuController } from '@ionic/angular';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { WheelSelector } from '@awesome-cordova-plugins/wheel-selector/ngx';
//import { AdMob } from "ionic-admob";
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';
import { ChartSettingsPage } from '../chart-settings/chart-settings.page';
import * as sublords from '../sublords.json';
import * as lunapics from '../lunapics.json';
import * as moment from 'moment';
import * as moon_phases from '../moon_phases.json';
import * as mon_weeks from '../mon_weeks.json';
import * as mons from '../mons.json';
import { WeekDay } from '../week-day';
import { LunarDay } from '../lunar-day';
declare var admob;

@Component({
  selector: 'app-hindu-cal',
  templateUrl: './hindu-cal.page.html',
  styleUrls: ['./hindu-cal.page.scss'],
  providers: [WheelSelector]
})
export class HinduCalPage implements OnInit {
   @ViewChild('hinduCal', {static: false}) hinduCal;
   sublords_v: any = (sublords as any).default;
   lunapics_v: any = (lunapics as any).default;
   moon_phases_v: any = (moon_phases as any).default;
   mon_weeks_v: any = (mon_weeks as any).default;
   mons_v: any = (mons as any).default;
   jsonData = {
	   month: [
		  { name: "JAN", id: '1' },
		  { name: "FEB", id: '2' },
		  { name: "MAR", id: '3' },
		  { name: "APR", id: '4' },
		  { name: "MAY", id: '5' },
		  { name: "JUN", id: '6' },
		  { name: "JUL", id: '7' },
		  { name: "AUG", id: '8' },
		  { name: "SEP", id: '9' },
		  { name: "OCT", id: '10' },
		  { name: "NOV", id: '11' },
		  { name: "DEC", id: '12' },
		],
		year: [],
	  }
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
  yoga: string = '';
  karana: string = '';
 // clat: string;
  //clng: any;
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
  monyer: string = '';
  cal: string = 'Show Calendar';
  hideCALD: boolean = false;
  fetchCAL: boolean = true;
  svgCal: any;
  nrefs: number = 0;
  //ayanINF: string = '';
  aynt: string = ''
  mid: number = 1;
  yid: number = 1;
  ofset: number = 1;
  hcal: any;
  //lstnr_1: Function; lstnr_2: Function; lstnr_3: Function; lstnr_4: Function; lstnr_5: Function; lstnr_6: Function; lstnr_7: Function; lstnr_8: Function; lstnr_9: Function; lstnr_10: Function; lstnr_11: Function; lstnr_12: Function; lstnr_13: Function; lstnr_14: Function; lstnr_15: Function; lstnr_16: Function;
  //lstnr_17: Function; lstnr_18: Function; lstnr_19: Function; lstnr_20: Function; lstnr_21: Function; lstnr_22: Function; lstnr_23: Function; lstnr_24: Function; lstnr_25: Function; lstnr_26: Function; lstnr_27: Function; lstnr_28: Function; lstnr_29: Function; lstnr_30: Function; lstnr_31: Function;
  constructor(private router: Router, public platform: Platform, private menu: MenuController, public selector: WheelSelector, public horoService: HoroscopeService, public shareService: ShareService, public translate: TranslateService, private file: File, public eleRef: ElementRef, public renderer: Renderer2) { 
	  for(let n =1; n < 3000; n++) this.jsonData.year.push({name: n.toString(),id: n.toString()});
     platform.ready().then(() => {
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
		this.shareService.getPLAN().then((pln) => {
			//if(pln.name != 'com.mypubz.eportal.astrologer') this.showBanner();
		 }, (err) => {
		});	
      });
  }

  ngOnInit() {
    console.log('hindu-cal ngOnInit');
    this.shareService.getPLAN()
		   .then(res => {
	}, (err) => {
	});	 
  }
  ngAfterViewInit()
  {
		this.localtz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		var cd = new Date();
		this.ofset = -(cd.getTimezoneOffset() / 60);
		var m = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
		// var n = cd.getTimezoneOffset();
		 //n = n/60;
		 //this.ofset = Number(n.toFixed(1));
		 this.mon = m[cd.getMonth()];
		 this.yer = cd.getFullYear().toString();
		 this.mid = cd.getMonth()+1;
		 this.yid = cd.getFullYear();
		let my: string = (this.shareService.getLANG() == 'en') ? this.mon_weeks_v[this.mon.toLowerCase()].split('|')[0] + ' '  + this.yer: (this.shareService.getLANG() == 'te') ? this.mon_weeks_v[this.mon.toLowerCase()].split('|')[1] + ' '  + this.yer : this.mon_weeks_v[this.mon.toLowerCase()].split('|')[2] + ' ' + this.yer;
		 this.monyer = my; 
		this.info = 'Calculating panchang...';
		this.calcPanch(cd);
		this.info = 'Generating calendar...';
		this.showCal(cd.getMonth()+1, cd.getFullYear());
}
    ionViewWillEnter() {
    console.log('ionViewDidEnter hindu-cal');
		var ayn = this.shareService.getRAYNM();
		this.aynt = 'NC LAHIRI';
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
					this.aynt = 'NC LAHIRI';
					break;
			}
		}
		//this.ayanINF = '<span><strong>AYANAMSA:</strong></span><span class="more" tappable (click)="chgayan()">'+say+'</span>';
    if(this.nrefs > 0) {
		this.info = 'Updating....';
		if(this.mid == 0 || this.yid == 0) {
			var m = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
			var cd = new Date();
			// var n = cd.getTimezoneOffset();
			 //n = n/60;
			 //this.ofset = Number(n.toFixed(1));
			 this.mon = m[cd.getMonth()];
			 this.yer = cd.getFullYear().toString();
			 this.mid = cd.getMonth()+1;
			 this.yid = cd.getFullYear();
			let my: string = (this.shareService.getLANG() == 'en') ? this.mon_weeks_v[this.mon.toLowerCase()].split('|')[0] + ' '  + this.yer: (this.shareService.getLANG() == 'te') ? this.mon_weeks_v[this.mon.toLowerCase()].split('|')[1] + ' '  + this.yer : this.mon_weeks_v[this.mon.toLowerCase()].split('|')[2] + ' ' + this.yer;
			 this.monyer = my; 
		}
		this.showCal(this.mid, this.yid);
	}
	this.nrefs++;
   }
 
  ngOnDestroy() {
	for(let n = 1; n < 32; n++) {
		if(this['lstnr_'+n.toString()]) this['lstnr_'+n.toString()]();
	}
 }
  setCal(evt) {
	  var m = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
	  //var cd = new Date();
   this.selector.show({
      title: "Month & Year",
      items: [
        this.jsonData.month, this.jsonData.year
      ],
      displayKey: 'name',
      defaultItems: [
        {index: 0, value: m[this.mid-1]},
        {index: 1, value: this.yid.toString()}
      ]
    }).then(
      result => {
		this.mon = result[0].name;
		this.yer = result[1].name;
		let my: string = (this.shareService.getLANG() == 'en') ? this.mon_weeks_v[this.mon.toLowerCase()].split('|')[0] + ' '  + this.yer: (this.shareService.getLANG() == 'te') ? this.mon_weeks_v[this.mon.toLowerCase()].split('|')[1] + ' '  + this.yer : this.mon_weeks_v[this.mon.toLowerCase()].split('|')[2] + ' ' + this.yer;
        this.monyer = my;
		this.yid = Number(result[1].name);
		this.mid = Number(this.jsonData.month[result[0].index].id);
		this.showCal(this.mid, this.yid);
      },
      err => console.log('Error occurred while getting result: ' + JSON.stringify(err))
      );	
  }
  showCal(m,y)
  {
	  console.log('month', m);
	  console.log('year', y);
	for (let child of this.hinduCal.nativeElement.children) {
			this.renderer.removeChild(this.hinduCal.nativeElement, child);
	}
 	let ayanid = 4;
	if(this.shareService.getRAYNM()) ayanid = Number(this.shareService.getRAYNM());
	this.info = 'Calculating Hindu Calendar for  ' + this.monyer + '..' ;
	this.horoService.calForMon(m, y, this.shareService.getCLAT().toString()+'|'+this.shareService.getCLNG().toString(), this.localtz, ayanid)
		.subscribe(res => {
			this.info = '';
		this.hcal = res;
		this.publishReport(res);
	 }, (err) => {
		this.info = err;
	});
 }
  publishReport(stars: any)
  {
	//this.showCal1 = true;
	//this.mon = stars[0].date.split(',')[0].split(' ')[1];
	//this.yer = stars[0].date.split(',')[1].split(' ')[0];
	//console.log('publishReport', stars[0]);
	//var mons = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
	//var dt = new Date();
	//this.mon = mons[dt.getMonth()];//stars[0].date.split(',')[0].split(' ')[1];
	//this.yer = dt.getFullYear().toString();//stars[0].date.split(',')[1].split(' ')[0];
	this.svgCal = this.grid(6, this.device_width/6, this.device_width, stars);
	this.renderer.appendChild(this.hinduCal.nativeElement, this.svgCal);
	//this.mon = '';
	//this.yer = '';
	//let c: boolean = false;
	//for(var i = 0; i < stars.length; i++)
	//{
	//	if(this.mon != stars[i].date.split(',')[0].split(' ')[1]) {
	//	   this.mon = stars[i].date.split(',')[0].split(' ')[1];
	//	   this.yer = stars[i].date.split(',')[1].split(' ')[0];
	//	   c = true;
	//	   break;
	//	}
	//}
	//let f: boolean = true;
	//for(let key of Object.keys(stars)) {
	//	if(f) { 
	//		this.getPanch(key);
	//		f = false;
	//	}
	//}
	let listItems = Array.from(this.eleRef.nativeElement.querySelectorAll('*[id^="CDY"]'))
	listItems.forEach((listItem, j) => {
		this.renderer.listen(
			listItem, 
			'click',
			(evt) => {
				evt.stopPropagation();
				console.log('clicked', evt);
				const clickedElement = evt.target as HTMLElement;
				const ids = clickedElement.id.split('-');
				console.log('clicked id', ids[0]);
				let dmy : string = ids[0].split('|')[1];
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
		let cdy: string = '';
		var cd = new Date();
		let tday: string = cd.getDate().toString().trim();
		let btdy: boolean = false;
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
				//this['lstnr_' + key.split(',')[0].split(' ')[2]] = 

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
					this.renderer.setAttribute(text1, "id", 'CDY|'+key+"-t1" + k.toString() + dx.toString());
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
					this.renderer.setAttribute(text2, "id", 'CDY|'+key+"-t2" + k.toString() + dx.toString());
					var text3 = document.createElementNS("http://www.w3.org/2000/svg", "text");
					this.renderer.appendChild(text3, document.createTextNode(this.shareService.translate_func(oW[key].tithi)));
					this.renderer.setAttribute(text3, "font-size", "10px");
					this.renderer.setAttribute(text3, "font-weight", "bold");
					this.renderer.setAttribute(text3, "x", (size*dx + size/2).toString());
					this.renderer.setAttribute(text3, "y", (size*k + 25 + size/2 + 20).toString());
					this.renderer.setAttribute(text3, "alignment-baseline", "middle");
					this.renderer.setAttribute(text3, "text-anchor", "middle");
					this.renderer.setAttribute(text3, "id", 'CDY|'+key+"-t3" + k.toString() + dx.toString());
					g.appendChild(text1);
					g.appendChild(text2);			   
					g.appendChild(text3);			   
					if(oW[key].tithi == 'Purnima' || oW[key].tithi == 'Amavasya' || oW[key].tithi == 'Sapthami') {
						var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
						this.renderer.setAttribute(image, "x", (size*dx).toString());
						this.renderer.setAttribute(image, "y", (size*k + 25).toString());
						this.renderer.setAttribute(image, "height", "16");
						this.renderer.setAttribute(image, "width", "16");
						this.renderer.setAttribute(image, "id", 'CDY|'+key+"-i" + k.toString() + dx.toString());
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
				    if(tcal == tday && cd.getMonth()+1 == this.mid && cd.getFullYear() == this.yid) {
						cdy = key;
					    console.log(key.split(',')[0].split(' ')[2].trim());
						 lDay.tithi = oW[key].tithi;
						 lDay.star = oW[key].star;
						 //lDay.lunarStrength = (oW[key].lunarStrength.indexOf('Chandrastama') > -1) ? 'Chandrastama' : 'Bad';
						 lDay.moonPhase = oW[key].moonPhase;
						 lDay.calX = (size*dx).toString();
						 lDay.calY = (size*k + 25).toString();
						 this.tithi = oW[key].tithi;
						 this.nak_en = oW[key].star;
						 this.nak = this.shareService.translate_func(oW[key].star);
						 btdy = true;
						 this.getPanch(key);
					}

				//}
				svg.appendChild(g);
			}
		}
		if(btdy) {
			var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		    var bx = document.createElementNS("http://www.w3.org/2000/svg", "rect");
			this.renderer.setAttribute(bx, "width", size.toString());
			this.renderer.setAttribute(bx, "height", size.toString());
			this.renderer.setAttribute(bx, "stroke", "#FF5733");
			this.renderer.setAttribute(bx, "stroke-width", "2");
			this.renderer.setAttribute(bx, "fill-opacity", "0.0");
			this.renderer.setAttribute(bx, "id", "CDY|" +cdy);//lnc.toString());
			this.renderer.setAttribute(bx, "x", lDay.calX);
			this.renderer.setAttribute(bx, "y", lDay.calY);
			this.renderer.appendChild(g, bx);
			svg.appendChild(g);
        }
		console.log(svg);
		return svg;
	};
	
	getWeekDays(strs, wday)
	{
	  console.log('mom', this.mon);
	  
	  let oWDays: WeekDay[] = [];
	  let dmon: number = 0;
		for(let key of Object.keys(strs)) {
		  if(this.mon && strs[key].date.split(',')[0].split(' ')[1].toLowerCase() != this.mon.toLowerCase()) continue;
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
    getMoonPhase(cd) {
		this.info = 'Calculating moon phase..'
		let ayanid: number = (this.shareService.getRAYNM()) ? Number(this.shareService.getRAYNM()) : 1;
		this.horoService.getProMoonPhase(this.shareService.getCLAT(), this.shareService.getCLNG(), cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds() + 'Z', this.localtz, ayanid)
		   .subscribe(res3 => {
		   this.showPAN = true;
		   this.info = '';
		   this.nak_en = res3['birthStar'];
		   this.nak = this.shareService.translate_func(res3['birthStar']);
		   var tithiRem = res3['tithiRem'];
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
		   //var rem = Math.floor((Number(tithiRem)*Number(totmins))/100);
		   console.log('tithiRem in hrs=', tithiRem);
		   var tite = moment(startTime).add(Number(tithiRem)*60, 'm');
		   var isNextDay = moment(tite).isAfter(moment(startTime), 'day'); // Check if it's the next day
		   var endTimeFormatted = isNextDay ? tite.format('HH:mm, MMM DD') : tite.format('HH:mm');
		   this.tithi = this.shareService.translate_func(res3['tithi']) + ' till ' + endTimeFormatted;
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
			//this.info = err;
	  });
	}
	getPanch(dt) {
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
	rightmenu() {
		this.menu.open('second');
	}
}
