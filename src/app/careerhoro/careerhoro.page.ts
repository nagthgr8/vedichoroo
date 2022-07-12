import { Component, Renderer2, AfterViewInit, ViewChild, ElementRef, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Platform, MenuController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { BirthInfo } from '../birth-info';
import { Yoga } from '../yoga';
import * as signs from '../signs.json';
import * as o_signs from '../o_signs.json'
import * as o_rashis from '../o_rashis.json';
import * as sign_imgs from '../sign_imgs.json';
import * as nakshatras from '../nakshatras.json';
import * as ruler_name from '../ruler_name.json';
declare var admob;
@Component({
  selector: 'app-careerhoro',
  templateUrl: './careerhoro.page.html',
  styleUrls: ['./careerhoro.page.scss'],
})
export class CareerhoroPage implements OnInit, AfterViewInit {
  @ViewChild('birthChart', {static: true}) birthChart;
  @ViewChild('navChart', {static: true}) navChart;
  signs_v: any = (signs as any).default;
  o_signs_v: any = (o_signs as any).default;
  o_rashis_v: any = (o_rashis as any).default;
  sign_imgs_v: any = (sign_imgs as any).default;
  ruler_name_v: any =(ruler_name as any).default;
  nakshatras_v: any = (nakshatras as any).default;
  dob: string = '';
  svgHoro: any;
  lagna: string = '';
  lagna_lord: string = '';
  moon_sign: string = '';
  moon_deg :string = '';
  sun_sign: string = '';
  tithi: string = '';
  birth_star: string = '';
  star_lord: string = '';
  moon_phase: string = '';
  device_width :number = 0;
  device_height :number = 0;
  objectKeys = Object.keys;
  oYog: Yoga[] = [];
  oDas: Yoga[] = [];
  aYog: Yoga[] = [];
  nYog: Yoga[] = [];
  oBif :BirthInfo;
  navPls: string[] = [];
  binf: any;
  mdas1: string = '';adas1: string = '';pdas1: string = '';pend1: string = '';
  info: string;
  msg: string = '';
  showSU: boolean = false;
  showCD: boolean = false;
  constructor(private router: Router, private platform: Platform, private menu: MenuController, public shareService: ShareService, private horoService: HoroscopeService, public renderer: Renderer2, public device: Device, private translate: TranslateService) { 
  }
  ngAfterViewInit() {
    this.info = 'Loading..';
   this.platform.ready().then(() => {
  	  this.shareService.getPLAN()
		   .then(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
		  admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/2157000371',
			  ios: 'ca-app-pub-8442845715303800/2157000371',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/2157000371',
				ios: 'ca-app-pub-8442845715303800/2157000371',
			  })
			}, 10000)
		  })	
		}		  
		}, (err) => {
	});	 
	this.loadHoro(this.binf.ppos, this.birthChart.nativeElement, 'RASHI CHART');
	//this.calcCurrDas();
		let mdeg: number = 0;
		console.log('moondeg', this.moon_deg);
		if(this.moon_deg.indexOf('.') > -1) 
			mdeg = this.shareService.dmsToDec(Number(this.moon_deg.split('.')[0]), Number(this.moon_deg.split('.')[1]), Number(this.moon_deg.split('.')[2]));
		else
			mdeg = Number(this.moon_deg);
		let bstar: string = this.calcStar(mdeg, this.moon_sign);
	console.log(bstar);
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
 vimsObj(res) {
		let ayanid: number = 4;
		var ayn = this.shareService.getAYNM();
		if(ayn) ayanid = Number(ayn);
 						for(let key of Object.keys(res)) {
							//var das = JSON.parse(res[key]);
							if(res[key].style == 'mdasc') this.mdas1 = key;
							else if(res[key].style == 'adasc') this.adas1 = this.ruler_name_v[key.split('-')[1].toLowerCase()];
							else if(res[key].style == 'pdasc') { 
								this.pdas1 = this.ruler_name_v[key.split('-')[2].toLowerCase()];
								//this.pend1 = das.per.split('-')[1].replace('/','-');
							}
							//oDas.push(das);
						}
						this.info = "Analyzing career in current dasha..";
					this.horoService.getCareerDas(this.mdas1.charAt(0).toUpperCase() + this.mdas1[1], this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, this.binf.dstofset, this.shareService.getLANG(), ayanid)
								.subscribe(res2 => {
									this.info = '';
									this.showCD = true;
									let yogas = res2;
								for(let key of Object.keys(yogas)) {
									let yg : Yoga = {
									  name : key,
									  desc: yogas[key]
									};
									this.oDas[key] = yg;
								}
							}, (err) => {
								this.info = JSON.stringify(err);
							});
						
			this.navPls = this.calcDivChart(10);
			this.loadHoro(this.navPls, this.navChart.nativeElement, 'DASAMSA');
   }
  ngOnInit() {
	this.binf = this.router.getCurrentNavigation().extras.state;
  this.platform.ready().then(() => {
        this.info = 'Please wait...';
		this.device_width = this.platform.width();
		this.device_height = this.platform.height();
		//this.yogas = this.shareService.getYOGAS();
		//console.log(Object.keys(this.yogas));
		this.translate.use(this.shareService.getLANG());
		//let yogs = this.shareService.getYOGAS();
		let jf: string = '';
		this.info = 'Getting birth star info...';
		this.horoService.getBirthInfo(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone)
		   .subscribe(res => {
		   this.info = '';
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
			//this.info = err;
		  }) ;
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.info = 'Preparing Career report, please wait...';
			this.horoService.getCareer(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, this.shareService.getLANG(), ayanid)
				.subscribe(res => {
				this.info = '';
	  			    let yogas = res;
				for(let key of Object.keys(yogas)) {
				    let yg : Yoga = {
					  name : key,
					  desc: yogas[key]
					};
					this.oYog[key] = yg;
				}
			}, (err) => {
				this.info = JSON.stringify(err);
			});
    });
  }	
  ionViewDidLoad() {
    console.log('ionViewDidLoad CareerhoroPage');
	this.shareService.getPLAN().then((pln) => {
		this.showSU = (pln.name == 'com.mypubz.eportal.astrologer') ? true : false;
		//if(!this.showSU) this.launchInterstitial();
	 }, (err) => {
	});
  }
 
  calcDivChart(ndivs)
  {
	let navPls: string[] = [];
    console.log('calcDivChart' + ndivs.toString());
	let sec: number = 30/ndivs, secp: number = 0;
	console.log('no. of divs=' + sec.toString());
	var plPos = this.binf.ppos;
	var sgns = ["ar|M|Ma|1|O", "ta|F|Ve|2|E", "ge|D|Me|3|O", "cn|M|Mo|4|E", "le|F|Su|5|O", "vi|D|Me|6|E", "li|M|Ve|7|O", "sc|F|Ma|8|E", "sa|D|Ju|9|O", "cp|M|Sa|10|E", "aq|F|Sa|11|O", "pi|D|Ju|12|E" ];
	var divs = [];
	let n: number = 1;
	while((secp = sec*n) <= 30) {
		  divs.push(secp);
		  n++;
	}
	console.log('part complete..');
	console.log(divs);
	let spos: number = 0;
	for (var i = 0; i < 12; i++) {
		var sign = sgns[i];
		if (plPos.hasOwnProperty(sign.split('|')[0])) {
			var pls = plPos[sign.split('|')[0]].split('\|');
			for (var k = 0; k < pls.length; k++) {
			   let ppos: number = 0;
			   console.log('pl=' + pls[k]);
				var pl = pls[k].split(' ')[1];
					let po: number = Number(pls[k].split(' ')[0]);
					console.log(sign);
					console.log(pl);
					console.log(po);
					n = 0;
					for(var dp = 0;  dp < Object.keys(divs).length; dp++)
					{
						if (sign.split('|')[4] == "O")
								ppos = Number(sign.split('|')[3]) + dp;
						else
								ppos = Number(sign.split('|')[3]) + 8 + dp;
						if(po >= n && po <= divs[dp]) {break;}
						n = divs[dp];
					}
				let sord = 0;
				let rpos = ppos;
				while (rpos > 12) rpos -= 12;
				let navp = rpos;
				if (navp < 1) navp = 12 - navp;
				switch(navp)
				{
				  case 1:
				    if(!navPls.hasOwnProperty('ar'))
						navPls['ar'] = pl;
					else
						navPls['ar'] += '|' + pl;
				    break;
				  case 2:
				    if(!navPls.hasOwnProperty('ta'))
						navPls['ta'] = pl;
					else
						navPls['ta'] += '|' + pl;
				    break;
				  case 3:
				    if(!navPls.hasOwnProperty('ge'))
						navPls['ge'] = pl;
					else
						navPls['ge'] += '|' + pl;
					
				    break;
				  case 4:
				    if(!navPls.hasOwnProperty('cn'))
						navPls['cn']=pl;
					else
						navPls['cn'] += '|' + pl;
				    break;
				  case 5:
				    if(!navPls.hasOwnProperty('le'))
						navPls['le'] = pl;
					else
						navPls['le'] += '|' + pl;
				    break;
				  case 6:
				    if(!navPls.hasOwnProperty('vi'))
						navPls['vi']=pl;
					else
						navPls['vi'] += '|' + pl;
				    break;
				  case 7:
				    if(!navPls.hasOwnProperty('li'))
						navPls['li']=pl;
					else
						navPls['li'] += '|' + pl;
				    break;
				  case 8:
				    if(!navPls.hasOwnProperty('sc'))
						navPls['sc']=pl;
					else
						navPls['sc'] += '|' + pl;
				    break;
				  case 9:
				    if(!navPls.hasOwnProperty('sa'))
						navPls['sa']=pl;
					else
						navPls['sa'] += '|' + pl;
				    break;
				  case 10:
				    if(!navPls.hasOwnProperty('cp'))
						navPls['cp']=pl;
					else
						navPls['cp'] += '|' + pl;
				    break;
				  case 11:
				    if(!navPls.hasOwnProperty('aq'))
						navPls['aq'] = pl;
					else
						navPls['aq'] += '|' + pl;
				    break;
				  case 12:
				    if(!navPls.hasOwnProperty('pi'))
						navPls['pi']=pl;
					else
						navPls['pi'] += '|' + pl;
				    break;
				  default:
				    break;
				}
				console.log(navPls);
			}
		}
	}
	return navPls;
  }
  loadHoro(plPos, ele, title)
  {
    console.log('loadHoro');
	console.log(plPos);
	//var plPos = this.shareService.getPLPOS();
 		for (var i = 0; i < 16; i++) {
			var sign = this.signs_v[i];
			if (plPos.hasOwnProperty(sign)) {
			    
				var pls = plPos[sign].split('\|');
				console.log(pls);
				//var ePls = '';
				//var mnode = '';
				for (var k = 0; k < pls.length; k++) {
					//if (k > 0) ePls += '|';
					//if (pls[k].split(' ')[1] == 'me') {
					//    mnode = pls[k];
					//} else {
					//    ePls = ePls + pls[k];
					//}
					if (pls[k].split(' ')[1] == 'MEAN_NODE') {
						var rpos = this.o_rashis_v[sign].split('\|')[0];
						var kpos = parseInt(rpos, 10) + 6;
						if (kpos > 12) kpos = (kpos - 12);
						//var mn = i + 11;
						//if (mn > 15) mn -= 15;
						if (plPos.hasOwnProperty(this.o_signs_v[kpos - 1])) {
							var eP = plPos[this.o_signs_v[kpos - 1]];
							plPos[this.o_signs_v[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
						} else {
							plPos[this.o_signs_v[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
						}
						// plPos[sign] = ePls;
						plPos[sign] = plPos[sign].replace('MEAN_NODE', 'Ra');
					} else if (pls[k].split(' ')[1] == 'Mo') {
						this.moon_sign = sign;
						this.moon_deg = pls[k].split(' ')[0];
					} 
				}
			}
		}
		if(this.shareService.getCHTYP() == 'sind')
			this.svgHoro = this.drawSIChart(plPos, title);
		else if(this.shareService.getCHTYP() == 'nind')
			this.svgHoro = this.drawNIchart(plPos, title);
		else
			this.svgHoro = this.drawSIChart(plPos, title);

   this.renderer.appendChild(ele, this.svgHoro);

  // this.renderer.appendChild(ele, this.grid(4, this.device_width/8, this.device_width/2, plPos, title));
   
  }
	drawSIChart(plps, title) {
        var size = this.device_width/2;
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
		this.renderer.appendChild(text, document.createTextNode(title));
		this.renderer.setAttribute(text, "fill", "#d35400");
		this.renderer.setAttribute(text, "font-size", "1.35rem");
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
						//if (pls[k].split(' ')[1] == 'AC') this.asc_sign = sign;
						if (pls[k].split(' ')[1] == 'Mo') {
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
	more()
	{
	let item: any = {};
	item.title = 'Talk to Astrologer';
	this.router.navigate(['/astrologers'], {state: item});
	}	
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
  save()
  {
	console.log(this.msg);
	if(this.msg.trim().length == 0) {
		this.info = 'Please enter your suggestion';
		return;
	} else {
	    this.showSU = false;
		this.info = 'Please wait..';
		this.horoService.addTicket(this.device.uuid, 'house', '', this.msg)
		.subscribe(res => {
			if(res['guid'] != '') {
				this.info = '<strong>Thank you for your suggestion.</strong>';
			} else {
			   this.info = 'There was some internal failure, we regret inconvinience. Please try after some time.';
			}
		}, (err) => {
			this.info = JSON.stringify(err);
		});	  
	}
  }
	drawNIchart(plps, title) {
	   var roms = ['I', 'II', 'III', 'IV', 'V', 'V1', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
       var ras = ['ar', 'ta', 'ge', 'cn', 'le', 'vi', 'li', 'sc', 'sa', 'cp', 'aq', 'pi'];
	   let ah: number = 0;
	   var s6 = 10;
	    for(var r = 0; r < 12; r++) {
  		 if (plps.hasOwnProperty(ras[r])) {
			var pls = plps[ras[r]].split('\|');
			for (var k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
				if (pls[k].split(' ')[1] == 'AC') { 
				   //this.asc_sign = ras[r];
				   ah = r+1;
				   break;
				}
			}
	     }
		}
        var size = this.device_width/2;
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", (size).toString());
		this.renderer.setAttribute(svg, "height", (size).toString());
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
		var hcord = this.getHXY(1, this.device_width/2);
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
				var cord = this.getXY(1, this.device_width/2, Number(pls[k].split(' ')[0]));
				console.log('getXY-cord', cord);
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				this.renderer.appendChild(text, document.createTextNode(pls[k]));
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
		    hcord = this.getHXY(hou, this.device_width/2);
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
				var cord = this.getXY(hou, this.device_width/2, Number(pls[k].split(' ')[0]));
				console.log('getXY', cord);
				this.renderer.appendChild(text, document.createTextNode(pls[k]));
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
		this.renderer.setAttribute(text, "font-size", "7");
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
	rightmenu() {
		this.menu.open('second');
	}
}
