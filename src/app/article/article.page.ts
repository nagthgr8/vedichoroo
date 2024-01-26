import { Component, OnInit } from '@angular/core';
import { BrowserTab } from '@awesome-cordova-plugins/browser-tab/ngx';
import { Router } from '@angular/router';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { HoroscopeService } from '../horoscope.service';
import { ShareService } from '../share.service'
import { Comment } from '../comment';
declare var admob;

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  art: any;
  byline: string = '';
  avatar: string = '#';
 objectKeys = Object.keys;
  comments: any;
  orep: any = [];
  cmt: string = '';
  cavt: string = '';
  cnme: string = '';
  his: boolean = false;
  uuid: string = '';
  prf: boolean = false;
  nam: string = '';
  showSU: boolean = true;
  showPE: boolean = false;
  showCA: boolean = true;
  showAVT: boolean = false;
  info: string = '';
  info2: string = '';
  constructor(private browserTab: BrowserTab, private router: Router, private device: Device, public horoService: HoroscopeService, public shareService: ShareService) {
  this.comments = [];
	  }

  ngOnInit() {
	this.art = this.router.getCurrentNavigation().extras.state;
	this.showCA = false;
	this.art.story = '<span class="ion-text-center"><strong>Loading..</strong></span>';
 		this.horoService.getStory(this.art.uuid, this.art.title)
	.subscribe(res => {
		this.art.story = res['story'];
		this.showCA = true;
	}, (err) => {
		//this.info = JSON.stringify(err);
	});
	this.info2 = "Loading..";
	this.horoService.getProfile(this.art.uuid)
	.subscribe(res => {
		this.info2 = '';
		if(res['status'] != 'X' && res['status'] != 'E') {
		 if(res['dob'].indexOf('#') > 0) {
			this.prf = true;
			this.byline = 'Posted By: ' + res['dob'].split('#')[1].split('&')[0];
			this.avatar = (res['avatar'].trim() != '') ? res['avatar'] : 'https://i.imgur.com/LR7e1vw.png';
			 this.showAVT = true;
		 } 
	  }
	}, (err) => {
		this.showAVT = false;
		//this.info = JSON.stringify(err);
	});
	this.horoService.getProfile(this.device.uuid)
	.subscribe(res => {
		if(res['status'] != 'X' && res['status'] != 'E') {
		 if(res['dob'].indexOf('#') > 0) {
			this.cnme = res['dob'].split('#')[1].split('&')[0];
			this.cavt = (res['avatar'].trim() != '') ? res['avatar'] : 'https://i.imgur.com/LR7e1vw.png';
			if(this.cnme.trim() == '') {
				this.cnme = 'Please add your name in the profile page to get full access';
				this.showSU = false;
				this.showPE = true;
			} 
		 } else {
			this.cnme = 'Please add your date of birth in the profile page to get full access';
			this.showSU = false;
			this.showPE = true;
		 }
	  } else {
		  this.byline = 'Your profile is incomplete, please upldate your profile to get full access';
		  this.showSU = false;
		  this.showPE = true;
	  }
	}, (err) => {
		//this.info = JSON.stringify(err);
		this.byline = 'Failed to fetch data, please report this error to our info@vedichoroo.com';
	});
 		this.horoService.getComments(this.art.title)
	.subscribe(res => {
		 if(res['lst'][0].id != '-1') {
			 this.comments = res['lst'];
			console.log('comments', this.comments);
			this.his = true;
		 }
		
	}, (err) => {
		//this.info = JSON.stringify(err);
	});
  	  this.shareService.getPLAN()
		   .then(res => {
		if(res['name'] != 'com.mypubz.eportal.astrologer' && res['name'] != 'com.mypubz.eportal.adfree' && res['name'] != 'com.mypubz.eportal.month' && res['name'] != 'com.mypubz.eportal.year') {
			//admob.setDevMode(true);
		admob.banner.show({
			id: {
			  // replace with your ad unit IDs
			  android: 'ca-app-pub-8442845715303800/2046207788',
			  ios: 'ca-app-pub-8442845715303800/2046207788',
			},
		  }).then(() => {
			setTimeout(() => {
			  admob.banner.hide({
				// replace with your ad unit IDs
				android: 'ca-app-pub-8442845715303800/2046207788',
				ios: 'ca-app-pub-8442845715303800/2046207788',
			  })
			}, 10000)
		  })
		}
	 });
		this.horoService.getProfile(this.device.uuid)
		.subscribe(res => {
			if(res['dob'].indexOf('#') ==  -1) {
				this.cnme = res['dob'].split('#')[1].split('&')[0];
				this.cavt = res['avatar'];
			} else {
			}
		}, (err) => {
			//this.info = JSON.stringify(err);
		});
}
 comment(evt) {
	evt.stopPropagation();
	this.showSU = false;
	if(this.cmt.trim().length == 0) {
		this.info = 'Please Enter Your Comment';
		return;
	} else {
		this.showCA = false;
		this.info = 'posting your comment..';
		this.horoService.addComment(this.art.uuid, this.art.title, '', this.cnme, this.cavt, this.cmt)
		.subscribe(res => {
			//this.showSU = false;
			console.log('addCmt res', res);
			if(res == 200) {
				this.info = '';
					let nc: Comment = {
						   content: this.cmt,
						   created: '',
						   created_by_current_user: true,
						   fullname: this.cnme,
						   id: this.device.uuid,
						   modified: '',
						   parent: '',
						   profile_picture_url: this.cavt,
						   upvote_count: 0,
						   user_has_upvoted: false,
						   page_id: this.art.title,
						   email: '',
						   upvote_users: ''
					};
				if(this.comments.length > 0)
					this.comments.unshift(nc);
				else {
					this.comments.push(nc);
					this.his = true;
				}
				this.cmt = '';
				this.showCA = true;
				console.log('comments',this.comments);
			} else {
			   this.info = 'There was some internal failure, we regret inconvinience. Please try after some time.';
			}
		}, (err) => {
			this.info = JSON.stringify(err);
		});	  
	}
 }
  reply(evt, cmt) {
	evt.stopPropagation();
	this.showSU = false;
	if(cmt.rep.length == 0) {
		this.info = 'Please Enter Your Comment';
		return;
	} else {
		this.horoService.addComment('','',cmt.cid, this.cnme, this.cavt, cmt.rep)
		.subscribe(res => {
			//this.showSU = false;
			if(res['guid'] != '') {
				this.info = '';
			} else {
			   this.info = 'There was some internal failure, we regret inconvinience. Please try after some time.';
			}
		}, (err) => {
			this.info = JSON.stringify(err);
		});	  
	}
	 
 }
 cancel() {}
 viewrep(evt, cmt){}
 profile(evt) {
	evt.stopPropagation();
	 this.router.navigate(['/profile']);
 }
  openUrl() {
    this.browserTab.isAvailable()
        .then((isAvailable: boolean) => {
        if(isAvailable) {
            this.browserTab.openUrl('https://www.gamezop.com/?id=bh0UMvrkw');
        } else {
            // if custom tabs are not available you may  use InAppBrowser
        }
      });   
	}
}
