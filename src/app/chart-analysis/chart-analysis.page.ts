import { Component, Renderer2, AfterViewInit, ViewChild, ElementRef, OnInit, NgModule, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';
import { PlanetDeity } from '../planet-deity';
import { PlanetRashi } from '../planet-rashi';
import * as signs from '../signs.json';
import * as o_signs from '../o_signs.json'
import * as rashis from '../rashis.json';
import * as o_rashis from '../o_rashis.json';
import * as sign_imgs from '../sign_imgs.json';
import * as ruler_name from '../ruler_name.json';
import * as rashi_lords from '../rashi_lords.json';
import * as friend_pl from '../friend_pl.json';
import * as neutral_pl from '../neutral_pl.json';
import * as enemy_pl from '../enemy_pl.json';
import * as dcharts from './dcharts.json';
import * as dcharts_ta from './dcharts_ta.json';
import * as istadevta from './istadevta.json';
import * as deities from './deities.json';
declare var admob;
@Component({
  selector: 'app-chart-analysis',
  templateUrl: './chart-analysis.page.html',
  styleUrls: ['./chart-analysis.page.scss'],
})
export class ChartAnalysisPage implements OnInit, AfterViewInit {
  @ViewChild('divChart', {static: true}) divChart;
  signs_v: any = (signs as any).default;
  o_signs_v: any = (o_signs as any).default;
  rashis_v: any = (rashis as any).default;
  o_rashis_v: any = (o_rashis as any).default;
  sign_imgs_v: any = (sign_imgs as any).default;
  ruler_name_v: any =(ruler_name as any).default;
  rashi_lords_v: any = (rashi_lords as any).default;
  friend_pl_v: any = (friend_pl as any).default;
  neutral_pl_v: any = (neutral_pl as any).default;
  enemy_pl_v: any = (enemy_pl as any).default;
  //aspects_v: any = (aspects as any).default;
  //house_traits_v: any = (house_traits as any).default;
  dcharts_v: any = (dcharts as any).default;
  dcharts_ta_v: any = (dcharts_ta as any).default;
  istadevta_v: any = (istadevta as any).default;
  deities_v: any = (deities as any).default;
  svgHoro: any;
  title: string = '';
  asc_sign :string = '';
  hasc_sign :string = '';
  trikona_lords :string = '';
  kendra_lords :string = '';
  device_width :number = 0;
  device_height :number = 0;
  akashWani :string = '';
  chart_id: string = '';
  atmk: string = '';
  oPlanet :PlanetDeity[] = [];
  oPR :PlanetRashi[] = [];
  showLS: boolean = false;
  objectKeys = Object.keys;
  binf: any;

  constructor(private router: Router, private menu: MenuController, public renderer: Renderer2, el: ElementRef, public platform: Platform, public shareService: ShareService, public horoService: HoroscopeService) { 
    	platform.ready().then((readySource) => {
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
	});

  }

  ngOnInit() {
	var item = this.router.getCurrentNavigation().extras.state;
    this.chart_id = item.ID;
	this.atmk = item.atmk;
	this.binf = item.binf;
   	  this.shareService.getPLAN()
		   .then(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
			//admob.setDevMode(true);
		admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/7030709643',
			  ios: 'ca-app-pub-8442845715303800/7030709643',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/7030709643',
				ios: 'ca-app-pub-8442845715303800/7030709643',
			  })
			}, 10000)
		  })
 		}
	 });
 }
 ngAfterViewInit() {
	let plPos = this.updateNodePos();
	console.log('plpos', plPos);
	for (var i = 0; i < 16; i++) {
		var sign = this.signs_v[i];
		if (plPos.hasOwnProperty(sign)) {
			var pls = plPos[sign].split('\|');
			console.log(pls);
			for (var k = 0; k < pls.length; k++) {
				let pl = pls[k].split(' ')[1];
				if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
					let pn: string = this.translate(this.ruler_name_v[pl.toLowerCase()].toUpperCase());
					let planetRashi: PlanetRashi = {
						pos: pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032' + pls[k].split(' ')[0].split('.')[2] + '"',
						sign: this.translate(this.rashis_v[sign].split('\|')[1]),
						star: '',
						star_l: '',
						sign_x: '' 
					};
					this.oPR[pn] = planetRashi;
				} else if (pl == 'Ra') { //consder Rahu
					let pn: string = this.translate(this.ruler_name_v[pl.toLowerCase()].toUpperCase());
					let planetRashi: PlanetRashi = {
						pos: pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032' + pls[k].split(' ')[0].split('.')[2] + '"',
						sign: this.translate(this.rashis_v[sign].split('\|')[1]),
						star: '',
						star_l: '',
						sign_x: '' 
					};
					this.oPR[pn] = planetRashi;
				} else if (pl == 'Ke') {
					let pn: string = this.translate(this.ruler_name_v[pl.toLowerCase()].toUpperCase());
					let planetRashi: PlanetRashi = {
						pos: pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032' + pls[k].split(' ')[0].split('.')[2] + '"',
						sign: this.translate(this.rashis_v[sign].split('\|')[1]),
						star: '',
						star_l: '',
						sign_x: '' 
					};
					this.oPR[pn] = planetRashi;
				} else if(pl == 'AC') {
					let planetRashi: PlanetRashi = {
						pos: pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032' + pls[k].split(' ')[0].split('.')[2] + '"',
						sign: this.translate(this.rashis_v[sign].split('\|')[1]),
						star: '',
						star_l: '',
						sign_x: '' 
					};
					this.oPR['ASC'] = planetRashi;
				}
			}
		}
	}
	
	this.asc_sign  = '';
	this.trikona_lords  = '';
	this.kendra_lords  = '';
	this.akashWani = '';
	 console.log(this.chart_id);
	 let title: string = 'RASHI CHART';
	 let id: number = 1;
	 switch(this.chart_id)
	 {
		case 'D1':
			title = 'RASHI CHART';
			id = 1;
			break;
		case 'D2':
			title = 'HORA CHART';
			id = 2;
			break;
		case 'D3':
			title = 'DRESHKANA'
			id = 3;
			break;
		case 'D4':
			title = 'CHATHURTHAMSA';
			id = 4;
			break;
		case 'D7':
			title = 'SAPTAMSA';
			id = 7;
			break;
		case 'D9':
			title = 'NAVAMSA';
			id = 9;
			break;
		case 'D10':
			title = 'DASAMSA';
			id = 10;
			break;
		case 'D12':
			title = 'DWADASAMSA';
			id = 12;
			break;
		case 'D16':
			title = 'SHODASAMSA';
			id = 16;
			break;
		case 'D20':
			title = 'VIMSAMSA';
			id = 20;
			break;
		case 'D24':
			title = 'CHATURVIMSAMSA';
			id = 24;
			break;
		case 'D27':
			title = 'SAPTAVIMSAMSA';
			id = 27;
			break;
		case 'D30':
			title = 'TRIMASAMSA';
			id = 30
			break;
		case 'D40':
			title = 'KHAVEDAMSA';
			id = 40;
			break;
		case 'D45':
			title = 'AKSHAVEDAMSA';
			id = 45;
			break;
		case 'D60':
			title = 'SHASTAMSA';
			id = 60;
			break;
		default:
			title = 'RASHI CHART';
			id = 1;
			break;
	 }
	 //this.updateNodePos();
	 this.title = title + ' Analysis';
	 
    this.platform.ready().then((readySource) => {
	 let oP: string[] = [];
	 oP = (this.chart_id == 'D2') ? this.calcHoraChart() : this.calcDivChart(id, plPos);
	 this.loadHoro(oP, this.divChart.nativeElement, title, id);
	 
	 if(this.shareService.getLANG() == 'en')
		this.akashWani = this.dcharts_v[this.chart_id];
	 else if(this.shareService.getLANG() == 'ta')
		this.akashWani = '<span><strong>' + this.dcharts_ta_v[this.chart_id] + '</strong></span>';
	 else
		this.akashWani = this.dcharts_v[this.chart_id];
	if(this.chart_id == 'D2') {
		this.analyzHora(oP);
	} else if(this.chart_id == 'D3') {
		this.analyzeD3();
	} else if(this.chart_id == 'D4') {
		this.analyzeD4();
	} else if(this.chart_id == 'D7') {
		this.analyzeD7();
	} else if(this.chart_id == 'D9') {
		this.analyzeNav(oP);
	} else if(this.chart_id == 'D10') {
		//this.analyzeD10(oP);
	} else if(this.chart_id == 'D60') {
	  this.showLS = true;
	}
	});
	
  }
  analyzeD4()
  {
     this.akashWani = '<strong>Analyzing chart please wait..</strong>';
  		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);

  		this.horoService.analyzeD4(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, this.shareService.getLANG(), ayanid)
			.subscribe(res2 => {
			    this.akashWani = this.dcharts_v[this.chart_id];
				let yogas = res2;
				for(let key of Object.keys(yogas)) {
					this.akashWani += yogas[key];
				}
			}, (err) => {
							//this.info = JSON.stringify(err);
			});

  }
  analyzeD3()
  {
     this.akashWani = '<strong>Analyzing chart please wait..</strong>';
  		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);

  		this.horoService.analyzeD3(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, this.binf.dstofset, this.shareService.getLANG(), ayanid)
			.subscribe(res2 => {
			    this.akashWani = this.dcharts_v[this.chart_id];
				let yogas = res2;
				for(let key of Object.keys(yogas)) {
					this.akashWani += '<strong><br>' + yogas[key] + '<br></strong>';
				}
			}, (err) => {
							//this.info = JSON.stringify(err);
			});

  }
  analyzeD7()
  {
     this.akashWani = '<strong>Analyzing chart please wait..</strong>';
  		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);

  		this.horoService.analyzeD7(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.gender, this.binf.timezone, this.binf.dstofset, this.shareService.getLANG(), ayanid)
			.subscribe(res2 => {
			    this.akashWani = this.dcharts_v[this.chart_id];
				let yogas = res2;
				for(let key of Object.keys(yogas)) {
					this.akashWani += '<strong><br>' + yogas[key] + '<br></strong>';
				}
			}, (err) => {
							//this.info = JSON.stringify(err);
			});

  }
	translate(lord: string)
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
			default:
				trn = lord;
				break;
		}
		return trn;
	}
  analyzeNav(plPos)
  {
     this.akashWani = '<strong>Analyzing chart please wait..</strong>';
  		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);

  		this.horoService.analyzeD9(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, this.binf.dstofset, this.shareService.getLANG(), ayanid)
			.subscribe(res2 => {
			    this.akashWani = '<h2>Why Navamsha Chart Is Important</h2>';
			    this.akashWani += this.dcharts_v[this.chart_id];
				let ar: string = '';
				console.log('finding atm rashi in nav chart', this.atmk);
				for (var i = 0; i < 16; i++) {
					var sign = this.signs_v[i];
					if (plPos.hasOwnProperty(sign)) {
						var pls = plPos[sign].split('\|');
						console.log(pls);
						for (var k = 0; k < pls.length; k++) {
							if(pls[k].split(' ')[1] == this.atmk) { ar = sign; break; }
						}
					}
				}
				console.log('rashi is', ar);
				var arr = ['ar','ta','ge','cn','le','vi','li','sc','sa','cp','aq','pi'];
				let pos: number = 0;
				let basc: boolean = false;
				let istp: string = '';
				let kks: string = '';
				console.log('locating 12 house planets from rashi');
				for(var k = 0; k < 12; k++) {
				  if(arr[k] == ar) { console.log('ak sign match', arr[k]); basc = true};
				  if(basc) pos++;
				  if(pos == 12) { 
					  //istd = arr[k]; 
					  if (plPos.hasOwnProperty(arr[k])) {
						var pls = plPos[arr[k]].split('\|');
						console.log(pls);
						for (var j = 0; j < pls.length; j++) {
						   var pl = pls[j].split(' ')[1];
							if (pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE' && pl != 'TR') istp += pl + ',';
						}
					}
					console.log('12th sign', arr[k]);
					kks = arr[k];
					
					break; 
				  }
				  if(k == 11) k = -1;
				}
				this.akashWani += '<h3>Your Atmakaraka & Istadivam(s)</h3>';
				console.log('12 house planets are', istp);
				let esp: string = (istp == '') ? ' No planets occupied.' : istp + ' occupied';
				let hes: string = (istp == '') ? ' Hence your Istadivam is the deity belong to house lord ' + this.rashi_lords_v[kks] : ' Hence your Istadivam is the diety belong to planet(s) ' + istp;
				this.akashWani += 'Your Atmakaraka is ' + this.ruler_name_v[this.atmk.toLowerCase()] + '<br>';
				this.akashWani += 'In your NAVAMSA chart, Atmakaraka has occupied ' + this.rashis_v[ar].split('|')[1] + ' which is your Karakamsha<br>';
				this.akashWani += 'Your Istadivam to be looked at the 12th sign from Karakamsha which is ' + this.rashis_v[kks].split('|')[1] + '<br>';
				this.akashWani += 'In ' + this.rashis_v[kks].split('|')[1] +  ' ' + esp + '<br>';
				this.akashWani += hes;
				var kpl = istp.split(',');
				let istdevs: string = '';
				
				if(istp == '') {
				   istdevs = this.istadevta_v[this.rashi_lords_v[kks].substring(0,2).toLowerCase()];
				} else  {
				  for(var p = 0; p < kpl.length; p++) {
					istdevs += this.istadevta_v[kpl[p].toLowerCase()] + ',';
					}
				}
				this.akashWani += '<br>Your Istadivam is: ' + istdevs ;
				this.akashWani += '<h2>Detailed Analysis</h2>';
				let yogas = res2;
				for(let key of Object.keys(yogas)) {
					this.akashWani += yogas[key];
				}
			}, (err) => {
							//this.info = JSON.stringify(err);
			});
	
	
  }
  analyzHora(plPos)
  {
	this.akashWani += '<br><br><span class="note"><strong>In below analysis each graha based on its signification will be assigned some weightege, based on which the total sum is calculated for Cancer & Leo houses. </strong></span><br><br>';

    //var this.signs_v = ['cn','le'];
	let cn_p: number = 0, le_p: number = 0;
	let ju: number = 0, ve: number = 0, me: number = 0, mo: number = 0, su: number = 0, ma: number = 0, sa: number = 0;
	var ju_i = [], ve_i = [], me_i = [], mo_i = [], su_i = [], ma_i = [], sa_i = [];
	for(var i = 0; i < this.signs_v.length; i++) {
		var sign = this.signs_v[i];
		if (plPos.hasOwnProperty(sign)) {
			var pls = plPos[sign].split('\|');
			for (k = 0; k < pls.length; k++) {
				var pl = pls[k].split(' ')[1];
				if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
					var fp = 0;	
					if(sign == 'cn' && pl == 'Ju') {
						ju += 5;   //RULE-1 check if Ju is in cn(exalted sign)
						ju_i.push('Exaled Jupiter in Cancer gains 5 points');
					}
					if(sign == 'cn' && pl == 'Mo') {
						mo += 4;   //RULE-2 check if planet in its own sign
						mo_i.push('Lord of Cancer Moon in Cancer gains 4 points');
					}
					if(sign == 'le' && pl == 'Su') {
						su += 4;   //RULE-2 check if planet in its own sign
						su_i.push('Lord of Leo Sun in Leo gains 4 points');
					}
					var frPls = this.friend_pl_v[this.rashi_lords_v[sign]].split('\|');
					console.log('Friendly planets for ' + this.rashi_lords_v[sign] + ' are ' + frPls);
					for(fp = 0; fp < frPls.length; fp++) {
					    console.log(frPls[fp], pl.toLowerCase());
						if(frPls[fp] == pl.toLowerCase()) {
							 console.log('matched');
							//(frPls[fp] == 'su') ? ju += 3 : (frPls[fp] == 'mo') ? mo += 3 : (frPls[fp] == 'ju') ? ju += 3 : (frPls[fp] == 've') ? ve += 3 : //(frPls[fp] == 'me') ? me += 3 : (frPls[fp] == 'ma') ? ma += 3 : (frPls[fp] == 'sa') ? sa += 3 : sa = 0;
						
							switch(frPls[fp])
							{
								case 'ju':
									ju += 3;
									ju_i.push('Jupiter in friendly sign gains 3 points');
									break;
								case 've':
									ve += 3;
									ve_i.push('Venus in friendly sign gains 3 points');
									break;
								case 'me':
									me += 3;
									me_i.push('Mercury in friendly sign gains 3 points');
									break;
								case 'mo':
									mo += 3;
									mo_i.push('Moon in friendly sign gains 3 points');
									break;
								case 'su':
									su += 3;
									su_i.push('Sun in friendly sign gains 3 points');
									break;
								case 'ma':
									if(sign != 'cn') {
										ma += 3;
										ma_i.push('Mars in friendly sign gains 3 points');
									} else {
										ma_i.push('Debilitated Mars in Cancer gains 0 points');
									}
									break;
								case 'sa':
									sa += 3;
									sa_i.push('Saturn in friendly sign gains 3 points');
									break;
								default:
									break;
							}	
						}
					}
					frPls = this.neutral_pl_v[this.rashi_lords_v[sign]].split('\|');
					console.log('Neutral planets for ' + this.rashi_lords_v[sign] + ' are ' + frPls);
					for(fp = 0; fp < frPls.length; fp++) {
						if(frPls[fp] == pl.toLowerCase()) {
							//(frPls[fp] == 'su') ? su += 2 : (frPls[fp] == 'mo') ? mo += 2 : (frPls[fp] == 'ju') ? ju += 2 : (frPls[fp] == 've') ? ve += 2 : //(frPls[fp] == 'me') ? me += 2 : (frPls[fp] == 'ma') ? ma += 2 : (frPls[fp] == 'sa') ? sa += 2 : sa = 0;
						
							switch(frPls[fp])
							{
								case 'ju':
									ju += 2;
									ju_i.push('Jupiter in neutral sign gains 2 points');
									break;
								case 've':
									ve += 2;
									ve_i.push('Venus in neutral sign gains 2 points');
									break;
								case 'me':
									me += 2;
									me_i.push('Mercury in neutral sign gains 2 points');
									break;
								case 'mo':
									mo += 2;
									mo_i.push('Moon in neutral sign gains 2 points');
									break;
								case 'su':
									su += 2;
									su_i.push('Sun in neutral sign gains 2 points');
									break;
								case 'ma':
									if(sign != 'cn') {
										ma += 2;
										ma_i.push('Mars in neutral sign gains 2 points');
									}
									break;
								case 'sa':
									sa += 2;
									sa_i.push('Saturn in neutral sign gains 2 points');
									break;
								default:
									break;
							}
						}
					}
					frPls = this.enemy_pl_v[this.rashi_lords_v[sign]].split('\|');
					console.log('Enemy planets for ' + this.rashi_lords_v[sign] + ' are ' + frPls);
					for(fp = 0; fp < frPls.length; fp++) {
						if(frPls[fp] == pl.toLowerCase()) {
							//(frPls[fp] == 'su') ? su += 1 : (frPls[fp] == 'mo') ? mo += 1 : (frPls[fp] == 'ju') ? ju += 1 : (frPls[fp] == 've') ? ve += 1 : //(frPls[fp] == 'me') ? me += 1 : (frPls[fp] == 'ma') ? ma += 1 : (frPls[fp] == 'sa') ? sa += 1 : sa = 0;
					
							switch(frPls[fp])
							{
								case 'ju':
									ju += 1;
									ju_i.push('Jupiter in enemy sign gains 1 point');
									break;
								case 've':
									ve += 1;
									ve_i.push('Venus in enemy sign gains 1 point');
									break;
								case 'me':
									me += 1;
									me_i.push('Mercury in enemy sign gains 1 point');
									break;
								case 'mo':
									mo += 1;
									mo_i.push('Moon in enemy sign gains 1 point');
									break;
								case 'su':
									su += 1;
									su_i.push('Sun in enemy sign gains 1 point');
									break;
								case 'ma':
									if(sign != 'cn') {
										ma += 1;
										ma_i.push('Mars in enemy sign gains 1 point');
									} 
									break;
								case 'sa':
									sa += 1;
									sa_i.push('Saturn in enemy sign gains 1 point');
									break;
								default:
									break;
							}
						}						
					}
					console.log('su=',su);
					console.log('mo=',mo);
					console.log('ju=',ju);
					console.log('ve=',ve);
					console.log('me=',me);
					console.log('ma=',ma);
					console.log('sa=',sa);
					switch(pl.toLowerCase())
					{
						case 'ju':
							(sign == 'le') ? ju *= 2 : ju /= 2;
							ju_i.push((sign == 'le') ? 'Jupiter is in the sign of its own gender thus doubles the points to ' + ju.toString() : 'Jupiter is in the sign of its opposite gender thus loses its points to half ' + ju.toString() );
							break;
						case 've':
							(sign == 'cn') ? ve *= 2 : ve /= 2;
							ve_i.push((sign == 'cn') ? 'Venus is in the sign of its own gender thus doubles the points to ' + ve.toString() : 'Venus is in the sign of its opposite gender thus loses its points to half ' + ve.toString() );
							break;
						case 'mo':
							(sign == 'cn') ? mo *= 2 : mo /= 2;
							mo_i.push((sign == 'cn') ? 'Moon is in the sign of its own gender thus doubles the points to ' + mo.toString() : 'Moon is in the sign of its opposite gender thus loses its points to half ' + mo.toString() );
							break;
						case 'su':
							(sign == 'le') ? su *= 2 : su /= 2;
							su_i.push((sign == 'le') ? 'Sun is in the sign of its own gender thus doubles the points to ' + su.toString() : 'Sun is in the sign of its opposite gender thus loses its points to half ' + su.toString() );
							break;
						case 'ma':
							(sign == 'le') ? ma *= 2 : ma /= 2;
							ma_i.push((sign == 'le') ? 'Mars is in the sign of its own gender thus doubles the points to ' + ma.toString() : 'Mars is in the sign of its opposite gender thus loses its points to half ' + ma.toString() );
							break;
						default:
							break;
					}	
				}
			}
		}
	}
	for(var p = 0; p < su_i.length; p++) {
		this.akashWani += '<span>' + su_i[p] + '</span><br/>';
	}
	this.akashWani += '<span>TOTALLY SUN GAINS ' + su.toString() + ' POINTS</span><br/><br/>';
	for(var p = 0; p < mo_i.length; p++) {
		this.akashWani += '<span>' + mo_i[p] + '</span><br/>';
	}
	this.akashWani += '<span>TOTALLY MOON GAINS ' + mo.toString() + ' POINTS</span><br/><br/>';
	for(var p = 0; p < ju_i.length; p++) {
		this.akashWani += '<span>' + ju_i[p] + '</span><br/>';
	}
	this.akashWani += '<span>TOTALLY JUPITER GAINS ' + ju.toString() + ' POINTS</span><br/><br/>';
	for(var p = 0; p < ve_i.length; p++) {
		this.akashWani += '<span>' + ve_i[p] + '</span><br/>';
	}
	this.akashWani += '<span>TOTALLY VENUS GAINS ' + ve.toString() + ' POINTS</span><br/><br/>';
	for(var p = 0; p < ma_i.length; p++) {
		this.akashWani += '<span>' + ma_i[p] + '</span><br/>';
	}
	this.akashWani += '<span>TOTALLY MARS GAINS ' + ma.toString() + ' POINTS</span><br/><br/>';
	for(var p = 0; p < me_i.length; p++) {
		this.akashWani += '<span>' + me_i[p] + '</span><br/>';
	}
	this.akashWani += '<span>TOTALLY MERCURY GAINS ' + me.toString() + ' POINTS</span><br/><br/>';
  	for(var p = 0; p < sa_i.length; p++) {
		this.akashWani += '<span>' + sa_i[p] + '</span><br/>';
	}
	this.akashWani += '<span>TOTALLY SATURN GAINS ' + sa.toString() + ' POINTS</span><br/><br/>';
    let cn_pls: string = '',le_pls: string = '';
	for(i = 0; i < this.signs_v.length; i++) {
		sign = this.signs_v[i];
		if(plPos.hasOwnProperty(sign)) {
			var pls = plPos[sign].split('\|');
			for (var k = 0; k < pls.length; k++) {
				var pl = pls[k].split(' ')[1];
				if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
					(sign == 'cn') ? cn_pls += this.ruler_name_v[pl.toLowerCase()] + ',' : le_pls += this.ruler_name_v[pl.toLowerCase()] + ',';
					switch(pl.toLowerCase())
					{
						case 'ju':
							(sign == 'cn') ? cn_p += ju : le_p += ju;
							break;
						case 've':
							(sign == 'cn') ? cn_p += ve : le_p += ve;
							break;
						case 'me':
							(sign == 'cn') ? cn_p += me : le_p += me;
							break;
						case 'su':
							(sign == 'cn') ? cn_p += su : le_p += su;
							break;
						case 'mo':
							(sign == 'cn') ? cn_p += mo : le_p += mo;
							break;
						case 'ma':
							(sign == 'cn') ? cn_p += ma : le_p += ma;
							break;
						case 'sa':
							(sign == 'cn') ? cn_p += sa : le_p += sa;
							break;
						default:
							break;
					}
				}
			}
		}
	}
	if(this.hasc_sign == 'cn') {
		this.akashWani += '<span><strong>1st HOUSE CANCER sign hosting ' + cn_pls + ' has gained ' + cn_p.toString() + ' Points.</strong></span><br/>';
		this.akashWani += '<span><strong>2nd HOUSE LEO sign hosting ' + le_pls + ' has gained ' + le_p.toString() + ' Points.</strong></span><br/>';
		if(le_p > cn_p) 
			this.akashWani += '<span><strong>The native will accumulate more wealth</strong></span><br/>';
		
	} else {
		this.akashWani += '<span><strong>12th HOUSE CANCER sign hosting ' + cn_pls + ' has gained ' + cn_p.toString() + ' Points.</strong></span><br/>';
		this.akashWani += '<span><strong>1st HOUSE LEO sign hosting ' + le_pls + ' has gained ' + le_p.toString() + ' Points.</strong></span><br/>';
		if(cn_p > le_p)
			this.akashWani += '<span><strong>The native spends more</strong></span><br/>';
		else
			this.akashWani += '<span><strong>The native will be wealthy</strong></span><br/>';
	}
	if(cn_p == le_p)
			this.akashWani += '<span><strong>The native maintains whats inherited</strong></span><br/>';
  }
  updateNodePos() {
	var plPos = this.binf.ppos;
   		for (var i = 0; i < 16; i++) {
			var sign = this.signs_v[i];
			if (plPos.hasOwnProperty(sign)) {
				var pls = plPos[sign].split('\|');
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
						//this.asc_deg = Number(pls[k].split(' ')[0]);
						console.log('ASCENDENT is ' + this.asc_sign);
					} else if (pls[k].split(' ')[1] == 'TRUE_NODE') {
						plPos[sign] = plPos[sign].replace('TRUE_NODE', 'TR');		
					}
				}
			}
		}
		return plPos;
	}
  loadHoro(plPos, ele, title, id)
  {
  console.log('loadHoro');
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
					let pl = pls[k].split(' ')[1];
					if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
						let pn: string = this.translate(this.ruler_name_v[pl.toLowerCase()].toUpperCase());
						this.oPR[pn].sign_x = this.translate(this.rashis_v[sign].split('\|')[1]);;
					} else if (pl == 'Ra') { //consder Rahu
						let pn: string = this.translate(this.ruler_name_v[pl.toLowerCase()].toUpperCase());
						this.oPR[pn].sign_x = this.translate(this.rashis_v[sign].split('\|')[1]);;
					} else if (pl == 'Ke') {
						let pn: string = this.translate(this.ruler_name_v[pl.toLowerCase()].toUpperCase());
						this.oPR[pn].sign_x = this.translate(this.rashis_v[sign].split('\|')[1]);;
					} else if(pl == 'AC') {
						this.asc_sign = sign;
						this.oPR['ASC'].sign_x = this.translate(this.rashis_v[sign].split('\|')[1]);;
					}
					//if (pls[k].split(' ')[1] == 'MEAN_NODE') {
					//	var rpos = this.o_rashis_v[sign].split('\|')[0];
					//	var kpos = parseInt(rpos, 10) + 6;
					//	if (kpos > 12) kpos = (kpos - 12);
					//	//var mn = i + 11;
					//	//if (mn > 15) mn -= 15;
					//	if (plPos.hasOwnProperty(this.o_signs_v[kpos - 1])) {
					//		var eP = plPos[this.o_signs_v[kpos - 1]];
					//		plPos[this.o_signs_v[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
					//	} else {
					//		plPos[this.o_signs_v[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
					//	}
					//	// plPos[sign] = ePls;
					//	plPos[sign] = plPos[sign].replace('MEAN_NODE', 'Ra');
					//} else if (pls[k].split(' ')[1] == 'AC') { 
					//	this.asc_sign = sign;
					//	//this.asc_deg = Number(pls[k].split(' ')[0]);
					//	console.log('ASCENDENT is ' + this.asc_sign);
					//}
					
				}
			}
		}
		if(this.shareService.getCHTYP() == 'sind')
			this.svgHoro = this.drawSIChart(plPos, title, id);
		else if(this.shareService.getCHTYP() == 'nind')
			this.svgHoro = this.drawNIchart(plPos, title, id);
		else
			this.svgHoro = this.drawSIChart(plPos, title, id);
        this.renderer.appendChild(this.divChart.nativeElement, this.svgHoro);
        //this.renderer.appendChild(this.divChart.nativeElement, this.grid(4, this.device_width/4, this.device_width, plPos, title, id));
		var h_code;
		var unq = [];
		h_code += '<span>';
		if (this.trikona_lords.length > 0) {
			var lords = this.trikona_lords.split('\|');
			for (i = 0; i < lords.length; i++) {
				if (unq.indexOf(lords[i]) < 0) {
					h_code += ' ' + this.translate(lords[i]);
					unq.push(lords[i]);
				}
			}
		}
		if (this.kendra_lords.length > 0) {
			lords = this.kendra_lords.split('\|');
			for (i = 0; i < lords.length; i++) {
				if (unq.indexOf(lords[i]) < 0) {
					h_code += ' ' + this.translate(lords[i]);
					unq.push(lords[i]);
				}
			}
		}
		h_code += '</span>';

		var ausp = 0;
		var ausp_lords = '';
		var klord_in_tri = '';
		var tlord_in_ken = '';
		var klord_in_ken = '';
		var tlord_in_tri = '';
		var vp_rulers = '';
		var vp_owners = '';
		for (i = 0; i < 12; i++) {
			if (this.o_signs_v[i] == this.asc_sign) {
				if (plPos.hasOwnProperty(this.asc_sign)) {
					pls = plPos[this.asc_sign].split('\|');
					for (k = 0; k < pls.length; k++) {
						var pl = pls[k].split(' ')[1];
						if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
							if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
							if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
					h_code += '<h4>త్రికొనా ' +  tlords[tlt].split('|')[0] + ' House లో త్రికొనాధిపతి ' + this.translate(tlords[tlt].split('|')[1]) + ' ఉన్నారు</h4>';
				} else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>त्रिकोणा ' +  tlords[tlt].split('|')[0] + ' House में त्रिकोणादिपति ' + this.translate(tlords[tlt].split('|')[1]) + ' रहा है</h4>';
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
					h_code += '<h4>ఖెన్ద్ర ' +  tlords[tlk].split('|')[0] + ' House లో త్రికొనాధిపతి ' + this.translate(tlords[tlk].split('|')[1]) + 'ఉన్నారు</h4>';
				} else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>केंद्र ' +  tlords[tlk].split('|')[0] + ' House में त्रिकोणादिपति '  + this.translate(tlords[tlk].split('|')[1]) + ' रहा है</h4>';
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
					h_code += '<h4>త్రికొనా ' +  klords[klt].split('|')[0] + ' House లో ఖెన్ద్రాధిపతి ' + this.translate(klords[klt].split('|')[1]) + 'ఉన్నారు</h4>';
				} else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>त्रिकोण ' +  klords[klt].split('|')[0] + ' House में  केन्द्राधिपति ' + this.translate(klords[klt].split('|')[1]) + ' रहा है</h4>';
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
					h_code += '<h4>ఖెన్ద్ర ' +  klordss[klk].split('|')[0] + ' House లో ఖెన్ద్రాధిపతి  '  + this.translate(klordss[klk].split('|')[1]) + ' ఉన్నారు';
				}  else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>केंद्र ' +  klordss[klk].split('|')[0] + ' House  में  केन्द्राधिपति ' + this.translate(klordss[klk].split('|')[1]) +  ' रहा है';
				}  
				h_code += '</h4>';
				tklords += klordss[klk].split('|')[1] + ' ';
			}
		}
		if(tlord_in_tri.length > 0 || tlord_in_ken.length > 0 || klord_in_tri.length > 0 || klord_in_ken.length > 0)
		{
		   if(this.shareService.getLANG() == 'en') {
			h_code += '<span style="color:blue;"><strong>You can expect a favourable period during Maha Dasha or Antar Dasha of kendra/triknoda lord(s) ' + tklords + '</strong></span>';
			} else if(this.shareService.getLANG() == 'te') {
			  h_code += '<span style="color:blue;"><strong>ఖెన్ద్రాధిపతి/ త్రికొనాధిపతి అగు ' + this.translate(tklords) + ' మహా దశ/అన్తర్ దశ ల లొ మీకు మంచి అభివ్రుధి కలుగును';
			}  else if(this.shareService.getLANG() == 'hi') {
			  h_code += '<span style="color:blue;"><strong>केन्द्राधिपति/त्रिकोणादिपति '  + this.translate(tklords) + ' के महा दस या अंतर दस में आप को शुभ योजना प्रप्थ होसकता है';
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
					h_code += '<h4>' + vown[vp1].split('-')[1] + ' అధిపతి ' + this.translate(vown[vp1].split('-')[0]) + ' ' + vrul[vp2].split('-')[1] + ' house.కూడా రూల్ చేస్తునారు</h4> ';
					vprl += vown[vp1].split('-')[0] + ',';
			  }  else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>' + vown[vp1].split('-')[1] + ' अधिपति ' + this.translate(vown[vp1].split('-')[0]) + ' ' + vrul[vp2].split('-')[1] + ' house भी रूल कररहे है</h4> ';
					vprl += vown[vp1].split('-')[0] + ',';
			  }

			  }
			}
		}
		h_code += '<br\>';
		h_code = '';
		let pcnt :number = 0;
		var frPls = this.friend_pl_v[this.rashi_lords_v[sign]].split('\|');
		if (frPls.length > 0) {
			if(this.shareService.getLANG() == 'en') {
				h_code += '<span>' + this.rashi_lords_v[sign] + ' is Friendly with ';
				for (i = 0; i < frPls.length; i++) {
					h_code += this.ruler_name_v[frPls[i]] + ' ';
				} 
				h_code += '</span>';
			}  else if(this.shareService.getLANG() == 'te') {
					h_code += '<span>' + this.translate(this.rashi_lords_v[sign]) + ' మరియు ';
					for (i = 0; i < frPls.length; i++) {
						h_code += this.translate(this.ruler_name_v[frPls[i]]) + ' ';
					} 
					h_code += ' మిత్రులు</span>';
			}   else if(this.shareService.getLANG() == 'hi') {
					h_code += '<span>' + this.translate(this.rashi_lords_v[sign]) + ' और ';
					for (i = 0; i < frPls.length; i++) {
						h_code += this.translate(this.ruler_name_v[frPls[i]]) + ' ';
					} 
					h_code += ' मित्र है</span>';
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
							h_code += this.translate(this.ruler_name_v[eyPls[i]]) + ' ';
						}
						h_code += ' కి  శత్రువులు';
						h_code += '</span><br/>';
				} else if(this.shareService.getLANG() == 'hi') {
						h_code += '  और ' ;  
						for (i = 0; i < eyPls.length; i++) {
							h_code += this.translate(this.ruler_name_v[eyPls[i]]) + ' ';
						}
						h_code += '  दुश्मन है';
						h_code += '</span><br/>';
				}
			}
		}
		//this.akashWani = h_code;
	}
	drawSIChart(plps, title, id) {
        var size = this.device_width;
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
							//this.moon_sign = sign;
							//this.moon_deg = pls[k].split(' ')[0];
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
  calcHoraChart()
  {
	let navPls: string[] = [];
	var plPos = this.updateNodePos();
	var sgns = ["ar","ta","ge","cn","le","vi","li","sc","sa","cp","aq","pi"];
	for (var i = 0; i < 12; i++) {
		var sign = sgns[i];
		let hora_sign: string = '';
		if (plPos.hasOwnProperty(sign)) {
			var pls = plPos[sign].split('\|');
			for (var k = 0; k < pls.length; k++) {
			   //console.log('pl=' + pls[k]);
				var pl = pls[k].split(' ')[1];
				//if (pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'TRUE_NODE') {  //consider only true planets
				if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR' && pl != 'TRUE_NODE') {  //consider only true planets
				    let sd: string = pls[k].split(' ')[0];
				    let po: number = this.shareService.dmsToDec(Number(sd.split('.')[0]), Number(sd.split('.')[1]), Number(sd.split('.')[2]));
					switch(sign)
					{
						case 'ar':
						case 'ge':
						case 'le':
						case 'li':
						case 'sa':
						case 'aq':
							hora_sign = (po <= 15) ?  "le" : "cn";
							break;
						case 'ta':
						case 'cn':
						case 'vi':
						case 'sc':
						case 'cp':
						case 'pi':
							hora_sign = (po <= 15) ? "cn" : "le";
							break;
						default:
							break;
					}
				    if(!navPls.hasOwnProperty(hora_sign))
						navPls[hora_sign] = pls[k];
					else
						navPls[hora_sign] += '|' + pls[k];
				} else if(pl == 'AC') {
					this.hasc_sign = hora_sign;
				}
			}
		}
	}
	return navPls;
  }
	
  calcDivChart(ndivs, plPos)
  {
     //if(ndivs == 4) return this.calcD4();
     //else if(ndivs == 9) return this.calcNavamsa();
	 //else if(ndivs == 10) return this.calcDasamsa();
	 return this.calcChart(ndivs, plPos);
  }
  calcChart(ndivs, plPos) 
  {
	let navPls: string[] = [];
	//var plPos = this.updateNodePos();
    var sgns = [ "ar|M|Ma|1|O|F", "ta|F|Ve|2|E|E", "ge|D|Me|3|O|A", "cn|M|Mo|4|E|W", "le|F|Su|5|O|F", "vi|D|Me|6|E|E", "li|M|Ve|7|O|A", "sc|F|Ma|8|E|W", "sa|D|Ju|9|O|F", "cp|M|Sa|10|E|E", "aq|F|Sa|11|O|A", "pi|D|Ju|12|E|W" ];
	var divs = [];
	let n: number = 1;
	let sec: number = 30/ndivs, secp: number = 0;
	console.log('no. of divs=' + sec.toString());
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
			   console.log('pl=' + pls[k]);
				var pl = pls[k].split(' ')[1];
				if(pl == 'AC') 	this.asc_sign = sign.split('|')[0];
				let sd: string = pls[k].split(' ')[0];
				let po: number = this.shareService.dmsToDec(Number(sd.split('.')[0]), Number(sd.split('.')[1]), Number(sd.split('.')[2]));
				console.log(sign.split('|')[0]);
				console.log(pl);
				console.log(po);
				n = 0.0;
				let ppos: number = 0;
				if (ndivs == 30)
				{
					if (sign.split('|')[4] == "O")
					{
						if (po < 5) ppos = 1;
						else if (po >= 5 && po < 10) ppos = 11;
						else if (po >= 10 && po < 18) ppos = 9;
						else if (po >= 18 && po < 25) ppos = 3;
						else if (po < 30) ppos = 7;
					}
					else
					{
						if (po < 5) ppos = 2;
						else if (po >= 5 && po < 12) ppos = 6;
						else if (po >= 12 && po < 20) ppos = 12;
						else if (po >= 20 && po < 25) ppos = 10;
						else if (po >= 25 && po < 30) ppos = 8;
					}
				}
				else if (ndivs == 60)
				{
					let sh = (Math.floor(po) * 2);
					let rem = 0;
					let quo = Math.floor(sh/12);
					rem = sh - 12*quo;
					ppos = Number(sign.split('|')[3]) + rem;
					n = 0;
					for (let dp = 0; dp < divs.length; dp++)
					{
						if (po >= n && po < divs[dp]) { 
							if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR' && pl != 'TRUE_NODE') {  
								let planetDeity: PlanetDeity = {
									sno: dp+1,
									hno: -1,
									deity: this.deities_v[dp+1].split('|')[0],
									sign: '',
									nat: this.deities_v[dp+1].split('|')[2],
									desc: this.deities_v[dp+1].split('|')[1]
								};
								this.oPlanet[pl] = planetDeity;			
							}
							break;
						}
						n = divs[dp];
					}
				}
				else
				{
					n = 0;
					for (let dp = 0; dp < divs.length; dp++)
					{
						if (po >= n && po < divs[dp]) { 
							if (ndivs == 3)
							{
								switch (dp + 1)
								{
									case 1:
										ppos = Number(sign.split('|')[3]);
										break;
									case 2:
										ppos = Number(sign.split('|')[3]) + 4; //second decetane
										break;
									case 3:
										ppos = Number(sign.split('|')[3]) + 8; //third decetane
										break;
									default:
										break;
								}
							}
							else if (ndivs == 4)
							{
								switch (dp + 1)
								{
									case 1:
										ppos = Number(sign.split('|')[3]);
										break;
									case 2:
										ppos = Number(sign.split('|')[3]) + 3; //second decetane
										break;
									case 3:
										ppos = Number(sign.split('|')[3]) + 6; //third decetane
										break;
									case 4:
										ppos = Number(sign.split('|')[3]) + 9; //third decetane
										break;
									default:
										break;
								}

							}
							else if (ndivs == 7)
							{
								if (sign.split('|')[4] == "O")
									ppos = Number(sign.split('|')[3]) + dp;
								else
									ppos = Number(sign.split('|')[3]) + 6 + dp;
							}
							else if (ndivs == 9)
							{
								if (sign.split('|')[5] == "F")
									ppos = 1 + dp;
								else if (sign.split('|')[5] == "E")
									ppos = 10 + dp;
								else if (sign.split('|')[5] == "A")
									ppos = 7 + dp;
								else
									ppos = 4 + dp;
							}
							else if (ndivs == 10)
							{
								if (sign.split('|')[4] == "O")
									ppos = Number(sign.split('|')[3]) + dp;
								else
									ppos = Number(sign.split('|')[3]) + 8 + dp;

							}
							else if (ndivs == 12)
							{
								ppos = Number(sign.split('|')[3]) + dp;
							}
							else if (ndivs == 16 || ndivs == 45)
							{
								if (sign.split('|')[1] == "M")
									ppos = 1 + dp;
								else if (sign.split('|')[1] == "F")
									ppos = 5 + dp;
								else
									ppos = 9 + dp;
							}
							else if (ndivs == 20)
							{
								if (sign.split('|')[1] == "M")
								{
									ppos = 1 + dp;
								}
								else if (sign.split('|')[1] == "D")
								{
									ppos = 5 + dp;
								}
								else
								{
									ppos = 9 + dp;
								}
							}
							else if (ndivs == 24)
							{
								if (sign.split('|')[4] == "O")
									ppos = 5 + dp;
								else
									ppos = 4 + dp;
							}
							else if (ndivs == 27)
							{
								if (sign.split('|')[5] == "F")
									ppos = 1 + dp;
								else if (sign.split('|')[5] == "E")
									ppos = 4 + dp;
								else if (sign.split('|')[5] == "A")
									ppos = 7 + dp;
								else
									ppos = 10 + dp;

							}
							else if (ndivs == 40)
							{
								if (sign.split('|')[4] == "O")
									ppos = 1 + dp;
								else
									ppos = 7 + dp;

							}
							else
							{
								ppos = Number(sign.split('|')[3]) + (dp + 1);
							}
							break; 
						}
						n = divs[dp];
					}
				}
				let sord = 0;
				let rpos = ppos;
				while (rpos > 12) rpos -= 12;
				let navp = rpos;
				if (navp < 1) navp = 12 - navp;
				if(ndivs == 60) {
					if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR' && pl != 'TRUE_NODE') {  
						this.oPlanet[pl].hno = navp;
						this.oPlanet[pl].sign = sign.split('|')[0];
					}
				}
					
				switch(navp)
				{
				  case 1:
				    if(!navPls.hasOwnProperty('ar'))
						navPls['ar'] =  pls[k];
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
			}
		}
	}
	console.log(navPls);
	return navPls;
  }
  calcNavamsa() {
	let navPls: string[] = [];
	var plPos = this.updateNodePos();
	var sgns = ["ar|M|Ma|1|O", "ta|F|Ve|2|E", "ge|D|Me|3|O", "cn|M|Mo|4|E", "le|F|Su|5|O", "vi|D|Me|6|E", "li|M|Ve|7|O", "sc|F|Ma|8|E", "sa|D|Ju|9|O", "cp|M|Sa|10|E", "aq|F|Sa|11|O", "pi|D|Ju|12|E" ];
	var divs = [];
	let n: number = 1;
	let sec: number = 30/9, secp: number = 0;
	console.log('no. of divs=' + sec.toString());
	while((secp = sec*n) <= 30) {
		  divs.push(secp);
		  n++;
	}
	console.log('part complete..');
	console.log(divs);
	 let spos: number = 0;
	 for (var i = 0; i < 12; i++) {
		var sign = sgns[i];
        if(sign.split('|')[1] == "M")
           spos = Number(sign.split('|')[3]);
        else if(sign.split('|')[1] == "F")
           spos = Number(sign.split('|')[3])+8;
        else if(sign.split('|')[1] == "D")
           spos = Number(sign.split('|')[3])+4;
		
		if (plPos.hasOwnProperty(sign.split('|')[0])) {
			var pls = plPos[sign.split('|')[0]].split('\|');
			for (var k = 0; k < pls.length; k++) {
			   let ppos: number = spos;
			   console.log('pl=' + pls[k]);
				var pl = pls[k].split(' ')[1];
				    let sd: string = pls[k].split(' ')[0];
				    let po: number = this.shareService.dmsToDec(Number(sd.split('.')[0]), Number(sd.split('.')[1]), Number(sd.split('.')[2]));
					console.log(sign);
					console.log(pl);
					console.log(po);
					n = 0;
					for(var dp = 0;  dp < Object.keys(divs).length; dp++)
					{
						if(po >= n && po <= divs[dp]) {break;}
						n = divs[dp];
						ppos++;
					}
					let rpos: number = ppos;
					while(rpos > 12 ) rpos -= 12;
					console.log('spos=' + spos.toString());
					let sord: number;
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
			}
		}
      }  
	  console.log(navPls);
	  return navPls;
	}
	calcDasamsa()
	{
	let navPls: string[] = [];
	let sec: number = 30/10, secp: number = 0;
	console.log('no. of divs=' + sec.toString());
	var plPos = this.updateNodePos();
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
                        spos = Number(sign.split('|')[3])+8;
		if (plPos.hasOwnProperty(sign.split('|')[0])) {
			var pls = plPos[sign.split('|')[0]].split('\|');
			for (var k = 0; k < pls.length; k++) {
			   let ppos: number = spos;
			   console.log('pl=' + pls[k]);
				var pl = pls[k].split(' ')[1];
				    let sd: string = pls[k].split(' ')[0];
				    let po: number = this.shareService.dmsToDec(Number(sd.split('.')[0]), Number(sd.split('.')[1]), Number(sd.split('.')[2]));
					console.log(sign);
					console.log(pl);
					console.log(po);
					n = 0;
					for(var dp = 0;  dp < Object.keys(divs).length; dp++)
					{
						if(po >= n && po <= divs[dp]) {break;}
						n = divs[dp];
						ppos++;
					}
					let rpos: number = ppos;
					while(rpos > 12 ) rpos -= 12;
					console.log('spos=' + spos.toString());
					let sord: number;
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
	calcD4()
	{
	console.log('calcD4');
	let navPls: string[] = [];
	var plPos = this.updateNodePos();
	console.log('D4', plPos);
	var sgns = ["ar|M|Ma|1|O", "ta|F|Ve|2|E", "ge|D|Me|3|O", "cn|M|Mo|4|E", "le|F|Su|5|O", "vi|D|Me|6|E", "li|M|Ve|7|O", "sc|F|Ma|8|E", "sa|D|Ju|9|O", "cp|M|Sa|10|E", "aq|F|Sa|11|O", "pi|D|Ju|12|E" ];
	//var divs = [];
	//let n: number = 1;
	//while((secp = sec*n) <= 30) {
	//	  divs.push(secp);
	//	  n++;
	//}
	//console.log('part complete..');
	//console.log(divs);
	 for (var i = 0; i < 12; i++) {
		var sign = sgns[i];
                   // if(sign.split('|')[4] == "O")
                    //else 
                      //  spos = Number(sign.split('|')[3])+8;
		if (plPos.hasOwnProperty(sign.split('|')[0])) {
			var pls = plPos[sign.split('|')[0]].split('\|');
			for (var k = 0; k < pls.length; k++) {
			   let spos: number = Number(sign.split('|')[3]);
			   console.log('pl=' + pls[k]);
				var pl = pls[k].split(' ')[1];
				    let sd: string = pls[k].split(' ')[0];
				    let po: number = this.shareService.dmsToDec(Number(sd.split('.')[0]), Number(sd.split('.')[1]), Number(sd.split('.')[2]));
					console.log(sign);
					console.log(pl);
					console.log(po);
				if(po >= 0 && po < 7.30) {
					//no change
				} else if(po >= 7.30 && po < 15) {
					spos += 3;
				} else if(po >= 15 && po < 22) {
					spos += 6;
				} else if(po >= 22 && po < 30) {
					spos += 9;
				}
				if(spos > 12) spos -= 12;
				console.log('D4', sign);
				console.log('D4', spos);
				console.log('D4', pls[k]);
				switch(spos)
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
	drawNIchart(plps, title, id) {
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
				var cord = this.getXY(1, this.device_width, Number(pls[k].split(' ')[0]));
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
		    hcord = this.getHXY(hou, this.device_width);
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
				var cord = this.getXY(hou, this.device_width, Number(pls[k].split(' ')[0]));
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
			this.renderer.setAttribute(text, "font-size", "15");
			this.renderer.setAttribute(text, "font-weight", 'bold');
			this.renderer.setAttribute(text, "x", (bxz*2).toString());
			this.renderer.setAttribute(text, "y", (bxz*2).toString());
			this.renderer.setAttribute(text, "alignment-baseline", "middle");
			this.renderer.setAttribute(text, "text-anchor", "middle");
			this.renderer.setAttribute(text, "id", id);
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
