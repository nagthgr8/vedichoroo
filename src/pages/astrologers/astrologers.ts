import { Component } from '@angular/core';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import {ProfAstroPage} from '../prof-astro/prof-astro';
import {HobbyAstroPage} from '../hobby-astro/hobby-astro';

/**
 * Generated class for the AstrologersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-astrologers',
  templateUrl: 'astrologers.html',
})
export class AstrologersPage {
  tab1Root =  ProfAstroPage;
  tab2Root = HobbyAstroPage;
  constructor(public admob: AdMobFree) {
 }
 ionViewDidLoad() {
	this.showBanner();
 }
showBanner() {

        let bannerConfig: AdMobFreeBannerConfig = {
            isTesting: false, 
            autoShow: true,
            id: 'ca-app-pub-8442845715303800/9653489669'
        };

        this.admob.banner.config(bannerConfig);

        this.admob.banner.prepare().then(() => {
            // success
        }).catch(e => console.log(e));

    }
	
}
