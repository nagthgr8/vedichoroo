import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HoroscopeService } from '../horoscope.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
})
export class TicketsPage implements OnInit {
  ticks : any ;
  info: string = '';
  constructor(public router: Router, public horoService: HoroscopeService) { 
  }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.info = 'Loading, please wait..';
	   this.horoService.getTickets()
	   .subscribe(res => {
		 this.ticks = res;
		 this.info = '';
	   }, (err) => {
	     console.log(err);
		 this.info = JSON.stringify(err);
	   });
  }

  viewprof(event, tick) {
   event.preventDefault();	 
   console.log(tick);
   this.router.navigate(['/ticket-detail'], {state: tick});
  }

}
