import { Component, Renderer2, ViewChild, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { ShareService } from '../share.service';
import { HoroscopeService } from '../horoscope.service';
import { PlWeekDay } from '../plweek-day';
import { PlanetTrans } from '../planet-trans';
import * as signs from '../signs.json';
import * as nakshatras from '../nakshatras.json';
import * as nakshatra_order from '../nakshatra_order.json';
import * as mon_weeks from '../mon_weeks.json';
import * as o_rashis from '../o_rashis.json';
import * as ruler_name from '../ruler_name.json';
import { Group } from '../group';

@Component({
  selector: 'app-dash-trans',
  templateUrl: './dash-trans.page.html',
  styleUrls: ['./dash-trans.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashTransPage implements OnInit {
    @ViewChild('cal1', {static: true}) cal1;
    @ViewChild('cal2', {static: true}) cal2;
    @ViewChild('cal3', {static: true}) cal3;
    @ViewChild('cal4', {static: true}) cal4;
	signs_v: any = (signs as any).default;
	o_rashis_v: any = (o_rashis as any).default;
	ruler_name_v: any =(ruler_name as any).default;
	nakshatras_v: any = (nakshatras as any).default;
	nakshatra_order_v: any = (nakshatra_order as any).default;
	mon_weeks_v: any = (mon_weeks as any).default;
    kpd: any;
    oPlanet: any;
	tvisits: any[] = [];
	mdas1: string = '';adas1: string = '';pdas1: string = '';pend1: string = '';
	mon1: string = ''; mon2: string = ''; mon3: string = '';mon4: string = '';
	mdras: string = ''; mdsub: string = '';mdnak: string = '';mdsig: string = '';mdsubsig: string = '';
  mdas1sgnf: string = '';adas1sgnf: string = '';pdas1sgnf: string = '';
  mdas1life: string = '';adas1life: string = '';pdas1life: string = '';
  lifevts: string = '';
  house_groups: Group[] = [];
  info: string = '';
  showGrid: boolean = false;
  mon: string = '';
  yer: string = '';
  mcnt: number = 0;
	device_width :number = 0;
	device_height :number = 0;
	showNote: boolean = false;
	showPD: boolean = false;
	oTrans :PlanetTrans[] = [];
	oTrans1 :PlanetTrans[] = [];
	oTrans2 :PlanetTrans[] = [];
	oTrans3 :PlanetTrans[] = [];
	oTrans4 :PlanetTrans[] = [];
    objectKeys = Object.keys;
	bras: boolean = true;
  dob: string = '';
  lagna: string = '';
  lagna_lord: string = '';
	moon_sign :string = '';
  sun_sign: string = '';
  tithi: string = '';
  birth_star: string = '';
  star_lord: string = '';
  moon_phase: string = '';
  showBD: boolean = false;
  sands: boolean = false;
  nsands: boolean = false;
  devts: string = '';
  tsel: any =  {
	  Su: 'tunsel',
	  Mo: 'tunsel',
	  Ju: 'tunsel',
	  Ve: 'tunsel',
	  Me: 'tunsel',
	  Ma: 'tunsel',
	  Sa: 'tunsel',
	  Ra: 'tunsel',
	  All: 'tsel'
  };
  gnT: number = 0;
  constructor(private router: Router, private platform: Platform, private menu: MenuController, private translate: TranslateService, public renderer: Renderer2, private shareService: ShareService, private horoService: HoroscopeService) { }

  ngOnInit() {
	this.info = 'Initializing..';
	this.kpd = this.router.getCurrentNavigation().extras.state;
	console.log('ngOnInit', this.kpd);
	this.oPlanet = this.kpd.oPlanet;
    this.platform.ready().then((readySource) => {
		let ayn: number = 3;
		var res = this.shareService.getAYNM();
		if(res) ayn = Number(res);
	this.info = 'Analyzing stars..';
 	this.horoService.getBirthInfoEx(this.kpd.binf.lat, this.kpd.binf.lng, this.kpd.binf.dob, this.kpd.binf.timezone, ayn)
       .subscribe(res => {
		   this.showBD = true;
		   this.info = '';
		   this.dob = res['dob'];
		   this.lagna = this.trans(res['lagna']);
		   this.lagna_lord = this.trans(res['lagna_lord']);
		   this.moon_sign = this.trans(res['moon_sign']);
		   this.sun_sign = this.trans(res['sun_sign']);
		   this.tithi = this.trans(res['tithi']);
		   this.birth_star = this.trans(res['birth_star']);
		   this.star_lord = this.trans(res['star_lord']);
		   this.moon_phase = this.trans(res['moon_phase']);
      }, (err) => {
      }) ;
 		console.log('Width: ' + this.platform.width());
		this.device_width = this.platform.width();
		console.log('Height: ' + this.platform.height());
		this.device_height = this.platform.height();
		this.horoService.getJson('assets/data/house_groups.json')
			.subscribe(hgps => {
				for(let key of Object.keys(hgps)) {
				    let hg : Group = {
					  details: hgps[key]
					};
					this.house_groups[key] = hg;
				}
				console.log('house group', this.house_groups);
				//this.loadHoro();
			}, (err) => {
			   console.log(JSON.stringify(err));
			});
		this.info = 'Analyzing your stars..';
		for(let key of Object.keys(this.kpd.vim)) {
			if(this.kpd.vim[key].style == 'mdasc') this.mdas1 = key;
			else if(this.kpd.vim[key].style == 'adasc') this.adas1 = this.ruler_name_v[key.split('-')[1].toLowerCase()];
			else if(this.kpd.vim[key].style == 'pdasc') { 
				this.pdas1 = this.ruler_name_v[key.split('-')[2].toLowerCase()];
				var dts = this.kpd.vim[key].per.split('To');
				this.pend1 = dts[1].trim().split('/')[0] + '-' + dts[1].trim().split('/')[1] + '-' + dts[1].trim().split('/')[2];
			}
		}
					this.lifevts = this.analyze_dash_evts(this.mdas1, this.adas1);
					let ayanid: number = 3;
					var kres = this.shareService.getKAYNM();
					if(kres) ayanid = Number(kres);
					this.showPD = true;
					this.info = 'Getting transits on your current dasha..';
					this.mdsig = this.oPlanet[this.mdas1.toLowerCase()].sig.split(',')[0];
				this.shareService.getDSTRNS(this.dob, this.mdas1, this.adas1, this.pdas1, ayanid).then( dtrns => {
					if(dtrns) {
						this.info = 'Fetching report..';
						this.publishReport(dtrns);
					} else {
					  this.horoService.getDashTransEx(this.mdas1, this.adas1, this.pdas1, this.pend1, this.shareService.getCLAT(), this.shareService.getCLNG(), Intl.DateTimeFormat().resolvedOptions().timeZone, ayanid)
					   .subscribe(res2 => {
						   this.bras = false;
						this.mon1 = '';
						this.info = 'Fetching report..';
						let ayanid: number = 3;
						var kres = this.shareService.getKAYNM();
						if(kres) ayanid = Number(kres);
						this.shareService.setDSTRNS(this.dob, this.mdas1, this.adas1, this.pdas1, ayanid, res2);
					    this.publishReport(res2);
					    this.info = '';
					  }, (err) => {
						this.mon1 = JSON.stringify(err);
					  this.horoService.addTicket('xxxxxxx', 'technical', 'KPDAS', this.mon1)
											.subscribe(res => {
											});
					  }) ;	   
					}
				})
				.catch( e => {
					  this.horoService.getDashTransEx(this.mdas1, this.adas1, this.pdas1, this.pend1, this.shareService.getCLAT(), this.shareService.getCLNG(), Intl.DateTimeFormat().resolvedOptions().timeZone, ayanid)
					   .subscribe(res2 => {
						   this.bras = false;
						this.mon1 = '';
						this.info = 'Fetching report..';
						let ayanid: number = 3;
						var kres = this.shareService.getKAYNM();
						if(kres) ayanid = Number(kres);
						this.shareService.setDSTRNS(this.dob, this.mdas1, this.adas1, this.pdas1, ayanid, res2);
					   this.publishReport(res2);
					   this.info = '';
					  }, (err) => {
						this.mon1 = JSON.stringify(err);
					  this.horoService.addTicket('xxxxxxx', 'technical', 'KPDAS', this.mon1)
											.subscribe(res => {
											});
					  }) ;	   
				});
			//	}, (err) => {
			//		this.mon1 = JSON.stringify(err);
			//	});
	   //PREDICTIONS
	   this.mon1 = "<span style='font-weight:bold;text-align:center;'> Fetching KP Transit Predictions for your current dasha, this may take a while...</span>";
	});
  }
  publishReport(stars: any)
  {
	this.showGrid = true;
	this.mon = stars[0].date.split(',')[0].split(' ')[1];
	this.yer = stars[0].date.split(',')[1].split(' ')[0];
	this.mdras = this.o_rashis_v[stars[0].mdras.toLowerCase()].split('|')[1];
	this.mdnak = stars[0].mdnak;
	this.mdsub = stars[0].mdsub.split('-')[2];
	this.mdsubsig = this.oPlanet[this.mdsub.toLowerCase()].sig;
	this.mcnt++;
	this.renderer.appendChild(this.cal1.nativeElement, this.drawCal(6, this.device_width/6, this.device_width, stars));
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
		this.mcnt++;
		this.renderer.appendChild(this.cal2.nativeElement, this.drawCal(6, this.device_width/6, this.device_width, stars));
	}	
	c = false;
	for(var j = i; j < stars.length; j++)
	{
		if(this.mon != stars[j].date.split(',')[0].split(' ')[1]) {
		   this.mon = stars[j].date.split(',')[0].split(' ')[1];
		   this.yer = stars[j].date.split(',')[1].split(' ')[0];
		   c = true;
		   break;
		}
	}
	if(c) {
		this.mcnt++;
		this.renderer.appendChild(this.cal3.nativeElement, this.drawCal(6, this.device_width/6, this.device_width, stars));
	}	
	c = false;
	for(var k = j; k < stars.length; k++)
	{
		if(this.mon != stars[k].date.split(',')[0].split(' ')[1]) {
		   this.mon = stars[k].date.split(',')[0].split(' ')[1];
		   this.yer = stars[k].date.split(',')[1].split(' ')[0];
		   c = true;
		   break;
		}
	}
	if(c) {
		this.mcnt++;
		this.renderer.appendChild(this.cal4.nativeElement, this.drawCal(6, this.device_width/6, this.device_width, stars));
	}	
  }
  
  drawCal(numberPerSide, size, pixelsPerSide, naks)
  {
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
		let oTDs :Object[] = [];
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
			let oW: PlWeekDay[] = [];
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
				if(dx > 5) dx = dx - 5;
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
					var text1 = document.createElementNS("http://www.w3.org/2000/svg", "text");
					this.renderer.appendChild(text1, document.createTextNode(key.split(',')[0].split(' ')[2]));
					this.renderer.setAttribute(text1, "font-size", "15px");
					this.renderer.setAttribute(text1, "font-weight", "bold");
					this.renderer.setAttribute(text1, "alignment-baseline", "middle");
					this.renderer.setAttribute(text1, "text-anchor", "middle");
					this.renderer.setAttribute(text1, "x", (size*dx + size/2).toString());
					this.renderer.setAttribute(text1, "y", (size*k + 25 + size/2).toString());
					this.renderer.setAttribute(text1, "id", "t1" + k.toString() + dx.toString());
					g.appendChild(text1);
					let pls: string = '';
					  if(oW[key].sssl != '') {
					     var sls = oW[key].sssl.split(',');
					     for(var s = 0; s < sls.length; s++) {
							if(sls[s].indexOf('|') < 0 ) continue;
						    var pl = sls[s].split('|')[1].split('-')[2].split(' ')[1];
						    pls += pl + ' ';
							let trk_d: string = oW[key].date; 
							if(oTDs.hasOwnProperty(trk_d)) {
							   let trns: string = oTDs[trk_d];
							   trns += ',' + this.ruler_name_v[pl.toLowerCase()] + '-' + sls[s].split('|')[1].split('-')[0] + '-' + sls[s].split('|')[0].split('-')[2] +  '-' + sls[s].split('|')[1].split('-')[1] + '-' + oW[key].mds.split('|')[0] + '-' + oW[key].mds.split('|')[1] + '-' + oW[key].mds.split('|')[2] + '-' + oW[key].rupll + '-' + oW[key].rupml + '-' + oW[key].rupdl;
							   oTDs[trk_d] =  trns;
							} else {	
							    oTDs[trk_d] = this.ruler_name_v[pl.toLowerCase()] + '-' + sls[s].split('|')[1].split('-')[0] + '-' + sls[s].split('|')[0].split('-')[2] +  '-' + sls[s].split('|')[1].split('-')[1] + '-' + oW[key].mds.split('|')[0] + '-' + oW[key].mds.split('|')[1] + '-' + oW[key].mds.split('|')[2]+ '-' + oW[key].rupll + '-' + oW[key].rupml + '-' + oW[key].rupdl;
							}
						 }
						}
						if(pls != '') {
						var text2 = document.createElementNS("http://www.w3.org/2000/svg", "text");
						this.renderer.appendChild(text2, document.createTextNode(pls));
						this.renderer.setAttribute(text2, "font-size", "10px");
						this.renderer.setAttribute(text2, "font-weight", "bold");
						this.renderer.setAttribute(text2, "x", (size*dx + size/2).toString());
						this.renderer.setAttribute(text2, "y", (size*k + 25 + size/2 + 10).toString());
						this.renderer.setAttribute(text2, "alignment-baseline", "middle");
						this.renderer.setAttribute(text2, "text-anchor", "middle");
						this.renderer.setAttribute(text2, "id", "t2" + k.toString() + dx.toString());
						g.appendChild(text2);
					}
				svg.appendChild(g);
			}
		}
		if(Object.keys(oTDs).length > 0) {
			this.pubTransRep(oTDs, this.mon);
		}
		return svg;
  }
  	getWeekDays(strs, wday)
	{
	  let oWDays: PlWeekDay[] = [];
	  let dmon: number = 0;
		for(let key of Object.keys(strs)) {
		//for(let i = 0; i < strs.length; i++) {
		  if(this.mon && strs[key].date.split(',')[0].split(' ')[1] != this.mon) continue;
//		  if(this.mon && strs[i].date.split(',')[0].split(' ')[1] != this.mon) continue;
		  dmon++;
		    if(strs[key].date.indexOf(wday) > -1) {
				let weekDay: PlWeekDay = {
				 dmon: dmon,
				 sssl: strs[key].sssl,
				 date: strs[key].date,
				 mds: strs[key].mdras + '|' + strs[key].mdnak + '|' + strs[key].mdsub,
				 rupll: strs[key].rupll,
				 rupdl: strs[key].rupdl,
				 rupml: strs[key].rupml
			  };
			    oWDays[strs[key].date] = weekDay;
				//oWDays.push(weekDay);
			}
		}
	  return oWDays;
	}

   pubTransRep(trns, mon)
   {
     let desc: string = '';
	 let tdsc: string = '';
	 let bvsted: boolean =  false;
	    this['mon'+this.mcnt.toString()]= '<h2>PREDICTIONS FOR ' + this.mon_weeks_v[mon.toLowerCase()].split('|')[0] + '</h2>';
		let nT: number = 0;
		let msub: string = '';
		let schg: boolean = false;
		for(let key of Object.keys(trns)) {
			console.log('key=',key);
			if(trns[key].split('-')[8] != msub) { 
				msub = trns[key].split('-')[8];
				schg = true;
			} else {
				schg = false;
			}
			
			let pnak: string = trns[key].split('-')[0] + '-' + trns[key].split('-')[1];
			bvsted = (this.tvisits.indexOf(pnak) < 0) ? false : true;
				var dys = key.toString().split('|');
				var seq= [];
				let d: number = 0;
				let t_dys: string = '';
				let star_lord: string = this.nakshatra_order_v[trns[key].split('-')[1]].ruler;
				let const_lord: string = this.oPlanet[star_lord].star;
				let das_l: string = '';

				// Existing logic — retained
				if (star_lord === this.mdas1.toLowerCase()) {
				das_l = (this.shareService.getLANG() == 'en') ? 'Maha Dasha' :
						(this.shareService.getLANG() == 'te') ? ' మహా దశ' : 'महा दशा';
				} else if (star_lord === this.adas1.toLowerCase()) {
				das_l = (this.shareService.getLANG() == 'en') ? 'Antar Dasha' :
						(this.shareService.getLANG() == 'te') ? ' అంతర్ దశ' : 'अन्तर दशा';
				} else if (star_lord === this.pdas1.toLowerCase()) {
				das_l = (this.shareService.getLANG() == 'en') ? 'Pratyantar Dasha' :
						(this.shareService.getLANG() == 'te') ? ' ప్రత్యాంతర దశ' : 'प्रत्यंतर दशा';
				}

				// Enhanced logic — KP correct way to identify if transit is triggering any dasha significator
				let transit_planet = trns[key].split('-')[0].substring(0, 2).toLowerCase(); // E.g., 'me' for Mercury

				const lang = this.shareService.getLANG();
				const triggerLabel = (en: string, te: string, hi: string) =>
				(lang === 'en') ? en : (lang === 'te') ? te : hi;

				if (this.oPlanet[this.mdas1.toLowerCase()]?.sig?.includes(transit_planet)) {
				das_l += ' ' + triggerLabel('(triggers Maha Dasha)', '(మహా దశను ఉత్తేజితం చేస్తుంది)', '(महा दशा को सक्रिय करता है)');
				}
				if (this.oPlanet[this.adas1.toLowerCase()]?.sig?.includes(transit_planet)) {
				das_l += ' ' + triggerLabel('(triggers Antar Dasha)', '(అంతర్ దశను ఉత్తేజితం చేస్తుంది)', '(अंतर दशा को सक्रिय करता है)');
				}
				if (this.oPlanet[this.pdas1.toLowerCase()]?.sig?.includes(transit_planet)) {
				das_l += ' ' + triggerLabel('(triggers Pratyantar Dasha)', '(ప్రత్యాంతర దశను ఉత్తేజితం చేస్తుంది)', '(प्रत्यंतर दशा को सक्रिय करता है)');
				}


				if(this.shareService.getLANG() == 'te') {
					if(!bvsted) {
						desc = '<span>' + key + 'తేదీలలో<span class="blueText"> ' + this.trans(this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()]) +  ' </span><span class="greenText">' + this.trans(this.o_rashis_v[trns[key].split('-')[3]].split('|')[1].toLowerCase()) + '  రాశిలో</span><span class="greenText"> ' + this.trans(trns[key].split('-')[1]) + '</span> నక్షత్రము  లో  గోచరించ  నుంది  <span class="blueText"> ' +  this.trans(this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()]) + '</span><span class="redText"> ' +  this.trans(trns[key].split('-')[2]) + '</span> సబ్ లో  గోచరించ  నుంది ఈ నక్షత్రానికి ప్రభువు  <span class="brownText">' +  this.trans(star_lord) + '</span>' + ' ప్రస్తుత  <span class="boldText">' +  das_l + '</span> ప్రభువు  పుట్టిన చార్టు లో ఈ గ్రహం' + this.trans(const_lord)  + ' ప్రభువు యొక్క నక్షత్రం లో ఉంది</span>';
					} else {
						desc = '<span>' + key + 'తేదీలలో<span class="blueText"> ' + this.trans(this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()]) +  '</span><span class="redText"> ' +  this.trans(trns[key].split('-')[2]) + '</span> సబ్ లో కి ప్రవేశిస్తుంది';
					}
				} else if(this.shareService.getLANG() == 'hi') {
					if(!bvsted) {
						desc = '<span>' + key + 'तिथियों में<span class="blueText"> ' + this.trans(this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()]) +  ' </span><span class="greenText">' + this.trans(this.o_rashis_v[trns[key].split('-')[3]].split('|')[1].toLowerCase()) + '  राशि</span><span class="greenText"> ' + this.trans(trns[key].split('-')[1]) +'</span>' + ' तारा  में  गोचर  होने वाला है ,  <span class="blueText">' +  this.trans(this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase().toLowerCase()]) + '</span><span class="redText"> ' +  this.trans(trns[key].split('-')[2]) + '</span> सब  में  गोचर  होने वाला है  इस तारा के भगवान  <span class="brownText"> ' +  this.trans(star_lord) + '</span>' + ' वर्तमान में सत्तारूढ़  <span class="boldText">'   + das_l + '</span>भगवान  है  जिन्होने  आपके कुंडली में  ' + this.trans(const_lord) +'  भगवान के तारे में है</span>';
					} else {
						desc = '<span>' + key + 'तिथियों में<span style="color:blue"> ' + this.trans(this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()]) +  ' </span> <span style="color:#008000">' + this.trans(trns[key].split('-')[1]) +'</span>' + ' ' +  this.trans(trns[key].split('-')[2]) + ' सब  में  में प्रवेश होगा </span>';
					}
				} else {
					if(!bvsted) {
						desc = '<span> ' + key + '<span class="blueText"> ' + this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()].toUpperCase() +  ' </span> transits into <span class="greenText">' + this.o_rashis_v[trns[key].split('-')[3]].split('|')[1] + '</span> in the star <span class="greenText">' + trns[key].split('-')[1].toUpperCase() + '</span> and in the SUB of <span class="redText">' + trns[key].split('-')[2].toUpperCase() + ',</span> star lord <span class="brownText">' +  star_lord.toUpperCase() + '</span> is your current <span class="boldText">' + das_l.toUpperCase() + '</span> lord, is in the constellation of ' + const_lord + ' in your birth chart.</span>';
					} else {
						desc = '<span> ' + key + '<span class="blueText"> ' + this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()] +  ' </span> moves to <span class="redText">' + trns[key].split('-')[2].toUpperCase() + ' </span> SUB </span>';
					}
				}
				  let life: string = this.oPlanet[star_lord].lif_e;
				if(life != '') {
					var neg = this.get_sub_neg2(this.oPlanet[trns[key].split('-')[2]].sig, life);
					if(!bvsted) {
						if(this.shareService.getLANG() == 'te') {
							desc += '<span>. పుట్టిన చార్టు ఆధారంగా <span class="brownText">'  + this.trans(star_lord) + ', ' + life + ' ఇస్తుంది.  సుబ్ల్ర్డ్ <span class="redText"> ' + this.trans(trns[key].split('-')[2]) +  '</span>'+ ' ' + neg + '</span>';
						} else if(this.shareService.getLANG() == 'hi') {
							desc += '<span>. आपके कुंडली के अनुसार <span class="brownText"> '  + this.trans(star_lord)  + ', ' + life + ' दे देंगे.  सबलॉर्ड <span class="redText"> ' + this.trans(trns[key].split('-')[2]) +  '</span>'+ ' ' + neg + '</span>';
						
						} else {
							desc += '<span class="brownText">' + star_lord.toUpperCase() + '</span> in your horoscope causes' + life;
							desc += ' and the sub lord <span class="redText">' + trns[key].split('-')[2].toUpperCase() + '</span>' + neg + '</span>';
						} 
					} else {
						if(this.shareService.getLANG() == 'te') {
							desc += ' ఎవరైతే  ' + neg + '</span>';
						} else if(this.shareService.getLANG() == 'hi') {
							desc += '<span> जिन्हो ' + neg + '</span>';
						
						} else {
							desc += ' who ' + neg + '</span>';
						} 
					}
				} //else {
					var neg2 = this.get_sub_neg3(this.oPlanet[trns[key].split('-')[2]].sig, this.oPlanet[star_lord].sig);
					if(neg2 != '') {
						if(this.shareService.getLANG() == 'te') {
							desc +=  '<span>. ఈ సమయంలో <span class="brownText"> ' + this.trans(star_lord)  + ' సిగ్నిఫికేటర్స్ అయిన  ' + neg2 + ' హౌస్ విషయాలు <span class="blueText"> ' + this.trans(this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()]) + '</span> సిగ్నిఫికేటర్స్ అయిన  ' + this.oPlanet[this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()].toLowerCase()].sig + ' హౌస్ విషయాల ద్వారా  నెరవేరగలవు </span>';
						} else if(this.shareService.getLANG() == 'hi') {
							desc += '<span>. इस समय के दौरान <span class="brownText"> '  + this.trans(star_lord)  + ' सिग्रिफिकेटर  ' + neg2 + ' घर के मामले  <span class="blueText">' + this.trans(this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()]) + '</span> सिग्रिफिकेटर  ' + this.oPlanet[this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()].toLowerCase()].sig + ' घर के मामले  के द्वारा  सफल  हो सकता है</span>';
						
						} else {
							desc += '<span>. During this time <span class="brownText">' +  star_lord.toUpperCase() + ' significators ' + neg2 + ' house matters can get fulfilled through <span class="blueText">' + this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()].toUpperCase() + '</span> significators ' + this.oPlanet[this.ruler_name_v[trns[key].split('-')[0].substring(0,2).toLowerCase()].toLowerCase()].sig + ' house matters.</span>';
						} 
					}
					
				desc += '<br><span class="boldText">Ruling Planets:</span><span class="redText">' + trns[key].split('-')[9] + '</span>,<span class="blueText">' + trns[key].split('-')[10] + '</span>,<span class="greenText">'  +  trns[key].split('-')[11] + '</span>';
				//desc += '<br/><br/>';
				if(this.tvisits.indexOf(pnak) < 0) {
					this.tvisits.push(trns[key].split('-')[0] + '-' + trns[key].split('-')[1]);
				}
				let sdesc: string = '';
				if(schg) {
						if(this.shareService.getLANG() == 'te') {
							sdesc =  'దశనాధుడైన  ' + this.trans(this.mdas1.toLowerCase()) + ' ' + this.trans(this.o_rashis_v[trns[key].split('-')[4]].split('|')[1].toLowerCase()) + '  రాశి లో  ' + this.trans(trns[key].split('-')[5].toLowerCase()) + ' నక్షత్రం అందు ' + this.trans(trns[key].split('-')[8].toLowerCase()) + '  యొక్క సబ్ లో ప్రవేశించాడు';
						} else if(this.shareService.getLANG() == 'hi') {
							sdesc = 'दशदिपति ' + this.trans(this.mdas1.toLowerCase()) + ' ' + this.trans(this.o_rashis_v[trns[key].split('-')[4]].split('|')[1].toLowerCase()) + ' राशि में और  ' + this.trans(trns[key].split('-')[5].toLowerCase()) + '   नक्षत्र में और ' + this.trans(trns[key].split('-')[8].toLowerCase()) + '  के उप में गोचर कर रहा है';
						
						} else {
							sdesc = 'Mahadasha lord ' + this.mdas1 + ' is transiting in ' + this.o_rashis_v[trns[key].split('-')[4]].split('|')[1] + ' and in ' + trns[key].split('-')[5] + ' and in the sub of ' + trns[key].split('-')[8];
						} 
					
				}
						let planetTrans: PlanetTrans = {
							 pl: trns[key].split('-')[0].substring(0,2),
							 tdys: key,
							 tmon: mon,
							 tyr: this.yer,
							 nak: trns[key].split('-')[1],
							 sign: trns[key].split('-')[3],
							 sub: trns[key].split('-')[2],
							 mds: trns[key].split('-')[4] +'-'+ trns[key].split('-')[5] + '-' + trns[key].split('-')[6] + '-' + trns[key].split('-')[7] + '-' + trns[key].split('-')[8],
							 desc: desc,
							 sdesc: sdesc
						};
						this.oTrans[this.gnT++] = planetTrans;
						this['oTrans'+this.mcnt.toString()][nT++] = planetTrans;
				tdsc += desc;
				tdsc += '<br/><br/>';
				desc = '';
		}
		//this['mprd' + this.mcnt.toString()] = tdsc;
   }
   pubTransRepEx(trns, mon)
   {
	  this.tvisits = [];
     let desc: string = '';
	 let bvsted: boolean =  false;
	    desc += '<span><h2>PREDICTIONS FOR ' + this.mon_weeks_v[mon.toLowerCase()].split('|')[0] + '</h2></span>';
		let oPTs :Object[] = [];
		for(var da = 1; da < 32; da++){
		   let pkey: string = '';
		   (da < 10) ? pkey = '0'+ da.toString() : pkey = da.toString();
		   if(trns.hasOwnProperty(pkey)) {
			  var tns = trns[pkey].split(',');
			  for(var t = 0; t < tns.length; t++) {
				 if(tns[t] != '') {
				    (oPTs.hasOwnProperty(tns[t]) == true) ? oPTs[tns[t]] += ',' + da.toString() : oPTs[tns[t]] = da.toString();
				 }
			  }
		   }  
		}
		
		for(let key of Object.keys(oPTs)) {
			let pnak: string = key.split('-')[0] + '-' + key.split('-')[1];
			bvsted = (this.tvisits.indexOf(pnak) < 0) ? false : true;
				var dys = oPTs[key].toString().split(',');
				var seq= [];
				let d: number = 0;
				let t_dys: string = '';
				while(dys.length) {
				   if(d+1 < dys.length) {
						if(Number(dys[d+1]) - Number(dys[d]) == 1) {
							seq.push(Number(dys[d]));
							seq.push(Number(dys[d+1]));
							dys.splice(d,2); //clear 2 dys
						} else {
							if(seq.length) {
							   t_dys += (t_dys == '') ? seq[0].toString() + this.get_day_posix(seq[0]) + '-' + seq[seq.length-1].toString() + this.get_day_posix(seq[seq.length-1]) : ' & ' + seq[0].toString() + this.get_day_posix(seq[0]) + '-' + seq[seq.length-1].toString() + this.get_day_posix(seq[seq.length-1]);
								seq.splice(0, seq.length); //clear all seq
							} else {
								t_dys += (t_dys == '') ? 'On ' + dys[d] + this.get_day_posix(Number(dys[d])) : ',' + dys[d] + this.get_day_posix(Number(dys[d]));
								dys.splice(d,1); //clear 1 dys
							}
						}
					} else {
					  if(seq.length) {
					     if(Number(dys[d]) - seq[seq.length-1] == 1) { //seq
						   t_dys += (t_dys == '') ? seq[0].toString() + this.get_day_posix(seq[0]) + '-' + dys[d].toString() + this.get_day_posix(Number(dys[d])) : ' & ' + seq[0].toString() + this.get_day_posix(seq[0]) + '-' + seq[seq.length-1].toString() + this.get_day_posix(seq[seq.length-1]);
							seq.splice(0, seq.length); //clear all seq
							dys.splice(d,2); //clear 2 dys
						 } else {
						   t_dys += (t_dys == '') ? seq[0].toString() + this.get_day_posix(seq[0]) + '-' + seq[seq.length-1].toString() + this.get_day_posix(seq[seq.length-1]) : ' & ' + seq[0].toString() + this.get_day_posix(seq[0]) + '-' + seq[seq.length-1].toString() + this.get_day_posix(seq[seq.length-1]);
							seq.splice(0, seq.length); //clear all seq
							t_dys += (t_dys == '') ? 'On ' + dys[d] + this.get_day_posix(Number(dys[d])) : ',' + dys[d] + this.get_day_posix(Number(dys[d]));
							dys.splice(d,1); //clear 1 dys
						 }
					  } else {
						t_dys += (t_dys == '') ? 'On ' + dys[d] + this.get_day_posix(Number(dys[d])) : ',' + dys[d] + this.get_day_posix(Number(dys[d]));
						dys.splice(d,1); //clear 1 dys
					  }
					}
				}
				let star_lord: string = this.nakshatra_order_v[key.split('-')[1]].ruler;
				let const_lord: string = this.oPlanet[star_lord].star;
				let das_l: string = '';
				if(star_lord == this.mdas1.toLowerCase()) {
				   das_l = (this.shareService.getLANG() == 'en') ? 'Maha Dasha' : (this.shareService.getLANG() == 'te') ? ' మహా దశ' : 'महा दशा'
				}else if(star_lord == this.adas1.toLowerCase()) {
				   das_l = (this.shareService.getLANG() == 'en') ? 'Antar Dasha' : (this.shareService.getLANG() == 'te') ? ' అంతర్ దశ' : 'अन्तर दशा'
				}else if(star_lord == this.pdas1.toLowerCase()) {
				   das_l = (this.shareService.getLANG() == 'en') ? 'Pratyantar Dasha' : (this.shareService.getLANG() == 'te') ? ' ప్రత్యాంతర దశ' : 'प्रत्यंतर दशा'
				}

				if(this.shareService.getLANG() == 'te') {
					if(!bvsted) {
						desc += '<span>' + t_dys + 'తేదీలలో<span class="blueText"> ' + this.trans(this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase().toLowerCase()]) +  ' </span> <span class="greenText">' + this.trans(key.split('-')[1]) + '</span> నక్షత్రము  లో  గోచరించ  నుంది  <span class="blueText"> ' +  this.trans(this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase().toLowerCase()]) + '</span><span class="redText"> ' +  this.trans(key.split('-')[2]) + '</span> సబ్ లో  గోచరించ  నుంది ఈ నక్షత్రానికి ప్రభువు  <span class="brownText">' +  this.trans(star_lord) + '</span>' + ' ప్రస్తుత  <span class="boldText"'> +  das_l + '</span> ప్రభువు  పుట్టిన చార్టు లో ఈ గ్రహం' + this.trans(const_lord)  + ' ప్రభువు యొక్క నక్షత్రం లో ఉంది</span>';
					} else {
						desc += '<span>' + t_dys + 'తేదీలలో<span class="blueText"> ' + this.trans(this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase().toLowerCase()]) +  '</span><span class="redText"> ' +  this.trans(key.split('-')[2]) + '</span> సబ్ లో కి ప్రవేశిస్తుంది';
					}
				} else if(this.shareService.getLANG() == 'hi') {
					if(!bvsted) {
						desc += '<span>' + t_dys + 'तिथियों में<span class="blueText"> ' + this.trans(this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase().toLowerCase()]) +  ' </span> <span class="greenText">' + this.trans(key.split('-')[1]) +'</span>' + ' तारा  में  गोचर  होने वाला है ,  <span class="blueText">' +  this.trans(this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase().toLowerCase()]) + '</span><span class="redText"> ' +  this.trans(key.split('-')[2]) + '</span> सब  में  गोचर  होने वाला है  इस तारा के भगवान  <span class="brownText"> ' +  this.trans(star_lord) + '</span>' + ' वर्तमान में सत्तारूढ़  <span class="boldText">'   + das_l + '</span>भगवान  है  जिन्होने  आपके कुंडली में  ' + this.trans(const_lord) +'  भगवान के तारे में है</span>';
					} else {
						desc += '<span>' + t_dys + 'तिथियों में<span style="color:blue"> ' + this.trans(this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase().toLowerCase()]) +  ' </span> <span style="color:#008000">' + this.trans(key.split('-')[1]) +'</span>' + ' ' +  this.trans(key.split('-')[2]) + ' सब  में  में प्रवेश होगा </span>';
					}
				} else {
					if(!bvsted) {
						desc += '<span> ' + t_dys + '<span class="blueText"> ' + this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase().toLowerCase()].toUpperCase() +  ' </span> transits into the star <span class="greenText">' + key.split('-')[1].toUpperCase() + '</span> and in the SUB of <span class="redText">' + key.split('-')[2].toUpperCase() + ',</span> star lord <span class="brownText">' +  star_lord.toUpperCase() + '</span> is your current <span class="boldText">' + das_l.toUpperCase() + '</span> lord, is in the constellation of ' + const_lord + ' in your birth chart.</span>';
					} else {
						desc += '<span> ' + t_dys + '<span class="blueText"> ' + this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase().toLowerCase()] +  ' </span> moves to <span class="redText">' + key.split('-')[2].toUpperCase() + ' </span> SUB </span>';
					}
				}
				  let life: string = this.oPlanet[star_lord].lif_e;
				if(life != '') {
					var neg = this.get_sub_neg2(this.oPlanet[key.split('-')[2]].sig, life);
					if(!bvsted) {
						if(this.shareService.getLANG() == 'te') {
							desc += '<span>. పుట్టిన చార్టు ఆధారంగా <span class="brownText">'  + this.trans(star_lord) + ', ' + life + ' ఇస్తుంది.  సుబ్ల్ర్డ్ <span class="redText"> ' + this.trans(key.split('-')[2]) +  '</span>'+ ' ' + neg + '</span>';
						} else if(this.shareService.getLANG() == 'hi') {
							desc += '<span>. आपके कुंडली के अनुसार <span class="brownText"> '  + this.trans(star_lord)  + ', ' + life + ' दे देंगे.  सबलॉर्ड <span class="redText"> ' + this.trans(key.split('-')[2]) +  '</span>'+ ' ' + neg + '</span>';
						
						} else {
							desc += '<span class="brownText">' + star_lord.toUpperCase() + '</span> in your horoscope causes' + life;
							desc += ' and the sub lord <span class="redText">' + key.split('-')[2].toUpperCase() + '</span>' + neg + '</span>';
						} 
					} else {
						if(this.shareService.getLANG() == 'te') {
							desc += ' ఎవరైతే  ' + neg + '</span>';
						} else if(this.shareService.getLANG() == 'hi') {
							desc += '<span> जिन्हो ' + neg + '</span>';
						
						} else {
							desc += ' who ' + neg + '</span>';
						} 
					}
				} //else {
					var neg2 = this.get_sub_neg3(this.oPlanet[key.split('-')[2]].sig, this.oPlanet[star_lord].sig);
					if(neg2 != '') {
						if(this.shareService.getLANG() == 'te') {
							desc +=  '<span>. ఈ సమయంలో <span class="brownText"> ' + this.trans(star_lord)  + ' సిగ్నిఫికేటర్స్ అయిన  ' + neg2 + ' హౌస్ విషయాలు <span class="blueText"> ' + this.trans(this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase()]) + '</span> సిగ్నిఫికేటర్స్ అయిన  ' + this.oPlanet[this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase()].toLowerCase()].sig + ' హౌస్ విషయాల ద్వారా  నెరవేరగలవు </span>';
						} else if(this.shareService.getLANG() == 'hi') {
							desc += '<span>. इस समय के दौरान <span class="brownText"> '  + this.trans(star_lord)  + ' सिग्रिफिकेटर  ' + neg2 + ' घर के मामले  <span class="blueText">' + this.trans(this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase()]) + '</span> सिग्रिफिकेटर  ' + this.oPlanet[this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase()].toLowerCase()].sig + ' घर के मामले  के द्वारा  सफल  हो सकता है</span>';
						
						} else {
							desc += '<span>. During this time <span class="brownText">' +  star_lord.toUpperCase() + ' significators ' + neg2 + ' house matters can get fulfilled through <span class="blueText">' + this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase()].toUpperCase() + '</span> significators ' + this.oPlanet[this.ruler_name_v[key.split('-')[0].substring(0,2).toLowerCase()].toLowerCase()].sig + ' house matters.</span>';
						} 
					}
				desc += '<br/><br/>';
				if(this.tvisits.indexOf(pnak) < 0) {
					this.tvisits.push(key.split('-')[0] + '-' + key.split('-')[1]);
				}
		}
		this['mprd' + this.mcnt.toString()] = desc;
   }
	
	get_day_posix(d)
	{
		let px: string = '';
		switch(d)
		{
		   case 1:
		   case 21:
		   case 31:
				px = "st";
				break;
		   case 2:
			case 22:
				px = "nd";
				break;
			case 3:
			case 23:
				px = "rd";
				break;
			default:
				px = "th";
				break;
		}
		return (px);
	}
	get_sub_neg2(s_h: string, lif_e: string): string {
		let sub_n = '';
		const lifs = lif_e.split(';').filter(e => e);
		const ths = s_h.split(',').map(h => Number(h));  // Sub-lord house list

		for (const life of lifs) {
			const [hgs, detail] = life.split('|');
			const lifeHouses = hgs.split('-').map(h => Number(h)).filter(Boolean);  // ✅ All event houses

			let sub = '';
			for (const lh of lifeHouses) {
				for (const t of ths) {
					if (t === lh) {
						sub = this.shareService.getLANG() === 'en'
							? ` FAVOURS ${life}`
							: this.shareService.getLANG() === 'te'
								? `${life} అనుకూలంగా ఉంది `
								: `${life} अनुमति है `;
						break;
					} else if (t === ((lh - 1 === 0) ? 12 : lh - 1)) {
						sub = this.shareService.getLANG() === 'en'
							? ` OPPOSES ${life}`
							: this.shareService.getLANG() === 'te'
								? `${life} అనుకూలంగా లేదు `
								: `${life} पक्ष नहीं है `;
						break;
					}
				}
				if (sub) break;  // Only report once per life event
			}
			if (sub) sub_n += sub;
		}

		if (!sub_n) {
			sub_n = this.shareService.getLANG() === 'en'
				? ' FAVOURS this event '
				: this.shareService.getLANG() === 'te'
					? ' అనుకూలంగా ఉంది '
					: ' अनुमति है ';
		}

		return sub_n;
	}
	get_sub_neg3(s_h: string, l_h: string): string {
		let sub_n = '';
		const lhs = l_h.split(',').map(h => Number(h)).filter(Boolean);
		const ths = s_h.split(',').map(h => Number(h));
		for (const lh of lhs) {
			const h12 = (lh - 1 === 0) ? 12 : lh - 1;
			const opposes = ths.includes(h12);
			if (!opposes) {
			sub_n += lh + ',';
			}
		}
		return sub_n;
	}
	get_h_from_h(s_h: number, d_h: number)
	{
		let h: number = s_h;
		for(var i = h; i < d_h; i++) {
		    if(i > 12) i = 1;
			if(i == d_h) return i;
		}
		return -1;
	}
	analyze_life_evts(lord: string, lsig: string)
	{
		let lif_e: string = '';
		for(let key of Object.keys(this.house_groups)) {
		  let h_g: string ='';
		  let sigs: string[] = key.split('-');
		  let idx: number = sigs[0].indexOf('(');
		  if(idx != -1) {
			let s_h: number = Number(sigs[0].match(/\(([^)]+)\)/)[1]);
			var hno = (idx == -1) ? sigs[0] : sigs[0].substring(0, idx+1);
			let d_h: number = Number(hno);
			sigs[0] = this.get_h_from_h(s_h, d_h).toString();
		  }
			let sig_c: number = 0;
			    let lsigs: string[] = lsig.split(',');
				for(var i = 0; i < sigs.length; i++) {
					if(sigs[i].indexOf('(') != -1) {
					  let s_h: number = Number(sigs[i].match(/\(([^)]+)\)/)[1]);
					  idx = sigs.indexOf('(');
					  hno = (idx == -1) ? sigs[0] : sigs[0].substring(0, idx+1);
					  let d_h: number = Number(hno);
					  sigs[i] = this.get_h_from_h(s_h, d_h).toString();
					} else if(sigs[i] == 'BADH' || sigs[i] == 'CUSP') {
						continue;
					} else if(sigs[i] == 'MARS' && sigs[i].toLowerCase() != lord) {
						continue;
					}
					for(var j = i; j < lsigs.length; j++) {
						if(lsigs[j] == sigs[i]) {	//supporting house satisfied
						if(h_g.indexOf(sigs[i]) == -1) {
						  h_g += sigs[i] + '-';
						  sig_c++;	
						  }
						}
					}
				}
				if(sigs.length == sig_c) {  //life event statisfied
					lif_e += h_g + '|' + this.house_groups[key].details + ';';
				}
		}
		return lif_e;
	}
	analyze_dash_evts(ml: string, al: string): string {
		console.log(ml, al);

		const ms = this.oPlanet[ml.toLowerCase()]?.sig ?? '';
		const as = this.oPlanet[al.toLowerCase()]?.sig ?? '';
		const lsigs = (ms + ',' + as).split(',').filter(Boolean);  // avoid empty
		console.log('lsig', lsigs);

		let lif_e = '';

		for (const key of Object.keys(this.house_groups)) {
			const sigs = key.split('-').map(sig => this.parseSigHouse(sig));
			let sig_c = 0;
			let h_g: string[] = [];

			for (const sig of sigs) {
				if (sig === 'BADH' || sig === 'CUSP') continue;
				if (sig === 'MARS' && sig.toLowerCase() !== ml.toLowerCase()) continue;
				if (lsigs.includes(sig)) {
					if (!h_g.includes(sig)) {
					h_g.push(sig);
					sig_c++;
					}
				}
			}

			if (sig_c === sigs.length) {
				lif_e += h_g.join('-') + '|' + this.house_groups[key].details + ';';
			}
		}
		return lif_e;
	}

	private parseSigHouse(sig: string): string {
		if (sig.includes('(')) {
			const match = sig.match(/\(([^)]+)\)/);
			if (match) {
			const s_h = Number(match[1]);
			const d_h = Number(sig.substring(0, sig.indexOf('(')));
			return this.get_h_from_h(s_h, d_h).toString();
			}
		}
		return sig;
	}

	calcBirthStar(moonsign: string, moondeg: number)
	{
	    //convert deg & mins to mins
		let md_s: string = moondeg.toString();
		let moonmins: number = 0;
		if(md_s.indexOf('.') > -1 && md_s.split('.')[1] != '')
		    moonmins = parseInt(md_s.split('.')[0], 10)*60 + parseInt(md_s.split('.')[1], 10);
		else if(md_s.indexOf('.') > -1 && md_s.split('.')[1] == '')
			moonmins = parseInt(md_s.split('.')[0], 10)*60;
		else
			moonmins = parseInt(md_s, 10)*60;
		
		for(var i = 0; i < Object.keys(this.nakshatras_v).length; i++)
		{
			var nak = this.nakshatras_v[i];
			let nak_s: number = 0;
			let nak_e: number = 0;
			if(nak.location.start.split(',')[0].indexOf('.') > -1 && nak.location.start.split(',')[0].split('.')[1] != '')
				nak_s = parseInt(nak.location.start.split(',')[0].split('.')[0], 10)*60 + parseInt(nak.location.start.split(',')[0].split('.')[1], 10);
			else if(nak.location.start.split(',')[0].indexOf('.') > -1 && nak.location.start.split(',')[0].split('.')[1] == '')
				nak_s = parseInt(nak.location.start.split(',')[0].split('.')[0], 10)*60;
			else
				nak_s = parseInt(nak.location.start.split(',')[0], 10)*60;
			   
			if(nak.location.end.split(',')[0].indexOf('.') > -1 && nak.location.end.split(',')[0].split('.')[1] != '')
				nak_e = parseInt(nak.location.end.split(',')[0].split('.')[0], 10)*60 + parseInt(nak.location.end.split(',')[0].split('.')[1], 10);
			else if(nak.location.end.split(',')[0].indexOf('.') > -1 && nak.location.end.split(',')[0].split('.')[1] == '')
				nak_e = parseInt(nak.location.end.split(',')[0].split('.')[0], 10)*60;
			else
				nak_e = parseInt(nak.location.end.split(',')[0], 10)*60;
			
			if(nak.location.start.split(',')[1] == moonsign.toLowerCase() && nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
				if(moonmins >= nak_s && moonmins <= nak_e) {
					return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
				}
			} 
			else if(nak.location.start.split(',')[1] == moonsign.toLowerCase()) {
			  if(moonmins >= nak_s) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
			}
			else if(nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
			  if(moonmins <= nak_e) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
			}
		}
	}
        calcStar(plpos: number, sign: string)
        {
			for(var i = 0; i < Object.keys(this.nakshatras_v).length; i++)
			{
				var nak = this.nakshatras_v[i];
                if (nak.location.start.split(',')[1] == sign && nak.location.end.split(',')[1] == sign)
                {
                    if (plpos >= this.dmsToDec(Number(nak.location.start.split(',')[0].split('.')[0]),Number(nak.location.start.split(',')[0].split('.')[1]),0) && plpos < this.dmsToDec(Number(nak.location.end.split(',')[0].split('.')[0]),Number(nak.location.end.split(',')[0].split('.')[1]),0))
                    {
						return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
                    }
				}
                else if (nak.location.start.split(',')[1] == sign.toString())
                {
                     if (plpos >= this.dmsToDec(Number(nak.location.start.split(',')[0].split('.')[0]), Number(nak.location.start.split(',')[0].split('.')[1]),0))
                     {
						return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];                     
					 }
                }
                else if (nak.location.end.split(',')[1] == sign.toString())
                {
                     if (plpos < this.dmsToDec(Number(nak.location.end.split(',')[0].split('.')[0]), Number(nak.location.end.split(',')[0].split('.')[1]),0))
                     {
						 return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];	                     
					 }
                }
			}
        }
	
	calcBirthStarEx(moonsign: string, moondeg: number)
	{
	    //convert deg & mins to mins
		let md_s: string = moondeg.toString();
		let moonmins: number = 0;
		if(md_s.indexOf('.') > -1 && md_s.split('.')[1] != '')
		    moonmins = parseInt(md_s.split('.')[0], 10)*60 + parseInt(md_s.split('.')[1], 10);
		else if(md_s.indexOf('.') > -1 && md_s.split('.')[1] == '')
			moonmins = parseInt(md_s.split('.')[0], 10)*60;
		else
			moonmins = parseInt(md_s, 10)*60;
		
		for(var i = 0; i < Object.keys(this.nakshatras_v).length; i++)
		{
			var nak = this.nakshatras_v[i];
			let nak_s: number = 0;
			let nak_e: number = 0;
			if(nak.location.start.split(',')[0].indexOf('.') > -1 && nak.location.start.split(',')[0].split('.')[1] != '')
				nak_s = parseInt(nak.location.start.split(',')[0].split('.')[0], 10)*60 + parseInt(nak.location.start.split(',')[0].split('.')[1], 10);
			else if(nak.location.start.split(',')[0].indexOf('.') > -1 && nak.location.start.split(',')[0].split('.')[1] == '')
				nak_s = parseInt(nak.location.start.split(',')[0].split('.')[0], 10)*60;
			else
				nak_s = parseInt(nak.location.start.split(',')[0], 10)*60;
			   
			if(nak.location.end.split(',')[0].indexOf('.') > -1 && nak.location.end.split(',')[0].split('.')[1] != '')
				nak_e = parseInt(nak.location.end.split(',')[0].split('.')[0], 10)*60 + parseInt(nak.location.end.split(',')[0].split('.')[1], 10);
			else if(nak.location.end.split(',')[0].indexOf('.') > -1 && nak.location.end.split(',')[0].split('.')[1] == '')
				nak_e = parseInt(nak.location.end.split(',')[0].split('.')[0], 10)*60;
			else
				nak_e = parseInt(nak.location.end.split(',')[0], 10)*60;
			
			if(nak.location.start.split(',')[1] == moonsign.toLowerCase() && nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
				if(moonmins >= nak_s && moonmins <= nak_e) {
					return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
				}
			} 
			else if(nak.location.start.split(',')[1] == moonsign.toLowerCase()) {
			  if(moonmins >= nak_s) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
			}
			else if(nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
			  if(moonmins <= nak_e) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
			}
			//if(nak.location.start.split(',')[1] == moonsign.toLowerCase() && nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
			//	if(moondeg >= parseFloat(nak.location.start.split(',')[0]) && moondeg <= parseFloat(nak.location.end.split(',')[0])) {
			//		return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
			//	}
			//} 
			//else if(nak.location.start.split(',')[1] == moonsign.toLowerCase()) {
			//  if(moondeg >= parseFloat(nak.location.start.split(',')[0])) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
			//}
			//else if(nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
			//  if(moondeg <= parseFloat(nak.location.end.split(',')[0])) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
			//}
		}
	}
	rep(evt)
	{
	}
  subscribe() {
	  this.router.navigate(['/subscribe']);
  }
	trans(lord: string)
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
	dmsToDec(d, m, s)
    {
       let v: number = d + (m /60) + (s /3600);
       return Number(v.toFixed(2));
    }
	analyze(evt, trn)
	{
		let tns: any = {};
		tns.p = this.oPlanet[trn.pl.toLowerCase()];
		tns.t = trn;
		this.router.navigate(['/kp-event'], {state: tns});
	}
	dashinf(evt)
	{
		this.router.navigate(['/kp-event']);
	}
	rightmenu() {
		this.menu.open('second');
	}
    trnres(pl) {
       var mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		console.log('selected', pl);
		this.tsel.All = 'tunsel';
		this.tsel.Su = 'tunsel';
		this.tsel.Mo = 'tunsel';
		this.tsel.Ju = 'tunsel';
		this.tsel.Ve = 'tunsel';
		this.tsel.Ma = 'tunsel';
		this.tsel.Me = 'tunsel';
		this.tsel.Ra = 'tunsel';
		this.tsel.Sa = 'tunsel';
		switch(pl)
		{
			case 'Su':
				this.tsel.Su = 'tsel';
				break;
			case 'Mo':
				this.tsel.Mo = 'tsel';
				break;
			case 'Ju':
				this.tsel.Ju = 'tsel';
				break;
			case 'Ve':
				this.tsel.Ve = 'tsel';
				break;
			case 'Ma':
				this.tsel.Ma = 'tsel';
				break;
			case 'Me':
				this.tsel.Me = 'tsel';
				break;
			case 'Ra':
				this.tsel.Ra = 'tsel';
				break;
			case 'Sa':
				this.tsel.Sa = 'tsel';
				break;
			default:
				this.tsel.All = 'tsel';
				break;
		}
		if(pl == 'All') {
			var dt1 = new Date();
			this.oTrans1 = this.oTrans.filter(function(x) {
				return x.tmon == dt1.toLocaleString('en-us', { month: 'short' });
			});
			var dt2 = new Date(dt1.setMonth(dt1.getMonth()+1));
			this.oTrans2 = this.oTrans.filter(function(x) {
				return x.tmon == dt2.toLocaleString('en-us', { month: 'short' });
			});
			var dt3 = new Date(dt2.setMonth(dt2.getMonth()+1));
			this.oTrans3 = this.oTrans.filter(function(x) {
				return x.tmon == dt3.toLocaleString('en-us', { month: 'short' });
			});
			var dt4 = new Date(dt3.setMonth(dt3.getMonth()+1));
			this.oTrans4 = this.oTrans.filter(function(x) {
				return x.tmon == dt4.toLocaleString('en-us', { month: 'short' });
			});
		} else {
			if(pl == "Ra") {
				this.oTrans1 = this.oTrans.filter(function(x) {
					console.log('filter', x);
					return (x.pl == pl || x.pl == "Ke");
				});
				this.oTrans2 = this.oTrans.filter(function(x) {
					return (x.pl == pl || x.pl == "Ke");
				});
				this.oTrans3 = this.oTrans.filter(function(x) {
					return (x.pl == pl || x.pl == "Ke");
				});
				this.oTrans4 = this.oTrans.filter(function(x) {
					return (x.pl == pl || x.pl == "Ke");
				});
			} else {
				this.oTrans1 = this.oTrans.filter(function(x) {
					console.log('filter', x);
					return x.pl == pl;
				});
				this.oTrans2 = this.oTrans.filter(function(x) {
					return x.pl == pl;
				});
				this.oTrans3 = this.oTrans.filter(function(x) {
					return x.pl == pl;
				});
				this.oTrans4 = this.oTrans.filter(function(x) {
					return x.pl == pl;
				});
			}
		}
    }		
}
