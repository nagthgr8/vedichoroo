import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HoroscopeService } from '../horoscope.service';
import { Report } from '../report';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  objectKeys = Object.keys;
  oRep :Report[] = [];
  info: string = '';

  constructor(public router: Router, public horoService: HoroscopeService) { 
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.info = 'Loading, please wait..';
	   this.horoService.getAllReports()
	   .subscribe(res => {
	     this.publishReport(res);
		 this.info = '';
	   }, (err) => {
	     console.log(err);
		 this.info = JSON.stringify(err);
		 
	   });
  }
  publishReport(oa: any)
  {
	     for(var i = 0; i < oa.length; i++) {
			console.log(i, oa[i]);
			let rep: Report = {
					uuid: oa[i].uuid,
					guid: oa[i].guid,
					dob: oa[i].dob,
					dob_short: '',
					chtyp: oa[i].chtyp,
					aynm: oa[i].aynm,
					lan: oa[i].lan,
					eml: oa[i].eml,
					mob: oa[i].mob,
					lnk: '',
					reqdt: oa[i].reqdt,
					status: oa[i].status,
					avl: (oa[i].lnk != '') ? true : false,
					name: ''
					};
			this.oRep[i] = rep;			
		 }
  
  }

  viewprof(event, rep) {
   event.preventDefault();	 
   console.log(rep.dob);
   let r: any = {};
   r.uuid = rep.uuid;
   r.guid = rep.guid;
   r.dob = rep.dob;
   r.chtyp = rep.chtyp,
   r.aynm = rep.aynm;
   r.lan = rep.lan;
   r.eml = rep.eml;
   r.mob = rep.mob;
   this.router.navigate(['/order-detail'], {state: r});
  }

}
