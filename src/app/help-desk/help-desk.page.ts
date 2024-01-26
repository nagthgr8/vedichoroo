import { Component, OnInit } from '@angular/core';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { HoroscopeService } from '../horoscope.service';

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.page.html',
  styleUrls: ['./help-desk.page.scss'],
})
export class HelpDeskPage implements OnInit {
  ticks : any ;
  cat: string = '';
  sub: string = '';
  msg: string = '';
  info: string = '';
  showSU: boolean;
  constructor(public device: Device, public horoService: HoroscopeService) { 
 	this.showSU = true;
 }

  ngOnInit() {
	this.cat = '';
	this.sub = '';
	this.msg = ''
	   this.horoService.getTicketResps(this.device.uuid)
	   .subscribe(res => {
		 this.ticks = res;
	   }, (err) => {
	     console.log(err);
		 this.info = JSON.stringify(err);
	   });
  }
  save(evt)
  {
	evt.stopPropagation();
    if(this.cat.trim().length == 0) {
		this.info = 'Please select the category';
		return;
	} 
	if(this.sub.trim().length == 0) {
		this.info = 'Please enter subject line';
		return;
	}
	if(this.msg.trim().length == 0) {
		this.info = 'Please enter the message';
		return;
	} else {
		this.showSU = false;
		this.info = "Submitting...";
		this.horoService.addTicket(this.device.uuid, this.cat, this.sub, this.msg)
		.subscribe(res => {
			//this.showSU = false;
			if(res['guid'] != '') {
				this.info = '<strong>Thank you for contacting our Help Desk. We will respond you shortly</strong>';
			} else {
			   this.info = 'There was some internal failure, we regret inconvinience. Please try after some time.';
			}
		}, (err) => {
			this.info = JSON.stringify(err);
		});	  
	}
  }
  
}
