import { Component, OnInit, ViewChild, Renderer2, ElementRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import {TranslateService} from '@ngx-translate/core';
import * as signs from '../signs.json';
import * as o_signs from '../o_signs.json';
import * as o_rashis from '../o_rashis.json';
import * as sign_imgs from '../sign_imgs.json';
import * as rashi_lords from '../rashi_lords.json';
import { Yoga } from '../yoga';

@Component({
  selector: 'app-gemstone-astro',
  templateUrl: './gemstone-astro.page.html',
  styleUrls: ['./gemstone-astro.page.scss'],
})
export class GemstoneAstroPage implements OnInit {
	@ViewChild('birthChart', {static: true}) birthChart : ElementRef;
	signs_v: any = (signs as any).default;
	o_signs_v: any = (o_signs as any).default;;
	o_rashis_v: any = (o_rashis as any).default;
	sign_imgs_v: any = (sign_imgs as any).default;
	rashi_lords_v: any = (rashi_lords as any).default;
  objectKeys = Object.keys;
  oGem: Yoga[] = [];
  fbens: any = null;
  fmels: any = null;
  binf: any = null;
  msg: string = '';
  info: string = '';
  
  	moon_sign :string = '';
	moon_deg :string = '';
	asc_sign :string = '';
  dob: string = '';
  lagna: string = '';
  lagna_lord: string = '';
  sun_sign: string = '';
  tithi: string = '';
  birth_star: string = '';
  star_lord: string = '';
  moon_phase: string = '';
	device_width :number = 0;
	device_height :number = 0;
	name: string = '';
	cur_m_das :string = ''; cur_a_das :string = '';
	msg1: string ='';
	msg2: string ='';
	msg3: string ='';
	msg4: string = '';
	showBD = false;
	svgHoro: any;
  constructor(public platform: Platform, private menu: MenuController, private router: Router, public shareService: ShareService, private horoService: HoroscopeService, private translate: TranslateService, public renderer: Renderer2) { 
}

  ngOnInit() {
   this.binf = this.router.getCurrentNavigation().extras.state;
		console.log('Width: ' + this.platform.width());
		this.device_width = this.platform.width();
		console.log('Height: ' + this.platform.height());
		this.device_height = this.platform.height();
			let ayanid: number = 4;
			var res = this.shareService.getAYNM();
			if(res) ayanid = Number(res);
		this.msg = 'Getting data..';
	  		this.horoService.getJson('assets/data/fbens.json')
			.subscribe(bens => {
				this.fbens = bens;
				this.msg = 'Calculating Astakavarga..';
	if(this.binf.akv != null) {
			this.publishRep(this.binf.akv);
		} else {
			var dt = new Date();
			var n = dt.getTimezoneOffset();
			n = n/60;
			let ofset: number = Number(n.toFixed(1));
			this.horoService.getAstakvarga(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, ofset, ayanid)
		   .subscribe(akv => {
			   this.shareService.setAKV(this.binf.dob, akv);
               this.publishRep(akv);
		  }, (err) => {
			this.msg = JSON.stringify(err);
		  }) ;
		}
	});
	this.msg2 = 'Analyzing stars..';
 	this.horoService.getBirthInfoEx(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, ayanid)
       .subscribe(res => {
		   this.showBD = true;
		   this.msg2 = '';
		   this.dob = res['dob'];
		   this.lagna = this.shareService.translate_func(res['lagna']);
		   this.lagna_lord = this.shareService.translate_func(res['lagna_lord']);
		   this.moon_sign = this.shareService.translate_func(res['moon_sign']);
		   this.sun_sign = this.shareService.translate_func(res['sun_sign']);
		   this.tithi = this.shareService.translate_func(res['tithi']);
		   this.birth_star = this.shareService.translate_func(res['birth_star']);
		   this.star_lord = this.shareService.translate_func(res['star_lord']);
		   this.moon_phase = this.shareService.translate_func(res['moon_phase']);
      }, (err) => {
      }) ;
	 this.loadHoro();
  }
  
  loadHoro()
  {
	var plPos = this.binf.ppos; 
	console.log('loadHoro', plPos);
	console.log('signs_v', this.signs_v);
		for (var i = 0; i < 16; i++) {
			var sign = this.signs_v[i];
			console.log('sign=', sign);
			if (plPos.hasOwnProperty(sign)) {
			    console.log('split-1');
				var pls = plPos[sign].split('\|');
				console.log(pls);
				for (var k = 0; k < pls.length; k++) {
					if (pls[k].split(' ')[1] == 'MEAN_NODE') {
						var rpos = this.o_rashis_v[sign].split('\|')[0];
						var kpos = parseInt(rpos, 10) + 6;
						if (kpos > 12) kpos = (kpos - 12);
						if (plPos.hasOwnProperty(this.o_signs_v[kpos - 1])) {
							var eP = plPos[this.o_signs_v[kpos - 1]];
							plPos[this.o_signs_v[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
						} else {
							plPos[this.o_signs_v[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
						}
						plPos[sign] = plPos[sign].replace('MEAN_NODE', 'Ra');
					} else if (pls[k].split(' ')[1] == 'AC') { 
						this.asc_sign = sign;
						console.log('ASCENDENT is ' + this.asc_sign);
					} else if (pls[k].split(' ')[1] == 'Mo') {
						this.moon_sign = sign;
						this.moon_deg = pls[k].split(' ')[0];
					} else if (pls[k].split(' ')[1] == 'TRUE_NODE') {
						plPos[sign] = plPos[sign].replace('TRUE_NODE', 'TR');		
					}
				}
			}
		}
	    if(this.shareService.getCHTYP() == 'sind')
			this.svgHoro = this.drawSIChart(plPos);
		else if(this.shareService.getCHTYP() == 'nind')
			this.svgHoro = this.drawNIchart(plPos);
		else
			this.svgHoro = this.drawSIChart(plPos);
		console.log('svg', this.svgHoro);
		console.log('birthChart', this.birthChart);
        this.renderer.appendChild(this.birthChart.nativeElement, this.svgHoro);
  }
	drawSIChart(plps) {
		let db: string = this.binf.dob;
		let latlng: string = '';
		if(this.binf.dob.indexOf('L') > -1) {
			db = this.binf.dob.split('L')[0].trim();
			let lat: string = this.binf.dob.split('L')[1].split('@')[0].split(',')[0].trim();
			let lng: string = this.binf.dob.split('L')[1].split('@')[0].split(',')[1].trim();
			latlng = lat + ',' + lng;
		} else {
			latlng = this.binf.lat + ',' + this.binf.lng;
		}
        var size = this.device_width;
		var bxz = size/4;
		var isz = Math.floor(bxz/3);
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", (size).toString());
		this.renderer.setAttribute(svg, "height", (size).toString());
		this.renderer.setAttribute(svg, "viewBox", [0, 0, size, size].join(" "));
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.renderer.setAttribute(box, "width", size.toString());
		this.renderer.setAttribute(box, "height", size.toString());
		this.renderer.setAttribute(box, "stroke", "#d35400");
		this.renderer.setAttribute(box, "stroke-width", "2");
		this.renderer.setAttribute(box, "fill", "#ffffff");
		this.renderer.setAttribute(box, "id", "bx1");
		this.renderer.appendChild(g, box);
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l1");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", "0"); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l2");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l3");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size).toString()); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "14");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (bxz).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (bxz).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l5");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size/2).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l6");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size-bxz).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size-bxz).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l7");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (bxz).toString()); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (bxz).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l8");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size/2).toString()); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l9");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size-bxz).toString()); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (size-bxz).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l10");
		this.renderer.appendChild(g, line);
		box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.renderer.setAttribute(box, "x", (bxz).toString());
		this.renderer.setAttribute(box, "y", (bxz).toString());
		this.renderer.setAttribute(box, "width", (size/2).toString());
		this.renderer.setAttribute(box, "height", (size/2).toString());
		this.renderer.setAttribute(box, "stroke", "#d35400");
		this.renderer.setAttribute(box, "stroke-width", "2");
		this.renderer.setAttribute(box, "fill", "#ffffff");
		this.renderer.setAttribute(box, "id", "bx2");
		this.renderer.appendChild(g, box);
		var tpx: number = (bxz*2);
		var tpy: number = (bxz*2);
		var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(text, document.createTextNode(this.binf.name));
		this.renderer.setAttribute(text, "fill", "#d35400");
		this.renderer.setAttribute(text, "font-size", "1.35rem");
		this.renderer.setAttribute(text, "font-weight", "bold");
		this.renderer.setAttribute(text, "alignment-baseline", "middle");
		this.renderer.setAttribute(text, "text-anchor", "middle");
		this.renderer.setAttribute(text, "x", (tpx).toString());
		this.renderer.setAttribute(text, "y", (tpy).toString());
		this.renderer.setAttribute(text, "id", "tc1");
		g.appendChild(text);
		text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(text, document.createTextNode(db));
		this.renderer.setAttribute(text, "fill", "#d35400");
		this.renderer.setAttribute(text, "font-size", "1rem");
		this.renderer.setAttribute(text, "font-weight", "bold");
		this.renderer.setAttribute(text, "alignment-baseline", "middle");
		this.renderer.setAttribute(text, "text-anchor", "middle");
		this.renderer.setAttribute(text, "x", tpx.toString());
		this.renderer.setAttribute(text, "y", (tpy+16).toString());
		this.renderer.setAttribute(text, "id", "tc2");
		g.appendChild(text);
		text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(text, document.createTextNode(latlng));
		this.renderer.setAttribute(text, "fill", "#d35400");
		this.renderer.setAttribute(text, "font-size", "0.8rem");
		this.renderer.setAttribute(text, "font-weight", "bold");
		this.renderer.setAttribute(text, "alignment-baseline", "middle");
		this.renderer.setAttribute(text, "text-anchor", "middle");
		this.renderer.setAttribute(text, "x", tpx.toString());
		this.renderer.setAttribute(text, "y", (tpy+32).toString());
		this.renderer.setAttribute(text, "id", "tc3");
		g.appendChild(text);
		let plc: number = 1;
		let plh: number = 14; //font pixel height
		let signs = ["pi", "aq", "cp", "sa", "ar","sc", "ta", "li", "ge", "cn", "le", "vi"];
		for(var i = 0; i < 12; i++) {
			    let sign = signs[i];
				let hcord = this.getRXY(sign, this.device_width);
				var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
				this.renderer.setAttribute(image, "x", (Math.floor(hcord[0]-isz)).toString());
				this.renderer.setAttribute(image, "y", (Math.floor(hcord[1])).toString());
				this.renderer.setAttribute(image, "height", (isz).toString());
				this.renderer.setAttribute(image, "width", (isz).toString());
				image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.sign_imgs_v[sign]);
				this.renderer.appendChild(g, image);
				if (plps.hasOwnProperty(sign)) {
					hcord = this.getPXY(sign, size);
					var pls = plps[sign].split('\|');
					var pcnt = 0;
					for (var k = 0; k < pls.length; k++) {
						if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
						if (pls[k].split(' ')[1] == 'AC') this.asc_sign = sign;
						else if (pls[k].split(' ')[1] == 'Mo') {
							this.moon_sign = sign;
							this.moon_deg = pls[k].split(' ')[0];
						}
						pcnt++;
						var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						var plt = pls[k];
						if(this.binf.retro.indexOf(pls[k].split(' ')[1]) > -1) plt += '[R]';
						this.renderer.appendChild(text, document.createTextNode(plt));
						this.renderer.setAttribute(text, "font-size", "0.875rem");
						this.renderer.setAttribute(text, "font-weight", "bold");
						this.renderer.setAttribute(text, "fill", ((pls[k].split(' ')[1] == "AC") ? "#FF5733" : (pls[k].split(' ')[1] == "Mo") ? "#011898":"#0a0a0a"));
						this.renderer.setAttribute(text, "x", (hcord[0]-isz).toString());
						var s8 = hcord[1] + (plh*pcnt);
						this.renderer.setAttribute(text, "y",  s8.toString());
						this.renderer.setAttribute(text, "id", "pl" + (plc).toString());
						g.appendChild(text);
						plc++;
					}
				}
		}
		svg.appendChild(g);
		return svg;
	};

  publishRep(akv) {
	   this.msg = '';
		let h1w: boolean = true;
		let h5w: boolean = true;
		let h9w: boolean = true;
 		let akvPts = akv['akPts'];
		let houSg = akv['houSgn'];
		console.log(akvPts);
		let pt1 : number = akvPts['Su-1'] +  akvPts['Mo-1'] + akvPts['Ju-1'] + akvPts['Me-1'] + akvPts['Ve-1'] + akvPts['Ma-1'] + akvPts['Sa-1'];
		if(pt1 > 28) {
			h1w = false;
		}
		let pt5: number = akvPts['Su-5'] +  akvPts['Mo-5'] + akvPts['Ju-5'] + akvPts['Me-5'] + akvPts['Ve-5'] + akvPts['Ma-5'] + akvPts['Sa-5'];
		if(pt5 > 28) {
			h5w = false;
		}
		let pt9: number = akvPts['Su-9'] +  akvPts['Mo-9'] + akvPts['Ju-9'] + akvPts['Me-9'] + akvPts['Ve-9'] + akvPts['Ma-9'] + akvPts['Sa-9'];
		if(pt9 > 28) {
			h9w = false;
		}
		if(h1w == true) {
			this.gemstone(houSg, '1');
		} else if(h5w == true) {
			this.gemstone(houSg, '5');
		} else if(h9w == true) {
			this.gemstone(houSg, '9');
		} else {
			this.info = 'As per VEDIC HOROO analysis, you dont need a Gemstone as all the 3 main trik houses (1,5,9) has enough Astakavarga points to be considered as strong enough.  As energizing more of these houses could have impact on other life aspect. But if you are seeking Gemstone for a specific issue then you better consult one of our expert astrologers, they should be able to further analyze your chart & suggest a right Gemstone.'; 
		}
		
   }
   gemstone(houSg, hno) {
		this.msg = 'Finding right gemstone...';
		console.log(houSg[hno], hno);
		let ins: string = '';
		 let glrd: string = this.rashi_lords_v[houSg[hno]].substring(0,2);
 			for(var i = 0; i < this.fbens[houSg[1]].length; i++) {
			    console.log(this.fbens[houSg[1]][i] );
				if(this.fbens[houSg[1]][i].code == glrd) {
					console.log('gemlrd', glrd);
					console.log(this.fbens[houSg[1]][i].traits );
					ins += this.fbens[houSg[1]][i].traits + ',';
				}
			}
	  		this.horoService.getJson('assets/data/' + this.shareService.getLANG()+'-gems.json')
			.subscribe(gems => {
				let rgems = gems[this.rashi_lords_v[houSg[hno]].substring(0,2)];
				for(let key of Object.keys(rgems)) {
				    let yg : Yoga = {
					  name: key,
					  desc: rgems[key]
					};
					this.oGem[key] = yg;
				}
				    let g : Yoga = {
					  name: 'Life aspects',
					  desc: ins
					};
				this.oGem['Life aspects'] = g;
				this.msg = '';
			});
   }
	drawNIchart(plps) {
	   var roms = ['I', 'II', 'III', 'IV', 'V', 'V1', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
       var ras = ['ar', 'ta', 'ge', 'cn', 'le', 'vi', 'li', 'sc', 'sa', 'cp', 'aq', 'pi'];
	   let ah: number = 0;
	   var s6 = 12;
	    for(var r = 0; r < 12; r++) {
  		 if (plps.hasOwnProperty(ras[r])) {
			var pls = plps[ras[r]].split('\|');
			for (var k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
				if (pls[k].split(' ')[1] == 'AC') { 
				   this.asc_sign = ras[r];
				   ah = r+1;
				   break;
				}
			}
	     }
		}
        var size = this.device_width;
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", (this.device_width).toString());
		this.renderer.setAttribute(svg, "height", (this.device_width).toString());
		var bxz = size/4;
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.renderer.setAttribute(box, "width", size.toString());
		this.renderer.setAttribute(box, "height", size.toString());
		this.renderer.setAttribute(box, "stroke", "#d35400");
		this.renderer.setAttribute(box, "stroke-width", "2");
		this.renderer.setAttribute(box, "fill", "#ffffff");
		this.renderer.setAttribute(box, "id", "bx1");
		this.renderer.appendChild(g, box);
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l1");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", "0"); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l2");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l3");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size).toString()); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "14");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l5");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l6");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l7");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l8");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size/2).toString()); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size/2).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l9");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size).toString()); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l10");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size/4).toString()); 
		this.renderer.setAttribute(line, "y1", (size/4).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "red");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l11");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size/4).toString()); 
		this.renderer.setAttribute(line, "y1", (size/4).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", (size/2).toString()); 
		this.renderer.setAttribute(line, "stroke", "red");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l12");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size/2).toString()); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", ((size/2)+bxz).toString()); 
		this.renderer.setAttribute(line, "y2", (bxz).toString()); 
		this.renderer.setAttribute(line, "stroke", "red");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l13");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", ((size/2)+bxz).toString()); 
		this.renderer.setAttribute(line, "y1", (bxz).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "red");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l14");
		this.renderer.appendChild(g, line);
		console.log('ah',ah);
		var isz = Math.floor(bxz/3);
		var hcord = this.getHXY(1, this.device_width);
		var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", (Math.floor(hcord[0]-isz)).toString());
		this.renderer.setAttribute(image, "y", (Math.floor(hcord[1])-isz).toString());
		this.renderer.setAttribute(image, "height", (isz).toString());
		this.renderer.setAttribute(image, "width", (isz).toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.sign_imgs_v[ras[ah-1]]);
		this.renderer.appendChild(g, image);
		var htxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(htxt, document.createTextNode(ras[ah-1]));
		this.renderer.setAttribute(htxt, "fill", "#d35400");
		this.renderer.setAttribute(htxt, "font-size", s6.toString());
		this.renderer.setAttribute(htxt, "font-weight", "bold");
		this.renderer.setAttribute(htxt, "alignment-baseline", "middle");
		this.renderer.setAttribute(htxt, "text-anchor", "middle");
		this.renderer.setAttribute(htxt, "x", (Math.floor(hcord[0])).toString());
		this.renderer.setAttribute(htxt, "y", (Math.floor(hcord[1])).toString());
		this.renderer.setAttribute(htxt, "id", "RH" + ah.toString());
		this.renderer.appendChild(g, htxt);
		let np: number = 0;
  		 if (plps.hasOwnProperty(ras[ah-1])) {
			var pls = plps[ras[ah-1]].split('\|');
			for (var k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
				console.log('getXY', pls[k]);
				var cord = this.getXY(1, this.device_width, Number(pls[k].split(' ')[0]));
				console.log('getXY-cord', cord);
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				this.renderer.appendChild(text, document.createTextNode(pls[k]));
				this.renderer.setAttribute(text, "fill", "#d35400");
				this.renderer.setAttribute(text, "font-size", s6.toString());
				this.renderer.setAttribute(text, "font-weight", "bold");
				this.renderer.setAttribute(text, "alignment-baseline", "middle");
				this.renderer.setAttribute(text, "text-anchor", "middle");
				this.renderer.setAttribute(text, "x", (Math.floor(cord[0])).toString());
				this.renderer.setAttribute(text, "y", (Math.floor(cord[1]+np)).toString());
				this.renderer.setAttribute(text, "id", "R1" + k.toString());
				this.renderer.appendChild(g, text);
				np += 12;
			}
		}
		let ch: number = ah;
	    let hou: number = 2;
		while(hou < 13) {
		   ch++;
		   if(ch > 12) ch = 1;
		   console.log('hno=', hou);
			np = 0;
		    hcord = this.getHXY(hou, this.device_width);
		    htxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
			this.renderer.appendChild(htxt, document.createTextNode(roms[hou-1]));
			this.renderer.setAttribute(htxt, "fill", "#d35400");
			this.renderer.setAttribute(htxt, "font-size", s6.toString());
			this.renderer.setAttribute(htxt, "font-weight", "bold");
			this.renderer.setAttribute(htxt, "alignment-baseline", "middle");
			this.renderer.setAttribute(htxt, "text-anchor", "middle");
			this.renderer.setAttribute(htxt, "x", (Math.floor(hcord[0])).toString());
			this.renderer.setAttribute(htxt, "y", (Math.floor(hcord[1])).toString());
			this.renderer.setAttribute(htxt, "id", "RH" + ch.toString());
			this.renderer.appendChild(g, htxt);
			image = document.createElementNS("http://www.w3.org/2000/svg", "image");
			this.renderer.setAttribute(image, "x", (Math.floor(hcord[0]-isz)).toString());
			this.renderer.setAttribute(image, "y", (Math.floor(hcord[1])-isz).toString());
			this.renderer.setAttribute(image, "height", (isz).toString());
			this.renderer.setAttribute(image, "width", (isz).toString());
			image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.sign_imgs_v[ras[ch-1]]);
			this.renderer.appendChild(g, image);
			console.log("fixing planets to hou");
  		 if (plps.hasOwnProperty(ras[ch-1])) {
			var pls = plps[ras[ch-1]].split('\|');
			for (var k = 0; k < pls.length; k++) {
			    console.log("k=", k);
				if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
			console.log("ch", ch);
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				console.log('getXY', pls[k]);
				var cord = this.getXY(hou, this.device_width, Number(pls[k].split(' ')[0]));
				console.log('getXY', cord);
				this.renderer.appendChild(text, document.createTextNode(pls[k]));
				this.renderer.setAttribute(text, "fill", "#d35400");
				this.renderer.setAttribute(text, "font-size", s6.toString());
				this.renderer.setAttribute(text, "font-weight", "bold");
				this.renderer.setAttribute(text, "alignment-baseline", "middle");
				this.renderer.setAttribute(text, "text-anchor", "middle");
				this.renderer.setAttribute(text, "x", (Math.floor(cord[0])).toString());
				this.renderer.setAttribute(text, "y", (Math.floor(cord[1]+np)).toString());
				this.renderer.setAttribute(text, "id", "R" + ch.toString() + k.toString());
				this.renderer.appendChild(g, text);
				np += 12;
			}
		}
		hou++;
	}
	svg.appendChild(g);
	return svg;
 }
 
 getXY(h, w, p) {
	let side: number = Math.floor(w/4);
	console.log('h', h);
	console.log('side', side);
	let x1: number = 0;
	let x2: number = 0;
	let y1: number = 0;
	let y2: number = 0;
	switch(h) {
		case 1:
			x1 = side;
			x2 = side*3;
			y1 = 0;
			y2 = side*2;
			break;
		case 2:
			x1 = 0;
			x2 = side*2;
			y1 = 0;
			y2 = side;
			break;
		case 3:
			x1 = 0;
			x2 = side;
			y1 = 0;
			y2 = side*2;
			break;
		case 4:
			x1 = 0;
			x2 = side*2;
			y1 = side;
			y2 = side*3;
			break;
		case 5:
			x1 = 0;
			x2 = side;
			y1 = side*2;
			y2 = w;
			break;
		case 6:
			x1 = 0;
			x2 = side*2;
			y1 = side*3;
			y2 = w;
			break;
		case 7:
			x1 = side;
			x2 = side*3;
			y1 = side*2;
			y2 = w;
			break;
		case 8:
			x1 = side*2;
			x2 = w;
			y1 = side*3;
			y2 = w;
			break;
		case 9:
			x1 = side*3;
			x2 = w;
			y1 = side*2;
			y2 = w;
			break;
		case 10:
			x1 = side*2;
			x2 = w;
			y1 = side;
			y2 = side*3;
			break;
		case 11:
			x1 = side*3;
			x2 = w;
			y1 = 0;
			y2 = side*2;
			break;
		case 12:
			x1 = side*2;
			x2 = w;
			y1 = 0;
			y2 = side;
			break;
		default:
			break;
	}
	console.log('x1', x1);
	console.log('x2', x2);
	console.log('y1', y1);
	console.log('y2', y2);
	let xw: number = x2 - x1;
	let yh: number = y2 - y1;
	var x = x1 + (Math.floor(xw/2));
	var y = y1 + (Math.floor(yh/2));
	console.log(x,y);
	return [x, y];
 }
 getHXY(h, w) {
	let side: number = Math.floor(w/4);
	console.log('h', h);
	console.log('side', side);
	let x1: number = 0;
	let x2: number = 0;
	let y1: number = 0;
	let y2: number = 0;
	switch(h) {
		case 1:
			x1 = side;
			x2 = side*3;
			y1 = 0;
			y2 = side*2;
			break;
		case 2:
			x1 = 0;
			x2 = side*2;
			y1 = 0;
			y2 = side;
			break;
		case 3:
			x1 = 0;
			x2 = side;
			y1 = 0;
			y2 = side*2;
			break;
		case 4:
			x1 = 0;
			x2 = side*2;
			y1 = side;
			y2 = side*3;
			break;
		case 5:
			x1 = 0;
			x2 = side;
			y1 = side*2;
			y2 = w;
			break;
		case 6:
			x1 = 0;
			x2 = side*2;
			y1 = side*3;
			y2 = w;
			break;
		case 7:
			x1 = side;
			x2 = side*3;
			y1 = side*2;
			y2 = w;
			break;
		case 8:
			x1 = side*2;
			x2 = w;
			y1 = side*3;
			y2 = w;
			break;
		case 9:
			x1 = side*3;
			x2 = w;
			y1 = side*2;
			y2 = w;
			break;
		case 10:
			x1 = side*2;
			x2 = w;
			y1 = side;
			y2 = side*3;
			break;
		case 11:
			x1 = side*3;
			x2 = w;
			y1 = 0;
			y2 = side*2;
			break;
		case 12:
			x1 = side*2;
			x2 = w;
			y1 = 0;
			y2 = side;
			break;
		default:
			break;
	}
	console.log('x1', x1);
	console.log('x2', x2);
	console.log('y1', y1);
	console.log('y2', y2);
	let xw: number = x2 - x1;
	let yh: number = y2 - y1;
	var x = x1 + (Math.floor(xw/2));
	var y = y1 + (Math.floor(yh/2) - 12);
	console.log(x,y);
	return [x, y];
 }
 getPXY(r, w) {
	let side: number = Math.floor(w/4);
	let bx: number = Math.floor(side/2);
	console.log('r', r);
	console.log('side', side);
	let x1: number = 0;
//	let x2: number = 0;
	let y1: number = 0;
//	let y2: number = 0;
	switch(r) {
		case "ar":
			x1 = (side*2)-bx;
			y1 = 12;
			break;
		case "ta":
			x1 = (side*3)-bx;
			y1 = 12;
			break;
		case "ge":
			x1 = (side*4)-bx;
			y1 = 12;
			break;
		case "cn":
			x1 = (side*4)-bx;
			y1 = side+12;
			break;
		case "le":
			x1 = (side*4)-bx;
			y1 = (side*2)+12;
			break;
		case "vi":
			x1 = (side*4)-bx;
			y1 = (side*3)+12;
			break;
		case "li":
			x1 = (side*3)-bx;
			y1 = (side*3)+12;
			break;
		case "sc":
			x1 = (side*2)-bx;
			y1 = (side*3)+12;
			break;
		case "sa":
			x1 = (side)-bx;
			y1 = (side*3)+12;
			break;
		case "cp":
			x1 = (side)-bx;
			y1 = (side*2)+12;
			break;
		case "aq":
			x1 = (side)-bx;
			y1 = (side)+12;
			break;
		case "pi":
			x1 = (side)-bx;
			y1 = 12;
			break;
		default:
			break;
	}
	console.log('x1', x1);
	console.log('y1', y1);
	return [x1, y1];
 }
 getRXY(r, w) {
	let side: number = Math.floor(w/4);
	console.log('r', r);
	console.log('side', side);
	let x1: number = 0;
	let x2: number = 0;
	let y1: number = 0;
	let y2: number = 0;
	switch(r) {
		case "ar":
			x1 = side;
			x2 = side*2;
			y1 = 0;
			y2 = side;
			break;
		case "ta":
			x1 = side*2;
			x2 = side*3;
			y1 = 0;
			y2 = side;
			break;
		case "ge":
			x1 = side*3;
			x2 = w;
			y1 = 0;
			y2 = side;
			break;
		case "cn":
			x1 = side*3;
			x2 = w;
			y1 = side;
			y2 = side*2;
			break;
		case "le":
			x1 = side*3;
			x2 = w;
			y1 = side*2;
			y2 = side*3;
			break;
		case "vi":
			x1 = side*3;
			x2 = w;
			y1 = side*3;
			y2 = w;
			break;
		case "li":
			x1 = side*2;
			x2 = side*3;
			y1 = side*3;
			y2 = w;
			break;
		case "sc":
			x1 = side;
			x2 = side*2;
			y1 = side*3;
			y2 = w;
			break;
		case "sa":
			x1 = 0;
			x2 = side;
			y1 = side*3;
			y2 = w;
			break;
		case "cp":
			x1 = 0;
			x2 = side;
			y1 = side*2;
			y2 = side*3;
			break;
		case "aq":
			x1 = 0;
			x2 = side;
			y1 = side;
			y2 = side*2;
			break;
		case "pi":
			x1 = 0;
			x2 = side;
			y1 = 0;
			y2 = side;
			break;
		default:
			break;
	}
	console.log('x1', x1);
	console.log('x2', x2);
	console.log('y1', y1);
	console.log('y2', y2);
	let xw: number = x2 - x1;
	let yh: number = y2 - y1;
	//let part: number = Math.floor((x2-x1)/30);
	var x = x1 + (Math.floor(xw/2));
	var y = y1 + (Math.floor(yh/2));
	console.log(x,y);
	return [x, y];
 }
nakdtl() {
	 this.router.navigate(['/nak-info'], {state : this.birth_star.split(' ')[0] as any});
 }   
	rightmenu() {
		this.menu.open('second');
	}
}
