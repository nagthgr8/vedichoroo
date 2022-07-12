import { Component, OnInit, NgZone, Renderer2, ViewChild, ElementRef, ViewEncapsulation} from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Platform, MenuController} from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { Group } from '../group';
import * as sublords from '../sublords.json';
import * as lunapics from '../lunapics.json';
import * as ruler_name from '../ruler_name.json';
import * as planet_stars from '../planet_stars.json';
import * as moment from 'moment';
import * as moon_phases from '../moon_phases.json';
import * as mon_weeks from '../mon_weeks.json';
import * as mons from '../mons.json';
import { WeekDay } from '../week-day';
import { LunarDay } from '../lunar-day';
declare var admob;

@Component({
  selector: 'app-lif-event',
  templateUrl: './lif-event.page.html',
  styleUrls: ['./lif-event.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LifEventPage implements OnInit {
  @ViewChild('hinduCal', {static: false}) hinduCal;
   autocomplete;
  autocompleteItems;
  place: string = '';
  showA: boolean;
  life: string = '';
  chartanls: string = '';
  house_groups: Group[] = [];
  info: string = ''; info2: string = '';
  hg: string = '';
  kpd: any;
  mdas1: string = '';adas1: string = '';pdas1: string = '';pend1: string = '';
   sublords_v: any = (sublords as any).default;
   ruler_name_v: any =(ruler_name as any).default;
   planet_stars_v: any =(planet_stars as any).default;
   lunapics_v: any = (lunapics as any).default;
   moon_phases_v: any = (moon_phases as any).default;
   mon_weeks_v: any = (mon_weeks as any).default;
   mons_v: any = (mons as any).default;
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
  tithi: string = '';
  yoga: string = '';
  karana: string = '';
  clat: any;
  clng: any;
  localtz: string = '';
  lunapic: string = '';
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
  //lstnr_1: Function; lstnr_2: Function; lstnr_3: Function; lstnr_4: Function; lstnr_5: Function; lstnr_6: Function; lstnr_7: Function; lstnr_8: Function; lstnr_9: Function; lstnr_10: Function; lstnr_11: Function; lstnr_12: Function; lstnr_13: Function; lstnr_14: Function; lstnr_15: Function; lstnr_16: Function;
  //lstnr_17: Function; lstnr_18: Function; lstnr_19: Function; lstnr_20: Function; lstnr_21: Function; lstnr_22: Function; lstnr_23: Function; lstnr_24: Function; lstnr_25: Function; lstnr_26: Function; lstnr_27: Function; lstnr_28: Function; lstnr_29: Function; lstnr_30: Function; lstnr_31: Function;
  lid: number = -1;
  hcal: any;
  nfav: number = 0;
  constructor(private router: Router, public platform: Platform, private menu: MenuController, private horoService: HoroscopeService, public translate: TranslateService, private shareService: ShareService, private file: File, public eleRef: ElementRef, public renderer: Renderer2) { 
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
	this.kpd = this.router.getCurrentNavigation().extras.state;
	console.log('ngOnInit', this.kpd);
		for(let key of Object.keys(this.kpd.vim)) {
			if(this.kpd.vim[key].style == 'mdasc') this.mdas1 = key;
			else if(this.kpd.vim[key].style == 'adasc') this.adas1 = this.ruler_name_v[key.split('-')[1].toLowerCase()];
			else if(this.kpd.vim[key].style == 'pdasc') { 
				this.pdas1 = this.ruler_name_v[key.split('-')[2].toLowerCase()];
				var dts = this.kpd.vim[key].per.split('To');
				this.pend1 = dts[1].trim().split('/')[0] + '-' + dts[1].trim().split('/')[1] + '-' + dts[1].trim().split('/')[2];
			}
		}
		
	switch(this.kpd.title)
	{
		 case 'Lucky Days to sign an Agreement':
		  //  this.analyzeSAG();
		   this.lid = 1;
			break;
		 case 'Lucky Days for opening bank account':
		   // this.analyzeOB();
		   this.lid = 2;
			break;
		 case 'To undergo a treatment':
		   //  this.analyzeCC();
		   this.lid = 3;
			break;
		 case 'To Occupy a new house':
		   // this.analyzeOH();
		   this.lid = 4;
			break;
		 case 'To take delivery of vehicle':
		   // this.analyzeDV();
		   this.lid = 5;
			break;
		 case 'Filing a court case':
		   //  this.analyzeCC();
		   this.lid = 6;
			break;
		 case 'To apply for passport':
		   // this.analyzePP();
		   this.lid = 7;
			break;
		 case 'For college admission':
		   // this.analyzeCA();
		   this.lid = 8;
			break;
		 default:
		  break;
	}
    this.platform.ready().then(() => {
		let ayanid: number = (this.shareService.getRAYNM()) ? Number(this.shareService.getRAYNM()) : 1;
		var cd = new Date();
		this.horoService.getProMoonPhase(this.shareService.getCLAT(), this.shareService.getCLNG(), cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes()+ ':' + cd.getSeconds()+'Z', Intl.DateTimeFormat().resolvedOptions().timeZone, ayanid)
		   .subscribe(res => {
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
        this.sunrise = res['sunrise'];
		this.sunset = res['sunset'];
		this.tithi = this.shareService.translate_func(res['tithi']);;
		this.nak = this.shareService.translate_func(res['birthStar']);
		this.yoga = this.shareService.translate_func(res['yoga']);
		this.karana = this.shareService.translate_func(res['karana']);
		this.clat = this.shareService.getCLAT();
		this.clng = this.shareService.getCLNG();
		this.localtz = Intl.DateTimeFormat().resolvedOptions().timeZone;
		this.ofset = -(cd.getTimezoneOffset() / 60);
		this.calcPanch(cd);
		this.showCal(cd.getMonth()+1, cd.getFullYear());
		let ky: string = this.tithi.toLowerCase();
		if(ky != 'purnima' && ky != 'amavasya') {
			ky = (res['moonPhase'] == 'waxing') ? this.tithi.toLowerCase() + '-s' : this.tithi.toLowerCase() + '-k';
		} 
		console.log(ky);
		this.lunapic = this.lunapics_v[ky];
		this.info = 'Please wait..';
		//this.getMoonPhase(cd);
	}, (err) => {
			this.info = JSON.stringify(err);
	  this.horoService.addTicket('xxxxxxxx', 'technical', 'KPEVT', this.info)
	  						.subscribe(res => {
	 						});
	  });
     });
	
  	  this.shareService.getPLAN()
		   .then(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree'  && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
			//admob.setDevMode(true);
		  admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/9653489669',
			  ios: 'ca-app-pub-8442845715303800/9653489669',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/9653489669',
				ios: 'ca-app-pub-8442845715303800/9653489669',
			  })
			}, 10000)
		  })		
		}
	}, (err) => {
	});	 
		this.horoService.getJson('assets/data/life_evts.json')
			.subscribe(hgps => {
				for(let key of Object.keys(hgps)) {
				    let hg : Group = {
					  details: hgps[key]
					};
					this.house_groups[key] = hg;
				}
				console.log('house group', this.house_groups);
			}, (err) => {
			   console.log(JSON.stringify(err));
			});
  }
  analyze(evt)
  {
	  evt.stopPropogation();
      this.info = 'please wait...';
  }
  analyzeSAG() {
      	 
  }
  showCal(m,y)
  {
	  console.log('month', m);
	  console.log('year', y);
	for (let child of this.hinduCal.nativeElement.children) {
			this.renderer.removeChild(this.hinduCal.nativeElement, child);
	}
 	let ayanid = 1;
	if(this.shareService.getRAYNM()) ayanid = Number(this.shareService.getRAYNM());
	this.info = 'Generating..';
	this.horoService.calForMon(m, y, this.clat+'|'+this.clng, this.localtz, ayanid)
		.subscribe(res => {
			this.info = '';
			this.hcal = res;
		this.publishReport(res);
		       if(this.nfav == 0) {
				   this.info2 = '<p>No favourable dates found in this month</p>'
			   } else {
				   if(this.lid == 1) {
							this.info2 = '<div>Dates shown in Pink <img src="assets/imgs/cal_pink.png" alt="Vedic Horoo Hindu Calendar" /> are Good for signing an agreement</div>';
						} else if(this.lid == 2) {
							this.info2 = '<div>Dates shown in Pink <img src="assets/imgs/cal_pink.png" alt="Vedic Horoo Hindu Calendar" />are Good for opening a bank account</div>';
						} else if(this.lid == 3) {
							this.info2 = '<div>Dates shown in Pink <img src="assets/imgs/cal_pink.png" alt="Vedic Horoo Hindu Calendar" /> are Good for undergoing any heath treatment</div>';
						} else if(this.lid == 4) {
							this.info2 = '<div>Dates shown in Pink <img src="assets/imgs/cal_pink.png" alt="Vedic Horoo Hindu Calendar" />are Good for occupying a new house</div>';
						} else if(this.lid == 5) {
							this.info2 = '<div>Dates shown in Pink <img src="assets/imgs/cal_pink.png" alt="Vedic Horoo Hindu Calendar" />are Good for purchasing a new vehicle or to take the delivery of new vehicle. </div>';
						} else if(this.lid == 6) {
							this.info2 = '<div>Dates shown in Pink <img src="assets/imgs/cal_pink.png" alt="Vedic Horoo Hindu Calendar" />are Good for filing a oourt case</div>';
						} else if(this.lid == 7) {
							this.info2 = '<div>Dates shown in Pink <img src="assets/imgs/cal_pink.png" alt="Vedic Horoo Hindu Calendar" />are Good for applying visa or passport.</div>';
						}else if(this.lid == 8) {
							this.info2 = '<div>Dates shown in Pink <img src="assets/imgs/cal_pink.png" alt="Vedic Horoo Hindu Calendar" />are Good for college admission.</div>';
						}
			   }
	 }, (err) => {
		this.info = JSON.stringify(err);
	  this.horoService.addTicket('xxxxx', 'technical', 'KPEVT', this.info)
	  						.subscribe(res => {
	 						});
	});
 }
  publishReport(stars: any)
  {
	//this.showCal1 = true;
	//var dt = new Date();
	//this.mon = mons[dt.getMonth()];//stars[0].date.split(',')[0].split(' ')[1];
	//this.yer = dt.getFullYear().toString();//stars[0].date.split(',')[1].split(' ')[0];
	//console.log('publishReport', stars[0]);
	this.svgCal = this.grid(6, this.device_width/6, this.device_width, stars);
	this.renderer.appendChild(this.hinduCal.nativeElement, this.svgCal);
	//let f: boolean = true;
	//for(let key of Object.keys(stars)) {
	//	if(f) { 
			//this.getPanch(key);
		//	f = false;
		//}
	//}
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
					if(this.is_fav(oW[key].star)){
						this.nfav++;
						console.log('is_fav', 'true');
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
						 this.nak = oW[key].star;
						 btdy = true;
					} else {
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
	is_fav(s)
	{
		console.log('is_fav', s);
		console.log('is_fav', this.mdas1+this.adas1+this.pdas1);
		if(this.lid == 1) { //signing an agreement
			let nc: number = 0;
			let s6: boolean = false; 
			let s11: boolean = false; 
			let s2: boolean = false;
			let ps1: string = this.planet_stars_v[this.mdas1.toLowerCase()];
			let ps2: string = this.planet_stars_v[this.adas1.toLowerCase()];
			let ps3: string = this.planet_stars_v[this.pdas1.toLowerCase()];
			console.log(ps1, ps2);
			console.log(ps3);
			let sigs = this.kpd.oPlanet[this.mdas1.toLowerCase()].sig + this.kpd.oPlanet[this.adas1.toLowerCase()].sig + this.kpd.oPlanet[this.pdas1.toLowerCase()].sig;
			console.log('sigs', sigs);
			for(let s of sigs.split(',')) {
				if(s == 5 || s == 8 || s == 12) nc++;
				else if(s == 6) s6 = true;
				else if(s == 11) s11 = true;
				else if(s == 2) s2 = true;
			}
			if(nc != 3) {
				if((s6 && s11) || (s6 && s2)) {
					if(this.kpd.oPlanet[this.mdas1.toLowerCase()].sig.indexOf('6') != -1 || this.kpd.oPlanet[this.mdas1.toLowerCase()].sig.indexOf('11') != -1) {
						if(this.planet_stars_v[this.mdas1.toLowerCase()].indexOf(s.toLowerCase()) != -1) return true;	
					}
					else if(this.kpd.oPlanet[this.adas1.toLowerCase()].sig.indexOf('6') != -1 || this.kpd.oPlanet[this.adas1.toLowerCase()].sig.indexOf('11') != -1) {
						if(this.planet_stars_v[this.adas1.toLowerCase()].indexOf(s.toLowerCase()) != -1) return true;	
					}
					else if(this.kpd.oPlanet[this.pdas1.toLowerCase()].sig.indexOf('6') != -1 || this.kpd.oPlanet[this.pdas1.toLowerCase()].sig.indexOf('11') != -1) {
						if(this.planet_stars_v[this.pdas1.toLowerCase()].indexOf(s.toLowerCase()) != -1) return true;	
					}
				}
			}
		}
		else if(this.lid == 2) { //open bank account
			let nc: number = 0;
			let s3: boolean = false; 
			let s6: boolean = false; 
			let s11: boolean = false;
			let ps1: string = this.planet_stars_v[this.mdas1.toLowerCase()];
			let ps2: string = this.planet_stars_v[this.adas1.toLowerCase()];
			let ps3: string = this.planet_stars_v[this.pdas1.toLowerCase()];
			let sigs = this.kpd.oPlanet[this.mdas1.toLowerCase()].sig + this.kpd.oPlanet[this.adas1.toLowerCase()].sig + this.kpd.oPlanet[this.pdas1.toLowerCase()].sig;
			for(let s of sigs.split(',')) {
				if(s == 8 || s == 12) nc++;
				else if(s == 3) s3 = true;
				else if(s == 6) s6 = true;
				else if(s == 11) s11 = true;
			}
			if(nc != 2) {
				if(s3 && s6 && s11) {
					if(this.kpd.oPlanet[this.mdas1.toLowerCase()].sig.indexOf('3') != -1 || this.kpd.oPlanet[this.mdas1.toLowerCase()].sig.indexOf('6') != -1 || this.kpd.oPlanet[this.mdas1.toLowerCase()].sig.indexOf('11') != -1) {
						if(this.planet_stars_v[this.mdas1.toLowerCase()].indexOf(s.toLowerCase()) != -1) return true;	
					}
					else if(this.kpd.oPlanet[this.adas1.toLowerCase()].sig.indexOf('6') != -1 || this.kpd.oPlanet[this.adas1.toLowerCase()].sig.indexOf('11') != -1 || this.kpd.oPlanet[this.adas1.toLowerCase()].sig.indexOf('11') != -1) {
						if(this.planet_stars_v[this.adas1.toLowerCase()].indexOf(s.toLowerCase()) != -1) return true;	
					}
					else if(this.kpd.oPlanet[this.pdas1.toLowerCase()].sig.indexOf('6') != -1 || this.kpd.oPlanet[this.pdas1.toLowerCase()].sig.indexOf('11') != -1 || this.kpd.oPlanet[this.pdas1.toLowerCase()].sig.indexOf('11') != -1) {
						if(this.planet_stars_v[this.pdas1.toLowerCase()].indexOf(s.toLowerCase()) != -1) return true;	
					}
				}
			}
		}
		else if(this.lid == 6) { //court case
			let nstr: string = '';
			let str: string = '';
			for(let key of Object.keys(this.kpd.oPlanet)) {
				if(this.kpd.oPlanet[key].sig.indexOf('8') != -1) nstr += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('12') != -1) nstr += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('6') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('11') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
			}
			console.log('nstr', nstr);
			console.log('str', str);
			console.log('s', s);
			if(nstr.indexOf(s) == -1 && str.indexOf(s) != -1) return true;
		}
		else if(this.lid == 4) { //occupy new house
			let nstr: string = '';
			let str: string = '';
			for(let key of Object.keys(this.kpd.oPlanet)) {
				if(this.kpd.oPlanet[key].sig.indexOf('5') != -1) nstr += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('8') != -1) nstr += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('12') != -1) nstr += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('2') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('4') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('11') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
			}
			console.log('nstr', nstr);
			console.log('str', str);
			console.log('s', s);
			if(nstr.indexOf(s) == -1 && str.indexOf(s) != -1) return true;
		}
		else if(this.lid == 5) { //vehicle delivery
			let nstr: string = '';
			let str: string = '';
			for(let key of Object.keys(this.kpd.oPlanet)) {
				if(this.kpd.oPlanet[key].sig.indexOf('3') != -1) nstr += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('10') != -1) nstr += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('4') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('11') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
			}
			console.log('nstr', nstr);
			console.log('str', str);
			console.log('s', s);
			if(nstr.indexOf(s) == -1 && str.indexOf(s) != -1) return true;
		}
		else if(this.lid == 7) { //passport
			let str: string = '';
			for(let key of Object.keys(this.kpd.oPlanet)) {
				if(this.kpd.oPlanet[key].sig.indexOf('3') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('6') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('9') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('11') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
			}
			console.log('str', str);
			console.log('s', s);
			if(str.indexOf(s) != -1) return true;
		}
		else if(this.lid == 8) { //college admission
			let str: string = '';
			for(let key of Object.keys(this.kpd.oPlanet)) {
				if(this.kpd.oPlanet[key].sig.indexOf('4') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('9') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('11') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
			}
			console.log('str', str);
			console.log('s', s);
			if(str.indexOf(s) != -1) return true;
		}
		else if(this.lid == 3) { //undergo a treatment
			let nstr: string = '';
			let str: string = '';
			for(let key of Object.keys(this.kpd.oPlanet)) {
				if(this.kpd.oPlanet[key].sig.indexOf('1') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('5') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
				else if(this.kpd.oPlanet[key].sig.indexOf('11') != -1) str += this.planet_stars_v[key.toLowerCase()] + ',';
			}
			console.log('str', str);
			console.log('s', s);
			if(str.indexOf(s) != -1) return true;
		}
		return false;
	}
	isDas(s) {
		if(this.planet_stars_v[this.mdas1.toLowerCase()].indexOf(s) != -1) return true;
		if(this.planet_stars_v[this.adas1.toLowerCase()].indexOf(s) != -1) return true;
		if(this.planet_stars_v[this.pdas1.toLowerCase()].indexOf(s) != -1) return true;
		return false;
	}
	getWeekDays(strs, wday)
	{
	  console.log('mon',this.mon);	
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
    calcPanch(cd) {
		this.sdt = cd;
			//var cd = new Date();
			console.log('calcPanch', cd);
			console.log('ofset', this.ofset);
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
	getPanch(dt) {
		this.nak = this.shareService.translate_func(this.hcal[dt].star);
		this.yoga = this.shareService.translate_func(this.hcal[dt].yoga);
		this.karana = this.shareService.translate_func(this.hcal[dt].karana);
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
	 this.router.navigate(['/nak-info'], {state : this.nak.split(' ')[0] as any});
 }
	rightmenu() {
		this.menu.open('second');
	}
}
