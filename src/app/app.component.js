var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, Events } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { PersonalDetailsPage } from '../pages/personal-details/personal-details';
import { ListPage } from '../pages/list/list';
import { LovehoroPage } from '../pages/lovehoro/lovehoro';
import { DailyForecastPage } from '../pages/dailyforecast/dailyforecast';
import { StarConstPage } from '../pages/star-const/star-const';
import { StoriesPage } from '../pages/stories/stories';
import { SubscribePage } from '../pages/subscribe/subscribe';
import { PrivacyPage } from '../pages/privacy/privacy';
import { HelpDeskPage } from '../pages/help-desk/help-desk';
import { MypubzRespPage } from '../pages/mypubz-resp/mypubz-resp';
import { ShareService } from './share.service';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HoroscopeService } from './horoscope.service';
import { CreditsPage } from '../pages/credits/credits';
import { PanchangPage } from '../pages/panchang/panchang';
import { NotificationsPage } from '../pages/notifications/notifications';
var MyApp = /** @class */ (function () {
    function MyApp(platform, menu, statusBar, splashScreen, shareService, horoService, device, events) {
        this.platform = platform;
        this.menu = menu;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.shareService = shareService;
        this.horoService = horoService;
        this.device = device;
        this.events = events;
        this.backmode = false;
        this.rootPage = ListPage;
        this.backmode = false;
        this.initializeApp();
        // set our app's pages
        this.pages = [
            { title: 'Birth Chart', component: PersonalDetailsPage, icon: 'planet' },
            { title: 'Panchangam', component: PanchangPage, icon: 'time' },
            { title: 'Star Constellation', component: StarConstPage, icon: 'star' },
            { title: 'Love Horoscope', component: LovehoroPage, icon: 'heart' },
            { title: 'KP Astrology', component: PersonalDetailsPage, icon: 'flower' },
            { title: 'Divisional Charts', component: PersonalDetailsPage, icon: 'podium' },
            { title: 'Daily Horoscope', component: DailyForecastPage, icon: 'sunny' },
            { title: 'Vedic Stories', component: StoriesPage, icon: 'paper' },
            { title: 'Subscribe', component: SubscribePage, icon: 'apps' },
            { title: 'Available Credits', component: CreditsPage, icon: 'cash' },
            { title: 'Privacy Policy', component: PrivacyPage, icon: 'lock' },
            { title: 'Notifications', component: NotificationsPage, icon: 'notifications' },
            { title: 'Help Desk', component: HelpDeskPage, icon: 'help-circle' }
        ];
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            console.log(_this.device.uuid);
            _this.horoService.getNotif(_this.device.uuid)
                .subscribe(function (res) {
                if (res['status'] == 'R') {
                    var ticket = {
                        uuid: res['uuid'],
                        guid: res['guid'],
                        resp: res['resp'],
                        status: res['status']
                    };
                    console.log('notification');
                    console.log(_this.nav);
                    _this.nav.setRoot(MypubzRespPage, { ticket: ticket });
                }
                else if (res['status'] == 'CI') {
                    _this.nav.setRoot(SubscribePage, { ci: true });
                }
            }, function (err) {
            });
            _this.horoService.getPlan(_this.device.uuid)
                .subscribe(function (res) {
                console.log('Updated the plan details from App component');
                if (res['name'] == 'com.mypubz.eportal.astrologer')
                    _this.pages[9].title = 'Available Credits(UNL)';
                else
                    _this.pages[9].title = 'Available Credits(' + res['credits'] + ')';
            }, function (err) {
            });
            _this.events.publish('available:credits', _this.pages[8]);
        });
    };
    MyApp.prototype.openPage = function (page) {
        // close the menu when clicking a link from the menu
        this.menu.close();
        if (page.title == 'Daily Horoscope') {
            if (this.shareService.getMoonSign() == null) {
                this.nav.push(PersonalDetailsPage, {
                    item: page
                });
            }
            else {
                this.nav.push(DailyForecastPage, {
                    item: page
                });
            }
        }
        else {
            // navigate to the new page if it is not the current page
            this.nav.setRoot(page.component, { item: page });
        }
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html',
            providers: [HoroscopeService]
        }),
        __metadata("design:paramtypes", [Platform,
            MenuController,
            StatusBar,
            SplashScreen,
            ShareService,
            HoroscopeService,
            Device,
            Events])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map