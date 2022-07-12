import { Component, OnInit } from '@angular/core';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-my-earnings',
  templateUrl: './my-earnings.page.html',
  styleUrls: ['./my-earnings.page.scss'],
})
export class MyEarningsPage implements OnInit {
  erns: number = 0;
  cinf: any;
  constructor(private horoService: HoroscopeService, private shareService: ShareService) {
  }
  ngOnInit() {
	  this.horoService.getCallInfo(this.shareService.getUID())
	  .subscribe(res => {
		  this.cinf = res;
		  this.calc30dEarns(res);
	  });
   }
   calc30dEarns(calls) {
	   var cdt = new Date();
	   let totd: number = 0;
	   for(let i = 0; i < calls.length; i++) {
		   var dt = new Date(calls[i].date);
		   if(Math.abs(cdt.valueOf() - dt.valueOf()) < 31) {
			   totd += calls[i].duration;
		   }
	   }
	   this.erns = totd*21;
   }
   callinfo(evt, c) {
   }
   settle(evt, cid) {
   }
}
