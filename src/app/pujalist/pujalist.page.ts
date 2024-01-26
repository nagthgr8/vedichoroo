import { Component, OnInit, NgModule, ViewEncapsulation, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { Puja } from '../puja';

@Component({
  selector: 'app-pujalist',
  templateUrl: './pujalist.page.html',
  styleUrls: ['./pujalist.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PujalistPage implements OnInit {

  info: string = '';
  pujas: any;
  ast: any;
  constructor(private router: Router, public platform: Platform,  private device: Device, public horoService: HoroscopeService, private shareService: ShareService) 
  { 
       this.info = 'Loading, please wait..';
	   this.horoService.getPujas()
	   .subscribe(pujs => {
		   this.pujas = pujs
		 this.info = '';
	   }, (err) => {
	     console.log(err);
		 this.info = JSON.stringify(err);
		 
	   });
}

  ngOnInit() {
	  this.ast = this.router.getCurrentNavigation().extras.state;
  }
  viewprof(event, p) {
	 event.stopPropagation();
	let walnk = 'https://wa.me/' + this.ast.mob + '?text=I%20want%20to%20know%20about%20Online%20Puja%20'+p.name;
	 window.location.href = walnk;
  }
  booknow(event, p) {
	  event.stopPropagation();
	this.horoService.talkToAstro('sanketh', this.device.uuid+ '|' + this.shareService.getCLAT().toString() + ',' + this.shareService.getCLNG().toString(), 'PB')
	   .subscribe(res => {
	   }, (err) => {
	     console.log(err);
	   });	 
	  
	  		//this.router.navigate(['/puja-booking'], {queryParams: {name: p.name}});
	let walnk = 'https://wa.me/' + this.ast.mob + '?text=I%20want%20to%20book%20for%20Online%20Puja%20'+p.name;
	 window.location.href = walnk;
  }
}
