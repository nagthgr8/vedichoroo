import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { DatePicker } from '@capacitor-community/date-picker';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { BirthInfo } from '../birth-info';
declare var google; 

const selectedTheme = "dark";


@Component({
  selector: 'app-btr-detail-rel',
  templateUrl: './btr-detail-rel.page.html',
  styleUrls: ['./btr-detail-rel.page.scss'],
})
export class BtrDetailRelPage implements OnInit {
 oBirth :BirthInfo[] = [];
 service = new google.maps.places.AutocompleteService();
autocomplete;
  autocompleteItems;
   address;
   //personalDetailsForm: FormGroup;
   info: string = '';
   info2: string = '';
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
  binf1:  any = {};
  binf2: any = {};
  sbinf: any = {}; 
  sdb: string = '';
  constructor(private router: Router, private route: ActivatedRoute, private zone: NgZone, public platform: Platform, public shareService: ShareService, public horoService: HoroscopeService) 
  { 
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  ngOnInit() {
	  let btd = this.router.getCurrentNavigation().extras.state;
	  console.log('btd', btd);
      this.id = btd.id;
	  console.log('id', this.id);
	  if(btd.binf1) this.binf1 = btd.binf1;
	this.platform.ready().then(() => {
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
	   
	   this.shareService.getPLAN().then((pln) => {
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
	 this.binf2 = this.sbinf;
		  if(this.showN == true) {
			if(this.nam == '') { this.info = 'Please enter name'; return; }
				if(this.gen == '') { this.info = 'Please specify gender'; return; }
				if(this.dob == '') {this.info == 'Please enter date of birth'; return; }
				if(this.place == '') {this.info == 'Please enter place of birth'; return;}
				this.binf2.dob = this.dob + 'T' + this.tob;
				this.binf2.dob_short = this.dob + 'T' + this.tob;
				this.binf2.gender = this.gen;
				this.binf2.lat = this.lat.toString();
				this.binf2.lng = this.lng.toString();
				this.binf2.timezone = this.tzn;
				this.binf2.dstofset = this.dstofset;
		  } else {
				//this.binf2.dob = this.dob;
				//this.binf2.gender = this.gen;
				//this.binf2.lat = this.lat.toString();
				//this.binf2.lng = this.lng.toString();
				//this.binf2.timezone = this.tzn;
				//this.binf2.dstofset = this.dstofset;
			}
				let btr: any = {};
				btr.binf1 = this.binf1;
				btr.binf2 = this.binf2;
				btr.id = this.id;
				console.log('binf1', this.binf1);
				console.log('binf2', this.binf2);
				this.router.navigate(['/btr-report'], {state: btr});
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
	this.sub();
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
	//this.sub();
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
		   this.sub();
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
  back()
  {
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
		theme: selectedTheme,
	  }).then(odt => {
		console.log('selected date', odt.value);
		var ldt = odt.value.split('/');
		this.dob = ldt[2]+"-"+ ldt[1] +"-"+ ldt[0];
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
		mode: 'time',
		theme: selectedTheme,
	  }).then(odt => {
		console.log('selected time: ', odt.value);
		const selectedTime = new Date(odt.value);
		const formattedTime = `${selectedTime.getHours().toString().padStart(2, '0')}:${selectedTime.getMinutes().toString().padStart(2, '0')}:${selectedTime.getSeconds().toString().padStart(2, '0')}`;
		this.tob = formattedTime;
		console.log('tob', this.tob);
		},
		err => console.log('Error occurred while getting date: ', err));
 }
}

