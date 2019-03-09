import { Component, Renderer2, AfterViewInit, ViewChild, ElementRef, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { AstrologersPage } from '../astrologers/astrologers';
import { AppRate } from '@ionic-native/app-rate';
import { HoroscopeService } from '../../app/horoscope.service';
import { ShareService } from '../../app/share.service'
import { BirthInfo } from '../../app/birth-info';
import { Yoga } from '../../app/yoga';
import * as signs from '../horoscope/signs.json';
import * as o_signs from '../horoscope/o_signs.json'
import * as rashis from '../horoscope/rashis.json';
import * as o_rashis from '../horoscope/o_rashis.json';
import * as dashas from '../horoscope/dashas.json';
import * as nakshatras from '../horoscope/nakshatras.json';
import * as nakshatra_order from '../horoscope/nakshatra_order.json';
import * as venus_das from '../horoscope/venus_das.json';
import * as sun_das from '../horoscope/sun_das.json';
import * as ketu_das from '../horoscope/ketu_das.json';
import * as moon_das from '../horoscope/moon_das.json';
import * as mars_das from '../horoscope/mars_das.json';
import * as rahu_das from '../horoscope/rahu_das.json';
import * as jupiter_das from '../horoscope/jupiter_das.json';
import * as saturn_das from '../horoscope/saturn_das.json';
import * as mercury_das from '../horoscope/mercury_das.json';

/**
 * Generated class for the RajayogaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

@Component({
  selector: 'page-careerhoro',
  templateUrl: 'careerhoro.html',
})
export class CareerhoroPage implements OnInit, AfterViewInit {
  @ViewChild('birthChart') birthChart;
  @ViewChild('navChart') navChart;
  dob: string = '';
  lagna: string = '';
  lagna_lord: string = '';
  moon_sign: string = '';
  moon_deg :number = 0;
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
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, private appRate: AppRate, public shareService: ShareService, private horoService: HoroscopeService, public renderer: Renderer2, public device: Device) {
    this.binf = navParams.get('binf');
	console.log('binf', this.binf);
  platform.ready().then(() => {
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
		//this.yogas = this.shareService.getYOGAS();
		//console.log(Object.keys(this.yogas));
		let yogs = this.shareService.getYOGAS();
		let jf: string = '';
		this.horoService.getBirthInfo(this.shareService.getLAT(), this.shareService.getLNG(), this.shareService.getDOB(), this.shareService.getTimezone())
		   .subscribe(res => {
		   this.dob = res['dob'];
		   this.lagna = this.translate_func(res['lagna']);
		   this.lagna_lord = this.translate_func(res['lagna_lord']);
		   this.moon_sign = this.translate_func(res['moon_sign']);
		   this.sun_sign = this.translate_func(res['sun_sign']);
		   this.tithi = this.translate_func(res['tithi']);
		   this.birth_star = this.translate_func(res['birth_star']);
		   this.star_lord = this.translate_func(res['star_lord']);
		   this.moon_phase = this.translate_func(res['moon_phase']);
		  }, (err) => {
			//this.info = err;
		  }) ;
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
			this.horoService.getCareer(this.shareService.getLAT(), this.shareService.getLNG(), this.shareService.getDOB(), this.shareService.getTimezone(), this.shareService.getLANG(), ayanid)
				.subscribe(res => {
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
  ngAfterViewInit() {
	this.loadHoro(this.shareService.getPLPOS(), this.birthChart.nativeElement, 'RASHI CHART');
	this.calcCurrDas();
	this.navPls = this.calcDivChart(10);
	this.loadHoro(this.navPls, this.navChart.nativeElement, 'DASAMSA');
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
	
	this.horoService.getCareerDas(this.mdas1.charAt(0).toUpperCase() + this.mdas1[1], this.shareService.getLAT(), this.shareService.getLNG(), this.shareService.getDOB(), this.shareService.getTimezone(), this.shareService.getLANG(), ayanid)
				.subscribe(res => {
	  			    let yogas = res;
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
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RajayogaPage');
	this.shareService.plan.subscribe((pln) => {
		this.showSU = (pln.name == 'com.mypubz.eportal.astrologer') ? true : false;
	 }, (err) => {
	});
  }
 
  calcDivChart(ndivs)
  {
	let navPls: string[] = [];
    console.log('calcDivChart' + ndivs.toString());
	let sec: number = 30/ndivs, secp: number = 0;
	console.log('no. of divs=' + sec.toString());
	var plPos = this.shareService.getPLPOS();
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
                    if(sign.split('|')[4] == "O")
                        spos = Number(sign.split('|')[3]);
                    else 
                        spos = Number(sign.split('|')[3])+9;
		if (plPos.hasOwnProperty(sign.split('|')[0])) {
			var pls = plPos[sign.split('|')[0]].split('\|');
			for (var k = 0; k < pls.length; k++) {
			   let ppos: number = spos;
			   console.log('pl=' + pls[k]);
				var pl = pls[k].split(' ')[1];
					let po: number = Number(pls[k].split(' ')[0]);
					console.log(sign);
					console.log(pl);
					console.log(po);
					n = 0;
					for(var dp = 0;  dp < Object.keys(divs).length; dp++,ppos++)
					{
						if(po >= n && po <= divs[dp]) {break;}
						n = divs[dp];
					}
					let rpos: number = ppos;
					while(rpos > 12 ) rpos -= 12;
					console.log('spos=' + spos.toString());
					let sord: number;
					let spnt: number = ndivs, x: number = 1;
					console.log('spnt=',ndivs+1);
				//}
				let navp :number = rpos;
				//navp = (navp > 12) ? navp - 12: navp;
				console.log(navp);
				switch(navp)
				{
				  case 1:
				    if(!navPls.hasOwnProperty('ar'))
						navPls['ar'] = pls[k];
					else
						navPls['ar'] += '|' + pls[k];
				    break;
				  case 2:
				    if(!navPls.hasOwnProperty('ta'))
						navPls['ta'] = pls[k];
					else
						navPls['ta'] += '|' + pls[k];
				    break;
				  case 3:
				    if(!navPls.hasOwnProperty('ge'))
						navPls['ge'] = pls[k];
					else
						navPls['ge'] += '|' + pls[k];
					
				    break;
				  case 4:
				    if(!navPls.hasOwnProperty('cn'))
						navPls['cn']=pls[k];
					else
						navPls['cn'] += '|' + pls[k];
				    break;
				  case 5:
				    if(!navPls.hasOwnProperty('le'))
						navPls['le'] = pls[k];
					else
						navPls['le'] += '|' + pls[k];
				    break;
				  case 6:
				    if(!navPls.hasOwnProperty('vi'))
						navPls['vi']=pls[k];
					else
						navPls['vi'] += '|' + pls[k];
				    break;
				  case 7:
				    if(!navPls.hasOwnProperty('li'))
						navPls['li']=pls[k];
					else
						navPls['li'] += '|' + pls[k];
				    break;
				  case 8:
				    if(!navPls.hasOwnProperty('sc'))
						navPls['sc']=pls[k];
					else
						navPls['sc'] += '|' + pls[k];
				    break;
				  case 9:
				    if(!navPls.hasOwnProperty('sa'))
						navPls['sa']=pls[k];
					else
						navPls['sa'] += '|' + pls[k];
				    break;
				  case 10:
				    if(!navPls.hasOwnProperty('cp'))
						navPls['cp']=pls[k];
					else
						navPls['cp'] += '|' + pls[k];
				    break;
				  case 11:
				    if(!navPls.hasOwnProperty('aq'))
						navPls['aq'] = pls[k];
					else
						navPls['aq'] += '|' + pls[k];
				    break;
				  case 12:
				    if(!navPls.hasOwnProperty('pi'))
						navPls['pi']=pls[k];
					else
						navPls['pi'] += '|' + pls[k];
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
			var sign = signs[i];
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
						var rpos = o_rashis[sign].split('\|')[0];
						var kpos = parseInt(rpos, 10) + 6;
						if (kpos > 12) kpos = (kpos - 12);
						//var mn = i + 11;
						//if (mn > 15) mn -= 15;
						if (plPos.hasOwnProperty(o_signs[kpos - 1])) {
							var eP = plPos[o_signs[kpos - 1]];
							plPos[o_signs[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
						} else {
							plPos[o_signs[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
						}
						// plPos[sign] = ePls;
						plPos[sign] = plPos[sign].replace('MEAN_NODE', 'Ra');
					} else if (pls[k].split(' ')[1] == 'Mo') {
						this.moon_sign = sign;
						this.moon_deg = Number(pls[k].split(' ')[0]);
					} 
				}
			}
		}
   this.renderer.appendChild(ele, this.grid(4, this.device_width/8, this.device_width/2, plPos, title));
   
  }
  calcCurrDas()
  {
		var bstar = this.calcBirthStar(this.moon_sign, this.moon_deg);
		console.log(bstar);
		this.shareService.setBirthStar(bstar.split('|')[0]);
  		//balance dasha calculation
        var dob_c = new Date(this.binf.dob);
		var m_dy = this.days_in_month(dob_c.getMonth()+1, dob_c.getFullYear());//30.436875;//29.530588;
		var d_yr = this.days_of_a_year(dob_c.getFullYear());//354.367056;//365.2425;
		var rem_days = 0;
		var ras_num = Number(o_rashis[this.moon_sign].split('\|')[0]);
		var mon_crs = (ras_num - 1)*30;
		let moon_ela :number = (this.moon_deg.toString().indexOf('.') > -1) ? mon_crs + Number(this.moon_deg.toString().split('.')[0]) : mon_crs + this.moon_deg;
		if(this.moon_deg.toString().indexOf('.') > -1) {
			moon_ela = Number(moon_ela.toString() + '.' + this.moon_deg.toString().split('.')[1]);
		}
		if(moon_ela.toString().indexOf('.') > -1) {
			if(moon_ela.toString().split('.')[1].length > 2)
			    moon_ela = Number(moon_ela.toFixed(2));
		}
		if(moon_ela.toString().indexOf('.') > -1) {
		   var rem1 = Number(moon_ela.toString().split('.')[0])*60 + Number(moon_ela.toString().split('.')[1]);
		   rem1 = rem1/800;
		   
		   //rem1 = Number(das)*rem1;
		   if(rem1.toString().indexOf('.') > -1) {
				//if(rem1.toString().split('.')[1].length > 2)
				    //rem1 = rem1.toFixed(2);
					rem1 = Number('0.' + rem1.toString().split('.')[1])*800;
		   }
		   var das = dashas[bstar.split('|')[2].substring(0,2).toLowerCase()];
		   var m_bal = 800 - rem1;
		   var tot_das = Number(das)*d_yr;
		   var bal_das = (tot_das*m_bal)/800;
		   var bal_y = bal_das/d_yr;
		   var rem_s = bal_y.toString();
		   if(rem_s.indexOf('.') > -1) {
		     var rem_y = Number(rem_s.split('.')[0]);
			 if(Number(rem_s.split('.')[1]) > 0) {
			   var rem_m = parseFloat('0.' + rem_s.split('.')[1])*d_yr;
			   rem_m = rem_m/m_dy;
			   if(rem_m.toString().indexOf('.') > -1) {
			    //if(rem_m.toString().split('.')[1].length > 1)
				   // rem_m = Number(rem_m.toFixed(1));
			     var rem_d = Number('0.' + rem_m.toString().split('.')[1])*m_dy;
				 rem_m = Number(rem_m.toString().split('.')[0]);
				 rem_days = rem_y*d_yr + rem_m*m_dy + rem_d;
			   }
			 }
		   } else {
		     rem_days = Number(rem_s)*d_yr;
		   }
		} else {
		  var rem1 = moon_ela*60;
		  rem1 = rem1/800;
		   var rem_s = rem1.toString();
	       rem_days = rem1*d_yr;
		}
		
		console.log(rem_days);
	    //build vimsottara dasha table
		console.log(dob_c.toString());
        dob_c.setDate(dob_c.getDate() + rem_days);
		console.log(dob_c.toString());
		console.log('Antar' + bstar.split('|')[2] + this.binf.dob + rem_days.toString());
		this.buildAntarDasha(bstar.split('|')[2], 1, new Date(this.binf.dob), rem_days);
		var arr = ["sun","moon","mars","rahu", "jupiter", "saturn", "mercury", "ketu", "venus"];
		var v_start = 0;
		var v_iter = 0;
	   for (var vi=0, len=arr.length; vi<len; vi++) {
	     if(v_start) { 
	        v_iter++;
			var startdt = new Date(dob_c.getTime());
			var m = (dob_c.getMonth()+1).toString();
			var dd = dob_c.getDate().toString();
			var y = dob_c.getFullYear().toString();
			d_yr = this.days_of_a_year(startdt.getFullYear());
			dob_c.setDate(dob_c.getDate() + Number(dashas[arr[vi].substring(0,2).toLowerCase()])*d_yr);
		console.log('Antar' + arr[vi]);
		console.log(startdt.toString());
		    this.buildAntarDasha(arr[vi], v_iter+1, startdt, 0);
		 }	
		 if(arr[vi] == bstar.split('|')[2]) {
			 v_start = 1;
		 }
		if(vi == 8) vi = -1;
		if(v_iter == 8) break;
	   }

  }
  grid(numberPerSide, size, pixelsPerSide, plps, title) {
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", pixelsPerSide);
		this.renderer.setAttribute(svg, "height", pixelsPerSide);
		this.renderer.setAttribute(svg, "viewBox", [0, 0, numberPerSide * size, numberPerSide * size].join(" "));
        var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-0");
		this.renderer.setAttribute(pattern,"patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size);
		this.renderer.setAttribute(pattern, "width", size);
        var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		var s1 = size/2;
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/Pisces.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);

        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-1");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/Aquarius.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-2");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/Capricorn.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-3");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/Saggitarius.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-4");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/Aries.png");

		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);

		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-7");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/Scorpio.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-8");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/Taurus.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-11");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/Libra.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-12");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/Gemini.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-13");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/Cancer.png");

		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-14");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/leo.png");

		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-15");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", "0");
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "http://live.makemypublication.com/Images/Virgo.png");

		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		this.renderer.appendChild(svg, defs);
		var border = 1;
		var s2 = size * 2;
		var s3 = size;
		var s4 = 12;
		var s5 = size * 2 / 2;
		for (var i = 0; i < numberPerSide; i++) {
			for (var j = 0; j < numberPerSide; j++) {
				if ((i * numberPerSide + j) == 5 || (i * numberPerSide + j) == 6 || (i * numberPerSide + j) == 9 || (i * numberPerSide + j) == 10) {
					if ((i * numberPerSide + j) == 5) {
						var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
						this.renderer.setAttribute(g, "transform", ["translate(", i * size, ",", j * size, ")"].join(""));
						var number = numberPerSide * i + j;
						var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
						this.renderer.setAttribute(box, "width", s2.toString());
						this.renderer.setAttribute(box, "height", s2.toString());
						this.renderer.setAttribute(box, "border", border.toString());
						this.renderer.setAttribute(box, "stroke", "black");
						this.renderer.setAttribute(box, "fill", "#f4a460");
						this.renderer.setAttribute(box, "id", "b" + number);
						this.renderer.appendChild(g, box);
						var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						this.renderer.appendChild(text, document.createTextNode(title));
						this.renderer.setAttribute(text, "fill", "white");
						this.renderer.setAttribute(text, "font-size", s4.toString());
						this.renderer.setAttribute(text, "font-weight", 'bold');
						this.renderer.setAttribute(text, "x", s3.toString());
						this.renderer.setAttribute(text, "y", s5.toString());
						this.renderer.setAttribute(text, "alignment-baseline", "middle");
						this.renderer.setAttribute(text, "text-anchor", "middle");
						this.renderer.setAttribute(text, "id", "t" + number);
						g.appendChild(text);
						svg.appendChild(g);
					}
					continue;
				}
				// var zodiac1 = zodiacs[(i + j) % zodiacs.length];
				// var zodiac2 = zodiacs[(i + j + 1) % zodiacs.length];
				g = document.createElementNS("http://www.w3.org/2000/svg", "g");
				this.renderer.setAttribute(g, "transform", ["translate(", i * size, ",", j * size, ")"].join(""));
				number = numberPerSide * i + j;
				box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
				var sign = "url(#sign-" + number.toString() + ")";
				this.renderer.setAttribute(box, "width", size.toString());
				this.renderer.setAttribute(box, "height", size.toString());
				this.renderer.setAttribute(box, "border", border.toString());
				this.renderer.setAttribute(box, "stroke", "black");
				this.renderer.setAttribute(box, "fill", sign);
				this.renderer.setAttribute(box, "id", "b" + number.toString());
				this.renderer.appendChild(g, box);
				sign = signs[number];
				if (plps.hasOwnProperty(sign)) {
					//var pls = replaceAll(plps[sign], '\|', '');
					//var pls = plps[sign].replace(/\|/g, ' ');
					var pls = plps[sign].split('\|');
					var pcnt = 0;
					var s6 = 10;
					var s7 = 5;
					
					for (var k = 0; k < pls.length; k++) {
						if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
						//if (pls[k].split(' ')[1] == 'AC') this.asc_sign = sign;
						else if (pls[k].split(' ')[1] == 'Mo') {
//							this.moon_sign = sign;
//							this.moon_deg = Number(pls[k].split(' ')[0]);
						}
						pcnt++;
						text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						this.renderer.appendChild(text, document.createTextNode(pls[k]));
						//text.setAttribute("fill", zodiac2);
						this.renderer.setAttribute(text, "font-size", s6.toString());
						this.renderer.setAttribute(text, "font-weight", "bold");
						if(pls[k].split(' ')[1] == 'AC') this.renderer.addClass(text, "redText");
						else if(pls[k].split(' ')[1] == 'Mo') this.renderer.addClass(text, "blueText");
						this.renderer.setAttribute(text, "x", s7.toString());
						var s8 = 10 * pcnt;
						this.renderer.setAttribute(text, "y",  s8.toString());
						this.renderer.setAttribute(text, "id", "t" + number.toString());
						g.appendChild(text);
					}
				}
				svg.appendChild(g);
			}
		}
		g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		this.renderer.setAttribute(g, "transform", ["translate(", i * size, ",", j * size, ")"].join(""));
		number = numberPerSide * i + j;

		return svg;
	};
	translate_func(lord: string)
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
	more()
	{
	let item: any = {};
	item.title = 'Talk to Astrologer';
	this.navCtrl.push(AstrologersPage, {
      item: item
	  });
	}	
	buildPratyantarDasha(mainlord :string, sublord :string, order :number, suborder :number, startdt :Date)
	{
	 console.log(mainlord+sublord, startdt);
	  var m_dy = this.days_in_month(startdt.getMonth()+1, startdt.getFullYear());//29.530588;//30.436875;
	  var d_yr = this.days_of_a_year(startdt.getFullYear());//354.367056;//365.2425;
	  var e_dys = 0;
		var arr = ["su","mo","ma","ra", "ju", "sa", "me", "ke", "ve"];
		var v_start = 0;
		var v_iter = 0;
		var a_per = 0;
		var s_dt = new Date(startdt.getTime());
		var cd = new Date()
	   for (var vi=0, len=arr.length; vi<len; vi++) {
	     if(arr[vi] == sublord || v_start == 1) { 
	        v_iter++;
			var s_d = new Date(s_dt.getTime()); 
			var m = (s_dt.getMonth()+1).toString();
			var dd = s_dt.getDate().toString();
			var y = s_dt.getFullYear().toString();
			var p_yrs = Number(dashas[mainlord])*Number(dashas[sublord])*Number(dashas[arr[vi]])/(120*120);
			d_yr = this.days_of_a_year(s_d.getFullYear());
			s_dt.setDate(s_dt.getDate() + p_yrs*d_yr);
			//console.log(s_d.toString());
			//console.log(s_dt.toString());
			if(cd.getTime() >= s_d.getTime() && cd.getTime() <= s_dt.getTime()) {
			    console.log('current dasha identified');
				console.log(mainlord);
				console.log(sublord);
				console.log(arr[vi]);
				this['mdas1'] = mainlord;
				this['adas1'] = sublord;
				this['pdas1'] = arr[vi];
				this['pend1'] = s_dt.getDate().toString() + '-' + (s_dt.getMonth()+1).toString() + '-' + s_dt.getFullYear().toString();
			}
			this.shareService.addVIM(dd + '-' + m + '-' + y + '|' + s_dt.getDate().toString() + '-' + (s_dt.getMonth()+1).toString() + '-' + s_dt.getFullYear().toString(), mainlord, sublord, arr[vi]);
			v_start = 1;
		 }	
		if(vi == 8) vi = -1;
		if(v_iter == 9) break;
	   }
	}
	buildAntarDasha(lord :string, order :number, startdt :Date, remdays :number)
	{
	  var m_dy = this.days_in_month(startdt.getMonth()+1, startdt.getFullYear());//29.530588;//30.436875;
	  var d_yr = this.days_of_a_year(startdt.getFullYear());//354.367056;//365.2425;
	  var e_dys = 0;
		let das :any = '';
		if(lord == "venus") das = venus_das;
		else if(lord == "ketu") das = ketu_das;
		else if(lord == "sun") das = sun_das;
		else if(lord == "moon") das = moon_das;
		else if(lord == "mars") das = mars_das;
		else if(lord == "rahu") das = rahu_das;
		else if(lord == "jupiter") das = jupiter_das;
		else if(lord == "saturn") das = saturn_das;
		else if(lord == "mercury") das = mercury_das;
		  console.log(lord);
		  console.log(das);
	  if(remdays > 0) {
	    var s_dt = new Date(startdt.getTime());
	    var tot_dys = Number(dashas[lord.substring(0,2).toLowerCase()])*d_yr;
		e_dys = tot_dys - remdays;
		var ffd = 0;
		var a_per = 0;
		var r_dys = 0;
		for(let key of Object.keys(das)) {
		  m_dy = this.days_in_month(s_dt.getMonth()+1, s_dt.getFullYear());
		  d_yr = this.days_of_a_year(s_dt.getFullYear());
		  //var e_dt = s_dt;
			//console.log(key);
		  var ads = das[key];
		  //console.log(ads);
		  var a_dys = Number(ads.split('|')[0])*d_yr + Number(ads.split('|')[1])*m_dy + Number(ads.split('|')[2]);
		  ffd += a_dys;
		  if(ffd >= e_dys) {
		    if(r_dys >= remdays) break;
		    r_dys += a_dys;
		    var start_das = new Date(s_dt.getTime());
			var m = (s_dt.getMonth()+1).toString();
			var dd = s_dt.getDate().toString();
			var y = s_dt.getFullYear().toString();
		    s_dt.setDate(s_dt.getDate() + a_dys);
			//var cur_date = new Date();
			//if(cur_date >= start_das && cur_date <= s_dt) {
			  //this.cur_m_das = lord;
			  //this.cur_a_das = key;
			//}
		    a_per++;
			console.log('Pratyantar' + lord.substring(0,2).toLowerCase() + key);
			this.buildPratyantarDasha(lord.substring(0,2).toLowerCase(), key, order, a_per, new Date(start_das.getTime()));
		  }
		}
	  } else {
		var a_per = 0;
	    var s_dt = new Date(startdt.getTime());
		console.log(s_dt.toString());
	    //var tot_dys = Number(dashas[lord.substring(0,2)])*d_yr;
		//e_dys = tot_dys - remdays;
		//var ffd = 0;
		for(let key of Object.keys(das)) {
		  m_dy = this.days_in_month(s_dt.getMonth()+1, s_dt.getFullYear());
		  d_yr = this.days_of_a_year(s_dt.getFullYear());
		   a_per++;
			var start_das = new Date(s_dt.getTime());
			var m = (s_dt.getMonth()+1).toString();
			var dd = s_dt.getDate().toString();
			var y = s_dt.getFullYear().toString();
			console.log(key);
		  var ads = das[key];
		  console.log(ads);
		  var a_dys = Number(ads.split('|')[0])*d_yr + Number(ads.split('|')[1])*m_dy + Number(ads.split('|')[2]);
		    s_dt.setDate(s_dt.getDate() + a_dys);
			//var cur_date = new Date();
			//if(cur_date >= start_das && cur_date <= s_dt) {
			  //this.cur_m_das = lord;
			  //this.cur_a_das = key;
			//}
			console.log('Pratyantar' + lord.substring(0,2).toLowerCase() + key);
			this.buildPratyantarDasha(lord.substring(0,2).toLowerCase(), key, order, a_per, new Date(start_das.getTime()));
		}
	  }
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
		
		for(var i = 0; i < Object.keys(nakshatras).length; i++)
		{
			var nak = nakshatras[i];
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
					return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
				}
			} 
			else if(nak.location.start.split(',')[1] == moonsign.toLowerCase()) {
			  if(moonmins >= nak_s) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
			}
			else if(nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
			  if(moonmins <= nak_e) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
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

}
