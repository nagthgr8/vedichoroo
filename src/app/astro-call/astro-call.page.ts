import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Device } from '@ionic-native/device/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import { CallService } from '../call.service';

@Component({
  selector: 'app-astro-call',
  templateUrl: './astro-call.page.html',
  styleUrls: ['./astro-call.page.scss'],
})
export class AstroCallPage implements OnInit {
  @ViewChild('vhoaudio', {static: true}) vhoAudio;
	str1: string = 'star-outline';
	str2: string = 'star-outline';
	str3: string = 'star-outline';
	str4: string = 'star-outline';
	str5: string = 'star-outline';
	rating: number = 0;
   cinf: any;
   btn: string = 'End Call';
   cdt: any;
   ticks: number = 0;
   cactv: boolean = false;
   showCI: boolean = false;
   sdt: string = '';
   edt: string = '';
   txt1: string = ''; txt2: string = '';
   img1: string = '';
   msg: string = '';
   info: string = '';
  constructor(private device: Device, private router: Router, private callService: CallService, private horoService: HoroscopeService, private shareService: ShareService, private location: Location) { 
  }
  ngOnInit() {
   this.cinf = this.router.getCurrentNavigation().extras.state;
   this.img1 = this.cinf.avatar;
  if(!this.cinf.iscaller) { 
      //  this.txt1 = 'Incomming call from ' + this.cinf.name;
		this.btn = 'Answer';
    } 
   else {
        this.txt1 = 'Ringing...';
   }
  // this.info = this.callService.getLog();
  	this.callService.isCallClosed$
		.subscribe(res => {
			console.log('isCallClosed$', res);
				//this.callService.destroyPeer();
				this.txt1 = 'Call Ended';
				this.showCI = true;
				this.cinf.starttime = this.cdt.getHours().toString() + ':' + this.cdt.getMinutes().toString() + ':' + this.cdt.getSeconds().toString();
				this.cdt.setSeconds(this.cdt.getSeconds() + this.ticks);
				this.cinf.endtime = this.cdt.getHours().toString() + ':' + this.cdt.getMinutes().toString() + ':' + this.cdt.getSeconds().toString();
				this.cinf.duration = this.ticks;
				if(this.cinf.iscaller) this.btn = 'Submit';
				else this.btn = 'Close';
				this.cactv = false;
				if(this.cinf.iscaller) {
					this.horoService.logCall(this.cinf)
					.subscribe(res => {
						//this.info = JSON.stringify(res);
					});
				} else { 
					this.horoService.setAstStatus(this.device.uuid, "A|" + this.shareService.getPeerId())
					.subscribe(stat => {
					});
				}
		});
	this.callService.isCallAnswered$
		.subscribe(res => {
			console.log('isCallAnswered$ triggered at astro-call');
			this.cdt = new Date();
			this.cinf.date = this.cdt.toISOString();
			this.txt1 = 'Talking to ' + this.cinf.name;
			this.cactv = true;
		   var intv = setInterval(() =>  {
			   if(this.cactv) {
					this.ticks++;
					this.txt2 =  this.cdt.getHours().toString() + ':' + this.cdt.getMinutes().toString() + ':' + this.cdt.getSeconds().toString() + '/' + this.tohms(this.ticks);
			   }
			},1000);
		});
	this.callService.isCallStarted$
		.subscribe(res => {
			console.log('isCallStarted$', res);
			this.info = this.callService.getLog();
			if(res) {
				if(this.cinf.iscaller) { 
					this.txt1 = 'Ringing...';
				} else {
					this.txt2 = this.callService.getCallerName();
				}
				//this.showCI = true;
				this.cactv = false;
			 } else {
				// this.txt1 = 'Call Ended';
				// this.showCI = true;
				// this.cinf.starttime = this.cdt.getHours().toString() + ':' + this.cdt.getMinutes().toString() + ':' + this.cdt.getSeconds().toString();
				// this.cdt.setSeconds(this.cdt.getSeconds() + this.ticks);
				// this.cinf.endtime = this.cdt.getHours().toString() + ':' + this.cdt.getMinutes().toString() + ':' + this.cdt.getSeconds().toString();
				// this.cinf.duration = this.ticks;
				// if(this.cinf.iscaller) this.btn = 'Submit';
				// else this.btn = 'Close';
				// this.cactv = false;
				// if(this.cinf.iscaller) {
					// this.horoService.logCall(this.cinf);
				// } else { 
					// this.horoService.setAstStatus(this.device.uuid, "A|" + this.shareService.getPeerId())
					// .subscribe(stat => {
					// });
				// }
			}
		});
	this.callService.remoteStream$
		.subscribe(res => {
			this.vhoAudio.nativeElement.srcObject = res;
			this.vhoAudio.nativeElement.play();
		});
}
  
