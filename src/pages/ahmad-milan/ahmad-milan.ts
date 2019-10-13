import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HoroscopeService } from '../../app/horoscope.service';
import { CallNumber } from '@ionic-native/call-number';
import { ArticlePage } from '../article/article';

@Component({
  selector: 'page-ahmad-milan',
  templateUrl: 'ahmad-milan.html',
})
export class AhmadMilanPage {
  mob: string = '';
  walnk: string = '';
  showASU: boolean = false;
  showBLG: boolean = false;
  showPRF: boolean = false;
  info: string = '';
  articles:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, private horoService: HoroscopeService) {
    this.showBLG = navParams.get('item').blog;
    this.showASU = navParams.get('item').isavailable;
    this.walnk = navParams.get('item').walnk;
    this.mob = navParams.get('item').mob;
	if(this.showBLG == true) {
		this.getStories(navParams.get('item').uid);
	} else {
	   this.showPRF = true;
	}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JaidevPage');
  }
callreq(event) {
     event.stopPropagation();
     console.log(this.mob);
	 this.callNumber.callNumber(this.mob, true)
		.then(res => console.log('Launched dialer!', res))
		.catch(err => console.log('Error launching dialer', err));
  }
  getStories(uid){
    this.articles=[];
	this.info = 'fetching...';
    this.horoService.getBlogs(uid)
	.subscribe(res => {
	   this.info = '';
	  this.articles = res;
	},(err) => {
	  this.info = err;
    });
  }
 
  detail(item){
  this.navCtrl.push(ArticlePage, {
    item: item
  });
 }
}
