/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */ 
import * as i0 from "@angular/core";
import * as i1 from "ionic-angular/umd/components/toolbar/toolbar-header";
import * as i2 from "ionic-angular/umd/config/config";
import * as i3 from "ionic-angular/umd/navigation/view-controller";
import * as i4 from "../../../node_modules/ionic-angular/umd/components/toolbar/toolbar.ngfactory";
import * as i5 from "ionic-angular/umd/components/toolbar/toolbar";
import * as i6 from "ionic-angular/umd/components/menu/menu-toggle";
import * as i7 from "ionic-angular/umd/components/app/menu-controller";
import * as i8 from "ionic-angular/umd/components/button/button";
import * as i9 from "ionic-angular/umd/components/toolbar/navbar";
import * as i10 from "ionic-angular/umd/components/toolbar/toolbar-item";
import * as i11 from "ionic-angular/umd/components/icon/icon";
import * as i12 from "../../../node_modules/ionic-angular/umd/components/toolbar/toolbar-title.ngfactory";
import * as i13 from "ionic-angular/umd/components/toolbar/toolbar-title";
import * as i14 from "../../../node_modules/ionic-angular/umd/components/content/content.ngfactory";
import * as i15 from "ionic-angular/umd/components/content/content";
import * as i16 from "ionic-angular/umd/platform/platform";
import * as i17 from "ionic-angular/umd/platform/dom-controller";
import * as i18 from "ionic-angular/umd/components/app/app";
import * as i19 from "ionic-angular/umd/platform/keyboard";
import * as i20 from "ionic-angular/umd/navigation/nav-controller";
import * as i21 from "ionic-angular/umd/components/badge/badge";
import * as i22 from "../../../node_modules/ionic-angular/umd/components/button/button.ngfactory";
import * as i23 from "ionic-angular/umd/components/typography/typography";
import * as i24 from "./credits";
import * as i25 from "ionic-angular/umd/navigation/nav-params";
import * as i26 from "@ionic-native/device";
import * as i27 from "@ionic-native/in-app-purchase-2";
import * as i28 from "../../app/horoscope.service";
import * as i29 from "ionic-angular/umd/util/events";
var styles_CreditsPage = [];
var RenderType_CreditsPage = i0.ɵcrt({ encapsulation: 2, styles: styles_CreditsPage, data: {} });
export { RenderType_CreditsPage as RenderType_CreditsPage };
export function View_CreditsPage_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 12, "ion-header", [], null, null, null, null, null)), i0.ɵdid(1, 16384, null, 0, i1.Header, [i2.Config, i0.ElementRef, i0.Renderer, [2, i3.ViewController]], null, null), (_l()(), i0.ɵeld(2, 0, null, null, 10, "ion-toolbar", [["class", "toolbar"]], [[2, "statusbar-padding", null]], null, null, i4.View_Toolbar_0, i4.RenderType_Toolbar)), i0.ɵdid(3, 49152, null, 0, i5.Toolbar, [i2.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵeld(4, 0, null, 0, 5, "ion-button", [["left", ""], ["menuToggle", ""]], [[8, "hidden", 0]], [[null, "click"]], function (_v, en, $event) { var ad = true; if (("click" === en)) {
        var pd_0 = (i0.ɵnov(_v, 5).toggle() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(5, 1064960, null, 0, i6.MenuToggle, [i7.MenuController, [2, i3.ViewController], [2, i8.Button], [2, i9.Navbar]], { menuToggle: [0, "menuToggle"] }, null), i0.ɵdid(6, 16384, null, 1, i10.ToolbarItem, [i2.Config, i0.ElementRef, i0.Renderer, [2, i5.Toolbar], [2, i9.Navbar]], null, null), i0.ɵqud(603979776, 1, { _buttons: 1 }), (_l()(), i0.ɵeld(8, 0, null, null, 1, "ion-icon", [["name", "menu"], ["role", "img"]], [[2, "hide", null]], null, null, null, null)), i0.ɵdid(9, 147456, null, 0, i11.Icon, [i2.Config, i0.ElementRef, i0.Renderer], { name: [0, "name"] }, null), (_l()(), i0.ɵeld(10, 0, null, 3, 2, "ion-title", [], null, null, null, i12.View_ToolbarTitle_0, i12.RenderType_ToolbarTitle)), i0.ɵdid(11, 49152, null, 0, i13.ToolbarTitle, [i2.Config, i0.ElementRef, i0.Renderer, [2, i5.Toolbar], [2, i9.Navbar]], null, null), (_l()(), i0.ɵeld(12, 0, null, 0, 0, "img", [["alt", "logo"], ["height", "24"], ["src", "https://78.media.tumblr.com/f068e2426e16157aba924763fabd6234/tumblr_pbdnjgGRLE1xp0noco1_250.png"]], null, null, null, null, null)), (_l()(), i0.ɵeld(13, 0, null, null, 34, "ion-content", [["padding", ""]], [[2, "statusbar-padding", null], [2, "has-refresher", null]], null, null, i14.View_Content_0, i14.RenderType_Content)), i0.ɵdid(14, 4374528, null, 0, i15.Content, [i2.Config, i16.Platform, i17.DomController, i0.ElementRef, i0.Renderer, i18.App, i19.Keyboard, i0.NgZone, [2, i3.ViewController], [2, i20.NavController]], null, null), (_l()(), i0.ɵeld(15, 0, null, 1, 1, "div", [["text-center", ""]], null, null, null, null, null)), (_l()(), i0.ɵeld(16, 0, null, null, 0, "img", [["alt", "subscribe button"], ["src", "https://78.media.tumblr.com/37ccdb3f1236975606c9d8c8dfbc132f/tumblr_pefats6oGY1xp0noco1_250.png"]], null, null, null, null, null)), (_l()(), i0.ɵeld(17, 0, null, 1, 30, "div", [], null, null, null, null, null)), (_l()(), i0.ɵeld(18, 0, null, null, 1, "h2", [], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["Credits"])), (_l()(), i0.ɵeld(20, 0, null, null, 5, "p", [["class", "desc"]], null, null, null, null, null)), (_l()(), i0.ɵted(-1, null, ["In our free App you can fetch horoscope data for upto 5 unique date of births, for any additional date of birth you need to add some credits your account. The credits are non-transferable and cannot expire. If you are not an astrologer but want to access horoscopes for more profiles simply add some credits to your account. And whreas the best thing if you are an astrologer is to go for "])), (_l()(), i0.ɵeld(22, 0, null, null, 2, "ion-badge", [["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.more() !== false);
        ad = (pd_0 && ad);
    } return ad; }, null, null)), i0.ɵdid(23, 16384, null, 0, i21.Badge, [i2.Config, i0.ElementRef, i0.Renderer], null, null), (_l()(), i0.ɵted(-1, null, ["Subscription"])), (_l()(), i0.ɵted(-1, null, [" as there will be many exciting features you can avail from our App upon subscription apart from unlimited credits."])), (_l()(), i0.ɵeld(26, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""], ["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.buy5() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i22.View_Button_0, i22.RenderType_Button)), i0.ɵdid(27, 1097728, null, 0, i8.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { full: [0, "full"] }, null), (_l()(), i0.ɵted(-1, 0, ["Buy 5 Credits for just Rs. 40"])), (_l()(), i0.ɵeld(29, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i0.ɵeld(30, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""], ["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.buy10() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i22.View_Button_0, i22.RenderType_Button)), i0.ɵdid(31, 1097728, null, 0, i8.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { full: [0, "full"] }, null), (_l()(), i0.ɵted(-1, 0, ["Buy 10 Credits for just Rs. 70"])), (_l()(), i0.ɵeld(33, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i0.ɵeld(34, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""], ["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.buy25() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i22.View_Button_0, i22.RenderType_Button)), i0.ɵdid(35, 1097728, null, 0, i8.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { full: [0, "full"] }, null), (_l()(), i0.ɵted(-1, 0, ["Buy 25 Credits for just Rs. 200"])), (_l()(), i0.ɵeld(37, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i0.ɵeld(38, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""], ["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.buy50() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i22.View_Button_0, i22.RenderType_Button)), i0.ɵdid(39, 1097728, null, 0, i8.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { full: [0, "full"] }, null), (_l()(), i0.ɵted(-1, 0, ["Buy 50 Credits for just Rs. 350"])), (_l()(), i0.ɵeld(41, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i0.ɵeld(42, 0, null, null, 2, "button", [["full", ""], ["ion-button", ""], ["tappable", ""]], null, [[null, "click"]], function (_v, en, $event) { var ad = true; var _co = _v.component; if (("click" === en)) {
        var pd_0 = (_co.buy() !== false);
        ad = (pd_0 && ad);
    } return ad; }, i22.View_Button_0, i22.RenderType_Button)), i0.ɵdid(43, 1097728, null, 0, i8.Button, [[8, ""], i2.Config, i0.ElementRef, i0.Renderer], { full: [0, "full"] }, null), (_l()(), i0.ɵted(-1, 0, ["Buy One for just Rs. 10"])), (_l()(), i0.ɵeld(45, 0, null, null, 0, "br", [], null, null, null, null, null)), (_l()(), i0.ɵeld(46, 0, null, null, 1, "p", [["class", "info"], ["color", "primary"], ["ion-text", ""]], [[8, "innerHTML", 1]], null, null, null, null)), i0.ɵdid(47, 16384, null, 0, i23.Typography, [i2.Config, i0.ElementRef, i0.Renderer], { color: [0, "color"] }, null)], function (_ck, _v) { var currVal_2 = ""; _ck(_v, 5, 0, currVal_2); var currVal_4 = "menu"; _ck(_v, 9, 0, currVal_4); var currVal_7 = ""; _ck(_v, 27, 0, currVal_7); var currVal_8 = ""; _ck(_v, 31, 0, currVal_8); var currVal_9 = ""; _ck(_v, 35, 0, currVal_9); var currVal_10 = ""; _ck(_v, 39, 0, currVal_10); var currVal_11 = ""; _ck(_v, 43, 0, currVal_11); var currVal_13 = "primary"; _ck(_v, 47, 0, currVal_13); }, function (_ck, _v) { var _co = _v.component; var currVal_0 = i0.ɵnov(_v, 3)._sbPadding; _ck(_v, 2, 0, currVal_0); var currVal_1 = i0.ɵnov(_v, 5).isHidden; _ck(_v, 4, 0, currVal_1); var currVal_3 = i0.ɵnov(_v, 9)._hidden; _ck(_v, 8, 0, currVal_3); var currVal_5 = i0.ɵnov(_v, 14).statusbarPadding; var currVal_6 = i0.ɵnov(_v, 14)._hasRefresher; _ck(_v, 13, 0, currVal_5, currVal_6); var currVal_12 = _co.info; _ck(_v, 46, 0, currVal_12); }); }
export function View_CreditsPage_Host_0(_l) { return i0.ɵvid(0, [(_l()(), i0.ɵeld(0, 0, null, null, 1, "page-credits", [], null, null, null, View_CreditsPage_0, RenderType_CreditsPage)), i0.ɵdid(1, 49152, null, 0, i24.CreditsPage, [i20.NavController, i25.NavParams, i16.Platform, i26.Device, i27.InAppPurchase2, i28.HoroscopeService, i29.Events], null, null)], null, null); }
var CreditsPageNgFactory = i0.ɵccf("page-credits", i24.CreditsPage, View_CreditsPage_Host_0, {}, {}, []);
export { CreditsPageNgFactory as CreditsPageNgFactory };
//# sourceMappingURL=credits.ngfactory.js.map