  btnclick(evt) {
	  evt.stopPropagation();
	  this.info = '';
	  if(this.btn == 'Answer') {	
	    this.callService.sendMsg('call-accepted', this.cinf.iscaller);
		this.horoService.setAstStatus(this.device.uuid, "C|" + this.shareService.getPeerId())
				.subscribe(stat => {
				});
	    this.ticks = 0;
		this.cdt = new Date();
		this.cinf.date =this.cdt.toISOString();
		this.btn = 'End Call';
		this.cdt = new Date();
        this.txt1 = 'Talking to ' + this.cinf.name;
	  } else if(this.btn == 'Submit') { 
	       if(this.msg != '' && this.rating == 0) {
			   this.info = 'Please rate our astrologer';
		   } else if(this.msg != '' || this.rating > 0) {
			   this.save(evt);
			   this.location.back();
		   } else {
			   this.location.back();
		   }
	  } else if(this.btn == 'Close') { 
		  this.callService.cancelCall(this.cinf.iscaller);
		  this.callService.sendMsg('call-cancelled', this.cinf.iscaller);
		  this.location.back();
	  } else {
		  //this.cactv = false;
		     if(this.cdt) {
				this.txt1 = 'Call Ended';
				this.showCI = true;
				this.cinf.starttime = this.cdt.getHours().toString() + ':' + this.cdt.getMinutes().toString() + ':' + this.cdt.getSeconds().toString();
				this.cdt.setSeconds(this.cdt.getSeconds() + this.ticks);
				this.cinf.endtime = this.cdt.getHours().toString() + ':' + this.cdt.getMinutes().toString() + ':' + this.cdt.getSeconds().toString();
				this.cinf.duration = this.ticks;
				if(this.cinf.iscaller) this.btn = 'Submit';
				else this.btn = 'Close';
				this.cactv = false;
				if(this.cinf.iscaller) {
					this.horoService.logCall(this.cinf)
					.subscribe(res => {
					//	this.info = JSON.stringify(res);
					});
				} else { 
					this.horoService.setAstStatus(this.device.uuid, "A|" + this.shareService.getPeerId())
					.subscribe(stat => {
					});
				}
			  this.callService.sendMsg('call-ended', this.cinf.iscaller);
			  this.callService.closeConnection(this.cinf.iscaller);
			  if(!this.cinf.iscaller) this.callService.enableCallAnswer();
		  } else  {
			  this.callService.cancelCall(this.cinf.iscaller);
			  this.callService.sendMsg('call-cancelled', this.cinf.iscaller);
			  this.location.back();
		  }
	  }
  }
  tohms(sec) {
	let hours   = Math.floor(sec / 3600); // get hours
    let minutes = Math.floor((sec - (hours * 3600)) / 60); // get minutes
    let seconds = sec - (hours * 3600) - (minutes * 60); //  get seconds
    // add 0 if value < 10; Example: 2 => 02
	let hrs: string = '';
	let mins: string = '';
	let secs: string = ''; 
    if (hours   < 10) {hrs   = "0"+hours.toString();}
    if (minutes < 10) {mins = "0"+minutes.toString();}
    if (seconds < 10) {secs = "0"+seconds.toString();}
    return hrs+':'+mins+':'+secs; // Return is HH : MM : SS }
 }
 	stars(evt, s) {
		evt.stopPropagation();
	  if(s != this.rating) {
		this.rating = s;
		this.updatestrs(s);
	  }
	}
	save(evt) {
		evt.stopPropagation();
		this.txt1 = 'Submitting..';
		if(this.msg.trim() != '') {
		  this.horoService.userReview(this.device.uuid, this.cinf.name, this.cinf.avatar, this.cinf.uid, this.rating, this.msg)
			   .subscribe(res => {
				console.log('review updated to server');
				this.shareService.setCSTATS('C|' + this.cinf.uid);
				}, (err) => {
				});
		} else {
			this.horoService.userRating(this.device.uuid, this.cinf.name, this.cinf.avatar, this.cinf.uid, this.rating)
			   .subscribe(res => {
				 console.log('rating', res['rating']);
				console.log('rating updated to server');
				}, (err) => {
				});
		}
	}
	updatestrs(s) {
		this.rating = s;
			switch(s) 
			{
				case 1:
				   this.str1 = 'star';
				   this.str2 = 'star-outline';
				   this.str3 = 'star-outline';
				   this.str4 = 'star-outline';
				   this.str5 = 'star-outline';
				   break;
				case 2:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star-outline';
				   this.str4 = 'star-outline';
				   this.str5 = 'star-outline';
				   break;
				case 3:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star';
				   this.str4 = 'star-outline';
				   this.str5 = 'star-outline';
				   break;
				case 4:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star';
				   this.str4 = 'star';
				   this.str5 = 'star-outline';
				   break;
				case 5:
				   this.str1 = 'star';
				   this.str2 = 'star';
				   this.str3 = 'star';
				   this.str4 = 'star';
				   this.str5 = 'star';
				   break;
				 default:
					break;
			}
	}

}
