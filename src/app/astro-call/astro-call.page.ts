import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ViewChild, Renderer2, ElementRef, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin, interval } from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service';
import { astroCallStatus, CallService } from '../call.service';
declare var AudioToggle: any;
interface CallEndedData {
  callEnded: boolean;
  closeConnection: boolean;
}
interface BirthDetails {
  dob: Date;
  tob: string;
  lng: number;
  lat: number;
  place: string;
  timezone: string;
  gender: string;
  name: string;
  dst: number;
}
const parseBirthDetails = (detailsString: string): BirthDetails => {
  const [dateTime, locationPlaceTzDSTNam] = detailsString.split('L');
  const [coordinates, placeTzDSTNam] = locationPlaceTzDSTNam.split('@');
  const [place, tzDSTNam] = placeTzDSTNam.split('$');
  const [timezone, dstNam] = tzDSTNam.split('%');
  const [dst, nameGen]  = dstNam.split('#');
  const [name, gender] = nameGen.split('&');
  return {
    dob: new Date(dateTime),
    tob: dateTime.split('T')[1],
    lng: parseFloat(coordinates.split(',')[1]),
    lat: parseFloat(coordinates.split(',')[0]),
    place,
    timezone,
    gender,
    name,
    dst: Number(dst),
  };
};

@Component({
  selector: 'app-astro-call',
  templateUrl: './astro-call.page.html',
  styleUrls: ['./astro-call.page.scss']
})
export class AstroCallPage {
  // @ViewChild('remoteAudio', { static: false }) remoteAudio: ElementRef;
	@ViewChild('birthChart', {static: true}) birthChart : ElementRef;
	@Input() callEnded: EventEmitter<true> = new EventEmitter<true>();
	@Output() callEndedEvent: EventEmitter<void> = new EventEmitter<void>();
  signs_v: any;
	sign_imgs_v: any;
	o_signs_v: any;
	rashis_v: any;
	o_rashis_v: any;
	rashi_lords_v: any;
	ruler_name_v: any;
	friend_pl_v: any;
	enemy_pl_v: any;
	aspects_v: any;
	house_traits_v: any;
	nakshatras_v: any;
	str1: string = 'fa fa-star-o';
	str2: string = 'fa fa-star-o';
	str3: string = 'fa fa-star-o';
	str4: string = 'fa fa-star-o';
	str5: string = 'fa fa-star-o';
	rating: number = 0;
    //cinf: any;
   btn: string = 'End Call';
   cdt: any;
   ticks: number = 0;
   cactv: boolean = false;
   showCI: boolean = false;
   sdt: string = '';
   edt: string = '';
   txt1: string = ''; txt2: string = '';
   avatar: string = '';
   msg: string = '';
   info: string = '';
   spkr: string = 'assets/imgs/speaker-off.png';
   mic: string = 'assets/imgs/unmute.png';
  	moon_sign :string = '';
	moon_deg :string = '';
	asc_sign :string = '';
  dob: string = '';
  lagna: string = '';
  lagna_lord: string = '';
  sun_sign: string = '';
  tithi: string = '';
  birth_star: string = '';
  star_lord: string = '';
  moon_phase: string = '';
	device_width :number = 0;
	device_height :number = 0;
	showBD = false;
	sbd: string = 'Show Birth Details';
	svgHoro: any;
	binf: any = {};
	loading: boolean = false;
	fetched: boolean = false;
	reco: string = '';
	showFC: boolean = false;
	callerInfo: any;
	subscription: any;
	liveStream: MediaStream;
	mediaRecorder: MediaRecorder | undefined;
    chunks: Blob[] = [];
	showRec: boolean = false;
  isMuted: boolean = false;
  remoteAudio;
  constructor(private router: Router, private callService: CallService, private horoService: HoroscopeService, private shareService: ShareService, public renderer: Renderer2, private translate: TranslateService) { 
  }
  ngOnInit() {
    //const audioElement = this.remoteAudio.nativeElement as HTMLAudioElement;

    this.remoteAudio = document.getElementById('remoteAudio') as HTMLAudioElement;
	console.log('remoteAudio', this.remoteAudio);
    this.callService.astroCallStarted$.subscribe((stream: MediaStream) => {
      // Add incoming media stream to the audio element
	  console.log('astro-call streaming', stream)
      this.remoteAudio.srcObject = stream;
	   this.liveStream = stream;
	  this.remoteAudio.play();
    });
    this.shareService.cinf.subscribe((callerInfo) => {
    console.log('astro-call ngOnInit callerInfo', callerInfo);
	  this.callerInfo = callerInfo;
	  if(!this.callerInfo.iscaller) { 
			let pinf: any = this.callService.getPeerInfo();
			console.log('pinf', pinf);
			let pname: string = pinf.dob.split('#')[1].split('&')[0];
			this.txt1 = 'Incomming call from ' + pname;
			this.callerInfo.avatar = pinf.pic;
			this.btn = 'End Call';
		} 
	   else {
			this.txt1 = 'Ringing...';
	   }
	 });
	   astroCallStatus.subscribe((ast) => {
			console.log('call ended by peer', ast);
			this.endCallHandler();
	   });
		//this.callService.endCall$.subscribe(() => {
		//		console.log('endCall$');
		//		this.endCallHandler();
		//	});
		this.cdt = new Date();
		this.callerInfo.starttime = this.cdt.getHours().toString() + ':' + this.cdt.getMinutes().toString() + ':' + this.cdt.getSeconds().toString();
		if(this.callerInfo.iscaller)
			this.txt1 = 'Talking to ' + this.callerInfo.name;
		else {
			let pinf: any = this.callService.getPeerInfo();
			let pname: string = pinf.dob.split('#')[1].split('&')[0];
			this.txt1 = 'Talking to ' + pname;
		}
	  this.cactv = true;
	  const interval$ = interval(1000);
	  this.subscription = interval$.subscribe(() => {
		if(this.cactv) {
		  var adt = new Date();
		  this.ticks++;
		  this.txt1 =  this.cdt.getHours().toString() + ':' + this.cdt.getMinutes().toString() + ':' + this.cdt.getSeconds().toString() + '/' + adt.getHours().toString() + ':' + adt.getMinutes().toString() + ':' + adt.getSeconds().toString();
		}
	  });

}
startRecording() {
  if (this.liveStream) {
    this.mediaRecorder = new MediaRecorder(this.liveStream);
    this.mediaRecorder.addEventListener("dataavailable", event => {
      this.chunks.push(event.data);
    });
    this.mediaRecorder.start();
  }
}
stopRecording() {
  this.mediaRecorder?.stop();
}
downloadRecording(evt) {
  evt.stopPropagation();
  const blob = new Blob(this.chunks, { type: "audio/ogg; codecs=opus" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "astro-call-recording.ogg";
  document.body.appendChild(link);
  link.click();
}
private endCallHandler() {
  const audioRow = document.querySelector('.audio');
  audioRow.removeAttribute('hidden');
  this.btn = 'Close';
  this.txt1 = 'Call Ended';
  this.showCI = true;
  this.cdt.setSeconds(this.cdt.getSeconds() + this.ticks);
  this.callerInfo.endtime = this.cdt.getHours().toString() + ':' + this.cdt.getMinutes().toString() + ':' + this.cdt.getSeconds().toString();
  this.callerInfo.duration = this.ticks;
  this.cactv = false;
}
ngOnDestroy() {
	this.subscription.unsubscribe();
	//const audioElement = this.remoteAudio.nativeElement as HTMLAudioElement;
	this.remoteAudio.srcObject = null;
}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('onChanges', this.callerInfo);
  }
  endCall(evt) {
    evt.stopPropagation();
    if (this.showRec) this.stopRecording();
	if(this.btn == 'End Call') { 
	    this.endCallHandler();
		this.callService.endCall(this.callerInfo.iscaller, this.callerInfo.aid);
		this.btn = 'Close';
	} else this.callService.stopTracks();
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
		// if(this.msg.trim() != '') {
		  
		  // this.horoService.userReview(this.shareService.getUID(), this.cinf.name, this.cinf.avatar, this.cinf.uid, this.rating, this.msg)
			   // .subscribe(res => {
				// console.log('review updated to server');
				// this.shareService.setCSTATS('C|' + this.cinf.uid);
				// }, (err) => {
				// });
		// } else {
			// this.horoService.userRating(this.shareService.getUID(), this.cinf.name, this.cinf.avatar, this.cinf.uid, this.rating)
			   // .subscribe(res => {
				 // console.log('rating', res['rating']);
				// console.log('rating updated to server');
				// }, (err) => {
				// });
		// }
	}
	updatestrs(s) {
		this.rating = s;
			switch(s) 
			{
				case 1:
				   this.str1 = 'fa-solid fa-star';
				   this.str2 = 'fa fa-star-o';
				   this.str3 = 'fa fa-star-o';
				   this.str4 = 'fa fa-star-o';
				   this.str5 = 'fa fa-star-o';
				   break;
				case 2:
				   this.str1 = 'fa-solid fa-star';
				   this.str2 = 'fa-solid fa-star';
				   this.str3 = 'fa fa-star-o';
				   this.str4 = 'fa fa-star-o';
				   this.str5 = 'fa fa-star-o';
				   break;
				case 3:
				   this.str1 = 'fa-solid fa-star';
				   this.str2 = 'fa-solid fa-star';
				   this.str3 = 'fa-solid fa-star';
				   this.str4 = 'fa fa-star-o';
				   this.str5 = 'fa fa-star-o';
				   break;
				case 4:
				   this.str1 = 'fa-solid fa-star';
				   this.str2 = 'fa-solid fa-star';
				   this.str3 = 'fa-solid fa-star';
				   this.str4 = 'fa-solid fa-star';
				   this.str5 = 'fa fa-star-o';
				   break;
				case 5:
				   this.str1 = 'fa-solid fa-star';
				   this.str2 = 'fa-solid fa-star';
				   this.str3 = 'fa-solid fa-star';
				   this.str4 = 'fa-solid fa-star';
				   this.str5 = 'fa-solid fa-star';
				   break;
				 default:
					break;
			}
	}
  record(event: any) {
    this.showRec = true;
    this.startRecording();
  }

  togglemic(event: any) {
    this.isMuted = !this.isMuted;
    this.liveStream.getAudioTracks().forEach(track => {
      track.enabled = !this.isMuted;
    });
  }	
  bdtails(evt) {
	  evt.stopPropagation();
	  this.sbd = (this.sbd == 'Show Birth Details') ? 'Hide Birth Details' : 'Show Birth Details';
	  this.showBD = !this.showBD;
	  
	  if(this.fetched) {
		if(!this.showBD) {
			for (let child of this.birthChart.nativeElement.children) {
				this.renderer.removeChild(this.birthChart.nativeElement, child);
			}
		} else {
			this.renderer.appendChild(this.birthChart.nativeElement, this.svgHoro);
		}
		return;
	  } else this.loading = true;
	  let pinf: any = this.callService.getPeerInfo();
		// Extract date of birth
		const { dob, tob, lat, lng, place, timezone, gender, name, dst } = parseBirthDetails(pinf.dob);
		console.log('detailsString', pinf.dob);
		console.log('dob', dob);
		console.log('tob', tob);
		console.log('lng', lng);
		console.log('lat', lat);
		console.log('timezone', timezone);
		console.log('place', place);
		console.log('name', name);
		console.log('gender', gender);
		console.log('dst', dst);
		console.log('ngOnInit-Horoscope');
		forkJoin(
			this.horoService.getJson('assets/data/signs.json'),
			this.horoService.getJson('assets/data/o_signs.json'),
			this.horoService.getJson('assets/data/sign_imgs.json'),
			this.horoService.getJson('assets/data/rashis.json'),
			this.horoService.getJson('assets/data/o_rashis.json'),
			this.horoService.getJson('assets/data/rashi_lords.json'),
			this.horoService.getJson('assets/data/ruler_name.json'),
			this.horoService.getJson('assets/data/friend_pl.json'),
			this.horoService.getJson('assets/data/enemy_pl.json'),
			this.horoService.getJson('assets/data/aspects.json'),
			this.horoService.getJson('assets/data/house_traits.json'),
			this.horoService.getJson('assets/data/nakshatras.json')
		)
		.subscribe(dat => {
				console.log('dat', dat);
				this.signs_v = dat[0];
				console.log('signs_v', this.signs_v);
				this.o_signs_v = dat[1];
				this.sign_imgs_v = dat[2];
				this.rashis_v = dat[3];
				this.o_rashis_v = dat[4];
				this.rashi_lords_v = dat[5];
				this.ruler_name_v = dat[6];
				this.friend_pl_v = dat[7];
				this.enemy_pl_v = dat[8];
				this.aspects_v = dat[9];
				this.house_traits_v = dat[10];
				this.nakshatras_v = dat[11];
				this.device_width = document.getElementById('bchart').offsetWidth;
				this.device_height = 970;
				var dt = new Date();
				var n = dt.getTimezoneOffset();
				n = n / 60;
				let ofset: number = Number(n.toFixed(1));
				
				let ayanid: number = 4;
				var res = this.shareService.getAYNM();
				if(res) ayanid = Number(res);
			this.horoService.getBirthInfoEx(lat, lng, pinf.dob.split('L')[0], timezone, ayanid)
			   .subscribe(res => {
				   this.showBD = true;
				   this.dob = res['dob'];
				   this.lagna = this.shareService.translate_func(res['lagna']);
				   this.lagna_lord = this.shareService.translate_func(res['lagna_lord']);
				   this.moon_sign = this.shareService.translate_func(res['moon_sign']);
				   this.sun_sign = this.shareService.translate_func(res['sun_sign']);
				   this.tithi = this.shareService.translate_func(res['tithi']);
				   this.birth_star = this.shareService.translate_func(res['birth_star']);
				   this.star_lord = this.shareService.translate_func(res['star_lord']);
				   this.moon_phase = this.shareService.translate_func(res['moon_phase']);
			  }, (err) => {
			  }) ;
			   this.horoService.getBirthchartEx2(lat, lng, pinf.dob.split('L')[0], timezone, dst, ayanid)
		   .subscribe(res => {
		        this.binf.retro = res['retroPls'];
				this.loadHoro(res['planetPos']);
				this.loading = false;
				this.fetched = true;
				});
		 });
	  
	}
  loadHoro(ppos)
  {
	var plPos = ppos; 
	console.log('loadHoro', plPos);
	console.log('signs_v', this.signs_v);
		for (var i = 0; i < 16; i++) {
			var sign = this.signs_v[i];
			console.log('sign=', sign);
			if (plPos.hasOwnProperty(sign)) {
			    console.log('split-1');
				var pls = plPos[sign].split('\|');
				console.log(pls);
				for (var k = 0; k < pls.length; k++) {
					if (pls[k].split(' ')[1] == 'MEAN_NODE') {
						var rpos = this.o_rashis_v[sign].split('\|')[0];
						var kpos = parseInt(rpos, 10) + 6;
						if (kpos > 12) kpos = (kpos - 12);
						if (plPos.hasOwnProperty(this.o_signs_v[kpos - 1])) {
							var eP = plPos[this.o_signs_v[kpos - 1]];
							plPos[this.o_signs_v[kpos - 1]] = eP + '|' + pls[k].split(' ')[0] + ' ' + 'Ke';
						} else {
							plPos[this.o_signs_v[kpos - 1]] = pls[k].split(' ')[0] + ' ' + 'Ke';
						}
						plPos[sign] = plPos[sign].replace('MEAN_NODE', 'Ra');
					} else if (pls[k].split(' ')[1] == 'AC') { 
						this.asc_sign = sign;
						console.log('ASCENDENT is ' + this.asc_sign);
					} else if (pls[k].split(' ')[1] == 'Mo') {
						this.moon_sign = sign;
						this.moon_deg = pls[k].split(' ')[0];
					} else if (pls[k].split(' ')[1] == 'TRUE_NODE') {
						plPos[sign] = plPos[sign].replace('TRUE_NODE', 'TR');		
					}
				}
			}
		}
	    if(this.shareService.getCHTYP() == 'sind')
			this.svgHoro = this.drawSIChart(plPos);
		else if(this.shareService.getCHTYP() == 'nind')
			this.svgHoro = this.drawNIchart(plPos);
		else
			this.svgHoro = this.drawSIChart(plPos);
		console.log('svg', this.svgHoro);
		console.log('birthChart', this.birthChart);
        this.renderer.appendChild(this.birthChart.nativeElement, this.svgHoro);
  }
	drawSIChart(plps) {
	    let pinf: any = this.callService.getPeerInfo();
		let pname: string = pinf.dob.split('#')[1].split('&')[0];
		let dob: string = pinf.dob;
		let latlng: string = '';
		if(dob.indexOf('L') > -1) {
			let db = dob.split('L')[0].trim();
			let lat: string = dob.split('L')[1].split('@')[0].split(',')[0].trim();
			let lng: string = dob.split('L')[1].split('@')[0].split(',')[1].trim();
			latlng = lat + ',' + lng;
		} else {
			//latlng = this.binf.lat + ',' + this.binf.lng;
		}
        var size = this.device_width;
		var bxz = size/4;
		var isz = Math.floor(bxz/3);
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", (size).toString());
		this.renderer.setAttribute(svg, "height", (size).toString());
		this.renderer.setAttribute(svg, "viewBox", [0, 0, size, size].join(" "));
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.renderer.setAttribute(box, "width", size.toString());
		this.renderer.setAttribute(box, "height", size.toString());
		this.renderer.setAttribute(box, "stroke", "#d35400");
		this.renderer.setAttribute(box, "stroke-width", "2");
		this.renderer.setAttribute(box, "fill", "#ffffff");
		this.renderer.setAttribute(box, "id", "bx1");
		this.renderer.appendChild(g, box);
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l1");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", "0"); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l2");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l3");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size).toString()); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "14");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (bxz).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (bxz).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l5");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size/2).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l6");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size-bxz).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size-bxz).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l7");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (bxz).toString()); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (bxz).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l8");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size/2).toString()); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l9");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size-bxz).toString()); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (size-bxz).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l10");
		this.renderer.appendChild(g, line);
		box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.renderer.setAttribute(box, "x", (bxz).toString());
		this.renderer.setAttribute(box, "y", (bxz).toString());
		this.renderer.setAttribute(box, "width", (size/2).toString());
		this.renderer.setAttribute(box, "height", (size/2).toString());
		this.renderer.setAttribute(box, "stroke", "#d35400");
		this.renderer.setAttribute(box, "stroke-width", "2");
		this.renderer.setAttribute(box, "fill", "#ffffff");
		this.renderer.setAttribute(box, "id", "bx2");
		this.renderer.appendChild(g, box);
		var tpx: number = (bxz*2);
		var tpy: number = (bxz*2);
		var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		
		this.renderer.appendChild(text, document.createTextNode(pname));
		this.renderer.setAttribute(text, "fill", "#d35400");
		this.renderer.setAttribute(text, "font-size", "1.35rem");
		this.renderer.setAttribute(text, "font-weight", "bold");
		this.renderer.setAttribute(text, "alignment-baseline", "middle");
		this.renderer.setAttribute(text, "text-anchor", "middle");
		this.renderer.setAttribute(text, "x", (tpx).toString());
		this.renderer.setAttribute(text, "y", (tpy).toString());
		this.renderer.setAttribute(text, "id", "tc1");
		g.appendChild(text);
		text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(text, document.createTextNode(dob.split('L')[0].trim()));
		this.renderer.setAttribute(text, "fill", "#d35400");
		this.renderer.setAttribute(text, "font-size", "1rem");
		this.renderer.setAttribute(text, "font-weight", "bold");
		this.renderer.setAttribute(text, "alignment-baseline", "middle");
		this.renderer.setAttribute(text, "text-anchor", "middle");
		this.renderer.setAttribute(text, "x", tpx.toString());
		this.renderer.setAttribute(text, "y", (tpy+16).toString());
		this.renderer.setAttribute(text, "id", "tc2");
		g.appendChild(text);
		text = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(text, document.createTextNode(latlng));
		this.renderer.setAttribute(text, "fill", "#d35400");
		this.renderer.setAttribute(text, "font-size", "0.8rem");
		this.renderer.setAttribute(text, "font-weight", "bold");
		this.renderer.setAttribute(text, "alignment-baseline", "middle");
		this.renderer.setAttribute(text, "text-anchor", "middle");
		this.renderer.setAttribute(text, "x", tpx.toString());
		this.renderer.setAttribute(text, "y", (tpy+32).toString());
		this.renderer.setAttribute(text, "id", "tc3");
		g.appendChild(text);
		let plc: number = 1;
		let plh: number = 14; //font pixel height
		let signs = ["pi", "aq", "cp", "sa", "ar","sc", "ta", "li", "ge", "cn", "le", "vi"];
		for(var i = 0; i < 12; i++) {
			    let sign = signs[i];
				let hcord = this.getRXY(sign, this.device_width);
				var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
				this.renderer.setAttribute(image, "x", (Math.floor(hcord[0]-isz)).toString());
				this.renderer.setAttribute(image, "y", (Math.floor(hcord[1])).toString());
				this.renderer.setAttribute(image, "height", (isz).toString());
				this.renderer.setAttribute(image, "width", (isz).toString());
				image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.sign_imgs_v[sign]);
				this.renderer.appendChild(g, image);
				if (plps.hasOwnProperty(sign)) {
					hcord = this.getPXY(sign, size);
					var pls = plps[sign].split('\|');
					var pcnt = 0;
					for (var k = 0; k < pls.length; k++) {
						if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
						if (pls[k].split(' ')[1] == 'AC') this.asc_sign = sign;
						else if (pls[k].split(' ')[1] == 'Mo') {
							this.moon_sign = sign;
							this.moon_deg = pls[k].split(' ')[0];
						}
						pcnt++;
						var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
						var plt = pls[k];
						if(this.binf.retro.indexOf(pls[k].split(' ')[1]) > -1) plt += '[R]';
						this.renderer.appendChild(text, document.createTextNode(plt));
						this.renderer.setAttribute(text, "font-size", "0.875rem");
						this.renderer.setAttribute(text, "font-weight", "bold");
						this.renderer.setAttribute(text, "fill", ((pls[k].split(' ')[1] == "AC") ? "#FF5733" : (pls[k].split(' ')[1] == "Mo") ? "#011898":"#0a0a0a"));
						this.renderer.setAttribute(text, "x", (hcord[0]-isz).toString());
						var s8 = hcord[1] + (plh*pcnt);
						this.renderer.setAttribute(text, "y",  s8.toString());
						this.renderer.setAttribute(text, "id", "pl" + (plc).toString());
						g.appendChild(text);
						plc++;
					}
				}
		}
		svg.appendChild(g);
		return svg;
	};
	drawNIchart(plps) {
	   var roms = ['I', 'II', 'III', 'IV', 'V', 'V1', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
       var ras = ['ar', 'ta', 'ge', 'cn', 'le', 'vi', 'li', 'sc', 'sa', 'cp', 'aq', 'pi'];
	   let ah: number = 0;
	   var s6 = 12;
	    for(var r = 0; r < 12; r++) {
  		 if (plps.hasOwnProperty(ras[r])) {
			var pls = plps[ras[r]].split('\|');
			for (var k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
				if (pls[k].split(' ')[1] == 'AC') { 
				   this.asc_sign = ras[r];
				   ah = r+1;
				   break;
				}
			}
	     }
		}
        var size = this.device_width;
  		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		this.renderer.setAttribute(svg, "width", (this.device_width).toString());
		this.renderer.setAttribute(svg, "height", (this.device_width).toString());
		var bxz = size/4;
		var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
		var box = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		this.renderer.setAttribute(box, "width", size.toString());
		this.renderer.setAttribute(box, "height", size.toString());
		this.renderer.setAttribute(box, "stroke", "#d35400");
		this.renderer.setAttribute(box, "stroke-width", "2");
		this.renderer.setAttribute(box, "fill", "#ffffff");
		this.renderer.setAttribute(box, "id", "bx1");
		this.renderer.appendChild(g, box);
		var line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l1");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", "0"); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l2");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l3");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size).toString()); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "14");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", "0"); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l5");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l6");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l7");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", "0"); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", (size).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l8");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size/2).toString()); 
		this.renderer.setAttribute(line, "y1", (size).toString()); 
		this.renderer.setAttribute(line, "x2", (size).toString()); 
		this.renderer.setAttribute(line, "y2", (size/2).toString()); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l9");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size).toString()); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "#d35400");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l10");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size/4).toString()); 
		this.renderer.setAttribute(line, "y1", (size/4).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "red");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l11");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size/4).toString()); 
		this.renderer.setAttribute(line, "y1", (size/4).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", (size/2).toString()); 
		this.renderer.setAttribute(line, "stroke", "red");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l12");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", (size/2).toString()); 
		this.renderer.setAttribute(line, "y1", (size/2).toString()); 
		this.renderer.setAttribute(line, "x2", ((size/2)+bxz).toString()); 
		this.renderer.setAttribute(line, "y2", (bxz).toString()); 
		this.renderer.setAttribute(line, "stroke", "red");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l13");
		this.renderer.appendChild(g, line);
		line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		this.renderer.setAttribute(line, "x1", ((size/2)+bxz).toString()); 
		this.renderer.setAttribute(line, "y1", (bxz).toString()); 
		this.renderer.setAttribute(line, "x2", (size/2).toString()); 
		this.renderer.setAttribute(line, "y2", "0"); 
		this.renderer.setAttribute(line, "stroke", "red");
		this.renderer.setAttribute(line, "stroke-width", "2");
		this.renderer.setAttribute(line, "id", "l14");
		this.renderer.appendChild(g, line);
		console.log('ah',ah);
		var isz = Math.floor(bxz/3);
		var hcord = this.getHXY(1, this.device_width);
		var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
		this.renderer.setAttribute(image, "x", (Math.floor(hcord[0]-isz)).toString());
		this.renderer.setAttribute(image, "y", (Math.floor(hcord[1])-isz).toString());
		this.renderer.setAttribute(image, "height", (isz).toString());
		this.renderer.setAttribute(image, "width", (isz).toString());
		image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.sign_imgs_v[ras[ah-1]]);
		this.renderer.appendChild(g, image);
		var htxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
		this.renderer.appendChild(htxt, document.createTextNode(ras[ah-1]));
		this.renderer.setAttribute(htxt, "fill", "#d35400");
		this.renderer.setAttribute(htxt, "font-size", s6.toString());
		this.renderer.setAttribute(htxt, "font-weight", "bold");
		this.renderer.setAttribute(htxt, "alignment-baseline", "middle");
		this.renderer.setAttribute(htxt, "text-anchor", "middle");
		this.renderer.setAttribute(htxt, "x", (Math.floor(hcord[0])).toString());
		this.renderer.setAttribute(htxt, "y", (Math.floor(hcord[1])).toString());
		this.renderer.setAttribute(htxt, "id", "RH" + ah.toString());
		this.renderer.appendChild(g, htxt);
		let np: number = 0;
  		 if (plps.hasOwnProperty(ras[ah-1])) {
			var pls = plps[ras[ah-1]].split('\|');
			for (var k = 0; k < pls.length; k++) {
				if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
				console.log('getXY', pls[k]);
				var cord = this.getXY(1, this.device_width, Number(pls[k].split(' ')[0]));
				console.log('getXY-cord', cord);
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				this.renderer.appendChild(text, document.createTextNode(pls[k]));
				this.renderer.setAttribute(text, "fill", "#d35400");
				this.renderer.setAttribute(text, "font-size", s6.toString());
				this.renderer.setAttribute(text, "font-weight", "bold");
				this.renderer.setAttribute(text, "alignment-baseline", "middle");
				this.renderer.setAttribute(text, "text-anchor", "middle");
				this.renderer.setAttribute(text, "x", (Math.floor(cord[0])).toString());
				this.renderer.setAttribute(text, "y", (Math.floor(cord[1]+np)).toString());
				this.renderer.setAttribute(text, "id", "R1" + k.toString());
				this.renderer.appendChild(g, text);
				np += 12;
			}
		}
		let ch: number = ah;
	    let hou: number = 2;
		while(hou < 13) {
		   ch++;
		   if(ch > 12) ch = 1;
		   console.log('hno=', hou);
			np = 0;
		    hcord = this.getHXY(hou, this.device_width);
		    htxt = document.createElementNS("http://www.w3.org/2000/svg", "text");
			this.renderer.appendChild(htxt, document.createTextNode(roms[hou-1]));
			this.renderer.setAttribute(htxt, "fill", "#d35400");
			this.renderer.setAttribute(htxt, "font-size", s6.toString());
			this.renderer.setAttribute(htxt, "font-weight", "bold");
			this.renderer.setAttribute(htxt, "alignment-baseline", "middle");
			this.renderer.setAttribute(htxt, "text-anchor", "middle");
			this.renderer.setAttribute(htxt, "x", (Math.floor(hcord[0])).toString());
			this.renderer.setAttribute(htxt, "y", (Math.floor(hcord[1])).toString());
			this.renderer.setAttribute(htxt, "id", "RH" + ch.toString());
			this.renderer.appendChild(g, htxt);
			image = document.createElementNS("http://www.w3.org/2000/svg", "image");
			this.renderer.setAttribute(image, "x", (Math.floor(hcord[0]-isz)).toString());
			this.renderer.setAttribute(image, "y", (Math.floor(hcord[1])-isz).toString());
			this.renderer.setAttribute(image, "height", (isz).toString());
			this.renderer.setAttribute(image, "width", (isz).toString());
			image.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", this.sign_imgs_v[ras[ch-1]]);
			this.renderer.appendChild(g, image);
			console.log("fixing planets to hou");
  		 if (plps.hasOwnProperty(ras[ch-1])) {
			var pls = plps[ras[ch-1]].split('\|');
			for (var k = 0; k < pls.length; k++) {
			    console.log("k=", k);
				if (pls[k].split(' ')[1] == 'me' || pls[k].split(' ')[1] == 'os') continue;
			console.log("ch", ch);
				var text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				console.log('getXY', pls[k]);
				var cord = this.getXY(hou, this.device_width, Number(pls[k].split(' ')[0]));
				console.log('getXY', cord);
				this.renderer.appendChild(text, document.createTextNode(pls[k]));
				this.renderer.setAttribute(text, "fill", "#d35400");
				this.renderer.setAttribute(text, "font-size", s6.toString());
				this.renderer.setAttribute(text, "font-weight", "bold");
				this.renderer.setAttribute(text, "alignment-baseline", "middle");
				this.renderer.setAttribute(text, "text-anchor", "middle");
				this.renderer.setAttribute(text, "x", (Math.floor(cord[0])).toString());
				this.renderer.setAttribute(text, "y", (Math.floor(cord[1]+np)).toString());
				this.renderer.setAttribute(text, "id", "R" + ch.toString() + k.toString());
				this.renderer.appendChild(g, text);
				np += 12;
			}
		}
		hou++;
	}
	svg.appendChild(g);
	return svg;
 }
 
 getXY(h, w, p) {
	let side: number = Math.floor(w/4);
	console.log('h', h);
	console.log('side', side);
	let x1: number = 0;
	let x2: number = 0;
	let y1: number = 0;
	let y2: number = 0;
	switch(h) {
		case 1:
			x1 = side;
			x2 = side*3;
			y1 = 0;
			y2 = side*2;
			break;
		case 2:
			x1 = 0;
			x2 = side*2;
			y1 = 0;
			y2 = side;
			break;
		case 3:
			x1 = 0;
			x2 = side;
			y1 = 0;
			y2 = side*2;
			break;
		case 4:
			x1 = 0;
			x2 = side*2;
			y1 = side;
			y2 = side*3;
			break;
		case 5:
			x1 = 0;
			x2 = side;
			y1 = side*2;
			y2 = w;
			break;
		case 6:
			x1 = 0;
			x2 = side*2;
			y1 = side*3;
			y2 = w;
			break;
		case 7:
			x1 = side;
			x2 = side*3;
			y1 = side*2;
			y2 = w;
			break;
		case 8:
			x1 = side*2;
			x2 = w;
			y1 = side*3;
			y2 = w;
			break;
		case 9:
			x1 = side*3;
			x2 = w;
			y1 = side*2;
			y2 = w;
			break;
		case 10:
			x1 = side*2;
			x2 = w;
			y1 = side;
			y2 = side*3;
			break;
		case 11:
			x1 = side*3;
			x2 = w;
			y1 = 0;
			y2 = side*2;
			break;
		case 12:
			x1 = side*2;
			x2 = w;
			y1 = 0;
			y2 = side;
			break;
		default:
			break;
	}
	console.log('x1', x1);
	console.log('x2', x2);
	console.log('y1', y1);
	console.log('y2', y2);
	let xw: number = x2 - x1;
	let yh: number = y2 - y1;
	var x = x1 + (Math.floor(xw/2));
	var y = y1 + (Math.floor(yh/2));
	console.log(x,y);
	return [x, y];
 }
 getHXY(h, w) {
	let side: number = Math.floor(w/4);
	console.log('h', h);
	console.log('side', side);
	let x1: number = 0;
	let x2: number = 0;
	let y1: number = 0;
	let y2: number = 0;
	switch(h) {
		case 1:
			x1 = side;
			x2 = side*3;
			y1 = 0;
			y2 = side*2;
			break;
		case 2:
			x1 = 0;
			x2 = side*2;
			y1 = 0;
			y2 = side;
			break;
		case 3:
			x1 = 0;
			x2 = side;
			y1 = 0;
			y2 = side*2;
			break;
		case 4:
			x1 = 0;
			x2 = side*2;
			y1 = side;
			y2 = side*3;
			break;
		case 5:
			x1 = 0;
			x2 = side;
			y1 = side*2;
			y2 = w;
			break;
		case 6:
			x1 = 0;
			x2 = side*2;
			y1 = side*3;
			y2 = w;
			break;
		case 7:
			x1 = side;
			x2 = side*3;
			y1 = side*2;
			y2 = w;
			break;
		case 8:
			x1 = side*2;
			x2 = w;
			y1 = side*3;
			y2 = w;
			break;
		case 9:
			x1 = side*3;
			x2 = w;
			y1 = side*2;
			y2 = w;
			break;
		case 10:
			x1 = side*2;
			x2 = w;
			y1 = side;
			y2 = side*3;
			break;
		case 11:
			x1 = side*3;
			x2 = w;
			y1 = 0;
			y2 = side*2;
			break;
		case 12:
			x1 = side*2;
			x2 = w;
			y1 = 0;
			y2 = side;
			break;
		default:
			break;
	}
	console.log('x1', x1);
	console.log('x2', x2);
	console.log('y1', y1);
	console.log('y2', y2);
	let xw: number = x2 - x1;
	let yh: number = y2 - y1;
	var x = x1 + (Math.floor(xw/2));
	var y = y1 + (Math.floor(yh/2) - 12);
	console.log(x,y);
	return [x, y];
 }
 getPXY(r, w) {
	let side: number = Math.floor(w/4);
	let bx: number = Math.floor(side/2);
	console.log('r', r);
	console.log('side', side);
	let x1: number = 0;
//	let x2: number = 0;
	let y1: number = 0;
//	let y2: number = 0;
	switch(r) {
		case "ar":
			x1 = (side*2)-bx;
			y1 = 12;
			break;
		case "ta":
			x1 = (side*3)-bx;
			y1 = 12;
			break;
		case "ge":
			x1 = (side*4)-bx;
			y1 = 12;
			break;
		case "cn":
			x1 = (side*4)-bx;
			y1 = side+12;
			break;
		case "le":
			x1 = (side*4)-bx;
			y1 = (side*2)+12;
			break;
		case "vi":
			x1 = (side*4)-bx;
			y1 = (side*3)+12;
			break;
		case "li":
			x1 = (side*3)-bx;
			y1 = (side*3)+12;
			break;
		case "sc":
			x1 = (side*2)-bx;
			y1 = (side*3)+12;
			break;
		case "sa":
			x1 = (side)-bx;
			y1 = (side*3)+12;
			break;
		case "cp":
			x1 = (side)-bx;
			y1 = (side*2)+12;
			break;
		case "aq":
			x1 = (side)-bx;
			y1 = (side)+12;
			break;
		case "pi":
			x1 = (side)-bx;
			y1 = 12;
			break;
		default:
			break;
	}
	console.log('x1', x1);
	console.log('y1', y1);
	return [x1, y1];
 }
 getRXY(r, w) {
	let side: number = Math.floor(w/4);
	console.log('r', r);
	console.log('side', side);
	let x1: number = 0;
	let x2: number = 0;
	let y1: number = 0;
	let y2: number = 0;
	switch(r) {
		case "ar":
			x1 = side;
			x2 = side*2;
			y1 = 0;
			y2 = side;
			break;
		case "ta":
			x1 = side*2;
			x2 = side*3;
			y1 = 0;
			y2 = side;
			break;
		case "ge":
			x1 = side*3;
			x2 = w;
			y1 = 0;
			y2 = side;
			break;
		case "cn":
			x1 = side*3;
			x2 = w;
			y1 = side;
			y2 = side*2;
			break;
		case "le":
			x1 = side*3;
			x2 = w;
			y1 = side*2;
			y2 = side*3;
			break;
		case "vi":
			x1 = side*3;
			x2 = w;
			y1 = side*3;
			y2 = w;
			break;
		case "li":
			x1 = side*2;
			x2 = side*3;
			y1 = side*3;
			y2 = w;
			break;
		case "sc":
			x1 = side;
			x2 = side*2;
			y1 = side*3;
			y2 = w;
			break;
		case "sa":
			x1 = 0;
			x2 = side;
			y1 = side*3;
			y2 = w;
			break;
		case "cp":
			x1 = 0;
			x2 = side;
			y1 = side*2;
			y2 = side*3;
			break;
		case "aq":
			x1 = 0;
			x2 = side;
			y1 = side;
			y2 = side*2;
			break;
		case "pi":
			x1 = 0;
			x2 = side;
			y1 = 0;
			y2 = side;
			break;
		default:
			break;
	}
	console.log('x1', x1);
	console.log('x2', x2);
	console.log('y1', y1);
	console.log('y2', y2);
	let xw: number = x2 - x1;
	let yh: number = y2 - y1;
	//let part: number = Math.floor((x2-x1)/30);
	var x = x1 + (Math.floor(xw/2));
	var y = y1 + (Math.floor(yh/2));
	console.log(x,y);
	return [x, y];
 }
	
nakdtl() {
	 this.router.navigate(['/nak-info'], {state : this.birth_star.split(' ')[0] as any});
 }   

}
