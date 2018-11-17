import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,  public horoService: HoroscopeService, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
    this.getStories(0);
    this.page=0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoriesPage');
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
