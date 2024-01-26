import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import {
  CalendarModal,
  CalendarModalOptions,
  DayConfig,
  CalendarResult
} from 'ion7-calendar';

@Component({
  selector: 'app-puja-booking',
  templateUrl: './puja-booking.page.html',
  styleUrls: ['./puja-booking.page.scss'],
})
export class PujaBookingPage implements OnInit {
  date: string;
  type: string;
  info: string = '';
   mob: string = '';
   eml: string = '';
   nam: string = '';
   bkd: string = '';
   got: string = '';
   pnam: any;
      paym: string = 'rpay';

  constructor(private router: Router, public modalCtrl: ModalController) { }

  ngOnInit() {
	this.pnam = this.router.getCurrentNavigation().extras.state;

        console.log('pnam', this.pnam); 
	  }
async openCal() {
    const options: CalendarModalOptions = {
      title: 'CHOOSE PUJA DATE'
    };
 
    const myCalendar = await this.modalCtrl.create({
      component: CalendarModal,
      componentProps: { options }
    });
 
    myCalendar.present();
 
    const event: any = await myCalendar.onDidDismiss();
    const date: CalendarResult = event.data;
	this.bkd = date.string;
    console.log(date);
  }  
  book($evt) {
	  console.log($evt);
  }
   paymSel(paym)
  {
     this.paym = paym;
  }
}
