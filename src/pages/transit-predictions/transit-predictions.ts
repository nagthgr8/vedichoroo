import { Component, Renderer2, AfterViewInit, ViewChild, ElementRef, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { AstrologersPage } from '../astrologers/astrologers';
import { ShareService } from '../../app/share.service'
import { HoroscopeService } from '../../app/horoscope.service';
import { PlanetPos } from '../../app/planet-pos';
import * as signs from '../horoscope/signs.json';
import * as o_signs from '../horoscope/o_signs.json';
import * as o_rashis from '../horoscope/o_rashis.json';

/**
 * Generated class for the TransitPredictionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@NgModule({
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'page-transit-predictions',
  templateUrl: 'transit-predictions.html',
})
export class TransitPredictionsPage implements OnInit, AfterViewInit {
   @ViewChild('birthChart') birthChart;
   @ViewChild('tranChart') tranChart;
    today: any = '';
	oPlanet :PlanetPos[] = [];
    objectKeys = Object.keys;
	moon_sign :string = '';
	moon_deg :number = 0;
	asc_sign :string = '';
	device_width :number = 0;
	device_height :number = 0;
    info: string = '';
	showNOTE: boolean = false;
  constructor(platform: Platform, public navCtrl: NavController, public navParams: NavParams, public shareService: ShareService, private horoService: HoroscopeService, public renderer: Renderer2) {
   platform.ready().then(() => {
        this.info = 'Please wait...';
		console.log('Width: ' + platform.width());
		this.device_width = platform.width();
		console.log('Height: ' + platform.height());
		this.device_height = platform.height();
	  this.horoService.getTransPreds(navParams.get('item').dob)
		   .subscribe(res => {
			//this.shareService.setPREDS(res);
			//let preds = this.shareService.getPREDS();
				for(let key of Object.keys(res)) {
				    let pl : PlanetPos = {
					  pos: 18,
					  sign: '',
					  star: '',
					  sub: '',
					  sig: '',
					  lif_e: '',
					  inds: res[key]
					};
					this.oPlanet[key] = pl;
				}
			this.info = '';
			this.showNOTE = true;
		  }, (err) => {
			this.info = err;
	  }) ;
	});
  }
  ngAfterViewInit() {
    this.today = Date.now();
	var cd = new Date();
	let dob: string = cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes();
	this.horoService.getHoro(this.shareService.getLAT(), this.shareService.getLNG(), dob, this.shareService.getTimezone())
	 .subscribe(res => {
		this.loadHoro(this.shareService.getPLPOS(), this.birthChart.nativeElement, 'NATAL CHART');
		this.loadHoro(res, this.tranChart.nativeElement, 'TRANSIT CHART');
	});
  }

  ngOnInit() {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TransitPredictionsPage');
  }
  loadHoro(plPos, ele, title)
  {
    console.log('loadHoro');
	console.log(plPos);
 		for (var i = 0; i < 16; i++) {
			var sign = signs[i];
			if (plPos.hasOwnProperty(sign)) {
			    
				var pls = plPos[sign].split('\|');
				console.log(pls);
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
					} else if (pls[k].split(' ')[1] == 'Mo') {
						this.moon_sign = sign;
						this.moon_deg = Number(pls[k].split(' ')[0]);
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
		var s1 = size/2;
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
						this.renderer.setAttribute(box, "fill", "#ffffff");
						this.renderer.setAttribute(box, "id", "b" + number);
						this.renderer.appendChild(g, box);
						var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						this.renderer.appendChild(text, document.createTextNode(title));
						this.renderer.setAttribute(text, "fill", "#0f0f0f");
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
				this.renderer.setAttribute(box, "stroke", (signs[number] == this.asc_sign) ? "#FF5733" : (signs[number] == this.moon_sign) ? "#001EFF": "#000000");
				//this.renderer.setAttribute(box, "stroke", (signs[number] == this.moon_sign_sign) ? "#001EFF" : "#000000");
				this.renderer.setAttribute(box, "stroke-width", (signs[number] == this.asc_sign) ? (border+2).toString() : (signs[number] == this.moon_sign) ? (border+2).toString() : border.toString());
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
  
	more()
	{
	let item: any = {};
	item.title = 'Talk to Astrologer';
	this.navCtrl.push(AstrologersPage, {
      item: item
	  });
	}
}
