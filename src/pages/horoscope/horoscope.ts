import { Component, Renderer2, AfterViewInit, ViewChild, ElementRef, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { ShareService } from '../../app/share.service'
import { HoroscopeService } from '../../app/horoscope.service';
import {DailyForecastPage} from '../dailyforecast/dailyforecast'; 
import * as signs from './signs.json';
import * as o_signs from './o_signs.json'
import * as rashis from './rashis.json';
import * as o_rashis from './o_rashis.json';
import * as rashi_lords from './rashi_lords.json';
import * as dashas from './dashas.json';
import * as dasha_conv from './dasha_conv.json';
import * as const_ruler from './const_ruler.json';
import * as ruler_name from './ruler_name.json';
import * as friend_pl from './friend_pl.json';
import * as enemy_pl from './enemy_pl.json';
import * as aspects from './aspects.json';
import * as house_traits from './house_traits.json';
import * as nakshatras from './nakshatras.json';
import * as venus_das from './venus_das.json';
import * as sun_das from './sun_das.json';
import * as ketu_das from './ketu_das.json';
import * as moon_das from './moon_das.json';
import * as mars_das from './mars_das.json';
import * as rahu_das from './rahu_das.json';
import * as jupiter_das from './jupiter_das.json';
import * as saturn_das from './saturn_das.json';
import * as mercury_das from './mercury_das.json';

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
	moon_sign :string = '';
	moon_deg :number = 0;
	asc_sign :string = '';
	trikona_lords :string = '';
	kendra_lords :string = '';
	device_width :number = 0;
	device_height :number = 0;
	akashWani :string = '';
	horo :string = '';
	fdas :string = '';fdasp :string = '';
	f1das :string = '';f1dasp :string = '';f11das :string = '';f11dasp :string = '';
	f2das :string = '';f2dasp :string = '';f22das :string = '';f22dasp :string = '';
	f3das :string = '';f3dasp :string = '';f33das :string = '';f33dasp :string = '';
	f4das :string = '';f4dasp :string = '';f44das :string = '';f44dasp :string = '';
	f5das :string = '';f5dasp :string = '';f55das :string = '';f55dasp :string = '';
	f6das :string = '';f6dasp :string = '';f66das :string = '';f66dasp :string = '';
	f7das :string = '';f7dasp :string = '';f77das :string = '';f77dasp :string = '';
	f8das :string = '';f8dasp :string = '';f88das :string = '';f88dasp :string = '';
	f9das :string = '';f9dasp :string = '';f99das :string = '';f99dasp :string = '';
	sdas :string = '';sdasp :string = '';
	s1das :string = '';s1dasp :string = '';s11das :string = '';s11dasp :string = '';
	s2das :string = '';s2dasp :string = '';s22das :string = '';s22dasp :string = '';
	s3das :string = '';s3dasp :string = '';s33das :string = '';s33dasp :string = '';
	s4das :string = '';s4dasp :string = '';s44das :string = '';s44dasp :string = '';
	s5das :string = '';s5dasp :string = '';s55das :string = '';s55dasp :string = '';
	s6das :string = '';s6dasp :string = '';s66das :string = '';s66dasp :string = '';
	s7das :string = '';s7dasp :string = '';s77das :string = '';s77dasp :string = '';
	s8das :string = '';s8dasp :string = '';s88das :string = '';s88dasp :string = '';
	s9das :string = '';s9dasp :string = '';s99das :string = '';s99dasp :string = '';
	tdas :string = ''; tdasp :string = '';
	t1das :string = ''; t1dasp :string = '';t11das :string = ''; t11dasp :string = '';
	t2das :string = ''; t2dasp :string = '';t22das :string = ''; t22dasp :string = '';
	t3das :string = ''; t3dasp :string = '';t33das :string = ''; t33dasp :string = '';
	t4das :string = ''; t4dasp :string = '';t44das :string = ''; t44dasp :string = '';
	t5das :string = ''; t5dasp :string = '';t55das :string = ''; t55dasp :string = '';
	t6das :string = ''; t6dasp :string = '';t66das :string = ''; t66dasp :string = '';
	t7das :string = ''; t7dasp :string = '';t77das :string = ''; t77dasp :string = '';
	t8das :string = ''; t8dasp :string = '';t88das :string = ''; t88dasp :string = '';
	t9das :string = ''; t9dasp :string = '';t99das :string = ''; t99dasp :string = '';
	fodas :string = ''; fodasp :string = '';
	fo1das :string = ''; fo1dasp :string = '';fo11das :string = ''; fo11dasp :string = '';
	fo2das :string = ''; fo2dasp :string = '';fo22das :string = ''; fo22dasp :string = '';
	fo3das :string = ''; fo3dasp :string = '';fo33das :string = ''; fo33dasp :string = '';
	fo4das :string = ''; fo4dasp :string = '';fo44das :string = ''; fo44dasp :string = '';
	fo5das :string = ''; fo5dasp :string = '';fo55das :string = ''; fo55dasp :string = '';
	fo6das :string = ''; fo6dasp :string = '';fo66das :string = ''; fo66dasp :string = '';
	fo7das :string = ''; fo7dasp :string = '';fo77das :string = ''; fo77dasp :string = '';
	fo8das :string = ''; fo8dasp :string = '';fo88das :string = ''; fo88dasp :string = '';
	fo9das :string = ''; fo9dasp :string = '';fo99das :string = ''; fo99dasp :string = '';
	fidas :string = ''; fidasp :string = '';
	fi1das :string = ''; fi1dasp :string = '';fi11das :string = ''; fi11dasp :string = '';
	fi2das :string = ''; fi2dasp :string = '';fi22das :string = ''; fi22dasp :string = '';
	fi3das :string = ''; fi3dasp :string = '';fi33das :string = ''; fi33dasp :string = '';
	fi4das :string = ''; fi4dasp :string = '';fi44das :string = ''; fi44dasp :string = '';
	fi5das :string = ''; fi5dasp :string = '';fi55das :string = ''; fi55dasp :string = '';
	fi6das :string = ''; fi6dasp :string = '';fi66das :string = ''; fi66dasp :string = '';
	fi7das :string = ''; fi7dasp :string = '';fi77das :string = ''; fi77dasp :string = '';
	fi8das :string = ''; fi8dasp :string = '';fi88das :string = ''; fi88dasp :string = '';
	fi9das :string = ''; fi9dasp :string = '';fi99das :string = ''; fi99dasp :string = '';
	sxdas :string = ''; sxdasp :string = '';
	sx1das :string = ''; sx1dasp :string = '';sx11das :string = ''; sx11dasp :string = '';
	sx2das :string = ''; sx2dasp :string = '';sx22das :string = ''; sx22dasp :string = '';
	sx3das :string = ''; sx3dasp :string = '';sx33das :string = ''; sx33dasp :string = '';
	sx4das :string = ''; sx4dasp :string = '';sx44das :string = ''; sx44dasp :string = '';
	sx5das :string = ''; sx5dasp :string = '';sx55das :string = ''; sx55dasp :string = '';
	sx6das :string = ''; sx6dasp :string = '';sx66das :string = ''; sx66dasp :string = '';
	sx7das :string = ''; sx7dasp :string = '';sx77das :string = ''; sx77dasp :string = '';
	sx8das :string = ''; sx8dasp :string = '';sx88das :string = ''; sx88dasp :string = '';
	sx9das :string = ''; sx9dasp :string = '';sx99das :string = ''; sx99dasp :string = '';
	svdas :string = ''; svdasp :string = '';
	sv1das :string = ''; sv1dasp :string = '';sv11das :string = ''; sv11dasp :string = '';
	sv2das :string = ''; sv2dasp :string = '';sv22das :string = ''; sv22dasp :string = '';
	sv3das :string = ''; sv3dasp :string = '';sv33das :string = ''; sv33dasp :string = '';
	sv4das :string = ''; sv4dasp :string = '';sv44das :string = ''; sv44dasp :string = '';
	sv5das :string = ''; sv5dasp :string = '';sv55das :string = ''; sv55dasp :string = '';
	sv6das :string = ''; sv6dasp :string = '';sv66das :string = ''; sv66dasp :string = '';
	sv7das :string = ''; sv7dasp :string = '';sv77das :string = ''; sv77dasp :string = '';
	sv8das :string = ''; sv8dasp :string = '';sv88das :string = ''; sv88dasp :string = '';
	sv9das :string = ''; sv9dasp :string = '';sv99das :string = ''; sv99dasp :string = '';
	edas :string = ''; edasp :string = '';
	e1das :string = ''; e1dasp :string = '';e11das :string = ''; e11dasp :string = '';
	e2das :string = ''; e2dasp :string = '';e22das :string = ''; e22dasp :string = '';
	e3das :string = ''; e3dasp :string = '';e33das :string = ''; e33dasp :string = '';
	e4das :string = ''; e4dasp :string = '';e44das :string = ''; e44dasp :string = '';
	e5das :string = ''; e5dasp :string = '';e55das :string = ''; e55dasp :string = '';
	e6das :string = ''; e6dasp :string = '';e66das :string = ''; e66dasp :string = '';
	e7das :string = ''; e7dasp :string = '';e77das :string = ''; e77dasp :string = '';
	e8das :string = ''; e8dasp :string = '';e88das :string = ''; e88dasp :string = '';
	e9das :string = ''; e9dasp :string = '';e99das :string = ''; e99dasp :string = '';
	ndas :string = ''; ndasp :string = '';
	n1das :string = ''; n1dasp :string = '';n11das :string = ''; n11dasp :string = '';
	n2das :string = ''; n2dasp :string = '';n22das :string = ''; n22dasp :string = '';
	n3das :string = ''; n3dasp :string = '';n33das :string = ''; n33dasp :string = '';
	n4das :string = ''; n4dasp :string = '';n44das :string = ''; n44dasp :string = '';
	n5das :string = ''; n5dasp :string = '';n55das :string = ''; n55dasp :string = '';
	n6das :string = ''; n6dasp :string = '';n66das :string = ''; n66dasp :string = '';
	n7das :string = ''; n7dasp :string = '';n77das :string = ''; n77dasp :string = '';
	n8das :string = ''; n8dasp :string = '';n88das :string = ''; n88dasp :string = '';
	n9das :string = ''; n9dasp :string = '';n99das :string = ''; n99dasp :string = '';
	cur_m_das :string = ''; cur_a_das :string = '';
	pnam1 :string = ''; pnam2 :string = ''; pnam3 :string = ''; pnam4 :string = ''; pnam5 :string = ''; pnam6 :string = ''; pnam7 :string = ''; pnam8 :string = ''; pnam9 :string = '';
	ppos1 :string = ''; ppos2 :string = ''; ppos3 :string = ''; ppos4 :string = ''; ppos5 :string = ''; ppos6 :string = ''; ppos7 :string = ''; ppos8 :string = ''; ppos9 :string = '';
	pras1 :string = '';pras2 :string = '';pras3 :string = '';pras4 :string = '';pras5 :string = '';pras6 :string = '';pras7 :string = '';pras8 :string = '';pras9 :string = '';
	pnak1 :string = '';pnak2 :string = '';pnak3 :string = '';pnak4 :string = '';pnak5 :string = '';pnak6 :string = '';pnak7 :string = '';pnak8 :string = '';pnak9 :string = '';
	nakl1 :string = '';nakl2 :string = '';nakl3 :string = '';nakl4 :string = '';nakl5 :string = '';nakl6 :string = '';nakl7 :string = '';nakl8 :string = '';nakl9 :string = '';
  constructor(public navCtrl: NavController, public shareService: ShareService, public renderer: Renderer2, el: ElementRef, public platform: Platform, public horoService: HoroscopeService
)
  {
	platform.ready().then((readySource) => {
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
	});
  }
  ngAfterViewInit() {
	this.moon_sign = '';
	this.moon_deg = 0;
	this.asc_sign  = '';
	this.trikona_lords  = '';
	this.kendra_lords  = '';
	this.akashWani = '';
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
  loadHoro()
  {
	console.log('loadHoro');
		var plPos = this.shareService.getPLPOS();
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
					} else if (pls[k].split(' ')[1] == 'Mo') {
						this.moon_sign = sign;
						this.moon_deg = Number(pls[k].split(' ')[0]);
					}
				}
			}
		}
		
		//target.innerHTML = '';
	//	target.appendChild(grid(4, 25, 100%, plPos));
        this.renderer.appendChild(this.birthChart.nativeElement, this.grid(4, this.device_width/4, this.device_width, plPos));
		var bstar = this.calcBirthStar(this.moon_sign, this.moon_deg);
		console.log(bstar);
		this.shareService.setBirthStar(bstar.split('|')[0]);
		var h_code;
		if(this.shareService.getLANG().toLowerCase() == 'en') {
			h_code = "<h2>Horoscope Analysis</h2>";
			h_code += "<span>You are born in <strong>" + rashis[this.asc_sign].split('\|')[1] + "</strong> Ascendant. Your Moon sign is <strong>" + rashis[this.moon_sign].split('\|')[1] + "</strong>. Your Birth Star is <strong>" + bstar.split('|')[0] + '</strong></span>';
		} else if(this.shareService.getLANG().toLowerCase() == 'te') {
			h_code = "<h2>జాతక విశ్లేషణ</h2>";
			h_code += "<span>మీరు <strong> " + this.translate(rashis[this.asc_sign].split('\|')[1]) + "</strong> లగ్నమ్ లో జన్మించారు.  మీ జన్మ రశి  <strong>" + this.translate(rashis[this.moon_sign].split('\|')[1]) + "</strong>. మీ జన్మ నక్షత్రమ్ <strong> " + this.translate(bstar.split('|')[0]) + '</strong></span>';
		} else if(this.shareService.getLANG().toLowerCase() == 'hi') {
			h_code = "<h2>जन्म-कुण्डली विश्लेषण</h2>";
			h_code += "<span>आप का जन्म <strong> " + this.translate(rashis[this.asc_sign].split('\|')[1]) + "</strong> लग्न में हुआ था. आप के जन्म राशि <strong>" + this.translate(rashis[this.moon_sign].split('\|')[1]) + "</strong>. आप के जन्म नक्षत्र <strong> " + this.translate(bstar.split('|')[0]) + '</strong></span>';
		} else if(this.shareService.getLANG().toLowerCase() == 'ta') {
			h_code = "<h2>ஜாதக ஆய்வு</h2>";
			h_code += "<span>நீங்கள் <strong> " + this.translate(rashis[this.asc_sign].split('\|')[1]) + "</strong> லக்னத்தில் பிறந்திருக்கிறீர்கள்.  உங்களுடைய இராசி <strong>" + this.translate(rashis[this.moon_sign].split('\|')[1]) + "</strong>. நீங்கள் பிறந்த நட்சத்திரம் <strong> " + this.translate(bstar.split('|')[0]) + "</strong>.</span>";
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
		var m_dy = 30.436875;
		var d_yr = 365.2425;
		//let vim_c: number = (parseInt(dasha_conv[this.moon_sign], 10) + this.moon_deg) / 120;
		//var vim_s = vim_c.toString();
		//var vim_b = '0.' + vim_s.split('.')[1];
		//var vim_a = parseFloat(vim_b) * 9;
		//vim_b = vim_a.toString();
		//var cosl = Math.floor(vim_a);
		//var rul = const_ruler[cosl.toString()];
		//var das = dashas[rul];
		//var ela = parseFloat('.' + vim_b.split('.')[1]) * parseInt(das, 10);
		//var rem = parseInt(das, 10) - ela;
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

		var dob = this.shareService.getDOB().split('T')[0].split('-')[1] + '/' + this.shareService.getDOB().split('T')[0].split('-')[2] + '/' + this.shareService.getDOB().split('T')[0].split('-')[0];
		var elp_days = this.daydiff(this.parseDate(dob), new Date());
		//var cur_das = rem_days;
		//var n_cosl = cosl;
		//var curr_rul = Number(dashas[arr[vi]])//const_ruler[n_cosl.toString()];
		//while (cur_das <= elp_days) {
			//n_cosl++;
			//curr_rul = const_ruler[n_cosl.toString()];
			//var d = dashas[curr_rul];
			//cur_das += parseInt(d) * d_yr;
		//}
		//h_code += '<br\><div id="dvim"></div>';
		
        var dob_c = new Date(this.shareService.getDOB());
		//var s_das_dys = this.getDashaDays(bstar.split('|')[2].toLowerCase());
        dob_c.setDate(dob_c.getDate() + rem_days);
		this.fdas = this.translate(bstar.split('|')[2].toUpperCase());
		this.fdasp = dob.split('/')[1] + '/' + dob.split('/')[0] + '/' + dob.split('/')[2] + ' To ' + dob_c.getDate().toString() + '/' + (dob_c.getMonth()+1).toString() + '/' + dob_c.getFullYear();
		this.buildAntarDasha(bstar.split('|')[2], 1, new Date(this.shareService.getDOB()), rem_days);
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
			//dob_c.setFullYear(dob_c.getFullYear() + Number(dashas[arr[vi]]));
			//var c_das_dys = this.getDashaDays(dashas[arr[vi]]);
			dob_c.setDate(dob_c.getDate() + Number(dashas[arr[vi].substring(0,2).toLowerCase()])*d_yr);
			//h_code += '<h4>' + this.translate(arr[vi]) + ' dasha - ' + dd + '/' + m + '/' + y + ' To ' + dob_c.getDate().toString() + '/' + (dob_c.getMonth()+1).toString() + //'/' + dob_c.getFullYear() + '</h4>';
			switch(v_iter)
			{
			   case 1:
			      this.sdas = this.translate(arr[vi].toUpperCase());
				  this.sdasp = dd + '/' + m + '/' + y + ' To ' + dob_c.getDate().toString() + '/' + (dob_c.getMonth()+1).toString() + '/' + dob_c.getFullYear();
				  break;
			   case 2:
			      this.tdas = this.translate(arr[vi].toUpperCase());
				  this.tdasp = dd + '/' + m + '/' + y + ' To ' + dob_c.getDate().toString() + '/' + (dob_c.getMonth()+1).toString() + '/' + dob_c.getFullYear();
				  break;
			   case 3:
			      this.fodas = this.translate(arr[vi].toUpperCase());
				  this.fodasp = dd + '/' + m + '/' + y + ' To ' + dob_c.getDate().toString() + '/' + (dob_c.getMonth()+1).toString() + '/' + dob_c.getFullYear();
				  break;
			   case 4:
			      this.fidas = this.translate(arr[vi].toUpperCase());
				  this.fidasp = dd + '/' + m + '/' + y + ' To ' + dob_c.getDate().toString() + '/' + (dob_c.getMonth()+1).toString() + '/' + dob_c.getFullYear();
				  break;
			   case 5:
			      this.sxdas = this.translate(arr[vi].toUpperCase());
				  this.sxdasp = dd + '/' + m + '/' + y + ' To ' + dob_c.getDate().toString() + '/' + (dob_c.getMonth()+1).toString() + '/' + dob_c.getFullYear();
				  break;
			   case 6:
			      this.svdas = this.translate(arr[vi].toUpperCase());
				  this.svdasp = dd + '/' + m + '/' + y + ' To ' + dob_c.getDate().toString() + '/' + (dob_c.getMonth()+1).toString() + '/' + dob_c.getFullYear();
				  break;
			   case 7:
			      this.edas = this.translate(arr[vi].toUpperCase());
				  this.edasp = dd + '/' + m + '/' + y + ' To ' + dob_c.getDate().toString() + '/' + (dob_c.getMonth()+1).toString() + '/' + dob_c.getFullYear();
				  break;
			   case 8:
			      this.ndas = this.translate(arr[vi].toUpperCase());
				  this.ndasp = dd + '/' + m + '/' + y + ' To ' + dob_c.getDate().toString() + '/' + (dob_c.getMonth()+1).toString() + '/' + dob_c.getFullYear();
				  break;
			   default:
			      break;
			}
		    this.buildAntarDasha(arr[vi], v_iter+1, startdt, 0);
		 }	
		 if(arr[vi] == bstar.split('|')[2]) {
			 v_start = 1;
		 }
		if(vi == 8) vi = -1;
		if(v_iter == 8) break;
	   }
	   console.log(this.cur_m_das);
		if(this.shareService.getLANG().toLowerCase() == 'en') {
			h_code += "<h3>You are now in " + ruler_name[this.cur_m_das.substring(0,2).toLowerCase()] + " Maha dasha and " + ruler_name[this.cur_a_das] + " Antar dasha.</h3> <br/>";
		} else if(this.shareService.getLANG().toLowerCase() == 'te') {
			h_code += "<h3>ఇప్పుడు మీరు " + this.translate(ruler_name[this.cur_m_das.substring(0,2).toLowerCase()]) + " మహా దశ మరియు " + this.translate(ruler_name[this.cur_a_das]) + " అన్తర్ దశ లో ఉన్నారు.</h3> <br/>";
		} else if(this.shareService.getLANG().toLowerCase() == 'hi') {
			h_code += "<h3>आप अभी  " + this.translate(ruler_name[this.cur_m_das.substring(0,2).toLowerCase()]) + " महा दशा और " + this.translate(ruler_name[this.cur_a_das]) + " अंतर दशा में है.</h3> <br/>";
		} else if(this.shareService.getLANG().toLowerCase() == 'ta') {
			h_code += "<h3>தற்போது உங்களுக்கு"  + this.translate(ruler_name[this.cur_m_das.substring(0,2).toLowerCase()]) + " தசை  " + this.translate(ruler_name[this.cur_a_das]) + ".</h3> <br/>";
		}
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
		for(let key of Object.keys(signs)) {
			if(signs[key] == 'na') continue;
		    sign = signs[key];
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
				pls = plPos[sign].split('\|');
				for (k = 0; k < pls.length; k++) {
					pl = pls[k].split(' ')[1];
					if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TRUE_NODE') {  //consider only true planets
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
	buildPratyantarDasha(mainlord :string, sublord :string, order :number, suborder :number, startdt :Date)
	{
	  var m_dy = 30.436875;
	  var d_yr = 365.2425;
	  var e_dys = 0;
		var arr = ["su","mo","ma","ra", "ju", "sa", "me", "ke", "ve"];
		var v_start = 0;
		var v_iter = 0;
		var a_per = 0;
		var s_dt = new Date(startdt.getTime());
	   for (var vi=0, len=arr.length; vi<len; vi++) {
	     if(arr[vi] == sublord || v_start == 1) { 
	        v_iter++;
			var m = (s_dt.getMonth()+1).toString();
			var dd = s_dt.getDate().toString();
			var y = s_dt.getFullYear().toString();
			var p_yrs = Number(dashas[mainlord])*Number(dashas[sublord])*Number(dashas[arr[vi]])/(120*120);
			s_dt.setDate(s_dt.getDate() + p_yrs*d_yr);
			this.shareService.addVIM(dd + '-' + m + '-' + y + '|' + s_dt.getDate().toString() + '-' + (s_dt.getMonth()+1).toString() + '-' + s_dt.getFullYear().toString(), mainlord, sublord, arr[vi]);
		    switch(order)
			{
			  case 1:
				this['f' + suborder.toString() + suborder.toString() + 'das'] += '<br/><span>' + mainlord + '-' + sublord + '-' + arr[vi] + '</span>';
				this['f' + suborder.toString() + suborder.toString() + 'dasp'] += '<br/><span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 2:
				this['s' + suborder.toString() + suborder.toString()  + 'das'] += '<br/><span>' + mainlord + '-' + sublord + '-' + arr[vi] + '</span>';
				this['s' + suborder.toString() + suborder.toString() + 'dasp'] += '<br/><span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 3:
			    this['t' + suborder.toString() + suborder.toString() + 'das'] += '<br/><span>' + mainlord + '-' + sublord + '-' + arr[vi] + '</span>';
				this['t' + suborder.toString() + suborder.toString() + 'dasp'] += '<br/><span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 4:
				this['fo' + suborder.toString() + suborder.toString() + 'das'] += '<br/><span>' + mainlord + '-' + sublord + '-' + arr[vi] + '</span>';
				this['fo' + suborder.toString() + suborder.toString() + 'dasp'] += '<br/><span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 5:
				this['fi' + suborder.toString() + suborder.toString() + 'das'] += '<br/><span>' + mainlord + '-' + sublord + '-' + arr[vi] + '</span>';
				this['fi' + suborder.toString() + suborder.toString() + 'dasp'] += '<br/><span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 6:
				this['sx' + suborder.toString() + suborder.toString() + 'das'] += '<br/><span>' + mainlord + '-' + sublord + '-' + arr[vi] + '</span>';
				this['sx' + suborder.toString() + suborder.toString() + 'dasp'] += '<br/><span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 7:
				this['sv' + suborder.toString() + suborder.toString() + 'das'] += '<br/><span>' + mainlord + '-' + sublord + '-' + arr[vi] + '</span>';
				this['sv' + suborder.toString() + suborder.toString() + 'dasp'] += '<br/><span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 8:
				this['e' + suborder.toString() + suborder.toString() + 'das'] += '<br/><span>' + mainlord + '-' + sublord + '-' + arr[vi] + '</span>';
				this['e' + suborder.toString() + suborder.toString() + 'dasp'] += '<br/><span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 9:
				this['n' + suborder.toString() + suborder.toString() + 'das'] += '<br/><span>' + mainlord + '-' + sublord + '-' + arr[vi] + '</span>';
				this['n' + suborder.toString() + suborder.toString() + 'dasp'] += '<br/><span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  default:
				break;
			}
			v_start = 1;
		 }	
		if(vi == 8) vi = -1;
		if(v_iter == 9) break;
	   }
	}
	buildAntarDasha(lord :string, order :number, startdt :Date, remdays :number)
	{
	  var m_dy = 30.436875;
	  var d_yr = 365.2425;
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
		  //var e_dt = s_dt;
			console.log(key);
		  var ads = das[key];
		  console.log(ads);
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
			var cur_date = new Date();
			if(cur_date >= start_das && cur_date <= s_dt) {
			  this.cur_m_das = lord;
			  this.cur_a_das = key;
			}
		    a_per++;
		    switch(order)
			{
			  case 1:
				this['f' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['f' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 2:
				this['s' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['s' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 3:
			    this['t' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['t' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 4:
				this['fo' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['fo' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 5:
				this['fi' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['fi' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 6:
				this['sx' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['sx' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 7:
				this['sv' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['sv' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 8:
				this['e' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['e' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 9:
				this['n' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['n' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  default:
				break;
			}
			this.buildPratyantarDasha(lord.substring(0,2).toLowerCase(), key, order, a_per, new Date(start_das.getTime()));
		  }
		}
	  } else {
		var a_per = 0;
	    var s_dt = new Date(startdt.getTime());
	    //var tot_dys = Number(dashas[lord.substring(0,2)])*d_yr;
		//e_dys = tot_dys - remdays;
		//var ffd = 0;
		for(let key of Object.keys(das)) {
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
			var cur_date = new Date();
			if(cur_date >= start_das && cur_date <= s_dt) {
			  this.cur_m_das = lord;
			  this.cur_a_das = key;
			}
		    switch(order)
			{
			  case 1:
				this['f' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['f' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 2:
				this['s' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['s' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 3:
			    this['t' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['t' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 4:
				this['fo' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['fo' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 5:
				this['fi' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['fi' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 6:
				this['sx' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['sx' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 7:
				this['sv' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['sv' + a_per.toString() + 'dasp'] += '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 8:
				this['e' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['e' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  case 9:
				this['n' + a_per.toString() + 'das'] = '<span>' + this.translate(lord) + '-' + this.translate(ruler_name[key].toLowerCase()) + '</span>';
				this['n' + a_per.toString() + 'dasp'] = '<span>' + dd + '/' + m + '/' + y + ' To ' + s_dt.getDate().toString() + '/' + (s_dt.getMonth()+1).toString() + '/' + s_dt.getFullYear().toString() + '</span>';
			    break;
			  default:
				break;
			}
			this.buildPratyantarDasha(lord.substring(0,2).toLowerCase(), key, order, a_per, new Date(start_das.getTime()));
		}
	  }
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
		var s4 = 15;
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
						this.renderer.appendChild(text, document.createTextNode(this.shareService.getDOB().split('T')[0].split('-')[2] + '/' + this.shareService.getDOB().split('T')[0].split('-')[1] + '/' + this.shareService.getDOB().split('T')[0].split('-')[0]));
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
					return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
				}
			} 
			else if(nak.location.start.split(',')[1] == moonsign.toLowerCase()) {
			  if(moonmins >= nak_s) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
			}
			else if(nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
			  if(moonmins <= nak_e) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
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
					return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
				}
			} 
			else if(nak.location.start.split(',')[1] == sign.toLowerCase()) {
			  if(mins >= nak_s) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
			}
			else if(nak.location.end.split(',')[1] == sign.toLowerCase()) {
			  if(mins <= nak_e) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler;
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
	
}
