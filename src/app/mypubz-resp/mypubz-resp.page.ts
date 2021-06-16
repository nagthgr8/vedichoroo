import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location  } from '@angular/common';
import { Device } from '@ionic-native/device/ngx';
import { HoroscopeService } from '../horoscope.service';
import { HomePage } from '../home/home.page';
import { SubscribePage } from '../subscribe/subscribe.page';

@Component({
  selector: 'app-mypubz-resp',
  templateUrl: './mypubz-resp.page.html',
  styleUrls: ['./mypubz-resp.page.scss'],
})
export class MypubzRespPage implements OnInit {
  mpz: any;
  guid: any;
  uuid: any;
  msg: any;
  constructor(private router: Router, private location: Location, public device: Device, public horoService: HoroscopeService) { 
  }

  ngOnInit() {
 	let tkt: any = this.router.getCurrentNavigation().extras.state;
	this.guid = tkt.guid;
	this.uuid = tkt.uuid;
	this.mpz = tkt.resp;
 }
  save(evt)
  {
	evt.stopPropagation();
	this.location.back();
	//this.router.navigate(['/home'], {replaceUrl: true});
  }
  back() {
	this.location.back();
  }
}
