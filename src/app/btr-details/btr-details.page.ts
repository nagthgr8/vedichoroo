import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { BirthInfo } from '../birth-info';
declare var google; 

@Component({
  selector: 'app-btr-details',
  templateUrl: './btr-details.page.html',
  styleUrls: ['./btr-details.page.scss'],
})
export class BtrDetailsPage implements OnInit {
 oBirth :BirthInfo[] = [];
 service = new google.maps.places.AutocompleteService();
autocomplete;
  autocompleteItems;
   address;
   //personalDetailsForm: FormGroup;
   info: string = '';
   info2: string = '';
 showSU: boolean = false;
 showPM: boolean = true;
 showH: boolean = false;
 showN: boolean = false;
 aynm: string = 'LAH';
 paym: string = 'rpay';
 tit: string = 'Enter Your Birth Details'
   dob: string = '';
   tob: string = '';
   place: string = '';
   lat: number = 0;
   lng: number = 0;
   dstofset: number = 0;
   tzn: string = '';
   nam: string='';
   gen: string = '';
   mob: string = '';
   eml: string = '';
   ast: boolean = false;
   his: boolean = true;
  id: string = '';
  showBK: boolean = false;
  bnm: string = 'Submit';
  binf1:  BirthInfo = null;
  binf2: BirthInfo = null;
  sbinf: BirthInfo = null; 
  sdb: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private zone: NgZone, public platform: Platform, private datePicker: DatePicker, public shareService: ShareService, public horoService: HoroscopeService) 
  { 
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  ngOnInit() {
	  let btd = this.router.getCurrentNavigation().extras.state;
      this.id = btd.id;
	  if(btd.binf) this.binf1 = btd.binf;
	this.platform.ready().then(() => {
	  if(this.id != 'RAM' && this.id != 'REV') { this.bnm = 'Next';  } 
		  switch(this.id)
		  {
			  case 'RGY':
			      this.tit = 'Enter Younger Coborn Birth Details';
			      break;
			  case 'RGE':
			      this.tit = 'Enter Elder Coborn Birth Details';
			      break;
			  case 'RGM':
			      this.tit = 'Enter Mothers Birth Details';
			      break;
			  case 'RGF':
			      this.tit = 'Enter Father Birth Details';
			      break;
			  case 'REV':
			     break;
			  default:
			     break;
		  }
		  this.bnm = 'Submit';
	   
	   this.shareService.plan.subscribe((pln) => {
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
						//db = dob.split('L')[0].trim();
						console.log('db', db);
						lat = db.split('L')[1].split(',')[0].trim();
						lng = db.split('L')[1].split(',')[1].trim();
						tz = (dob.indexOf('$') > -1) ? dob.split('@')[1].split('$')[0] : dob.split('@')[1].split('#')[0];
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
					//if(j == 1) {
					//	this.nam = nam;
					//	this.gen = gen;
					//	this.dob = dob.split('T')[0];
					//	this.tob = dob.split('T')[1].split('L')[0].slice(0,-1);
					//}
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
  sub() {
	if(this.bnm == 'Next' || this.id == 'RAM') this.binf1 = this.sbinf;
	else this.binf2 = this.sbinf;
	  if(this.bnm == 'Next') {
		  if(this.showN == true ) {
			if(this.nam != '') {
				if(this.gen == '') { this.info = 'Please specify gender'; return; }
				if(this.dob == '') {this.info == 'Please enter date of birth'; return; }
				if(this.place == '') {this.info == 'Please enter place of birth'; return;}
			}
			this.binf1.dob = this.dob;
			this.binf1.dob_short = this.dob;
			this.binf1.gender = this.gen;
			this.binf1.lat = this.lat.toString();
			this.binf1.lng = this.lng.toString();
			this.binf1.timezone = this.tzn;
			this.binf1.dstofset = this.dstofset;
		  }
		  switch(this.id)
		  {
			  case 'RGY':
			      this.tit = 'Enter Younger Coborn Birth Details';
			      break;
			  case 'RGE':
			      this.tit = 'Enter Elder Coborn Birth Details';
			      break;
			  case 'RGM':
			      this.tit = 'Enter Mothers Birth Details';
			      break;
			  case 'RGF':
			      this.tit = 'Enter Father Birth Details';
			      break;
			  case 'REV':
			     break;
			  default:
			     break;
		  }
		  this.bnm = 'Submit';
		  this.showBK = true;
	  } 
	  else if(this.bnm == 'Submit' ) {
		  if(this.showN == true) {
			if(this.nam == '') { this.info = 'Please enter name'; return; }
				if(this.gen == '') { this.info = 'Please specify gender'; return; }
				if(this.dob == '') {this.info == 'Please enter date of birth'; return; }
				if(this.place == '') {this.info == 'Please enter place of birth'; return;}
			if(this.id == 'RAM' || this.id == 'REV') {
				this.binf1.dob = this.dob;
				this.binf1.dob_short = this.dob;
				this.binf1.gender = this.gen;
				this.binf1.lat = this.lat.toString();
				this.binf1.lng = this.lng.toString();
				this.binf1.timezone = this.tzn;
				this.binf1.dstofset = this.dstofset;
			} else {
				this.binf2.dob = this.dob;
				this.binf2.dob_short = this.dob;
				this.binf2.gender = this.gen;
				this.binf2.lat = this.lat.toString();
				this.binf2.lng = this.lng.toString();
				this.binf2.timezone = this.tzn;
				this.binf2.dstofset = this.dstofset;
			}
			
		  } else {
		  }
			if(this.id == 'RAM' || this.id == 'REV') {
				let btr: any = {};
				btr.binf1 = this.binf1;
				btr.binf2 = null;
				btr.id = this.id;
				this.router.navigate(['/btr-report'], {state: btr});
			} else {
				this.binf2.dob = this.dob;
				this.binf2.gender = this.gen;
				this.binf2.lat = this.lat.toString();
				this.binf2.lng = this.lng.toString();
				this.binf2.timezone = this.tzn;
				this.binf2.dstofset = this.dstofset;
				let btr: any = {};
				btr.binf1 = this.binf1;
				btr.binf2 = this.binf2;
				btr.id = this.id;
				this.router.navigate(['/btr-report'], {state: btr});
			}
		  
	  }
  }
  selDOB(evt, pd)
  {
    evt.stopPropagation();
    console.log(pd);
	for(let i = 0; i < this.oBirth.length; i++)
	{
		if(this.oBirth[i].dob != pd.dob && this.oBirth[i].fetch == true ) { 
			this.oBirth[i].fetch = false; break; 
			}
	}
	this.sbinf = pd;
	this.sdb = pd.dob_short;
	pd.fetch = !pd.fetch;
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
    this.lat = results[0].geometry.location.lat();
    this.lng = results[0].geometry.location.lng();
	//let utc_offset: number = 0;
	//if(results[0].geometry.hasOwnProperty('utc_offset'))
		//utc_offset = results[0].geometry.utc_offset;
    this.horoService.getTimezone(results[0].geometry.location.lat(), results[0].geometry.location.lng(), (Math.round((new Date().getTime())/1000)).toString())
		.subscribe(res2 => {
		   console.log(res2['timeZoneId']);
		   this.dstofset = res2['dstOffset'];
		   this.tzn = res2['timeZoneId'];
		   this.info = '';
		}, (err) => {
		  console.log(err);
		  this.info = err;
		}) ;

   });
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
}
