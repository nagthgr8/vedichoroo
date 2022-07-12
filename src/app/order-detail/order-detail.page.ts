import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HoroscopeService } from '../horoscope.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit {
	info: string = '';
  rep: any;
 aynm: string = 'LAH';
 lan: string = 'EN';
 chtyp: string = 'North Indian';
   dob: string = '';
   lat: string = '';
   lng: string = '';
   nam: string='';
   gen: string = '';
   tz: string = '';
   mob: string = '';
   eml: string = '';
   lnk: string = '';
  constructor(public router: Router, public horoService: HoroscopeService) { 
  }

  ngOnInit() {
   this.rep = this.router.getCurrentNavigation().extras.state;
    this.mob = this.rep.mob;
   this.eml = this.rep.eml;
   this.chtyp = this.rep.chtyp;
   this.aynm = this.rep.aynm;
   this.lan = this.rep.lan;   
   let db: string = this.rep.dob;
   let nam: string = '';
   let gen: string = '';
   let lat: string = '';
   let lng: string = '';
	let tz: string = '';
	if(db.indexOf('L') > -1) {
		this.dob = db.split('L')[0].trim();
		this.lat = db.split('L')[1].split('@')[0].split(',')[0].trim();
		this.lng = db.split('L')[1].split('@')[0].split(',')[1].trim();
		let tng: string = db.split('L')[1].split('@')[1];
		if(tng.indexOf('#') > -1) {
			this.tz = tng.split('#')[0];
			var ng = tng.split('#')[1];
			this.nam = ng.split('&')[0];
			this.gen = ng.split('&')[1];
		}
	}
 }
  save() {
	if(this.lnk.trim() != '')  {
		this.horoService.updateReport(this.rep.uuid, this.rep.guid, this.lnk)
		.subscribe(res => {
			if(res['status'] != 'E') {
				this.router.navigate(['/order'], {replaceUrl: true});
				//this.info = '<strong>Thank you for contacting our Help Desk. We will respond you shortly</strong>';
			} else {
			   this.info = 'There was some internal failure, we regret inconvinience. Please try after some time.';
			}
		}, (err) => {
			this.info = JSON.stringify(err);
		});	  
		
	} else {
		this.router.navigate(['/order'], {replaceUrl: true});
	}
  }
}
