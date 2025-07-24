import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, Renderer2  } from '@angular/core';
import { App } from '@capacitor/app';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Platform, MenuController, AlertController } from '@ionic/angular';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Plugins } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar, Style } from '@capacitor/status-bar';
import { TranslateService} from '@ngx-translate/core';
import { ShareService } from './share.service';
import { HoroscopeService } from './horoscope.service';
//import { CallService } from './call.service';
import { Ticket } from './ticket';
import { Plan } from './plan';
import { BirthInfo } from './birth-info';
import { Dasha } from './dasha';
import { User } from './user';
import { Caller } from './caller';
import { environment } from '../environments/environment';

//declare var navigator: any;
declare var admob;
const timer = ms => new Promise(res => setTimeout(res, ms));
StatusBar.setOverlaysWebView({ overlay: true });
SplashScreen.show({
	autoHide: false,
  });
 
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  @ViewChild('vhoring', {static: true}) vhoRing;
  private peerId: string;  
  lstnr: () => void;
  backmode: boolean = false;
  pages: Array<{title: string, component: string, icon: string, spin: boolean}>;
  avatar: string = 'https://i.imgur.com/LR7e1vw.png';
  choice: any;
  showAD: boolean = true;
  adshow: boolean = false;
  plan: Plan;
  bpln: boolean = false;
  status: boolean = false;
  statuslbl: string = 'Not Available';
  bAST: boolean = false;
  notif: boolean = false;
  ticket: Ticket;
  dtrans: any;
  smor: string = '..Read more';
  bless: boolean = true;
  btran: boolean = true;
  rasSu: string = '';rasMo: string = '';rasMe: string = '';rasVe: string = '';rasMa: string = '';rasJu: string = '';rasSa: string = '';rasRa: string = '';rasKe: string = '';
  posSu: string = '';posMo: string = '';posMe: string = '';posVe: string = '';posMa: string = '';posJu: string = '';posSa: string = '';posRa: string = '';posKe: string = '';
  indsSu: string = '';indsMo: string = '';indsMe: string = '';indsVe: string = '';indsMa: string = '';indsJu: string = '';indsSa: string = '';indsRa: string = '';indsKe: string = '';
  smsgSu: string = '';smsgMo: string = '';smsgMe: string = '';smsgVe: string = '';smsgMa: string = '';smsgJu: string = '';smsgSa: string = '';smsgRa: string = '';smsgKe: string = '';
  pred: string = 'Mo';
  predn: string = 'Moon';
  dstofset: number = -1;
  latlng: string = '';
  info: string = '';
  showVIM: boolean = false;
  vims: string = '';
  oDas: Dasha[] = [];
  objectKeys = Object.keys;
  ringing: boolean = false;
  vring: any;
  rngdely: number = 1000;
  showAstroCall = false;
	callEnded: any;
	callEndedEvent: any;
   constructor(
   public alertController: AlertController,
   //private callService: CallService,
   private router: Router,
	private renderer: Renderer2,
    private platform: Platform,
    public menu: MenuController,  
	private translate: TranslateService,
	public shareService: ShareService,
	public horoService: HoroscopeService,
	public device: Device,
	private file: File
  ) {
	App.addListener('appUrlOpen', (data) => {
		console.log('App opened with URL:', data.url);
  
		// Extract information from the URL and handle the OAuth callback
		if (data.url.includes('myapp://auth/callback')) {
		  // Handle OAuth callback logic
		  // Extract parameters, validate, and complete the OAuth flow
		}
	  });
	//navigator.notification.activityStart('Loading...');
	//navigator.notification.activityStop();
    this.backmode = false;
	translate.setDefaultLang('en');
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Panchangam', component: '/panchang', icon: 'time-outline', spin: false},
      { title: 'Hindu Calendar', component: '/hindu-cal', icon: 'calendar-outline', spin: false},
	  { title: 'Help Desk', component: '/help-desk', icon: 'help-circle', spin: false},
	  { title: 'Privacy Policy', component: '/privacy', icon: 'lock-closed-outline', spin: false },
      { title: 'Settings', component: '/chart-settings', icon: 'settings-outline', spin: false },
      { title: 'Memories', component: '/memories', icon: 'heart', spin: false },
	  { title: 'Sign Out', component: '/sign-in', icon: 'log-out', spin: false},
	  { title: 'Exit App', component: '/exit-app', icon: 'exit', spin: false}
    ];
  }
   ngOnInit() {
    this.loadGoogleMapsScript();
  }

  loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.MAPS_API_KEY}&libraries=places`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);
  }
  onCallEnded(cEnd: any) {
	this.showAstroCall = false;
  }  
  async ring() {
 	if(this.ringing) {
		await timer(this.rngdely);
		this.rngdely = (this.rngdely == 1000 ) ? 2000 : 1000;
		console.log('vring: playing');
		this.vring.currentTime = 0;
		this.vring.play();
	}
 }
  async initializeApp() {
    this.platform.ready().then(() => {
	  console.log('platform ready');
	  try {
		console.log('trySilentLogin');
		FirebaseAuthentication.getCurrentUser().then((c) => {
			if (c != null) {
				FirebaseAuthentication.getIdToken().then((res) =>{
					this.shareService.setToken(res.token);
				})
				this.horoService.updateProfile(this.device.uuid, c.user.email).subscribe((res) => {});
					this.avatar = c.user.photoUrl;
				console.log("User is already signed in");
			  		this.horoService.getBalance(c.user.email).subscribe((res) => {
				 		this.info = '';
            			let user: User = {
						name: c.user.displayName,
						email: c.user.email,
						imageUrl: c.user.photoUrl,
						balance: res['balance'],
						ccy: (res['currency_code'].length > 3) ? '' : res['currency_code'],
						peerid: '',
						dob: '',
						isprivate: true
						};
						this.shareService.setItem('user', user);
						this.shareService.getPLAN().then((pln) => {
							this.shareService.getLANGU().then((lang) => {
							this.shareService.getUPRO().then( prf => {
							this.shareService.getMSGN().then((msgn) => {
								console.log('pln', pln);
								console.log('lang', lang);
								console.log('prf', prf);
								console.log('msgn', msgn);				
								if(lang)  this.translate.use(lang);
									if(prf) {
										this.getProfile(prf);
									} else {
										this.horoService.getProfile(this.device.uuid)
										.subscribe(res => {
											this.shareService.setUPRO(res);
											this.getProfile(res);
										});
									}
									if(pln) {
										console.log('calling sigPLAN');
										this.shareService.sigPLAN(pln);
										this.isAdmin(pln);
									} else {
										console.log('getting PLAN..');
										this.horoService.getPlan(this.device.uuid).subscribe(res => {
											let pn: Plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'], rating: res['rating'] };
											console.log('setPLAN');
											this.shareService.setPLAN(pn);
											this.isAdmin(pn);
										});
									}
									 setTimeout(() => {
										SplashScreen.hide();
									  }, 1000);				
									   if(msgn) this.router.navigate(['/tabs'], {replaceUrl: true});
									   else this.router.navigate(['/profile'], {replaceUrl: true});
							})			
							.catch(e => {
								console.log(e);
									 setTimeout(() => {
										SplashScreen.hide();
									  }, 1000);				
									  this.horoService.addTicket(this.device.uuid, 'technical', 'ERROR1', JSON.stringify(e))
									  .subscribe(res => {
									  });		
										  this.router.navigate(['/profile'], {replaceUrl: true});
							 });
							})			
							.catch(e => {
								console.log(e);
									 setTimeout(() => {
										SplashScreen.hide();
									  }, 1000);				
									  this.horoService.addTicket(this.device.uuid, 'technical', 'ERROR2', JSON.stringify(e))
									  .subscribe(res => {
									  });		
										  this.router.navigate(['/profile'], {replaceUrl: true});
							}); 
							})
							.catch(e => {
								console.log(e);
									 setTimeout(() => {
										SplashScreen.hide();
									  }, 1000);		
								this.shareService.setLANG('en');
								this.translate.use('en');
								this.router.navigate(['/profile'], {replaceUrl: true});	
							}); 
							})
							.catch(e => {
								console.log(e);
								this.horoService.getPlan(this.device.uuid).subscribe(res => {
									let pn: Plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'], rating: res['rating'] };
									console.log('setPLAN');
									this.shareService.setPLAN(pn);
									this.shareService.setLANG('en');
									  this.translate.use('en');
									  this.isAdmin(pn);
									 setTimeout(() => {
										SplashScreen.hide();
									  }, 1000);				
									  this.horoService.addTicket(this.device.uuid, 'technical', 'GetPlan-ERROR', JSON.stringify(e))
									  .subscribe(res => {
									  });		
									 this.router.navigate(['/profile'], {replaceUrl: true});
								});
							});

						  this.shareService.getUPRO().then(prf => {
							this.shareService.getVIMS(prf['dob'].split('L')[0].trim()).then( vres => {
								 console.log('getVIMS', vres);
										this.vims = 'VIMSOTTARA DASHA';
										this.oDas = [];
										for(let key of Object.keys(vres)) {
											let das : Dasha = {
												lord: vres[key].lord,
												per: vres[key].per,
												type: vres[key].type,
												style: vres[key].style,
												subs: vres[key].subs,
												show: vres[key].show,
												icon: vres[key].icon
											};
											this.oDas.push(das);
										}
								this.showVIM = true;
							})
							.catch(e => {
								console.log(e);
							});
						})
						.catch(e => {
							console.log(e);
						});
		
			 		}, (err) => {
						console.log(err);
					    this.info = JSON.stringify(err);
				    })
			 }
			 else {
				this.horoService.addTicket(this.device.uuid, 'technical', 'ERROR', 'Authenticator not given us user obj')
				.subscribe(res => {
				});		
				setTimeout(() => {
					SplashScreen.hide();
				  }, 1000);
				this.alertController.create({
					header: 'Authenticator Issue',
					subHeader: 'Authenticator may not be working properly',
					message: 'This is unpleasent, it looks like our authentication provider has some issues on your device, we have recorded this event, please report the error to info@vedichoroo.com, we should be able to help you with this problem.',
					buttons: [
					  {
						text: 'EXIT',
						handler: () => {
						  console.log('Authenticator Error');
						  navigator['app'].exitApp();
						}
					  }
					]
				  }).then(res => {
					res.present();
				  });

			 }
			})
			.catch(error => {
				console.log('getCurrentUser: Exception', error);
				  console.log('getCurrentUser Exception: routing to sign-in page from login');
				  setTimeout(() => {
					  SplashScreen.hide();
					}, 1000);				
				  this.router.navigate(['/sign-in'], {replaceUrl: true});
			});
		}
		catch(e){
			console.log(e);
			this.horoService.addTicket(this.device.uuid, 'technical', 'ERROR', JSON.stringify(e))
			.subscribe(res => {
			});		
		  this.alertController.create({
			header: 'Application Error',
			subHeader: 'Internal Application Error',
			message: 'Unexpected application error has occurred, please close the app and try again, if this repeats please report the issue to info@vedichoroo.com, we have recorded this event for further analysis',
			buttons: [
			  {
				text: 'CLOSE',
				handler: () => {
				  console.log('Authenticator Error');
				  navigator['app'].exitApp();
				}
			  }
			]
		  }).then(res => {
			res.present();
		  });
        }
		this.shareService.pred.subscribe(prd => {
		       console.log('pred', prd);
				if(prd == 'Mo') {
					this.predn = 'Moon';
					this.shareService.getMSGN().then( msgn => {
						this.fetchTran(msgn);
					});
				  }
				else if(prd == 'Su') {
					this.predn = 'Sun';
					this.shareService.getSSGN().then( ssgn => {
						this.fetchTran(ssgn);
					});
				  }
				else if(prd == 'AC') {
					this.predn = 'Asc';
					this.shareService.getASGN().then( asgn => {
						this.fetchTran(asgn);
					});
				  }
				else if(prd == 'VIMS') {
					this.shareService.getVIMS(this.shareService.getPDOB().split('L')[0].trim()).then( vres => {
						 console.log('getVIMS', vres);
								this.vims = 'VIMSOTTARA DASHA';
								this.oDas = [];
								for(let key of Object.keys(vres)) {
									let das : Dasha = {
										lord: vres[key].lord,
										per: vres[key].per,
										type: vres[key].type,
										style: vres[key].style,
										subs: vres[key].subs,
										show: vres[key].show,
										icon: vres[key].icon
									};
									this.oDas.push(das);
								}
						this.showVIM = true;
					})
					.catch(e => {
						console.log(e);
					});
				}
		});
		this.shareService.prof.subscribe(vres => {
								this.oDas = [];
								for(let key of Object.keys(vres)) {
									let das : Dasha = {
										lord: vres[key].lord,
										per: vres[key].per,
										type: vres[key].type,
										style: vres[key].style,
										subs: vres[key].subs,
										show: vres[key].show,
										icon: vres[key].icon
									};
									this.oDas.push(das);
								}
		});
		console.log('logging in to the app..');
   }, (err) => {
	  console.log(err);
	  this.horoService.addTicket(this.device.uuid, 'technical', 'FATAL2:' + JSON.stringify(err), '')
	  .subscribe(res => {
	  });		
   });
  }
  async getUserProfile(accessToken: string) {
	try {
	  const profileResult = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
		headers: {
		  Authorization: `Bearer ${accessToken}`,
		},
	  });
  
	  if (profileResult.ok) {
		const userProfile = await profileResult.json();
		console.log('User Profile:', userProfile);
		return userProfile;
		// Perform further actions with the user profile
	  } else {
		console.error('Failed to fetch user profile:', profileResult.statusText);
		// Handle the error
		throw 'not fould';
	  }
	} catch (error) {
	  console.error('Error fetching user profile:', error);
	  throw error;
	  // Handle the error
	}
  }
  close() {
	if(this.shareService.isAST()) {
		this.horoService.setAstStatus(this.device.uuid, "NA")
		.subscribe(stat => {
		});
	}
	if (this.lstnr) {
      this.lstnr();
    }
    this.shareService.complete();
	navigator['app'].exitApp();
  }
  signOut() {
    FirebaseAuthentication.signOut().then(() => {
      // User is signed out
	  this.router.navigate(['/sign-in'], {replaceUrl: true});
    });
  }  
  getProfile(res) {
		if(res['uuid'] == this.device.uuid) {
				   let dob: string = '';
				   let tob: string = '';
  				   let tz: string = '';
				   let db: string = res['dob'].replace('$NaN$0$0','').replace('$NaN','');
				   console.log('db', db);
				  this.shareService.setPDOB(db);
				   if(db.indexOf('L') > -1) {
					   if(isNaN(Number(db.split('$')[1].split('@')[0].trim()))) {
					   }
						this.dstofset = (db.indexOf('$') > -1) ? Number(db.split('$')[1].split('@')[0].trim()) : -1;
						let dtm: string = db.split('L')[0].trim();
						console.log('getVIMS', dtm);
						dob = dtm.split('T')[0];
						console.log('dob', dob);
						if(dtm.indexOf('T') > -1)
							tob = dtm.split('T')[1];
						console.log('tob', tob);
						if(db.indexOf('@') > -1) {
							this.latlng = (db.indexOf('$') > -1) ? db.split('L')[1].split('$')[0] : db.split('L')[1].split('@')[0];
						let tng: string = db.split('@')[1];
						if(tng.indexOf('#') > -1) tz = tng.split('#')[0];
						else tz = tng;
					} else if(db.indexOf('#') > -1) {
						this.latlng = (db.indexOf('$') > -1) ? db.split('L')[1].split('$')[0] : db.split('L')[1].split('#')[0];
					} else {
						this.latlng = (db.indexOf('$') > -1) ? db.split('L')[1].split('$')[0] : db.split('L')[1];
					}
					console.log('latlng', this.latlng);
			  }
		}
  }
 isAdmin(pln) {
		 this.horoService.isAdmin(this.device.uuid)
			.subscribe(res => {
				if(res['uuid'] == this.device.uuid) {
					this.pages.push({ title: 'View Orders', component: '/orders', icon: 'basket', spin: false});
					this.pages.push({ title: 'View Tickets', component: '/tickets', icon: 'mail-unread-outline', spin: false});
				}
			}, (err) => {
			});	  
			if(pln.name == 'com.mypubz.eportal.astrologer' || pln.name == 'com.mypubz.eportal.adfree' || pln.name == 'com.mypubz.eportal.year') {
							this.pages[4].title = 'Available Credits(UNL)';
							this.showAD = false;
							if(pln.name == 'com.mypubz.eportal.astrologer') {
							}
				} else {
					this.pages[4].title = 'Available Credits(' + pln.credits.toString() + ')';
						if(pln.credits > 0) {
					} else {
					}
				} 
   }
  fetchTran(msgn) {
	if(msgn != null && msgn.trim() != '') {
		let ayanid: number = 4;
		var cd = new Date();
		this.info = 'Calculating Transit & Predictions for ' + msgn;
		console.log('getting DailyTrans..');
		this.horoService.getDailyTrans(cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes()+ ':' + cd.getSeconds()+'Z', this.shareService.getCLAT().toString() + '|'+ this.shareService.getCLNG().toString(), Intl.DateTimeFormat().resolvedOptions().timeZone, msgn, (this.dstofset == -1) ?  0:this.dstofset, ayanid)
		.subscribe(trns => {
		   this.info = '';
		   console.log('trns', trns);
			   this.publishTrans(trns);
		}, (err) => {
			console.log(err);
			this.info = JSON.stringify(err);
		});
	}
  }
 publishTrans(trns: any)
 {
 		for(var i = 0; i < trns.length; i++) {
			console.log(trns[i].code, trns[i].dmspos);
			console.log(trns[i].inds);
			this['ras'+trns[i].code] = 'assets/imgs/' + trns[i].rashi.toLowerCase()+'.png';
            this['pos'+trns[i].code] = trns[i].dmspos;
            this['inds'+trns[i].code] = trns[i].inds;
            this['smsg'+trns[i].code] = trns[i].inds.substring(0,50);
	    }
		this.btran = true;
}
  ngAfterViewInit() {
	  console.log('App:AfterViewInit');
   this.platform.ready().then(() => {
	this.lstnr = this.renderer.listen('document', 'admob.interstitial.close', (event) => {
		 this.choice.spin = false;
		 console.log('close event triggered');
	 })	
   });
  }
  openPage(page) {
	  this.choice = page;
		this.brow(page);
  }
  brow(page)
  {
	  console.log('Page', page);
	if(page.title == 'Hindu Calendar') {
			this.menu.close();
			this.router.navigate([page.component]);
	} else if(page.title == 'Exit App') { 
		this.close();
	} else if(page.title == 'Sign Out') { 
		this.signOut();
	} 
	else {
			this.menu.close();
			let binf: any = {};
			binf.ref = 4;
			if(page.title == 'Settings') this.router.navigate([page.component], {state: binf});
			else this.router.navigate([page.component]);
	}
  }
  profile() {
	  this.menu.close();
	  this.router.navigate(['/profile']);
  }
  chgstatus() {
	this.statuslbl = (this.status == true) ? 'Available' : 'Not Available'; 
    this.horoService.setAstStatus(this.device.uuid, (this.status == true) ? 'A' : 'NA')
   .subscribe(res => {
   }, (err) => {
   });
  }
   ngOnDestroy() {
   console.log('received ngAppDestroy');
	if(this.shareService.isAST()) {
		this.horoService.setAstStatus(this.device.uuid, "NA")
		.subscribe(stat => {
		});
	}
	if (this.lstnr) {
      this.lstnr();
    }
    this.shareService.complete();
}
   dtran(pl) {
	   this.bless = !this.bless;
	   if(this.bless) { 
			this['smsg'+ pl]= this['inds'+pl].substring(0,50); 
			this.smor = '..Read more';
	   } else {
		   this['smsg'+pl] = this['inds'+pl];
		   this.smor = '..Less';
	   }
   }
   chgpred() {
	       this.shareService.setPRED(this.pred);
	       this.shareService.sigPRED(this.pred);
			let binf: BirthInfo = { dob: '', dob_short: '', lat: '', lng: '', timezone: '', dstofset: 0, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:'',gender:'',ref:'0', fetch: false, show: true, genrep: false, ppos: null, retro: '', plstr: '', hpos: null, vims: null, sdb: null, akv: null, dohs: null};
			this.router.navigate(['/chart-settings'], {state: binf});
	   
   }
ontoggle(event, das)
 {
   console.log('ontoggle', das);
   event.stopPropagation();
   for(var i = 0; i < this.oDas.length; i++) {
     if(das.type == 'MDAS' && this.oDas[i].type == 'ADAS') {
		if(this.oDas[i].lord.split('-')[0].toLowerCase() == das.lord.toLowerCase()) (das.icon == 'add') ? this.oDas[i].show = true : this.oDas[i].show = false;
	 } else if(das.type == 'MDAS' && das.icon != 'add' && this.oDas[i].type == 'PDAS') {
			 if(this.oDas[i].lord.split('-')[0] == das.lord) this.oDas[i].show = false; 
	 } else if(das.type == 'ADAS' && this.oDas[i].type == 'PDAS') {
			 if(this.oDas[i].lord.split('-')[0].toLowerCase() + '-' + this.oDas[i].lord.split('-')[1].toLowerCase() == das.lord.split('-')[0].toLowerCase() + '-' + das.lord.split('-')[1].substring(0,2).toLowerCase()) (das.icon == 'add') ? this.oDas[i].show = true : this.oDas[i].show = false; 
	 }
   }
   (das.icon == 'add') ? das.icon = 'remove' : das.icon = 'add';
  }
  showAlert() {

    this.alertController.create({
      header: 'Call from users',
      subHeader: 'There is an incomming call from user',
      message: 'Please answer the call, after the call please request your user to leave feedback on your profile page. This will help increase your call volume',
      buttons: [
        {
          text: 'Answer!',
          handler: () => {
            console.log('Answer the call');
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }
 }
