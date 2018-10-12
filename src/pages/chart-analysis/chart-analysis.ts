import { Component, Renderer2, AfterViewInit, ViewChild, ElementRef, OnInit, NgModule, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { ShareService } from '../../app/share.service'
import * as signs from '../horoscope/signs.json';
import * as o_signs from '../horoscope/o_signs.json'
import * as rashis from '../horoscope/rashis.json';
import * as o_rashis from '../horoscope/o_rashis.json';
import * as ruler_name from '../horoscope/ruler_name.json';
import * as rashi_lords from '../horoscope/rashi_lords.json';
import * as friend_pl from '../horoscope/friend_pl.json';
import * as neutral_pl from '../horoscope/neutral_pl.json';
import * as enemy_pl from '../horoscope/enemy_pl.json';
import * as aspects from '../horoscope/aspects.json';
import * as house_traits from '../horoscope/house_traits.json';
import * as dcharts from './dcharts.json';
import * as dcharts_ta from './dcharts_ta.json';

/**
 * Generated class for the ChartAnalysisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

@Component({
  selector: 'page-chart-analysis',
  templateUrl: 'chart-analysis.html',
})
export class ChartAnalysisPage {
  @ViewChild('divChart') divChart;
  title: string = '';
  asc_sign :string = '';
  trikona_lords :string = '';
  kendra_lords :string = '';
  device_width :number = 0;
  device_height :number = 0;
  akashWani :string = '';
  chart_id: string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public renderer: Renderer2, el: ElementRef, public platform: Platform, public shareService: ShareService) {
    this.chart_id = navParams.get('ID');
  	platform.ready().then((readySource) => {
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartAnalysisPage');
  }
 ngAfterViewInit() {
	this.asc_sign  = '';
	this.trikona_lords  = '';
	this.kendra_lords  = '';
	this.akashWani = '';
	 let oP: string[] = [];
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
	 this.updateNodePos();
	 this.title = title + ' Analysis';
	 
	 oP = (this.chart_id == 'D2') ? this.calcHoraChart() : this.calcDivChart(id);
	 this.loadHoro(oP, this.divChart.nativeElement, title, id);
	 if(this.shareService.getLANG() == 'en')
		this.akashWani = dcharts[this.chart_id];
	 else if(this.shareService.getLANG() == 'ta')
		this.akashWani = '<span><strong>' + dcharts_ta[this.chart_id] + '</strong></span>';
	 else
		this.akashWani = dcharts[this.chart_id];
	if(this.chart_id == 'D2') {
		this.analyzHora(oP);
	}
  }
  analyzHora(plPos)
  {
	this.akashWani += '<br/><br/><span class="note"><strong>PLEASE NOTE: Below analysis is taken from one of references, the below point system need not be accurate, please consider expert analysis </strong></span><br/><br/>';

    var signs = ['cn','le'];
	let cn_p: number = 0, le_p: number = 0;
	let ju: number = 0, ve: number = 0, me: number = 0, mo: number = 0, su: number = 0, ma: number = 0, sa: number = 0;
	var ju_i = [], ve_i = [], me_i = [], mo_i = [], su_i = [], ma_i = [], sa_i = [];
	for(var i = 0; i < signs.length; i++) {
		var sign = signs[i];
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
					var frPls = friend_pl[rashi_lords[sign]].split('\|');
					console.log('Friendly planets for ' + rashi_lords[sign] + ' are ' + frPls);
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
					frPls = neutral_pl[rashi_lords[sign]].split('\|');
					console.log('Neutral planets for ' + rashi_lords[sign] + ' are ' + frPls);
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
					frPls = enemy_pl[rashi_lords[sign]].split('\|');
					console.log('Enemy planets for ' + rashi_lords[sign] + ' are ' + frPls);
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
	for(i = 0; i < signs.length; i++) {
		sign = signs[i];
		if(plPos.hasOwnProperty(sign)) {
			var pls = plPos[sign].split('\|');
			for (var k = 0; k < pls.length; k++) {
				var pl = pls[k].split(' ')[1];
				if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
					(sign == 'cn') ? cn_pls += ruler_name[pl.toLowerCase()] + ',' : le_pls += ruler_name[pl.toLowerCase()] + ',';
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
	if(this.asc_sign == 'cn') {
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
	var plPos = this.shareService.getPLPOS();
   		for (var i = 0; i < 16; i++) {
			var sign = signs[i];
			if (plPos.hasOwnProperty(sign)) {
				var pls = plPos[sign].split('\|');
				for (var k = 0; k < pls.length; k++) {
					if (pls[k].split(' ')[1] == 'MEAN_NODE') {
						var rpos = o_rashis[sign].split('\|')[0];
						var kpos = parseInt(rpos, 10) + 6;
						if (kpos > 12) kpos = (kpos - 12);
						if (plPos.hasOwnProperty(o_signs[kpos - 1])) {
							var eP = plPos[o_signs[kpos - 1]];
							plPos[o_signs[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
						} else {
							plPos[o_signs[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
						}
						plPos[sign] = plPos[sign].replace('MEAN_NODE', 'Ra');
					} else if (pls[k].split(' ')[1] == 'AC') { 
						this.asc_sign = sign;
						//this.asc_deg = Number(pls[k].split(' ')[0]);
						console.log('ASCENDENT is ' + this.asc_sign);
					}
				}
			}
		}
	}
  loadHoro(plPos, ele, title, id)
  {
  console.log('loadHoro');
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
					} else if (pls[k].split(' ')[1] == 'AC') { 
						this.asc_sign = sign;
						//this.asc_deg = Number(pls[k].split(' ')[0]);
						console.log('ASCENDENT is ' + this.asc_sign);
					}
				}
			}
		}
		
        this.renderer.appendChild(this.divChart.nativeElement, this.grid(4, this.device_width/4, this.device_width, plPos, title, id));
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
			if (o_signs[i] == this.asc_sign) {
				if (plPos.hasOwnProperty(this.asc_sign)) {
					pls = plPos[this.asc_sign].split('\|');
					for (k = 0; k < pls.length; k++) {
						var pl = pls[k].split(' ')[1];
						if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
								if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
							if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
							if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
				}
			}
		}
		//this.akashWani = h_code;
	}
  grid(numberPerSide, size, pixelsPerSide, plps, title, id) {
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", pixelsPerSide);
		this.renderer.setAttribute(svg, "height", pixelsPerSide);
		this.renderer.setProperty(svg, "id", id);
		//this.renderer.setAttribute(svg, "stroke", "#000000");
		//this.renderer.setAttribute(svg, "stroke-width", "3");
		//this.renderer.setAttribute(svg, "fill", "none");
	
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
		var s4 = 14;
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
						this.renderer.appendChild(text, document.createTextNode(title.toUpperCase()));
						this.renderer.setAttribute(text, "fill", "white");
						this.renderer.setAttribute(text, "font-size", s4.toString());
						this.renderer.setAttribute(text, "x", s3.toString());
						this.renderer.setAttribute(text, "y", s3.toString());
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
				//this.renderer.setAttribute(box, "border", border.toString());
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
		console.log(svg);
		return svg;
	};
  calcHoraChart()
  {
	let navPls: string[] = [];
	var plPos = this.shareService.getPLPOS();
	var sgns = ["ar","ta","ge","cn","le","vi","li","sc","sa","cp","aq","pi"];
	for (var i = 0; i < 12; i++) {
		var sign = sgns[i];
		let hora_sign: string = '';
		if (plPos.hasOwnProperty(sign)) {
			var pls = plPos[sign].split('\|');
			for (var k = 0; k < pls.length; k++) {
			   //console.log('pl=' + pls[k]);
				var pl = pls[k].split(' ')[1];
				if (pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'TRUE_NODE') {  //consider only true planets
				    let po: number = Number(pls[k].split(' ')[0]);
					switch(sign)
					{
						case 'ar':
						case 'ge':
						case 'le':
						case 'li':
						case 'sa':
						case 'aq':
						    (po <= 15) ? hora_sign = 'le' : hora_sign = 'cn';
							break;
						case 'ta':
						case 'cn':
						case 'vi':
						case 'sc':
						case 'cp':
						case 'pi':
						    (po <= 15) ? hora_sign = 'cn' : hora_sign = 'le';
							break;
						default:
							break;
					}
				    if(!navPls.hasOwnProperty(hora_sign))
						navPls[hora_sign] = pls[k];
					else
						navPls[hora_sign] += '|' + pls[k];
				}
			}
		}
	}
	return navPls;
  }
	
  calcDivChart(ndivs)
  {
	let navPls: string[] = [];
    console.log('calcDivChart' + ndivs.toString());
	let sec: number = 30/ndivs, secp: number = 0;
	console.log('no. of divs=' + sec.toString());
	var plPos = this.shareService.getPLPOS();
	var sgns = ["ar","ta","ge","cn","le","vi","li","sc","sa","cp","aq","pi"];
	var divs = [];
	let n: number = 1;
	while((secp = sec*n++) <= 30) {
		  divs.push(secp);
	}
	console.log('part complete..');
	console.log(divs);
	for (var i = 0; i < 12; i++) {
		var sign = sgns[i];
		if (plPos.hasOwnProperty(sign)) {
			var pls = plPos[sign].split('\|');
			for (var k = 0; k < pls.length; k++) {
			   console.log('pl=' + pls[k]);
				var pl = pls[k].split(' ')[1];
				//if (pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'TRUE_NODE') {  //consider only true planets
				if(pl == 'AC') 	this.asc_sign = sign;
					let po: number = Number(pls[k].split(' ')[0]);
					console.log(sign);
					console.log(pl);
					console.log(po);
					let spos: number;
					n = 0;
					for(var dp = 0;  dp < Object.keys(divs).length; dp++)
					{
						if(po >= n && po <= divs[dp]) spos = dp+1;
						n = divs[dp];
					}
					while(spos > 12 ) spos -= 12;
					console.log('spos=' + spos.toString());
					let sord: number;
					let spnt: number = ndivs, x: number = 1;
					console.log('spnt=',ndivs+1);
					switch(sign)
					{
					  case 'ar':
						sord = 1;
						break;
					  case 'ta':
					    spnt = ndivs+1;
					    while(spnt > 12 ) spnt -= 12;
						sord = spnt;
						break;
					  case 'ge':
					    spnt = 2*ndivs + 1;
					    while(spnt > 12 ) spnt -= 12;
						sord = spnt;
						break;
					  case 'cn':
					    spnt = 3*ndivs + 1;
					    while(spnt > 12 ) spnt -= 12;
						sord = spnt;
						break;
					  case 'le':
					    spnt = 4*ndivs + 1;
					    while(spnt > 12 ) spnt -= 12;
						sord = spnt;
						break;
					  case 'vi':
					    spnt = 5*ndivs + 1;
					    while(spnt > 12 ) spnt -= 12;
						sord = spnt;
						break;
					  case 'li':
					    spnt = 6*ndivs + 1;
					    while(spnt > 12 ) spnt -= 12;
						sord = spnt;
						break;
					  case 'sc':
					    spnt = 7*ndivs + 1;
					    while(spnt > 12 ) spnt -= 12;
						sord = spnt;
						break;
					  case 'sa':
					    spnt = 8*ndivs + 1;
					    while(spnt > 12 ) spnt -= 12;
						sord = spnt;
						break;
					  case 'cp':
					    spnt = 9*ndivs + 1;
					    while(spnt > 12 ) spnt -= 12;
						sord = spnt;
						break;
					  case 'aq':
					    spnt = 10*ndivs + 1;
					    while(spnt > 12 ) spnt -= 12;
						sord = spnt;
						break;
					  case 'pi':
					    spnt = 11*ndivs + 1;
					    while(spnt > 12 ) spnt -= 12;
						sord = spnt;
						break;
					  default:
						break;
					}
					console.log('sord=' + sord.toString());
				//}
				let navp :number = sord + (spos-1);
				navp = (navp > 12) ? navp - 12: navp;
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
	
}
