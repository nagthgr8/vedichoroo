import { Component, OnInit, ViewEncapsulation, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { DatePicker } from '@capacitor-community/date-picker';
import * as o_rashis from '../o_rashis.json';
import * as ruler_name from '../ruler_name.json';
declare var google; 

@Component({
  selector: 'app-kp-transit',
  templateUrl: './kp-transit.page.html',
  styleUrls: ['./kp-transit.page.css'],
  encapsulation: ViewEncapsulation.None
})
export class KpTransitPage implements OnInit {
  autocomplete;
  autocompleteItems;
   service = new google.maps.places.AutocompleteService();
   o_rashis_v: any = (o_rashis as any).default;
   ruler_name_v: any = (ruler_name as any).default;
   kpd: any;
   day: number = 0; mon: number = 0; year: number; hou: number = 0; min: number = 0; sec: number = 0;
   desc: string = '';info: string = '';
   dob: string = ''; tob: string = '';
   showP: boolean = false; showL: boolean = true;
   place: string = '';
  constructor(private router: Router, private zone: NgZone, public shareService: ShareService, public horoService: HoroscopeService) { 
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }
  
  ngOnInit() {
	this.kpd = this.router.getCurrentNavigation().extras.state;
	console.log('ngOnInit', this.kpd);
	var cdt = new Date();
	this.day = cdt.getDate();
	this.mon = cdt.getMonth()+1;
	this.year = cdt.getFullYear();
	this.hou = cdt.getHours();
	this.min = cdt.getMinutes();
	this.sec = cdt.getSeconds();
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
		this.dob = date.getFullYear().toString()+"-"+ (date.getMonth()+1).toString()+"-"+date.getDate().toString();
		},
		err => console.log('Error occurred while getting date: ', err));
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
	 
	if(this.day == null || this.mon == null || this.year == null) {
		this.info = 'Please enter date';
		return;
	} else {
       // this.dob = this.year.toString()+'-'+ this.mon.toString()+'-'+this.day.toString();
	}
	if(this.hou == null || this.min == null) {
		this.info = 'Please enter time';
		return;
	} else  {
		//let s = (this.sec == null) ? '00Z':this.sec.toString()+'Z';
      //  this.tob = this.hou.toString()+':'+this.min.toString()+':'+s ;
	}
	if(!this.isValidDate(this.day, this.mon, this.year, this.hou, this.min, (this.sec == null) ? 0 : this.sec)) {
		this.info = 'Please enter valid date & time';
		return;
	}
	var cdt = new Date(this.year, this.mon-1, this.day);
	cdt.setHours(this.hou, this.min, this.sec, 0);
	console.log('date',  cdt.toString());
	let ayanid: number = 3;
	var kres = this.shareService.getKAYNM();
	if(kres) ayanid = Number(kres);
	for(let key of Object.keys(this.kpd.vim)) {
		    if(this.kpd.vim[key].type != 'PDAS') continue;
			let dts: any = this.kpd.vim[key].per.split('To');
			var sdt = new Date(Number(dts[0].trim().split('/')[2]), Number(dts[0].trim().split('/')[1])-1, Number(dts[0].trim().split('/')[0]));
			sdt.setHours(0,0,0,0);
			var edt = new Date(Number(dts[1].trim().split('/')[2]), Number(dts[1].trim().split('/')[1])-1, Number(dts[1].trim().split('/')[0]));
			edt.setHours(0,0,0,0);
		if(cdt >= sdt && cdt <= edt) {
			console.log('lord', this.kpd.vim[key].lord);
			let mdasl = this.kpd.vim[key].lord.split('-')[0].toLowerCase();
			let adasl = this.ruler_name_v[this.kpd.vim[key].lord.split('-')[1].toLowerCase()];
			let pdasl = this.ruler_name_v[this.kpd.vim[key].lord.split('-')[2].toLowerCase()];
			console.log('mdasl', mdasl);
			console.log('adasl', adasl);
			console.log('pdasl', pdasl);
			this.desc = '<span>Maha Dasha: ' + mdasl + '</span><br><span>Antar Dasha: ' + adasl + '</span><br><span>Pratyantar Dasha: ' + pdasl + '</span><br>';   
			this.info = 'Calculating...';
			this.horoService.getDashTrans4DT(cdt, mdasl, adasl, pdasl, this.shareService.getCLAT(), this.shareService.getCLNG(), Intl.DateTimeFormat().resolvedOptions().timeZone, ayanid)
				.subscribe(trns => {
					//[{"date":"THU Feb 03,2022 20:00:00","sssl":"saturn-sun-rahu|uttaraashada-cp-0.14.0 Me,saturn-jupiter-saturn|purvabhadra-aq-21.58.45 Mo,jupiter-ketu-mercury|mula-sa-13.10.17 Ma,venus-sun-saturn|krittika-ta-3.35.22 Ra","mdras":"aq","mdnak":"shatabhisha","mdsub":"saturn-rahu-mercury","rupll":null,"rupml":null,"rupdl":null}]
					this.info = '';
					this.desc += '<span>Day Lord: ' + trns[0].rupdl +  '</span><br><span>Lagna Lord: ' + trns[0].rupll + '</span><br><span>Moon Lord: ' + trns[0].rupml+ '</span><br>';
					for(var i = 0; i < (<any>trns).length; i++) {
						let ssls: any = trns[i].sssl.split(',');
						for(var j = 0; j < ssls.length; j++) {
							let pn = this.ruler_name_v[ssls[j].split('|')[1].split('-')[2].split(' ')[1].toLowerCase()];
							let rs = this.o_rashis_v[ssls[j].split('|')[1].split('-')[1]].split('|')[1];
							let nk = ssls[j].split('|')[1].split('-')[0];
							console.log('pn', pn);
							console.log('rs', rs);
							console.log('nk', nk);
							this.desc += '<span> ' + pn.toUpperCase() +  ' </span> transits into <span class="greenText">' + rs + '</span> in the star <span class="greenText">' + nk.toUpperCase() + '</span> and in the SUB of <span class="redText">' + ssls[j].split('|')[0].split('-')[2].toUpperCase() + '</span><br>';
						}
					}
			}, (err) => {
			});
			break;
		}
	}
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
   enter()
   {
	   this.showL = false;
	   this.showP = true;
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
    this.kpd.lat = results[0].geometry.location.lat();
	this.kpd.lng = results[0].geometry.location.lng();
    this.horoService.getTimezone(results[0].geometry.location.lat(), results[0].geometry.location.lng(), (Math.round((new Date().getTime())/1000)).toString())
		.subscribe(res2 => {
		   this.kpd.timezone = res2['timeZoneId'];
		   this.kpd.dstofset = res2['dstOffset'];
		   console.log(res2['timeZoneId']);
		   this.info = '';
		}, (err) => {
		  console.log(err);
		  this.info = err;
		}) ;

   });
  }
 }
