import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { HoroscopeService } from '../horoscope.service';

@Component({
  selector: 'app-kp-event',
  templateUrl: './kp-event.page.html',
  styleUrls: ['./kp-event.page.scss'],
})
export class KpEventPage implements OnInit {
  tns: any;
  dt: string;
  pl: string;
  sgn: string;
  str: string;
  strl: string;
  subl: string;
  constructor(private router: Router, public horoService: HoroscopeService, private translate: TranslateService) { }

  ngOnInit() {
  	this.tns = this.router.getCurrentNavigation().extras.state;
	this.dt = this.tns.t.date;
	this.pl = this.tns.p.name;
	this.sgn = this.tns.t.sgn;
	this.str = this.tns.nak;
	this.strl = this.tns.p.star;
	this.subl = this.tns.p.sub;
	
  }
  subscribe() {
	  this.router.navigate(['/subscribe']);
  }
   showInf(tpc) {
	this.horoService.getArticle(tpc)
	.subscribe(res => {
		//this.info = '';
		if(res['title'].indexOf('ERROR') == -1)
			this.router.navigate(['/article'], {state: res});
	}, (err) => {
//		this.info = JSON.stringify(err);
	});
  }

}
