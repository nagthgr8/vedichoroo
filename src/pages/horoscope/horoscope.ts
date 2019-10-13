import { Component, OnInit, AfterViewInit, ViewChild, Renderer2, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { ShareService } from '../../app/share.service'
import { HoroscopeService } from '../../app/horoscope.service';
//import {DailyForecastPage} from '../dailyforecast/dailyforecast'; 
//import { PersonalDetailsPage } from '../personal-details/personal-details';
import { AstrologersPage } from '../astrologers/astrologers';
import { ChartSettingsPage } from '../chart-settings/chart-settings';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { PlanetStar } from '../../app/planet-star';
import { Dasha } from '../../app/dasha';
//import { BirthInfo } from '../../app/birth-info';
import moment from 'moment';
import * as signs from './signs.json';
import * as o_signs from './o_signs.json';
import * as rashis from './rashis.json';
import * as o_rashis from './o_rashis.json';
import * as rashi_lords from './rashi_lords.json';
//import * as dasha_per from './dasha_per.json';
//import * as dasha_conv from './dasha_conv.json';
//import * as const_ruler from './const_ruler.json';
import * as ruler_name from './ruler_name.json';
import * as friend_pl from './friend_pl.json';
import * as enemy_pl from './enemy_pl.json';
import * as aspects from './aspects.json';
import * as house_traits from './house_traits.json';
import * as nakshatras from './nakshatras.json';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
/**
 * Generated class for the HoroscopePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'page-horoscope',
  templateUrl: 'horoscope.html',
})
export class HoroscopePage implements OnInit, AfterViewInit {
	@ViewChild('birthChart') birthChart;
	//@ViewChild('cnvHoro') cnvHoro: ElementRef;
	//public ctxHoro: CanvasRenderingContext2D;
	binf: any;
	svgHoro: any;
	//svims: string = '';
	//splpos: string = '';
	oPlanet :PlanetStar[] = [];
	oDas: Dasha[] = [];
	//oAD: Dasha[] = [];
	//oPD: Dasha[] = [];
	moon_sign :string = '';
	moon_deg :number = 0;
	asc_sign :string = '';
	trikona_lords :string = '';
	kendra_lords :string = '';
	device_width :number = 0;
	device_height :number = 0;
	akashWani :string = '';
	showASU: boolean = false;
	showADV: boolean = false;
	showVIM: boolean = false;
	aynm: string = '4'; curaynm: string = '4';
	ayanINF: string = ''
	info: string = '';
	chartanls: string = '';
	lstnr: Function;
	horo :string = '';
	name: string = '';
	pdfObj = null;
	cur_m_das :string = ''; cur_a_das :string = '';
    objectKeys = Object.keys;
	pnam1 :string = ''; pnam2 :string = ''; pnam3 :string = ''; pnam4 :string = ''; pnam5 :string = ''; pnam6 :string = ''; pnam7 :string = ''; pnam8 :string = ''; pnam9 :string = '';
	ppos1 :string = ''; ppos2 :string = ''; ppos3 :string = ''; ppos4 :string = ''; ppos5 :string = ''; ppos6 :string = ''; ppos7 :string = ''; ppos8 :string = ''; ppos9 :string = '';
	pras1 :string = '';pras2 :string = '';pras3 :string = '';pras4 :string = '';pras5 :string = '';pras6 :string = '';pras7 :string = '';pras8 :string = '';pras9 :string = '';
	pnak1 :string = '';pnak2 :string = '';pnak3 :string = '';pnak4 :string = '';pnak5 :string = '';pnak6 :string = '';pnak7 :string = '';pnak8 :string = '';pnak9 :string = '';
	nakl1 :string = '';nakl2 :string = '';nakl3 :string = '';nakl4 :string = '';nakl5 :string = '';nakl6 :string = '';nakl7 :string = '';nakl8 :string = '';nakl9 :string = '';
	nrefs: number = 0;
	bstar: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public shareService: ShareService, public renderer: Renderer2, public platform: Platform, public horoService: HoroscopeService, private file: File, private fileOpener: FileOpener)
  {
   this.binf = navParams.get('binf');
	platform.ready().then((readySource) => {
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
		if(this.shareService.getYogAd()) {
		 this.showASU = true;
		}
		this.chartanls =  '<span>TAP on birthchart for more advanced settings</span>';
	});
  }
  ngAfterViewInit() {
	this.moon_sign = '';
	this.moon_deg = 0;
	this.asc_sign  = '';
	this.trikona_lords  = '';
	this.kendra_lords  = '';
	this.akashWani = '';

	//this.ctxHoro = (<HTMLCanvasElement>this.cnvHoro.nativeElement).getContext('2d');
	this.loadHoro();
   // this.initPushNotification();
  }

  ngOnInit() {
    //this.renderer.addClass(this.akashWani.nativeElement, 'wild');
	//const div = this.renderer.createElement('div');
    //const text = this.renderer.createText('Hello world!');

    //this.renderer.appendChild(div, text);
    //this.renderer.appendChild(this.akashWani.nativeElement, div);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HoroscopePage');
  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter HoroscopePage');
	var ayn = this.shareService.getAYNM();
	let say: string = 'NC LAHIRI';
	if(ayn) {
		switch(Number(ayn))
			{
			   case 1:
					say = 'BV RAMAN';
					break;
				case 2:
					say = 'KP OLD';
					break;
				case 3:
					say = 'KP NEW';
					break;
				case 4:
					say = 'NC LAHIRI';
					break;
				case 5:
					say = 'KHULLAR';
					break;
				case 6:
					say = 'FAGAN BRADLEY';
					break;
				default:
					say = 'KP NEW';
					break;
			}
	}
	this.ayanINF = '<span><strong>AYANAMSA:</strong></span><span class="more" tappable (click)="chgayan()">'+say+'</span>';
    if(this.nrefs > 0) {
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
	console.log('loadHoro');
		var plPos = this.shareService.getPLPOS();
		for (var i = 0; i < 16; i++) {
			var sign = signs[i];
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

						var rpos = o_rashis[sign].split('\|')[0];
						var kpos = parseInt(rpos, 10) + 6;
						if (kpos > 12) kpos = (kpos - 12);
						//var mn = i + 11;
						//if (mn > 15) mn -= 15;
						if (plPos.hasOwnProperty(o_signs[kpos - 1])) {
							var eP = plPos[o_signs[kpos - 1]];
										    console.log('split-4');

							plPos[o_signs[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
						} else {
									    console.log('split-5');

							plPos[o_signs[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
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

						this.moon_deg = Number(pls[k].split(' ')[0]);
					} else if (pls[k].split(' ')[1] == 'TRUE_NODE') {
						plPos[sign] = plPos[sign].replace('TRUE_NODE', 'TR');		
					}
				}
			}
		}
		this.shareService.setPLPOS(plPos);
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
			this.navCtrl.push(ChartSettingsPage, {binf: this.binf});
		});
		console.log('svg', this.svgHoro);
		console.log('birthChart', this.birthChart);
        this.renderer.appendChild(this.birthChart.nativeElement, this.svgHoro);
		this.bstar = this.calcBirthStar(this.moon_sign, this.moon_deg);
		console.log(this.bstar);
		this.shareService.setBirthStar(this.bstar.split('|')[0]);
		var ras_num = Number(o_rashis[this.moon_sign].split('\|')[0]);
		var ras_num2 = Number(o_rashis[this.bstar.split('|')[3]].split('\|')[0]);
        this.akashWani = '<h3>Please wait..</h3>';
		this.horoService.calcVim(this.binf.dob, this.bstar.split('|')[2], Number(this.moon_deg), Number(this.bstar.split('|')[1]), ras_num, ras_num2, this.shareService.getLANG() )
				.subscribe(res => {
				    this.oDas = [];
				    for(let key of Object.keys(res)) {
					  // console.log('das', res[key]);
					    //var obj = JSON.parse(res[key]);
						if(res[key].style == 'mdasc') this.cur_m_das = key;
						else if(res[key].style == 'adasc') this.cur_a_das = ruler_name[key.split('-')[1].toLowerCase()];
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
					this.publishRep();
				}, (err) => {
					//this.info = err;
				});
	}
	publishRep()
	{
		var plPos = this.shareService.getPLPOS();
			var h_code;
		if(this.shareService.getLANG().toLowerCase() == 'en') {
			h_code = "<h2>Horoscope Analysis</h2>";
			h_code += "<span>You are born in <strong>" + rashis[this.asc_sign].split('\|')[1] + "</strong> Ascendant. Your Moon sign is <strong>" + rashis[this.moon_sign].split('\|')[1] + "</strong>. Your Birth Star is <strong>" + this.bstar.split('|')[0] + '</strong></span>';
		} else if(this.shareService.getLANG().toLowerCase() == 'te') {
			h_code = "<h2>జాతక విశ్లేషణ</h2>";
			h_code += "<span>మీరు <strong> " + this.translate(rashis[this.asc_sign].split('\|')[1]) + "</strong> లగ్నమ్ లో జన్మించారు.  మీ జన్మ రశి  <strong>" + this.translate(rashis[this.moon_sign].split('\|')[1]) + "</strong>. మీ జన్మ నక్షత్రమ్ <strong> " + this.translate(this.bstar.split('|')[0]) + '</strong></span>';
		} else if(this.shareService.getLANG().toLowerCase() == 'hi') {
			h_code = "<h2>जन्म-कुण्डली विश्लेषण</h2>";
			h_code += "<span>आप का जन्म <strong> " + this.translate(rashis[this.asc_sign].split('\|')[1]) + "</strong> लग्न में हुआ था. आप के जन्म राशि <strong>" + this.translate(rashis[this.moon_sign].split('\|')[1]) + "</strong>. आप के जन्म नक्षत्र <strong> " + this.translate(this.bstar.split('|')[0]) + '</strong></span>';
		} else if(this.shareService.getLANG().toLowerCase() == 'ta') {
			h_code = "<h2>ஜாதக ஆய்வு</h2>";
			h_code += "<span>நீங்கள் <strong> " + this.translate(rashis[this.asc_sign].split('\|')[1]) + "</strong> லக்னத்தில் பிறந்திருக்கிறீர்கள்.  உங்களுடைய இராசி <strong>" + this.translate(rashis[this.moon_sign].split('\|')[1]) + "</strong>. நீங்கள் பிறந்த நட்சத்திரம் <strong> " + this.translate(this.bstar.split('|')[0]) + "</strong>.</span>";
		}
		this.shareService.setMoonSign(rashis[this.moon_sign].split('\|')[1]);
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
		//var dob = this.shareService.getDOB().split('T')[0].split('-')[1] + '/' + this.shareService.getDOB().split('T')[0].split('-')[2] + '/' + //this.shareService.getDOB().split('T')[0].split('-')[0];
	   this.showVIM = true;
	   console.log(this.cur_m_das);
		if(this.shareService.getLANG().toLowerCase() == 'en') {
			h_code += "<h3>You are now in " + this.cur_m_das + " Maha dasha and " + this.cur_a_das + " Antar dasha.</h3> <br/>";
		} else if(this.shareService.getLANG().toLowerCase() == 'te') {
			h_code += "<h3>ఇప్పుడు మీరు " + this.translate(this.cur_m_das) + " మహా దశ మరియు " + this.translate(this.cur_a_das) + " అన్తర్ దశ లో ఉన్నారు.</h3> <br/>";
		} else if(this.shareService.getLANG().toLowerCase() == 'hi') {
			h_code += "<h3>आप अभी  " + this.translate(this.cur_m_das) + " महा दशा और " + this.translate(this.cur_a_das) + " अंतर दशा में है.</h3> <br/>";
		} else if(this.shareService.getLANG().toLowerCase() == 'ta') {
			h_code += "<h3>தற்போது உங்களுக்கு"  + this.translate(this.cur_m_das) + " தசை  " + this.translate(this.cur_a_das) + ".</h3> <br/>";
		}
		var ausp = 0;
		var ausp_lords = '';
		var klord_in_tri = '';
		var tlord_in_ken = '';
		var klord_in_ken = '';
		var tlord_in_tri = '';
		var vp_rulers = '';
		var vp_owners = '';
		for (var i = 0; i < 12; i++) {
			if (o_signs[i] == this.asc_sign) {
				if (plPos.hasOwnProperty(this.asc_sign)) {
					pls = plPos[this.asc_sign].split('\|');
					for (var k = 0; k < pls.length; k++) {
						var pl = pls[k].split(' ')[1];
						if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
							if (this.kendra_lords.indexOf(ruler_name[pls[k].split(' ')[1].toLowerCase()]) > -1) {
								ausp_lords += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
								klord_in_tri += '1|' + ruler_name[pls[k].split(' ')[1].toLowerCase()] + '&';
								ausp++;
							}
							if (this.trikona_lords.indexOf(ruler_name[pls[k].split(' ')[1].toLowerCase()]) > -1) {
								if (ausp_lords.indexOf(ruler_name[pls[k].split(' ')[1].toLowerCase()]) == -1) {
									ausp_lords += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
									tlord_in_tri += '1|' + ruler_name[pls[k].split(' ')[1].toLowerCase()] + '&';
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
				rashis[this.asc_sign] = '1|' + rashis[this.asc_sign].split('\|')[1];
				for (var j = i + 1; j < 12; j++) {
					as++;
					rashis[o_signs[j]] = (as).toString() + '|' + rashis[o_signs[j]].split('\|')[1];
					if (as == 5 || as == 9) {
						if (plPos.hasOwnProperty(o_signs[j])) {
							ausp_lords = '';
							ausp = 0;
							pls = plPos[o_signs[j]].split('\|');
							for (k = 0; k < pls.length; k++) {
								pl = pls[k].split(' ')[1];
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
									if (this.kendra_lords.indexOf(ruler_name[pls[k].split(' ')[1].toLowerCase()]) > -1) {
										ausp_lords += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
										klord_in_tri += (as).toString() + '|' + ruler_name[pls[k].split(' ')[1].toLowerCase()] + '&';
										ausp++;
									}
									if (this.trikona_lords.indexOf(ruler_name[pls[k].split(' ')[1].toLowerCase()]) > -1) {
										if (ausp_lords.indexOf(ruler_name[pls[k].split(' ')[1].toLowerCase()]) == -1) {
											ausp_lords += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
											tlord_in_tri += (as).toString() + '|' + ruler_name[pls[k].split(' ')[1].toLowerCase()] + '&';
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
						if (plPos.hasOwnProperty(o_signs[j])) {
							ausp_lords = '';
							ausp = 0;
							pls = plPos[o_signs[j]].split('\|');
							for (l = 0; l < pls.length; l++) {
								pl = pls[l].split(' ')[1];
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
									if (this.kendra_lords.indexOf(ruler_name[pls[l].split(' ')[1].toLowerCase()]) > -1) {
										ausp_lords += ruler_name[pls[l].split(' ')[1].toLowerCase()] + ' ';
										klord_in_ken += (as).toString() + '|' + ruler_name[pls[l].split(' ')[1].toLowerCase()] + '|' + rashi_lords[o_signs[j]] + '&';
										ausp++;
									}
									if (this.trikona_lords.indexOf(ruler_name[pls[l].split(' ')[1].toLowerCase()]) > -1) {
										if (ausp_lords.indexOf(ruler_name[pls[l].split(' ')[1].toLowerCase()]) == -1) {
											ausp_lords += ruler_name[pls[l].split(' ')[1].toLowerCase()] + ' ';
											tlord_in_ken += (as).toString() + '|' + ruler_name[pls[l].split(' ')[1].toLowerCase()] + '&';
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
						if (plPos.hasOwnProperty(o_signs[j])) {
							ausp_lords = '';
							ausp = 0;
							pls = plPos[o_signs[j]].split('\|');
							for (l = 0; l < pls.length; l++) {								
							    pl = pls[l].split(' ')[1];
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
								  vp_rulers += ruler_name[pls[l].split(' ')[1].toLowerCase()] + '-' + (as).toString() + '|';
								  vp_owners += rashi_lords[o_signs[j]] + '-' + (as).toString() + '|';
								}
							}
						}
					}
				}
				for (k = 0; k < i; k++) {
					var hno = ((12 - i) + (k + 1));
					rashis[o_signs[k]] = hno.toString() + '|' + rashis[o_signs[k]].split('\|')[1];
					if (plPos.hasOwnProperty(o_signs[k])) {
					if (hno == 5 || hno == 9) {
						ausp_lords = '';
						ausp = 0;
						pls = plPos[o_signs[k]].split('\|');
						for (l = 0; l < pls.length; l++) {
							pl = pls[l].split(' ')[1];
							if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
								if (this.kendra_lords.indexOf(ruler_name[pls[l].split(' ')[1].toLowerCase()]) > -1) {
									ausp_lords += ruler_name[pls[l].split(' ')[1].toLowerCase()] + ' ';
									klord_in_tri += (hno).toString() + '|' + ruler_name[pls[l].split(' ')[1].toLowerCase()] + '&';
									ausp++;
								}
								if (this.trikona_lords.indexOf(ruler_name[pls[l].split(' ')[1].toLowerCase()]) > -1) {
									if (ausp_lords.indexOf(ruler_name[pls[l].split(' ')[1].toLowerCase()]) == -1) {
										ausp_lords += ruler_name[pls[l].split(' ')[1].toLowerCase()] + ' ';
										tlord_in_tri += (hno).toString() + '|' + ruler_name[pls[l].split(' ')[1].toLowerCase()] + '&';
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
						pls = plPos[o_signs[k]].split('\|');
						for (var l = 0; l < pls.length; l++) {
							pl = pls[l].split(' ')[1];
							if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
								if (this.kendra_lords.indexOf(ruler_name[pls[l].split(' ')[1].toLowerCase()]) > -1) {
									ausp_lords += ruler_name[pls[l].split(' ')[1].toLowerCase()] + ' ';
									klord_in_ken += (hno).toString() + '|' + ruler_name[pls[l].split(' ')[1].toLowerCase()] + '|' + rashi_lords[o_signs[k]] + '&';
									ausp++;
								}
								if (this.trikona_lords.indexOf(ruler_name[pls[l].split(' ')[1].toLowerCase()]) > -1) {
									if (ausp_lords.indexOf(ruler_name[pls[l].split(' ')[1].toLowerCase()]) == -1) {
										ausp_lords += ruler_name[pls[l].split(' ')[1].toLowerCase()] + ' ';
										tlord_in_ken += (hno).toString() + '|' + ruler_name[pls[l].split(' ')[1].toLowerCase()] + '&';
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
					h_code += '<h4>ఖెన్ద్ర ' +  tlords[tlk].split('|')[0] + ' House లో త్రికొనాధిపతి ' + this.translate(tlords[tlk].split('|')[1]) + 'ఉన్నారు</h4>';
				} else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>केंद्र ' +  tlords[tlk].split('|')[0] + ' House में त्रिकोणादिपति '  + this.translate(tlords[tlk].split('|')[1]) + ' रहा है</h4>';
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
					h_code += '<h4>త్రికొనా ' +  klords[klt].split('|')[0] + ' House లో ఖెన్ద్రాధిపతి ' + this.translate(klords[klt].split('|')[1]) + 'ఉన్నారు</h4>';
				} else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>त्रिकोण ' +  klords[klt].split('|')[0] + ' House में  केन्द्राधिपति ' + this.translate(klords[klt].split('|')[1]) + ' रहा है</h4>';
				} else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>त्रिकोण ' +  klords[klt].split('|')[0] + ' House में  केन्द्राधिपति ' + this.translate(klords[klt].split('|')[1]) + ' रहा है</h4>';
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
					h_code += '<h4>ఖెన్ద్ర ' +  klordss[klk].split('|')[0] + ' House లో ఖెన్ద్రాధిపతి  '  + this.translate(klordss[klk].split('|')[1]) + ' ఉన్నారు';
				}  else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>केंद्र ' +  klordss[klk].split('|')[0] + ' House  में  केन्द्राधिपति ' + this.translate(klordss[klk].split('|')[1]) +  ' रहा है';
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
			  h_code += '<span style="color:blue;"><strong>ఖెన్ద్రాధిపతి/ త్రికొనాధిపతి అగు ' + this.translate(tklords) + ' మహా దశ/అన్తర్ దశ ల లొ మీకు మంచి అభివ్రుధి కలుగును';
			}  else if(this.shareService.getLANG() == 'hi') {
			  h_code += '<span style="color:blue;"><strong>केन्द्राधिपति/त्रिकोणादिपति '  + this.translate(tklords) + ' के महा दस या अंतर दस में आप को शुभ योजना प्रप्थ होसकता है';
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
					h_code += '<h4>' + vown[vp1].split('-')[1] + ' అధిపతి ' + this.translate(vown[vp1].split('-')[0]) + ' ' + vrul[vp2].split('-')[1] + ' house.కూడా రూల్ చేస్తునారు</h4> ';
					vprl += vown[vp1].split('-')[0] + ',';
			  }  else if(this.shareService.getLANG() == 'hi') {
					h_code += '<h4>' + vown[vp1].split('-')[1] + ' अधिपति ' + this.translate(vown[vp1].split('-')[0]) + ' ' + vrul[vp2].split('-')[1] + ' house भी रूल कररहे है</h4> ';
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
			   h_code += '<span style="color:red;"><strong>ఈ పై కలయిక మీకు విపరీత్ రాజ యోగ కలుగ చెయగలదు, ఈ యోగా కారకు లైన ' + this.translate(vprl.replace(/^\,+,\,+$/g, '')) +  ' మహా దశ/అన్తర్ దశ ల లొ మీకు అపార ధనమును, విదెసి ప్రయానము, మంచి కీర్థిని చెకూర్చ గలరు </strong></span>';
			} else if(this.shareService.getLANG() == 'hi') {
			   h_code += '<span style="color:red;"><strong>यह संयोजन आप को विपरीत राज योग प्राप्त कर सकते है, यह योग के करक  ' + this.translate(vprl.replace(/^\,+,\,+$/g, '')) +  'के महा दस या अंतर दस में आप को शुभ योजना प्रप्थ होसकता है</strong></span>';
			}
		}

		//h_code += '<br\><br\><strong>CLICK ON EACH HOUSE TO REVEAL MORE<strong>';
		h_code += '<br\>';
		this.horo = h_code;
		h_code = '';
		let pcnt :number = 0;
		//this.splpos = "[";
		for(let key of Object.keys(signs)) {
			if(signs[key] == 'na') continue;
		    var sign = signs[key];
		    h_code += '<h2><img src="http://live.makemypublication.com/Images/' + rashis[sign].split('\|')[1] + '.png" alt="rashi signs" /> ' + this.translate(rashis[sign].split('\|')[1]) + '</h2>';
			if(this.shareService.getLANG() == 'en') {
				h_code += '<span> <strong>This is your ' + rashis[sign].split('\|')[0] + ' House</strong></span><br/>';
			}  else if(this.shareService.getLANG() == 'te') {
				h_code += '<span> <strong>ఇది మీ ' + rashis[sign].split('\|')[0] + ' House</strong></span><br/>';
			}  else if(this.shareService.getLANG() == 'hi') {
				h_code += '<span> <strong>यह आप का  ' + rashis[sign].split('\|')[0] + ' House</strong></span><br/>';
			} else if(this.shareService.getLANG() == 'ta') {
				h_code += '<span></strong></span><br/>';
			}
			h_code += '<span>';
			h_code += house_traits[rashis[sign].split('\|')[0]];
			h_code += '</span><br/>';
			
			console.log(this.shareService.getLANG());
			if(this.shareService.getLANG().toLowerCase() == 'en') {
				h_code += '<span><strong>' + rashi_lords[sign] + '</strong> is the Lord of this House </span><br/>';
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				h_code += '<span><strong>ఈ House అధిపతి ' + this.translate(rashi_lords[sign]) + '</strong></span><br/>';
			} else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				h_code += '<span><strong>ये House के अधिपति ' + this.translate(rashi_lords[sign]) + ' है</strong></span><br/>';
			} else if(this.shareService.getLANG().toLowerCase() == 'ta') {
				h_code += '<span>இந்த பாவம்  அதிபதி<strong> ' + this.translate(rashi_lords[sign]) + '</strong> ஆவார்.</span><br/>';
			}

			var asp = this.check_aspects(sign, rashis[sign].split('\|')[0]);
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
						h_code += this.translate(ruler_name[pl.toLowerCase()]) + ' ';
						rps += this.translate(ruler_name[pl.toLowerCase()]) + ','
						pcnt++
						this['pnam' + pcnt.toString()] = this.translate(ruler_name[pl.toLowerCase()].toUpperCase());
						this['pras' + pcnt.toString()] = this.translate(rashis[sign].split('\|')[1]);
						if(pls[k].split(' ')[0].indexOf('.') > -1)
							this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032';
						else
						    this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
						var star = this.calcStar(sign, Number(pls[k].split(' ')[0]));
						this['pnak'+pcnt.toString()] = this.translate(star.split('|')[0]);
						this['nakl'+pcnt.toString()] = this.translate(star.split('|')[2]);
						//this.splpos += "['" + this.translate(ruler_name[pl.toLowerCase()].toUpperCase()) + "','" + pls[k].split(' ')[0].split('.')[0] + "\xB0','" + this.translate(rashis[sign].split('\|')[1]) + "','" + this.translate(star.split('|')[0]) + "','" +  this.translate(star.split('|')[2]) + "'],"
							let planetStar: PlanetStar = {
							 pos: this['ppos' +pcnt.toString()],
							 sign: this['pras' + pcnt.toString()],
							 star: this['pnak'+pcnt.toString()],
							 star_l: this['pnakl'+pcnt.toString()]
							};
							this.oPlanet[this['pnam' + pcnt.toString()]] = planetStar;
						
					} else if (pl == 'Ra') { //consder Rahu
						h_code += this.translate('Rahu') + ' ';
						rps += this.translate('Rahu') + ',';
						pcnt++
						this['pnam' + pcnt.toString()] = this.translate('RAHU');
						this['pras' + pcnt.toString()] = this.translate(rashis[sign].split('\|')[1]);
						if(pls[k].split(' ')[0].indexOf('.') > -1)
							this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032';
						else
						    this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
						var star = this.calcStar(sign, Number(pls[k].split(' ')[0]));
						this['pnak'+pcnt.toString()] = this.translate(star.split('|')[0]);
						this['nakl'+pcnt.toString()] = this.translate(star.split('|')[2]);
							let planetStar: PlanetStar = {
							 pos: this['ppos' +pcnt.toString()],
							 sign: this['pras' + pcnt.toString()],
							 star: this['pnak'+pcnt.toString()],
							 star_l: this['pnakl'+pcnt.toString()]
							};
							this.oPlanet[this['pnam' + pcnt.toString()]] = planetStar;
					} else if (pl == 'Ke') {
						h_code += this.translate('Ketu') + ' ';
						rps += this.translate('Ketu') + ',';
						pcnt++
						this['pnam' + pcnt.toString()] = this.translate('KETU');
						this['pras' + pcnt.toString()] = this.translate(rashis[sign].split('\|')[1]);
						if(pls[k].split(' ')[0].indexOf('.') > -1)
							this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032';
						else
						    this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
						var star = this.calcStar(sign, Number(pls[k].split(' ')[0]));
						this['pnak'+pcnt.toString()] = this.translate(star.split('|')[0]);
						this['nakl'+pcnt.toString()] = this.translate(star.split('|')[2]);
							let planetStar: PlanetStar = {
							 pos: this['ppos' +pcnt.toString()],
							 sign: this['pras' + pcnt.toString()],
							 star: this['pnak'+pcnt.toString()],
							 star_l: this['pnakl'+pcnt.toString()]
							};
							this.oPlanet[this['pnam' + pcnt.toString()]] = planetStar;
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
			//replaceAll(friend_pl[rashi_lords[rashis[sign].split('\|')[1]]], '\|', ' ');
			var frPls = friend_pl[rashi_lords[sign]].split('\|');
			if (frPls.length > 0) {
			   
				if(this.shareService.getLANG() == 'en') {
					h_code += '<span>' + rashi_lords[sign] + ' is Friendly with ';
					for (i = 0; i < frPls.length; i++) {
						h_code += ruler_name[frPls[i]] + ' ';
					} 
					h_code += '</span>';
				}  else if(this.shareService.getLANG() == 'te') {
					h_code += '<span>' + this.translate(rashi_lords[sign]) + ' మరియు ';
					for (i = 0; i < frPls.length; i++) {
						h_code += this.translate(ruler_name[frPls[i]]) + ' ';
					} 
					h_code += ' మిత్రులు</span>';
				}   else if(this.shareService.getLANG() == 'hi') {
					h_code += '<span>' + this.translate(rashi_lords[sign]) + ' और ';
					for (i = 0; i < frPls.length; i++) {
						h_code += this.translate(ruler_name[frPls[i]]) + ' ';
					} 
					h_code += ' मित्र है</span>';
				} else if(this.shareService.getLANG() == 'ta') {
					h_code += '<span>' + this.translate(rashi_lords[sign]) + ' பாவத்தின் அதிபதி ';
					for (i = 0; i < frPls.length; i++) {
						h_code += this.translate(ruler_name[frPls[i]]) + ' ';
					} 
					h_code += ' க்கு  நட்பானவர் </span>';
				}
			}
			if (rashi_lords[sign] != 'Moon') {  //Moon has no enemies
				var eyPls = enemy_pl[rashi_lords[sign]].split('\|');
				if (eyPls.length > 0) {
				  if(this.shareService.getLANG() == 'en') {
					h_code += '<span>, is Enemy with ';
					for (i = 0; i < eyPls.length; i++) {
						h_code += ruler_name[eyPls[i]] + ' ';
					}
					h_code += '</span><br/>';
				  } else if(this.shareService.getLANG() == 'te') {
						h_code += ' మరియు ' ;
						for (i = 0; i < eyPls.length; i++) {
							h_code += this.translate(ruler_name[eyPls[i]]) + ' ';
						}
						h_code += ' కి  శత్రువులు';
						h_code += '</span><br/>';
				  } else if(this.shareService.getLANG() == 'hi') {
						h_code += '  और ' ;  
						for (i = 0; i < eyPls.length; i++) {
							h_code += this.translate(ruler_name[eyPls[i]]) + ' ';
						}
						h_code += '  दुश्मन है';
						h_code += '</span><br/>';
				  } else if(this.shareService.getLANG() == 'ta') {
						h_code += '  மற்றும் ' ;  
						for (i = 0; i < eyPls.length; i++) {
							h_code += this.translate(ruler_name[eyPls[i]]) + ' ';
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
		var plPos = this.shareService.getPLPOS();
		var chk_asp = '';
		//var rpos = o_rashis[sign].split('\|')[0];
		//check 7th aspect
		var seven_asp = '';
		var sign_7 = aspects[sign + '-7'];
		if (plPos.hasOwnProperty(sign_7)) {
			var pls = plPos[sign_7].split('\|');
			for (var k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1] != 'me' && pls[k].split(' ')[1].toLowerCase() != 'ra' && pls[k].split(' ')[1].toLowerCase() != 'ke' && ruler_name.hasOwnProperty(pls[k].split(' ')[1].toLowerCase())) {
					seven_asp += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
				}
			}
		}
		var five_asp = '';
		var sign_5 = aspects[sign + '-5'].split('\|')[1];
		if (plPos.hasOwnProperty(sign_5)) {
			pls = plPos[sign_5].split('\|');
			for (k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1].toLowerCase() == 'ju' && ruler_name.hasOwnProperty(pls[k].split(' ')[1].toLowerCase())) {
					five_asp += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
				}
			}
		}
		var nine_asp = '';
		var sign_9 = aspects[sign + '-9'].split('\|')[1];
		if (plPos.hasOwnProperty(sign_9)) {
			pls = plPos[sign_9].split('\|');
			for (k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1].toLowerCase() == 'ju') {
					nine_asp += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
				}
			}
		}
		var ten_asp = '';
		var sign_10 = aspects[sign + '-10'].split('\|')[1];
		if (plPos.hasOwnProperty(sign_10)) {
			pls = plPos[sign_10].split('\|');
			for (k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1].toLowerCase() == 'sa' && ruler_name.hasOwnProperty(pls[k].split(' ')[1].toLowerCase())) {
					ten_asp += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
				}
			}
		}
		var three_asp = '';
		var sign_3 = aspects[sign + '-3'].split('\|')[1];
		if (plPos.hasOwnProperty(sign_3)) {
			pls = plPos[sign_3].split('\|');
			for (k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1].toLowerCase() == 'sa' && ruler_name.hasOwnProperty(pls[k].split(' ')[1].toLowerCase())) {
					three_asp += ruler_name[pls[k].split(' ')[1].toLowerCase()] + ' ';
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
				chk_asp += '<span><strong>' + this.translate(seven_asp) + ' నుంచి 7వ దృష్టి ఉంది </strong></span>';
			}  else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				chk_asp += '<span><strong>' + this.translate(seven_asp) + ' से 7th दृष्टि  है</strong></span>';
			}  
		}
		if (five_asp.length > 0) {
		    if(this.shareService.getLANG().toLowerCase() == 'en') {
				chk_asp += '<span><strong> 5th aspect from ' + five_asp + '. </strong></span>';
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				chk_asp += '<span><strong>' + this.translate(five_asp) + ' నుంచి 5వ దృష్టి ఉంది</strong></span>';
			}  else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				chk_asp += '<span><strong>' + this.translate(five_asp) + ' से 5th दृष्टि  है</strong></span>';
			}  			
		}
		if (nine_asp.length > 0) {
		    if(this.shareService.getLANG().toLowerCase() == 'en') {
				chk_asp += '<span><strong> 9th aspect from ' + nine_asp + '. </strong></span>';
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				chk_asp += '<span><strong>' + this.translate(nine_asp) + ' నుంచి 9వ దృష్టి ఉంది</strong></span>';
			}  else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				chk_asp += '<span><strong>' + this.translate(nine_asp) + ' से 9th दृष्टि  है</strong></span>';
			}  			
		}
		if (three_asp.length > 0) {
		    if(this.shareService.getLANG().toLowerCase() == 'en') {
				chk_asp += '<span><strong> 3rd aspect from ' + three_asp + '. </strong></span>';
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				chk_asp += '<span><strong>' + this.translate(three_asp) + ' నుంచి 3వ దృష్టి ఉంది</strong></span>';
			}  else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				chk_asp += '<span><strong>' + this.translate(three_asp) + ' से 3th दृष्टि  है</strong></span>';
			}  			
			
		}
		if (ten_asp.length > 0) {
		    if(this.shareService.getLANG().toLowerCase() == 'en') {
				chk_asp += '<span><strong> 10th aspect from ' + ten_asp + '. </strong></span>';
			} else if(this.shareService.getLANG().toLowerCase() == 'te') {
				chk_asp += '<span><strong>' + this.translate(ten_asp) + ' నుంచి 10వ దృష్టి  ఉంది</strong></span>';
			}  else if(this.shareService.getLANG().toLowerCase() == 'hi') {
				chk_asp += '<span><strong>' + this.translate(ten_asp) + ' से 10th दृष्टि  है</strong></span>';
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
							 "http://live.makemypublication.com/Images/Pisces.png");
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
							 "http://live.makemypublication.com/Images/Aquarius.png");
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
							 "http://live.makemypublication.com/Images/Capricorn.png");
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
							 "http://live.makemypublication.com/Images/Saggitarius.png");
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
							 "http://live.makemypublication.com/Images/Aries.png");
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
							 "http://live.makemypublication.com/Images/Scorpio.png");
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
							 "http://live.makemypublication.com/Images/Taurus.png");
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
							 "http://live.makemypublication.com/Images/Libra.png");
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
							 "http://live.makemypublication.com/Images/Gemini.png");
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
							 "http://live.makemypublication.com/Images/Cancer.png");

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
							 "http://live.makemypublication.com/Images/leo.png");

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
							 "http://live.makemypublication.com/Images/Virgo.png");

		this.renderer.appendChild(pattern, image);
		this.renderer.appendChild(defs, pattern);
		this.renderer.appendChild(svg, defs);
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
				this.renderer.setAttribute(box, "stroke", (signs[number] == this.asc_sign) ? "#FF5733" : "#000000");
				this.renderer.setAttribute(box, "stroke-width", (signs[number] == this.asc_sign) ? (border+2).toString() : border.toString());
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
						if (pls[k].split(' ')[1] == 'AC') this.asc_sign = sign;
						else if (pls[k].split(' ')[1] == 'Mo') {
							this.moon_sign = sign;
							this.moon_deg = Number(pls[k].split(' ')[0]);
						}
						pcnt++;
						text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						var plt = pls[k];
						if(this.shareService.getRETRO().indexOf(pls[k].split(' ')[1]) > -1) plt += '[R]';
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
			if (o_signs[i] == this.asc_sign) {
				//if (plPos.hasOwnProperty(this.asc_sign)) {
					this.trikona_lords = rashi_lords[o_signs[i]];
					this.kendra_lords = rashi_lords[o_signs[i]];
				//}
				var as = 1;
				rashis[this.asc_sign] = '1|' + rashis[this.asc_sign].split('\|')[1];
				for (j = i + 1; j < 12; j++) {
					as++;
					rashis[o_signs[j]] = (as).toString() + '|' + rashis[o_signs[j]].split('\|')[1];
					//if (plPos.hasOwnProperty(o_signs[j])) {
						if (as == 5 || as == 9) {
							this.trikona_lords = this.trikona_lords + '|' + rashi_lords[o_signs[j]];
						}
						else if (as == 4 || as == 7 || as == 10) {
							this.kendra_lords = this.kendra_lords + '|' + rashi_lords[o_signs[j]];
						}
					//}
				}
				for (k = 0; k < i; k++) {
					var hno = ((12 - i) + (k + 1));
					rashis[o_signs[k]] = hno.toString() + '|' + rashis[o_signs[k]].split('\|')[1];
					//if (plPos.hasOwnProperty(o_signs[k])) {
						if (hno == 5 || hno == 9) {
							this.trikona_lords = this.trikona_lords + '|' + rashi_lords[o_signs[k]];
						}
						else if (hno == 4 || hno == 7 || hno == 10) {
							this.kendra_lords = this.kendra_lords + '|' + rashi_lords[o_signs[k]];
						}
					//}
				}
			}
		}

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
	calcStar(sign: string, deg: number)
	{
	    //convert deg to mins
		let deg_s: string = deg.toString();
		let mins: number = 0;
		if(deg_s.indexOf('.') > -1 && deg_s.split('.')[1] != '')
		    mins = parseInt(deg_s.split('.')[0], 10)*60 + parseInt(deg_s.split('.')[1], 10);
		else if(deg_s.indexOf('.') > -1 && deg_s.split('.')[1] == '')
			mins = parseInt(deg_s.split('.')[0], 10)*60;
		else
		   mins = parseInt(deg_s, 10)*60;
		
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
			
			if(nak.location.start.split(',')[1] == sign.toLowerCase() && nak.location.end.split(',')[1] == sign.toLowerCase()) {
				if(mins >= nak_s && mins <= nak_e) {
					return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1];
				}
			} 
			else if(nak.location.start.split(',')[1] == sign.toLowerCase()) {
			  if(mins >= nak_s) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1];
			}
			else if(nak.location.end.split(',')[1] == sign.toLowerCase()) {
			  if(mins <= nak_e) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1];
			}
			//if(nak.location.start.split(',')[1] == sign.toLowerCase() && nak.location.end.split(',')[1] == sign.toLowerCase()) {
			//	if(deg >= parseFloat(nak.location.start.split(',')[0]) && deg <= parseFloat(nak.location.end.split(',')[0])) {
			//		return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
			//	}
			//} 
			//else if(nak.location.start.split(',')[1] == sign.toLowerCase()) {
			//  if(deg >= parseFloat(nak.location.start.split(',')[0])) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
			//}
			//else if(nak.location.end.split(',')[1] == sign.toLowerCase()) {
			// if(deg <= parseFloat(nak.location.end.split(',')[0])) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
			//}
		}
	}
 more()
	{
	let item: any = {};
	item.title = 'Talk to Astrologer';
	this.navCtrl.push(AstrologersPage, {
      item: item
	  });
	}	
 getTableDat(odat){
  var headers = {
        top:{
            col_1:{ text: 'Name', style: 'tableHeader', alignment: 'center' },
            col_2:{ text: 'Position', style: 'tableHeader', alignment: 'center' }, 
            col_3:{ text: 'Rasi', style: 'tableHeader', alignment: 'center' },
            col_4:{ text: 'Star', style: 'tableHeader', alignment: 'center' },
            col_5:{ text: 'Star Lord', style: 'tableHeader', alignment: 'center'}
        }
    }
	var rows = odat;

    var body = [];
    for (var key in headers){
        if (headers.hasOwnProperty(key)){
            var header = headers[key];
            var row = new Array();
            row.push( header.col_1 );
            row.push( header.col_2 );
            row.push( header.col_3 );
            row.push( header.col_4 );
            row.push( header.col_5 );
            body.push(row);
        }
    }
    for (var key in rows) 
    {
        if (rows.hasOwnProperty(key))
        {
            //var data = rows[key];
            var row = new Array();
            row.push( { text: key.toString(), alignment: 'center' } );
            row.push( { text: rows[key].pos, alignment: 'center' } );
            row.push( { text: rows[key].sign, alignment: 'center' });
            row.push( { text: rows[key].star, alignment: 'center' });
            row.push( { text: rows[key].star_l, alignment: 'center' });
            body.push(row);
        }
    }
    return body;	
 }
 createPdf() {
	console.log('created', this.pdfObj);
  }	
  
  
 downloadPdf(chart) {
   //GENERATE PDF
   // usage:
   console.log('downloadPdf() called');
		this.horoService.getBirthInfo(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone)
		   .subscribe(res => {
		   let birthInfo: string = ' Name : ' + this.name + '\nDate of Birth :' + this.binf.dob + '\nPlace of Birth :' + this.shareService.getPlace() + '\nLagna:' + res['lagna'] + '\nLagna Lord:' + res['lagna_lord'] + '\nMoon Sign:' + res['moon_sign'] + '\nSun Sign : ' + res['sun_sign'] + '\nTithi : ' + res['tithi'] + '\nStar Lord :' + res['star_lord'] + '\nMoon Phase :' + res['moon_phase'];
			console.log('drawInlineSVG', this.svgHoro);
				var cont = [];
				var feds = new Array();
				feds.push({text: '126 ASTROLOGY', style: 'header' });
				// Now is done
				console.log( 'chart-data', chart );
				feds.push({columns: [
									{
									  image: chart,
									  fit: [253,253]
									},
									{
									 text: birthInfo
									}
								], columnGap: 10});
				feds.push({text: 'Planet Positions', style: 'story' });
				feds.push({
						style: 'tableExample',
						writable: true,
						table: {
							widths: [100, '*', 200, '*', '*'],
							body: this.getTableDat(this.oPlanet)
						}
					});
				feds.push({text: 'Vimsottara Dasha', style: 'story' });
				cont.push(feds);
				   var docDefinition = {
					  content: cont,
					  styles: {	
						header: {
						  fontSize: 18,
						  bold: true,
						  alignment: 'center'
						},
						subheader: {
						  fontSize: 14,
						  bold: true,
						  margin: [0, 15, 0, 0]
						},
						story: {
						  italic: true,
						  alignment: 'center',
						  width: '50%',
						},
						tableExample: {
							margin: [0, 5, 0, 15]
						},
						tableHeader: {
						   bold: true,
						   fontSize: 13,
						   color: 'black'
						}						
					  }
					}
					console.log('Creating pdf...', JSON.stringify(docDefinition));
					pdfMake.createPdf(docDefinition).getBuffer((buffer) => {
							console.log('createBlob');
							var blob = new Blob([buffer], { type: 'application/pdf' });
							console.log('Writing to pdf..');
							// Save the PDF to the data Directory of our App
							this.file.writeFile(this.file.dataDirectory, 'vedichoro.pdf', blob, { replace: true }).then(fileEntry => {
							  // Open the PDf with the correct OS tools
							  console.log('Opening the pdf..');
							  this.fileOpener.open(this.file.dataDirectory + 'vedichoro.pdf', 'application/pdf');
							})
			});
		  }, (err) => {
			//this.info = err;
		  }) ;   
  }	
  generatePdf() {
  console.log('generatePdf');
 // var svg = document.querySelector('#birthChart');
   this.svgHoro = this.bchart(4, 63, 252, this.shareService.getPLPOS());
  //create a canvas
  var canvas = document.createElement("canvas");

  //set size for the canvas

  var ctx = canvas.getContext('2d');

  var data = new XMLSerializer().serializeToString(this.svgHoro);

  var DOMURL = window.URL || (window as any).webkitURL || window;

  var img = new Image();
  var svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
  var url = DOMURL.createObjectURL(svgBlob);
  var page = this;
  img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);

      var imgURI = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream');

      page.downloadPdf(imgURI);
  };

  img.src = url;  
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
				this.renderer.setAttribute(box, "stroke", (signs[number] == this.asc_sign) ? "#FF5733" : "#000000");
				this.renderer.setAttribute(box, "stroke-width", (signs[number] == this.asc_sign) ? (border+2).toString() : border.toString());
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
						if (pls[k].split(' ')[1] == 'AC') this.asc_sign = sign;
						else if (pls[k].split(' ')[1] == 'Mo') {
							this.moon_sign = sign;
							this.moon_deg = Number(pls[k].split(' ')[0]);
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
		this.renderer.setAttribute(line, "stroke", "black");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l1");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", "0"); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "black");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l2");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "black");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l3");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size).toString()); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "black");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "14");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "black");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l5");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "black");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l6");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "black");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l7");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "black");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l8");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size/2).toString()); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size/2).toString()); 
		this.renderer.setAttribute(line, "stroke", "black");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l9");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size).toString()); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "black");
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
 chgayan()
 {
   console.log('binf', this.binf);
   this.binf.ref = '1';
   this.navCtrl.push(ChartSettingsPage, {binf: this.binf});
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
}
