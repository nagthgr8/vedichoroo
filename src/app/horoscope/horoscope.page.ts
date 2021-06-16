import { Component, OnInit, NgZone, AfterViewInit, ViewChild, Renderer2, ElementRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { Chart } from 'chart.js';
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';
import { PlanetStar } from '../planet-star';
import { Dasha } from '../dasha';
import { Dosha } from '../dosha';
import * as signs from '../signs.json';
import * as sign_imgs from '../sign_imgs.json';
import * as o_signs from '../o_signs.json';
import * as rashis from '../rashis.json';
import * as o_rashis from '../o_rashis.json';
import * as rashi_lords from '../rashi_lords.json';
import * as ruler_name from '../ruler_name.json';
import * as friend_pl from '../friend_pl.json';
import * as enemy_pl from '../enemy_pl.json';
import * as aspects from '../aspects.json';
import * as house_traits from '../house_traits.json';
import * as nakshatras from '../nakshatras.json';
declare var admob;

@Component({
  selector: 'app-horoscope',
  templateUrl: './horoscope.page.html',
  styleUrls: ['./horoscope.page.scss'],
})
export class HoroscopePage implements OnInit {
	@ViewChild('birthChart', {static: true}) birthChart : ElementRef;
	@ViewChild("cnvPS", {static: true}) cnvPS;
	@ViewChild("cnvHS", {static: true}) cnvHS;
	//@ViewChild('cnvHoro') cnvHoro: ElementRef;
	//public ctxHoro: CanvasRenderingContext2D;
	signs_v: any = (signs as any).default;
	sign_imgs_v: any = (sign_imgs as any).default;
	o_signs_v: any = (o_signs as any).default;;
	rashis_v: any = (rashis as any).default;
	o_rashis_v: any = (o_rashis as any).default;
	rashi_lords_v: any = (rashi_lords as any).default;
	ruler_name_v: any = (ruler_name as any).default;
	friend_pl_v: any = (friend_pl as any).default;
	enemy_pl_v: any = (enemy_pl as any).default;
	aspects_v: any = (aspects as any).default;
	house_traits_v: any = (house_traits as any).default;
	nakshatras_v: any = (nakshatras as any).default;
	plChart: any;
	binf: any;
	svgHoro: any;
	//svims: string = '';
	//splpos: string = '';
	oPlanet :PlanetStar[] = [];
	oDas: Dasha[] = [];
	oDos: Dosha[] = [];
	//oAD: Dasha[] = [];
	//oPD: Dasha[] = [];
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
	trikona_lords :string = '';
	kendra_lords :string = '';
	device_width :number = 0;
	device_height :number = 0;
	akashWani :string = '';
	showASU: boolean = false;
	showADV: boolean = false;
	showVIM: boolean = false;
	showPS: boolean = false;
	showHS: boolean = false;
	aynm: string = '4'; curaynm: string = '4';
	aynt: string = ''
	info: string = '';
	chartanls: string = '';
	lstnr: Function;
	horo :string = '';
	name: string = '';
	cur_m_das :string = ''; cur_a_das :string = '';
    objectKeys = Object.keys;
	pnam1 :string = ''; pnam2 :string = ''; pnam3 :string = ''; pnam4 :string = ''; pnam5 :string = ''; pnam6 :string = ''; pnam7 :string = ''; pnam8 :string = ''; pnam9 :string = '';anam: string ='';
	ppos1 :string = ''; ppos2 :string = ''; ppos3 :string = ''; ppos4 :string = ''; ppos5 :string = ''; ppos6 :string = ''; ppos7 :string = ''; ppos8 :string = ''; ppos9 :string = '';apos: string = '';
	pras1 :string = '';pras2 :string = '';pras3 :string = '';pras4 :string = '';pras5 :string = '';pras6 :string = '';pras7 :string = '';pras8 :string = '';pras9 :string = '';aras:string = '';
	pnak1 :string = '';pnak2 :string = '';pnak3 :string = '';pnak4 :string = '';pnak5 :string = '';pnak6 :string = '';pnak7 :string = '';pnak8 :string = '';pnak9 :string = '';anak: string ='';
	nakl1 :string = '';nakl2 :string = '';nakl3 :string = '';nakl4 :string = '';nakl5 :string = '';nakl6 :string = '';nakl7 :string = '';nakl8 :string = '';nakl9 :string = '';anakl: string = '';
	nrefs: number = 0;
	bstar: string = '';
	vims: string = '';
	sdbInf: string = '';
	shd: any;
	akv: any;
	msg1: string ='';
	msg2: string ='';
	msg3: string ='';
	msg4: string = '';
	showBD = false;
	showDS: boolean = false;
	//ksd: string = '';ptd: string = '';gcd: string = '';and: string = '';grd: string = '';gmd: string = '';snd: string = '';spd: string = '';pkd: string = '';kmd: string = '';bnd: string = '';
  constructor(private router: Router, private zone: NgZone, private route: ActivatedRoute, public shareService: ShareService, public renderer: Renderer2, public platform: Platform, public horoService: HoroscopeService, private translate: TranslateService)
  {
	//  this.dos = {};
		if(this.shareService.getYogAd()) {
		 this.showASU = true;
		}
		this.chartanls =  '<span>TAP on birthchart for more advanced settings</span>';
  }
  ngAfterViewInit() {
	this.moon_sign = '';
	this.moon_deg = '';
	this.asc_sign  = '';
	this.trikona_lords  = '';
	this.kendra_lords  = '';
	this.akashWani = '';

	//this.ctxHoro = (<HTMLCanvasElement>this.cnvHoro.nativeElement).getContext('2d');
	//this.loadHoro();
   // this.initPushNotification();
  }

  ngOnInit() {
    //this.renderer.addClass(this.akashWani.nativeElement, 'wild');
	//const div = this.renderer.createElement('div');
    //const text = this.renderer.createText('Hello world!');

    //this.renderer.appendChild(div, text);
    //this.renderer.appendChild(this.akashWani.nativeElement, div);
	 var doshas = ['Kaal Sarpa Dosha|KSD', 'Pitru Dosha|PTD', 'Guru Chandal Dosha|GCD', 'Mangal Dosha|AND', 'Grahan Dosha|GRD', 'Gandamool Dosha|GMD', 'Shani Dosha|SND', 'Shrapit Dosha|SPD', 'Paap Kartari Dosha|PKD', 'Bandhan Dosha|BND', 'Kemadruma Dosha|KMD'];
    for(let i = 0; i < doshas.length; i++) {
		let ds: Dosha  = {
			id: doshas[i].split('|')[1],
			name: doshas[i].split('|')[0],
			desc: '',
			res: 'Not Exist',
			style: 'greenText'
		};
		this.oDos[ds.id] = ds;
	}
   this.binf = this.router.getCurrentNavigation().extras.state;
   this.platform.ready().then((readySource) => {
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
	  if(this.binf && this.binf.dohs) {
		 this.publishDohs(this.binf.dohs);
	  } else {
		  this.horoService.getDoshas(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, this.binf.dstofset, ayanid)
			.subscribe(res => {
				  this.binf.dohs = res;
				  this.shareService.setDOHS(this.binf.dob, res);
				  this.publishDohs(this.binf.dohs);
			});
	  }
  	  this.shareService.plan
		   .subscribe(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
			//admob.setDevMode(true);
		  admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/1541520765',
			  ios: 'ca-app-pub-8442845715303800/1541520765',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/1541520765',
				ios: 'ca-app-pub-8442845715303800/1541520765',
			  })
			}, 10000)
		  })	
		}		  
	}, (err) => {
	});	 
		console.log('Width: ' + this.platform.width());
		this.device_width = this.platform.width();
		console.log('Height: ' + this.platform.height());
		this.device_height = this.platform.height();
		console.log('binf', this.binf);
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
	this.msg4 = 'Analyzing stars..';
 	this.horoService.getBirthInfoEx(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, ayanid)
       .subscribe(res => {
		   this.showBD = true;
		   this.msg4 = '';
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
		this.msg1 = 'Calculating Astakavarga..';
		if(this.binf.akv != null) {
			this.akvChart(this.binf.akv);
		} else { this.horoService.getAstakvarga(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, ofset, ayanid)
		   .subscribe(akv => {
			   this.shareService.setAKV(this.binf.dob, akv);
               this.akvChart(akv);
		  }, (err) => {
			this.msg1 = JSON.stringify(err);
		  }) ;
		}
		  this.msg2 = 'Calculating Shadbala..';
		if(this.binf.sdb != null) {
			this.sdbChart(this.binf.sdb);
		} else { this.horoService.getShadbala(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, ofset, ayanid)
		   .subscribe(shd => {
			this.shareService.setSDB(this.binf.dob, shd);
			this.sdbChart(shd);
		  }, (err) => {
			this.msg2 = JSON.stringify(err);
		  }) ;
		}
	});
  }
  publishDohs(dohs) {
	console.log('dohs=', dohs);
	console.log('oDos=', this.oDos);
	for(let key of Object.keys(dohs)) {
		console.log('doh=', key);
		this.oDos[key].desc = dohs[key];
		this.oDos[key].res = 'Exist';
		this.oDos[key].style = 'redText';
	}
	this.showDS = true;
  }
  akvChart(akv) {
  			   this.msg1 = '';
			   this.showHS = true;
			   this.akv = akv;
			   let akvPts = akv['akPts'];
			   let houSg = akv['houSgn'];
			var pts = [];
			var bkclr = [];
			var bdclr = [];
			console.log(akvPts);
			let pt : number = akvPts['Su-1'] +  akvPts['Mo-1'] + akvPts['Ju-1'] + akvPts['Me-1'] + akvPts['Ve-1'] + akvPts['Ma-1'] + akvPts['Sa-1'];
			console.log('1', pt);
			pts.push(pt);
			pt = akvPts['Su-2'] +  akvPts['Mo-2'] + akvPts['Ju-2'] + akvPts['Me-2'] + akvPts['Ve-2'] + akvPts['Ma-2'] + akvPts['Sa-2'];
			console.log('2', pt);
			pts.push(pt);
			pt = akvPts['Su-3'] +  akvPts['Mo-3'] + akvPts['Ju-3'] + akvPts['Me-3'] + akvPts['Ve-3'] + akvPts['Ma-3'] + akvPts['Sa-3'];
			console.log('3', pt);
			pts.push(pt);
			pt = akvPts['Su-4'] +  akvPts['Mo-4'] + akvPts['Ju-4'] + akvPts['Me-4'] + akvPts['Ve-4'] + akvPts['Ma-4'] + akvPts['Sa-4'];
			console.log('4', pt);
			pts.push(pt);
			pt = akvPts['Su-5'] +  akvPts['Mo-5'] + akvPts['Ju-5'] + akvPts['Me-5'] + akvPts['Ve-5'] + akvPts['Ma-5'] + akvPts['Sa-5'];
			console.log('5', pt);
			pts.push(pt);
			pt = akvPts['Su-6'] +  akvPts['Mo-6'] + akvPts['Ju-6'] + akvPts['Me-6'] + akvPts['Ve-6'] + akvPts['Ma-6'] + akvPts['Sa-6'];
			console.log('6', pt);
			pts.push(pt);
			pt = akvPts['Su-7'] +  akvPts['Mo-7'] + akvPts['Ju-7'] + akvPts['Me-7'] + akvPts['Ve-7'] + akvPts['Ma-7'] + akvPts['Sa-7'];
			console.log('7', pt);
			pts.push(pt);
			pt = akvPts['Su-8'] +  akvPts['Mo-8'] + akvPts['Ju-8'] + akvPts['Me-8'] + akvPts['Ve-8'] + akvPts['Ma-8'] + akvPts['Sa-8'];
			console.log('8', pt);
			pts.push(pt);
			pt = akvPts['Su-9'] +  akvPts['Mo-9'] + akvPts['Ju-9'] + akvPts['Me-9'] + akvPts['Ve-9'] + akvPts['Ma-9'] + akvPts['Sa-9'];
			console.log('9', pt);
			pts.push(pt);
			pt = akvPts['Su-10'] +  akvPts['Mo-10'] + akvPts['Ju-10'] + akvPts['Me-10'] + akvPts['Ve-10'] + akvPts['Ma-10'] + akvPts['Sa-10'];
			console.log('10', pt);
			pts.push(pt);
			pt = akvPts['Su-11'] +  akvPts['Mo-11'] + akvPts['Ju-11'] + akvPts['Me-11'] + akvPts['Ve-11'] + akvPts['Ma-11'] + akvPts['Sa-11'];
			console.log('11', pt);
			pts.push(pt);
			pt = akvPts['Su-12'] +  akvPts['Mo-12'] + akvPts['Ju-12'] + akvPts['Me-12'] + akvPts['Ve-12'] + akvPts['Ma-12'] + akvPts['Sa-12'];
			console.log('12', pt);
			pts.push(pt);
			console.log('pts', pts);
			//rgba(0,102,0,1) //v good
			//rgba(102,255,102,1) //good
			//rgba(255,153,102,1) //Avg
			//rgba(255,0,0,1) //weak
			for(var i = 0; i < 12; i++) {
				if(pts[i] < 25) {
					bkclr.push("rgba(255,0,0,0.2)");
					bdclr.push("rgba(255,0,0,1)");
				}
				else if(pts[i] > 25 && pts[i] < 29) {
					bkclr.push("rgba(255,153,102,0.2)");
					bdclr.push("rgba(255,153,102,1)");
				}
				else if(pts[i] > 29 && pts[i] < 31) {
					bkclr.push("rgba(102,255,102,0.2)");
					bdclr.push("rgba(102,255,102,1)");
				}
				else {
					bkclr.push("rgba(0,102,0,0.2)");
					bdclr.push("rgba(0,102,0,1)");
				}
			}
			var lbls = [];
			for(var s = 1; s < 13; s++)
				lbls.push(s.toString()+'(' + houSg[s.toString()] + ')');
			this.plChart = new Chart(this.cnvHS.nativeElement, {
			  type: "bar",
			  data: {
				labels: lbls,
				datasets: [
				  {
					label: "Astakavarga Points",
					data: pts,
					backgroundColor: bkclr,
					borderColor: bdclr,
					borderWidth: 1
				  }
				]
			  },
			  options: {
				scales: {
				  yAxes: [
					{
					  ticks: {
						beginAtZero: true
					  }
					}
				  ]
				}
			 }
		});
		
  }
  sdbChart(shd)
  {
  			this.msg2 = '';
			this.showPS = true;
			this.sdbInf =  '<span>A planet that has at least the required Shadbala Pinda is considered to be strong and will show favorable results.</span>';
			var pts = [];
			var bkclr = [];
			var bdclr = [];
			this.shd = shd;
			
			let pt = shd['uchBala']['Su'] + shd['sptvBala']['Su'] + shd['ojayBala']['Su'] + shd['kenBala']['Su'] + shd['drekBala']['Su'] + shd['dikBala']['Su'] + shd['natoBala']['Su'] + shd['triBala']['Su'] + shd['pakBala']['Su'] + shd['hvmaBala']['Su'] + shd['ayanBala']['Su'] + shd['chestBala']['Su'] + shd['naiskBala']['Su'] + shd['drgBala']['Su'];
			pts.push(pt);
			pt = shd['uchBala']['Mo'] + shd['sptvBala']['Mo'] + shd['ojayBala']['Mo'] + shd['kenBala']['Mo'] + shd['drekBala']['Mo'] + shd['dikBala']['Mo'] + shd['natoBala']['Mo'] + shd['triBala']['Mo'] + shd['pakBala']['Mo'] + shd['hvmaBala']['Mo'] + shd['ayanBala']['Mo'] + shd['chestBala']['Mo'] + shd['naiskBala']['Mo'] + shd['drgBala']['Mo'];
			pts.push(pt);
			pt = shd['uchBala']['Ma'] + shd['sptvBala']['Ma'] + shd['ojayBala']['Ma'] + shd['kenBala']['Ma'] + shd['drekBala']['Ma'] + shd['dikBala']['Ma'] + shd['natoBala']['Ma'] + shd['triBala']['Ma'] + shd['pakBala']['Ma'] + shd['hvmaBala']['Ma'] + shd['ayanBala']['Ma'] + shd['chestBala']['Ma'] + shd['naiskBala']['Ma'] + shd['drgBala']['Ma'];
			pts.push(pt);
			pt = shd['uchBala']['Me'] + shd['sptvBala']['Me'] + shd['ojayBala']['Me'] + shd['kenBala']['Me'] + shd['drekBala']['Me'] + shd['dikBala']['Me'] + shd['natoBala']['Me'] + shd['triBala']['Me'] + shd['pakBala']['Me'] + shd['hvmaBala']['Me'] + shd['ayanBala']['Me'] + shd['chestBala']['Me'] + shd['naiskBala']['Me'] + shd['drgBala']['Me'];
			pts.push(pt);
			pt = shd['uchBala']['Ju'] + shd['sptvBala']['Ju'] + shd['ojayBala']['Ju'] + shd['kenBala']['Ju'] + shd['drekBala']['Ju'] + shd['dikBala']['Ju'] + shd['natoBala']['Ju'] + shd['triBala']['Ju'] + shd['pakBala']['Ju'] + shd['hvmaBala']['Ju'] + shd['ayanBala']['Ju'] + shd['chestBala']['Ju'] + shd['naiskBala']['Ju'] + shd['drgBala']['Ju'];
			pts.push(pt);
			pt = shd['uchBala']['Ve'] + shd['sptvBala']['Ve'] + shd['ojayBala']['Ve'] + shd['kenBala']['Ve'] + shd['drekBala']['Ve'] + shd['dikBala']['Ve'] + shd['natoBala']['Ve'] + shd['triBala']['Ve'] + shd['pakBala']['Ve'] + shd['hvmaBala']['Ve'] + shd['ayanBala']['Ve'] + shd['chestBala']['Ve'] + shd['naiskBala']['Ve'] + shd['drgBala']['Ve'];
			pts.push(pt);
			pt = shd['uchBala']['Sa'] + shd['sptvBala']['Sa'] + shd['ojayBala']['Sa'] + shd['kenBala']['Sa'] + shd['drekBala']['Sa'] + shd['dikBala']['Sa'] + shd['natoBala']['Sa'] + shd['triBala']['Sa'] + shd['pakBala']['Sa'] + shd['hvmaBala']['Sa'] + shd['ayanBala']['Sa'] + shd['chestBala']['Sa'] + shd['naiskBala']['Sa'] + shd['drgBala']['Sa'];
			pts.push(pt);
			
			//rgba(0,102,0,1) //v good
			//rgba(102,255,102,1) //good
			//rgba(255,153,102,1) //Avg
			//rgba(255,0,0,1) //weak
			var lbls = [];
			for(var i = 0; i < 7; i++) {
				switch(i+1)
				{
					case 1: //SUN
					    if(pts[i] < 390) {
							bkclr.push("rgba(255,0,0,0.2)");
							bdclr.push("rgba(255,0,0,1)");
						} else {
							bkclr.push("rgba(0,102,0,0.2)");
							bdclr.push("rgba(0,102,0,1)");
						}
						lbls.push('SUN');
						break;
					case 2: //MOON
					    if(pts[i] < 360) {
							bkclr.push("rgba(255,0,0,0.2)");
							bdclr.push("rgba(255,0,0,1)");
						} else {
							bkclr.push("rgba(0,102,0,0.2)");
							bdclr.push("rgba(0,102,0,1)");
						}
						lbls.push('MOON');
						break;
					case 3:  //MARS
					    if(pts[i] < 300) {
							bkclr.push("rgba(255,0,0,0.2)");
							bdclr.push("rgba(255,0,0,1)");
						} else {
							bkclr.push("rgba(0,102,0,0.2)");
							bdclr.push("rgba(0,102,0,1)");
						}
						lbls.push('MARS');
						break;
					case 4:  //MERCURY
					    if(pts[i] < 420) {
							bkclr.push("rgba(255,0,0,0.2)");
							bdclr.push("rgba(255,0,0,1)");
						} else {
							bkclr.push("rgba(0,102,0,0.2)");
							bdclr.push("rgba(0,102,0,1)");
						}
						lbls.push('MERCURY');
						break;
					case 5:  //JUPITER
					    if(pts[i] < 390) {
							bkclr.push("rgba(255,0,0,0.2)");
							bdclr.push("rgba(255,0,0,1)");
						} else {
							bkclr.push("rgba(0,102,0,0.2)");
							bdclr.push("rgba(0,102,0,1)");
						}
						lbls.push('JUPITER');
						break;
					case 6: //VENUS
					    if(pts[i] < 330) {
							bkclr.push("rgba(255,0,0,0.2)");
							bdclr.push("rgba(255,0,0,1)");
						} else {
							bkclr.push("rgba(0,102,0,0.2)");
							bdclr.push("rgba(0,102,0,1)");
						}
						lbls.push('VENUS');
						break;
					case 7:  //SATURN
					    if(pts[i] < 300) {
							bkclr.push("rgba(255,0,0,0.2)");
							bdclr.push("rgba(255,0,0,1)");
						} else {
							bkclr.push("rgba(0,102,0,0.2)");
							bdclr.push("rgba(0,102,0,1)");
						}
						lbls.push('SATURN');
						break;
					default:
						break;
				}
			}
			this.plChart = new Chart(this.cnvPS.nativeElement, {
			  type: "bar",
			  data: {
				labels: lbls,
				datasets: [
				  {
					label: "Shadbala Points",
					data: pts,
					backgroundColor: bkclr,
					borderColor: bdclr,
					borderWidth: 1
				  }
				]
			  },
			  options: {
				scales: {
				  yAxes: [
					{
					  ticks: {
						beginAtZero: true
					  }
					}
				  ]
				}
			  }
		});
	}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HoroscopePage');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter HoroscopePage');
	var ayn = this.shareService.getAYNM();
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
    if(this.nrefs > 0) {
		this.horoService.getBirthInfoEx(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, Number(ayn))
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
		  }) ;
		for (let child of this.birthChart.nativeElement.children) {
			this.renderer.removeChild(this.birthChart.nativeElement, child);
		}
		this.showVIM = false;
		this.loadHoro();
	}
	this.nrefs++;
   
  }
  ngOnDestroy() {
    this.lstnr();
  }	  
  loadHoro()
  {
		var plPos = this.binf.ppos; //this.shareService.getPPOS(this.binf.dob);
	console.log('loadHoro', plPos);
	console.log('signs_v', this.signs_v);
		for (var i = 0; i < 16; i++) {
			var sign = this.signs_v[i];
			console.log('sign=', sign);
			if (plPos.hasOwnProperty(sign)) {
			    console.log('split-1');
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
								    console.log('split-2');
					if (pls[k].split(' ')[1] == 'MEAN_NODE') {
					   			    console.log('split-3');

						var rpos = this.o_rashis_v[sign].split('\|')[0];
						var kpos = parseInt(rpos, 10) + 6;
						if (kpos > 12) kpos = (kpos - 12);
						//var mn = i + 11;
						//if (mn > 15) mn -= 15;
						if (plPos.hasOwnProperty(this.o_signs_v[kpos - 1])) {
							var eP = plPos[this.o_signs_v[kpos - 1]];
										    console.log('split-4');

							plPos[this.o_signs_v[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
						} else {
									    console.log('split-5');

							plPos[this.o_signs_v[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
						}
						// plPos[sign] = ePls;
						plPos[sign] = plPos[sign].replace('MEAN_NODE', 'Ra');
					} else if (pls[k].split(' ')[1] == 'AC') { 
						this.asc_sign = sign;
						//this.asc_deg = Number(pls[k].split(' ')[0]);
						console.log('ASCENDENT is ' + this.asc_sign);
					} else if (pls[k].split(' ')[1] == 'Mo') {
						this.moon_sign = sign;
									    console.log('split-1', pls[k]);

						this.moon_deg = pls[k].split(' ')[0];
					} else if (pls[k].split(' ')[1] == 'TRUE_NODE') {
						plPos[sign] = plPos[sign].replace('TRUE_NODE', 'TR');		
					}
				}
			}
		}
		this.shareService.setPPOS(this.binf, plPos);
		//target.innerHTML = '';
	//	target.appendChild(grid(4, 25, 100%, plPos));
	    if(this.shareService.getCHTYP() == 'sind')
			this.svgHoro = this.grid(4, this.device_width/4, this.device_width, plPos);
		else if(this.shareService.getCHTYP() == 'nind')
			this.svgHoro = this.drawNIchart(plPos);
		else
			this.svgHoro = this.grid(4, this.device_width/4, this.device_width, plPos);
		
	    this.lstnr = this.renderer.listen(this.svgHoro, 'click', (event) => {
			// Do something with 'event'
			console.log('clicked ', event.path);
			console.log('clicked ', event.path[2]);
			this.binf.ref = '1';
			this.router.navigate(['/chart-settings'], {state: this.binf});
		});
		console.log('svg', this.svgHoro);
		console.log('birthChart', this.birthChart);
        this.renderer.appendChild(this.birthChart.nativeElement, this.svgHoro);
		//this.birthChart.nativeElement.innerHTML = this.svgHoro.outerHTML;
		let mdeg: number = 0;
		console.log('moondeg', this.moon_deg);
		if(this.moon_deg.indexOf('.') > -1) 
			mdeg = this.shareService.dmsToDec(Number(this.moon_deg.split('.')[0]), Number(this.moon_deg.split('.')[1]), Number(this.moon_deg.split('.')[2]));
		else
			mdeg = Number(this.moon_deg);
		this.bstar = this.calcStar(mdeg, this.moon_sign);
		//console.log('calcStar', mdeg);
		//console.log('calcStar', this.moon_sign);
		console.log('calcStar', this.bstar);
//		console.log('birthstar', this.bstar);
		this.shareService.setBirthStar(this.bstar.split('|')[0]);
		var ras_num = Number(this.o_rashis_v[this.moon_sign].split('\|')[0]);
		var ras_num2 = Number(this.o_rashis_v[this.bstar.split('|')[3]].split('\|')[0]);
        this.akashWani = '<h3>Please wait..</h3>';
		this.publishRep();
		this.msg3 = 'Calculating Vimsottara Dasha Chart...';
	//	return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
	   if(this.binf.vims != null) {
	      this.vimsObj(this.binf.vims);	   
	   } else { this.horoService.calcVim(this.binf.dob, this.bstar.split('|')[2], mdeg, Number(this.bstar.split('|')[1]), ras_num, ras_num2, this.shareService.getLANG() )
				.subscribe(res => {
					this.shareService.setVIMS(this.binf.dob, res);
					this.vimsObj(res);
				}, (err) => {
					//this.info = err;
				});
	   }
	}
	vimsObj(res) {
					this.msg3 = '';
					this.vims = 'VIMSOTTARA DASHA';
				    this.oDas = [];
				    for(let key of Object.keys(res)) {
					  // console.log('das', res[key]);
					    //var obj = JSON.parse(res[key]);
						if(res[key].style == 'mdasc') this.cur_m_das = key;
						else if(res[key].style == 'adasc') this.cur_a_das = this.ruler_name_v[key.split('-')[1].toLowerCase()];
						let das : Dasha = {
							lord: res[key].lord,
							per: res[key].per,
							type: res[key].type,
							style: res[key].style,
							subs: res[key].subs,
							show: res[key].show,
							icon: res[key].icon
						};
						this.oDas.push(das);
					}
	   this.showVIM = true;
		if(this.shareService.getLANG().toLowerCase() == 'en') {
			this.horo += "<h3>You are now in " + this.cur_m_das + " Maha dasha and " + this.cur_a_das + " Antar dasha.</h3> <br/>";
		} else if(this.shareService.getLANG().toLowerCase() == 'te') {
			this.horo += "<h3>ఇప్పుడు మీరు " + this.shareService.translate_func(this.cur_m_das) + " మహా దశ మరియు " + this.shareService.translate_func(this.cur_a_das) + " అన్తర్ దశ లో ఉన్నారు.</h3> <br/>";
		} else if(this.shareService.getLANG().toLowerCase() == 'hi') {
			this.horo += "<h3>आप अभी  " + this.shareService.translate_func(this.cur_m_das) + " महा दशा और " + this.shareService.translate_func(this.cur_a_das) + " अंतर दशा में है.</h3> <br/>";
		} else if(this.shareService.getLANG().toLowerCase() == 'ta') {
			this.horo += "<h3>தற்போது உங்களுக்கு"  + this.shareService.translate_func(this.cur_m_das) + " தசை  " + this.shareService.translate_func(this.cur_a_das) + ".</h3> <br/>";
		}
	}
	publishRep()
	{
		var plPos = this.binf.ppos;//this.shareService.getPPOS(this.binf.dob);
			var h_code;
		if(this.shareService.getLANG().toLowerCase() == 'en') {
			h_code = "<h2>Horoscope Analysis</h2>";
			h_code += "<span>You are born in <strong>" + this.rashis_v[this.asc_sign].split('\|')[1] + "</strong> Ascendant. Your Moon sign is <strong>" + this.rashis_v[this.moon_sign].split('\|')[1] + "</strong>. Your Birth Star is <strong>" + this.bstar.split('|')[0] + '</strong></span>';
		} else if(this.shareService.getLANG().toLowerCase() == 'te') {
			h_code = "<h2>జాతక విశ్లేషణ</h2>";
			h_code += "<span>మీరు <strong> " + this.shareService.translate_func(this.rashis_v[this.asc_sign].split('\|')[1]) + "</strong> లగ్నమ్ లో జన్మించారు.  మీ జన్మ రశి  <strong>" + this.shareService.translate_func(this.rashis_v[this.moon_sign].split('\|')[1]) + "</strong>. మీ జన్మ నక్షత్రమ్ <strong> " + this.shareService.translate_func(this.bstar.split('|')[0]) + '</strong></span>';
		} else if(this.shareService.getLANG().toLowerCase() == 'hi') {
			h_code = "<h2>जन्म-कुण्डली विश्लेषण</h2>";
			h_code += "<span>आप का जन्म <strong> " + this.shareService.translate_func(this.rashis_v[this.asc_sign].split('\|')[1]) + "</strong> लग्न में हुआ था. आप के जन्म राशि <strong>" + this.shareService.translate_func(this.rashis_v[this.moon_sign].split('\|')[1]) + "</strong>. आप के जन्म नक्षत्र <strong> " + this.shareService.translate_func(this.bstar.split('|')[0]) + '</strong></span>';
		} else if(this.shareService.getLANG().toLowerCase() == 'ta') {
			h_code = "<h2>ஜாதக ஆய்வு</h2>";
			h_code += "<span>நீங்கள் <strong> " + this.shareService.translate_func(this.rashis_v[this.asc_sign].split('\|')[1]) + "</strong> லக்னத்தில் பிறந்திருக்கிறீர்கள்.  உங்களுடைய இராசி <strong>" + this.shareService.translate_func(this.rashis_v[this.moon_sign].split('\|')[1]) + "</strong>. நீங்கள் பிறந்த நட்சத்திரம் <strong> " + this.shareService.translate_func(this.bstar.split('|')[0]) + "</strong>.</span>";
		}
		//this.shareService.setMoonSign(this.rashis_v[this.moon_sign].split('\|')[1]);
		if(this.shareService.getLANG().toLowerCase() == 'en') {
			h_code += "<h3>Your functional benefic planets are : </h3>";
		} else if(this.shareService.getLANG().toLowerCase() == 'te') {
			h_code += "<h3>జాతక రీత్య్ మీకు మంచి గ్రహాలు: </h3>";
		} else if(this.shareService.getLANG().toLowerCase() == 'hi') {
			h_code += "<h3>कुंडली के अनुसार आपके लिए अच्छे ग्रह: </h3>";
		} else if(this.shareService.getLANG().toLowerCase() == 'ta') {
			h_code += "<h3>உங்களுக்கு நன்மை தரும் கிரகங்கள்:- </h3>";
		}
		var unq = [];
		h_code += '<span>';
		if (this.trikona_lords.length > 0) {
			var lords = this.trikona_lords.split('\|');
			for (i = 0; i < lords.length; i++) {
				if (unq.indexOf(lords[i]) < 0) {
					h_code += ' ' + this.shareService.translate_func(lords[i]);
					unq.push(lords[i]);
				}
			}
		}
		if (this.kendra_lords.length > 0) {
			lords = this.kendra_lords.split('\|');
			for (i = 0; i < lords.length; i++) {
				if (unq.indexOf(lords[i]) < 0) {
					h_code += ' ' + this.shareService.translate_func(lords[i]);
					unq.push(lords[i]);
				}
			}
		}
		h_code += '</span>';
		h_code += "<h3>Strength of each planet</h3>";
		h_code += '<span>' + this.binf.plstr + '</span>';
		//var dob = this.shareService.getDOB().split('T')[0].split('-')[1] + '/' + this.shareService.getDOB().split('T')[0].split('-')[2] + '/' + //this.shareService.getDOB().split('T')[0].split('-')[0];
	   console.log('cur mdas', this.cur_m_das);
		var ausp = 0;
		var ausp_lords = '';
		var klord_in_tri = '';
		var tlord_in_ken = '';
		var klord_in_ken = '';
		var tlord_in_tri = '';
		var vp_rulers = '';
		var vp_owners = '';
		for (var i = 0; i < 12; i++) {
			if (this.o_signs_v[i] == this.asc_sign) {
				if (plPos.hasOwnProperty(this.asc_sign)) {
					pls = plPos[this.asc_sign].split('\|');
					for (var k = 0; k < pls.length; k++) {
						var pl = pls[k].split(' ')[1];
						if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
							if (this.kendra_lords.indexOf(this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()]) > -1) {
								ausp_lords += this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + ' ';
								klord_in_tri += '1|' + this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + '&';
								ausp++;
							}
							if (this.trikona_lords.indexOf(this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()]) > -1) {
								if (ausp_lords.indexOf(this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()]) == -1) {
									ausp_lords += this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + ' ';
									tlord_in_tri += '1|' + this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + '&';
									ausp++;
								}
							}
						}
					}
					if (ausp > 1) {
						//h_code += '<h4>The Conjunction of ' + ausp_lords + ' in your first house is very auspicious.</h4>';
					}
				}
				var as = 1;
				this.rashis_v[this.asc_sign] = '1|' + this.rashis_v[this.asc_sign].split('\|')[1];
				for (var j = i + 1; j < 12; j++) {
					as++;
					this.rashis_v[this.o_signs_v[j]] = (as).toString() + '|' + this.rashis_v[this.o_signs_v[j]].split('\|')[1];
					if (as == 5 || as == 9) {
						if (plPos.hasOwnProperty(this.o_signs_v[j])) {
							ausp_lords = '';
							ausp = 0;
							pls = plPos[this.o_signs_v[j]].split('\|');
							for (k = 0; k < pls.length; k++) {
								pl = pls[k].split(' ')[1];
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
									if (this.kendra_lords.indexOf(this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()]) > -1) {
										ausp_lords += this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + ' ';
										klord_in_tri += (as).toString() + '|' + this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + '&';
										ausp++;
									}
									if (this.trikona_lords.indexOf(this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()]) > -1) {
										if (ausp_lords.indexOf(this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()]) == -1) {
											ausp_lords += this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + ' ';
											tlord_in_tri += (as).toString() + '|' + this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + '&';
											ausp++;
										}
									}
								}
							}
							if (ausp > 1) {
								//h_code += '<h4>The Conjunction of ' + ausp_lords + ' in your ' + (as).toString() + ' house is very auspicious.</h4>';
							}
						}
					}
					else if (as == 4 || as == 7 || as == 10) {
						if (plPos.hasOwnProperty(this.o_signs_v[j])) {
							ausp_lords = '';
							ausp = 0;
							pls = plPos[this.o_signs_v[j]].split('\|');
							for (l = 0; l < pls.length; l++) {
								pl = pls[l].split(' ')[1];
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
									if (this.kendra_lords.indexOf(this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()]) > -1) {
										ausp_lords += this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + ' ';
										klord_in_ken += (as).toString() + '|' + this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + '|' + this.rashi_lords_v[this.o_signs_v[j]] + '&';
										ausp++;
									}
									if (this.trikona_lords.indexOf(this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()]) > -1) {
										if (ausp_lords.indexOf(this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()]) == -1) {
											ausp_lords += this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + ' ';
											tlord_in_ken += (as).toString() + '|' + this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + '&';
											ausp++;
										}
									}
								}
							}
							if (ausp > 1) {
								//h_code += '<h4>The Conjunction of ' + ausp_lords + ' in your ' + (as).toString() + ' house is very auspicious.</h4>';
							}
						}
					}
					else if(as == 6 || as == 8 || as == 12) {
						if (plPos.hasOwnProperty(this.o_signs_v[j])) {
							ausp_lords = '';
							ausp = 0;
							pls = plPos[this.o_signs_v[j]].split('\|');
							for (l = 0; l < pls.length; l++) {								
							    pl = pls[l].split(' ')[1];
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
								  vp_rulers += this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + '-' + (as).toString() + '|';
								  vp_owners += this.rashi_lords_v[this.o_signs_v[j]] + '-' + (as).toString() + '|';
								}
							}
						}
					}
				}
				for (k = 0; k < i; k++) {
					var hno = ((12 - i) + (k + 1));
					this.rashis_v[this.o_signs_v[k]] = hno.toString() + '|' + this.rashis_v[this.o_signs_v[k]].split('\|')[1];
					if (plPos.hasOwnProperty(this.o_signs_v[k])) {
					if (hno == 5 || hno == 9) {
						ausp_lords = '';
						ausp = 0;
						pls = plPos[this.o_signs_v[k]].split('\|');
						for (l = 0; l < pls.length; l++) {
							pl = pls[l].split(' ')[1];
							if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
								if (this.kendra_lords.indexOf(this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()]) > -1) {
									ausp_lords += this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + ' ';
									klord_in_tri += (hno).toString() + '|' + this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + '&';
									ausp++;
								}
								if (this.trikona_lords.indexOf(this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()]) > -1) {
									if (ausp_lords.indexOf(this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()]) == -1) {
										ausp_lords += this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + ' ';
										tlord_in_tri += (hno).toString() + '|' + this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + '&';
										ausp++;
									}
								}
							}
						}
						if (ausp > 1) {
							//h_code += '<h4>The Conjunction of ' + ausp_lords + ' in your ' + (hno).toString() + ' house is very auspicious.</h4>';
						}
					}
					else if (hno == 4 || hno == 7 || hno == 10) {
						ausp_lords = '';
						ausp = 0;
						pls = plPos[this.o_signs_v[k]].split('\|');
						for (var l = 0; l < pls.length; l++) {
							pl = pls[l].split(' ')[1];
							if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
								if (this.kendra_lords.indexOf(this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()]) > -1) {
									ausp_lords += this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + ' ';
									klord_in_ken += (hno).toString() + '|' + this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + '|' + this.rashi_lords_v[this.o_signs_v[k]] + '&';
									ausp++;
								}
								if (this.trikona_lords.indexOf(this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()]) > -1) {
									if (ausp_lords.indexOf(this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()]) == -1) {
										ausp_lords += this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + ' ';
										tlord_in_ken += (hno).toString() + '|' + this.ruler_name_v[pls[l].split(' ')[1].toLowerCase()] + '&';
										ausp++;
									}
								}
							}
						}
						if (ausp > 1) {
							//h_code += '<h4>The Conjunction of ' + ausp_lords + ' in your ' + (hno).toString() + ' house is very auspicious.</h4>';
						}
						
					}
					
				  }
				}
			}
		}
		var tklords = '';
		if(tlord_in_tri.length > 0) {
			var tlords = tlord_in_tri.split('&');
			for(var tlt = 0; tlt < tlords.length-1; tlt++) {
			    if(this.shareService.getLANG() == 'en') {
					h_code += '<h4>Trikona Lord ' + tlords[tlt].split('|')[1] + ' in Trikona ' + tlords[tlt].split('|')[0] + ' House</h4>';
				} else if(this.shareService.getLANG() == 'te') {
					h_code += '<h4>త్రికొనా ' +  tlords[tlt].split('|')[0] + ' House లో త్రికొనాధిపతి ' + this.shareService.translate_func(tlords[tlt].split('|')[1]) + ' ఉన్నారు</h4>';
				} else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>त्रिकोणा ' +  tlords[tlt].split('|')[0] + ' House में त्रिकोणादिपति ' + this.shareService.translate_func(tlords[tlt].split('|')[1]) + ' रहा है</h4>';
				}  else if(this.shareService.getLANG() == 'ta') {
					h_code += '<h4></h4>';
				}
				tklords += tlords[tlt].split('|')[1] + ' ';
			}
		}
		if(tlord_in_ken.length > 0) {
			var tlordss = tlord_in_tri.split('&');
			for(var tlk = 0; tlk < tlordss.length-1; tlk++) {
			    if(this.shareService.getLANG() == 'en') {
					h_code += '<h4>Trikona Lord ' + tlordss[tlk].split('|')[1] + ' in Kendra ' + tlordss[tlk].split('|')[0] + ' House</h4>';
				} else if(this.shareService.getLANG() == 'te') {
					h_code += '<h4>ఖెన్ద్ర ' +  tlords[tlk].split('|')[0] + ' House లో త్రికొనాధిపతి ' + this.shareService.translate_func(tlords[tlk].split('|')[1]) + 'ఉన్నారు</h4>';
				} else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>केंद्र ' +  tlords[tlk].split('|')[0] + ' House में त्रिकोणादिपति '  + this.shareService.translate_func(tlords[tlk].split('|')[1]) + ' रहा है</h4>';
				} else if(this.shareService.getLANG() == 'ta') {
					h_code += '<h4></h4>';
				}
				tklords += tlordss[tlk].split('|')[1] + ' ';
			}
		}
		if(klord_in_tri.length > 0) {
			var klords = klord_in_tri.split('&');
			for(var klt = 0; klt < klords.length-1; klt++) {
			    if(this.shareService.getLANG() == 'en') {
					h_code += '<h4>Kendra Lord ' + klords[klt].split('|')[1] + ' in Trikona ' + klords[klt].split('|')[0] + ' House</h4>';
				} else if(this.shareService.getLANG() == 'te') {
					h_code += '<h4>త్రికొనా ' +  klords[klt].split('|')[0] + ' House లో ఖెన్ద్రాధిపతి ' + this.shareService.translate_func(klords[klt].split('|')[1]) + 'ఉన్నారు</h4>';
				} else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>त्रिकोण ' +  klords[klt].split('|')[0] + ' House में  केन्द्राधिपति ' + this.shareService.translate_func(klords[klt].split('|')[1]) + ' रहा है</h4>';
				} else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>त्रिकोण ' +  klords[klt].split('|')[0] + ' House में  केन्द्राधिपति ' + this.shareService.translate_func(klords[klt].split('|')[1]) + ' रहा है</h4>';
				}else if(this.shareService.getLANG() == 'ta') {
					h_code += '<h4></h4>';
				}
				tklords += klords[klt].split('|')[1] + ' ';
			}
		}
		if(klord_in_ken.length > 0) {
			var klordss = klord_in_ken.split('&');
			var pyoga = 0;
			for(var klk = 0; klk < klordss.length-1; klk++) {
			    if(this.shareService.getLANG() == 'en') {
					h_code += '<h4>Kendra Lord ' + klordss[klk].split('|')[1] + ' in Kendra ' + klordss[klk].split('|')[0] + ' House';
				}  else if(this.shareService.getLANG() == 'te') {
					h_code += '<h4>ఖెన్ద్ర ' +  klordss[klk].split('|')[0] + ' House లో ఖెన్ద్రాధిపతి  '  + this.shareService.translate_func(klordss[klk].split('|')[1]) + ' ఉన్నారు';
				}  else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>केंद्र ' +  klordss[klk].split('|')[0] + ' House  में  केन्द्राधिपति ' + this.shareService.translate_func(klordss[klk].split('|')[1]) +  ' रहा है';
				}   else if(this.shareService.getLANG() == 'ta') {
				}
				if(klordss[klk].split('|')[1].toLowerCase() == 'jupiter' && klordss[klk].split('|')[2].toLowerCase() == 'jupiter') {
				  pyoga = 1;
				}
				else if( klordss[klk].split('|')[1].toLowerCase() == 'mars' && klordss[klk].split('|')[2].toLowerCase() == 'mars'){
				  pyoga = 1;
				} else if (klordss[klk].split('|')[1].toLowerCase() == 'mercury' && klordss[klk].split('|')[2].toLowerCase() == 'mercury') {
				  pyoga = 1;
				} else if(klordss[klk].split('|')[1].toLowerCase() == 'venus' && klordss[klk].split('|')[2].toLowerCase() == 'venus') {
				  pyoga = 1;
				} else if(klordss[klk].split('|')[1].toLowerCase() == 'saturn' && klordss[klk].split('|')[2].toLowerCase() == 'saturn') {
				  pyoga = 1;
				}
				h_code += '</h4>';
				tklords += klordss[klk].split('|')[1] + ' ';

			}
			pyoga = 0;  //this rule may not be right, hence turning off for now, this feature available in yogas
			if(pyoga == 1) {
			  if(this.shareService.getLANG() == 'en') {
				  h_code += '<span style="color:red"><strong>The above combination forms Panch Maha Purush Yoga. The five parts of Panchmahapurush yogas give kingly life to a person. Their results does not depend on dashas only, but they do give superior success in their dasha and antra-dasha. According to Phaladeepika one such yoga makes a man lucky; two, equal to a king; three, a king; four, an emperor and five, higher to an emperor. Other admirable rajyogas if also caused simultaneously by these planets increase their excellent results, any prospect or conjunction amend these yogas.</strong></span>';
			  } else if(this.shareService.getLANG() == 'te') {
				  h_code += '<span style="color:red"><strong>ఈ కలయిక మీకు పంచ మహా పురుశ యొగా న్ని ప్రశాదిమ్చగలధు. పంచ మహా పురుశ యొగా యొక్క 5 భాగాలు మనిశిని రా రాజు చెస్తున్ది. ఈ గ్రహాల మహా దస మరియు అన్తర్ దస లో మీకు మంచి అభివ్రుధిని ఇవ్వ్ గలధు. ఫలధ్హీపిక ప్రకారము ఈ యొగ మనిశి కి మహా అధ్రుస్థమ్ ప్రసాదిస్తున్ది రాజు తో సమానమ్. ఈ యొగా తో పాతు ఇంక ఇతర మంచి యొగా లో ఈ గ్రహాలు కలిగి ఉన్తె ఫలితానిని ఇంకా మెరుగు పరుచుతున్ది</strong></span>';
			  }  else if(this.shareService.getLANG() == 'hi') {
			     h_code += '<span style="color:red"><strong>यह संयोजन आप पंच महा पुरुष योग प्राप्त कर सकते हैं।</strong></span>';
			  }

			}
		}
		if(tlord_in_tri.length > 0 || tlord_in_ken.length > 0 || klord_in_tri.length > 0 || klord_in_ken.length > 0)
		{
		   if(this.shareService.getLANG() == 'en') {
			h_code += '<span style="color:blue;"><strong>You can expect a favourable period during Maha Dasha or Antar Dasha of kendra/triknoda lord(s) ' + tklords + '</strong></span>';
			} else if(this.shareService.getLANG() == 'te') {
			  h_code += '<span style="color:blue;"><strong>ఖెన్ద్రాధిపతి/ త్రికొనాధిపతి అగు ' + this.shareService.translate_func(tklords) + ' మహా దశ/అన్తర్ దశ ల లొ మీకు మంచి అభివ్రుధి కలుగును';
			}  else if(this.shareService.getLANG() == 'hi') {
			  h_code += '<span style="color:blue;"><strong>केन्द्राधिपति/त्रिकोणादिपति '  + this.shareService.translate_func(tklords) + ' के महा दस या अंतर दस में आप को शुभ योजना प्रप्थ होसकता है';
			} else if(this.shareService.getLANG() == 'ta') {
			  h_code += 'கேந்திர/திரிகோணாபதிகளின் மகாதசை அல்லது அந்தர தசையின் போது சாதகமான பலன்களை நீங்கள் எதிர்பார்க்கலாம்';
			}
		}
		var vown = vp_owners.split('|');
		var vrul = vp_rulers.split('|');
		var bvpr = 0;
		var vprl = '';
		for(var vp1 = 0; vp1 < vown.length -1; vp1++) {
			for(var vp2 = 0; vp2 < vrul.length -1;vp2++) {
			  if(vown[vp1] == vrul[vp2]) {
			    bvpr = 1;
				if(this.shareService.getLANG() == 'en') {
					h_code += '<h4>' + vown[vp1].split('-')[1] + ' house lord ' + vown[vp1].split('-')[0] + ' is also the ruler of ' + vrul[vp2].split('-')[1] + ' house.</h4>';
					vprl += vown[vp1].split('-')[0] + ',';
				} else if(this.shareService.getLANG() == 'te') {
					h_code += '<h4>' + vown[vp1].split('-')[1] + ' అధిపతి ' + this.shareService.translate_func(vown[vp1].split('-')[0]) + ' ' + vrul[vp2].split('-')[1] + ' house.కూడా రూల్ చేస్తునారు</h4> ';
					vprl += vown[vp1].split('-')[0] + ',';
			  }  else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>' + vown[vp1].split('-')[1] + ' अधिपति ' + this.shareService.translate_func(vown[vp1].split('-')[0]) + ' ' + vrul[vp2].split('-')[1] + ' house भी रूल कररहे है</h4> ';
					vprl += vown[vp1].split('-')[0] + ',';
			  } else if(this.shareService.getLANG() == 'ta') {
					h_code += '';
			  } 

			  }
			}
		}
		bvpr = 0; //turning off as this rule may not be correct, this feature available in yogas
		if(bvpr == 1) {
			if(this.shareService.getLANG() == 'en') {
			   h_code += '<span style="color:red;"><strong>This forms Vipareet Raja Yoga which bestows the native with financial strength, higher positions, promotional advantage and profitable foreign journey during maha dasha or antar dashas of ' + vprl.replace(/^\,+,\,+$/g, '') + '.</strong></span>';
			} else if(this.shareService.getLANG() == 'te') {
			   h_code += '<span style="color:red;"><strong>ఈ పై కలయిక మీకు విపరీత్ రాజ యోగ కలుగ చెయగలదు, ఈ యోగా కారకు లైన ' + this.shareService.translate_func(vprl.replace(/^\,+,\,+$/g, '')) +  ' మహా దశ/అన్తర్ దశ ల లొ మీకు అపార ధనమును, విదెసి ప్రయానము, మంచి కీర్థిని చెకూర్చ గలరు </strong></span>';
			} else if(this.shareService.getLANG() == 'hi') {
			   h_code += '<span style="color:red;"><strong>यह संयोजन आप को विपरीत राज योग प्राप्त कर सकते है, यह योग के करक  ' + this.shareService.translate_func(vprl.replace(/^\,+,\,+$/g, '')) +  'के महा दस या अंतर दस में आप को शुभ योजना प्रप्थ होसकता है</strong></span>';
			}
		}

		//h_code += '<br\><br\><strong>CLICK ON EACH HOUSE TO REVEAL MORE<strong>';
		h_code += '<br\>';
		this.horo = h_code;
		h_code = '';
		let pcnt :number = 0;
		//this.splpos = "[";
		var zim = ['']
		for(let key of Object.keys(this.signs_v)) {
			if(this.signs_v[key] == 'na') continue;
		    var sign = this.signs_v[key];
			
		    h_code += '<h4><img src="' + this.sign_imgs_v[sign] + '" alt="rashi signs" />' + this.shareService.translate_func(this.rashis_v[sign].split('\|')[1]) + '</h4>';
			if(this.shareService.getLANG() == 'en') {
				h_code += '<span> <strong>This is your ' + this.rashis_v[sign].split('\|')[0] + ' House</strong></span><br/>';
			}  else if(this.shareService.getLANG() == 'te') {
				h_code += '<span> <strong>ఇది మీ ' + this.rashis_v[sign].split('\|')[0] + ' House</strong></span><br/>';
			}  else if(this.shareService.getLANG() == 'hi') {
				h_code += '<span> <strong>यह आप का  ' + this.rashis_v[sign].split('\|')[0] + ' House</strong></span><br/>';
			} else if(this.shareService.getLANG() == 'ta') {
				h_code += '<span></strong></span><br/>';
			}
			h_code += '<span>';
			h_code += this.house_traits_v[this.rashis_v[sign].split('\|')[0]];
			h_code += '</span><br/>';
			
			console.log(this.shareService.getLANG());
			if(this.shareService.getLANG().toLowerCase() == 'en') {
				h_code += '<span><strong>' + this.rashi_lords_v[sign] + '</strong> is the Lord of this House </span><br/>';
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				h_code += '<span><strong>ఈ House అధిపతి ' + this.shareService.translate_func(this.rashi_lords_v[sign]) + '</strong></span><br/>';
			} else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				h_code += '<span><strong>ये House के अधिपति ' + this.shareService.translate_func(this.rashi_lords_v[sign]) + ' है</strong></span><br/>';
			} else if(this.shareService.getLANG().toLowerCase() == 'ta') {
				h_code += '<span>இந்த பாவம்  அதிபதி<strong> ' + this.shareService.translate_func(this.rashi_lords_v[sign]) + '</strong> ஆவார்.</span><br/>';
			}

			var asp = this.check_aspects(sign, this.rashis_v[sign].split('\|')[0]);
			if (asp.length > 0) {
				h_code += asp;
			}
			let rps: string = '';
			if (plPos.hasOwnProperty(sign)) {
				h_code += '<br/><span>'
				var pls = plPos[sign].split('\|');
				for (k = 0; k < pls.length; k++) {
					pl = pls[k].split(' ')[1];
					if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
						h_code += this.shareService.translate_func(this.ruler_name_v[pl.toLowerCase()]) + ' ';
						rps += this.shareService.translate_func(this.ruler_name_v[pl.toLowerCase()]) + ','
						pcnt++
						this['pnam' + pcnt.toString()] = this.shareService.translate_func(this.ruler_name_v[pl.toLowerCase()].toUpperCase());
						this['pras' + pcnt.toString()] = this.shareService.translate_func(this.rashis_v[sign].split('\|')[1]);
						if(pls[k].split(' ')[0].indexOf('.') > -1)
							this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032' + pls[k].split(' ')[0].split('.')[2] + '"';
						else
						    this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
						let dval: number = this.shareService.dmsToDec(Number(pls[k].split(' ')[0].split('.')[0]), Number(pls[k].split(' ')[0].split('.')[1]), Number(pls[k].split(' ')[0].split('.')[2]));
						var star = this.calcStar(dval, sign);
						//console.log('calcStar1', dval);
						//console.log('calcStar1', sign);
						console.log('calcStar1', star);
						this['pnak'+pcnt.toString()] = this.shareService.translate_func(star.split('|')[0]);
						this['nakl'+pcnt.toString()] = this.shareService.translate_func(star.split('|')[2]);
						//this.splpos += "['" + this.shareService.translate_func(this.ruler_name_v[pl.toLowerCase()].toUpperCase()) + "','" + pls[k].split(' ')[0].split('.')[0] + "\xB0','" + this.shareService.translate_func(this.rashis_v[sign].split('\|')[1]) + "','" + this.shareService.translate_func(star.split('|')[0]) + "','" +  this.shareService.translate_func(star.split('|')[2]) + "'],"
							let planetStar: PlanetStar = {
							 pos: this['ppos' +pcnt.toString()],
							 sign: this['pras' + pcnt.toString()],
							 star: this['pnak'+pcnt.toString()],
							 star_l: this['pnakl'+pcnt.toString()]
							};
							this.oPlanet[this['pnam' + pcnt.toString()]] = planetStar;
						
					} else if (pl == 'Ra') { //consder Rahu
						h_code += this.shareService.translate_func('Rahu') + ' ';
						rps += this.shareService.translate_func('Rahu') + ',';
						pcnt++
						this['pnam' + pcnt.toString()] = this.shareService.translate_func('RAHU');
						this['pras' + pcnt.toString()] = this.shareService.translate_func(this.rashis_v[sign].split('\|')[1]);
						if(pls[k].split(' ')[0].indexOf('.') > -1)
							this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032' + pls[k].split(' ')[0].split('.')[2] + '"';
						else
						    this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
						let dval: number = this.shareService.dmsToDec(Number(pls[k].split(' ')[0].split('.')[0]), Number(pls[k].split(' ')[0].split('.')[1]), Number(pls[k].split(' ')[0].split('.')[2]));
						var star = this.calcStar(dval, sign);
						this['pnak'+pcnt.toString()] = this.shareService.translate_func(star.split('|')[0]);
						this['nakl'+pcnt.toString()] = this.shareService.translate_func(star.split('|')[2]);
							let planetStar: PlanetStar = {
							 pos: this['ppos' +pcnt.toString()],
							 sign: this['pras' + pcnt.toString()],
							 star: this['pnak'+pcnt.toString()],
							 star_l: this['pnakl'+pcnt.toString()]
							};
							this.oPlanet[this['pnam' + pcnt.toString()]] = planetStar;
					} else if (pl == 'Ke') {
						h_code += this.shareService.translate_func('Ketu') + ' ';
						rps += this.shareService.translate_func('Ketu') + ',';
						pcnt++
						this['pnam' + pcnt.toString()] = this.shareService.translate_func('KETU');
						this['pras' + pcnt.toString()] = this.shareService.translate_func(this.rashis_v[sign].split('\|')[1]);
						if(pls[k].split(' ')[0].indexOf('.') > -1)
							this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032' + pls[k].split(' ')[0].split('.')[2] + '"';
						else
						    this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
						let dval: number = this.shareService.dmsToDec(Number(pls[k].split(' ')[0].split('.')[0]), Number(pls[k].split(' ')[0].split('.')[1]), Number(pls[k].split(' ')[0].split('.')[2]));
						var star = this.calcStar(dval, sign);
						this['pnak'+pcnt.toString()] = this.shareService.translate_func(star.split('|')[0]);
						this['nakl'+pcnt.toString()] = this.shareService.translate_func(star.split('|')[2]);
							let planetStar: PlanetStar = {
							 pos: this['ppos' +pcnt.toString()],
							 sign: this['pras' + pcnt.toString()],
							 star: this['pnak'+pcnt.toString()],
							 star_l: this['pnakl'+pcnt.toString()]
							};
							this.oPlanet[this['pnam' + pcnt.toString()]] = planetStar;
					}
					else if(pl == 'AC') {
						this.anam = this.shareService.translate_func('ASC');
						this.aras = this.shareService.translate_func(this.rashis_v[sign].split('\|')[1]);
						if(pls[k].split(' ')[0].indexOf('.') > -1)
							this.apos = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032' + pls[k].split(' ')[0].split('.')[2] + '"';
						else
						    this.apos = pls[k].split(' ')[0].split('.')[0] + '\xB0';
						let dval: number = this.shareService.dmsToDec(Number(pls[k].split(' ')[0].split('.')[0]), Number(pls[k].split(' ')[0].split('.')[1]), Number(pls[k].split(' ')[0].split('.')[2]));
						var star = this.calcStar(dval, sign);
						//console.log('calcStar1', dval);
						//console.log('calcStar1', sign);
						console.log('calcStar1', star);
						this.anak= this.shareService.translate_func(star.split('|')[0]);
						this.anakl = this.shareService.translate_func(star.split('|')[2]);
					}
				}
				
				if(this.shareService.getLANG() == 'en') {
					h_code += ' ruling this house at time of your birth</span><br/>';
				} else if(this.shareService.getLANG() == 'te') {
					h_code += ' మీ పుట్టిన సమయమ్ లో ఈ House ని రూల్ చెస్తున్నారు</span><br/>';
				} else if(this.shareService.getLANG() == 'hi') {
					h_code += ' के जन्म समय में ये House को रूल कर रहे है</span><br/>';
				} else if(this.shareService.getLANG() == 'ta') {
					h_code += 'உங்கள் ஜனன காலத்தில்  ' + rps + ' கிரகம்(கள்) இந்த பாவத்தை ஆட்சி செய்திருக்கிறது/செய்திருக்கின்றன.</span><br/>';
				}
			} else {
			}
			//replaceAll(this.friend_pl_v[this.rashi_lords_v[this.rashis_v[sign].split('\|')[1]]], '\|', ' ');
			var frPls = this.friend_pl_v[this.rashi_lords_v[sign]].split('\|');
			if (frPls.length > 0) {
			   
				if(this.shareService.getLANG() == 'en') {
					h_code += '<span>' + this.rashi_lords_v[sign] + ' is Friendly with ';
					for (i = 0; i < frPls.length; i++) {
						h_code += this.ruler_name_v[frPls[i]] + ' ';
					} 
					h_code += '</span>';
				}  else if(this.shareService.getLANG() == 'te') {
					h_code += '<span>' + this.shareService.translate_func(this.rashi_lords_v[sign]) + ' మరియు ';
					for (i = 0; i < frPls.length; i++) {
						h_code += this.shareService.translate_func(this.ruler_name_v[frPls[i]]) + ' ';
					} 
					h_code += ' మిత్రులు</span>';
				}   else if(this.shareService.getLANG() == 'hi') {
					h_code += '<span>' + this.shareService.translate_func(this.rashi_lords_v[sign]) + ' और ';
					for (i = 0; i < frPls.length; i++) {
						h_code += this.shareService.translate_func(this.ruler_name_v[frPls[i]]) + ' ';
					} 
					h_code += ' मित्र है</span>';
				} else if(this.shareService.getLANG() == 'ta') {
					h_code += '<span>' + this.shareService.translate_func(this.rashi_lords_v[sign]) + ' பாவத்தின் அதிபதி ';
					for (i = 0; i < frPls.length; i++) {
						h_code += this.shareService.translate_func(this.ruler_name_v[frPls[i]]) + ' ';
					} 
					h_code += ' க்கு  நட்பானவர் </span>';
				}
			}
			if (this.rashi_lords_v[sign] != 'Moon') {  //Moon has no enemies
				var eyPls = this.enemy_pl_v[this.rashi_lords_v[sign]].split('\|');
				if (eyPls.length > 0) {
				  if(this.shareService.getLANG() == 'en') {
					h_code += '<span>, is Enemy with ';
					for (i = 0; i < eyPls.length; i++) {
						h_code += this.ruler_name_v[eyPls[i]] + ' ';
					}
					h_code += '</span><br/>';
				  } else if(this.shareService.getLANG() == 'te') {
						h_code += ' మరియు ' ;
						for (i = 0; i < eyPls.length; i++) {
							h_code += this.shareService.translate_func(this.ruler_name_v[eyPls[i]]) + ' ';
						}
						h_code += ' కి  శత్రువులు';
						h_code += '</span><br/>';
				  } else if(this.shareService.getLANG() == 'hi') {
						h_code += '  और ' ;  
						for (i = 0; i < eyPls.length; i++) {
							h_code += this.shareService.translate_func(this.ruler_name_v[eyPls[i]]) + ' ';
						}
						h_code += '  दुश्मन है';
						h_code += '</span><br/>';
				  } else if(this.shareService.getLANG() == 'ta') {
						h_code += '  மற்றும் ' ;  
						for (i = 0; i < eyPls.length; i++) {
							h_code += this.shareService.translate_func(this.ruler_name_v[eyPls[i]]) + ' ';
						}
						h_code += '  க்கு  பகையாவார்.';
						h_code += '</span><br/>';
				  }
				}
			}
		}
		//console.log('splpos=', this.splpos);
		//this.splpos = this.splpos.substring(0, this.splpos.length-1);
		//console.log('splpos after trim=', this.splpos);
		//this.splpos += "]";
		//console.log('splpos final=', this.splpos);
		
		this.akashWani = h_code;

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
 	check_aspects(sign, rpos) {
		var plPos = this.binf.ppos;//this.shareService.getPPOS(this.binf.dob);
		var chk_asp = '';
		//var rpos = this.o_this.rashis_v_v[sign].split('\|')[0];
		//check 7th aspect
		var seven_asp = '';
		var sign_7 = this.aspects_v[sign + '-7'];
		if (plPos.hasOwnProperty(sign_7)) {
			var pls = plPos[sign_7].split('\|');
			for (var k = 0; k < pls.length; k++) {
				let pl: string = pls[k].split(' ')[1];
				if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
					seven_asp += this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + ' ';
				}
			}
		}
		var five_asp = '';
		var sign_5 = this.aspects_v[sign + '-5'].split('\|')[1];
		if (plPos.hasOwnProperty(sign_5)) {
			pls = plPos[sign_5].split('\|');
			for (k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1].toLowerCase() == 'ju' ) {
					five_asp += this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + ' ';
				}
			}
		}
		var nine_asp = '';
		var sign_9 = this.aspects_v[sign + '-9'].split('\|')[1];
		if (plPos.hasOwnProperty(sign_9)) {
			pls = plPos[sign_9].split('\|');
			for (k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1].toLowerCase() == 'ju') {
					nine_asp += this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + ' ';
				}
			}
		}
		var ten_asp = '';
		var sign_10 = this.aspects_v[sign + '-10'].split('\|')[1];
		if (plPos.hasOwnProperty(sign_10)) {
			pls = plPos[sign_10].split('\|');
			for (k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1].toLowerCase() == 'sa') {
					ten_asp += this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + ' ';
				}
			}
		}
		var three_asp = '';
		var sign_3 = this.aspects_v[sign + '-3'].split('\|')[1];
		if (plPos.hasOwnProperty(sign_3)) {
			pls = plPos[sign_3].split('\|');
			for (k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1].toLowerCase() == 'sa') {
					three_asp += this.ruler_name_v[pls[k].split(' ')[1].toLowerCase()] + ' ';
				}
			}
		}
		if (seven_asp.length > 0 || five_asp.length > 0 || three_asp.length > 0 || nine_asp.length > 0 || ten_asp.length > 0) {
			if(this.shareService.getLANG().toLowerCase() == 'en') {			
				chk_asp += "<h3>This house has</h3>";
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				chk_asp += "<h3>ఈ house కి</h3>";
			}  else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				chk_asp += "<h3>ये house को</h3>";
			}  
		}
		if (seven_asp.length > 0) {
		    if(this.shareService.getLANG().toLowerCase() == 'en') {
				chk_asp += '<span><strong> 7th aspect from ' + seven_asp + '. </strong></span>';
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				chk_asp += '<span><strong>' + this.shareService.translate_func(seven_asp) + ' నుంచి 7వ దృష్టి ఉంది </strong></span>';
			}  else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				chk_asp += '<span><strong>' + this.shareService.translate_func(seven_asp) + ' से 7th दृष्टि  है</strong></span>';
			}  
		}
		if (five_asp.length > 0) {
		    if(this.shareService.getLANG().toLowerCase() == 'en') {
				chk_asp += '<span><strong> 5th aspect from ' + five_asp + '. </strong></span>';
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				chk_asp += '<span><strong>' + this.shareService.translate_func(five_asp) + ' నుంచి 5వ దృష్టి ఉంది</strong></span>';
			}  else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				chk_asp += '<span><strong>' + this.shareService.translate_func(five_asp) + ' से 5th दृष्टि  है</strong></span>';
			}  			
		}
		if (nine_asp.length > 0) {
		    if(this.shareService.getLANG().toLowerCase() == 'en') {
				chk_asp += '<span><strong> 9th aspect from ' + nine_asp + '. </strong></span>';
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				chk_asp += '<span><strong>' + this.shareService.translate_func(nine_asp) + ' నుంచి 9వ దృష్టి ఉంది</strong></span>';
			}  else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				chk_asp += '<span><strong>' + this.shareService.translate_func(nine_asp) + ' से 9th दृष्टि  है</strong></span>';
			}  			
		}
		if (three_asp.length > 0) {
		    if(this.shareService.getLANG().toLowerCase() == 'en') {
				chk_asp += '<span><strong> 3rd aspect from ' + three_asp + '. </strong></span>';
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				chk_asp += '<span><strong>' + this.shareService.translate_func(three_asp) + ' నుంచి 3వ దృష్టి ఉంది</strong></span>';
			}  else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				chk_asp += '<span><strong>' + this.shareService.translate_func(three_asp) + ' से 3th दृष्टि  है</strong></span>';
			}  			
			
		}
		if (ten_asp.length > 0) {
		    if(this.shareService.getLANG().toLowerCase() == 'en') {
				chk_asp += '<span><strong> 10th aspect from ' + ten_asp + '. </strong></span>';
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				chk_asp += '<span><strong>' + this.shareService.translate_func(ten_asp) + ' నుంచి 10వ దృష్టి  ఉంది</strong></span>';
			}  else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				chk_asp += '<span><strong>' + this.shareService.translate_func(ten_asp) + ' से 10th दृष्टि  है</strong></span>';
			}  			
		}
		chk_asp += '<br/>';
		return chk_asp;
	}
	parseDate(str) {
		var mdy = str.split('/')
		return new Date(mdy[2], mdy[0] - 1, mdy[1]);
	}

	daydiff(first, second) {
		return Math.round((second - first) / (1000 * 60 * 60 * 24));
	}

	grid(numberPerSide, size, pixelsPerSide, plps) {
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", pixelsPerSide);
		this.renderer.setAttribute(svg, "height", pixelsPerSide);
		this.renderer.setAttribute(svg, "viewBox", [0, 0, numberPerSide * size, numberPerSide * size].join(" "));
        var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
		var s1 = 24;
		var xp = size - 24;
        var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-0");
		this.renderer.setAttribute(pattern,"patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
        var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/XFXS4vf.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);

        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-1");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/Fo8bboN.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-2");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/xFmaeBF.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-3");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/5WRr5Ki.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
        pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-4");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
        image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/xCYOz4A.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-7");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/Hxhvh6c.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-8");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/7JLgHKU.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-11");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/aUmKT4G.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-12");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/SZdChh9.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-13");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/SCqbk62.png");

		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-14");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/nqQnnFY.png");

		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		this.renderer.setAttribute(pattern, "id", "sign-15");
		this.renderer.setAttribute(pattern, "patternUnits", "userSpaceOnUse");
		this.renderer.setAttribute(pattern, "height", size.toString());
		this.renderer.setAttribute(pattern, "width", size.toString());
		image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", xp.toString());
		this.renderer.setAttribute(image, "y", "0");
		this.renderer.setAttribute(image, "height", s1.toString());
		this.renderer.setAttribute(image, "width", s1.toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href",
							 "https://i.imgur.com/t4KBJ4z.png");
		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		this.renderer.appendChild(svg, defs);
		var border = 1;
		var s2 = size * 2;
		var s3 = size;
		var s5 = s3-14;
		var s4 = 15;
		//var s5 = size * 2 / 2;
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
						this.renderer.setAttribute(box, "stroke", "#d35400");
						this.renderer.setAttribute(box, "fill", "#ffd9a3");
						this.renderer.setAttribute(box, "id", "b" + number);
						this.renderer.appendChild(g, box);
						var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						this.renderer.appendChild(text, document.createTextNode(this.binf.name));
						this.renderer.setAttribute(text, "fill", "#d35400");
						this.renderer.setAttribute(text, "font-size", "1.35rem");
						this.renderer.setAttribute(text, "font-weight", "bold");
						this.renderer.setAttribute(text, "alignment-baseline", "middle");
						this.renderer.setAttribute(text, "text-anchor", "middle");
						this.renderer.setAttribute(text, "x", s3.toString());
						this.renderer.setAttribute(text, "y", (s5).toString());
						//this.renderer.setAttribute(text, "text-align", "center");
						this.renderer.setAttribute(text, "id", "t" + number);
						g.appendChild(text);
						text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						this.renderer.appendChild(text, document.createTextNode(db));
						this.renderer.setAttribute(text, "fill", "#d35400");
						this.renderer.setAttribute(text, "font-size", "0.8rem");
						this.renderer.setAttribute(text, "font-weight", "bold");
						this.renderer.setAttribute(text, "alignment-baseline", "middle");
						this.renderer.setAttribute(text, "text-anchor", "middle");
						this.renderer.setAttribute(text, "x", s3.toString());
						this.renderer.setAttribute(text, "y", (s5+14).toString());
						//this.renderer.setAttribute(text, "text-align", "center");
						this.renderer.setAttribute(text, "id", "st" + number);
						g.appendChild(text);
						text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						this.renderer.appendChild(text, document.createTextNode(latlng));
						this.renderer.setAttribute(text, "fill", "#d35400");
						this.renderer.setAttribute(text, "font-size", "0.8rem");
						this.renderer.setAttribute(text, "font-weight", "bold");
						this.renderer.setAttribute(text, "alignment-baseline", "middle");
						this.renderer.setAttribute(text, "text-anchor", "middle");
						this.renderer.setAttribute(text, "x", s3.toString());
						this.renderer.setAttribute(text, "y", (s5+28).toString());
						//this.renderer.setAttribute(text, "text-align", "center");
						this.renderer.setAttribute(text, "id", "stt" + number);
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
				var sign = "url(#sign-" + (number).toString() + ")";
				this.renderer.setAttribute(box, "width", size.toString());
				this.renderer.setAttribute(box, "height", size.toString());
				this.renderer.setAttribute(box, "stroke", (this.signs_v[number] == this.asc_sign) ? "#FF5733" : "#d35400");
				this.renderer.setAttribute(box, "stroke-width", (this.signs_v[number] == this.asc_sign) ? (border+2).toString() : border.toString());
				this.renderer.setAttribute(box, "fill", sign);
				this.renderer.setAttribute(box, "id", "b" + number.toString());
				this.renderer.appendChild(g, box);
				sign = this.signs_v[number];
				if (plps.hasOwnProperty(sign)) {
					//var pls = replaceAll(plps[sign], '\|', '');
					//var pls = plps[sign].replace(/\|/g, ' ');
					var pls = plps[sign].split('\|');
					var pcnt = 0;
					var s6 = 10;
					var s7 = 5;
					for (var k = 0; k < pls.length; k++) {
						if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
						if (pls[k].split(' ')[1] == 'AC') this.asc_sign = sign;
						else if (pls[k].split(' ')[1] == 'Mo') {
							this.moon_sign = sign;
							this.moon_deg = pls[k].split(' ')[0];
						}
						pcnt++;
						text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						var plt = pls[k];
						if(this.binf.retro.indexOf(pls[k].split(' ')[1]) > -1) plt += '[R]';
						this.renderer.appendChild(text, document.createTextNode(plt));
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
		for (i = 0; i < 12; i++) {
			if (this.o_signs_v[i] == this.asc_sign) {
				//if (plPos.hasOwnProperty(this.asc_sign)) {
					this.trikona_lords = this.rashi_lords_v[this.o_signs_v[i]];
					this.kendra_lords = this.rashi_lords_v[this.o_signs_v[i]];
				//}
				var as = 1;
				this.rashis_v[this.asc_sign] = '1|' + this.rashis_v[this.asc_sign].split('\|')[1];
				for (j = i + 1; j < 12; j++) {
					as++;
					this.rashis_v[this.o_signs_v[j]] = (as).toString() + '|' + this.rashis_v[this.o_signs_v[j]].split('\|')[1];
					//if (plPos.hasOwnProperty(this.o_signs_v[j])) {
						if (as == 5 || as == 9) {
							this.trikona_lords = this.trikona_lords + '|' + this.rashi_lords_v[this.o_signs_v[j]];
						}
						else if (as == 4 || as == 7 || as == 10) {
							this.kendra_lords = this.kendra_lords + '|' + this.rashi_lords_v[this.o_signs_v[j]];
						}
					//}
				}
				for (k = 0; k < i; k++) {
					var hno = ((12 - i) + (k + 1));
					this.rashis_v[this.o_signs_v[k]] = hno.toString() + '|' + this.rashis_v[this.o_signs_v[k]].split('\|')[1];
					//if (plPos.hasOwnProperty(this.o_signs_v[k])) {
						if (hno == 5 || hno == 9) {
							this.trikona_lords = this.trikona_lords + '|' + this.rashi_lords_v[this.o_signs_v[k]];
						}
						else if (hno == 4 || hno == 7 || hno == 10) {
							this.kendra_lords = this.kendra_lords + '|' + this.rashi_lords_v[this.o_signs_v[k]];
						}
					//}
				}
			}
		}
        //console.log('svg', svg);
		return svg;
	};
	replaceAll(str, find, replace) {
		return str.replace(new RegExp(find, 'g'), replace);
	};
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
	this.router.navigate(['/astrologers', {queryParams: {title: 'Talk to Astrologer'}}]);
	}	
	bchart(numberPerSide, size, pixelsPerSide, plps) {
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", pixelsPerSide);
		this.renderer.setAttribute(svg, "height", pixelsPerSide);
		this.renderer.setAttribute(svg, "viewBox", [0, 0, numberPerSide * size, numberPerSide * size].join(" "));
       // var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        //var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		//var s1 = size/2;
		var border = 1;
		var s2 = size * 2;
		var s3 = size;
		var s4 = 15;
		//var s5 = size * 2 / 2;
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
						this.renderer.appendChild(text, document.createTextNode("BIRTH CHART"));
						this.renderer.setAttribute(text, "fill", "#ffffff");
						this.renderer.setAttribute(text, "font-size", s4.toString());
						this.renderer.setAttribute(text, "font-weight", "bold");
						this.renderer.setAttribute(text, "alignment-baseline", "middle");
						this.renderer.setAttribute(text, "text-anchor", "middle");
						this.renderer.setAttribute(text, "x", s3.toString());
						this.renderer.setAttribute(text, "y", s3.toString());
						//this.renderer.setAttribute(text, "text-align", "center");
						this.renderer.setAttribute(text, "id", "t" + number);
						g.appendChild(text);
						text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						this.renderer.appendChild(text, document.createTextNode(this.binf.dob));
						this.renderer.setAttribute(text, "fill", "#ffffff");
						this.renderer.setAttribute(text, "font-size", s4.toString());
						this.renderer.setAttribute(text, "font-weight", "bold");
						this.renderer.setAttribute(text, "alignment-baseline", "middle");
						this.renderer.setAttribute(text, "text-anchor", "middle");
						this.renderer.setAttribute(text, "x", s3.toString());
						this.renderer.setAttribute(text, "y", (s3+12).toString());
						//this.renderer.setAttribute(text, "text-align", "center");
						this.renderer.setAttribute(text, "id", "st" + number);
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
				this.renderer.setAttribute(box, "stroke", (this.signs_v[number] == this.asc_sign) ? "#FF5733" : "#000000");
				this.renderer.setAttribute(box, "stroke-width", (this.signs_v[number] == this.asc_sign) ? (border+2).toString() : border.toString());
				this.renderer.setAttribute(box, "fill", sign);
				this.renderer.setAttribute(box, "id", "b" + number.toString());
				this.renderer.appendChild(g, box);
				sign = this.signs_v[number];
				if (plps.hasOwnProperty(sign)) {
					//var pls = replaceAll(plps[sign], '\|', '');
					//var pls = plps[sign].replace(/\|/g, ' ');
					var pls = plps[sign].split('\|');
					var pcnt = 0;
					var s6 = 10;
					var s7 = 5;
					
					for (var k = 0; k < pls.length; k++) {
						if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
						if (pls[k].split(' ')[1] == 'AC') this.asc_sign = sign;
						else if (pls[k].split(' ')[1] == 'Mo') {
							this.moon_sign = sign;
							this.moon_deg = pls[k].split(' ')[0];
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

		return svg;
	};
	
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
		//this.renderer.setAttribute(svg, "viewBox", [0, 0, numberPerSide * size, numberPerSide * size].join(" "));
        //var defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        //var pattern = document.createElementNS("http://www.w3.org/2000/svg", "pattern");
		//var s1 = size/2;
		//var border = 1;
		//var s2 = size * 2;
		//var s3 = size;
		//var s4 = 15;
		var bxz = size/4;
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
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
		var hcord = this.getHXY(1, this.device_width);
		var htxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(htxt, document.createTextNode(roms[ah-1]));
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
			this.renderer.appendChild(htxt, document.createTextNode(roms[ch-1]));
			this.renderer.setAttribute(htxt, "fill", "#d35400");
			this.renderer.setAttribute(htxt, "font-size", s6.toString());
			this.renderer.setAttribute(htxt, "font-weight", "bold");
			this.renderer.setAttribute(htxt, "alignment-baseline", "middle");
			this.renderer.setAttribute(htxt, "text-anchor", "middle");
			this.renderer.setAttribute(htxt, "x", (Math.floor(hcord[0])).toString());
			this.renderer.setAttribute(htxt, "y", (Math.floor(hcord[1])).toString());
			this.renderer.setAttribute(htxt, "id", "RH" + ch.toString());
			this.renderer.appendChild(g, htxt);
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
    //console.log('nsvg', svg);
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
			x2 = side*2;
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
			x2 = side*2;
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
 chgayan(event)
 {
   event.stopPropagation();
   console.log('binf', this.binf);
   this.binf.ref = '1';
   //this.oDas = [];
   let me = this;
   me.zone.run(() => {
		me.router.navigate(['/chart-settings'], {state: me.binf});
   });
 }
 shadb()
 {
   this.router.navigate(['/shad-bala'], {state: this.shd});
 }	 
 astak()
 {
   this.router.navigate(['/astakvarga'], {state: this.akv});
 }	 
 ontoggle(event, das)
 {
   console.log('ontoggle', das);
   event.stopPropagation();
   for(var i = 0; i < this.oDas.length; i++) {
     if(das.type == 'MDAS' && this.oDas[i].type == 'ADAS') {
		if(this.oDas[i].lord.split('-')[0].toLowerCase() == das.lord.toLowerCase()) (das.icon == 'add') ? this.oDas[i].show = true : this.oDas[i].show = false;
	 } else if(das.type == 'MDAS' && das.icon != 'add' && this.oDas[i].type == 'PDAS') {
	    // if(this.shareService.getLANG().toLowerCase() == 'en') {
			// if(this.oDas[i].lord.split('-')[0].toLowerCase() == das.lord.substring(0,2).toLowerCase()) this.oDas[i].show = false; 
		// } else {
			 if(this.oDas[i].lord.split('-')[0] == das.lord) this.oDas[i].show = false; 
		 //}
	 } else if(das.type == 'ADAS' && this.oDas[i].type == 'PDAS') {
	    // if(this.shareService.getLANG().toLowerCase() == 'en') {
			 if(this.oDas[i].lord.split('-')[0].toLowerCase() + '-' + this.oDas[i].lord.split('-')[1].toLowerCase() == das.lord.split('-')[0].toLowerCase() + '-' + das.lord.split('-')[1].substring(0,2).toLowerCase()) (das.icon == 'add') ? this.oDas[i].show = true : this.oDas[i].show = false; 
		// } else {
			// if(this.oDas[i].lord.split('-')[0]+'-'+ this.oDas[i].lord.split('-')[1] == das.lord.split('-')[0]+'-'+das.lord.split('-')[1]) (das.icon == //'add') ? this.oDas[i].show = true : this.oDas[i].show = false; 
		// }
	 }
   }
   (das.icon == 'add') ? das.icon = 'remove' : das.icon = 'add';
 }
 nakdtl() {
	 this.router.navigate(['/nak-info'], {queryParams : {name: this.birth_star.split(' ')[0]}});
 }
 dosdtl(nam) {
	 let dosha: any = {};
	 dosha.nam = nam;
	 if(this.binf.dohs) {
		if(this.binf.dohs.hasOwnProperty(nam))
			dosha.dtl = this.binf.dohs[nam];
		else
		    dosha.dtl = 'Not Exist';
	 } else {
		 dosha.dtl = 'Not Exist';
	 }
	 this.router.navigate(['/dosha-info'], {state: dosha});
 }
}
