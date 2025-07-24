import { Component, OnInit, ViewEncapsulation, Renderer2  } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AppUpdate, AppUpdateAvailability } from '@capawesome/capacitor-app-update';
import { AlertController } from '@ionic/angular';
import { skip } from 'rxjs/operators';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Platform, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { AppRate } from '@awesome-cordova-plugins/app-rate/ngx';
import { Market } from '@awesome-cordova-plugins/market/ngx';
import { ShareService } from '../share.service'
import { HoroscopeService } from '../horoscope.service';
//import { astroStatus, CallService } from '../call.service';
import { Ticket } from '../ticket';
import { Plan } from '../plan';
import { Astrologer } from '../astrologer';
import { User } from '../user';
import { Location } from '../location';
import * as sign_imgs from '../sign_imgs.json';
import * as sublords from '../sublords.json';
import * as moment from 'moment';
import * as nakshatras from '../nakshatras.json';
import * as ruler_name from '../ruler_name.json';
import * as o_rashis from '../o_rashis.json';
declare var admob;
const getCurrentAppVersion = async () => {
	const result = await AppUpdate.getAppUpdateInfo();
	if (Capacitor.getPlatform() === 'android') {
	  return result.currentVersionCode;
	} else {
	  return result.currentVersionName;
	}
  };
  
  const getAvailableAppVersion = async () => {
	const result = await AppUpdate.getAppUpdateInfo();
	if (Capacitor.getPlatform() === 'android') {
	  return result.availableVersionCode;
	} else {
	  return result.availableVersionName;
	}
  };
  const performImmediateUpdate = async () => {
	const result = await AppUpdate.getAppUpdateInfo();
	if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
	  return;
	}
	if (result.immediateUpdateAllowed) {
	  await AppUpdate.performImmediateUpdate();
	}
  };
  
  const startFlexibleUpdate = async () => {
	const result = await AppUpdate.getAppUpdateInfo();
	if (result.updateAvailability !== AppUpdateAvailability.UPDATE_AVAILABLE) {
	  return;
	}
	if (result.flexibleUpdateAllowed) {
	  await AppUpdate.startFlexibleUpdate();
	}
  };
  
  const completeFlexibleUpdate = async () => {
	await AppUpdate.completeFlexibleUpdate();
  };@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage  {
  lstnr1: () => void;
  lstnr2: () => void;
  lstnr3: () => void;
  sublords_v: any = (sublords as any).default;
  sign_imgs_v: any = (sign_imgs as any).default;
  nakshatras_v: any = (nakshatras as any).default;
  ruler_name_v: any =(ruler_name as any).default;
  o_rashis_v: any = (o_rashis as any).default;
  icons: string[];
  title: string[];
  note: string[];
  r1items: Array<{title: string, note: string, icon: string, spin: boolean, fuse: boolean}>;
  r2items: Array<{title: string, note: string, icon: string, spin: boolean, fuse: boolean}>;
  r3items: Array<{title: string, note: string, icon: string, spin: boolean, fuse: boolean}>;
  today: string = '';
  lang: string;
  sunrise: string = '';
  sunset: string = '';
  rahukal: string = '';
  yama: string = '';
  abhjit: string = '';
  showCard: boolean;
  vsts: number = 0;
  apr: boolean = false;
  //fetching: string = '';
  lagna: string = '';
  ticks: number = 0;
  lag_d: number = 0;
  lag_m: number = 0;
  lag_s: number = 0;
  lagml: string = '';
  lagal: string = '';
  lagsl: string = '';
  nak: string = '';
  nak_en: string = '';
  tithi: string = '';
  yog: string = '';
  karn: string = '';
  showASU: boolean = false;
  shwAD: boolean = false;
  showBN: boolean = false;
  ofrm: string = '';
  ofr: any;
  adv: any = {
	tag: 'blogad',
	msg: '',
	img:''
  };
  dho: any = {
	  sho: false,
	  msgn: '',
	  msg: '',
	  smsg:'',
	  img: ''
  };
  sstr: any = {
	  sho: false,
	  ssg: '',
	  lsg:''
  };
  choice: string = '';
  bthi: boolean = true;
  blag: boolean = true;
  brev: boolean = true;
 // plan: any;
  info: string = '';
  info2: string = '';
  info3: string = '';
  bpf: boolean = false;
    ticket: Ticket;
	notif: boolean = false;
	arcs: number = 0;
	verc: any = '';
	plan: any;
	amsg: string = null;
	atitle: string = null;
	hmsg: string = null;
	tmsg: string = null;
	aumsg: string = null;
	binf: any = {};
  items: Array<{title: string, note: string, spin: boolean, show: boolean, fuse: boolean, img: string}>;
  private weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  urat: any = {};
  oAst: Astrologer[] = [];
  constructor(private androidPermissions: AndroidPermissions, 	
  public alertController: AlertController,
   private geolocation: Geolocation,	
private menu: MenuController, private device: Device, private market: Market, private router: Router, private appRate: AppRate, private renderer: Renderer2, private platform: Platform, private translate: TranslateService, 
//private callService: CallService, 
private shareService: ShareService, private horoService: HoroscopeService, private file: File) 
  {
	  console.log('home', 'constructor');
    this.items = [
      { title: 'Planetary Transits & Predictions', note: 'Get your monthly  prediction based on planetary transits', spin: false, show: true, fuse: true, img: 'assets/imgs/planets.png' },
	  { title: 'Birth Time Rectification', note: 'Get the rectified birth time through the scientifically proven KP Stellar Astrology', spin: false, show: true, fuse: false, img: 'assets/imgs/btr1.png' },
	  { title: 'Yogas In Your Horoscope', note: 'Know your Raja Yogas, Panchmahapurush Yogas, Gajakesari Yoga, Lakshmi Yogas and many more..', spin: false, show: true, fuse: false, img: 'assets/imgs/yogas.png' },
 ];
    this.icons = ['assets/imgs/chart.png','assets/imgs/vargas.png','assets/imgs/love.png','assets/imgs/kp.png', 'assets/imgs/tarabal.png', 'assets/imgs/prashna.png','assets/imgs/money.png','assets/imgs/career.png', 'assets/imgs/gems.png'];
	this.title = ['Birth Chart Analysis','Divisional Charts','Love Compatibility','KP Astrology', 'Star Constellation', 'Prashna Jyotish','Money Horoscope','Career Horoscope','Lucky Gemstones']
    this.note = ['Vedic Horoscope with Vimsottara Dasha predictions','Analysis On Each Life Aspect','Based On Your Moon Sign', 'Love/Marriage Compatibility Report', 'KP Astrology, Life Event Predictions','Know your lucky days/star strength, based on Muhurta by B V Raman','Horary, Ask any question & know the answer.','Career Predictions using Dasamsa Chart','Know yoour wealth using Hora Chart analysis, ', 'Vedic Astrology Stories','Play 250+ Trending Games']
    this.r1items = [];
    this.r2items = [];
    this.r3items = [];
   //this.today = Date.now();
  			for(let i = 1; i < 16; i++) {
				let fuse: boolean = true;
			  if( i == 4 ) fuse = false;
			  if(i < 4) {
				  this.r1items.push({
					title: this.title[i-1],
					note: this.note[i-1],
					icon: this.icons[i-1],
					spin: false,
					fuse: fuse
				  });
			  }
			  else if(i < 7) {
				  this.r2items.push({
					title: this.title[i-1],
					note: this.note[i-1],
					icon: this.icons[i-1],
					spin: false,
					fuse: fuse
				  });
			  }
			  else if(i < 10) {
				  this.r3items.push({
					title: this.title[i-1],
					note: this.note[i-1],
					icon: this.icons[i-1],
					spin: false,
					fuse: fuse
				  });
			  }
			}
}
    showRatePrompt(){
	 this.appRate.setPreferences({
		displayAppName: '126 ASTROLOGY',
		usesUntilPrompt: 5,
		promptAgainForEachNewVersion: false,
		storeAppURL:{
			ios: '123456', 
			android: 'market://details?id=com.mypubz.eportal'
		},
		customLocale: {
			title: 'Would you mind rating %@?',
			message: 'It won’t take more than a minute and helps to promote our app. Thanks for your support!',
			cancelButtonLabel: 'No, Thanks',
			laterButtonLabel: 'Remind Me Later',
			rateButtonLabel: 'Rate It Now'
		},
		callbacks:{
			onRateDialogShow: function(callback) {
				console.log('User Prompt for Rating');
			},
			onButtonClicked: function(buttonIndex){
				console.log('Selected Button Index',buttonIndex);
				if(buttonIndex == 3) this.apr = true;
			}
		}
	 });
    this.appRate.promptForRating(true); 
  //}
  //ionViewWillEnter() {
  }
     getDST(lat, lng) {
    this.horoService.getTimezone(lat, lng, (Math.round((new Date().getTime())/1000)).toString())
		.subscribe(res2 => {
		   console.log(res2['timeZoneId'], res2['dstOffset']);
		   this.shareService.setLocalTZ(res2['timeZoneId'], res2['dstOffset']);
		   console.log('Timezone', res2['timeZoneId']);
		   if(res2['timeZoneId'].indexOf('Calcutta') > -1) this.shareService.setCCODE('IN');
		   else if(res2['timeZoneId'].indexOf('Kolkata') > -1) this.shareService.setCCODE('IN');
		   else this.shareService.setCCODE('US');
		}, (err) => {
			console.log(err);
		}) ;
   }

	async callreq(evt, ast) {
	  console.log('ast', ast);
	  evt.stopPropagation();
	  //check balance, if is insufficient invoke the recharge dialog 
	  let user: User = await this.shareService.getItem('user') as User;
	  if(!user) { this.shareService.setGEVT('login'); return; }
	  else if(user.dob == ''){
	      this.shareService.setGEVT('dob');
	  } else {
	    console.log('user', user);
		this.horoService.getBalance(user.email).subscribe((res) => {	
		  //if(res['balance'] > 0) {
		  // Parse the astrologer's fee from the string format
		   this.shareService.getItem('vho:loc').then((loc: Location) => {
			this.getMinBal(ast.cfee, ast.ccy, loc.country_code).then(minBal => {
				//const estimatedCallCost = astrologerFeePerMinute*5; //minimum 5 minutes of balance is required;
				//if (user.balance >= minBal) {
			//this.callService.callAstro(ast.eml, ast.name, ast.avatar, user.email, user.dob, (user.isprivate) ? 'https://i.imgur.com/LR7e1vw.png' : user.imageUrl).then(() => {
							   
			//				});
				//} else {
							//display recharge dialog
				//	this.shareService.setGEVT('recharge');
				//}
			});
		   });
		// } else {
			// if(res['balance'] == 0) {
				// this.shareService.setGEVT('recharge');
			// } else {
				// alert('Our server did not respond, please try afer sometime.');
			// }
	    // }
	}, (err) => {
		      console.log(JSON.stringify(err));
	}); 
	
     }
	  
	}
	async getMinBal(fee: string, ccy: string, ccode: string): Promise<number> {
	  const res = await this.horoService.getCurrencyExchangeRate(ccode, ccy);

	  const [price,per,unit] = fee.split(' ');

	  let rate: number;
	  if (per === 'per' && (unit === 'min' || unit === 'minute')) {
		rate = Number(price) * res['ConversionRate'] * 5;
	  } else if (per === 'per' && unit === 'hour') {
		rate = Number(price) * res['ConversionRate'];
	  } else {
		rate = parseFloat(price);
	  }
	  return rate;
	}

showDASH() {
			this.bpf = true;
			this.info2 = '';
			  this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION, this.androidPermissions.PERMISSION.MODIFY_AUDIO_SETTINGS, this.androidPermissions.PERMISSION.RECORD_AUDIO]).then(
				adp => {
					console.log('request permission?',adp)
					let options = {timeout: 10000, enableHighAccuracy: true, maximumAge: 3600};
					this.geolocation.getCurrentPosition(options).then((resp) => {
						console.log('loc', resp);
					   this.shareService.setCLAT(resp.coords.latitude);
					   this.shareService.setCLNG(resp.coords.longitude);
					   this.getDST(resp.coords.latitude, resp.coords.longitude);
					   this.shareService.getPRED().then( pred => {
							this.shareService.sigPRED(pred);
					   })
						.catch( e => {
							console.log(e);
						});
						console.log('getVIMS', this.shareService.getPDOB().split('L')[0].trim());
						this.shareService.getVIMS(this.shareService.getPDOB().split('L')[0].trim()).then( vims => {
						   if(vims) {
							this.binf.vims = vims;
							let dts: any;
							let mdasl: string = null;
							let adasl: string = null;
							let pdasl: string = null;
							for(let key of Object.keys(vims)) {
								if(vims[key].style == 'mdasc') mdasl = key;
								else if(vims[key].style == 'adasc') adasl = this.ruler_name_v[key.split('-')[1].toLowerCase()];
								else if(vims[key].style == 'pdasc') { 
									dts = vims[key].per.split('To');
									pdasl = this.ruler_name_v[key.split('-')[2].toLowerCase()];
								}
								if(mdasl && adasl && pdasl) break;
							}
							var edt = new Date(Number(dts[1].trim().split('/')[2]), Number(dts[1].trim().split('/')[1])-1, Number(dts[1].trim().split('/')[0]));
							var cdt = new Date();
							edt.setHours(0,0,0,0);
							cdt.setHours(0,0,0,0);
							if(cdt > edt) {
								this.calcVim();
							} else {
								this.getTrans(mdasl, adasl, pdasl);
							}
						   } else {
							   this.calcVim();
						   }
						})
						.catch( e => {
							console.log(e);
							this.calcVim();
						});
					   this.showPanch();
					   
				}, (err) => {
					   this.shareService.setCLAT(-1);
					   this.shareService.setCLNG(-1);
					   console.log('getCurrentPosition', err);
					   this.showAlert();
				
			});
		 }, (err) => {
					   this.shareService.setCLAT(-1);
					   this.shareService.setCLNG(-1);
					   console.log('requestPermissions', err);
					   this.showAlert();
			});				
    }
	calcVim() {
				this.shareService.getMSD().then(msd => {
								this.shareService.getMSGN().then(msgn => {
								let mos: string = this.getSN(msgn.toLowerCase());
								console.log(msd, mos);
								let msdn: number = this.shareService.dmsToDec(Number(msd.split('.')[0]), Number(msd.split('.')[1]), Number(msd.split('.')[2])); 
								let bstar = this.calcBStar(msdn, mos);
								console.log('calcStar', bstar);
								var ras_num = Number(this.o_rashis_v[mos].split('|')[0]);
								var ras_num2 = Number(this.o_rashis_v[bstar.split('|')[3]].split('\|')[0]);
								this.horoService.calcVim(this.shareService.getPDOB().split('@')[0].split('L')[0].trim(), bstar.split('|')[2], msdn, Number(bstar.split('|')[1]), ras_num, ras_num2, this.shareService.getLANG() )
								.subscribe(vims => {
									console.log('setVIMS', this.shareService.getPDOB().split('@')[0].split('L')[0].trim());
									this.shareService.setVIMS(this.shareService.getPDOB().split('@')[0].split('L')[0].trim(), vims);
									this.shareService.sigPRED('VIMS');
									this.binf.vims = vims;
									let mdl: string = null;
									let adl: string = null;
									let pdl: string = null;
									for(let key of Object.keys(vims)) {
										if(vims[key].style == 'mdasc') mdl = key;
										else if(vims[key].style == 'adasc') adl = this.ruler_name_v[key.split('-')[1].toLowerCase()];
										else if(vims[key].style == 'pdasc') { 
											//var dts = vims[key].per.split('To');
											pdl = this.ruler_name_v[key.split('-')[2].toLowerCase()];
										}
										if(mdl && adl && pdl) break;
									}
									this.getTrans(mdl, adl, pdl);
								}, (err) => {
								});	
							   })						
								.catch( e => {
									console.log(e);
								});
							  })					
								.catch( e => {
									console.log(e);
								});
}
getSN(msgn) {
	let sn: string = 'undefined';
	switch(msgn)
	{
		case 'aries':
			sn = 'ar';
			break;
		case 'taurus':
			sn = 'ta';
			break;
		case 'gemini':
			sn = 'ge';
			break;
		case 'cancer':
			sn = 'cn';
			break;
		case 'leo':
			sn = 'le';
			break;
		case 'virgo':
			sn = 'vi';
			break;
		case 'libra':
			sn = 'li';
			break;
		case 'scorpio':
			sn = 'sc';
			break;
		case 'saggitarius':
			sn = 'sa';
			break;
		case 'capricorn':
			sn = 'cp';
			break;
		case 'aquarius':
			sn = 'aq';
			break;
		case 'Pisces':
			sn = 'pi';
			break;
		default:
			break;
	}
	return sn;
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
					this.tmsg = '<span>Day Lord: <strong>' + trns[0].rupdl +  ' </strong>Lagna Lord: <strong>' + trns[0].rupll + ' </strong>Moon Lord: <strong>' + trns[0].rupml +'</strong></span><br>';
					for(var i = 0; i < (<any>trns).length; i++) {
						let ssls: any = trns[i].sssl.split(',');
						for(var j = 0; j < ssls.length; j++) {
							let pn = this.ruler_name_v[ssls[j].split('|')[1].split('-')[2].split(' ')[1].toLowerCase()];
							let rs = this.o_rashis_v[ssls[j].split('|')[1].split('-')[1]].split('|')[1];
							let nk = ssls[j].split('|')[1].split('-')[0];
							console.log('pn', pn);
							console.log('rs', rs);
							console.log('nk', nk);
							this.tmsg += '<span><strong>'+pn.toUpperCase() +  '</strong> in <strong>' + nk.toUpperCase() + '</strong> SUB of <strong>' + ssls[j].split('|')[0].split('-')[2].toUpperCase() +'</strong></span><br>';
						}
					}
			}, (err) => {
			});
	}
        calcBStar(plpos: number, sign: string)
        {
			for(var i = 0; i < Object.keys(this.nakshatras_v).length; i++)
			{
				var nak = this.nakshatras_v[i];
                if (nak.location.start.split(',')[1] == sign && nak.location.end.split(',')[1] == sign)
                {
                    if (plpos >= this.shareService.dmsToDec(Number(nak.location.start.split(',')[0].split('.')[0]),Number(nak.location.start.split(',')[0].split('.')[1]),0) && plpos < this.shareService.dmsToDec(Number(nak.location.end.split(',')[0].split('.')[0]),Number(nak.location.end.split(',')[0].split('.')[1]),0))
                    {
						console.log('bstar', nak);
						return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];
                    }
				}
                else if (nak.location.start.split(',')[1] == sign.toString())
                {
                     if (plpos >= this.shareService.dmsToDec(Number(nak.location.start.split(',')[0].split('.')[0]), Number(nak.location.start.split(',')[0].split('.')[1]),0))
                     {
						console.log('bstar', nak);
						return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];                     
					 }
                }
                else if (nak.location.end.split(',')[1] == sign.toString())
                {
                     if (plpos < this.shareService.dmsToDec(Number(nak.location.end.split(',')[0].split('.')[0]), Number(nak.location.end.split(',')[0].split('.')[1]),0))
                     {
						  console.log('bstar', nak);
						 return nak.name + '|' + nak.location.start.split(',')[0] + '|' + nak.ruler + '|' + nak.location.start.split(',')[1] + '|' + nak.location.end.split(',')[1];	                     
					 }
                }
			}
        }

 ngAfterViewInit() {
 		  console.log('home', 'ngOnAfterViewInit');
		 this.info = 'Fetching..';
	// astroStatus.subscribe((ast) => {
	// 	console.log('astroStatus', ast);
	// 	let a = this.oAst.find((o) => o.eml === ast.aid);
	// 	a.smsg = (ast.busy) ? 'Not Available': 'Available';
	// 	a.status = !ast.busy;
	//   });
	this.shareService.getPLAN().then((pln)=> { 
		      console.log('fetched plan', pln);
		        this.info = '';
				this.plan = pln; 
				if(this.plan.name != 'com.mypubz.eportal.astrologer') this.showASU = true;
			this.showDASH();
			this.shareService.getMSGN().then( msgn => {
				console.log('home getMSGN', msgn);
				if(msgn != null && msgn.trim() != '') {
					let mos: string = this.getSN(msgn.toLowerCase());
					this.dho.msgn = msgn;
					this.dho.img = 'assets/imgs/'+msgn.toLowerCase() +'.png'//this.sign_imgs_v[mos];
					this.shareService.getDHORO(msgn).then( rdh => {
						console.log('rdh', rdh);
						var cd = new Date();
					  if(rdh) {
						if(JSON.stringify(rdh).split('|')[1] == cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear()) {
						  this.dho.msg = JSON.stringify(rdh).split('|')[0];
						  this.dho.smsg = JSON.stringify(this.dho.msg).substring(0,128) ;
						  this.dho.sho = true;
						} else {
						  console.log('calling getDailyHoro');
						  this.shareService.getLANGU().then((lang) => {
						    this.horoService.getDailyHoroEx(msgn, lang)
							.subscribe(res2 => {
							  this.shareService.setDHORO(msgn,   res2+ '|' + cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear());
						      this.dho.msg = JSON.stringify(res2);
						      this.dho.smsg = JSON.stringify(this.dho.msg).substring(0,128);
							  this.dho.sho = true;
						    }, (err) => {
							  //this.info = JSON.stringify(err);
						    }) ;
						  });
					    }
				     } else {
						  console.log('calling getDailyHoro 2');
						  this.horoService.getDailyHoro(msgn)
							.subscribe(res2 => {
							var cd = new Date();
							this.shareService.setDHORO(msgn,   res2+ '|' + cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear());
							this.dho.msg = JSON.stringify(res2);
							this.dho.smsg = JSON.stringify(res2).substring(0,128);
							this.dho.sho = true;
						  }, (err) => {
							//this.info = JSON.stringify(err);
						  }) ;
				     }
				    })
					.catch( e => {
						console.log(e);
						  console.log('calling getDailyHoro 3');
						  this.horoService.getDailyHoro(msgn)
							.subscribe(res2 => {
							var cd = new Date();
							this.shareService.setDHORO(msgn,   res2+ '|' + cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear());
						  this.dho.msg = JSON.stringify(res2);
						  this.dho.smsg = JSON.stringify(this.dho.msg).substring(0,128);
							this.dho.sho = true;
						  }, (err) => {
							//this.info = JSON.stringify(err);
					}) ;
				});
			   }
			});
			this.shareService.getCSTATS().then( csts => {
				if(csts) {
					if(csts.split('|')[0] == '1') {
						this.shareService.setCSTATS('0');
						this.urat.uuid = this.device.uuid;
						this.urat.pid = csts.split('|')[1];
						this.shareService.getUPRO().then( upro => {
							if(upro) {
								this.info = '';
								this.urat.avatar = upro['avatar'];
								if(upro['dob'].indexOf('#') > -1) {
									var ng = upro['dob'].split('#')[1];
									this.urat.name = ng.split('&')[0];
								}
								this.router.navigate(['/ratings'], {state : this.urat});
							} else {
								this.horoService.getProfile(this.device.uuid)
								.subscribe(res => {
									this.info = '';
									this.urat.avatar = res['avatar'];
									if(res['dob'].indexOf('#') > -1) {
										var ng = res['dob'].split('#')[1];
										this.urat.name = ng.split('&')[0];
									}
									//this.router.navigate(['/ratings'], {state : this.urat});
								});
							}
						});
					}		
				}
			})
			.catch(e => {
				console.log(e);
			});
			this.shareService.getSTATS().then( sts => {
				console.log('STATS', sts);
				if(sts && (sts.split('|')[0] == 'NaN')) sts = '1|' + sts.split('|')[1];
				var cd = new Date();
				let udys: number = 1;
				if(sts) {
					if(sts.split('|')[1] != cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear()) {
						udys = Number(sts.split('|')[0]) + 1;
						if(udys == 2) {
							let urat: any = {
								uuid: this.plan.uuid,
								name: '',
								pid: 'VHO',
								avatar: '',
								rating: this.plan.rating,
								review: '',
								str1: 'star-outline',
								str2: 'star-outline',
								str3: 'star-outline',
								str4: 'star-outline',
								str5: 'star-outline'
							};
							this.router.navigate(['/ratings'], {state : urat});
						}
						this.shareService.setSTATS(udys, cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear());
					}
				} 
				else 				
				   this.shareService.setSTATS(udys, cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear());
			})
			.catch( e => {
				console.log('getPLAN failed');
				console.log(e);
					var cd = new Date();
					let udys: number = 1;
				   this.shareService.setSTATS(udys, cd.getDate()+'-'+cd.getMonth()+'-'+cd.getFullYear());
			});
			this.horoService.getJson('https://charts.vedichoroo.com/v1/GetAppMsg').subscribe(res => {
				if(res['msg'] != ''){
					this.atitle = res['title'];
					this.amsg = res['msg'];
				}
			});
			this.horoService.getNotif(this.device.uuid).subscribe(res => {
					if(res['resp'] != ''){
						this.hmsg = res['resp'];
					} 
			});
			getAvailableAppVersion().then(avlv => {
				console.log('available version:', avlv);
				getCurrentAppVersion().then(curv =>{
					console.log('current version: ', curv)
					if(avlv != curv) {
						performImmediateUpdate().then(res => {
							console.log('successfully completed App Update!');	
						}, (err) => {
							console.log('startFlexibleUpdate error', err);
						})
					}
				}, (err) =>{
					console.log('getCurrentVersion Error: ', err);
				})
			}, (err) => {
				console.log('getAvailableVersion Error: ', err);
			})
			this.shareService.adv
						 .subscribe((adc) => {
							 console.log('adv triggered', adc);
							 if(adc > 0) {
								 console.log('adv exists');
								 this.shareService.setADV(false);
								 admob.interstitial.show();
							 } 
			});
		});
        this.shareService.langc
				 .subscribe((lang) => {
					 console.log('list page: received language setting', lang);
					 if(lang) {
						 this.lang = lang;
						 this.translate.use(this.lang);
					 } else {
						 this.lang = 'en';
						 this.translate.use(this.lang);
					 }
				  }, (err) => {
	    });
		this.horoService.getAllAstrologers().subscribe((oa: any[]) => {
			        let a: number = 0;
			  for (var i = 0; i < oa.length; i++) {
				console.log(i, oa[i]);
				let call: string = oa[i].mob;
				let chat: string = oa[i].mob;
				if (oa[i].mob.indexOf('|') > -1) {
				  call = oa[i].mob.split('|')[0];
				  chat = oa[i].mob.split('|')[1];
				}
				let smsg = 'Not Available';
				let status = false;
				let cfee: string = '';
				let ast: Astrologer = {
				  uuid: oa[i].uuid,
				  name: oa[i].name,
				  tagline: oa[i].tagline,
				  avatar: oa[i].avatar,
				  uid: oa[i].uid,
				  mob: call,
				  walnk: '',
				  smsg: smsg,
				  status: status,
				  peerid: '',
				  cfee: oa[i].cfee,
				  ccy: 'INR',
				  rating: oa[i].rating,
				  tot_ratings: oa[i].tot_ratings,
				  str1: 'fa fa-star-o',
				  str2: 'fa fa-star-o',
				  str3: 'fa fa-star-o',
				  str4: 'fa fa-star-o',
				  str5: 'fa fa-star-o',
				  lng: oa[i].lng,
				  eml: oa[i].eml
				};

				if (oa[i].rating >= 1 && oa[i].rating < 2) {
				  ast.str1 = 'fa-solid fa-star';
				  ast.str2 = (oa[i].rating > 1) ? 'fa fa-star-half-o' : 'fa fa-star-o';
				  ast.str3 = 'fa fa-star-o';
				  ast.str4 = 'fa fa-star-o';
				  ast.str5 = 'fa fa-star-o';
				}
				else if (oa[i].rating >= 2 && oa[i].rating < 3) {
				  ast.str1 = 'fa-solid fa-star';
				  ast.str2 = 'fa-solid fa-star';
				  ast.str3 = (oa[i].rating > 2) ? 'fa fa-star-half-o' : 'fa fa-star-o';
				  ast.str4 = 'fa fa-star-o';
				  ast.str5 = 'fa fa-star-o';
				}
				else if (oa[i].rating >= 3 && oa[i].rating < 4) {
				  ast.str1 = 'fa-solid fa-star';
				  ast.str2 = 'fa-solid fa-star';
				  ast.str3 = 'fa-solid fa-star';
				  ast.str4 = (oa[i].rating > 3) ? 'fa fa-star-half-o' : 'fa fa-star-o';
				  ast.str5 = 'fa fa-star-o';
				}
				else if (oa[i].rating >= 4 && oa[i].rating < 5) {
				  ast.str1 = 'fa-solid fa-star';
				  ast.str2 = 'fa-solid fa-star';
				  ast.str3 = 'fa-solid fa-star';
				  ast.str4 = 'fa-solid fa-star';
				  ast.str5 = (oa[i].rating > 4) ? 'fa fa-star-half-o' : 'fa fa-star-o';
				} else {
				  ast.str1 = 'fa-solid fa-star';
				  ast.str2 = 'fa-solid fa-star';
				  ast.str3 = 'fa-solid fa-star';
				  ast.str4 = 'fa-solid fa-star';
				  ast.str5 = 'fa-solid fa-star';
				}
				console.log(ast.name, ast.status);
				this.oAst.push(ast);
			  }
			  this.shareService.setASTS(this.oAst);
			this.horoService.getConnectedAstros().subscribe((casts: any[]) => {
				  console.log('casts', casts);
			console.log('oAst', this.oAst);
			this.shareService.getASTS().forEach(item1 => {
			  //console.log('ast', item1.eml);
			  const cast = casts.find(item2 => item2.aid === item1.eml);
		  
			  if (cast) {
				console.log('astrologer found', cast);
				item1.smsg = (cast.busy) ? 'Busy' : 'Available';
				item1.status = !cast.busy;
			  }
			});
		  },(error) => {
			console.log(error);
		  });
		},(error) => {
			console.log(error);
		});
	   
}
 showPanch() {
   		var cd = new Date();
		let ayanid: number = (this.shareService.getRAYNM()) ? Number(this.shareService.getRAYNM()) : 4;
		this.info = "Fetching todays panchang...";
		console.log('Fetching todays panchang...');
		this.horoService.getProMoonPhase(this.shareService.getCLAT(), this.shareService.getCLNG(), cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes()+ ':' + cd.getSeconds()+'Z', Intl.DateTimeFormat().resolvedOptions().timeZone, ayanid)
		   .subscribe(res3 => {
			console.log('Fetched', res3);
			this.info = '';
		   this.bthi = false;
		   
		   // Validate response data
		   if(!res3) {
			   console.error('Invalid response from getProMoonPhase');
			   this.info3 = 'Failed to fetch panchang data. Please try again.';
			   return;
		   }
		   
		   this.sunrise = res3['sunrise'] || '';
		   this.sunset = res3['sunset'] || '';
		   this.nak_en = res3['birthStar'] || '';
		   this.nak = this.shareService.translate_func(res3['birthStar'] || '');
		   this.tithi = this.shareService.translate_func(res3['tithi'] || '');
		   this.yog = this.shareService.translate_func(res3['yoga'] || '');
		   this.karn = this.shareService.translate_func(res3['karana'] || '');
		   this.calcPanch(cd, this.shareService.getCLAT(), this.shareService.getCLNG(), -(cd.getTimezoneOffset() / 60));
		   
		   var ascPos = res3['ascPos'];
		   console.log(ascPos);
		   
		   var lag = this.getDms(ascPos[0]);
		   console.log(lag);
		   this.lagna = lag;
		   
		   try {
			   this.lag_d = Number(lag.substring(0, lag.indexOf('º')));
			   console.log(this.lag_d);
			   this.lag_m = Number(lag.substring(lag.indexOf('º')+1,  lag.indexOf("'")));
			   console.log(this.lag_m);
			   this.lag_s = Math.floor(lag.substring(lag.indexOf("'")+1,  lag.indexOf('"')));
			   console.log(this.lag_s);
		   } catch(error) {
			   console.error('Error parsing lagna degrees', error);
			   this.lag_d = 0;
			   this.lag_m = 0;
			   this.lag_s = 0;
		   }
		   let sssl: string = this.calcStar(this.dmsToDec(this.lag_d, this.lag_m, this.lag_s));
		   console.log(sssl);
		   this.blag = false;
		   if(sssl && sssl !== '-1' && sssl.includes('|')) {
			   this.lagml = sssl.split('|')[0];
			   this.lagal = sssl.split('|')[1];
			   this.lagsl = sssl.split('|')[2];
		   } else {
			   this.lagml = '';
			   this.lagal = '';
			   this.lagsl = '';
		   }
		   var intv = setInterval(() =>  {
		   try {
		   var cdt = new Date();
			this.today = this.weekday[cdt.getDay()] + ',' + cdt.getDate().toString() + ' ' + cdt.toLocaleString('en-us', { month: 'short' }) + ' ' + cdt.getFullYear().toString() + ' ' + cdt.getHours().toString() + ':' + cdt.getMinutes().toString() + ':' + cdt.getSeconds().toString();
			if(this.ticks > 0) {
			this.lag_s += 15; 
			if(this.lag_s > 59) {
				this.lag_s = this.lag_s - 60;
				this.lag_m++;
				if(this.lag_m > 59) {
					this.lag_m = 0;
					this.lag_d++;
				}
			}
			let lag_r: string = '';
			// Ensure lag_d is within valid range (0-359 degrees)
			if(this.lag_d < 0 || this.lag_d >= 360) {
				this.lag_d = this.lag_d % 360;
				if(this.lag_d < 0) this.lag_d += 360;
			}
			
			if(this.lag_d < 29) lag_r = this.shareService.translate_func('Aries');
			else if(this.lag_d < 59) lag_r = this.shareService.translate_func('Taurus');
			else if(this.lag_d < 89) lag_r = this.shareService.translate_func('Gemini');
			else if(this.lag_d < 119) lag_r = this.shareService.translate_func('Cancer');
			else if(this.lag_d < 149) lag_r = this.shareService.translate_func('Leo');
			else if(this.lag_d < 179) lag_r = this.shareService.translate_func('Virgo');
			else if(this.lag_d < 209) lag_r = this.shareService.translate_func('Libra');
			else if(this.lag_d < 239) lag_r = this.shareService.translate_func('Scorpio');
			else if(this.lag_d < 269) lag_r = this.shareService.translate_func('Sagittarius');
			else if(this.lag_d < 299) lag_r = this.shareService.translate_func('Capricorn');
			else if(this.lag_d < 329) lag_r = this.shareService.translate_func('Aquarius');
			else lag_r = this.shareService.translate_func('Pisces');
			this.lagna = lag_r + ' ' + this.lag_d.toString() + 'º' + this.lag_m.toString() + "'" + this.lag_s.toString() + '"';
		   let sl: string = this.calcStar(this.dmsToDec(this.lag_d, this.lag_m, this.lag_s));
		   if(sl && sl !== '-1' && sl.includes('|')) {
			   this.lagml = this.shareService.translate_func(sl.split('|')[0]);
			   this.lagal = this.shareService.translate_func(sl.split('|')[1]);
			   this.lagsl = this.shareService.translate_func(sl.split('|')[2]);
		   } else {
			   this.lagml = '';
			   this.lagal = '';
			   this.lagsl = '';
		   }
		   if(this.lag_d >= 360) {
			   this.lag_d = 0;
			   this.lag_m = 0;
			   this.lag_s = 0;
		   }
		  }
		    this.ticks++;
		   } catch(error) {
			   console.error('Error in panchang interval', error);
		   }
		   },1000);
		  }, (err) => {
				this.info3 = 'App failed to get panchang, Please check if the location access is enabled in your device.  Our App will not work without access to current location.';
						this.horoService.addTicket(this.device.uuid, 'technical', 'PANCH ERR',  'CLAT:'+this.shareService.getCLAT()+',CLNG:'+this.shareService.getCLNG()+',timeZone:'+Intl.DateTimeFormat().resolvedOptions().timeZone)
						.subscribe(res => {
				});
		});
}
 	calcPanch(cd, clat, clng, ofset) {
		console.log('calcPanch', cd);
		console.log('ofset', ofset);
		console.log('sunrise', this.sunrise);
		console.log('sunset', this.sunset);
		var startTime = moment(this.sunrise + ':00 am', "HH:mm:ss a");
		var endTime = moment(this.sunset + ':00 pm', "HH:mm:ss a");
		var duration = moment.duration(endTime.diff(startTime));
		var hours = duration.asHours();
		var minutes = duration.asMinutes() % 60;
		var smins = startTime.hour() * 60 + startTime.minute();
		var emins = endTime.hour() * 60 + endTime.minute();
		var tmins = (smins + emins) / 2;
		var tothrs = Math.floor(tmins / 60);
		var totmins = (tmins % 60);
		var midTime = moment(tothrs.toString() + ':' + totmins.toString() + ':00 pm', "HH:mm:ss a");
		var totalsec = hours * 60 * 60 + minutes * 60;
		var abhsecs = Math.floor(totalsec / 2);
		var abh = Math.floor((hours / 30) * 60);
		var abhs = moment(midTime).subtract(abh, 'm');
		var abhe = moment(midTime).add(abh, 'm');
		var ethsec = Math.floor(totalsec / 8);
		var ethmin = Math.floor(ethsec / 60);
		var eth = moment.utc(ethsec * 1000).format('HH:mm:ss');
		var weekdays = new Array(7);
		weekdays[0] = "SUN|8|5";
		weekdays[1] = "MON|2|4";
		weekdays[2] = "TUE|7|3";
		weekdays[3] = "WED|5|2";
		weekdays[4] = "THU|6|1";
		weekdays[5] = "FRI|4|7";
		weekdays[6] = "SAT|3|6";
		var rwv = parseInt(weekdays[cd.getDay()].split('|')[1]);
		var ywv = parseInt(weekdays[cd.getDay()].split('|')[2]);
		var srhu = moment(startTime).add((rwv - 1) * ethmin, 'm');
		var erhu = moment(srhu).add(ethmin, 'm');
		var sym = moment(startTime).add((ywv - 1) * ethmin, 'm');
		var eym = moment(sym).add(ethmin, 'm');
		this.rahukal = srhu.format('HH:mm') + ' To ' + erhu.format('HH:mm');
		this.yama = sym.format('HH:mm') + ' To ' + eym.format('HH:mm');
		this.abhjit = abhs.format('HH:mm') + ' To ' + abhe.format('HH:mm');
	}

   ngOnDestroy() {
    if (this.lstnr1) {
      this.lstnr1();
    }
    if (this.lstnr2) {
      this.lstnr2();
    }
    if (this.lstnr3) {
      this.lstnr3();
    }
   }
  ionViewDidEnter()
  {
	  console.log('ionViewDidEnter home');
	  this.vsts++;
	  if(this.apr == false && this.vsts % 3 == 0) {
		//  this.showRatePrompt();
		  this.shareService.getADV()
	  }
	  if(this.bpf) {
		for(let i = 0; i < 3 ; i++) {
		  this.r1items[i].spin = false;
		}
		for(let i = 0; i < 3; i++) {
		  this.r2items[i].spin = false;
		}
		for(let i = 0; i < 3; i++) {
		  this.r3items[i].spin = false;
		}
	  }
  
    if (this.lstnr1) {
      this.lstnr1();
    }
    if (this.lstnr2) {
      this.lstnr2();
    }
    if (this.lstnr3) {
      this.lstnr3();
    }
	this.lstnr1 = this.renderer.listen('document', 'admob.interstitial.close', (event) => {
	// document.addEventListener('admob.interstitial.close', () => {
		 console.log('home close event triggered');
	  // handle event
	 })	
	this.lstnr2 = this.renderer.listen('document', 'admob.reward_video.reward', (event) => {
//	document.addEventListener('admob.reward_video.reward', () => {
		console.log('home admob.reward_video.reward', this.brev);
	  // handle event
	    switch(this.choice)
		{
		 case 'Birth Chart':
		 case 'Birth Chart Analysis':
		 case 'KP Astrology':
		 case 'Predictions':
		 case 'Yogas In Your Horoscope':
		 case 'Career Horoscope':
		 case 'Money Horoscope':
		 case 'Muhurtha by BV Raman':
		 case 'Divisional Charts':
			this.router.navigate(['/personal-details'], {state : this.choice as any});
			break;
		 case 'Daily Horoscope':
			if(this.shareService.getMoonSign() == '') {
				this.router.navigate(['/personal-details'], {state :  this.choice as any});
			} else {
				this.router.navigate(['/daily-forecast'], {state : this.dho});
			}
			break;
		case 'Prashna Jyotish':
			this.router.navigate(['/prashna-jyotish'], {state : this.choice as any});
			break;
		case 'Kundli Matching':
		case 'Love Compatibility':
			this.router.navigate(['/marriage-horo'], {state : this.choice as any});
			break;
		default:
			break;
		}
	  this.brev = true;
	})
	this.lstnr3 = this.renderer.listen('document', 'admob.reward_video.exit_app', (event) => {
	//document.addEventListener('admob.reward_video.exit_app', () => {
	  // handle event
		console.log('home admob.reward_video.exit_app', this.brev);
		console.log(this.choice);
	  if(this.brev) {
		  this.brev = false;
	    switch(this.choice)
		{
		 case 'Birth Chart':
		 case 'Birth Chart Analysis':
		 case 'KP Astrology':
		 case 'Predictions':
		 case 'Yogas In Your Horoscope':
		 case 'Career Horoscope':
		 case 'Money Horoscope':
		 case 'Muhurtha by BV Raman':
		 case 'Divisional Charts':
			this.router.navigate(['/personal-details'], {state : this.choice as any});
			break;
		 case 'Daily Horoscope':
			if(this.shareService.getMoonSign() == '') {
				this.router.navigate(['/personal-details'], {state :  this.choice as any});
			} else {
				this.router.navigate(['/daily-forecast'], {state : this.dho});
			}
			break;
		case 'Prashna Jyotish':
			this.router.navigate(['/prashna-jyotish'], {state : this.choice as any});
			break;
		case 'Kundli Matching':
		case 'Love Compatibility':
			this.router.navigate(['/marriage-horo'], {state : this.choice as any});
			break;
		default:
			break;
		}
	  }
	})	
  }
  itemTapped(event, item) {
   event.preventDefault();	 
   item.spin = true;
   console.log(item.title);
   this.choice = item.title;
    switch(item.title)
    {
	 case 'Birth Chart':
	 case 'Birth Chart Analysis':
	 case 'KP Astrology':
	 case 'Transit Predictions':
	 case 'Planetary Transits & Predictions':
	 case 'Yogas In Your Horoscope':
	 case 'Career Horoscope':
	 case 'Money Horoscope':
	 case 'Star Constellation':
	 case 'Divisional Charts':
	 case 'Lucky Gemstones':
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') 
			this.router.navigate(['/personal-details'], {state : item.title as any});
		else if(this.plan.credits > 0) {
			if(this.ticks > 60) {
				this.ticks = 0;
				let adu: string = this.adUnit(item.title);
				//admob.setDevMode(true);
				admob.interstitial.load({
				id: {
				  // replace with your ad unit IDs
				  android: adu,
				  ios: adu,
				  },
				}).then(() =>  {
				this.shareService.setADV(true);
				})		
			}
			this.router.navigate(['/personal-details'], {state : item.title as any});
		} else if(this.shareService.getREWARD() && item.title != 'Personalized Calendar') {
			//admob.setDevMode(true);
		    admob.rewardVideo.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5788035885',
			  ios: 'ca-app-pub-8442845715303800/5788035885',
			  },
		    }).then(() => admob.rewardVideo.show())			
		}
		else
			this.router.navigate(['/personal-details'], {state : item.title as any});
			//this.router.navigate(['/subscribe'], {queryParams : {title: item.title}});
		break;
	 case 'Daily Horoscope':
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') {
			if(this.shareService.getMoonSign() == null || this.shareService.getMoonSign().trim() == '') {
				this.router.navigate(['/profile'], {state : 'home' as any});
			} else {
				console.log('Moonsign', this.shareService.getMoonSign())
				this.router.navigate(['/daily-forecast'], {state : this.dho});
			}
		} else if(this.shareService.getREWARD()) {
		    admob.rewardVideo.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5788035885',
			  ios: 'ca-app-pub-8442845715303800/5788035885',
			  },
		    }).then(() => admob.rewardVideo.show())			
		} else {
			if(this.ticks > 60) {
				this.ticks = 0;
			 let adu: string = this.adUnit(item.title);
			//admob.setDevMode(true);
		     admob.interstitial.load({
			 id: {
			  // replace with your ad unit IDs
			  android: adu,
			  ios: adu,
			  },
		     }).then(() => {
				this.shareService.setADV(true);
				//admob.interstitial.show()
			 })	
			}
			if(this.shareService.getMoonSign() == null || this.shareService.getMoonSign().trim() == '') {
				this.router.navigate(['/profile'], {state : 'home' as any});
			} else {
				console.log('Moonsign', this.shareService.getMoonSign())
				this.router.navigate(['/daily-forecast'], {state :  this.dho});
			}
		}		
		break;
	 case 'Prashna Jyotish':
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') 
			this.router.navigate(['/prashna-jyotish'], {state : item.title as any});
		else if(this.plan.name == 'com.mypubz.eportal.month'|| this.plan.name == 'com.mypubz.eportal.year' || this.plan.credits > 0) {
			if(this.ticks > 60) {
				this.ticks = 0;
				let adu: string = this.adUnit(item.title);
			//admob.setDevMode(true);
				admob.interstitial.load({
				id: {
			  // replace with your ad unit IDs
				android: adu,
				ios: adu,
				},
				}).then(() => { 
					this.shareService.setADV(true);
				})
			  }
			  this.router.navigate(['/prashna-jyotish'], {state : item.title as any});
		} else if(this.shareService.getREWARD()) {
		    admob.rewardVideo.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5788035885',
			  ios: 'ca-app-pub-8442845715303800/5788035885',
			  },
		    }).then(() => admob.rewardVideo.show())			
		} else
			this.router.navigate(['/subscribe'], {state : item.title as any});
	    break;
	 case 'Kundli Matching':
	case 'Love Compatibility':
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') 
			this.router.navigate(['/marriage-horo'], {state :  item.title as any});
		else if(this.plan.name == 'com.mypubz.eportal.month'|| this.plan.name == 'com.mypubz.eportal.year' || this.plan.credits > 0) {
			if(this.ticks > 60) {
				this.ticks = 0;
				let adu: string = this.adUnit(item.title);
			//admob.setDevMode(true);
				admob.interstitial.load({
				id: {
			  // replace with your ad unit IDs
				android: adu,
				ios: adu,
				},
				}).then(() => {
				//admob.interstitial.show())		
					this.shareService.setADV(true);
				})
			}				
			this.router.navigate(['/marriage-horo'], {state : item.title as any});
		} else if(this.shareService.getREWARD()) {
		    admob.rewardVideo.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5788035885',
			  ios: 'ca-app-pub-8442845715303800/5788035885',
			  },
		    }).then(() => admob.rewardVideo.show())			
		} else
			this.router.navigate(['/subscribe'], {state : item.title as any});
		break;
	 case 'Vedic Stories':
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') 
			this.router.navigate(['/stories'], {state : item.title as any});
		else {
			if(this.ticks > 60) {
				this.ticks = 0;
				let adu: string = this.adUnit(item.title);
			//admob.setDevMode(true);
				admob.interstitial.load({
				id: {
			  // replace with your ad unit IDs
				android: adu,
				ios: adu,
				},
				}).then(() => {
				//admob.interstitial.show())		
					this.shareService.setADV(true);
				})
			}				
			this.router.navigate(['/stories'], {state : item.title as any});
		}			
		break;
	case 'Write an Article':
	   this.article();
	   break;
	 case 'Talk to Astrologer':
	    this.router.navigate(['/astrologers'], {state : item.title as any});
		break;
	case 'Hindu Calendar':
	    this.router.navigate(['/hindu-cal']);
		break;
	case 'Birth Time Rectification':
		this.btr();
		break;
	case 'Games':
	    this.openUrl();
		break;
	case 'Personalized Report':
	    this.router.navigate(['/report']);
	   break;
	 default:
		break;
    }
   }
   yogs() {
	    this.router.navigate(['/personal-details'], {state : 'Yogas In Your Horoscope' as any});
   }
   trans() {
	    this.router.navigate(['/personal-details'], {state : 'Transit Predictions' as any});
   }
   daily() {
	    if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.month' || this.plan.name == 'com.mypubz.eportal.year') {
			if(this.shareService.getMoonSign() == '') {
				this.router.navigate(['/profile'], {state : 'home' as any});
			} else {
				this.router.navigate(['/daily-forecast'], {state : this.dho});
			}
		} else if(this.shareService.getREWARD()) {
		    admob.rewardVideo.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/5788035885',
			  ios: 'ca-app-pub-8442845715303800/5788035885',
			  },
		    }).then(() => admob.rewardVideo.show())			
		} else {
			if(this.ticks > 60) {
				this.ticks = 0;
				let adu: string = this.adUnit('Daily Horoscope');
			//admob.setDevMode(true);
				admob.interstitial.load({
				id: {
			  // replace with your ad unit IDs
				android: adu,
				ios: adu,
				},
			 }).then(() => {
				this.shareService.setADV(true);
				//admob.interstitial.show()
			})	
		  }			
			this.router.navigate(['/daily-forecast'], {state : this.dho});
		}		
   }
   adUnit(choice: string)
   {
	   let adu: string = 'ca-app-pub-8442845715303800/9358299242';
	   switch(choice)
	   {
		 case 'Birth Chart':
		 case 'Birth Chart Analysis':
			adu = 'ca-app-pub-8442845715303800/9358299242';
			break;
		 case 'KP Astrology':
			adu = 'ca-app-pub-8442845715303800/7470502506';
			break;
		 case 'Predictions':
			adu = 'ca-app-pub-8442845715303800/8031293215';
			break;
		 case 'Yogas In Your Horoscope':
			adu = 'ca-app-pub-8442845715303800/6353921799';
			break;
		 case 'Career Horoscope':
			adu = 'ca-app-pub-8442845715303800/2090107688';
			break;
		 case 'Money Horoscope':
			adu = 'ca-app-pub-8442845715303800/8867601157';
			break;
		 case 'Personalized Calendar':
			adu = 'ca-app-pub-8442845715303800/3342144443';
			break;
		 case 'Divisional Charts':
			adu = 'ca-app-pub-8442845715303800/2339277287';
			break;
		 case 'Daily Horoscope':
			adu = 'ca-app-pub-8442845715303800/2778966539';
			break;
		 case 'Prashna Jyotish':
			adu = 'ca-app-pub-8442845715303800/6131959316';
			break;
		 case 'Kundli Matching':
		case 'Love Compatibility':
			adu = 'ca-app-pub-8442845715303800/2040599938';
			break;
		 case 'Vedic Stories':
		    adu = 'ca-app-pub-8442845715303800/8208869109';
			break;
		 default:
			break;
	   }
	   return adu;
   }
  viewPanchang()
  {
	  console.log('viewPanchang');
	    if(this.plan.name != 'com.mypubz.eportal.astrologer' && this.plan.name != 'com.mypubz.eportal.adfree' && this.plan.name != 'com.mypubz.eportal.month' && this.plan.name != 'com.mypubz.eportal.year') {
			//admob.setDevMode(true);
			this.choice = 'Panch';
		    admob.interstitial.load({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/4044525017',
			  ios: 'ca-app-pub-8442845715303800/4044525017',
			  },
		    }).then(() => {
				//admob.interstitial.show())
				this.shareService.setADV(true);
			})
		} 		
	  this.router.navigate(['/panchang'], {state : 'panchang' as any});
	//this.navCtrl.push(PanchangPage);
  }
  switchLanguage() {
    this.translate.use(this.lang);
	console.log(this.lang);
	this.shareService.setLANG(this.lang);
  }
  advt()
  {
//	 if(this.adv.tag == 'blogad')  
	//	this.navCtrl.push(PublishBlogPage, {item: 'PublishBlogPage'});
  }
  calcStar(mins: number)
  {
		//console.log('calcStar', mins);
		if(!this.sublords_v || !mins || isNaN(mins)) {
			console.log('calcStar: Invalid input', mins);
			return '-1';
		}
		
		for(var i = 0; i < Object.keys(this.sublords_v).length; i++)
		{
			var nak = this.sublords_v[i];
			if(!nak || !nak.deg) continue;
			
			var degs = nak.deg;
			try {
				var s_mins = this.dmsToDec(Number(degs.split('-')[0].split('.')[0]), Number(degs.split('-')[0].split('.')[1]), Number(degs.split('-')[0].split('.')[2]));
				var e_mins = this.dmsToDec(Number(degs.split('-')[1].split('.')[0]), Number(degs.split('-')[1].split('.')[1]), Number(degs.split('-')[1].split('.')[2]));
				
				if(mins >= s_mins && mins < e_mins) {
					return nak.sign + '|' + nak.star + '|' + nak.sub;
				}
			} catch(error) {
				console.log('calcStar: Error processing nakshatra', i, error);
				continue;
			}
		}
		console.log('calcStar: No matching nakshatra found for', mins);
		return '-1';
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
	dmsToDec(d, m, s)
    {
       let v: number = d + (m /60) + (s /3600);
       return Number(v.toFixed(2));
    }
  subscribe() {
	  this.router.navigate(['/subscribe']);
  }
  openUrl() {
	}
	article() {
		this.router.navigate(['/publish-blog']);
	}
	dhoro() {
		this.router.navigate(['/daily-forecast'], {state : this.dho});
	}
	rightmenu() {
		this.menu.open('second');
	}
	btr() {
		this.router.navigate(['/btr'], {state: null});
	}
	puj() {
		this.router.navigate(['/pujalist'], {state: null});
	}
	msgok() {
		this.amsg = '';
	}
	hmsgok() {
		this.hmsg = '';
	}
	tmsgok() {
		this.tmsg = '';
	}
	tmore()
	{
		let db = this.shareService.getPDOB()
		this.binf.dob = db.split('L')[0].trim();
		this.binf.dob_short = db.split('L')[0].trim();
		this.binf.dstofset = (db.indexOf('$') > -1) ? Number(db.split('$')[1].split('@')[0].trim()) : -1;
		this.binf.lat = db.split('@')[0].split('L')[1].split(',')[0].trim();
		this.binf.lng = db.split('@')[0].split('L')[1].split(',')[1].split('$')[0].trim();
		this.binf.timezone = (db.indexOf('$') > -1) ? db.split('@')[1].split('$')[0].split('#')[0] : db.split('@')[1].split('#')[0];
	    this.router.navigate(['/kp-event'], {state: this.binf});
	}	
    tk2ast() {
	    this.router.navigate(['/astrologers'], {state : 'Talk To Astrologer' as any});
	}
	nakdtl() {
	 this.router.navigate(['/nak-info'], {state : this.nak_en.split(' ')[0] as any});
   }
	sub() {
	 this.router.navigate(['/subscribe']);
   }
   skip() {
	   this.aumsg = '';
   }
   update() {
      if (this.platform.is('android')) {
      // Use your app identifier for android.
      this.market.open('com.mypubz.eportal');
    } else {
      // Use the id found in the URL of the ios app store listing.
      this.market.open('id123456789');
    }
 }
showAlert() {

    this.alertController.create({
      header: 'Location Error',
      subHeader: 'Location Not Found',
      message: 'This App requires your current location for Panchang & many other features to work. Please enable location from App settings & try again',
      buttons: [
        {
          text: 'Try Again!',
          handler: () => {
            console.log('I Location Error');
			window.location.assign('/');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
}
