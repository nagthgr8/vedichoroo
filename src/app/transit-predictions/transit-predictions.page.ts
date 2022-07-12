import { Component, OnInit, Renderer2, AfterViewInit, ViewChild, ElementRef, NgModule, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';
import { Prediction } from '../prediction';
import { Device } from '@ionic-native/device/ngx';
import { Plan } from '../plan';
import * as signs from '../signs.json';
import * as o_signs from '../o_signs.json';
import * as o_rashis from '../o_rashis.json';
import * as sign_imgs from '../sign_imgs.json';
import * as nakshatras from '../nakshatras.json';
import * as ruler_name from '../ruler_name.json';
declare var admob;
@Component({
  selector: 'app-transit-predictions',
  templateUrl: './transit-predictions.page.html',
  styleUrls: ['./transit-predictions.page.scss'],
})
export class TransitPredictionsPage implements OnInit, AfterViewInit  {
   @ViewChild('birthChart', {static: true}) birthChart;
   @ViewChild('tranChart', {static: true}) tranChart;
   @ViewChild('birthChartFull', {static: true}) birthChartFull;
   @ViewChild('tranChartFull', {static: true}) tranChartFull;
	signs_v: any = (signs as any).default;
	o_signs_v: any = (o_signs as any).default;
	o_rashis_v: any = (o_rashis as any).default;
	sign_imgs_v: any = (sign_imgs as any).default;
	ruler_name_v: any =(ruler_name as any).default;
	nakshatras_v: any = (nakshatras as any).default;
    today: any = '';
	svgHoro: any;
	oPred :Prediction[] = [];
    objectKeys = Object.keys;
	moon_sign :string = '';
	tmoon_sign: string = '';
	moon_deg :string = '';
	tmoon_deg :string = '';
	asc_sign :string = '';
	tasc_sign: string = '';
	device_width :number = 0;
	device_height :number = 0;
    info: string = '';
	showNOTE: boolean = false;
	mdas1: string = '';adas1: string = '';pdas1: string = '';pend1: string = '';
	binf: any;
	bcf: boolean = false;
	tcf: boolean = false;
	svgbf: any;
	svgtf: any;
  constructor(private router: Router, private platform: Platform, private menu: MenuController, public shareService: ShareService, private horoService: HoroscopeService, public renderer: Renderer2, private eleRef: ElementRef, public device: Device) { 
        this.info = 'Please wait...';
  }

  ngOnInit() {
 	this.binf = this.router.getCurrentNavigation().extras.state;
  }
  ngAfterViewInit() {
   this.platform.ready().then(() => {
	  if(this.shareService.getCLAT() == -1) {
		  this.info = "The App could not access current location. Transit Predictions will not work! please enable location from your App settings, if you want this feature to work. Please contact info@vedichoroo.com for futher help";
	  } else {
		  console.log('Width: ' + this.platform.width());
		  this.device_width = this.platform.width();
		  console.log('Height: ' + this.platform.height());
		  this.device_height = this.platform.height();
		  this.shareService.getPLAN()
			   .then(res => {
			if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
			  admob.banner.show({
				id: {
				  // replace with your ad unit IDs
				  android: 'cca-app-pub-8442845715303800/4974735402',
				  ios: 'ca-app-pub-8442845715303800/4974735402',
				},
			  }).then(() => {
				setTimeout(() => {
				  admob.banner.hide({
					// replace with your ad unit IDs
					android: 'ca-app-pub-8442845715303800/4974735402',
					ios: 'ca-app-pub-8442845715303800/4974735402',
				  })
				}, 10000)
			  })		
			}		  
		}, (err) => {
		});	 
		 this.today = Date.now();
		 var cd = new Date();
		 let dob: string = cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds() + 'Z';
		 this.info = 'Getting transit data, please wait..';
			var n = cd.getTimezoneOffset();
			n = n/60;
			let ofset: number = Number(n.toFixed(1));
			let ayanid: number = 4;
			var r = this.shareService.getAYNM();
			if(r) ayanid = Number(r);
		 this.horoService.getBirthchartEx2(this.shareService.getCLAT(), this.shareService.getCLNG(), dob, this.shareService.getLocalTZ(), this.shareService.getLocalDST(), ayanid)
		 .subscribe(res => {
			this.info = 'Creating birth chart...';
			this.loadHoro(this.binf.ppos, this.birthChart.nativeElement, 'NATAL CHART');
			this.info = 'Creating transit chart...';
			this.loadHoro(res['planetPos'], this.tranChart.nativeElement, 'TRANSIT CHART');
			let listItems = Array.from(this.eleRef.nativeElement.querySelectorAll('*[id^="SZ"]'))
			listItems.forEach((listItem, j) => {
				this.renderer.listen(
					listItem, 
					'click',
					(evt) => {
						console.log('clicked', evt);
						console.log('clicked ', evt.path[0]);
						console.log('clicked id', evt.path[2].id);
						switch(evt.path[2].id)
						{
							case 'SZNCS':
								if(!this.bcf) {
									this.bcf = true;
									this.renderer.appendChild(this.birthChartFull.nativeElement, this.svgbf);
								}
								break;
							case 'SZTCS':
								if(!this.tcf) {
									this.tcf = true;
									this.renderer.appendChild(this.tranChartFull.nativeElement, this.svgtf);
								}
								break;
							case 'SZNCF':
								break;
							case 'SZTCF':
								break;
							default:
								break;
						}
					}
				);
			})
			this.info = 'Calculating your current dasha...';
			//this.calcCurrDas();
			console.log('Getting BirthStar', this.moon_sign);
			//var bstar = this.calcBirthStar(this.moon_sign, this.moon_deg);
			let mdeg: number = 0;
			console.log('moondeg', this.moon_deg);
			if(this.moon_deg.indexOf('.') > -1) 
				mdeg = this.shareService.dmsToDec(Number(this.moon_deg.split('.')[0]), Number(this.moon_deg.split('.')[1]), Number(this.moon_deg.split('.')[2]));
			else
				mdeg = Number(this.moon_deg);
			let bstar: string = this.calcStar(mdeg, this.moon_sign);
			console.log('BirthStar', bstar);
			this.shareService.setBirthStar(bstar.split('|')[0]);
		this.shareService.getVIMS(this.binf.dob).then( vims => {
			if(vims) this.vimsObj(vims);
			else {
				var ras_num = Number(this.o_rashis_v[this.moon_sign].split('\|')[0]);
				var ras_num2 = Number(this.o_rashis_v[bstar.split('|')[3]].split('\|')[0]);
				this.info = 'Calculating your dasha..';
				this.horoService.calcVim(this.binf.dob, bstar.split('|')[2], mdeg, Number(bstar.split('|')[1]), ras_num, ras_num2
				,this.shareService.getLANG() )
						.subscribe(res => {
							this.vimsObj(res);
				});
			}
		})
		.catch( e => {
			var ras_num = Number(this.o_rashis_v[this.moon_sign].split('\|')[0]);
			var ras_num2 = Number(this.o_rashis_v[bstar.split('|')[3]].split('\|')[0]);
			this.info = 'Calculating your dasha..';
			this.horoService.calcVim(this.binf.dob, bstar.split('|')[2], mdeg, Number(bstar.split('|')[1]), ras_num, ras_num2
			,this.shareService.getLANG() )
					.subscribe(res => {
						this.vimsObj(res);
		    });
	   });
	 });
	  }
	});
  }
  vimsObj(res2) {
			let ayanid: number = 4;
			var r = this.shareService.getAYNM();
			if(r) ayanid = Number(r);
						for(let key of Object.keys(res2)) {
							if(res2[key].style == 'mdasc') this.mdas1 = key;
							else if(res2[key].style == 'adasc') this.adas1 = this.ruler_name_v[key.split('-')[1].toLowerCase()];
							else if(res2[key].style == 'pdasc') { 
								this.pdas1 = this.ruler_name_v[key.split('-')[2].toLowerCase()];
							}
						}
						this.info = 'Getting predictions based on current planet transit...';
				this.shareService.getPLAN().then((pln) => {
						var dt = new Date();
						var n = dt.getTimezoneOffset();
						n = n/60;
						let ofset: number = Number(n.toFixed(1));
						let ayanid: number = 4;
						var res = this.shareService.getAYNM();
						if(res) ayanid = Number(res);
					   this.horoService.getTransPredsEx(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, ofset, ayanid)
					   .subscribe(res3 => {
							this.publishReport(res3);
							this.info = '';
							this.showNOTE = true;
						}, (err) => {
						  this.info = JSON.stringify(err);
						});
				}, (err) => {
				  this.info = JSON.stringify(err);
				});
  }
  publishReport(res)
  {
	for(let key of Object.keys(res)) {
		let exd: string = '';
		let sty: string = '';
		if(key.toLowerCase() == this.mdas1.toLowerCase()) { 
			 sty = 'mdas'; 
			 exd = '<br><span class="blueText boldText">'+ key + '</span><span class="boldText"> is your current Maha Dasha Lord, there are more chances of experiencing this outcome</span>'; 
		} else if(key.toLowerCase() == this.adas1.toLowerCase()) { 
		  sty = 'adas'; 
		  exd = '<br><span class="redText boldText">' + key + '</span><span class="boldText"> is your current Antar Dasha Lord, there are more chances of experiencing this outcome</span>';
		} else if(key.toLowerCase() == this.pdas1.toLowerCase()) { 
		  sty = 'pdas'; 
		  exd = '<br><span class="voiletText boldText">' + key + '</span><span class="boldText"> is your current Pratyantar Dasha Lord, there are more chances of experiencing this outcome</span>';
		}
		let pred : Prediction = {
		  lord: key,
		  star: '',
		  inds: res[key] + exd,
		  style: sty
		};
		this.oPred[key] = pred;
	}
 }
  loadHoro(plPos, ele, title)
  {
    console.log('loadHoro');
	console.log(plPos);
 		for (var i = 0; i < 16; i++) {
			var sign = this.signs_v[i];
			if (plPos.hasOwnProperty(sign)) {
			    
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
					}
					else if(title == 'NATAL CHART') {
						if (pls[k].split(' ')[1] == 'AC') { 
							this.asc_sign = sign;
							//this.asc_deg = Number(pls[k].split(' ')[0]);
							console.log('ASCENDENT is ' + this.asc_sign);
						} else if (pls[k].split(' ')[1] == 'Mo') {
							this.moon_sign = sign;
							this.moon_deg = pls[k].split(' ')[0];
						}
					}
					else if(title == 'TRANSIT CHART') {
						if (pls[k].split(' ')[1] == 'AC') { 
							this.tasc_sign = sign;
							//this.asc_deg = Number(pls[k].split(' ')[0]);
							console.log('ASCENDENT is ' + this.tasc_sign);
						} else if (pls[k].split(' ')[1] == 'Mo') {
							this.tmoon_sign = sign;
							this.tmoon_deg = pls[k].split(' ')[0];
						}
					}
				}
			}
		}
		if(this.shareService.getCHTYP() == 'sind'){
			if(title == 'NATAL CHART') {
				this.svgHoro = this.drawSIChart(this.device_width/2, plPos, title, false, 'SZNCS');
				this.svgbf = this.drawSIChart(this.device_width, plPos, title, true, 'SZNCF');
			} else {
				this.svgHoro = this.drawSIChart(this.device_width/2, plPos, title, false, 'SZTCS');
				this.svgtf = this.drawSIChart(this.device_width, plPos, title, true, 'SZTCF');
			}
		}
		else if(this.shareService.getCHTYP() == 'nind') {
			if(title == 'NATAL CHART') {
				this.svgHoro = this.drawNIchart(plPos, title, this.device_width/2, false, 'SZNCS');
				this.svgbf = this.drawNIchart(plPos, title, this.device_width, true, 'SZNCF');
			} else {
				this.svgHoro = this.drawNIchart(plPos, title, this.device_width/2, false, 'SZTCS');
				this.svgtf = this.drawNIchart(plPos, title, this.device_width, true, 'SZTCF');
			}
		} else {
			if(title == 'NATAL CHART') {
				this.svgHoro = this.drawSIChart(this.device_width/2, plPos, title, false, 'SZNCS');
				this.svgbf = this.drawSIChart(this.device_width, plPos, title, true, 'SZNCF');
			} else {
				this.svgHoro = this.drawSIChart(this.device_width/2, plPos, title, false, 'SZTCS');
				this.svgtf = this.drawSIChart(this.device_width, plPos, title, true, 'SZTCF');
			}
		}
		this.renderer.appendChild(ele, this.svgHoro);//this.device_width/8, this.device_width/2, plPos, title)
     }
	drawSIChart(size, plps, title, bfc, id) {
		var bxz = size/4;
		var isz = Math.floor(bxz/3);
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", (size).toString());
		this.renderer.setAttribute(svg, "height", (size).toString());
		this.renderer.setProperty(svg, "id", id);
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
		this.renderer.appendChild(text, document.createTextNode(title));
		this.renderer.setAttribute(text, "fill", "#d35400");
		this.renderer.setAttribute(text, "font-size", (bfc == true) ? '1.35rem' : '0.9rem');
		this.renderer.setAttribute(text, "font-weight", "bold");
		this.renderer.setAttribute(text, "alignment-baseline", "middle");
		this.renderer.setAttribute(text, "text-anchor", "middle");
		this.renderer.setAttribute(text, "x", (tpx).toString());
		this.renderer.setAttribute(text, "y", (tpy).toString());
		this.renderer.setAttribute(text, "id", "tc1");
		g.appendChild(text);
		let plc: number = 1;
		let plh: number = 12; //font pixel height
		let signs = ["pi", "aq", "cp", "sa", "ar","sc", "ta", "li", "ge", "cn", "le", "vi"];
		for(var i = 0; i < 12; i++) {
			    let sign = signs[i];
				let hcord = this.getRXY(sign, size);
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
						this.renderer.setAttribute(text, "font-size", "0.75rem");
						this.renderer.setAttribute(text, "font-weight", "bold");
						this.renderer.setAttribute(text, "fill", ((pls[k].split(' ')[1] == "AC") ? "#FF5733" : (pls[k].split(' ')[1] == "Mo") ? "#011898":"#0a0a0a"));
						this.renderer.setAttribute(text, "x", (hcord[0]-isz).toString());
						var s8 = hcord[1] + (plh*pcnt);
						this.renderer.setAttribute(text, "y",  s8.toString());
						this.renderer.setAttribute(text, "id", "pl" + (plc++).toString());
						g.appendChild(text);
					}
				}
		}
		svg.appendChild(g);
		return svg;
	};

	days_of_a_year(year) {
		return this.isLeapYear(year) ? 366 : 365;
	}
	isLeapYear(year) {
     return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
	}
	days_in_month(month, year) {
		return new Date(year, month, 0).getDate();
	}		
        calcStar(plpos: number, sign: string)
        {
			for(var i = 0; i < Object.keys(this.nakshatras_v).length; i++)
			{
				var nak = this.nakshatras_v[i];
                if (nak.location.start.split(',')[1] == sign && nak.location.end.split(',')[1] == sign)
                {
                    if (plpos >= this.shareService.dmsToDec(Number(nak.location.start.split(',')[0].split('.')[0]),Number(nak.location.start.split(',')[0].split('.')[1]),0) && plpos < this.shareService.dmsToDec(Number(nak.location.end.split(',')[0].split('.')[0]),Number(nak.location.end.split(',')[0].split('.')[1]),0))
                    {
						return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
                    }
				}
                else if (nak.location.start.split(',')[1] == sign.toString())
                {
                     if (plpos >= this.shareService.dmsToDec(Number(nak.location.start.split(',')[0].split('.')[0]), Number(nak.location.start.split(',')[0].split('.')[1]),0))
                     {
						return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];                     
					 }
                }
                else if (nak.location.end.split(',')[1] == sign.toString())
                {
                     if (plpos < this.shareService.dmsToDec(Number(nak.location.end.split(',')[0].split('.')[0]), Number(nak.location.end.split(',')[0].split('.')[1]),0))
                     {
						 return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];	                     
					 }
                }
			}
        }

	more()
	{
		this.router.navigate(['/astrologers']);
	}
	drawNIchart(plps, title, sz, bfc, id) {
	   var roms = ['I', 'II', 'III', 'IV', 'V', 'V1', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
       var ras = ['ar', 'ta', 'ge', 'cn', 'le', 'vi', 'li', 'sc', 'sa', 'cp', 'aq', 'pi'];
	   let ah: number = 0;
	   var s6 = (bfc == true) ? '0.8rem' : '0.6rem';
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
        var size = sz;
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", (size).toString());
		this.renderer.setAttribute(svg, "height", (size).toString());
		this.renderer.setProperty(svg, "id", id);
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
		var hcord = this.getHXY(1, sz);
		var htxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(htxt, document.createTextNode(ras[ah-1]));
		this.renderer.setAttribute(htxt, "font-size", s6.toString());
		this.renderer.setAttribute(htxt, "font-weight", "bold");
		this.renderer.setAttribute(htxt, "alignment-baseline", "middle");
		this.renderer.setAttribute(htxt, "text-anchor", "middle");
		this.renderer.setAttribute(htxt, "x", (Math.floor(hcord[0])).toString());
		this.renderer.setAttribute(htxt, "y", (Math.floor(hcord[1])).toString());
		this.renderer.setAttribute(htxt, "id", "RH" + ah.toString());
		this.renderer.appendChild(g, htxt);
		var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", (Math.floor(hcord[0]-isz)).toString());
		this.renderer.setAttribute(image, "y", (Math.floor(hcord[1])-isz).toString());
		this.renderer.setAttribute(image, "height", (isz).toString());
		this.renderer.setAttribute(image, "width", (isz).toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.sign_imgs_v[ras[ah-1]]);
		this.renderer.appendChild(g, image);
		let np: number = 0;
  		 if (plps.hasOwnProperty(ras[ah-1])) {
			var pls = plps[ras[ah-1]].split('\|');
			for (var k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
				console.log('getXY', pls[k]);
				var cord = this.getXY(1, sz, Number(pls[k].split(' ')[0]));
				console.log('getXY-cord', cord);
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				let sn: string = (bfc == false) ? pls[k].split(' ')[1] + ' ' + pls[k].split(' ')[0].split('.')[0]+'.'+ pls[k].split(' ')[0].split('.')[1] : pls[k];
				this.renderer.appendChild(text, document.createTextNode(sn));
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
		    hcord = this.getHXY(hou, sz);
		    htxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
			this.renderer.appendChild(htxt, document.createTextNode(roms[hou-1]));
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
				var cord = this.getXY(hou, sz, Number(pls[k].split(' ')[0]));
				console.log('getXY', cord);
				let sn: string = (bfc == false) ? pls[k].split(' ')[1] + ' ' + pls[k].split(' ')[0].split('.')[0]+'.'+ pls[k].split(' ')[0].split('.')[1] : pls[k];
				this.renderer.appendChild(text, document.createTextNode(sn));
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
			var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
			this.renderer.appendChild(text, document.createTextNode(title.toUpperCase()));
			this.renderer.setAttribute(text, "fill", "#0f0f0f");
			this.renderer.setAttribute(text, "font-size", (bfc == true) ? "1.35rem": "1rem");
			this.renderer.setAttribute(text, "font-weight", 'bold');
			this.renderer.setAttribute(text, "x", (bxz*2).toString());
			this.renderer.setAttribute(text, "y", (bxz*2).toString());
			this.renderer.setAttribute(text, "alignment-baseline", "middle");
			this.renderer.setAttribute(text, "text-anchor", "middle");
			this.renderer.setAttribute(text, "id", "title");
			g.appendChild(text);
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
	//let part: number = Math.floor((x2-x1)/30);
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
	//let part: number = Math.floor((x2-x1)/30);
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
 hide(c) {
	 if(c == 'bf') {
								for (let child of this.birthChartFull.nativeElement.children) {
									this.renderer.removeChild(this.birthChartFull.nativeElement, child);
								}
		this.bcf = false;
	 } else {
								for (let child of this.tranChartFull.nativeElement.children) {
									this.renderer.removeChild(this.tranChartFull.nativeElement, child);
								}
		this.tcf = false;
	 }
 }
	rightmenu() {
		this.menu.open('second');
	}

}
