import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Platform, MenuController } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { File } from '@ionic-native/file/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService} from '@ngx-translate/core';
import { ShareService } from './share.service';
import { HoroscopeService } from './horoscope.service';
import { Ticket } from './ticket';
import { Plan } from './plan';
import { BirthInfo } from './birth-info';

declare var admob;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements AfterViewInit {
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
  btran: boolean = false;
  rasSu: string = '';rasMo: string = '';rasMe: string = '';rasVe: string = '';rasMa: string = '';rasJu: string = '';rasSa: string = '';rasRa: string = '';rasKe: string = '';
  posSu: string = '';posMo: string = '';posMe: string = '';posVe: string = '';posMa: string = '';posJu: string = '';posSa: string = '';posRa: string = '';posKe: string = '';
  indsSu: string = '';indsMo: string = '';indsMe: string = '';indsVe: string = '';indsMa: string = '';indsJu: string = '';indsSa: string = '';indsRa: string = '';indsKe: string = '';
  smsgSu: string = '';smsgMo: string = '';smsgMe: string = '';smsgVe: string = '';smsgMa: string = '';smsgJu: string = '';smsgSa: string = '';smsgRa: string = '';smsgKe: string = '';
  pred: string = 'Mo';
  predn: string = 'Moon';
  dstofset: number = -1;
  latlng: string = '';
  info: string = '';
  constructor(
	private router: Router,
	private renderer: Renderer2,
    private platform: Platform,
    public menu: MenuController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
	private translate: TranslateService,
	public shareService: ShareService,
	public horoService: HoroscopeService,
	public device: Device,
	private file: File
  ) {
    this.backmode = false;
	translate.setDefaultLang('en');
    this.initializeApp();
    // set our app's pages
    this.pages = [
      { title: 'Reports', component: '/reports', icon: 'book-outline', spin: false },
      { title: 'Subscribe', component: '/subscribe', icon: 'apps-outline', spin: false },
	  { title: 'Notifications', component: '/notifications', icon: 'notifications-outline', spin: false },
      { title: 'Panchangam', component: '/panchang', icon: 'time-outline', spin: false},
      { title: 'Hindu Calendar', component: '/hindu-cal', icon: 'calendar-outline', spin: false},
      { title: 'Available Credits', component: '/credits', icon: 'cash-outline', spin: false },
	  { title: 'Help Desk', component: '/help-desk', icon: 'help-circle', spin: false},
	  { title: 'Privacy Policy', component: '/privacy', icon: 'lock-closed-outline', spin: false },
      { title: 'Vedic Stories', component: '/stories', icon: 'leaf-outline', spin: false },
      { title: 'Publish Story', component: '/publish-blog', icon: 'videocam-outline', spin: false },
      { title: 'Settings', component: '/chart-settings', icon: 'settings-outline', spin: false },
	  { title: 'About App', component: '/about-app', icon: 'logo-android', spin: false}
    ];
  }

  initializeApp() {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
	  console.log(this.device.uuid);
	  this.horoService.login(this.device.uuid)
	    .subscribe(lres => {
		if(lres['status'] == 'X') this.router.navigate(['/profile'], {replaceUrl: true});
		else if(lres['status'] != 'E') {
		 this.shareService.setToken(lres['token']);
		 this.horoService.isAdmin(this.device.uuid)
			.subscribe(res => {
				if(res['uuid'] == this.device.uuid) {
					this.pages.push({ title: 'View Orders', component: '/orders', icon: 'basket', spin: false});
				}
			}, (err) => {
			});	  
	//this.file.readAsText(this.file.dataDirectory, 'vedicperfs.json').then(res => {
		//console.log('vedicperfs', res);
	    //var jsonv = JSON.parse(res);
		//this.shareService.setCCODE(jsonv['ccode']);
	//}, (err) => {
			//this.info = JSON.stringify(err);
	  //});
	this.shareService.getPRED().then( pred => {
		if(pred) {
			this.pred = pred;
			if(this.pred == 'Su')
				this.predn = 'Sun';
			else if(this.pred == 'Mo')
				this.predn = 'Moon';
			else
			     this.predn = 'Asc';
		}
	});
	this.horoService.getProfile(this.device.uuid)
			.subscribe(res => {
				if(res['uuid'] == this.device.uuid) {
					let dob: string = '';
					let tob: string = '';
					let tz: string = '';
					this.avatar = res['avatar'];
				   let db: string = res['dob'].replace('$NaN$0$0','').replace('$NaN','');
				   console.log('db', db);
				   if(db.indexOf('L') > -1) {
						this.dstofset = (db.indexOf('$') > -1) ? Number(db.split('$')[1].split('@')[0]) : -1;
						let dtm: string = db.split('L')[0].trim();
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
				  }
				if(this.pred == 'Mo') {
					this.shareService.getMSGN().then( msgn => {
						this.fetchTran(msgn);
					});
				  }
				else if(this.pred == 'Su') {
					this.shareService.getSSGN().then( ssgn => {
						this.fetchTran(ssgn);
					});
				  }
				else if(this.pred == 'AC') {
					this.shareService.getASGN().then( asgn => {
						this.fetchTran(asgn);
					});
				  }
				}
			}, (err) => {
			});
			
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
		 
	 });
	 this.shareService.getPLAN()
		.then(pln => {
		console.log('pln', pln);
		 if(pln) {
			 this.shareService.sigPLAN(pln);
			 if(pln.uuid == '') {
				 
			 } else {
					  this.plan = pln;
						if(pln.name == 'com.mypubz.eportal.astrologer' || pln.name == 'com.mypubz.eportal.adfree' || pln.name == 'com.mypubz.eportal.year' || pln.name == 'com.mypubz.eportal.month') {
							this.pages[5].title = 'Available Credits(UNL)';
							this.showAD = false;
							if(pln.name == 'com.mypubz.eportal.astrologer') {
								this.horoService.getAstrologer(this.device.uuid)
								.subscribe(res => {
									if(res['status'] == 'A') {
										this.bAST = true;
										this.status = true;
										this.statuslbl = "<span class='green'>Available</span>";
									} else if(res['status'] == 'NA'){
										this.bAST = true;
										this.status = false;
										this.statuslbl = "<span class='red'>Not Available</span>";
									}
								}, (err) => {
								});	  
							}
					 } else {
						this.pages[5].title = 'Available Credits(' + pln.credits.toString() + ')';
						if(pln.credits > 0) {
						} else {
							//this.router.navigate(['/subscribe'], {replaceUrl: true});
						}
					 } 
			 }
		 } else {
			  this.horoService.getPlan(this.device.uuid)
				   .subscribe(res => {
						console.log('Fetched the plan details from App component');
						let pn: Plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'] };
						this.bpln = true;
						this.shareService.setPLAN(pn);
							if(pn.name == 'com.mypubz.eportal.astrologer') {
								this.horoService.getAstrologer(this.device.uuid)
								.subscribe(res => {
									if(res['status'] == 'A') {
										this.bAST = true;
										this.status = true;
										this.statuslbl = "<span class='green'>Available</span>";
									} else if(res['status'] == 'NA'){
										this.bAST = true;
										this.status = false;
										this.statuslbl = "<span class='red'>Not Available</span>";
									}
								}, (err) => {
								});	
					}
			});
		 }
	 });
	}
	});
  });
  }
  fetchTran(msgn) {
				  if(msgn != null && msgn.trim() != '') {
						let ayanid: number = (this.shareService.getAYNM()) ? Number(this.shareService.getAYNM()) : 4;
						var cd = new Date();
						this.info = 'Updating...';
						this.horoService.getDailyTrans(cd.getFullYear() + '-' + (cd.getMonth()+1).toString() + '-' + cd.getDate() + 'T' + cd.getHours() + ':' + cd.getMinutes()+ ':' + cd.getSeconds()+'Z', this.latlng.replace(',','|'), Intl.DateTimeFormat().resolvedOptions().timeZone, msgn, (this.dstofset == -1) ?  0:this.dstofset, ayanid)
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
			this['ras'+trns[i].code] = trns[i].rashi;
            this['pos'+trns[i].code] = trns[i].dmspos;
            this['inds'+trns[i].code] = trns[i].inds;
            this['smsg'+trns[i].code] = trns[i].inds.substring(0,50);
	    }
		this.btran = true;
}
  ngAfterViewInit() {
	  console.log('App:AfterViewInit');
   this.platform.ready().then(() => {
					 setTimeout(() => {
						this.splashScreen.hide();
					  }, 1000);				 
				this.router.navigate(['/home'], {replaceUrl: true});
	this.lstnr = this.renderer.listen('document', 'admob.interstitial.close', (event) => {
		 this.choice.spin = false;
		 console.log('close event triggered');
	  // handle event
	 })	
   });
  }
  openPage(page) {
	  this.choice = page;
	  if(page.title.indexOf('Available Credits') == -1)
		this.brow(page);
  }
  brow(page)
  {
	  console.log('Page', page);
	if(page.title == 'Hindu Calendar') {
			this.menu.close();
			this.router.navigate([page.component]);
	} else {
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
    if (this.lstnr) {
      this.lstnr();
    }
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
	       this.shareService.setPREDS(this.pred);
			let binf: BirthInfo = { dob: '', dob_short: '', lat: '', lng: '', timezone: '', dstofset: 0, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:'',gender:'',ref:'0', fetch: false, show: true, genrep: false, ppos: null, retro: '', plstr: '', hpos: null, vims: null, sdb: null, akv: null, dohs: null};
			this.router.navigate(['/chart-settings'], {state: binf});
	   
   }
}
