import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HoroscopeService } from '../horoscope.service';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.page.html',
  styleUrls: ['./ticket-detail.page.scss'],
})
export class TicketDetailPage implements OnInit {
	info: string = '';
  tick: any;
  tres: string = '';
  constructor(public router: Router, public horoService: HoroscopeService) { 
  }

  ngOnInit() {
   this.tick = this.router.getCurrentNavigation().extras.state;
 }
  save() {
	   this.info = 'Please wait..';
		this.horoService.addTicketResp(this.tick.uuid, this.tick.guid, this.tres)
		.subscribe(res => {
			//this.showSU = false;
			this.router.navigate(['/tickets'], {replaceUrl: true});
		}, (err) => {
			this.info = JSON.stringify(err);
		});	  
  }
}
