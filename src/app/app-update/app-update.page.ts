import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Market } from '@ionic-native/market/ngx';
import { Location } from '@angular/common';

@Component({
  selector: 'app-app-update',
  templateUrl: './app-update.page.html',
  styleUrls: ['./app-update.page.scss'],
})
export class AppUpdatePage implements OnInit {

  constructor(private router: Router, private location: Location, private platform: Platform, private market: Market) { }

  ngOnInit() {
  }
 launchAppStore() {
    if (this.platform.is('android')) {
      // Use your app identifier for android.
      this.market.open('com.mypubz.eportal');
    } else {
      // Use the id found in the URL of the ios app store listing.
      this.market.open('id123456789');
    }
  }
  update(evt) {
	  evt.stopPropagation();
	  this.launchAppStore();
  }
  skip(evt) {
	  evt.stopPropagation();
	  this.location.back();
 }
}
