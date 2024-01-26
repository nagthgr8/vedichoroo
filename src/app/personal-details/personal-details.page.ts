import { Component, OnInit, NgZone } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Platform } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { File } from '@awesome-cordova-plugins/file/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
//import { AdMob } from "ionic-admob";
import { Router, ActivatedRoute } from '@angular/router';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { InAppPurchase2, IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { DatePicker } from '@capacitor-community/date-picker';
import { Plan } from '../plan';
import { BirthInfo } from '../birth-info';
import { PlanetPos } from '../planet-pos';
declare let window: any; // <--- Declare it like this
declare var google; 
declare var RazorpayCheckout: any;
@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.page.html',
  styleUrls: ['./personal-details.page.scss'],
})
export class PersonalDetailsPage implements OnInit {
 objectKeys = Object.keys;
 oBirth :BirthInfo[] = [];
 service = new google.maps.places.AutocompleteService();
 public product: any = {
    name: 'My Product',
    apid: '1234',
    gpid: 'com.mypubz.eportal.dob'
  };
  day: number;
  mon: number;
  year: number;
  hou: number;
  min: number;
  sec: number;
  dstofset: number = 0;
  autocomplete;
  autocompleteItems;

   address;
   //personalDetailsForm: FormGroup;
   info: string = '';
   info2: string = '';
   horo: any;
   errorMessage: string;
   phone: string = '';
   source: any;
   plan: Plan;
   showSU: boolean;
   showCR: boolean;
   showASU: boolean;
   showYO: boolean;
   showDIV: boolean = false;
   showH: boolean = false;
   paym: string = 'rpay';
   dob: string = '';
   tob: string = '';
   place: string = '';
   latlng: string = '';
   nam: string='';
   gen: string = '';
   nwait: number = 0;
   showAD: boolean = false;
   advs: string = 'Advanced Settings';
   	chtyp: string = 'nind';
	aynm: string = '4';
	lang = 'en';
	ncdts: number = 0;
	showL: boolean = false;
	showP: boolean = true;
  constructor(private router: Router, private route: ActivatedRoute, private zone: NgZone, public shareService: ShareService, public horoService: HoroscopeService, public platform: Platform, public device: Device, private file: File, private fileOpener : FileOpener, private store: InAppPurchase2, private translate: TranslateService) {//, public admob: AdMob) {
  this.info2 = 'Please wait...';
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };

