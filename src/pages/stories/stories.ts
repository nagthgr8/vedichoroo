import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { AlertController } from 'ionic-angular';
import { HoroscopeService } from '../../app/horoscope.service';
import { LoadingController } from 'ionic-angular';
import { ArticlePage } from '../article/article';

/**
 * Generated class for the StoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-stories',
  templateUrl: 'stories.html',
})
export class StoriesPage {
  page: any;
  articles:any;
  mode: String="list";
  info: string = '';

  constructor(public navCtrl: NavController,  public horoService: HoroscopeService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public admob: AdMobFree) {
    this.getStories(0);
    this.page=0;
  }
    showBanner() {

        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: false, 
            autoShow: true,
            id: 'ca-app-pub-8442845715303800/1068422637'
        };

        this.admob.banner.config(bannerConfig);

        this.admob.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));

    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoriesPage');
	this.showBanner();
  }
  getStories(refresher){
    this.page= 0;
    this.articles=[];
	this.info = 'fetching...';
    this.horoService.getStories()
	.subscribe(res => {
	   this.info = '';
	  this.articles = res;//this.publishStories(res);
	},(err) => {
	  this.info = err;
    });
  }
  publishStories(stories: any)
  {
    //this.info = Object.keys(stories).length.toString();
  	for(var i = 0; i < Object.keys(stories).length; i++) {
	  this.articles.push(stories[i]);
	}
  }
  detail(item){
  this.navCtrl.push(ArticlePage, {
    item: item
  });
 }

  makelist(){
    this.mode="list";
  }

  makecard(){
    this.mode="card";
  }

}
