import { Component, Renderer2, AfterViewInit, ViewChild, ElementRef, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AppRate } from '@ionic-native/app-rate';
import { HoroscopeService } from '../../app/horoscope.service';
import { ShareService } from '../../app/share.service'
import * as signs from '../horoscope/signs.json';
import * as o_signs from '../horoscope/o_signs.json'
import * as rashis from '../horoscope/rashis.json';
import * as o_rashis from '../horoscope/o_rashis.json';

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
  selector: 'page-rajayoga',
  templateUrl: 'rajayoga.html',
})
export class RajayogaPage implements OnInit, AfterViewInit {
  @ViewChild('birthChart') birthChart;
  @ViewChild('navChart') navChart;
  device_width :number = 0;
  device_height :number = 0;
  objectKeys = Object.keys;
  yogas: any;
  navPls: string[] = [];
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, private appRate: AppRate, public shareService: ShareService, private horoService: HoroscopeService, public renderer: Renderer2) {
  platform.ready().then(() => {
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
		this.yogas = this.shareService.getYOGAS();
		console.log(Object.keys(this.yogas));
	  
    });
	
  }
  ngAfterViewInit() {
	this.loadHoro(this.shareService.getPLPOS(), this.birthChart.nativeElement, 'BIRTH CHART');
	this.calcNavamsa();
	this.loadHoro(this.navPls, this.navChart.nativeElement, 'NAVAMSA');
  }

  ngOnInit() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RajayogaPage');
  }
 
  calcNavamsa()
  {
	var plPos = this.shareService.getPLPOS();
	var sgns = ["ar","ta","ge","cn","le","vi","li","sc","sa","cp","aq","pi"];
	for (var i = 0; i < 12; i++) {
		var sign = sgns[i];
		if (plPos.hasOwnProperty(sign)) {
			var pls = plPos[sign].split('\|');
			for (var k = 0; k < pls.length; k++) {
				var pl = pls[k].split(' ')[1];
				//if (pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'TRUE_NODE') {  //consider only true planets
					let po: number = Number(pls[k].split(' ')[0]);
					console.log(sign);
					console.log(po);
					let spos: number;
					if(po < 3.21){
						spos = 1;
					}else if(po > 3.20 && po < 6.41 ){
						spos = 2;
					}else if(po > 6.40 && po < 10.01 ){
						spos = 3;
					}else if(po > 10 && po < 13.21 ){
						spos = 4;
					}else if(po > 13.20 && po < 16.41 ){
						spos = 5;
					}else if(po > 16.40 && po < 20.01 ){
						spos = 6;
					}else if(po > 20.01 && po < 23.21 ){
						spos = 7;
					}else if(po > 23.20 && po < 26.41 ){
						spos = 8;
					}else if(po > 26.40 && po < 30 ){
						spos = 9;
					}
					console.log(spos);
					let sord: number;
					switch(sign)
					{
					  case 'ar':
						sord = 1;
						break;
					  case 'ta':
						sord = 10;
						break;
					  case 'ge':
						sord = 7;
						break;
					  case 'cn':
						sord = 4;
						break;
					  case 'le':
						sord = 1;
						break;
					  case 'vi':
						sord = 10;
						break;
					  case 'li':
						sord = 7;
						break;
					  case 'sc':
						sord = 4;
						break;
					  case 'sa':
						sord = 1;
						break;
					  case 'cp':
						sord = 7;
						break;
					  case 'aq':
						sord = 4;
						break;
					  case 'pi':
						sord = 1;
						break;
					  default:
						break;
					}
					console.log(sord);
				//}
				let navp :number = sord + (spos-1);
				navp = (navp > 12) ? navp - 12: navp;
				console.log(navp);
				switch(navp)
				{
				  case 1:
				    if(!this.navPls.hasOwnProperty('ar'))
						this.navPls['ar'] = pls[k];
					else
						this.navPls['ar'] += '|' + pls[k];
				    break;
				  case 2:
				    if(!this.navPls.hasOwnProperty('ta'))
						this.navPls['ta'] = pls[k];
					else
						this.navPls['ta'] += '|' + pls[k];
				    break;
				  case 3:
				    if(!this.navPls.hasOwnProperty('ge'))
						this.navPls['ge'] = pls[k];
					else
						this.navPls['ge'] += '|' + pls[k];
					
				    break;
				  case 4:
				    if(!this.navPls.hasOwnProperty('cn'))
						this.navPls['cn']=pls[k];
					else
						this.navPls['cn'] += '|' + pls[k];
				    break;
				  case 5:
				    if(!this.navPls.hasOwnProperty('le'))
						this.navPls['le'] = pls[k];
					else
						this.navPls['le'] += '|' + pls[k];
				    break;
				  case 6:
				    if(!this.navPls.hasOwnProperty('vi'))
						this.navPls['vi']=pls[k];
					else
						this.navPls['vi'] += '|' + pls[k];
				    break;
				  case 7:
				    if(!this.navPls.hasOwnProperty('li'))
						this.navPls['li']=pls[k];
					else
						this.navPls['li'] += '|' + pls[k];
				    break;
				  case 8:
				    if(!this.navPls.hasOwnProperty('sc'))
						this.navPls['sc']=pls[k];
					else
						this.navPls['sc'] += '|' + pls[k];
				    break;
				  case 9:
				    if(!this.navPls.hasOwnProperty('sa'))
						this.navPls['sa']=pls[k];
					else
						this.navPls['sa'] += '|' + pls[k];
				    break;
				  case 10:
				    if(!this.navPls.hasOwnProperty('cp'))
						this.navPls['cp']=pls[k];
					else
						this.navPls['cp'] += '|' + pls[k];
				    break;
				  case 11:
				    if(!this.navPls.hasOwnProperty('aq'))
						this.navPls['aq'] = pls[k];
					else
						this.navPls['aq'] += '|' + pls[k];
				    break;
				  case 12:
				    if(!this.navPls.hasOwnProperty('pi'))
						this.navPls['pi']=pls[k];
					else
						this.navPls['pi'] += '|' + pls[k];
				    break;
				  default:
				    break;
				}
				console.log(this.navPls);
			}
		}
	}
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
					}
				}
			}
		}
   this.renderer.appendChild(ele, this.grid(4, this.device_width/8, this.device_width/2, plPos, title));
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
}
