import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Platform } from '@ionic/angular';
import { Device } from '@ionic-native/device/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import { CallService } from '../call.service';
import { Message } from '../message';
@Component({
  selector: 'app-astro-chat',
  templateUrl: './astro-chat.page.html',
  styleUrls: ['./astro-chat.page.scss'],
})
export class AstroChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
   cinf: any;
   messages: Message[] = [];
   newMsg = '';
   name: string = '';
   nmsgs: number = 0;
  constructor(private platform: Platform, private device: Device, private router: Router, private callService: CallService, private horoService: HoroscopeService, private shareService: ShareService, private location: Location) {
	//this.messages = [];  
	this.platform.backButton.subscribeWithPriority(10, () => {
        console.log('pressed back!');
		this.callService.closeConnection(this.cinf.iscaller);
		this.location.back();
	});
  }

  ngOnInit() {
     this.cinf = this.router.getCurrentNavigation().extras.state;
	 if(this.cinf.msg) {
		  var cdt = new Date();
		  let msg : Message = {
			  createdAt: cdt,
			  id: '',
			  from: this.cinf.name,
			  msg: this.cinf.msg,
			  fromName: this.cinf.name,
			  myMsg: false
		  };
		  this.messages[this.nmsgs++] = msg;
	 }
	 if(this.callService.getLog() != '') {
		  var cdt = new Date();
		  let msg : Message = {
			  createdAt: cdt,
			  id: '',
			  from: this.cinf.name,
			  msg: this.callService.getLog(),
			  fromName: this.cinf.name,
			  myMsg: false
		  };
		  this.messages[this.nmsgs++] = msg;
	 }
  	 this.shareService.getUPRO().then( upro => {
		if(upro) {
			if(upro['dob'].indexOf('#') > -1) {
				var ng = upro['dob'].split('#')[1];
				this.name = ng.split('&')[0];
			}
		}
	});
	this.callService.msgRecved$
		.subscribe(res => {
		  var cdt = new Date();
		  let msg : Message = {
			  createdAt: cdt,
			  id: '',
			  from: this.cinf.name,
			  msg: res,
			  fromName: this.cinf.name,
			  myMsg: false
		  };
		  this.messages[this.nmsgs++] = msg;
		});
		
	this.callService.isConnected$
		.subscribe(res => {
		  var cdt = new Date();
		  let msg : Message = {
			  createdAt: cdt,
			  id: '',
			  from: this.cinf.name,
			  msg: res,
			  fromName: this.cinf.name,
			  myMsg: false
		  };
		  this.messages[this.nmsgs++] = msg;
			
		});
}
 sendMessage() {
	 try {
	 this.callService.sendMsg(this.newMsg, this.cinf.iscaller);
	  var cdt = new Date();
	  console.log('msg sent');
	  let msg : Message = {
		  createdAt: cdt,
		  id: '',
		  from: this.device.uuid,
		  msg: this.newMsg,
		  fromName: this.name,
		  myMsg: true
	  };
	  console.log('adding msg');
	  this.messages[this.nmsgs++] = msg;
      this.newMsg = '';
      this.content.scrollToBottom();
	 } 
	 catch(e) {
		 console.log(e);
		  let msg : Message = {
			  createdAt: cdt,
			  id: '',
			  from: this.device.uuid,
			  msg: (e as Error).message,
			  fromName: this.name,
			  myMsg: true
		  };
		  this.messages[this.nmsgs++] = msg;
	 }
  }
}
