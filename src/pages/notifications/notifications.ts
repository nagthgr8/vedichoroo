import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { ShareService } from '../../app/share.service'

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  rahu: boolean = false;
  rahus: boolean = false;
  rahut1: boolean = false;
  rahut2: boolean = false;
  rahut3: boolean = false;
  sunrise: boolean = false;
  sunset: boolean = false;
  showRAH: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public shareService: ShareService, public events: Events
) {
    let res = this.shareService.getRAHU();
	if(res) {
		this.rahu = res;
	} else {
		this.rahu = true;
	}
    res = this.shareService.getRAHUS();
	if(res) {
		this.rahus = res;
	} else {
		this.rahus = true;
	}
    res = this.shareService.getRAHUT1();
	if(res) {
		this.rahut1 = res;
	} else {
		this.rahut1 = true;
	}
    res = this.shareService.getRAHUT2();
	if(res) {
		this.rahut2 = res;
	} else {
		this.rahut2 = true;
	}
    res = this.shareService.getRAHUT3();
	if(res) {
		this.rahut3 = res;
	} else {
		this.rahut3 = true;
	}
    res = this.shareService.getSUNR();
	if(res) {
		this.sunrise = res;
	} else {
		this.sunrise = true;
	}
    res = this.shareService.getSUNS();
	if(res) {
		this.sunset = res;
	} else {
		this.sunset = true;
	}
	this.showRAH = this.rahu;
    //this.rahu = this.shareService.getRAHU();
	//this.rahus =  this.shareService.getRAHUS();
	//this.rahut1 = this.shareService.getRAHUT1();
	//this.rahut2 = this.shareService.getRAHUT2();
	//this.rahut3 = this.shareService.getRAHUT3();
	//this.sunrise = this.shareService.getSUNR();
	//this.sunset = this.shareService.getSUNS();
	
  }
  public notifyRahu()
  {
    console.log('notifyRahu()', this.rahu);
    this.showRAH = this.rahu;
    this.shareService.setRAHU(this.rahu);
	this.events.publish('backmode', 'justify');
  }
  public notifyRahus()
  {
    console.log('notifyRahus()', this.rahus);
    this.shareService.setRAHUS(this.rahus);
	this.events.publish('backmode', 'justify');
  }
  public notifyRahut1()
  {
    console.log('notifyRahut1()', this.rahut1);
    this.shareService.setRAHUT1(this.rahut1);
	this.events.publish('backmode', 'justify');
  }
  public notifyRahut2()
  {
    console.log('notifyRahut2()', this.rahut2);
    this.shareService.setRAHUT2(this.rahut2);
	this.events.publish('backmode', 'justify');
  }
  public notifyRahut3()
  {
    console.log('notifyRahut3()', this.rahut3);
    this.shareService.setRAHUT3(this.rahut3);
	this.events.publish('backmode', 'justify');
  }
  public notifySunrise()
  {
    console.log('notifySunrise()', this.sunrise);
    this.shareService.setSUNR(this.sunrise);
	this.events.publish('backmode', 'justify');
  }
  public notifySunset()
  {
    console.log('notifySunset()', this.sunset);
	this.shareService.setSUNS(this.sunset);
	this.events.publish('backmode', 'justify');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

}
