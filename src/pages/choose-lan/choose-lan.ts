import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from "../../providers/language.service";
import { LanguageModel } from "../../models/language.model";
import { ListPage } from '../list/list';

/**
 * Generated class for the ChooseLanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-choose-lan',
  templateUrl: 'choose-lan.html',
})
export class ChooseLanPage {
  languageSelected : any = 'en';
  languages : Array<LanguageModel>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public translate: TranslateService,
    public languageService: LanguageService) {
	this.languages = this.languageService.getLanguages();
    this.setLanguage();	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseLanPage');
  }
 setLanguage(){
    let defaultLanguage = this.translate.getDefaultLang();
    if(this.languageSelected){
      this.translate.setDefaultLang(this.languageSelected);
      this.translate.use(this.languageSelected);
    }else{
      this.languageSelected = defaultLanguage;
      this.translate.use(defaultLanguage);
    }
  }
  selLanguage() {
	this.setLanguage();
	this.navCtrl.setRoot(ListPage);
  }
}
