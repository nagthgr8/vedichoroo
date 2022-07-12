import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Platform  } from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { Plan } from '../plan';
import { BirthInfo } from '../birth-info';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { Device } from '@ionic-native/device/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
declare var google; 
declare var RazorpayCheckout: any;

@Component({
  selector: 'app-report',
  templateUrl: './report.page.html',
  styleUrls: ['./report.page.scss'],
})
export class ReportPage implements OnInit {
 objectKeys = Object.keys;
 oBirth :BirthInfo[] = [];
 service = new google.maps.places.AutocompleteService();
 public product: any = {
    name: 'My Product',
    apid: '1234',
    gpid: 'com.mypubz.eportal.dob'
  };
  autocomplete;
  autocompleteItems;

   address;
   //personalDetailsForm: FormGroup;
   info: string = '';
   info2: string = '';
 showSU: boolean = true;
 showPM: boolean = true;
 showH: boolean = false;
 showN: boolean = false;
 aynm: string = 'LAH';
 paym: string = 'rpay';
 lan: string = 'EN';
 chtyp: string = 'nind';
   dob: string = '';
   tob: string = '';
   place: string = '';
   nam: string='';
   gen: string = '';
   mob: string = '';
   eml: string = '';
   qta: number = 0;
   ast: boolean = false;
   rs: string = '149/-';
   sav: string = '';
   act: string = '';
   pc: number = 199;
   dpc: number = 0;
   his: boolean = true;
   btnam: string = 'Buy Now';
   dbtn1: string = 'Download Sample Report(Hindi)';
   dbtn2: string = 'Download Sample Report(English)';
   dbtn3: string = 'Download Sample Report(Tamil';
   dbtn4: string = 'Download Sample Report(Telugu)';
   dstofset: number = 0;
  constructor(public router: Router, private zone: NgZone, private translate: TranslateService, private datePicker: DatePicker, public shareService: ShareService, public horoService: HoroscopeService, public platform: Platform, public device: Device, private store: InAppPurchase2, private file: File, private fileOpener: FileOpener, private filePath: FilePath) { 
      this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  ngOnInit() {
	  console.log('ngOnInit', 'report');
	this.platform.ready().then(() => {
	this.shareService.plan.subscribe((pln) => {
		   console.log('report', 'plan fetched');
			if(pln.name.trim() == 'com.mypubz.eportal.astrologer' || pln.name.trim() == 'com.mypubz.eportal.adfree' || pln.name.trim() == 'com.mypubz.eportal.month' || pln.name.trim() == 'com.mypubz.eportal.year') { 
				this.ast = true;
				this.btnam = 'Submit';
				//this.rs = this.dpc.toString() + '/-';
				//this.act = '(actual price is Rs.'+ this.pc.toString()+'/-';
				//this.sav = 'you get 30% savings from your subscription)';
			}
			if(pln.dobs.trim() != '') {
			   let dobs = pln.dobs.split('|');
			   let i: number =  dobs.length-1;
			  if(dobs.length > 0) {
				console.log('history found');
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
						tz = dob.split('@')[1].split('#')[0];
					    dof = (dob.indexOf('$') > -1) ? Number(dob.split('@')[1].split('#')[0].split('$')[1]) : 0;
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
			  } else {
				  console.log('No items in the history');
				  this.showN = true;
				  this.his = false;
			  }
			} else {
				  console.log('No items in the history');
				  this.showN = true;
				  this.his = false;
			}
		}, (err) => {
			console.log(JSON.stringify(err));
			});
     });			
  }
    showDatePicker() {
	var dt = new Date();
	if(this.dob != '') {
		dt.setFullYear(Number(this.dob.split('-')[0]));
		dt.setMonth(Number(this.dob.split('-')[1])-1);
		dt.setDate(Number(this.dob.split('-')[2]));
	}
	this.datePicker.show({
	  date: dt,
	  mode: 'date',
	  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
	}).then(
	  date => {
        this.dob = date.getFullYear().toString()+"-"+ (date.getMonth()+1).toString()+"-"+date.getDate().toString();
      },
	  err => console.log('Error occurred while getting date: ', err)
	);
  }
 showTimePicker() {
	var dt = new Date();
	if(this.tob != '') {
		dt.setHours(Number(this.tob.split(':')[0]));
		dt.setMinutes(Number(this.tob.split(':')[1]));
	}
	this.datePicker.show({
	  date: dt,
	  mode: 'time',
	  androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
	}).then(
	  date => {
        this.tob = date.getHours().toString()+":"+date.getMinutes().toString();
      },
	  err => console.log('Error occurred while getting date: ', err)
	);
 }

    ionViewDidEnter() {
		console.log('report', 'ionViewDidEnter');
  }
  selDOB(evt, pd)
  {
    evt.stopPropagation();
    console.log(pd);
	//pd.fetch = !pd.fetch;
	for(let i = 0; i < this.oBirth.length; i++)
	{
		if(this.oBirth[i].dob == pd.dob) { 
		    console.log(pd.dob, pd.fetch);
			this.oBirth[i].fetch = pd.fetch; break; 
			}
	}
  }
  lanSel(lan)
  {
     this.lan = lan;
  }
  chartSel(cht) {
   this.chtyp = cht;
 } 
 ayanSel(aynm) {
   this.aynm = aynm;
 }
  
  paymSel(paym)
  {
     this.paym = paym;
  }
  razpay(amt) {
	  console.log('razpay',amt);
    let paise: number = Math.floor(amt*100);
	let ccy: string = 'INR';
	let ccode = this.shareService.getCCODE();
	if(ccode && ccode != '' && ccode != 'IN') {
	  paise = Math.floor(amt*1.4);
	  ccy = 'USD';
	}
	   
    var options = {
      description: '126 Astrology - Personalized Report',
      image: 'https://i.imgur.com/YBQF1iV.png',
      currency: ccy, //'INR',
      key: 'rzp_live_B8Zi7S5GIm9G94',
      amount: paise,
      name: '126 Astrology',
      prefill: {
        email: this.eml,
        contact: this.mob,
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
		this.showPM = false;
		this.info = 'Your payment is processed successfully. You will receive your order in 24hrs. For any questions please write to us info@mypubz.com';
		this.processReq();
    };

    var cancelCallback = (error) => {
      alert(error.description + ' (Error ' + error.code + ')');
    };
    console.log('razorpaycheckout');
    RazorpayCheckout.open(options, successCallback, cancelCallback);
  }
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
        type: this.store.CONSUMABLE
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
	    this.showPM = false;
		this.info = 'Your payment is processed successfully. You will receive your order in 24hrs. For any questions please write to us info@mypubz.com';
		this.processReq();
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
  buy()
  {
	this.info = '';
	let c: number = 0;
	if(this.nam != '') {
		if(this.gen == '') { this.info = 'Please specify gender'; return; }
		if(this.dob == '') {this.info == 'Please enter date of birth'; return; }
		if(this.place == '') {this.info == 'Please enter place of birth'; return;}
		c++;
	}
	for(let i=0; i < this.oBirth.length; i++) {
		if(this.oBirth[i].fetch) c++;
	}
	if(c == 0) { this.info = 'Please specify atleast 1 Date of Birth'; return; }
	if(this.eml == '') {this.info = 'Please enter your Email id'; return; }
	this.showSU = false;
	if(this.ast) this.processReq();
	else {
		this.product.gpid = 'com.mypubz.eportal.rep99';
		if(this.paym == 'rpay') this.pc = 99;
		let vl: number =  this.pc;
		if(this.paym == 'rpay') this.razpay(c*vl);
		else this.init_pur_and_complete();
	}
  }
  save()
  {
	//this.info = '';
	let c: number = 0;
	if(this.nam != '') {
		if(this.gen == '') { this.info = 'Please specify gender'; return; }
		if(this.dob == '') {this.info == 'Please enter date of birth'; return; }
		if(this.tob == '') {this.info == 'Please enter time of birth'; return; }
		if(this.place == '') {this.info == 'Please enter place of birth'; return;}
		c++;
	}
	for(let i=0; i < this.oBirth.length; i++) {
		if(this.oBirth[i].fetch) c++;
	}
	if(c == 0) { this.info = 'Please specify atleast 1 Date of Birth'; return; }
	if(this.eml == '') {this.info = 'Please enter your Email id'; return; }
	//this.info = '';
	this.showSU = false;
	this.info2 = 'Your request is processed successfully. You will receive your report in 24hrs. For any questions please write to us info@mypubz.com';
	this.processReq();
  }
  enter()
  {
	  this.showH = false;
	  this.showN = true;
  }
  choose()
  {
	  this.showH = true;
	  this.showN = false;
  }
  subscribe()
  {
	  this.router.navigate(['/subscribe']);
  }
  processReq()
  {
	  let c: number = 0;
	  let dobs: string = '';
	if(this.nam != '') {
		if(this.gen == '') { this.info = 'Please specify gender'; return; }
		if(this.dob == '') {this.info == 'Please enter date of birth'; return; }
		if(this.place == '') {this.info == 'Please enter place of birth'; return;}
		dobs = this.dob + 'T' + this.tob + ':00Z' + 'L' + this.shareService.getLAT() + ',' + this.shareService.getLNG() + '@' + this.shareService.getTimezone() + '%' + this.dstofset.toString() + '#' + this.nam + '&' + this.gen + '&'  + this.place;
		dobs += '|';
		c++;
	}
	for(let i=0; i < this.oBirth.length; i++) {
		if(this.oBirth[i].fetch) {
			dobs += this.oBirth[i].dob;
			dobs += '|';
			c++;
		}
		if(c > 9) break;
	}
	this.horoService.addReport(this.device.uuid, dobs, this.chtyp, this.aynm, this.lan, this.eml, this.mob)
		.subscribe(res => {
			if(res['status'] != 'E') {
				this.info = '<strong>Submitted successfully, we will send you the report(s) to your mail id in 24hrs.</strong>';
			} else {
			   this.info2 = 'There was some internal failure, we regret inconvinience. Please try after some time.';
			}
		}, (err) => {
			this.info2 = JSON.stringify(err);
		});	  
	  
  }
  updateSearch() {
    console.log('updateSearch');
    if (this.autocomplete.query == '' || this.autocomplete.query.length < 3 || this.autocomplete.query == this.place) {
     this.autocompleteItems = [];
     return;
    }

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
		   this.dstofset = res2['dstOffset'];
		   console.log(res2['timeZoneId']);
		   this.info = '';
		}, (err) => {
		  console.log(err);
		  this.info = err;
		}) ;

   });
 }
 smrep(evt, lng) {
	   switch(lng)
	   {
		   case 'HI':
		       this.dbtn1 = 'Please wait..';
			   break;
		   case 'EN':
		       this.dbtn2 = 'Please wait..';
			   break;
		   case 'TA':
		       this.dbtn3 = 'Please wait..';
			   break;
		   case 'TE':
		       this.dbtn4 = 'Please wait..';
			   break;
			default:
			   break;
	   }
		//this.info2 = 'Generating the report, please wait..';
		evt.stopPropagation();
		let snam: string = 'John Doe';
		let sgen: string  = 'M';
		let sdob: string = '30-8-1930';
		let stob: string = '15:0:0';
		let saddr: string = 'Omaha, Nebraska, United States';
		let slat: number = 41.2565;
		let slng: number = 95.9345;
		let stz: string = 'America/Chicago';
		let sdstofset: number = -5;
		let sayn: number = 4;
		let schtyp: string = 'nind';
		this.showSU = false;
		let simg: string = 'https://i.imgur.com/9gRr3ME.jpg';
		let scnme: string = 'VEDIC HOROO';
		let scnum: string = '+919010263567';
		let sceml: string = 'info@vedichoroo.com';
	console.log(this.dob, this.tob);
	this.horoService.downloadPdfEx(this.device.uuid, snam, sgen, sdob+'T'+stob + 'Z', saddr, slat.toString(), slng.toString(), stz, sdstofset, sayn, lng, schtyp, simg, scnme, scnum, sceml)
	.subscribe(res => {
           let fpth: string = this.file.externalDataDirectory;
		let fn = this.nam.split(' ').join() + Date.now() + '.pdf';
		this.file.writeFile(fpth,  fn, res, {replace: true, append: false})
		.then(res =>  {
			console.log('success');
                //success
				this.shareService.setREP(this.nam+'$'+this.dob + '$'+ fn);
				console.log('show pdf 2', this.file.externalDataDirectory+fn)
				this.info2 = '';
			   switch(lng)
			   {
				   case 'HI':
					   this.dbtn1 = 'Download Sample Report(Hindi)';
					   break;
				   case 'EN':
					   this.dbtn2 = 'Download Sample Report(English)';
					   break;
				   case 'TA':
					   this.dbtn3 = 'Download Sample Report(Tamil)';
					   break;
				   case 'TE':
					   this.dbtn4 = 'Download Sample Report(Telugu)';
					   break;
					default:
					   break;
			   }
				this.showPdf(fpth+fn);
           }, function(error) {
            });	
    }, (err) => {
			   switch(lng)
			   {
				   case 'HI':
					   this.dbtn1 = 'Failed! Please report to help desk';
					   break;
				   case 'EN':
					   this.dbtn2 = 'Failed! Please report to help desk';
					   break;
				   case 'TA':
					   this.dbtn3 = 'Failed! Please report to help desk';
					   break;
				   case 'TE':
					   this.dbtn4 = 'Failed! Please report to help desk';
					   break;
					default:
					   break;
			   }
		
		console.log(err);
	});
 }
 showPdf(fl) {
	 this.platform.ready().then(() => {
			this.fileOpener.open(fl, 'application/pdf');
	 });
 }
}


