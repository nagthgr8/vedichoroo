import { Component, Renderer2, AfterViewInit, ViewChild, ElementRef, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { ChartAnalysisPage } from '../chart-analysis/chart-analysis.page'
import * as signs from '../signs.json';
import * as o_signs from '../o_signs.json'
import * as o_rashis from '../o_rashis.json';
declare var admob;
@Component({
  selector: 'app-divcharts',
  templateUrl: './divcharts.page.html',
  styleUrls: ['./divcharts.page.scss'],
})
export class DivchartsPage implements OnInit {
  @ViewChild('divChart', {static: true}) divChart;
  signs_v: any = (signs as any).default;
  o_signs_v: any = (o_signs as any).default;
  o_rashis_v: any = (o_rashis as any).default;
  device_width :number = 0;
  device_height :number = 0;
  chartanls: string = '';
  svgHoro: any;
  chart: any;
  asc_sign: string = '';
  //lstnr_D1: Function; lstnr_D2: Function; lstnr_D3: Function; lstnr_D4: Function; lstnr_D7: Function; lstnr_D9: Function; lstnr_D10: Function; lstnr_D12: Function; lstnr_D16: Function; lstnr_D20: Function; lstnr_D24: Function; lstnr_D27: Function; lstnr_D30: Function; lstnr_D40: Function; lstnr_D45: Function; lstnr_D60: Function;
  lstnr: () => void;
  atmk: string = '';
  binf: any;
  item: any = {};
  plan: any;
  shwAD: boolean = false;
  constructor(private router: Router, private platform: Platform, public shareService: ShareService, private horoService: HoroscopeService, public renderer: Renderer2, public eleRef: ElementRef) { 
  }

  ngOnInit() {
	  this.item.ID = '-1';
 	this.binf = this.router.getCurrentNavigation().extras.state;
  this.platform.ready().then(() => {
  	  this.shareService.plan
		   .subscribe(res => {
			this.plan = res;
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
		  admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/8722408722',
			  ios: 'ca-app-pub-8442845715303800/8722408722',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/8722408722',
				ios: 'ca-app-pub-8442845715303800/8722408722',
			  })
			}, 10000)
		  })	
			admob.interstitial.load({
					id: {
					  // replace with your ad unit IDs
					  android: 'ca-app-pub-8442845715303800/4129299859',
					  ios: 'ca-app-pub-8442845715303800/4129299859',
					  },
			}).then(() => {this.shwAD = true;})			
		 }
	}, (err) => {
	});	 
			
		console.log('Width: ' + this.platform.width());
		this.device_width = this.platform.width();
		console.log('Height: ' + this.platform.height());
		this.device_height = this.platform.height();
	 let plPos = this.updateNodePos();
	 this.chart = "1";
	 //this.calcDivChart(Number(this.chart));
	 //var plPos = this.shareService.getPLPOS();
	 let ak: number = 0;
 	for (var i = 0; i < 16; i++) {
		var sign = this.signs_v[i];
		if (plPos.hasOwnProperty(sign)) {
			var pls = plPos[sign].split('\|');
			console.log(pls);
			for (var k = 0; k < pls.length; k++) {
			  var pl = pls[k].split(' ')[1];
			  if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'TRUE_NODE' && pl != 'TR') {
				let dp: string = pls[k].split(' ')[0];
				let po = this.shareService.dmsToDec(Number(dp.split('.')[0]),Number(dp.split('.')[1]),Number(dp.split('.')[2]));
				if( po > ak) {
					this.atmk = pls[k].split(' ')[1];
					ak = po;
				}
			  }
			}
		}
	}
	 
	 this.loadHoro(plPos, this.divChart.nativeElement, 'RASHI', 'D1');
	 let oP: string[] = [];
	 oP = this.calcHoraChart(plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'HORA', 'D2');
	 oP = this.calcDivChart(3, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'DRESHKANA', 'D3');
	 oP = this.calcDivChart(4, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'CHATHURTHAMSA', 'D4');
	 oP = this.calcDivChart(7, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'SAPTAMSA', 'D7');
	 oP = this.calcDivChart(9, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'NAVAMSA', 'D9');
	 oP = this.calcDivChart(10, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'DASAMSA', 'D10');
	 oP = this.calcDivChart(12, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'DWADASAMSA', 'D12');
	 oP = this.calcDivChart(16, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'SHODASAMSA', 'D16');
	 oP = this.calcDivChart(20, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'VIMSAMSA', 'D20');
	 oP = this.calcDivChart(24, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'CHATURVIMSAMSA', 'D24');
	 oP = this.calcDivChart(27, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'SAPTAVIMSAMSA', 'D27');
	 oP = this.calcDivChart(30, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'TRIMASAMSA', 'D30');
	 oP = this.calcDivChart(40, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'KHAVEDAMSA', 'D40');
	 oP = this.calcDivChart(45, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'AKSHAVEDAMSA', 'D45');
	 oP = this.calcDivChart(60, plPos)
	 this.loadHoro(oP, this.divChart.nativeElement, 'SHASTAMSA', 'D60');
	  if(this.shareService.getLANG() == 'en') {
		this.chartanls =  '<span> TAP on each chart to reveal more information</span>';
	  } else if(this.shareService.getLANG() == 'te') {
		this.chartanls = 'మరిన్ని వివరాలకు చార్ట్ ని ట్టాప్ చేయండి' ;
	  } else if(this.shareService.getLANG() == 'hi') {
	    this.chartanls = 'अधिक जानकारी के लिए प्रत्येक चार्ट पर टैप करें';
	  } else if(this.shareService.getLANG() == 'ta') {
	    this.chartanls = 'ஒவ்வொரு விளக்கப்படத்தையும் மேலும் வெளிப்படுத்த';
	  }
	 //document.addEventListener('admob.interstitial.close', () => {
	  // handle event
	   // if(this.item.ID != '-1')
		//	this.router.navigate(['/chart-analysis'], {state: this.item});
		console.log('creating event listners');
		let listItems = Array.from(this.eleRef.nativeElement.querySelectorAll('*[id^="D"]'))
		listItems.forEach((listItem, j) => {
			this.renderer.listen(
				listItem, 
				'click',
				(evt) => {
					console.log('clicked', evt);
					console.log('clicked ', evt.path[0]);
					console.log('clicked id', evt.path[0].id);
					this.item.ID = evt.path[2].id;
					this.item.atmk = this.atmk;
					this.item.binf = this.binf;
					console.log('routing to', this.item.ID);
					if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree'  || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year'|| !this.shwAD) 
						this.router.navigate(['/chart-analysis'], {state: this.item});
					else {
						if(this.shwAD)
							admob.interstitial.show();	
						else 
							this.router.navigate(['/chart-analysis'], {state: this.item});
					}
				}
			);
		})
	});
	
 }
  ngOnDestroy() {
    if (this.lstnr) {
      this.lstnr();
    }
 }	
  ionViewDidEnter() {
		if (this.lstnr) {
		  this.lstnr();
		}
	this.lstnr = this.renderer.listen('document', 'admob.interstitial.close', (event) => {
		 console.log('close event triggered', this.item.ID);
	  // handle event
		if (this.lstnr) {
		  this.lstnr();
		}
		admob.interstitial.load({
				id: {
				  // replace with your ad unit IDs
				  android: 'ca-app-pub-8442845715303800/4129299859',
				  ios: 'ca-app-pub-8442845715303800/4129299859',
				  },
		}).then(() => {this.shwAD = true;})			
	    if(this.item.ID != '-1'){
			console.log('routing to', this.item);
			this.router.navigate(['/chart-analysis'], {state: this.item});
		}
	 })	
  }
  calcHoraChart(plPos)
  {
	let navPls: string[] = [];
	//var plPos = this.shareService.getPLPOS();
	var sgns = ["ar","ta","ge","cn","le","vi","li","sc","sa","cp","aq","pi"];
	for (var i = 0; i < 12; i++) {
		var sign = sgns[i];
		let hora_sign: string = '';
		if (plPos.hasOwnProperty(sign)) {
			var pls = plPos[sign].split('\|');
			for (var k = 0; k < pls.length; k++) {
			   console.log('pl=' + pls[k]);
				var pl = pls[k].split(' ')[1];
				if (pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'TRUE_NODE' && pl != 'TR') {  //consider only true planets
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
  calcDivChart(ndivs, plPos)
  {
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
				}
				else
				{
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
  calcNavamsa(plPos) {
	let navPls: string[] = [];
	//var plPos = this.shareService.getPLPOS();
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
				console.log(navPls);
			}
		}
      }  
	  return navPls;
	}
	calcDasamsa(plPos)
	{
	let navPls: string[] = [];
	let sec: number = 30/10, secp: number = 0;
	console.log('no. of divs=' + sec.toString());
	//var plPos = this.shareService.getPLPOS();
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
	calcD4(plPos)
	{
	console.log('calcD4');
	let navPls: string[] = [];
	//var plPos = this.shareService.getPLPOS();
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
	updateAsc(plPos)
	{
   		for (var i = 0; i < 16; i++) {
			var sign = this.signs_v[i];
			if (plPos.hasOwnProperty(sign)) {
			    
				var pls = plPos[sign].split('\|');
				for (var k = 0; k < pls.length; k++) {
					if (pls[k].split(' ')[1] == 'AC') { 
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
	  
    //console.log('loadHoro' + title);
	//console.log(plPos);
	//var plPos = this.shareService.getPLPOS();
	//const dv = this.renderer.createElement('div');
	//this.renderer.setProperty(dv, 'id', id);
	//this.renderer.setStyle(dv, 'float', 'left');
	//this.renderer.addClass(dv, 'divchart');
	this.updateAsc(plPos);
	if(this.shareService.getCHTYP() == 'sind')
			this.svgHoro = this.grid(4, this.device_width/8, this.device_width/2, plPos, title, id);
		else if(this.shareService.getCHTYP() == 'nind')
			this.svgHoro = this.drawNIchart(plPos, title, id);
		else
			this.svgHoro = this.grid(4, this.device_width/8, this.device_width/2, plPos, title, id);

   this.renderer.appendChild(ele, this.svgHoro);
	
	//this.renderer.appendChild(ele, this.grid(4, this.device_width/8, this.device_width/2, plPos, title,  id));
	//this.renderer.appendChild(ele, dv);
	//this['lstnr_' + id] = this.renderer.listen(dv, 'click', this.logElement);

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
						this.renderer.setAttribute(box, "stroke", "#d35400");
						this.renderer.setAttribute(box, "fill", "#ffd9a3");
						this.renderer.setAttribute(box, "id", "b" + number);
						this.renderer.appendChild(g, box);
						var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						this.renderer.appendChild(text, document.createTextNode(title.toUpperCase()));
						this.renderer.setAttribute(text, "fill", "#d35400");
						this.renderer.setAttribute(text, "font-size", (title.length > 10) ? (10).toString() : s4.toString());
						this.renderer.setAttribute(text, "font-weight", 'bold');
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
				//var sign = "url(#sign-" + number.toString() + ")";
				this.renderer.setAttribute(box, "width", size.toString());
				this.renderer.setAttribute(box, "height", size.toString());
				//this.renderer.setAttribute(box, "border", border.toString());
				this.renderer.setAttribute(box, "stroke", (this.signs_v[number] == this.asc_sign) ? "#FF5733" : "#d35400");
				this.renderer.setAttribute(box, "stroke-width", (this.signs_v[number] == this.asc_sign) ? (border+2).toString() : border.toString());
				this.renderer.setAttribute(box, "fill", "none");
				this.renderer.setAttribute(box, "id", "b" + number.toString());
				this.renderer.appendChild(g, box);
				var sign = this.signs_v[number];
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
		box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.renderer.setAttribute(box, "width", size.toString());
		this.renderer.setAttribute(box, "height", size.toString());
		this.renderer.setAttribute(box, "stroke", "#000000");
		this.renderer.setAttribute(box, "stroke-width", "4");
		this.renderer.setAttribute(box, "fill", "none");
		g.appendChild(box);
		svg.appendChild(g);
		number = numberPerSide * i + j;
	    //this['lstnr_' + id] = this.renderer.listen(svg, 'click', (event) => {
		//	// Do something with 'event'
		//	console.log('clicked ', event.path);
		//	console.log('clicked ', event.path[2]);
		//	this.item.ID = event.path[2].id;
		//	this.item.atmk = this.atmk;
		//	this.item.binf = this.binf;
		//	if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree'  || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year'|| !this.shwAD) 
		//		this.router.navigate(['/chart-analysis'], {state: this.item});
		//	else {
		//		admob.interstitial.show();			
		//	}
		//});
		return svg;
	};
	logElement({target}) {
      if(target) {
      console.log('Target: ', target);
      // Add Business Logic here
    }
  }
	drawNIchart(plps, title, id) {
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
				   this.asc_sign = ras[r];
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
		this.renderer.setProperty(svg, "id", id);
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
		var hcord = this.getHXY(1, this.device_width/2);
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
						this.renderer.setAttribute(text, "font-size", "8");
						this.renderer.setAttribute(text, "font-weight", 'bold');
						this.renderer.setAttribute(text, "x", (bxz*2).toString());
						this.renderer.setAttribute(text, "y", (bxz*2).toString());
						this.renderer.setAttribute(text, "alignment-baseline", "middle");
						this.renderer.setAttribute(text, "text-anchor", "middle");
						this.renderer.setAttribute(text, "id", id);
						g.appendChild(text);

	svg.appendChild(g);
	 this['lstnr_' + id] = this.renderer.listen(svg, 'click', (event) => {
			// Do something with 'event'
			console.log('clicked ', event.path);
			console.log('clicked ', event.path[2]);
			this.item.ID = event.path[2].id;
			this.item.atmk = this.atmk;
			this.item.binf = this.binf;
			if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') 
				this.router.navigate(['/chart-analysis'], {state: this.item});
			else {
				admob.interstitial.load({
				id: {
				  // replace with your ad unit IDs
				  android: 'ca-app-pub-8442845715303800/4129299859',
				  ios: 'ca-app-pub-8442845715303800/4129299859',
				  },
				}).then(() => admob.interstitial.show())			
				
			}
		});
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

}