					this.showSU = false;
					this.showCR = false;
					this.showASU = false;
					this.showYO = false;
  }
   ngOnInit() {
	this.source = this.router.getCurrentNavigation().extras.state;
    this.platform.ready().then(() => {
	 this.lang = this.shareService.getLANG();
    console.log('personal-details ngOnInit called');	  
	this.info2 = "Getting your subscription details..";
    this.shareService.getPLAN().then((pln) => {
	    console.log('personal-details fetched plan', pln);
		if(pln) {
					//	this.horoService.addTicket(this.device.uuid, 'technical', 'plan-pd1',  pln.name)
					//	.subscribe(res => {
					//	});
		this.plan = pln;
		this.showHis();
	  }	 else {
			  this.horoService.getPlan(this.device.uuid)
				   .subscribe(res => {
						console.log('Fetched the plan details from Personal details');
						this.plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'], rating: res['rating'] };
						//this.horoService.addTicket(this.device.uuid, 'technical', 'plan-pd2',  this.plan.name)
						//.subscribe(res2 => {
						//});
						this.showHis();
						this.shareService.setPLAN(this.plan);
						
				   });
		}	
    }, (err) => {
					this.showSU = false;
					this.showCR = false;
					this.showASU = false;
				this.info2 = JSON.stringify(err);
			});
	var intv = setInterval(() =>  {
			if(this.nwait > 0) {	
			    this.info = 'please wait..' + this.nwait.toString();
				this.nwait--;
			}
	},1000);	
	if(this.shareService.getAYNM()) this.aynm = this.shareService.getAYNM();
	if(this.shareService.getCHTYP()) this.chtyp = this.shareService.getCHTYP();
   });
  }
  showHis() {
		if(this.source == 'Yogas In Your Horoscope') 
			this.showYO = true;
		if(this.source == 'Divisional Charts') 
			this.showDIV = true;
		if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.year' || this.plan.name == 'com.mypubz.eportal.month') {
			this.showSU = true;
			this.showCR = false;
			this.showASU = false;
		    this.info2 = '';
		//} else if(Number(this.plan.credits) == 0) {
		//	this.showSU = false;
		//	this.showCR = true;
		//	this.showASU = false;
		//	 this.showH = false;
		 //   this.info2 = '';
		} else {
			this.showSU = true;
			this.showCR = false;
			this.showASU = true;
		    this.info2 = '';
		}
		if(this.plan.name != 'com.mypubz.eportal.astrologer' && this.plan.name != 'com.mypubz.eportal.yogas') {
		   this.shareService.setYogAd(true);
		}
		console.log('pln-dobs', this.plan.dobs);
		if(this.plan.dobs.trim() != '') {
		   let dobs = this.plan.dobs.split('|');
		   let i: number =  dobs.length-1;
		  if(dobs.length > 0) {
			this.showH = true;
			let j: number = 0;
			this.oBirth = [];
			while(i > -1) {
				let dob: string = dobs[i];
				console.log('dob', dob);
				let db: string = dob.split('@')[0];
				let nam: string = '';
				let gen: string = '';
				let lat: string = '';
				let lng: string = '';
				let tz: string = '';
				let dof: number = 0;
				if(db.indexOf('L') > -1) {
					console.log('db', db);
					lat = db.split('L')[1].split(',')[0].trim();
					lng = db.split('L')[1].split(',')[1].trim();
					tz = (dob.indexOf('$') > -1) ? dob.split('@')[1].split('$')[0] : dob.split('@')[1].split('#')[0];
					dof = (dob.indexOf('$') > -1) ? Number(dob.split('$')[1].split('#')[0]) : 0;
					console.log('tz', tz);
					if(dob.indexOf('#') > -1) {
						var ng = dob.split('#')[1];
						nam = ng.split('&')[0];
						gen = ng.split('&')[1];
						console.log(nam, gen);
					}
				}
				let oB: BirthInfo = {
					  dob: dob,
					  dob_short: db.split('L')[0],
					  lat: lat,
					  lng: lng,
					  timezone: tz,
					  dstofset: dof,
					  lagna: '',
					  lagna_lord: '',
					  moon_sign: '',
					  sun_sign: '',
					  tithi: '',
					  birth_star: '',
					  star_lord: '',
					  moon_phase: '',
					  name: nam,
					  gender: gen,
					  ref: '',
					  fetch: false,
					  show: true,
					  genrep: false, ppos: null, retro: '', plstr: '', hpos: null, vims: null, sdb: null, akv: null, dohs: null
				};
				this.oBirth[j++] = oB;
				i--;
			}
		  }
		}
		if(this.oBirth.length == 0) {
			this.shareService.getUPRO().then( res => {
		   this.nam = res['name'];
		   this.gen = res['gen'];
		   let db: string = res['dob'].replace('$NaN$0$0','').replace('$NaN','');
		   console.log('db', db);
		   if(db.indexOf('L') > -1) {
			    this.dstofset = (db.indexOf('$') > -1) ? Number(db.split('$')[1].split('@')[0]) : -1;
				let dtm: string = db.split('L')[0].trim();
				this.dob = dtm.split('T')[0];
				console.log('dob', this.dob);
				if(dtm.indexOf('T') > -1)
					this.tob = dtm.split('T')[1];
				this.year = Number(this.dob.split('-')[0]);
				this.mon = Number(this.dob.split('-')[1]);
				this.day = Number(this.dob.split('-')[2]);
				this.hou = Number(this.tob.split(':')[0]);
				this.min = Number(this.tob.split(':')[1]);
				this.sec = (this.tob.split(':').length > 2) ? Number(this.tob.split(':')[2].slice(0,-1)) : 0; 
				console.log('tob', this.tob);
				if(db.indexOf('@') > -1) {
					this.latlng = (db.indexOf('$') > -1) ? db.split('L')[1].split('$')[0] : db.split('L')[1].split('@')[0];
				let tng: string = db.split('@')[1];
				//if(tng.indexOf('#') > -1) this.tz = tng.split('#')[0];
				//else this.tz = tng;
			} else if(db.indexOf('#') > -1) {
				this.latlng = (db.indexOf('$') > -1) ? db.split('L')[1].split('$')[0] : db.split('L')[1].split('#')[0];
			} else {
				this.latlng = (db.indexOf('$') > -1) ? db.split('L')[1].split('$')[0] : db.split('L')[1];
			}
			this.shareService.setLAT(Number(this.latlng.split(',')[0]));
			this.shareService.setLNG(Number(this.latlng.split(',')[1]));
			this.showL = true;
			this.showP = false;
							//let tng: string = db.split('L')[1].split('@')[1];
			if(db.indexOf('#') > -1) {
				var ng = db.split('#')[1];
				this.nam = ng.split('&')[0];
				this.gen = ng.split('&')[1];
			}
		}
		if(this.dstofset == -1) { 
		  this.showP = true;
		  this.showL = false;
		}
			});
		}
 }
  showDatePicker() {
	var dt = new Date();
	if(this.dob != '') {
		dt.setFullYear(Number(this.dob.split('-')[0]));
		dt.setMonth(Number(this.dob.split('-')[1])-1);
		dt.setDate(Number(this.dob.split('-')[2]));
	}
	DatePicker.present({
		format: 'dd/MM/yyyy',
		mode: 'date',
		date: dt.getDate().toString() + '/' + (dt.getMonth()+1).toString() + '/' + dt.getFullYear().toString(),
		theme: 'dark',
	  }).then(odt => {
		var date = new Date(odt.value);
		this.dob = date.getFullYear().toString()+"-"+ (date.getMonth()+1).toString()+"-"+date.getDate().toString();
		this.year = date.getFullYear();
		this.mon = date.getMonth()+1;
		this.day = date.getDate();
		},
		err => console.log('Error occurred while getting date: ', err));
  }
 showTimePicker() {
	var dt = new Date();
	if(this.tob != '') {
		dt.setHours(Number(this.tob.split(':')[0]));
		dt.setMinutes(Number(this.tob.split(':')[1]));
	}
	DatePicker.present({
		format: 'dd/MM/yyyy',
		mode: 'time',
		date: dt.getDate().toString() + '/' + (dt.getMonth()+1).toString() + '/' + dt.getFullYear().toString(),
		theme: 'dark',
	  }).then(odt => {
		var date = new Date(odt.value);
		this.tob = date.getHours().toString()+":"+date.getMinutes().toString();
		this.hou = date.getHours();
		this.min = date.getMinutes();
		this.sec = 0;
		},
		err => console.log('Error occurred while getting date: ', err));
 }
 ionViewDidLoad() {
    console.log('ionViewDidLoad PersonalDetailsPage');
  }
    
  ionViewDidEnter() {
	for(let i = 0; i < this.oBirth.length; i++)
	{
			this.oBirth[i].fetch = false;  
	}
     console.log('personal-details ionViewDidEnter');
     this.info = '';
  this.platform.ready().then(() => {
//     this.splashscreen.hide();
  //  this.info2 = 'Loading..';
//    this.shareService.plan.subscribe((pln) => {
	 //   this.info2 = '';
		if(this.shareService.getREWARD()) {
			this.showSU = true;
			this.showCR = false;
			this.showASU = false;
			if(this.source == 'Yogas In Your Horoscope') 
			 this.showYO = true;
		} 
		//if(pln.name != 'com.mypubz.eportal.astrologer') {
		  //this.showBanner();
		//}
  //  }, (err) => {
	//				this.showSU = false;
	//				this.showCR = false;
	//				this.showASU = false;
	//			this.info2 = JSON.stringify(err);
	//		});
   });
  }

   //showAddressModal () {
   // let modal = this.modalCtrl.create(AutocompletePage);
   // let me = this;
   // modal.onDidDismiss(data => {
      //this.personalDetailsForm.controls['place'].setValue(data);
	 // console.log('onDidDismiss', data);
	 // this.place = data;
	 // this.geoCode(data);
    //});
   // modal.present();
  //}
  init_pur_and_complete() {
    let pid: any;
    if (!this.platform.is('cordova')) { return; }
    try {
      if (this.platform.is('ios')) {
        pid = this.product.apid;
      } else if (this.platform.is('android')) {
        pid = this.product.gpid;
      }

      // Register Product
      // Set Debug High
      this.store.verbosity = this.store.DEBUG;
      // Register the product with the store
      this.store.register({
        id: pid,
        alias: pid,
        type: (pid == 'com.mypubz.eportal.astrologer') ? this.store.PAID_SUBSCRIPTION : this.store.CONSUMABLE
      });
      this.pur_handl();

      this.store.ready(() => {
		this.complete_pur();
	  });//.then((status) => {
       // console.log(JSON.stringify(this.store.get(this.platform.is('ios') ? this.product.apid : this.product.gpid)));
       // console.log('Store is Ready: ' + JSON.stringify(status));
        //console.log('Products: ' + JSON.stringify(this.store.products));
	//	this.complete_pur();
	//	console.log('Finished Purchase!');
	 // });

      // Errors On The Specific Product
      this.store.when(pid).error( (error) => {
        console.log('An Error Occured' + JSON.stringify(error));
      });
      // Refresh Always
      console.log('Refresh Store');
      this.store.refresh();
    } catch (err) {
      console.log('Error On Store Issues' + JSON.stringify(err));
    }
  }
 pur_handl() {
    // Handlers
    this.store.when(this.product.gpid).approved( (product: IAPProduct) => {
      product.finish();
	  this.showCR = false;
	  this.showSU = true;
	  this.showH = true;
		if(this.product.gpid == 'com.mypubz.eportal.astrologer' || this.product.gpid == 'com.mypubz.eportal.adfree' || this.product.gpid == 'com.mypubz.eportal.month') {
			this.plan.name = this.product.gpid;
			this.shareService.setPLAN(this.plan);
			this.horoService.setPlan(this.device.uuid, this.product.gpid)  
			   .subscribe(res => {
				}, (err) => {
				});	  
	    } else {
			this.horoService.addCredits(this.device.uuid, this.ncdts)
		   .subscribe(res => {
				this.plan.credits += this.ncdts;
				this.shareService.setPLAN(this.plan);
			}, (err) => {
			});
        }			
    });
    this.store.when(this.product.gpid).registered( (product: IAPProduct) => {
      console.log('Registered: ' + JSON.stringify(product));
    });

    this.store.when(this.product.gpid).updated( (product: IAPProduct) => {
      console.log('Loaded' + JSON.stringify(product));
    });

    this.store.when(this.product.gpid).cancelled( (product) => {
      console.log('Purchase was Cancelled');
    });

    // Overall Store Error
    this.store.error( (err) => {
      console.log('Store Error ' + JSON.stringify(err));
    });
  }
   async complete_pur() {
    let pid;
    if (!this.platform.is('cordova')) {
      return
    }

    if (this.platform.is('ios')) {
      pid = this.product.apid;
    } else if (this.platform.is('android')) {
      pid = this.product.gpid;
    }

    console.log('Products: ' + JSON.stringify(this.store.products));
    console.log('Ordering From Store: ' + pid);
    try {
      let product = this.store.get(pid);
      console.log('Product Info: ' + JSON.stringify(product));
      let order = await this.store.order(pid);
    } catch (err) {
      console.log('Error Ordering ' + JSON.stringify(err));
    }
  }
  buy(cdts)
  {
	  this.ncdts = cdts;
	  this.product.gpid = 'com.mypubz.eportal.dob'+cdts.toString();
	  if(this.paym == 'rpay') {
		  switch(cdts)
		  {
			  case 15:
				this.razpay(125);
				break;
			 case 25:
			    this.razpay(200);
				break;
			default:
			   break;
		  }
	  }
	else this.init_pur_and_complete();
  }
  yog()
  {
    this.product.gpid = 'com.mypubz.eportal.yogas';
	if(this.paym == 'rpay') this.razpay(126);
	else this.init_pur_and_complete();
  }
  save(evt) {
	evt.stopPropagation();
     this.info = 'please wait...';
	 console.log('day', this.day);
	 console.log('mon', this.mon);
	 console.log('year', this.year);
	 console.log('hou', this.hou);
	 console.log('min', this.min);
	 console.log('sec', this.sec);
	if(this.place.length == 0) {
	    this.info = 'Please enter place of birth';
		return;
		}
	if(this.nam.length == 0) {
			this.info = 'Please enter name';
			return;
		} else  {
			var re = /^[a-zA-Z ]{2,30}$/;
			if(!re.test(this.nam)) this.info = "Name should not contain special charcters or numbers, please enter a valid Name.";
		}
	if(this.gen.length == 0) {
			this.info = 'Please enter gender';
			return;
		}
	if(this.day == null || this.mon == null || this.year == null) {
		this.info = 'Please enter date of birth';
		return;
	} else {
        this.dob = this.year.toString()+'-'+ this.mon.toString()+'-'+this.day.toString();
	}
	if(this.hou == null || this.min == null) {
		this.info = 'Please enter time of birth';
		return;
	} else  {
		let s = (this.sec == null) ? '00Z':this.sec.toString()+'Z';
        this.tob = this.hou.toString()+':'+this.min.toString()+':'+s ;
	}
	if(!this.isValidDate(this.day, this.mon, this.year, this.hou, this.min, (this.sec == null) ? 0 : this.sec)) {
		this.info = 'Please enter valid date & time';
		return;
	}
	this.shareService.setPersonDetails(this.place, this.dob + 'T' + this.tob );
	//var dobs = this.plan.dobs.split('|');
	let bdob: boolean = false;
	console.log('oBirth-save', this.oBirth);
	let dob2: string = this.dob.toString().trim();
	for(var d=0; d < this.oBirth.length; d++) {
	    let dob1: string = this.oBirth[d].dob.split('T')[0].trim();
		
		console.log('dob1', dob1);
		console.log('dob2', dob2);
	    if( dob1 == dob2) { bdob = true; break; }
	   // var cdb = (dobs[d].indexOf('L') > -1) ? dobs[d].split('L')[0].trim() : dobs[d].trim();
		//if(cdb == this.personalDetailsForm.controls['dob'].value.trim()) { 
		//if(cdb == this.dob.trim() + 'T' + this.tob + 'Z') { 
			//bdob = true;
			//break;
		//}
	}
	if(!bdob) {
	    console.log('before adding dob', this.oBirth);
		console.log('adding dst', this.dstofset);
		let pd: string = this.dob + 'T' + this.tob + 'L' + this.shareService.getLAT() + ',' + this.shareService.getLNG() + '@' + this.shareService.getTimezone() + '$' + this.dstofset.toString();
		if(this.nam.length > 0) pd += '#' + this.nam + '&' + this.gen;
		this.info = 'storing DOB..';
		this.horoService.addDOB(this.device.uuid, pd)
		   .subscribe(res => {
		    console.log('addDOB', res);
							let oB: BirthInfo = {
					  dob: this.dob + 'T' + this.tob,
					  dob_short: '',
					  lat: this.shareService.getLAT(),
					  lng: this.shareService.getLNG(),
					  timezone: this.shareService.getTimezone(),
					  dstofset: this.dstofset,
					  lagna: '',
					  lagna_lord: '',
					  moon_sign: '',
					  sun_sign: '',
					  tithi: '',
					  birth_star: '',
					  star_lord: '',
					  moon_phase: '',
					  name: this.nam,
					  gender: this.gen,
					  ref: '',
					  fetch: false,
					  show: true,
					  genrep: false, ppos: null, retro: '', plstr: '', hpos: null, vims: null, sdb: null, akv: null, dohs: null
				};
				this.oBirth.unshift(oB);
                if(this.showH == false) this.showH = true;
				let ob: string = '';
				if(res['dobs'].trim() != '') {
				 ob = res['dobs'] + '|' + this.dob + 'T' + this.tob + 'L' + this.shareService.getLAT() + ',' + this.shareService.getLNG() + '@' + this.shareService.getTimezone() + '$' + this.dstofset.toString()  + '#' + this.nam + '&' + this.gen;
				} else {
				  ob = this.dob + 'T' + this.tob  + 'L' + this.shareService.getLAT() + ',' + this.shareService.getLNG() + '@' + this.shareService.getTimezone() + '$' + this.dstofset.toString() + '#' + this.nam + '&' + this.gen;
				}
					
			let pln: Plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: ob, rating: res['rating'] };
			this.plan = pln;
			console.log('after adding dob', this.plan);
			//this.plan.dobs = res['dobs'];
		   this.shareService.setPLAN(pln);
		   //if(res['credits'] == -1) {
			//error
		 //  if (res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.offer499' && res['credits'] == 0) {
			// this.showCR = true;
			 //this.showSU = false;
			 //return;
		   //}
			this.info = '';
			this.nwait = 0;
		}, (err) => {
			this.info = err;
			this.nwait = 0;
		}) ;
	 }
	 this.info = 'processing request..';
	 this.processReq(this.shareService.getLAT(), this.shareService.getLNG(), this.shareService.getDOB(), this.shareService.getTimezone(), this.dstofset, this.nam, this.gen);
	}
    processReq(lat, lng, dob, tz, dof, nam, gen)
    {
	console.log('processReq', dob);
	 this.nwait = 18;
	 if(this.source == 'Star Constellation') {
	  if(this.plan.name == 'com.mypubz.eportal.astrologer' || this.plan.name == 'com.mypubz.eportal.adfree' || this.plan.name == 'com.mypubz.eportal.year') {
		 let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'2', fetch: false, show: true, genrep: false, ppos: null, retro: '', plstr: '',  hpos: null, vims: null, sdb: null, akv: null, dohs: null};
		  this.info = '';
		  this.nwait = 0;
		 this.router.navigate(['/star-const'], {state: binf});
	  } else {
	    this.router.navigate(['/subscribe']);
	  }
	 } else if(this.source == 'Lucky Gemstones') {
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.shareService.getAKV(dob).then( akv => {
		this.shareService.getRETRO(dob).then( retro => {
		this.shareService.getPPOS(dob).then( ppos => {
			if(ppos) {
				let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: 0, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'GEM', fetch: false, show: true, genrep: false, ppos: ppos, retro: retro, plstr: null, hpos: null, vims: null, sdb: null, akv: akv, dohs: null};
				this.info = '';
				this.nwait = 0;
				if(akv == null) binf.akv = null
				this.router.navigate(['/gemstone-astro'], {state: binf});
			} else {
				   this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
			   .subscribe(res => {
				//this.shareService.setPLPOS(res['planetPos']);
				this.shareService.setPPOS(dob, res['planetPos']);
				this.shareService.setRETRO(dob, res['retroPls']);
				this.shareService.setPLSTR(dob, res['plStren']);
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'1', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: akv, dohs: null};
				this.router.navigate(['/gemstone-astro'], {state: binf});
			  }, (err) => {
				this.info = JSON.stringify(err);
				this.nwait = 0;
			  }) ;
			}
		});
		});
		})
		.catch(e => {
				   this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
			   .subscribe(res => {
				//this.shareService.setPLPOS(res['planetPos']);
				this.shareService.setPPOS(dob, res['planetPos']);
				this.shareService.setRETRO(dob, res['retroPls']);
				this.shareService.setPLSTR(dob, res['plStren']);
				this.horoService.getAstakvarga(lat, lng, dob, tz, dof, ayanid)
				.subscribe(akv => {
					this.shareService.setAKV(dob, akv);
					let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'1', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: akv, dohs: null};
					this.router.navigate(['/gemstone-astro'], {state: binf});
					this.nwait = 0;
				}, (err) => {
						this.info = JSON.stringify(err);
						this.nwait = 0;
			  }) ;
		});
	   });
	 } else if(this.source == 'Birth Chart Analysis' || this.source == 'Birth Chart') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		console.log('getVIMS', dob)
		this.shareService.getPPOS(dob).then( ppos => {
		this.shareService.getRETRO(dob).then( retro => {
		this.shareService.getPLSTR(dob).then( plstr => {
		this.shareService.getVIMS(dob).then( vims => {
		this.shareService.getSDB(dob).then( sdb => {
		this.shareService.getAKV(dob).then( akv => {
		this.shareService.getDOHS(dob).then( dohs => {
		 if(ppos) {
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: 0, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'1', fetch: false, show: true, genrep: false, ppos: ppos, retro: retro, plstr: plstr, hpos: null, vims: vims, sdb: sdb, akv: akv, dohs: dohs};
			this.info = '';
			this.nwait = 0;
			this.router.navigate(['/horoscope'], {state: binf});
		 } else {
			   this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
		   .subscribe(res => {
			//this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setPPOS(dob, res['planetPos']);
			this.shareService.setRETRO(dob, res['retroPls']);
			this.shareService.setPLSTR(dob, res['plStren']);
			this.info = '';
			this.nwait = 0;
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'1', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
			this.router.navigate(['/horoscope'], {state: binf});
		  }, (err) => {
			this.info = JSON.stringify(err);
			this.nwait = 0;
		  }) ;
		 }
	    })
		.catch(ed => {
					   this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
				   .subscribe(res => {
					//this.shareService.setPLPOS(res['planetPos']);
					this.shareService.setPPOS(dob, res['planetPos']);
					this.shareService.setRETRO(dob, res['retroPls']);
					this.shareService.setPLSTR(dob, res['plStren']);
					this.info = '';
					this.nwait = 0;
					let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'1', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
					this.router.navigate(['/horoscope'], {state: binf});
				  }, (err) => {
					this.info = JSON.stringify(err);
					this.nwait = 0;
				  }) ;
		});
	    })
		.catch(ea => {
					   this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
				   .subscribe(res => {
					//this.shareService.setPLPOS(res['planetPos']);
					this.shareService.setPPOS(dob, res['planetPos']);
					this.shareService.setRETRO(dob, res['retroPls']);
					this.shareService.setPLSTR(dob, res['plStren']);
					this.info = '';
					this.nwait = 0;
					let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'1', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
					this.router.navigate(['/horoscope'], {state: binf});
				  }, (err) => {
					this.info = JSON.stringify(err);
					this.nwait = 0;
				  }) ;
		});
	    })
		.catch(es => {
					   this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
				   .subscribe(res => {
					//this.shareService.setPLPOS(res['planetPos']);
					this.shareService.setPPOS(dob, res['planetPos']);
					this.shareService.setRETRO(dob, res['retroPls']);
					this.shareService.setPLSTR(dob, res['plStren']);
					this.info = '';
					this.nwait = 0;
					let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'1', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
					this.router.navigate(['/horoscope'], {state: binf});
				  }, (err) => {
					this.info = JSON.stringify(err);
					this.nwait = 0;
				  }) ;
			
		});
	    })
		.catch(ev => {
					   this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
				   .subscribe(res => {
					//this.shareService.setPLPOS(res['planetPos']);
					this.shareService.setPPOS(dob, res['planetPos']);
					this.shareService.setRETRO(dob, res['retroPls']);
					this.shareService.setPLSTR(dob, res['plStren']);
					this.info = '';
					this.nwait = 0;
					let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'1', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
					this.router.navigate(['/horoscope'], {state: binf});
				  }, (err) => {
					this.info = JSON.stringify(err);
					this.nwait = 0;
				  }) ;
			
		});
	    });
	    });
	    })
		.catch(e => {
			console.log(e);
				   this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
			   .subscribe(res => {
				//this.shareService.setPLPOS(res['planetPos']);
				this.shareService.setPPOS(dob, res['planetPos']);
				this.shareService.setRETRO(dob, res['retroPls']);
				this.shareService.setPLSTR(dob, res['plStren']);
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'1', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
				this.router.navigate(['/horoscope'], {state: binf});
			  }, (err) => {
				this.info = JSON.stringify(err);
				this.nwait = 0;
			  }) ;
		 });
	  } else if(this.source == 'KP Astrology') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 3;
		var res = this.shareService.getKAYNM();
		if(res) ayanid = Number(res);
		//this.shareService.getRETRO(dob).then( retro => {
		this.shareService.getKPPOS(dob).then( ppos => {
		this.shareService.getHPOS(dob).then( hpos => {
		//this.shareService.getPLSTR(dob).then( plstr => {
		if(ppos) {
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'2', fetch: false, show: true, genrep: false, ppos: ppos, retro: null, plstr: null, hpos: hpos, vims: null, sdb: null, akv: null, dohs: null};
			this.info = '';
			this.nwait = 0;
			this.router.navigate(['/kp-astro'], {state: binf});
		} else {
		  this.horoService.getCuspsEx(lat, lng, dob, tz, this.dstofset, ayanid)
		   .subscribe(res => {
			this.shareService.setKPPOS(dob, res['planetPos']);
			//this.shareService.setRETRO(dob, res['retroPls']);
			//this.shareService.setPLPOS(res['planetPos']);
		    console.log(res['housePos']);
 		    this.shareService.setHPOS(dob, res['housePos']);
			this.info = '';
			this.nwait = 0;
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'2', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: null, plstr: null, hpos: res['housePos'], vims: null, sdb: null, akv: null, dohs: null};
			this.router.navigate(['/kp-astro'], {state: binf});
		  }, (err) => {
			this.info = JSON.stringify(err);
	  this.horoService.addTicket(this.device.uuid, 'KP', 'err', 'KP ERROR lat: ' + lat.toString() + ' lng: ' + lng.toString() + 'tz:' + tz + ' dst: ' + this.dstofset.toString() + ' ayanid: ' + ayanid.toString() + ' ' +  this.info)
	  						.subscribe(res => {
	 						});
			
			this.nwait = 0;
		  }) ;
	    }
	    //});
	    });
	    //});
	    })
		.catch(e => {
		  this.horoService.getCuspsEx(lat, lng, dob, tz, this.dstofset, ayanid)
		   .subscribe(res => {
			this.shareService.setKPPOS(dob, res['planetPos']);
			//this.shareService.setPLPOS(res['planetPos']);
		    console.log(res['housePos']);
 		    this.shareService.setHPOS(dob, res['housePos']);
			this.info = '';
			this.nwait = 0;
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'2', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: null, plstr: null, hpos: res['housePos'], vims: null, sdb: null, akv: null, dohs: null};
			this.router.navigate(['/kp-astro'], {state: binf});
		  }, (err) => {
			this.info = JSON.stringify(err);
	  this.horoService.addTicket(this.device.uuid, 'KP', 'err', 'KP ERROR lat: ' + lat.toString() + ' lng: ' + lng.toString() + 'tz:' + tz + ' dst: ' + this.dstofset.toString() + ' ayanid: ' + ayanid.toString() + ' ' +  this.info)
	  						.subscribe(res => {
	 						});
			
			this.nwait = 0;
		  }) ;
		});
	  } else if(this.source == 'Daily Horoscope') {
		let db: string = this.dob + 'T' + this.tob + 'L' + this.shareService.getLAT() + ',' + this.shareService.getLNG() + '@' + this.shareService.getTimezone() + '$' + this.dstofset.toString();
		if(this.nam.length > 0) db += '#' + this.nam + '&' + this.gen;
		this.info = 'Saving the profile..';
		this.horoService.setProfile(this.device.uuid, '', db)
				.subscribe(res => {
					this.info = '';
				}, (err) => {
					this.info = err;
				});
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.info = 'Calculating birth star..';
	    this.horoService.getProBirthStar(lat, lng, dob, tz, ayanid)
       .subscribe(res => {
	     this.shareService.setMoonSign(res['birthSign']);
		 this.info = '';
		 this.nwait = 0;
		 let dho: any = {
			  sho: false,
			  msgn: res['birthSign'],
			  msg: '',
			  smsg:'',
			  img: ''
		  };
		 this.router.navigate(['/daily-forecast'], {state : dho});
		}, (err) => {
			this.info = JSON.stringify(err);
			this.nwait = 0;
		}) ;
	   
	  }else if(this.source == 'Yogas In Your Horoscope') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.shareService.getRETRO(dob).then( retro => {
		this.shareService.getPLSTR(dob).then( plstr => {
		this.shareService.getYOGS(dob).then( yogs => {
		this.shareService.getPPOS(dob).then( ppos => {
		if(ppos) {
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'2', fetch: false, show: true, genrep: false, ppos: ppos, retro: retro, plstr: plstr, hpos: null, vims: null, sdb: null, akv: null, dohs: null};
				this.router.navigate(['/rajayoga'], {state: binf});
		} else {
		  this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
		   .subscribe(res1 => {
			this.shareService.setRETRO(dob, res1['retroPls']);
			this.shareService.setPLSTR(dob, res1['plStren']);
			//this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setPPOS(dob, res1['planetPos']);
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'2', fetch: false, show: true, genrep: false, ppos: res1['planetPos'], retro: res1['retroPls'], plstr: res1['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
			this.router.navigate(['/rajayoga'], {state: binf});
		  }, (err) => {
			this.info = JSON.stringify(err);
			this.nwait = 0;
		  })
		}
	    });
	    })
		.catch( e => {
			this.shareService.getRETRO(dob).then( retro => {
			this.shareService.getPLSTR(dob).then( plstr => {
			this.shareService.getPPOS(dob).then( ppos => {
				this.horoService.getYogas(lat, lng, dob, tz, this.shareService.getLANG())
				.subscribe(res2 => {
				this.shareService.setYOGS(dob, res2);
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'2', fetch: false, show: true, genrep: false, ppos: ppos, retro: retro, plstr: plstr, hpos: null, vims: null, sdb: null, akv: null, dohs: null};
				this.router.navigate(['/rajayoga'], {state: binf});
				}, (err) => {
					this.info = JSON.stringify(err);
					this.nwait = 0;
				});
			});
			});
			});
		});
	    });
	    })
		.catch( e => {
		  this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
		   .subscribe(res1 => {
			this.shareService.setRETRO(dob, res1['retroPls']);
			this.shareService.setPLSTR(dob, res1['plStren']);
			//this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setPPOS(dob, res1['planetPos']);
				this.horoService.getYogas(lat, lng, dob, tz, this.shareService.getLANG())
				.subscribe(res2 => {
				this.shareService.setYOGS(dob, res2);
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'2', fetch: false, show: true, genrep: false, ppos: res1['planetPos'], retro: res1['retroPls'], plstr: res1['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
				this.router.navigate(['/rajayoga'], {state: binf});
				}, (err) => {
					this.info = JSON.stringify(err);
					this.nwait = 0;
				}) ;
		  }, (err) => {
			this.info = JSON.stringify(err);
			this.nwait = 0;
		  })
		});
	  }else if(this.source == 'Planetary Transits & Predictions') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.shareService.getRETRO(dob).then( retro => {
		this.shareService.getPLSTR(dob).then( plstr => {
		this.shareService.getPPOS(dob).then( ppos => {
		if(ppos) {
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'4', fetch: false, show: true, genrep: false, ppos: ppos, retro: retro, plstr: plstr, hpos: null, vims: null, sdb: null, akv: null, dohs: null};
			this.info = '';
			this.nwait = 0;
			this.router.navigate(['/transit-predictions'], {state: binf});
		} else {
	     this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
		   .subscribe(res => {
			//this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setPPOS(dob, res['planetPos']);
			this.shareService.setRETRO(dob, res['retroPls']);
			this.shareService.setPLSTR(dob, res['plStren']);
			this.info = '';
			this.nwait = 0;
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'4', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
			this.router.navigate(['/transit-predictions'], {state: binf});
		}, (err) => {
			this.info = err;
			this.nwait = 0;
		});
	   }
	    });
	    });
	    })
		.catch(e => {
	     this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
		   .subscribe(res => {
			//this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setPPOS(dob, res['planetPos']);
			this.shareService.setRETRO(dob, res['retroPls']);
			this.shareService.setPLSTR(dob, res['plStren']);
			this.info = '';
			this.nwait = 0;
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'4', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
			this.router.navigate(['/transit-predictions'], {state: binf});
		}, (err) => {
			this.info = err;
			this.nwait = 0;
		});
		});
	  } else if(this.source == 'Divisional Charts') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.shareService.getRETRO(dob).then( retro => {
		this.shareService.getPLSTR(dob).then( plstr => {
		this.shareService.getPPOS(dob).then( ppos => {
		if(ppos) {
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'5', fetch: false, show: true, genrep: false, ppos: ppos, retro: retro, plstr: plstr, hpos: null, vims: null, sdb: null, akv: null, dohs: null};
			this.info = '';
			this.nwait = 0;
			this.router.navigate(['/divcharts'], {state: binf});
		} else {
		 this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
		   .subscribe(res => {
			//this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setPPOS(dob, res['planetPos']);
			this.shareService.setRETRO(dob, res['retroPls']);
			this.shareService.setPLSTR(dob, res['plStren']);
			this.info = '';
			this.nwait = 0;
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'5', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
			this.router.navigate(['/divcharts'], {state: binf});
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
		}
	    });
	    });
	    })
		.catch(e => {
		 this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
		   .subscribe(res => {
			//this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setPPOS(dob, res['planetPos']);
			this.shareService.setRETRO(dob, res['retroPls']);
			this.shareService.setPLSTR(dob, res['plStren']);
			this.info = '';
			this.nwait = 0;
			let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'5', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
			this.router.navigate(['/divcharts'], {state: binf});
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
		});
	  } else if(this.source == 'Career Horoscope') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.shareService.getRETRO(dob).then( retro => {
		this.shareService.getPLSTR(dob).then( plstr => {
		this.shareService.getPPOS(dob).then( ppos => {
		if(ppos) {
				let binf: BirthInfo = { dob: dob, dob_short:dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'4', fetch: false, show: true, genrep: false, ppos: ppos, retro: retro, plstr: plstr, hpos: null, vims: null, sdb: null, akv: null, dohs: null};
				this.info = '';
				this.nwait = 0;
				this.router.navigate(['/careerhoro'], {state: binf});
		} else {
 		 this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
		   .subscribe(res => {
			//this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setPPOS(dob, res['planetPos']);
			this.shareService.setRETRO(dob, res['retroPls']);
			this.shareService.setPLSTR(dob, res['plStren']);
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'4', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
				this.router.navigate(['/careerhoro'], {state: binf});
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
		}
	    });
	    });
	    })
		.catch(e => {
 		 this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
		   .subscribe(res => {
			//this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setPPOS(dob, res['planetPos']);
			this.shareService.setRETRO(dob, res['retroPls']);
			this.shareService.setPLSTR(dob, res['plStren']);
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'4', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
				this.router.navigate(['/careerhoro'], {state: binf});
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
		});
	  } else if(this.source == 'Money Horoscope') {
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var res = this.shareService.getAYNM();
		if(res) ayanid = Number(res);
		this.shareService.getRETRO(dob).then( retro => {
		this.shareService.getPLSTR(dob).then( plstr => {
		this.shareService.getPPOS(dob).then( ppos => {
		if(ppos) {
				let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'4', fetch: false, show: true, genrep: false, ppos: ppos, retro: retro, plstr: plstr, hpos: null, vims: null, sdb: null, akv: null, dohs: null};
				this.info = '';
				this.nwait = 0;
				this.router.navigate(['/moneyhoro'], {state: binf});
		} else {
		 this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
		   .subscribe(res => {
			//this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setPPOS(dob, res['planetPos']);
			this.shareService.setRETRO(dob, res['retroPls']);
			this.shareService.setPLSTR(dob, res['plStren']);
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'4', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
				this.router.navigate(['/moneyhoro'], {state: binf});
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
		}
	    });
	    });
	    })
		.catch(e => {
		 this.horoService.getBirthchartEx2(lat, lng, dob, tz, dof, ayanid)
		   .subscribe(res => {
			//this.shareService.setPLPOS(res['planetPos']);
			this.shareService.setPPOS(dob, res['planetPos']);
			this.shareService.setRETRO(dob, res['retroPls']);
			this.shareService.setPLSTR(dob, res['plStren']);
				this.info = '';
				this.nwait = 0;
				let binf: BirthInfo = { dob: dob, dob_short: dob, lat: lat, lng: lng, timezone: tz, dstofset: dof, lagna:'',lagna_lord:'',moon_sign:'',sun_sign:'',tithi:'',birth_star:'',star_lord:'',moon_phase:'',name:nam,gender:gen,ref:'4', fetch: false, show: true, genrep: false, ppos: res['planetPos'], retro: res['retroPls'], plstr: res['plStren'], hpos: null, vims: null, sdb: null, akv: null, dohs: null};
				this.router.navigate(['/moneyhoro'], {state: binf});
		  }, (err) => {
			this.info = err;
			this.nwait = 0;
		  }) ;
		});
	   }
    }	
    more()
	{
		this.router.navigate(['/subscribe']);
	}
	morecred()
	{
		this.router.navigate(['/credits']);
	}
	yoginf()
	{
		this.router.navigate(['/yoga-info']);
	}
	vargainf()
	{
		this.router.navigate(['/varga-info']);
	}
  paymSel(paym)
  {
     this.paym = paym;
  }
  razpay(amt) {
    let paise: number = Math.floor(amt*100);
	let ccy: string = 'INR';
	let ccode = this.shareService.getCCODE();
	if(ccode && ccode != '' && ccode != 'IN') {
	  paise = Math.floor(amt*1.4);
	  ccy = 'USD';
	}
	   
    var options = {
      description: (this.product.gpid == 'com.mypubz.eportal.astrologer') ? '126 Astrology - One Year Subscription' : '126 Astrology - Credits',
      image: 'https://i.imgur.com/YBQF1iV.png',
      currency: ccy, //'INR',
      key: 'rzp_live_B8Zi7S5GIm9G94',
      amount: paise,
      name: '126 Astrology',
      prefill: {
        email: '',
        contact: '',
        name: ''
      },
      theme: {
        color: '#488aff'
      },
      modal: {
        ondismiss: function() {
          alert('dismissed')
        }
      }
    };

    var successCallback = (payment_id) => {
	  this.showCR = false;
	  this.showSU = true;
	  this.showH = true;
		if(this.product.gpid == 'com.mypubz.eportal.astrologer' || this.product.gpid == 'com.mypubz.eportal.adfree' || this.product.gpid == 'com.mypubz.eportal.month') {
			this.plan.name = this.product.gpid;
			this.shareService.setPLAN(this.plan);
			this.horoService.setPlan(this.device.uuid, this.product.gpid)  
			   .subscribe(res => {
				}, (err) => {
				});	  
	    } else {
			this.horoService.addCredits(this.device.uuid, this.ncdts)
		   .subscribe(res => {
				this.plan.credits += this.ncdts;
				this.shareService.setPLAN(this.plan);
			}, (err) => {
			});
        }			
    };

    var cancelCallback = (error) => {
      alert(error.description + ' (Error ' + error.code + ')');
    };

    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
  selDOB(evt, pd)
  {
    evt.stopPropagation();
    console.log('selDOB', pd);
	pd.fetch = true;
	//var dob = pd.dob;
	//if(dob.indexOf('L') > -1) {
		//var db = dob.split('L')[0].trim();
		//var lat = dob.split('L')[1].split('@')[0].split(',')[0].trim();
		//var lng = dob.split('L')[1].split('@')[0].split(',')[1].trim();
		//let tz: string = dob.split('L')[1].split('@')[1];
		//let nam: string = '';
		//let gen: string = '';
		//if(tz.indexOf('#') > -1) {
			//tz = tz.split('#')[0];
			//nam = tz.split('&')[0];
			//gen = tz.split('&')[1];
		//}
		this.processReq(pd.lat, pd.lng, pd.dob_short, pd.timezone, pd.dstofset, pd.name, pd.gender);
	//}
  }
  
  updateSearch() {
    console.log('updateSearch');
    if (this.autocomplete.query == '' || this.autocomplete.query.length < 3 || this.autocomplete.query == this.place) {
     this.autocompleteItems = [];
     return;
    }
    console.log('getPlacePredictions');
    let me = this;
    this.service.getPlacePredictions({
    input: this.autocomplete.query,
    
   }, (predictions, status) => {
     console.log('getPlacePredictions', predictions);
     me.autocompleteItems = [];

   me.zone.run(() => {
     console.log('zone.run', predictions);
     if (predictions != null) {
        predictions.forEach((prediction) => {
          me.autocompleteItems.push(prediction.description);
        });
       }
     });
   });
  }
  chooseItem(item: any) {
	this.place = item;
	this.autocomplete.query = item;
    this.geoCode(item);
	this.autocompleteItems = [];
  }
//convert Address string to lat and long
  geoCode(address:any) {
    this.info = 'geocoding..';
    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, (results, status) => {
    let latitude = results[0].geometry.location.lat();
    let longitude = results[0].geometry.location.lng();
	this.shareService.setLAT( latitude);
	this.shareService.setLNG(longitude);
	//let utc_offset: number = 0;
	//if(results[0].geometry.hasOwnProperty('utc_offset'))
		//utc_offset = results[0].geometry.utc_offset;
    this.horoService.getTimezone(results[0].geometry.location.lat(), results[0].geometry.location.lng(), (Math.round((new Date().getTime())/1000)).toString())
		.subscribe(res2 => {
		   this.shareService.setTimezone(res2['timeZoneId']);
		   console.log('timezone', res2['timeZoneId']);
		   console.log('dst', res2['dstOffset']);
		   this.dstofset = res2['dstOffset'];
		   this.info = '';
		}, (err) => {
		  console.log(err);
		  this.info = err;
		}) ;

   });
 }
 remDOB(evt, pd) {
    evt.stopPropagation();
	pd.show = false;
	this.horoService.remDOB(this.device.uuid, pd.dob)
	.subscribe(res => {
			let pln: Plan = { uuid: res['uuid'], name: res['name'], credits: res['credits'], dobs: res['dobs'], rating: res['rating'] };
			this.plan = pln;
			//this.plan.dobs = res['dobs'];
		    this.shareService.setPLAN(pln);
	}, (err) => {
		console.log(err);
	});
	
 }
 genPDF(evt, pd) {
    evt.stopPropagation();
	let reps = this.shareService.getREPS().split('|');
	let efn: string = '';
	for(let i = 0; i < reps.length; i++) {
		if(reps[i].split('$')[0] == pd.name && reps[i].split('$')[1] == pd.dob_short) { efn = reps[i].split('$')[2]; break;}
	}
	if(efn != '') {
		this.showPdf(this.file.externalDataDirectory + efn);
	} else {
	pd.genrep = true;
    var latlng = new google.maps.LatLng(pd.lat, pd.lng);
    let geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'latLng': latlng }, (results, status) => {
	    console.log('geocoder result=', results);
		var dt = new Date();
		var n = dt.getTimezoneOffset();
		n = n/60;
		let ofset: number = Number(n.toFixed(1));
		let ayanid: number = 4;
		var ayn = this.shareService.getAYNM();
		if(ayn) ayanid = Number(ayn);
	this.horoService.downloadPdf(this.device.uuid, pd.name, pd.gender, pd.dob, results[0].formatted_address, pd.lat, pd.lng, pd.timezone, ofset, ayanid, this.shareService.getLANG(), (this.shareService.getCHTYP() == null) ? 'si':this.shareService.getCHTYP())
	.subscribe(res => {
		//var fpth = '';
		 //if (this.platform.isIOS()) {
         //   fpth = this.file.documentsDirectory;
        //} else {
           let fpth: string = this.file.externalDataDirectory;
        //}
		pd.genrep = false;
		let fn = pd.name.split(' ').join() + Date.now() + '.pdf';
		//let blob:any = new Blob([res], { type: 'application/pdf; charset=utf-8' });
		this.file.writeFile(fpth,  fn, res, {replace: true, append: false})
		.then(res =>  {
			console.log('success');
                //success
				this.shareService.setREP(pd.name+'$'+pd.dob_short + '$'+ fn);
				console.log( fpth, fn);
				this.showPdf(fpth+fn);
				//window.open(encodeURI(fpth+fn), '_system');
           }, function(error) {
            });	
		//const url= window.URL.createObjectURL(res);
    }, (err) => {
		this.info = JSON.stringify(err);
		console.log(err);
	});
   },(err) => {
	  console.log(err);
	  this.info = JSON.stringify(err);
	});
	}
 }
 showPdf(fl) {
	 this.platform.ready().then(() => {
			this.fileOpener.open(fl, 'application/pdf');
	 });
 }
 isValidDate(d, m, y, hou, min, sec) {
  var dt = new Date(y,m,d,hou,min,sec);
  if (Object.prototype.toString.call(dt) === "[object Date]") {
  // it is a date
   if (isNaN(dt.getTime())) {  // dt.valueOf() could also work
    // date is not valid
    return false;
   } else {
    return true;
   }
  } else {
   return false;
  }
 }
rgeoCode(lat, lng) {
    console.log('lat=', lat);
	console.log('lng=', lng);
    var latlng = new google.maps.LatLng(lat, lng);
    let geocoder = new google.maps.Geocoder();
	geocoder.geocode({ 'latLng': latlng }, (results, status) => {
	    console.log('geocoder result=', results);
	    results[0].formatted_address;
   },(err) => {
	  console.log(err);
	  this.info = err;
	});
 }
advset() {
	this.showAD = !this.showAD
	this.advs = (this.showAD) ? 'Hide Settings' : 'Advanced Settings';
}
chartSel() {
	console.log('chtyp', this.chtyp);
 } 
 ayanSel() {
   console.log('aynm',this.aynm);	 
 }
 showInf(tpc) {
	this.horoService.getArticle(tpc)
	.subscribe(res => {
		this.info = '';
		if(res['title'].indexOf('ERROR') == -1)
			this.router.navigate(['/article'], {state: res});
	}, (err) => {
		this.info = JSON.stringify(err);
	});
 }
   switchLanguage() {
	 console.log('lang', this.lang);
    this.translate.use(this.lang);
	this.shareService.setLANG(this.lang);
  }
  subscribe()
  {
    this.product.gpid = 'com.mypubz.eportal.astrologer';
	if(this.paym == 'rpay') {
		this.razpay(999);
	}
	else this.init_pur_and_complete();
  }
   enter()
   {
	   this.showL = false;
	   this.showP = true;
   }
  }