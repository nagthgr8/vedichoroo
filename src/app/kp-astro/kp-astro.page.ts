import { Component, Renderer2, AfterViewInit, ViewChild, ElementRef, OnInit, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { Platform, MenuController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { ShareService } from '../share.service';
import { HoroscopeService } from '../horoscope.service';
import * as signs from '../signs.json';
import * as signs_pos from '../signs_pos.json';
import * as o_signs from '../o_signs.json';
import * as rashis from '../rashis.json';
import * as o_rashis from '../o_rashis.json';
import * as rashi_imgs from '../rashi_imgs.json';
import * as ruler_name from '../ruler_name.json';
import * as sublords from '../sublords.json';
import { PlanetPos } from '../planet-pos';
import { HousePos } from '../house-pos';
import { PlWeekDay } from '../plweek-day';
import * as nakshatras from '../nakshatras.json';
import * as nakshatra_order from '../nakshatra_order.json';
import * as sun from '../sun.json';
import * as moon from '../moon.json';
import * as jupiter from '../jupiter.json';
import * as venus from '../venus.json';
import * as mercury from '../mercury.json';
import * as mars from '../mars.json';
import * as ketu from '../ketu.json';
import * as rahu from '../rahu.json';
import * as saturn from '../saturn.json';
import * as aspects from '../aspects.json';
import * as mon_weeks from '../mon_weeks.json';
import { Group } from '../group';
declare var admob;
@Component({
  selector: 'app-kp-astro',
  templateUrl: './kp-astro.page.html',
  styleUrls: ['./kp-astro.page.scss'],
})
export class KpAstroPage implements OnInit {
    @ViewChild('birthChart', {static: true}) birthChart;
	signs_v: any = (signs as any).default;
	signs_pos_v: any = (signs_pos as any).default;
	o_signs_v: any = (o_signs as any).default;
	rashis_v: any = (rashis as any).default;
	o_rashis_v: any = (o_rashis as any).default;
	rashi_imgs_v: any = (rashi_imgs as any).default;
	ruler_name_v: any =(ruler_name as any).default;
	sublords_v: any = (sublords as any).default;
	nakshatras_v: any = (nakshatras as any).default;
	nakshatra_order_v: any = (nakshatra_order as any).default;
	sun_v: any =(sun as any).default;
	moon_v: any =(moon as any).default;
	jupiter_v: any =(jupiter as any).default;
	venus_v: any =(venus as any).default;
	mercury_v: any =(mercury as any).default;
	mars_v: any =(mars as any).default;
	ketu_v: any =(ketu as any).default;
	rahu_v: any =(rahu as any).default;
	saturn_v: any =(saturn as any).default;
	aspects_v: any =(aspects as any).default;
	mon_weeks_v: any = (mon_weeks as any).default;
	binf: any;
	svgHoro: any;
	pnam1 :string = ''; pnam2 :string = ''; pnam3 :string = ''; pnam4 :string = ''; pnam5 :string = ''; pnam6 :string = ''; pnam7 :string = ''; pnam8 :string = ''; pnam9 :string = '';
	ppos1 :string = ''; ppos2 :string = ''; ppos3 :string = ''; ppos4 :string = ''; ppos5 :string = ''; ppos6 :string = ''; ppos7 :string = ''; ppos8 :string = ''; ppos9 :string = '';
	pras1 :string = '';pras2 :string = '';pras3 :string = '';pras4 :string = '';pras5 :string = '';pras6 :string = '';pras7 :string = '';pras8 :string = '';pras9 :string = '';
	pnak1 :string = '';pnak2 :string = '';pnak3 :string = '';pnak4 :string = '';pnak5 :string = '';pnak6 :string = '';pnak7 :string = '';pnak8 :string = '';pnak9 :string = '';
	nakl1 :string = '';nakl2 :string = '';nakl3 :string = '';nakl4 :string = '';nakl5 :string = '';nakl6 :string = '';nakl7 :string = '';nakl8 :string = '';nakl9 :string = '';
	sub1 :string = '';sub2 :string = '';sub3 :string = '';sub4 :string = '';sub5 :string = '';sub6 :string = '';sub7 :string = '';sub8 :string = '';sub9 :string = '';
	pn1: string =''; pn2: string =''; pn3: string =''; pn4: string =''; pn5: string =''; pn6: string =''; pn7: string =''; pn8: string =''; pn9: string ='';
	hnam1 :string = ''; hnam2 :string = ''; hnam3 :string = ''; hnam4 :string = ''; hnam5 :string = ''; hnam6 :string = ''; hnam7 :string = ''; hnam8 :string = ''; hnam9 :string = '';hnam10 :string = '';hnam11 :string = '';hnam12 :string = '';
	hpos1 :string = ''; hpos2 :string = ''; hpos3 :string = ''; hpos4 :string = ''; hpos5 :string = ''; hpos6 :string = ''; hpos7 :string = ''; hpos8 :string = ''; hpos9 :string = '';hpos10 :string = '';hpos11 :string = '';hpos12 :string = '';
	hras1 :string = '';hras2 :string = '';hras3 :string = '';hras4 :string = '';hras5 :string = '';hras6 :string = '';hras7 :string = '';hras8 :string = '';hras9 :string = '';hras10 :string = '';hras11 :string = '';hras12 :string = '';
	hnak1 :string = '';hnak2 :string = '';hnak3 :string = '';hnak4 :string = '';hnak5 :string = '';hnak6 :string = '';hnak7 :string = '';hnak8 :string = '';hnak9 :string = '';hnak10 :string = '';hnak11 :string = '';hnak12 :string = '';
	hsub1 :string = '';hsub2 :string = '';hsub3 :string = '';hsub4 :string = '';hsub5 :string = '';hsub6 :string = '';hsub7 :string = '';hsub8 :string = '';hsub9 :string = '';hsub10 :string = '';hsub11 :string = '';hsub12 :string = '';
	hssub1 :string = '';hssub2 :string = '';hssub3 :string = '';hssub4 :string = '';hssub5 :string = '';hssub6 :string = '';hssub7 :string = '';hssub8 :string = '';hssub9 :string = '';hssub10 :string = '';hssub11 :string = '';hssub12 :string = '';
	hn1: string =''; hn2: string =''; hn3: string =''; hn4: string =''; hn5: string =''; hn6: string =''; hn7: string =''; hn8: string =''; hn9: string =''; hn10: string =''; hn11: string =''; hn12: string ='';
	fpos: string = '';fras: string = '';fnak: string = ''; fsub: string ='';hssub13: string = '';
	apos: string = '';aras: string = '';anak: string = ''; asub: string = '';hssub14: string ='';
	L1ps1: string = '';L1ps2: string = '';L1ps3: string = '';L1ps4: string = '';L1ps5: string = '';L1ps6: string = '';L1ps7: string = '';L1ps8: string = '';L1ps9: string = '';
	L2ps1: string = '';L2ps2: string = '';L2ps3: string = '';L2ps4: string = '';L2ps5: string = '';L2ps6: string = '';L2ps7: string = '';L2ps8: string = '';L2ps9: string = '';
	L3ps1: string = '';L3ps2: string = '';L3ps3: string = '';L3ps4: string = '';L3ps5: string = '';L3ps6: string = '';L3ps7: string = '';L3ps8: string = '';L3ps9: string = '';
	L4ps1: string = '';L4ps2: string = '';L4ps3: string = '';L4ps4: string = '';L4ps5: string = '';L4ps6: string = '';L4ps7: string = '';L4ps8: string = '';L4ps9: string = '';
	L1hs1: string = '';L1hs2: string = '';L1hs3: string = '';L1hs4: string = '';L1hs5: string = '';L1hs6: string = '';L1hs7: string = '';L1hs8: string = '';L1hs9: string = '';L1hs10: string = '';L1hs11: string = '';L1hs12: string = '';
	L2hs1: string = '';L2hs2: string = '';L2hs3: string = '';L2hs4: string = '';L2hs5: string = '';L2hs6: string = '';L2hs7: string = '';L2hs8: string = '';L2hs9: string = '';L2hs10: string = '';L2hs11: string = '';L2hs12: string = '';
	L3hs1: string = '';L3hs2: string = '';L3hs3: string = '';L3hs4: string = '';L3hs5: string = '';L3hs6: string = '';L3hs7: string = '';L3hs8: string = '';L3hs9: string = '';L3hs10: string = '';L3hs11: string = '';L3hs12: string = '';
	L4hs1: string = '';L4hs2: string = '';L4hs3: string = '';L4hs4: string = '';L4hs5: string = '';L4hs6: string = '';L4hs7: string = '';L4hs8: string = '';L4hs9: string = '';L4hs10: string = '';L4hs11: string = '';L4hs12: string = '';
	krk1: string = '';krk2: string = '';krk3: string = '';krk4: string = '';krk5: string = '';krk6: string = '';krk7: string = '';krk8: string = '';krk9: string = '';
	oPlanet :PlanetPos[] = [];
	oHouse: HousePos[] = [];
    objectKeys = Object.keys;
	device_width :number = 0;
	device_height :number = 0;
	sun_sign :string = '';
	sun_deg :string = '';
	moon_sign :string = '';
	moon_deg :string = '';
	asc_sign :string = '';
	asc_deg :string = '';
	mdas1: string = '';adas1: string = '';pdas1: string = '';pend1: string = ''; 
	showGrid: boolean;
    str :string;
	showNote: boolean = false;
	showSubscr: boolean = false;
	showTrans: boolean = false;
	showBN: boolean = false;
	recfyBT: string = '';
	mprd1: string = ''; mprd2: string = ''; mprd3: string = '';mprd4: string = '';
  mon: string = '';
  yer: string = '';
  mcnt: number = 0;
  showLS: boolean = false;
  showASU: boolean = false;
  tvisits: any[] = [];
  mdas1sgnf: string = '';adas1sgnf: string = '';pdas1sgnf: string = '';
  mdas1life: string = '';adas1life: string = '';pdas1life: string = '';
  svim: string = '';
  lstnr2: Function;
  lstnr: () => void;
  nrefs: number = 0;
  aynt: string = '';
  lifevts: string = '';
  house_groups: Group[] = [];
  hgmsg: string = '';
  showSGF: boolean = false;
  info: string = '';info1: string = '';
  items: Array<{title: string, note: string, spin: boolean, show: boolean, fuse: boolean, img: string}>;
  plan: any;
  choice: string = '';
  shn: string = '';
  vim: any;
  bvm: boolean = false;
  payn: number = -1;
  showTPD: boolean = false;
  rcft: string = 'Know more...';
  constructor(private router: Router, private translate: TranslateService, public shareService: ShareService, public platform: Platform, private menu: MenuController, public renderer: Renderer2, public horoService: HoroscopeService, private device: Device ) {
    this.items = [
      { title: 'Planet & Significance', note: 'Know what each planet bestows based on its position', spin: false, show: true, fuse: true, img: 'assets/imgs/planets.png' },
	  { title: 'KP Transit', note: 'Get KP Transit for a given date & time', spin: false, show: true, fuse: false, img: 'assets/imgs/kptrans.png' },
	  { title: 'Dasha & Transit predictions', note: 'Get Current Dasha & Transit predictions', spin: false, show: true, fuse: false, img: 'assets/imgs/dashatrans.png' },
	  { title: 'Lucky Days to sign an Agreement', note: 'Know the favourable days to sign an agreement', spin: false, show: true, fuse: true, img: 'assets/imgs/agree.png' },
	  { title: 'Lucky Days for opening bank account', note: 'Know the favourable days for obtaining bank account', spin: false, show: true, fuse: true, img: 'assets/imgs/bank.png' },
	  { title: 'To undergo a treatment', note: 'Know the favourable days to undergo health treatment', spin: false, show: true, fuse: true, img: 'assets/imgs/medical.png' },
	  { title: 'Filing a court case', note: 'Know the favourable days for filing a court case', spin: false, show: true, fuse: true, img: 'assets/imgs/court.png' },
	  { title: 'To Occupy a new house', note: 'Know the favourable days to occupy a new house', spin: false, show: true, fuse: true, img: 'assets/imgs/house.png' },
	  { title: 'To take delivery of vehicle', note: 'Know the favourable days to take the new vehicle', spin: false, show: true, fuse: true, img: 'assets/imgs/vehicle.png' },
   	  { title: 'To apply for passport', note: 'Know the favourable days to apply for passport', spin: false, show: true, fuse: true, img: 'assets/imgs/passport.png' },
 	  { title: 'For college admission', note: 'Know the favourable days for college admission', spin: false, show: true, fuse: true, img: 'assets/imgs/college.png' }
];
    console.log('kp-astro constructor called');	  
  }

  ngOnInit() {
    console.log('kp-astro ngOnInit called');	  
	this.info = 'Initializing..';
	this.binf = this.router.getCurrentNavigation().extras.state;
	console.log('ngOnInit', this.binf);
    this.platform.ready().then((readySource) => {
  	  this.shareService.getPLAN()
		   .then(res => {
			this.plan = res;
			for(let i = 0; i < this.items.length; i++) {
				switch(this.items[i].title)
				{
					case 'Planet & Significance':
					case 'For college admission':
					case 'To undergo a treatment':
						break;
					default:
						if(res['name'] == 'com.mypubz.eportal.astrologer' || res['name'] == 'com.mypubz.eportal.adfree' || res['name'] == 'com.mypubz.eportal.year') 
							this.items[i].fuse = true;
						break;
				}
			}
	    if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.year') {
 		  //admob.setDevMode(true);
		  admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/9653489669',
			  ios: 'ca-app-pub-8442845715303800/9653489669',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/9653489669',
				ios: 'ca-app-pub-8442845715303800/9653489669',
			  })
			}, 10000)
		  })		
				admob.interstitial.load({
				id: {
				  // replace with your ad unit IDs
				  android: 'ca-app-pub-8442845715303800/5087158300',
				  ios: 'ca-app-pub-8442845715303800/5087158300',
				  },
				}).then(() => {
					this.shareService.setADV(true);
				})			
		}
	}, (err) => {
	});	 
		if(this.shareService.getYogAd()) {
		 this.showASU = true;
		}
		console.log('Width: ' + this.platform.width());
		this.device_width = this.platform.width();
		console.log('Height: ' + this.platform.height());
		this.device_height = this.platform.height();
		this.showGrid = false;
		this.showNote = false;
		//this.showSubscr = true;
		this.showTrans = true;
		this.showLS = true;
		this.mcnt = 0;
		this.horoService.getJson('assets/data/house_groups.json')
			.subscribe(hgps => {
				for(let key of Object.keys(hgps)) {
				    let hg : Group = {
					  details: hgps[key]
					};
					this.house_groups[key] = hg;
				}
				console.log('house group', this.house_groups);
				//this.loadHoro();
			}, (err) => {
			   console.log(JSON.stringify(err));
			});
			var dt = new Date();
			var n = dt.getTimezoneOffset();
			n = n/60;
			let ofset: number = Number(n.toFixed(1));
			let ayanid: number = 3;
			var res = this.shareService.getKAYNM();
			if(res) ayanid = Number(res);
			this.info1 = 'checking if birth time requires rectification...';
			this.horoService.recfyBT(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, ofset, ayanid)
			   .subscribe(res => {
				this.info1 = '';
			   if(res['recfyDOB'] != '') {
				 this.showBN = true;
				 this.recfyBT = res['rem'];
			   } 
			   if(res['rem'].indexOf('is required') > -1) {
	   				 this.rcft = 'Rectify Now...'; 
					 this.showBN = true;
					 this.recfyBT = res['rem'];
               }				   
			  }, (err) => {
				this.info1 = '';
				//this.info = err;
			  }) ;
	});	 
 }
  brow() {
			if(this.plan.name != 'com.mypubz.eportal.astrologer' || this.plan.name != 'com.mypubz.eportal.adfree' || this.plan.name != 'com.mypubz.eportal.month' || this.plan.name != 'com.mypubz.eportal.year') 
				admob.interstitial.load({
				id: {
				  // replace with your ad unit IDs
				  android: 'ca-app-pub-8442845715303800/5087158300',
				  ios: 'ca-app-pub-8442845715303800/5087158300',
				  },
				}).then(() => {				
				this.shareService.setADV(true);
			} )			
	    switch(this.choice)
		{
		 case 'Dasha & Transit predictions':
		   let kpd: any = {};
		   kpd.binf = this.binf;
		   kpd.moon_deg = this.moon_deg;
		   kpd.oPlanet = this.oPlanet;
		   kpd.vim = this.vim;
		   console.log('kpd', kpd);
		   this.choice = '';
		   this.router.navigate(['/dash-trans'], {state: kpd});
			break;
		 case 'houseinfo':
		   this.choice = '';
		   let hn = this.shn;
		   this.shn = '';
 		   this.router.navigate(['/house-info'], {state: hn as any});
		   break;
		default:
			break;
		}
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad KpAstroPage');
		//this.shareService.plan.subscribe((pln) => {
		//if(pln.name == 'com.mypubz.eportal.astrologer') 
		//	this.hgmsg = '<span><strong>Tap house number for details. </strong></span><span class="more" tappable (click)="edt()">Edit Group</span><br/>';
		//else
		//	this.hgmsg = this.hgmsg = '<span><strong>Tap house number for details. </strong></span><br/>';
	 //}, (err) => {
	//});

  }
  ionViewDidEnter() {
    console.log('ionViewDidEnter KpAstroPage');
			if (this.lstnr) {
			  this.lstnr();
			}
		this.lstnr = this.renderer.listen('document', 'admob.interstitial.close', (event) => {
			console.log('kp-astro close event triggered');
		  // handle event
			if (this.lstnr) {
				this.lstnr();
			}
	   this.brow();
		 });	
		
	var ayn = this.shareService.getKAYNM();
	this.aynt = 'KP NEW';
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
					this.aynt = 'KP NEW';
					break;
			}
	}
	let ayanid: number = 3;
    if(this.nrefs > 0) {
		for (let child of this.birthChart.nativeElement.children) {
			this.renderer.removeChild(this.birthChart.nativeElement, child);
		}
		this.chkAndLoad();
	} else {
		this.chkAndLoad();
		
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		var res = this.shareService.getKAYNM();
		if(res) ayanid = Number(res);
		this.horoService.recfyBT(this.binf.lat, this.binf.lng, this.binf.dob, this.binf.timezone, ofset, ayanid)
		   .subscribe(res => {
		   if(res['recfyDOB'] != '') {
			 this.showBN = true;
			 this.recfyBT = res['rem'];
		   }
		  }, (err) => {
			//this.info = err;
		  }) ;		
	}
	this.nrefs++;
	if(this.nrefs == 1 || this.payn != ayanid) {
		let mdeg: number = 0;
		if(this.moon_deg.indexOf('.') > -1) 
			mdeg = this.dmsToDec(Number(this.moon_deg.split('.')[0]), Number(this.moon_deg.split('.')[1]), Number(this.moon_deg.split('.')[2]));
		else
			mdeg = Number(this.moon_deg);
		var bstar = this.calcBStar(mdeg, this.binf.moon_sign);
		console.log(bstar, mdeg);
		var ras_num = Number(this.o_rashis_v[this.binf.moon_sign].split('\|')[0]);
		var ras_num2 = Number(this.o_rashis_v[bstar.split('|')[3]].split('\|')[0]);
		this.info = 'Calculating Vimsottari Dasha..';
		if(this.payn != ayanid) {
				this.horoService.calcVim(this.binf.dob, bstar.split('|')[2], mdeg, Number(bstar.split('|')[1]), ras_num, ras_num2, this.shareService.getLANG() )
					.subscribe(res => {
						this.info = '';
						this.shareService.setKVIMS(this.binf.dob, res);
						this.vim = res;
						console.log('vimsObj1');
						this.vimsObj();
				});
		} else {
			this.shareService.getKVIMS(this.binf.dob).then( vims => {
			if(vims) { 
			   this.info = '';
				this.vim = vims;
				console.log('vimsObj1');
				let dts = this.vimsObj();
				var edt = new Date(Number(dts[1].trim().split('/')[2]), Number(dts[1].trim().split('/')[1])-1, Number(dts[1].trim().split('/')[0]));
				var cdt = new Date();
				edt.setHours(0,0,0,0);
				cdt.setHours(0,0,0,0);
				if(cdt > edt) {
 				this.showTPD = false;
				this.info = 'Calculating Vimsottari Dasha..';
				this.horoService.calcVim(this.binf.dob, bstar.split('|')[2], mdeg, Number(bstar.split('|')[1]), ras_num, ras_num2, this.shareService.getLANG() )
					.subscribe(res => {
						this.info = '';
						this.shareService.setKVIMS(this.binf.dob, res);
						this.vim = res;
						console.log('vimsObj1');
						this.vimsObj();
					});
				}
			} else {
		this.horoService.calcVim(this.binf.dob, bstar.split('|')[2], mdeg, Number(bstar.split('|')[1]), ras_num, ras_num2, this.shareService.getLANG() )
			.subscribe(res => {
				this.info = '';
				this.shareService.setKVIMS(this.binf.dob, res);
				this.vim = res;
				console.log('vimsObj1');
				this.vimsObj();
			}, (err) => {
				//this.mon1 = JSON.stringify(err);
			});
			}
		})
		.catch(e => {
		this.horoService.calcVim(this.binf.dob, bstar.split('|')[2], mdeg, Number(bstar.split('|')[1]), ras_num, ras_num2, this.shareService.getLANG() )
			.subscribe(res => {
				this.info = '';
				this.shareService.setKVIMS(this.binf.dob, res);
				this.vim = res;
				console.log('vimsObj1');
				this.vimsObj();
			}, (err) => {
				//this.mon1 = JSON.stringify(err);
			});
		});
		}
		this.payn = ayanid;
	}
 }
 vimsObj() {
	           let ped: any = '';
 				this.showTPD = true;
				//let mdas1: string = '';
				//let adas1: string = '';
				//let pdas1: string = '';
				for(let key of Object.keys(this.vim)) {
					if(this.vim[key].style == 'mdasc') this.mdas1 = key;
					else if(this.vim[key].style == 'adasc') this.adas1 = this.ruler_name_v[key.split('-')[1].toLowerCase()];
					else if(this.vim[key].style == 'pdasc') { 
					    ped = this.vim[key].per.split('To');
						this.pdas1 = this.ruler_name_v[key.split('-')[2].toLowerCase()];
						//this.pend1 = dts[1].trim().split('/')[0] + '-' + dts[1].trim().split('/')[1] + '-' + dts[1].trim().split('/')[2];
					}
				}
				let sigs = this.oPlanet[this.mdas1.toLowerCase()].sig + this.oPlanet[this.adas1.toLowerCase()].sig + this.oPlanet[this.pdas1.toLowerCase()].sig;
				console.log('sigs', sigs);
				let nc: number = 0;
				let s6: boolean = false; 
				let s11: boolean = false; 
				let s2: boolean = false;
				let sh: boolean = false;
				for(let s of sigs.split(',')) {
					if(s == 5 || s == 8 || s == 12) nc++;
					else if(s == 6) s6 = true;
					else if(s == 11) s11 = true;
					else if(s == 2) s2 = true;
				}
				if(nc != 3) {
					if((s6 && s11) || (s6 && s2)) {
						sh = true;
					}
				}
				this.items[2].show = sh;
				sh = false;
				nc = 0;
				s11 = false;
				s6 = false;
				let s3: boolean = false; 
				for(let s of sigs.split(',')) {
					if(s == 8 || s == 12) nc++;
					else if(s == 3) s3 = true;
					else if(s == 6) s6 = true;
					else if(s == 11) s11 = true;
				}
				if(nc != 2) {
					if(s3 && s6 && s11) {
						sh = true;
					}
				}
				this.items[3].show = sh;
				this.bvm = true;
		return ped;
 }
  chkAndLoad() {
	this.info = 'Loading..';
	console.log('chkAndLoad()');
	this.loadHoro();
	this.horoService.getJson('assets/data/house_groups.json')
		.subscribe(hgps => {		
			for(let key of Object.keys(hgps)) {
				let hg : Group = {
					details: hgps[key]
				};
				this.house_groups[key] = hg;
			}
			console.log('house group', this.house_groups);
		}, (err) => {
			console.log(JSON.stringify(err));
		}); 
  }
  ngAfterViewInit() {
	
  }
  ngOnDestroy() {
    this.lstnr2();
    if (this.lstnr) {
      this.lstnr();
    }
  }	  
  	calcStar(mins: number)
	{
	  
		//console.log('calcStar', mins);
		for(var i = 0; i < Object.keys(this.sublords_v).length; i++)
		{
			var nak = this.sublords_v[i];
			var degs = this.sublords_v[i].deg;
			var s_mins = parseInt(degs.split('-')[0].split('.')[0], 10)*60 + parseInt(degs.split('-')[0].split('.')[1]);
			var e_mins = parseInt(degs.split('-')[1].split('.')[0], 10)*60 + parseInt(degs.split('-')[1].split('.')[1]);
			//var deg_s = parseFloat(degs.split('-')[0].split('.')[0] + '.' + degs.split('-')[0].split('.')[1]);
			//var deg_e = parseFloat(degs.split('-')[1].split('.')[0] + '.' + degs.split('-')[1].split('.')[1]);
			//console.log(s_mins);
			//console.log(e_mins);
			if(mins >= s_mins && mins <= e_mins) {
			    //console.log(s_mins);
				//console.log(e_mins);
			  // console.log(nak.sign + '|' + nak.star + '|' + nak.sub);
			   return nak.sign + '|' + nak.star + '|' + nak.sub;
			}
		}
		//console.log('-1');
		return '-1';
	}
  	calcStarEx(val: number)
	{
	  
		//console.log('calcStar', val);
		for(var i = 0; i < Object.keys(this.sublords_v).length; i++)
		{
			var nak = this.sublords_v[i];
			var degs = this.sublords_v[i].deg;
			var s_mins = this.dmsToDec(Number(degs.split('-')[0].split('.')[0]), Number(degs.split('-')[0].split('.')[1]), Number(degs.split('-')[0].split('.')[2]));
			var e_mins = this.dmsToDec(Number(degs.split('-')[1].split('.')[0]), Number(degs.split('-')[1].split('.')[1]), Number(degs.split('-')[1].split('.')[2]));
			//var deg_s = parseFloat(degs.split('-')[0].split('.')[0] + '.' + degs.split('-')[0].split('.')[1]);
			//var deg_e = parseFloat(degs.split('-')[1].split('.')[0] + '.' + degs.split('-')[1].split('.')[1]);
			//console.log(s_mins);
			//console.log(e_mins);
			if(val >= s_mins && val < e_mins) {
			    //console.log(s_mins);
				//console.log(e_mins);
			   //console.log(nak.sign + '|' + nak.star + '|' + nak.sub);
			   return nak.sign + '|' + nak.star + '|' + nak.sub;
			}
		}
		//console.log('-1');
		return '-1';
	}
        calcBStar(plpos: number, sign: string)
        {
			for(var i = 0; i < Object.keys(this.nakshatras_v).length; i++)
			{
				var nak = this.nakshatras_v[i];
                if (nak.location.start.split(',')[1] == sign && nak.location.end.split(',')[1] == sign)
                {
                    if (plpos >= this.dmsToDec(Number(nak.location.start.split(',')[0].split('.')[0]),Number(nak.location.start.split(',')[0].split('.')[1]),0) && plpos < this.dmsToDec(Number(nak.location.end.split(',')[0].split('.')[0]),Number(nak.location.end.split(',')[0].split('.')[1]),0))
                    {
						return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
                    }
				}
                else if (nak.location.start.split(',')[1] == sign.toString())
                {
                     if (plpos >= this.dmsToDec(Number(nak.location.start.split(',')[0].split('.')[0]), Number(nak.location.start.split(',')[0].split('.')[1]),0))
                     {
						return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];                     
					 }
                }
                else if (nak.location.end.split(',')[1] == sign.toString())
                {
                     if (plpos < this.dmsToDec(Number(nak.location.end.split(',')[0].split('.')[0]), Number(nak.location.end.split(',')[0].split('.')[1]),0))
                     {
						 return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];	                     
					 }
                }
			}
        }
	
	getSubSub(val: number, sub: string, isp: boolean, pcnt: number)
	{
	   //console.log('subsub', sub);
	   //console.log('subsub', val);
		this.horoService.getJson('assets/data/' + sub + '.json')
			.subscribe(subsubs => {
			for(var j = 0; j < Object.keys(subsubs).length; j++)
			{
				var sdegs = subsubs[j].deg;
				var s_smins = this.dmsToDec(Number(sdegs.split('-')[0].split('.')[0]), Number(sdegs.split('-')[0].split('.')[1]), Number(sdegs.split('-')[0].split('.')[2]));
				var e_smins = this.dmsToDec(Number(sdegs.split('-')[1].split('.')[0]), Number(sdegs.split('-')[1].split('.')[1]), Number(sdegs.split('-')[1].split('.')[2]));
				//console.log('subsub', 'iter');
				//console.log('subsub', s_smins);
				//console.log('subsub', e_smins);
				//console.log('subsub', val);
				if(val >= s_smins && val < e_smins) {
				   if(isp) this['sub'+pcnt.toString()] = this.trans(subsubs[j].sub);
				   else this['hssub'+pcnt.toString()] = this.trans(subsubs[j].sub);
				  //subsubs[j].sub;
				}
			}
		}, (err) => {
		  console.log(err);
	   });
	   
	}
	drawSIChart(plps) {
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
        var size = this.device_width;
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
		this.renderer.appendChild(text, document.createTextNode(this.binf.name));
		this.renderer.setAttribute(text, "fill", "#d35400");
		this.renderer.setAttribute(text, "font-size", "1.35rem");
		this.renderer.setAttribute(text, "font-weight", "bold");
		this.renderer.setAttribute(text, "alignment-baseline", "middle");
		this.renderer.setAttribute(text, "text-anchor", "middle");
		this.renderer.setAttribute(text, "x", (tpx).toString());
		this.renderer.setAttribute(text, "y", (tpy).toString());
		this.renderer.setAttribute(text, "id", "tc1");
		g.appendChild(text);
		text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(text, document.createTextNode(db));
		this.renderer.setAttribute(text, "fill", "#d35400");
		this.renderer.setAttribute(text, "font-size", "1rem");
		this.renderer.setAttribute(text, "font-weight", "bold");
		this.renderer.setAttribute(text, "alignment-baseline", "middle");
		this.renderer.setAttribute(text, "text-anchor", "middle");
		this.renderer.setAttribute(text, "x", tpx.toString());
		this.renderer.setAttribute(text, "y", (tpy+16).toString());
		this.renderer.setAttribute(text, "id", "tc2");
		g.appendChild(text);
		text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(text, document.createTextNode(latlng));
		this.renderer.setAttribute(text, "fill", "#d35400");
		this.renderer.setAttribute(text, "font-size", "0.8rem");
		this.renderer.setAttribute(text, "font-weight", "bold");
		this.renderer.setAttribute(text, "alignment-baseline", "middle");
		this.renderer.setAttribute(text, "text-anchor", "middle");
		this.renderer.setAttribute(text, "x", tpx.toString());
		this.renderer.setAttribute(text, "y", (tpy+32).toString());
		this.renderer.setAttribute(text, "id", "tc3");
		g.appendChild(text);
		let plc: number = 1;
		let plh: number = 14; //font pixel height
		let signs = ["pi", "aq", "cp", "sa", "ar","sc", "ta", "li", "ge", "cn", "le", "vi"];
		for(var i = 0; i < 12; i++) {
			    let sign = signs[i];
				var hnos = this.get_hno_by_sign(sign);
				if(hnos != '') {
					let hcord1 = this.getSHXY(sign, size);
					text = document.createElementNS("http://www.w3.org/2000/svg", "text");
					this.renderer.appendChild(text, document.createTextNode(hnos));
					this.renderer.setAttribute(text, "font-size", "0.625rem");
					this.renderer.setAttribute(text, "font-weight", "bold");
					this.renderer.setAttribute(text, "fill", "#d35400");
					this.renderer.setAttribute(text, "x", hcord1[0].toString());
					this.renderer.setAttribute(text, "y",  hcord1[1].toString());
					this.renderer.setAttribute(text, "id", "hn" + plc.toString());
					g.appendChild(text);
				}
				var hcord = this.getRXY(sign, size);
				var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
				this.renderer.setAttribute(image, "x", (Math.floor(hcord[0]-isz)).toString());
				this.renderer.setAttribute(image, "y", (Math.floor(hcord[1])).toString());
				this.renderer.setAttribute(image, "height", (isz).toString());
				this.renderer.setAttribute(image, "width", (isz).toString());
				image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.rashi_imgs_v[sign]);
				this.renderer.appendChild(g, image);
				if (plps.hasOwnProperty(sign)) {
					hcord = this.getPXY(sign, size);
					var pls = plps[sign].split('\|');
					var pcnt = 0;
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
						//if(this.binf.retro.indexOf(pls[k].split(' ')[1]) > -1) plt += '[R]';
						this.renderer.appendChild(text, document.createTextNode(plt));
						this.renderer.setAttribute(text, "font-size", "0.875rem");
						this.renderer.setAttribute(text, "font-weight", "bold");
						this.renderer.setAttribute(text, "fill", ((pls[k].split(' ')[1] == "AC") ? "#FF5733" : (pls[k].split(' ')[1] == "Mo") ? "#011898":"#0a0a0a"));
						this.renderer.setAttribute(text, "x", (hcord[0]-isz).toString());
						var s8 = hcord[1] + (plh*pcnt);
						this.renderer.setAttribute(text, "y",  s8.toString());
						this.renderer.setAttribute(text, "id", "pl" + (plc).toString());
						g.appendChild(text);
						plc++;
					}
				}
		}
		svg.appendChild(g);
		for (var i = 0; i < 12; i++) {
		  if (this.o_signs_v[i] == this.asc_sign) {
			var as = 1;
			this.rashis_v[this.asc_sign] = '1|' + this.rashis_v[this.asc_sign].split('\|')[1];
			for (var j = i + 1; j < 12; j++) {
				as++;
				this.rashis_v[this.o_signs_v[j]] = (as).toString() + '|' + this.rashis_v[this.o_signs_v[j]].split('\|')[1];
			}
			for (var k = 0; k < i; k++) {
				var hno = ((12 - i) + (k + 1));
				this.rashis_v[this.o_signs_v[k]] = hno.toString() + '|' + this.rashis_v[this.o_signs_v[k]].split('\|')[1];
			}
		  }
		}				
		return svg;
	};

  loadHoro()
  {
	var vims_order =  {"Ke":1,"Ve":2,"Su":3,"Mo":4,"Ma":5,"Ra":6,"Ju":7,"Sa":8,"Me":9};
	let pcnt :number = 0;
	var plPos = this.binf.ppos;//this.shareService.getPPOS(this.binf.dob);
	for(let key of Object.keys(this.signs_v)) {
		if(this.signs_v[key] == 'na') continue;
		var sign = this.signs_v[key];
			if (plPos.hasOwnProperty(sign)) {
				var pls = plPos[sign].split('\|');
				for (var k = 0; k < pls.length; k++) {
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
					} else if (pls[k].split(' ')[1] == 'AC') { 
						this.asc_sign = sign;
						//this.asc_deg = Number(pls[k].split(' ')[0]);
						this.asc_deg = pls[k].split(' ')[0];
						//console.log('ASCENDENT is ' + this.asc_sign);
					} else if (pls[k].split(' ')[1] == 'Mo') {
						this.moon_sign = sign;
						this.binf.moon_sign = sign;
						//this.moon_deg = Number(pls[k].split(' ')[0]);
						this.moon_deg = pls[k].split(' ')[0];
					}else if (pls[k].split(' ')[1] == 'Su') {
						this.sun_sign = sign;
						//this.binf.moon_sign = sign;
						//this.moon_deg = Number(pls[k].split(' ')[0]);
						this.sun_deg = pls[k].split(' ')[0];
					} else if (pls[k].split(' ')[1] == 'TRUE_NODE') {
						plPos[sign] = plPos[sign].replace('TRUE_NODE', 'TR');		
					}
				}
			}
	}
	this.info = 'Calculating planet significators..';
	console.log('publishing planet positions');
	for(let key of Object.keys(this.signs_v)) {
		if(this.signs_v[key] == 'na') continue;
		var sign = this.signs_v[key];
			if (plPos.hasOwnProperty(sign)) {
				var pls = plPos[sign].split('\|');
				console.log(pls);
				for (var k = 0; k < pls.length; k++) {
					var pl = pls[k].split(' ')[1];
					var pos = pls[k].split(' ')[0].trim();
					console.log(pl, pos);
					//console.log('pos len=' + pos.split('.').length.toString());
					//let mins: number = 0;
					//if(pos.indexOf('.') > -1 && pos.split('.')[1] != '')
					//  mins = (signs_pos[sign] + parseInt(pls[k].split(' ')[0].split('.')[0], 10))*60 + parseInt(pls[k].split(' ')[0].split('.')[1], 10);
					//else
					//  mins = (signs_pos[sign] + parseInt(pls[k].split(' ')[0].split('.')[0], 10))*60 ;
					let dval: number = 0;
					if(pos.indexOf('.') > -1 && pos.split('.')[1] != '')
					  dval = this.dmsToDec(this.signs_pos_v[sign]+Number(pos.split('.')[0]), Number(pos.split('.')[1]), Number(pos.split('.')[2]));
					else
					  dval = Number(pos);
					if (pl != 'Ra' && pl != 'Ke' && pl != 'Ur' && pl != 'Pl' && pl != 'me' && pl != 'os' && pl != 'Ne' && pl != 'AC' && pl != 'TR') {  //consider only true planets
						pcnt = vims_order[pl];
						//console.log('finding star at ' + (mins - ay_m).toString());
						//var star = this.calcStar(mins);
						var star = this.calcStarEx(dval);
						//console.log(star);
						//console.log(pl);
						this['pnam' + pcnt.toString()] = this.trans(this.ruler_name_v[pl.toLowerCase()].toUpperCase());
						//console.log(star.split('|')[0]);
						this['pras' + pcnt.toString()] = this.trans(star.split('|')[0]);
						//console.log(pls[k].split(' ')[0]);
						if(pos.indexOf('.') > -1 && pos.split('.')[1] != '') {
						    //let min_l: number = parseInt(pls[k].split(' ')[0].split('.')[1], 10);
						    //let deg_l: number = parseInt(pls[k].split(' ')[0].split('.')[0], 10);
							//let sec_l: number = 0; 
							//if(a_s > 0 && min_l > 0) {
                              // 	sec_l = 60 - a_s;						
							   // min_l--;
							//} else if (a_s > 0){
							  //deg_l--;
							  //min_l = 59;
                           	  //sec_l = 60 - a_s;						
							//}
							this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032' + pls[k].split(' ')[0].split('.')[2] + '\u2033';
							//this['ppos' +pcnt.toString()] = deg_l.toString() + '\xB0' + min_l.toString() + '\u2032' + sec_l + '\u2033';
						}
						else {
						    this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
						}
						let planetPos: PlanetPos = {
							 pos: dval,
							 sign: star.split('|')[0],
							 star: star.split('|')[1],
							 sub: star.split('|')[2],
							 sig: '',
							 lif_e: '',
							 inds: ''
						};
						this.oPlanet[this.ruler_name_v[pl.toLowerCase()].toLowerCase()] = planetPos;
						//console.log(star.split('|')[1]);
						this['pnak'+pcnt.toString()] = this.trans(star.split('|')[1]);
						//console.log(star.split('|')[2]);
						this['nakl'+pcnt.toString()] = this.trans(star.split('|')[2]);
						this.getSubSub(dval, star.split('|')[1] + '-' + star.split('|')[2], true, pcnt);
						//this['sub'+pcnt.toString()] = this.trans(ssub);
					} else if (pl == 'Ra') { //consder Rahu
						//h_code += 'Rahu ';
						pcnt = vims_order[pl];
						//console.log(pl);
						//console.log(pls[k].split(' ')[0]);
						var star = this.calcStarEx(dval);
						//console.log(star);
						this['pnam' + pcnt.toString()] = this.trans('RAHU');
						//console.log(star.split('|')[0]);
						this['pras' + pcnt.toString()] = this.trans(star.split('|')[0]);
						if(pos.indexOf('.') > -1 && pos.split('.')[1] != '') {
							this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032' + pls[k].split(' ')[0].split('.')[2] + '\u2033';
						}
						else {
						    this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
						}
							let planetPos: PlanetPos = {
							 pos: dval,
							 sign: star.split('|')[0],
							 star: star.split('|')[1],
							 sub: star.split('|')[2],
							 sig: '',
							 lif_e: '',
							 inds: ''
							};
							this.oPlanet['rahu'] = planetPos;
						//console.log(star.split('|')[1]);
						this['pnak'+pcnt.toString()] = this.trans(star.split('|')[1]);
						//console.log(star.split('|')[2]);
						this['nakl'+pcnt.toString()] = this.trans(star.split('|')[2]);
						this.getSubSub(dval, star.split('|')[1] + '-' + star.split('|')[2], true, pcnt);
						//this['sub'+pcnt.toString()] = this.trans(ssub);
					} else if (pl == 'Ke') {
						//h_code += 'Ketu ';
						pcnt = vims_order[pl];
						//console.log(pl);
						//console.log(pls[k].split(' ')[0]);
						var star = this.calcStarEx(dval);
						//console.log(star);
						this['pnam' + pcnt.toString()] = this.trans('KETU');
						//console.log(star.split('|')[0]);
						this['pras' + pcnt.toString()] = this.trans(star.split('|')[0]);
						if(pos.indexOf('.') > -1 && pos.split('.')[1] != '') {
							this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0' + pls[k].split(' ')[0].split('.')[1] + '\u2032' + pls[k].split(' ')[0].split('.')[2] + '\u2033';
						}
						else {
						    this['ppos' +pcnt.toString()] = pls[k].split(' ')[0].split('.')[0] + '\xB0';
						}
						let planetPos: PlanetPos = {
							 pos: dval,
							 sign: star.split('|')[0],
							 star: star.split('|')[1],
							 sub: star.split('|')[2],
							 sig: '',
							 lif_e: '',
							 inds: ''
						};
						this.oPlanet['ketu'] = planetPos;
						//console.log(star.split('|')[1]);
						this['pnak'+pcnt.toString()] = this.trans(star.split('|')[1]);
						//console.log(star.split('|')[2]);
						this['nakl'+pcnt.toString()] = this.trans(star.split('|')[2]);
						this.getSubSub(dval, star.split('|')[1] + '-' + star.split('|')[2], true, pcnt);
						//this['sub'+pcnt.toString()] = this.trans(ssub);
					}
				}
			}
		}
		console.log(this.oPlanet);
		this.info = 'Calculating house significators..';
		console.log('publishing house positions');
		var hPos = this.binf.hpos;
		pcnt = 0;
		//for(var i=0; i < Object.keys(hPos).length; i++)
		for(let key of Object.keys(hPos)) {
		  let v_iter: number = Number(key);
		  //let cur_h: number = (v_iter-1 == 0) ? 12: v_iter-1;
		  let dval: number = 0;
		  pcnt++;
		  var dmslat = hPos[v_iter];
		  //console.log(dmslat);
		  //console.log(dmslat.split("°")[0] + '.' + dmslat.split("°")[1].split("'")[0]);
		  //console.log(parseFloat(dmslat.split("°")[0] + '.' + dmslat.split("°")[1].split("'")[0]));
		  //mins = parseInt(dmslat.split("°")[0], 10)*60 + parseInt(dmslat.split("°")[1].split("'")[0], 10);
		  dval = this.dmsToDec(Number(dmslat.split("°")[0]), Number(dmslat.split("°")[1].split("'")[0]), Number(dmslat.split("°")[1].split("'")[1].split('"')[0]));
		  //console.log(mins);
		  console.log('calcStarEx', dmslat);
		  console.log('calcStarEx', dval);
		  var star = this.calcStarEx(dval);
		  //console.log(star);
		  this['hnam'+pcnt.toString()] = v_iter.toString();
		  this['hpos'+pcnt.toString()] = dmslat.split("°")[0] + '\xB0' + dmslat.split("°")[1].split("'")[0] + '\u2032' + dmslat.split("°")[1].split("'")[1];
		  this['hras'+pcnt.toString()] = this.trans(star.split('|')[0]);
		  this['hnak'+pcnt.toString()] = this.trans(star.split('|')[1]);
		  //console.log(star.split('|')[2]);
		  this['hsub'+pcnt.toString()] = this.trans(star.split('|')[2]);
		  this.getSubSub(dval, star.split('|')[1] + '-' + star.split('|')[2], false, pcnt);
		  //this['hssub'+pcnt.toString()] = this.trans(hssb);
		  let housePos: HousePos = {
			 pos: dval,
			 dmspos: dmslat,
			 sign: star.split('|')[0],
			 star: star.split('|')[1],
			 sub: star.split('|')[2],
			 sig: ''
		  };
		  this.oHouse[v_iter] = housePos;
		}
	    if(this.shareService.getCHTYP() == 'sind')
			this.svgHoro = this.drawSIChart(plPos);
		else if(this.shareService.getCHTYP() == 'nind')
			this.svgHoro = this.drawNIchart(plPos);
		else
			this.svgHoro = this.drawSIChart(plPos);
		this.renderer.appendChild(this.birthChart.nativeElement, this.svgHoro);
		this.lstnr2 = this.renderer.listen(this.svgHoro, 'click', (event) => {
				// Do something with 'event'
				//console.log('clicked ', event.path);
				//console.log('clicked ', event.path[2]);
			this.router.navigate(['/chart-settings'], {state: this.binf});

		});
		let dvalf: number = 0;
		if(this.asc_deg.indexOf('.') > -1 && this.asc_deg.split('.')[1] != '')
			dvalf = this.dmsToDec(this.signs_pos_v[this.asc_sign]+Number(this.asc_deg.split('.')[0]), Number(this.asc_deg.split('.')[1]), Number(this.asc_deg.split('.')[2]));
		else
			dvalf = Number(this.asc_deg);
        console.log('calculating fortuna..');
		this.info = 'Knowing the fortuna..';
		console.log('sun', this.oPlanet['sun']);
		console.log('moon', this.oPlanet['moon']);
	//  this.horoService.addTicket(this.device.uuid, 'technical', 'FORTUNAC',  (this.signs_pos_v[this.sun_sign]+this.oPlanet['sun'].pos).toString() + ' ' + (this.signs_pos_v[this.moon_sign]+this.oPlanet['moon'].pos).toString() + ' //' + dvalf.toString())
	//  						.subscribe(res => {
	// 						});
		let fop = this.calc_fortuna(this.oPlanet['sun'].pos, this.oPlanet['moon'].pos, dvalf);
		console.log('fortuna', fop);
		
		let ftu: string = this.getDms(fop.toFixed(2));
		console.log('calcStarEx');
		var fstar = this.calcStarEx(fop);
	 // this.horoService.addTicket(this.device.uuid, 'technical', 'FORTUNA',  fop.toString() + ' ' + ftu + ' ' + fstar)
	 // 						.subscribe(res => {
	 //						});
		  //console.log(star);
		//this['fpos'] = this.asc_deg.split("°")[0] + '\xB0' + this.asc_deg.split("°")[1].split("'")[0] + '\u2032';
		this['fpos'] = ftu;//this.asc_deg.split(".")[0] + '\xB0' + this.asc_deg.split(".")[1] + '\u2032';
		this['fras'] = this.trans(fstar.split('|')[0]);
		this['fnak'] = this.trans(fstar.split('|')[1]);
		  //console.log(star.split('|')[2]);
		this['fsub'] = this.trans(fstar.split('|')[2]);
		var astar = this.calcStarEx(dvalf);
	  //this.horoService.addTicket(this.device.uuid, 'technical', 'ASTAR',  astar)
	  //						.subscribe(res => {
	 //						});
		var asd = this.signs_pos_v[this.asc_sign]+ Number(this.asc_deg.split('.')[0]);
		if(this.asc_deg.indexOf('.') > -1 && this.asc_deg.split('.')[1] != '') {
			this['apos'] = asd.toString() + '\xB0' + this.asc_deg.split('.')[1] + '\u2032' + this.asc_deg.split('.')[2] + '\u2033';
		} else {
			this['apos'] = this.asc_deg.split('.')[0] + '\xB0';
		}
		this['aras'] = this.trans(astar.split('|')[0]);
		this['anak'] = this.trans(astar.split('|')[1]);
		this['asub'] = this.trans(astar.split('|')[2]);
		pcnt++;
		this.getSubSub(fop, fstar.split('|')[1] + '-' + fstar.split('|')[2], false, pcnt);
		pcnt++;
		this.getSubSub(dvalf, astar.split('|')[1] + '-' + astar.split('|')[2], false, pcnt);
		this.info = 'Analyzing..';
		var arr = ["sun","moon","mars","rahu", "jupiter", "saturn", "mercury", "ketu", "venus"];
	    for (var vi=0, len=arr.length; vi<len; vi++) {
		   let psig: number[] = [];
		   let sigs: number = 0;
		   var obj = this.oPlanet[arr[vi]];
		   var sl_hno = this.get_hno_by_pos(this.oPlanet[obj.star].pos);
		   var hno = this.get_hno_by_pos(obj.pos);
		   var sl_own_hnos = this.get_own_houses(obj.star);
		   var pl_own_hnos = this.get_own_houses(arr[vi]);
		   this['pn' + (vi+1).toString()] = this.trans(arr[vi]);
		   this['L1ps' + (vi+1).toString()] = sl_hno + ',';
		   psig[sigs++] = Number(sl_hno);
		   let bf: boolean = false;
		   for(var s = 0; s < sigs; s++) {
		     if(psig[s] == Number(hno)) {
				bf = true;
			 }
		   }
		   bf = false;
		   if(!bf) psig[sigs++] = Number(hno);
		   this['L2ps' + (vi+1).toString()] = hno.toString() + ',';
		   this['L3ps' + (vi+1).toString()] = sl_own_hnos;
		   var hnums = sl_own_hnos.split(',');
		   for(var s = 0; s < hnums.length; s++) {
		     if(hnums[s] == '') continue;
			bf = false;
			for(var s1 = 0; s1 < sigs; s1++) {
		     if(psig[s1] == Number(hnums[s])) {
				bf = true;
			 }
		    }
			if(!bf) psig[sigs++] = Number(hnums[s]);
		   }		   
		   this['L4ps' + (vi+1).toString()] = pl_own_hnos;
		   hnums = pl_own_hnos.split(',');
		   for(var s = 0; s < hnums.length; s++) {
		     if(hnums[s] == '') continue;
			bf = false;
			for(var s1 = 0; s1 < sigs; s1++) {
		     if(psig[s1] == Number(hnums[s])) {
				bf = true;
			 }
		    }
			if(!bf) psig[sigs++] = Number(hnums[s]);
		   }
			for (var i = 0; i < sigs; ++i) 
			{
				for (var j = i + 1; j < sigs; ++j) 
				{
					if (psig[i] > psig[j]) 
					{
						let a: number = psig[i];
						psig[i] = psig[j];
						psig[j] = a;
					}
				}
			}
 		   let p_sigs: string = '';
		   for(var s = 0; s < sigs; s++) {
			p_sigs += psig[s].toString() + ',';
		   }
		   this.oPlanet[arr[vi]].sig = p_sigs;
		   this.oPlanet[arr[vi]].lif_e = this.analyze_life_evts(arr[vi], p_sigs);
		   if(arr[vi] != 'rahu' && arr[vi] != 'ketu') {
			   let hos: string = this.get_own_houses(arr[vi].toLowerCase());
				//console.log('get_indicators ' +  arr[vi].toLowerCase() + hos);
			   let anls: string = 'In your horoscope ' + arr[vi].toUpperCase() + ' is the LORD of ' + hos + ' HOUSES. ';
			   let inds: string = this.get_indicators2(arr[vi].toLowerCase(), hos);
			   anls += inds;
			   //console.log(inds);
			   this.oPlanet[arr[vi]].inds = anls;
		   }
		   this['krk' + (vi + 1).toString()] = this.oPlanet[arr[vi]].lif_e;
		}
		//find house significators
	    for(let key of Object.keys(hPos)) { 
		    let hsig: string[] = [];
			let sigs: number = 0;
		    //console.log(this.oHouse[key]);
			let v_iter: number = Number(key);
			let cur_h: number = (v_iter == 12) ? 1: v_iter+1;
			var pls_in_h = this.get_pls_in_hou_ex(this.oHouse[v_iter].pos, this.oHouse[cur_h].pos);
			if(pls_in_h != '') {
			} else {
			}
			//var str_in_h = this.get_str_in_h(
			var pls_in_str = this.get_pls_in_star_occ(pls_in_h);
			var pls_in_str_o = this.get_pls_in_star(this.oHouse[v_iter].sign);
			var hou_owner = this.oHouse[v_iter].sign;
			this['hn' + (v_iter).toString()] = (v_iter).toString();
			this['L1hs' + (v_iter).toString()] = pls_in_str;
			for(var s = 0; s < pls_in_str.split(',').length; s++) {
			   hsig[sigs++] = pls_in_str.split(',')[s];
			}
			this['L2hs' + (v_iter).toString()] = this.trans(pls_in_h);
		   let bf: boolean = false;
			var pnets = pls_in_h.split(',');
			for(var s =0; s < pnets.length; s++) {
				bf = false;
				for(var s1 = 0; s1 < sigs; s1++) {
				 if(hsig[s1] == pnets[s]) {
					bf = true;
				 }
			    }
				if(!bf) hsig[sigs++] = pnets[s];
			}
			this['L3hs' + (v_iter).toString()] = pls_in_str_o;
			pnets = pls_in_str_o.split(',');
			for(var s =0; s < pnets.length; s++) {
				bf = false;
				for(var s1 = 0; s1 < sigs; s1++) {
				 if(hsig[s1] == pnets[s]) {
					bf = true;
				 }
			    }
				if(!bf) hsig[sigs++] = pnets[s];
			}
			this['L4hs' + (v_iter).toString()] = hou_owner; 
			bf = false;
			for(var s = 0; s < sigs; s++) {
			 if(hsig[s] == hou_owner) {
				bf = true;
			 }
			}
			if(!bf) hsig[sigs++] = hou_owner;
            //let h_sigs: string = '';
			for(var h = 0; h < sigs; h++)
				this.oHouse[v_iter].sig += hsig[h] + ',';
	    }
		
		let mdeg: number = 0;
		if(this.moon_deg.indexOf('.') > -1) 
			mdeg = this.dmsToDec(Number(this.moon_deg.split('.')[0]), Number(this.moon_deg.split('.')[1]), Number(this.moon_deg.split('.')[2]));
		else
			mdeg = Number(this.moon_deg);
		var bstar = this.calcBirthStarEx(this.moon_sign, mdeg);
		//console.log(bstar);
		this.shareService.setBirthStar(bstar.split('|')[0]);
		var ras_num = Number(this.o_rashis_v[this.moon_sign].split('\|')[0]);
		var ras_num2 = Number(this.o_rashis_v[bstar.split('|')[3]].split('\|')[0]);
		this.info = '';
		this.showSGF = true;
	}
	get_h_from_h(s_h: number, d_h: number)
	{
		let h: number = s_h;
		for(var i = h; i < d_h; i++) {
		    if(i > 12) i = 1;
			if(i == d_h) return i;
		}
		return -1;
	}
	analyze_life_evts(lord: string, lsig: string)
	{
	  //console.log('analyze_life_evts ' + lord + ' sigs=' + lsig);
		let lif_e: string = '';
		for(let key of Object.keys(this.house_groups)) {
		  //console.log(key);
		  let h_g: string ='';
		  let sigs: string[] = key.split('-');
		  //console.log(sigs[0]);
		  let idx: number = sigs[0].indexOf('(');
		  //console.log('Index=' + idx.toString());
		  if(idx != -1) {
			let s_h: number = Number(sigs[0].match(/\(([^)]+)\)/)[1]);
		  //console.log(s_h);
			var hno = (idx == -1) ? sigs[0] : sigs[0].substring(0, idx+1);
		  //console.log(hno);
			let d_h: number = Number(hno);
		  //console.log(d_h);
		  //if(idx != -1)
			sigs[0] = this.get_h_from_h(s_h, d_h).toString();
		  }
		  //console.log(sigs[0]);
			let sig_c: number = 0;
			//if(lsig.split(',')[0] == sigs[0]) {	//primary house satisfied
			  // console.log('Primary house ' + sigs[0] + ' is satisfied');
				//h_g += sigs[0] + '-';
				//sig_c++;
			    let lsigs: string[] = lsig.split(',');
				for(var i = 0; i < sigs.length; i++) {
					if(sigs[i].indexOf('(') != -1) {
					  let s_h: number = Number(sigs[i].match(/\(([^)]+)\)/)[1]);
					  //console.log(s_h);
					  idx = sigs.indexOf('(');
					 //console.log('Index=' + idx.toString());
					  
					  hno = (idx == -1) ? sigs[i] : sigs[i].substring(0, idx+1);
				//console.log(hno);
					  let d_h: number = Number(hno);
		  //console.log(d_h);
					  sigs[i] = this.get_h_from_h(s_h, d_h).toString();
					} else if(sigs[i] == 'BADH' || sigs[i] == 'CUSP') {
						continue;
					} else if(sigs[i] == 'MARS' && sigs[i].toLowerCase() != lord) {
						continue;
					}
					for(var j = i; j < lsigs.length; j++) {
						if(lsigs[j] == sigs[i]) {	//supporting house satisfied
						if(h_g.indexOf(sigs[i]) == -1) {
						  h_g += sigs[i] + '-';
						  sig_c++;	
						  }
						}
					}
				}
				
				if(sigs.length == sig_c) {  //life event statisfied
				//console.log('life event satisfied ' + this.house_groups[key].details);
					lif_e += h_g + '|' + this.house_groups[key].details + ';';
				}
			//}
		}
		return lif_e;
	}
	get_sub_neg(t_h: string, lif_e: string)
	{
	  let sub_n: string = '';
	  let lifs: string[] = lif_e.split(';');
	  for(var i = 0; i < lifs.length; i++) {
	    if(lifs[i] == '') continue;
		let hgs: string = lifs[i].split('|')[0];
		let ths: string[] = t_h.split(',');
		for(var j = 0; j < ths.length; j++) {
			if(Number(hgs.split('-')[0]) == Number(ths[j])) sub_n += lifs[i].split('|')[1];
		}
	  }
	  return sub_n;
	}
	get_sub_neg2(s_h: string, lif_e: string)
	{
	  let sub_n: string = '';
	  let lifs: string[] = lif_e.split(';');
	  for(var i = 0; i < lifs.length; i++) {
	    if(lifs[i] == '') continue;
		let hgs: string = lifs[i].split('|')[0];
		let ths: string[] = s_h.split(',');
		let sub: string = '';
		for(var j = 0; j < ths.length; j++) {
			if(Number(hgs.split('-')[0]) == Number(ths[j])) sub = (this.shareService.getLANG() == 'en') ? ' FAVOURS ' + lifs[i] : (this.shareService.getLANG() == 'te') ? lifs[i] + ' అనుకూలంగా  ఉంది ' :  lifs[i] + ' अनुमति  है ';
			else {
			  let h12: number = (Number(hgs.split('-')[0]) -1 == 0) ? 12 : Number(hgs.split('-')[0])-1;
			  if(Number(ths[j]) == h12) {
			    sub = (this.shareService.getLANG() == 'en') ? ' OPPOSES ' + lifs[i] :  (this.shareService.getLANG() == 'te') ? lifs[i] + ' అనుకూలంగా లేదు ': lifs[i] + ' पक्ष नहीं है ';
				break;
			  }
			}
		}
		if(sub != '') {
			sub_n += sub;
		}
	  }
	  if(sub_n == '') {
	    sub_n = (this.shareService.getLANG() == 'en') ? ' FAVOURS this event ' : (this.shareService.getLANG() == 'te') ? ' అనుకూలంగా  ఉంది ' :  ' अनुमति  है ';
	  }
	  return sub_n;
	}
	get_sub_neg3(s_h: string, l_h: string)
	{
	  let sub_n: string = '';
	  let lhs: string[] = l_h.split(',');
	  for(var i = 0; i < lhs.length; i++) {
	    if(lhs[i] == '') continue;
		let ths: string[] = s_h.split(',');
		let bf: boolean = true;
		for(var j = 0; j < ths.length; j++) {
			let h12: number = (Number(lhs[i]) -1 == 0) ? 12 : Number(lhs[i])-1;
			if(Number(ths[j]) == h12) {
			   bf = false;
			break;
			} 
		}
		if(bf) {
			sub_n += lhs[i] + ',';
		}
	  }
	  return sub_n;
	}
 	check_aspects(sign) {
		var plPos = this.binf.ppos;//this.shareService.getPPOS(this.binf.dob);
		var chk_asp = '';
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
				if (pls[k].split(' ')[1].toLowerCase() == 'ju') {
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
		//if (seven_asp.length > 0 || five_asp.length > 0 || three_asp.length > 0 || nine_asp.length > 0 || ten_asp.length > 0) {
			//chk_asp += '<h3>This house has</h3>';
		//}
		if (seven_asp.length > 0) {
			chk_asp += '7|' + seven_asp + ';';//'<span><strong> 7th aspect from ' + seven_asp + '. </strong></span>';
		}
		if (five_asp.length > 0) {
			chk_asp += '5|' + five_asp + ';';//'<span><strong> 5th aspect from ' + five_asp + '. </strong></span>';
		}
		if (nine_asp.length > 0) {
			chk_asp += '9|' + nine_asp + ';';//'<span><strong> 9th aspect from ' + nine_asp + '. </strong></span>';
		}
		if (three_asp.length > 0) {
			chk_asp += '3|' + three_asp + ';';//'<span><strong> 3rd aspect from ' + three_asp + '. </strong></span>';
		}
		if (ten_asp.length > 0) {
			chk_asp += '10|' + ten_asp + ';';//'<span><strong> 10th aspect from ' + ten_asp + '. </strong></span>';
		}
		return chk_asp;
	}
	get_indicators2(lord: string, houses: string)
	{
		let ind: string = '';
		let das :any = '';
		if(lord == "venus") das = this.venus_v;
		else if(lord == "sun") das = this.sun_v;
		else if(lord == "moon") das = this.moon_v;
		else if(lord == "mars") das = this.mars_v;
		else if(lord == "jupiter") das = this.jupiter_v;
		else if(lord == "saturn") das = this.saturn_v;
		else if(lord == "mercury") das = this.mercury_v;
		else if(lord == "rahu") das = this.rahu_v;
		else if(lord == "ketu") das = this.ketu_v;
		//else if(lord == "rahu" || lord == "ketu") {   //in case rahu/ketu need to consider the lord conjoined or aspecting or sign lord or constellation lord
			//das = ketu;
		//}
        var hou = houses.split(',');		
		for(var h=0; h < hou.length; h++) {
			if(hou[h].trim() == '') continue;
		    ind += (h > 0) ? ' and ' + lord.toUpperCase() + ' as ' + hou[h] + ' house lord offers ' : lord.toUpperCase() + ' as ' + hou[h] + ' house lord offers ';
			ind += das[hou[h].trim()] + ',';
		}
		return ind;
	}
	
	get_indicators(lord: string, houses: string)
	{
		let ind: string = '';
		let das :any = '';
		if(lord == "venus") das = venus;
		else if(lord == "sun") das = sun;
		else if(lord == "moon") das = moon;
		else if(lord == "mars") das = mars;
		else if(lord == "jupiter") das = jupiter;
		else if(lord == "saturn") das = saturn;
		else if(lord == "mercury") das = mercury;
		//else if(lord == "rahu" || lord == "ketu") {   //in case rahu/ketu need to consider the lord conjoined or aspecting or sign lord or constellation lord
			//das = ketu;
		//}
        var hou = houses.split(',');		
		for(var h=0; h < hou.length; h++) {
			if(hou[h].trim() == '') continue;
			ind += das[hou[h].trim()] + ',';
		}
		return ind;
	}
	get_pls_in_star(lord: string)
	{
	  let pls: string = '';
	  for(let key of Object.keys(this.oPlanet)) {
	    if(this.oPlanet[key].star == lord) pls += this.trans(key) + ',';
	  }
	  return pls;
	}
	get_pls_in_star_occ(o_pls: string)
	{
	  let pls: string = '';
	  var o_p = o_pls.split(',');
	  for(var p = 0; p < o_p.length; p++) {
		for(let key of Object.keys(this.oPlanet)) {
			if(this.oPlanet[key].star == o_p[p]) pls += this.trans(key) + ',';
		}
	  }
	  return pls;
	}	
	get_pls_in_hou_ex(mins1: number, mins2: number)
	{
	  let pls: string = '';
	  for(let key of Object.keys(this.oPlanet)) {
	   // console.log('Planet = ' + key + 'Planet pos = ' + this.oPlanet[key].pos + ' H start = ' + mins1.toString() + ' H end = ' + mins2.toString());
		if(this.oPlanet[key].pos >= mins1 && this.oPlanet[key].pos < mins2) pls += this.trans(key) + ',';
		else if((mins1 > mins2) && ((this.oPlanet[key].pos >= mins1 && this.oPlanet[key].pos < 360) || (this.oPlanet[key].pos >= 0 && this.oPlanet[key].pos <= mins2))) {
			pls += this.trans(key) + ',';
			//console.log(key + ' is at ' + this.oPlanet[key].pos.toString() + ' which is between ' + mins1.toString() + ' and ' + mins2.toString());
		 }
	  }
	  return pls;
	}
	get_pls_pos_in_hou_ex(mins1: number, mins2: number, sign: string)
	{
	  let pls: string = '';
	  for(let key of Object.keys(this.oPlanet)) {
	    //console.log('Planet = ' + key + 'Planet pos = ' + this.oPlanet[key].pos + ' H start = ' + mins1.toString() + ' H end = ' + mins2.toString());
		if(this.oPlanet[key].pos >= mins1 && this.oPlanet[key].pos <= mins2) pls += key + ',';
		else if((mins1 > mins2) && ((this.oPlanet[key].pos >= mins1 && this.oPlanet[key].pos <= 360*60) || (this.oPlanet[key].pos >= 0 && this.oPlanet[key].pos <= mins2))) {
		    var pc = key.substring(0,2);
			pc = pc.charAt(0).toUpperCase() + pc.slice(1);
			let pspos: number = (this.oPlanet[key].pos - this.signs_pos_v[sign])/60;
			pls += pc + ' ' + pspos.toString() + ',';
			//console.log(key + ' is at ' + this.oPlanet[key].pos.toString() + ' which is between ' + mins1.toString() + ' and ' + mins2.toString());
		 }
	  }
	  return pls;
	}	
	get_hno_by_pos(mins: any)
	{
	  //console.log('significator get_hno_by_pos mins', mins);
	  for(let key of Object.keys(this.oHouse)) {
	    //console.log('significator hno=' + key);
		let v_iter: number = Number(key);
		let cur_h: number = (v_iter == 12) ? 1: v_iter + 1;
		let mins1: number = this.oHouse[v_iter].pos;
		let mins2: number = this.oHouse[cur_h].pos;
		
		//console.log('significator mins1', mins1);
		//console.log('significator mins2', mins2);
		if(mins2 < mins1) {
		  //if(mins >= mins1 && mins <= 21600) return v_iter;
		  if(mins >= 0 && mins > mins1) return v_iter;
		} else {
		   if(mins >= mins1 && mins < mins2) return v_iter;
		}
	    //if(mins >= mins1 && mins <= mins2)
		   //return v_iter;
		//else if((mins1 > mins2) && ((this.oHouse[key].pos >= mins1 && this.oHouse[key].pos <= 360*60) || (this.oHouse[key].pos >= 0 && this.oHouse[key].pos //<= mins2)))
		//	return v_iter;
	  }
	  return (12);
	}
	
	get_hno_by_sign(sign: string)
	{
      var roms = ['I', 'II', 'III', 'IV', 'V', 'V1', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
	  let spos_s: number = this.dmsToDec(this.signs_pos_v[sign], 0, 0);
	  let spos_e: number = this.dmsToDec(this.signs_pos_v[sign]+30, 0, 0);
	  var hno = '';
	  //console.log('get_hno_by_sign' + sign + ' spos_s ' + spos_s.toString() + ' spos_e ' + spos_e.toString());
	  for(let key of Object.keys(this.oHouse)) {
	    let key_n: number = Number(key);
	   //console.log('get_hno_by_sign', 'pos=' + this.oHouse[key].pos.toString());
		if(this.oHouse[key].pos >= spos_s && this.oHouse[key].pos <= spos_e) hno += roms[key_n-1] + ',';
	  }
	 // console.log(hno);
	  //this.replaceAt(hno, ',', '', hno.length-1, hno.length-1); //remove extra coma
	  return hno.substring(0, hno.length-1);
	}
	replaceAt(input, search, replace, start, end) {
		return input.slice(0, start)
			+ input.slice(start, end).replace(search, replace)
			+ input.slice(end);
	}	
	get_own_houses(lord: string)
	{
	  //console.log('significator get_own_houses for', lord);
	  let hno: string = '';
	  for(var i = 0; i < Object.keys(this.oHouse).length; i++) {
	    if(this.oHouse[i+1].sign == lord) hno += (i+1).toString() + ',';
	  }
	  return hno;
	}
	getDms(val:any) {

        // Required variables
        var valDeg, valMin, valSec, result;

        // Here you'll convert the value received in the parameter to an absolute value.
        // Conversion of negative to positive.
        // In this step it does not matter if it's North, South, East or West,
        // such verification was performed earlier.
        val = Math.abs(val); // -40.601203 = 40.601203

        // ---- Degrees ----
        // Stores the integer of DD for the Degrees value in DMS
        valDeg = Math.floor(val); // 40.601203 = 40

        // Add the degrees value to the result by adding the degrees symbol "º".
        result = valDeg + "º"; // 40º

        // ---- Minutes ----
        // Removing the integer of the initial value you get the decimal portion.
        // Multiply the decimal portion by 60.
        // Math.floor returns an integer discarding the decimal portion.
        // ((40.601203 - 40 = 0.601203) * 60 = 36.07218) = 36
        valMin = Math.floor((val - valDeg) * 60); // 36.07218 = 36

        // Add minutes to the result, adding the symbol minutes "'".
        result += valMin + "'"; // 40º36'

        // ---- Seconds ----
        // To get the value in seconds is required:
        // 1º - removing the degree value to the initial value: 40 - 40.601203 = 0.601203;
        // 2º - convert the value minutes (36') in decimal ( valMin/60 = 0.6) so
        // you can subtract the previous value: 0.601203 - 0.6 = 0.001203;
        // 3º - now that you have the seconds value in decimal,
        // you need to convert it into seconds of degree.
        // To do so multiply this value (0.001203) by 3600, which is
        // the number of seconds in a degree.
        // You get 0.001203 * 3600 = 4.3308
        // As you are using the function Math.round(),
        // which rounds a value to the next unit,
        // you can control the number of decimal places
        // by multiplying by 1000 before Math.round
        // and subsequent division by 1000 after Math.round function.
        // You get 4.3308 * 1000 = 4330.8 -> Math.round = 4331 -> 4331 / 1000 = 4.331
        // In this case the final value will have three decimal places.
        // If you only want two decimal places
        // just replace the value 1000 by 100.
        valSec = Math.round((val - valDeg - valMin / 60) * 3600 * 1000) / 1000; // 40.601203 = 4.331 

        // Add the seconds value to the result,
        // adding the seconds symbol " " ".
        result += valSec + '"'; // 40º36'4.331"

        // Returns the resulting string.
        return result;
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
		}
	}
	calcBirthStarEx(moonsign: string, moondeg: number)
	{
		for(var i = 0; i < Object.keys(this.nakshatras_v).length; i++)
		{
			var nak = this.nakshatras_v[i];
			let nak_s: number = 0;
			let nak_e: number = 0;
			if(nak.location.start.split(',')[0].indexOf('.') > -1 && nak.location.start.split(',')[0].split('.')[1] != '')
				nak_s = parseInt(nak.location.start.split(',')[0].split('.')[0], 10) + parseInt(nak.location.start.split(',')[0].split('.')[1], 10)/60;
			else if(nak.location.start.split(',')[0].indexOf('.') > -1 && nak.location.start.split(',')[0].split('.')[1] == '')
				nak_s = parseInt(nak.location.start.split(',')[0].split('.')[0], 10);
			else
				nak_s = parseInt(nak.location.start.split(',')[0], 10);
			   
			if(nak.location.end.split(',')[0].indexOf('.') > -1 && nak.location.end.split(',')[0].split('.')[1] != '')
				nak_e = parseInt(nak.location.end.split(',')[0].split('.')[0], 10) + parseInt(nak.location.end.split(',')[0].split('.')[1], 10)/60;
			else if(nak.location.end.split(',')[0].indexOf('.') > -1 && nak.location.end.split(',')[0].split('.')[1] == '')
				nak_e = parseInt(nak.location.end.split(',')[0].split('.')[0], 10);
			else
				nak_e = parseInt(nak.location.end.split(',')[0], 10);
			
			if(nak.location.start.split(',')[1] == moonsign.toLowerCase() && nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
				if(moondeg >= nak_s && moondeg <= nak_e) {
					return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
				}
			} 
			else if(nak.location.start.split(',')[1] == moonsign.toLowerCase()) {
			  if(moondeg >= nak_s) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
			}
			else if(nak.location.end.split(',')[1] == moonsign.toLowerCase()) {
			  if(moondeg <= nak_e) return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
			}
		}
	}
	trans(lord: string)
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
	more()
	{
	this.router.navigate(['/astrologers'], {state: 'Talk to Astrologer' as any});
	  
	}	
	btrmore()
	{
		this.router.navigate(['/btr-info']);
	}
    hsignf(h)
    {
	   this.choice = 'houseinfo';
	   this.shn = h;
			if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') 
				this.router.navigate(['/house-info'], {state :h as any});
			else {
				//admob.setDevMode(true);
				admob.interstitial.load({
				id: {
				  // replace with your ad unit IDs
				  android: 'ca-app-pub-8442845715303800/8873881143',
				  ios: 'ca-app-pub-8442845715303800/8873881143',
				  },
				}).then(() => admob.interstitial.show())			
			}
	   
    }
    chgayan()
    {
	  this.router.navigate(['/chart-settings'], {state: this.binf});
    }	
	dmsToDec(d, m, s)
    {
       let v: number = d + (m /60) + (s /3600);
       return Number(v.toFixed(2));
    }
	edt()
    {
    }
	calc_fortuna(s, m, a)
	{
		console.log('fortuna-asc', a);
		console.log('fortuna-m', m);
		console.log('fortuna-s', s);
		let r = (a+m) > s ? (a+m) - s : (a+s) - m;
		return (r < 0) ? (r + 360) : (r > 360) ? r-360 : r;		
		//let dc: boolean = false;
		//var hno = this.get_hno_by_pos(s);
		//if(hno > 6 && hno < 13) dc = true;
		//if(() {
			//return (a+ m) - s;
		//else
			//return (a+ s) - m;
	}
	
	itemTapped(event, item)
	{
	   event.preventDefault();	 
	   if(!item.fuse) return;
	   item.spin = true;
	   this.choice = item.title;
		   let kpd: any = {};
		   kpd.title = item.title;
		   kpd.binf = this.binf;
		   kpd.vim = this.vim;
		   kpd.oPlanet = this.oPlanet;
	   switch(item.title)
	   {
		 case 'KP Transit':
			if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.year') {
				this.getTrans(this.mdas1, this.adas1, this.pdas1);
				this.router.navigate(['/kp-event'], {state: this.binf});
			} else
				this.router.navigate(['/subscribe']);
			break;
		 case 'Dasha & Transit predictions':
		   console.log('kpd', kpd);
			if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.year') 
				this.router.navigate(['/dash-trans'], {state: kpd});
			else
				this.router.navigate(['/subscribe']);
		    break;
		 case 'Planet & Significance':
		    this.router.navigate(['/planet-sig'], {state: this.oPlanet});
			break;
		 case 'Lucky Days to sign an Agreement':
			this.router.navigate(['/lif-event'], {state: kpd});
			break;
		 case 'Lucky Days for opening bank account':
			this.router.navigate(['/lif-event'], {state: kpd});
			break;
		 case 'To undergo a treatment':
			this.router.navigate(['/lif-event'], {state: kpd});
			break;
		 case 'Filing a court case':
			this.router.navigate(['/lif-event'], {state: kpd});
			break;
		 case 'To Occupy a new house':
			this.router.navigate(['/lif-event'], {state: kpd});
			break;
		 case 'To take delivery of vehicle':
			this.router.navigate(['/lif-event'], {state: kpd});
			break;
		 case 'To apply for passport':
			this.router.navigate(['/lif-event'], {state: kpd});
			break;
		 case 'For college admission':
		    this.router.navigate(['/lif-event'], {state: kpd});
			break;
		 default:
		  break;
	   }
	   item.spin = false;
	}
 showInf(tpc) {
	this.horoService.getArticle(tpc)
	.subscribe(res => {
		//this.info = '';
		if(res['title'].indexOf('ERROR') == -1)
			this.router.navigate(['/article'], {state: res});
	}, (err) => {
//		this.info = JSON.stringify(err);
	});
 }
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
		this.renderer.appendChild(htxt, document.createTextNode('I'));
		this.renderer.setAttribute(htxt, "fill", "#d35400");
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
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.rashi_imgs_v[ras[ah-1]]);
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
			this.renderer.appendChild(htxt, document.createTextNode(this.get_hno_by_sign(ras[ch-1])));
			this.renderer.setAttribute(htxt, "fill", "#d35400");
			this.renderer.setAttribute(htxt, "font-size", "0.75rem");
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
			image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.rashi_imgs_v[ras[ch-1]]);
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
				this.renderer.setAttribute(text, "fill", ((pls[k].split(' ')[1] == "AC") ? "#FF5733" : (pls[k].split(' ')[1] == "Mo") ? "#011898":"#d35400"));
				this.renderer.setAttribute(text, "font-size", "0.625rem");
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
  getSHXY(r, w) {
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
			x1 = (side)+2;
			y1 = 12;
			break;
		case "ta":
			x1 = (side*2)+2;
			y1 = 12;
			break;
		case "ge":
			x1 = (side*3)+2;
			y1 = 12;
			break;
		case "cn":
			x1 = (side*3)+2;
			y1 = side+12;
			break;
		case "le":
			x1 = (side*3)+2;
			y1 = (side*2)+12;
			break;
		case "vi":
			x1 = (side*3)+2;
			y1 = (side*3)+12;
			break;
		case "li":
			x1 = (side*2)+2;
			y1 = (side*3)+12;
			break;
		case "sc":
			x1 = (side)+2;
			y1 = (side*3)+12;
			break;
		case "sa":
			x1 = 2;
			y1 = (side*3)+12;
			break;
		case "cp":
			x1 = 2;
			y1 = (side*2)+12;
			break;
		case "aq":
			x1 = 2;
			y1 = (side)+12;
			break;
		case "pi":
			x1 = 2;
			y1 = 12;
			break;
		default:
			break;
	}
	console.log('x1', x1);
	console.log('y1', y1);
	return [x1, y1];
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
	getTrans(mdasl, adasl, pdasl) {
			var cdt = new Date();
			this.binf.mdasl = mdasl;
			this.binf.adasl = adasl;
			this.binf.pdasl = pdasl;
			let ayanid: number = (this.shareService.getAYNM()) ? Number(this.shareService.getAYNM()) : 4;
			this.horoService.getDashTrans4DT(cdt, mdasl, adasl, pdasl, this.shareService.getCLAT(), this.shareService.getCLNG(), Intl.DateTimeFormat().resolvedOptions().timeZone, ayanid)
				.subscribe(trns => {
					this.binf.trns = trns;
					//[{"date":"THU Feb 03,2022 20:00:00","sssl":"saturn-sun-rahu|uttaraashada-cp-0.14.0 Me,saturn-jupiter-saturn|purvabhadra-aq-21.58.45 Mo,jupiter-ketu-mercury|mula-sa-13.10.17 Ma,venus-sun-saturn|krittika-ta-3.35.22 Ra","mdras":"aq","mdnak":"shatabhisha","mdsub":"saturn-rahu-mercury","rupll":null,"rupml":null,"rupdl":null}]
					this.info = '';
					//this.tmsg = '<span>Day Lord: <strong>' + trns[0].rupdl +  ' </strong>Lagna Lord: <strong>' + trns[0].rupll + ' </strong>Moon Lord: <strong>' + trns[0].rupml +'</strong></span><br>';
					//for(var i = 0; i < (<any>trns).length; i++) {
					//	let ssls: any = trns[i].sssl.split(',');
					//	for(var j = 0; j < ssls.length; j++) {
					//		let pn = this.ruler_name_v[ssls[j].split('|')[1].split('-')[2].split(' ')[1].toLowerCase()];
					//		let rs = this.o_rashis_v[ssls[j].split('|')[1].split('-')[1]].split('|')[1];
					//		let nk = ssls[j].split('|')[1].split('-')[0];
					//		console.log('pn', pn);
					//		console.log('rs', rs);
					//		console.log('nk', nk);
							//this.tmsg += '<span><strong>'+pn.toUpperCase() +  '</strong> in <strong>' + nk.toUpperCase() + '</strong> SUB of <strong>' + ssls[j].split('|')[0].split('-')[2].toUpperCase() +'</strong></span><br>';
					//	}
					//}
			}, (err) => {
			});
	}
	msgok() {
		this.recfyBT = '';
	}
}
